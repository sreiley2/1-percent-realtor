import { NextResponse } from "next/server";
import {
  firstValidationMessage,
  leadSubmissionSchema,
  type StoredLead,
} from "@/lib/leads/schema";
import { saveLead } from "@/lib/leads/store";
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

function isSpam(website?: string, formStartedAt?: number) {
  if (website && website.trim().length > 0) return true;
  if (!formStartedAt || !Number.isFinite(formStartedAt)) return true;

  const elapsed = Date.now() - formStartedAt;
  return elapsed < MIN_SUBMIT_MS || elapsed > MAX_SUBMIT_MS;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request. Please try again." },
      { status: 400 }
    );
  }

  const parsed = leadSubmissionSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: firstValidationMessage(parsed.error) },
      { status: 400 }
    );
  }

  const data = parsed.data;

  if (isSpam(data.website, data.formStartedAt)) {
    return NextResponse.json({ ok: true });
  }

  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many submissions. Please wait a few minutes and try again." },
      { status: 429 }
    );
  }

  const missing = missingConfig();
  if (missing.length > 0) {
    console.error(`Lead capture is not configured. Missing: ${missing.join(", ")}`);
    return NextResponse.json(
      {
        error:
          "Lead capture is not configured yet. Please call or email directly, or try again later.",
      },
      { status: 503 }
    );
  }

  const lead: StoredLead = {
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
    await saveLead(lead);
  } catch (error) {
    console.error("Failed to store lead", error);
    return NextResponse.json(
      { error: "Your request could not be saved. Please try again." },
      { status: 500 }
    );
  }

  try {
    await sendLeadNotification(lead);
  } catch (error) {
    console.error("Lead stored but email notification failed", error, lead.id);
    return NextResponse.json(
      {
        error:
          "Your request was received, but notification failed. Please try again or call directly.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true, id: lead.id });
}
