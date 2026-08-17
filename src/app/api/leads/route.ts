import { NextResponse } from "next/server";
import {
  firstValidationMessage,
  leadSubmissionSchema,
  type StoredLead,
} from "@/lib/leads/schema";
import { getLeadById, saveLead } from "@/lib/leads/store";
import { sendLeadNotification } from "@/lib/leads/notify";
import { clientIp, isRateLimited } from "@/lib/leads/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MIN_SUBMIT_MS = 800;
const MAX_SUBMIT_MS = 24 * 60 * 60 * 1000;

function missingConfig() {
  const missing = [
    "DATABASE_URL",
    "RESEND_API_KEY",
    "LEAD_NOTIFY_EMAIL",
  ].filter((name) => !process.env[name]);

  return missing;
}

function isHoneypot(website?: string) {
  return Boolean(website && website.trim().length > 0);
}

function isTimingSpam(formStartedAt?: number) {
  if (!formStartedAt || !Number.isFinite(formStartedAt)) return true;

  const elapsed = Date.now() - formStartedAt;
  return elapsed < MIN_SUBMIT_MS || elapsed > MAX_SUBMIT_MS;
}

function savedResponse(
  id: string,
  notification: "sent" | "failed",
) {
  return NextResponse.json({
    ok: true,
    id,
    saved: true,
    notification,
  });
}

function unsavedResponse(error: string, status: number) {
  return NextResponse.json({ error, saved: false }, { status });
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return unsavedResponse("Invalid request. Please try again.", 400);
  }

  const parsed = leadSubmissionSchema.safeParse(payload);
  if (!parsed.success) {
    return unsavedResponse(firstValidationMessage(parsed.error), 400);
  }

  const data = parsed.data;

  if (isHoneypot(data.website)) {
    console.log("Lead submission rejected: honeypot filled");
    return unsavedResponse("Please check the form and try again.", 400);
  }

  if (isTimingSpam(data.formStartedAt)) {
    console.log("Lead submission treated as spam; skipping store and email");
    return NextResponse.json({ ok: true, saved: false });
  }

  let stored: StoredLead | null = null;

  if (data.leadId) {
    try {
      stored = await getLeadById(data.leadId);
    } catch (error) {
      console.error("Failed to look up existing lead", {
        leadId: data.leadId,
        message: error instanceof Error ? error.message : "Unknown error",
      });
      return unsavedResponse(
        "Your request could not be saved. Please try again.",
        500,
      );
    }
  }

  if (!stored) {
    const ip = clientIp(request);
    if (isRateLimited(ip)) {
      return unsavedResponse(
        "Too many submissions. Please wait a few minutes and try again.",
        429,
      );
    }

    const missing = missingConfig();
    if (missing.length > 0) {
      console.error(
        `Lead capture is not configured. Missing: ${missing.join(", ")}`,
      );
      return unsavedResponse(
        "Lead capture is not configured yet. Please call or email directly, or try again later.",
        503,
      );
    }

    stored = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      status: "new",
      intent: data.intent,
      name: data.name,
      email: data.email,
      phone: data.phone,
      address: data.address,
      listingUrl: data.listingUrl,
      timeline: data.timeline,
      offerDeadline: data.offerDeadline,
      message: data.message,
      estimatedValue: data.estimatedValue,
      source: data.source,
      userAgent: request.headers.get("user-agent") ?? undefined,
    };

    try {
      await saveLead(stored);
    } catch (error) {
      console.error("Failed to store lead", error);
      return unsavedResponse(
        "Your request could not be saved. Please try again.",
        500,
      );
    }

    console.log("Lead stored; sending email notification", { leadId: stored.id });
  } else {
    console.log("Existing lead found; retrying email notification", {
      leadId: stored.id,
    });
  }

  try {
    await sendLeadNotification(stored);
  } catch (error) {
    console.error("Lead stored but email notification failed", {
      leadId: stored.id,
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return savedResponse(stored.id, "failed");
  }

  console.log("Lead email notification succeeded", { leadId: stored.id });

  return savedResponse(stored.id, "sent");
}
