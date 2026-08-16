"use client";

import { useState, type FormEvent } from "react";
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
  onBack,
}: {
  intent: Exclude<LeadIntent, "choice">;
  estimatedValue?: number;
  onBack?: () => void;
}) {
  const [submitted, setSubmitted] = useState(false);
  const isBuyer = intent === "offer";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
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
    <form onSubmit={handleSubmit} className="space-y-5">
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

      <input type="hidden" name="intent" value={intent} />
      <CtaButton type="submit" className="w-full sm:w-auto">
        Submit request
      </CtaButton>
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="ml-0 block text-[11px] tracking-[0.18em] text-muted-foreground uppercase hover:text-foreground sm:ml-4 sm:inline"
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
