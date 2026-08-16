"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CtaButton } from "@/components/shared/cta-button";
import { formatCurrency } from "@/lib/format";
import { legal } from "@/lib/site-content";
import type { LeadIntent } from "@/components/lead/lead-provider";

export function LeadForm({
  intent,
  estimatedValue,
  source,
  onBack,
}: {
  intent: Exclude<LeadIntent, "choice">;
  estimatedValue?: number;
  source?: string;
  onBack?: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formStartedAt, setFormStartedAt] = useState(0);
  const inFlightRef = useRef(false);
  const isBuyer = intent === "offer";

  useEffect(() => {
    setFormStartedAt(Date.now());
    setSubmitted(false);
    setSubmitting(false);
    setError(null);
  }, [intent]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting || inFlightRef.current) return;
    inFlightRef.current = true;

    const form = event.currentTarget;
    const data = new FormData(form);

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          intent: data.get("intent"),
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          address: data.get("address"),
          listingUrl: data.get("listing-url"),
          timeline: data.get("timeline"),
          offerDeadline: data.get("offer-deadline"),
          message: data.get("message"),
          estimatedValue: data.get("estimatedValue") || undefined,
          source: data.get("source") || undefined,
          website: data.get("website"),
          formStartedAt: Number(data.get("formStartedAt")),
        }),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          result?.error || "Something went wrong. Please try again."
        );
      }

      setSubmitted(true);
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Something went wrong. Please try again."
      );
    } finally {
      inFlightRef.current = false;
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="py-4 text-center">
        <p className="eyebrow text-gold">Received</p>
        <h3 className="display-title mt-4 text-3xl">Thank you.</h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-muted-foreground">
          Your request is in. A follow-up will cover next steps. Submitting this
          form does not create a representation agreement.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" aria-busy={submitting}>
      <div>
        <p className="eyebrow text-gold">{isBuyer ? "Buy" : "Sell"}</p>
        <h3 className="display-title mt-3 text-3xl sm:text-4xl">
          {isBuyer ? "I found a home." : "Sell my home."}
        </h3>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          {isBuyer
            ? "Paste the listing and a few details. We will follow up about 1% buyer representation — analysis, offer, negotiation, and closing."
            : "Share a few details and we will follow up about full-service listing representation at 1%."}
        </p>
      </div>

      <Field id="name" label="Name" autoComplete="name" required />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
        />
        <Field
          id="phone"
          label="Phone"
          type="tel"
          autoComplete="tel"
          required
        />
      </div>

      {isBuyer ? (
        <Field
          id="listing-url"
          label="Property / listing URL"
          type="text"
          inputMode="url"
          autoComplete="url"
          placeholder="Paste a Zillow, Redfin, MLS, or listing link"
        />
      ) : null}

      <Field
        id="address"
        label="Property address"
        autoComplete="street-address"
        placeholder="Street, city"
        required={!isBuyer}
      />

      {isBuyer ? (
        <Field
          id="offer-deadline"
          label="Offer deadline"
          placeholder="e.g. Tomorrow 5:00 p.m., or as soon as possible"
        />
      ) : (
        <div className="space-y-2">
          <Label htmlFor="timeline" className="text-[11px] tracking-[0.18em] uppercase">
            Estimated timeline
          </Label>
          <select
            id="timeline"
            name="timeline"
            defaultValue=""
            className="h-12 w-full rounded-none border border-foreground/15 bg-background px-3 text-sm"
          >
            <option value="" disabled>
              Select a timeline
            </option>
            <option value="immediately">Immediately</option>
            <option value="1-3-months">1–3 months</option>
            <option value="3-6-months">3–6 months</option>
            <option value="exploring">Exploring</option>
          </select>
        </div>
      )}

      {estimatedValue ? (
        <p className="text-xs tracking-wide text-muted-foreground">
          Calculator home value used: {formatCurrency(estimatedValue)}
        </p>
      ) : null}

      <div className="space-y-2">
        <Label htmlFor="message" className="text-[11px] tracking-[0.18em] uppercase">
          Additional information
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={3}
          placeholder={
            isBuyer
              ? "Offer context, questions, or anything we should know"
              : "Timeline details, questions, or anything we should know"
          }
          className="min-h-24 rounded-none border-foreground/15 bg-background px-3 py-3"
        />
      </div>

      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <input type="hidden" name="intent" value={intent} />
      <input type="hidden" name="formStartedAt" value={String(formStartedAt)} />
      {source ? <input type="hidden" name="source" value={source} /> : null}
      {estimatedValue ? (
        <input type="hidden" name="estimatedValue" value={String(estimatedValue)} />
      ) : null}

      {error ? (
        <p role="alert" className="text-sm leading-6 text-red-800">
          {error}
        </p>
      ) : null}

      <CtaButton type="submit" className="w-full sm:w-auto" disabled={submitting}>
        {submitting ? "Submitting…" : "Submit request"}
      </CtaButton>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          disabled={submitting}
          className="ml-0 block text-[11px] tracking-[0.18em] text-muted-foreground uppercase hover:text-foreground disabled:opacity-50 sm:ml-4 sm:inline"
        >
          Choose a different option
        </button>
      ) : null}
      <p className="text-[11px] leading-5 text-muted-foreground">
        {isBuyer ? legal.formBuyer : legal.formSeller}
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
  placeholder,
  required,
  inputMode,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  inputMode?: "url";
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-[11px] tracking-[0.18em] uppercase">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        className="h-12 rounded-none border-foreground/15 bg-background px-3 text-sm"
      />
    </div>
  );
}
