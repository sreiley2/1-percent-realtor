"use client";

import { Container } from "@/components/shared/container";
import { CtaButton } from "@/components/shared/cta-button";
import { FadeIn } from "@/components/shared/fade-in";
import { useLeadCapture } from "@/components/lead/lead-provider";

export function WhatIDo() {
  const { openLeadCapture } = useLeadCapture();

  return (
    <section className="section-space bg-background">
      <Container>
        <FadeIn>
          <p className="eyebrow text-gold">Two services</p>
          <h2 className="display-title mt-5 text-4xl uppercase sm:text-5xl lg:text-[3.6rem]">
            Built for both sides of the deal.
          </h2>
        </FadeIn>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          <FadeIn>
            <article className="flex h-full flex-col border border-foreground/10 bg-card px-6 py-10 sm:px-10">
              <p className="eyebrow text-gold">Sell</p>
              <h3 className="display-title mt-5 text-3xl sm:text-4xl">
                Sell your home for 1%.
              </h3>
              <p className="mt-6 max-w-md flex-1 text-base leading-8 text-muted-foreground">
                Full-service listing representation at 1% — pricing, marketing,
                offer review, negotiation, and transaction management.
              </p>
              <CtaButton
                className="mt-10 w-full sm:w-auto"
                onClick={() =>
                  openLeadCapture({ intent: "sell", source: "services-sell" })
                }
              >
                Sell my home
              </CtaButton>
            </article>
          </FadeIn>

          <FadeIn delay={0.08}>
            <article className="flex h-full flex-col border border-foreground/10 bg-card px-6 py-10 sm:px-10">
              <p className="eyebrow text-gold">Buy</p>
              <h3 className="display-title mt-5 text-3xl sm:text-4xl">
                Found your home?
                <span className="mt-2 block">I&apos;ll write the offer.</span>
              </h3>
              <p className="mt-6 max-w-md flex-1 text-base leading-8 text-muted-foreground">
                1% buyer representation for buyers who are comfortable finding
                properties themselves. You find the home. I handle the deal.
              </p>
              <CtaButton
                className="mt-10 w-full sm:w-auto"
                onClick={() =>
                  openLeadCapture({ intent: "offer", source: "services-buy" })
                }
              >
                I found a home
              </CtaButton>
            </article>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
