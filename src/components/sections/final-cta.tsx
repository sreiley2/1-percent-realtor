"use client";

import { Container } from "@/components/shared/container";
import { CtaButton } from "@/components/shared/cta-button";
import { FadeIn } from "@/components/shared/fade-in";
import { useLeadCapture } from "@/components/lead/lead-provider";

export function FinalCta() {
  const { openLeadCapture } = useLeadCapture();

  return (
    <section id="contact" className="scroll-mt-24 bg-ink text-cream">
      <Container className="section-space">
        <FadeIn>
          <p className="eyebrow text-gold">Get started</p>
          <h2 className="display-title mt-5 max-w-3xl text-4xl uppercase sm:text-5xl lg:text-[4.2rem]">
            Ready to get started?
          </h2>
          <p className="mt-8 max-w-xl text-base leading-8 text-cream/70">
            Sell your home for 1%, or bring a property you&apos;ve already found.
            Both start with a conversation — not an agreement.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <CtaButton
              variant="light"
              onClick={() => openLeadCapture({ intent: "sell" })}
            >
              Sell my home
            </CtaButton>
            <CtaButton
              variant="outlineLight"
              onClick={() => openLeadCapture({ intent: "offer" })}
            >
              I found a home
            </CtaButton>
          </div>
        </FadeIn>
      </Container>
    </section>
  );
}
