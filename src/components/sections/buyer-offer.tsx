"use client";

import { CoverImage } from "@/components/shared/cover-image";
import { Container } from "@/components/shared/container";
import { CtaButton } from "@/components/shared/cta-button";
import { FadeIn } from "@/components/shared/fade-in";
import { useLeadCapture } from "@/components/lead/lead-provider";
import { buyerSteps, images, legal } from "@/lib/site-content";

export function BuyerOffer() {
  const { openLeadCapture } = useLeadCapture();

  return (
    <section id="buy" className="scroll-mt-24 bg-ink text-cream">
      <div className="relative min-h-[28rem] overflow-hidden lg:min-h-[34rem]">
        <CoverImage src={images.buyer.src} alt={images.buyer.alt} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/70 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <Container className="relative flex min-h-[28rem] items-end py-16 lg:min-h-[34rem] lg:py-20">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-gold">Buyers</p>
            <h2 className="display-title mt-5 text-4xl uppercase sm:text-5xl lg:text-[4.2rem]">
              Found your home?
              <span className="mt-3 block">I&apos;ll write the offer.</span>
            </h2>
          </FadeIn>
        </Container>
      </div>

      <Container className="section-space pt-16 md:pt-20">
        <FadeIn>
          <p className="max-w-2xl font-display text-2xl leading-snug sm:text-3xl">
            You find the property.
            <br />
            I analyze the deal.
            <br />
            I write the offer.
            <br />
            I negotiate.
            <br />
            I help get you to closing.
          </p>
          <p className="mt-8 max-w-2xl text-base leading-8 text-cream/70 sm:text-lg">
            For buyers who are comfortable finding properties themselves, I
            focus on the work that matters most once you&apos;ve found the right
            home: analyzing the opportunity, developing offer strategy,
            preparing the offer, negotiating the terms, and managing the
            transaction through closing.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-10 sm:grid-cols-2 xl:grid-cols-5">
          {buyerSteps.map((step, index) => (
            <FadeIn key={step.number} delay={0.05 * index}>
              <article className="border-t border-white/15 pt-6">
                <p className="font-display text-3xl text-gold">{step.number}</p>
                <h3 className="mt-4 font-display text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-cream/65">
                  {step.description}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-14">
          <CtaButton
            variant="light"
            onClick={() =>
              openLeadCapture({ intent: "offer", source: "buyer-section" })
            }
          >
            I found a home
          </CtaButton>
          <p className="mt-6 max-w-2xl text-[11px] leading-5 text-cream/45">
            {legal.buyerCompensation}
          </p>
        </FadeIn>
      </Container>
    </section>
  );
}
