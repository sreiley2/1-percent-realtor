"use client";

import { useEffect, useState } from "react";
import { animate, useMotionValue, useReducedMotion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { CtaButton } from "@/components/shared/cta-button";
import { useLeadCapture } from "@/components/lead/lead-provider";
import {
  calculateCommission,
  DEFAULT_HOME_VALUE,
  DEFAULT_TRADITIONAL_RATE,
  HOME_VALUE_STEP,
  MAX_HOME_VALUE,
  MAX_TRADITIONAL_RATE,
  MIN_HOME_VALUE,
  MIN_TRADITIONAL_RATE,
  TRADITIONAL_RATE_STEP,
} from "@/lib/calculator";
import { formatCurrency, formatPercent, parseCurrencyInput } from "@/lib/format";
import { legal } from "@/lib/site-content";

export function CommissionCalculator() {
  const { openLeadCapture } = useLeadCapture();
  const [homeValue, setHomeValue] = useState(DEFAULT_HOME_VALUE);
  const [traditionalRate, setTraditionalRate] = useState(DEFAULT_TRADITIONAL_RATE);
  const [valueDraft, setValueDraft] = useState(formatCurrency(DEFAULT_HOME_VALUE));
  const breakdown = calculateCommission(homeValue, traditionalRate);

  return (
    <div className="border border-foreground/10 bg-card">
      <div className="grid gap-10 px-6 py-8 lg:grid-cols-[1fr_1.1fr] lg:gap-16 lg:px-10 lg:py-12">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <Label
                htmlFor="home-value"
                className="text-[11px] tracking-[0.18em] uppercase"
              >
                Home value
              </Label>
              <input
                id="home-value"
                value={valueDraft}
                onFocus={() => setValueDraft(String(homeValue))}
                onChange={(event) => {
                  setValueDraft(event.target.value);
                  const next = parseCurrencyInput(event.target.value);
                  if (next > 0) setHomeValue(next);
                }}
                onBlur={() => {
                  const next = Math.min(
                    MAX_HOME_VALUE,
                    Math.max(MIN_HOME_VALUE, parseCurrencyInput(valueDraft) || homeValue)
                  );
                  setHomeValue(next);
                  setValueDraft(formatCurrency(next));
                }}
                inputMode="numeric"
                className="w-40 border-none bg-transparent text-right font-display text-2xl tracking-tight outline-none"
              />
            </div>
            <Slider
              value={[homeValue]}
              min={MIN_HOME_VALUE}
              max={MAX_HOME_VALUE}
              step={HOME_VALUE_STEP}
              onValueChange={(value) => {
                const next = Array.isArray(value) ? value[0] : value;
                setHomeValue(next);
                setValueDraft(formatCurrency(next));
              }}
              aria-label="Estimated home value"
            />
            <div className="flex justify-between text-[11px] tracking-wide text-muted-foreground">
              <span>{formatCurrency(MIN_HOME_VALUE)}</span>
              <span>{formatCurrency(MAX_HOME_VALUE)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-end justify-between gap-4">
              <div>
                <Label className="text-[11px] tracking-[0.18em] uppercase">
                  Example comparison at {formatPercent(traditionalRate)}
                </Label>
                <p className="mt-1 text-xs text-muted-foreground">
                  An example only — not a standard rate.
                </p>
              </div>
              <p className="font-display text-2xl tracking-tight">
                {formatPercent(traditionalRate)}
              </p>
            </div>
            <Slider
              value={[traditionalRate]}
              min={MIN_TRADITIONAL_RATE}
              max={MAX_TRADITIONAL_RATE}
              step={TRADITIONAL_RATE_STEP}
              onValueChange={(value) => {
                const next = Array.isArray(value) ? value[0] : value;
                setTraditionalRate(Number(next.toFixed(1)));
              }}
              aria-label="Example comparison percentage"
            />
            <div className="flex justify-between text-[11px] tracking-wide text-muted-foreground">
              <span>{formatPercent(MIN_TRADITIONAL_RATE)}</span>
              <span>{formatPercent(MAX_TRADITIONAL_RATE)}</span>
            </div>
          </div>
        </div>

        <div className="bg-ink px-6 py-8 text-cream sm:px-8">
          <div className="space-y-5 text-sm">
            <Row
              label={`Example comparison at ${formatPercent(traditionalRate)}`}
              value={breakdown.traditionalCommission}
            />
            <Row
              label="My 1% listing fee"
              value={breakdown.listingCommission}
            />
            <div className="border-t border-white/10 pt-5">
              <p className="text-[11px] tracking-[0.22em] text-gold uppercase">
                Potential difference
              </p>
              <AnimatedCurrency
                value={breakdown.estimatedSavings}
                className="mt-2 block font-display text-5xl leading-none tracking-tight sm:text-6xl"
              />
            </div>
          </div>
          <CtaButton
            variant="light"
            className="mt-8 w-full"
            onClick={() =>
              openLeadCapture({
                intent: "sell",
                estimatedValue: homeValue,
                source: "calculator",
              })
            }
          >
            Sell my home
          </CtaButton>
        </div>
      </div>

      <p className="border-t border-foreground/10 px-6 py-4 text-[11px] leading-5 text-muted-foreground sm:px-10">
        {legal.calculator}
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="text-cream/60">{label}</span>
      <AnimatedCurrency value={value} className="font-display text-xl" />
    </div>
  );
}

function AnimatedCurrency({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  const motionValue = useMotionValue(value);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const unsubscribe = motionValue.on("change", (latest) => {
      setDisplay(latest);
    });

    if (reduceMotion) {
      motionValue.set(value);
      setDisplay(value);
      return unsubscribe;
    }

    const controls = animate(motionValue, value, {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    });

    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [motionValue, reduceMotion, value]);

  return <span className={className}>{formatCurrency(display)}</span>;
}
