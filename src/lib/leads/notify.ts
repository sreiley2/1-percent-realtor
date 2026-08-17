import { Resend } from "resend";
import { leadTypeLabel, type StoredLead } from "@/lib/leads/schema";
import { formatCurrency } from "@/lib/format";

function requiredEnv(name: "RESEND_API_KEY" | "LEAD_NOTIFY_EMAIL") {
  const value = process.env[name];
  if (!value) {
    throw new Error(`${name} is not set.`);
  }
  return value;
}

function display(value?: string) {
  return value?.trim() ? value : "—";
}

function formatTimestamp(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "full",
    timeStyle: "long",
  }).format(new Date(iso));
}

function timelineOrDeadline(lead: StoredLead) {
  if (lead.intent === "offer") return display(lead.offerDeadline);
  return display(lead.timeline);
}

function propertyLine(lead: StoredLead) {
  const parts = [lead.address, lead.listingUrl].filter(Boolean);
  return parts.length ? parts.join(" · ") : "—";
}

export function leadNotificationText(lead: StoredLead) {
  const type = leadTypeLabel(lead.intent);
  const estimated =
    lead.estimatedValue !== undefined
      ? formatCurrency(lead.estimatedValue)
      : "—";

  return [
    `New ${type} lead`,
    "",
    `Type: ${type}`,
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `Property: ${propertyLine(lead)}`,
    `Timeline / deadline: ${timelineOrDeadline(lead)}`,
    `Estimated home value: ${estimated}`,
    `Additional information: ${display(lead.message)}`,
    `Source / CTA: ${display(lead.source)}`,
    `Status: ${lead.status}`,
    `Lead ID: ${lead.id}`,
    `Submitted: ${formatTimestamp(lead.createdAt)}`,
  ].join("\n");
}

function row(label: string, value: string) {
  return `<tr>
    <td style="padding:8px 12px 8px 0;vertical-align:top;color:#5c564c;font-size:13px;letter-spacing:0.08em;text-transform:uppercase;white-space:nowrap;">${label}</td>
    <td style="padding:8px 0;color:#1a1814;font-size:15px;">${escapeHtml(value)}</td>
  </tr>`;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function leadNotificationHtml(lead: StoredLead) {
  const type = leadTypeLabel(lead.intent);
  const estimated =
    lead.estimatedValue !== undefined
      ? formatCurrency(lead.estimatedValue)
      : "—";

  return `<div style="font-family:Georgia,serif;background:#f7f4ee;padding:32px;">
    <div style="max-width:560px;margin:0 auto;background:#fff;padding:28px 32px;border:1px solid #e6e1d6;">
      <p style="margin:0 0 8px;color:#b08d57;letter-spacing:0.18em;text-transform:uppercase;font-size:11px;">New lead</p>
      <h1 style="margin:0 0 24px;font-size:28px;color:#1a1814;">${type}</h1>
      <table style="width:100%;border-collapse:collapse;">
        ${row("Type", type)}
        ${row("Name", lead.name)}
        ${row("Phone", lead.phone)}
        ${row("Email", lead.email)}
        ${row("Property", propertyLine(lead))}
        ${row("Timeline / deadline", timelineOrDeadline(lead))}
        ${row("Estimated home value", estimated)}
        ${row("Additional information", display(lead.message))}
        ${row("Source / CTA", display(lead.source))}
        ${row("Status", lead.status)}
        ${row("Lead ID", lead.id)}
        ${row("Submitted", formatTimestamp(lead.createdAt))}
      </table>
    </div>
  </div>`;
}

export async function sendLeadNotification(lead: StoredLead) {
  const apiKey = requiredEnv("RESEND_API_KEY");
  const to = requiredEnv("LEAD_NOTIFY_EMAIL");
  const from = "onboarding@resend.dev";
  const type = leadTypeLabel(lead.intent);
  const subject = `${type} lead: ${lead.name}`;

  console.log("Lead email: attempting send", {
    leadId: lead.id,
    to,
    from,
    hasResendApiKey: Boolean(apiKey),
    notifyEmailConfigured: Boolean(to),
  });

  const resend = new Resend(apiKey);
  const response = await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject,
    text: leadNotificationText(lead),
    html: leadNotificationHtml(lead),
  });

  console.log("Lead email: Resend response", {
    leadId: lead.id,
    to,
    from,
    emailId: response.data?.id ?? null,
    error: resendErrorLog(response.error),
  });

  if (response.error || !response.data?.id) {
    throw new Error(resendErrorMessage(response.error));
  }
}

function resendErrorMessage(error: unknown) {
  if (!error) return "Resend did not return an email id.";
  if (typeof error === "string") return error;
  if (typeof error === "object") {
    const record = error as Record<string, unknown>;
    if (typeof record.message === "string" && record.message) return record.message;
    const nested = record.error;
    if (nested && typeof nested === "object") {
      const nestedRecord = nested as Record<string, unknown>;
      if (typeof nestedRecord.message === "string" && nestedRecord.message) {
        return nestedRecord.message;
      }
    }
  }
  return "Resend request failed.";
}

function resendErrorLog(error: unknown) {
  if (!error) return null;
  if (typeof error === "string") return { message: error };
  if (typeof error === "object") {
    const record = error as Record<string, unknown>;
    return {
      name: typeof record.name === "string" ? record.name : undefined,
      statusCode:
        typeof record.statusCode === "number" ? record.statusCode : undefined,
      message: resendErrorMessage(error),
    };
  }
  return { message: "Unknown Resend error" };
}
