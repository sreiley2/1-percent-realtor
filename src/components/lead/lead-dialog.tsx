"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeadForm } from "@/components/lead/lead-form";
import { useLeadCapture } from "@/components/lead/lead-provider";

export function LeadDialog() {
  const { open, intent, estimatedValue, closeLeadCapture, openLeadCapture } =
    useLeadCapture();
  const isChoice = intent === "choice";

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) closeLeadCapture();
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto rounded-none p-6 sm:max-w-lg sm:p-8">
        <DialogHeader className={isChoice ? "text-left" : "sr-only"}>
          <DialogTitle className={isChoice ? "display-title text-3xl sm:text-4xl" : undefined}>
            {isChoice ? "What are you looking to do?" : intent === "offer" ? "Buyer inquiry" : "Seller inquiry"}
          </DialogTitle>
          <DialogDescription className={isChoice ? "mt-3 text-sm leading-6 text-muted-foreground" : undefined}>
            {isChoice
              ? "Choose the service that fits. There is no agreement until you decide to sign one."
              : intent === "offer"
                ? "Share the property you have found."
                : "Share a few details about the home you want to sell."}
          </DialogDescription>
        </DialogHeader>

        {isChoice ? (
          <div className="mt-8 grid gap-3">
            <ChoiceButton
              eyebrow="Sell"
              title="Sell my home"
              description="Full-service listing representation at 1%."
              onClick={() => openLeadCapture({ intent: "sell", estimatedValue })}
            />
            <ChoiceButton
              eyebrow="Buy"
              title="I found a home"
              description="1% buyer representation for a property you've identified."
              onClick={() => openLeadCapture({ intent: "offer" })}
            />
          </div>
        ) : (
          <LeadForm
            intent={intent}
            estimatedValue={estimatedValue}
            onBack={() => openLeadCapture({ intent: "choice", estimatedValue })}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

function ChoiceButton({
  eyebrow,
  title,
  description,
  onClick,
}: {
  eyebrow: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border border-foreground/10 bg-card px-5 py-6 text-left transition-colors hover:border-foreground/40 hover:bg-secondary/60"
    >
      <p className="eyebrow text-gold">{eyebrow}</p>
      <p className="display-title mt-3 text-2xl">{title}</p>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </button>
  );
}
