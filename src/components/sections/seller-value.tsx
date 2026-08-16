"use client";

import { CoverImage } from "@/components/shared/cover-image";
import { Container } from "@/components/shared/container";
import { CtaButton, CtaLink } from "@/components/shared/cta-button";
import { FadeIn } from "@/components/shared/fade-in";
import { useLeadCapture } from "@/components/lead/lead-provider";
import { images, sellerPoints } from "@/lib/site-content";

export function SellerValue() {
  const { openLeadCapture } = useLeadCapture();

  return (
    <section id="sell" className="scroll-mt-24 bg-ink text-cream">
      <div className="relative min-h-[28rem] overflow-hidden lg:min-h-[34rem]">
        <CoverImage src={images.seller.src} alt={images.seller.alt} />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/70 to-ink/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
        <Container className="relative flex min-h-[28rem] items-end py-16 lg:min-h-[34rem] lg:py-20">
          <FadeIn className="max-w-3xl">
            <p className="eyebrow text-gold">Sellers</p>
            <h2 className="display-title mt-5 text-4xl uppercase sm:text-5xl lg:text-[4.2rem]">
              Sell your home for 1%.
            </h2>
          </FadeIn>
        </Container>
      </div>

      <Container className="section-space pt-16 md:pt-20">
        <FadeIn>
          <p className="max-w-2xl text-base leading-8 text-cream/70 sm:text-lg">
            Full-service listing representation at a 1% listing commission —
            pricing strategy, professional marketing, offer review, negotiation,
            and transaction management.
          </p>
        </FadeIn>

        <ul className="mt-12 max-w-xl space-y-4">
          {sellerPoints.map((point, index) => (
            <FadeIn key={point} delay={0.05 * (index + 1)}>
              <li className="border-t border-white/10 pt-4 font-display text-2xl sm:text-3xl">
                {point}
              </li>
            </FadeIn>
          ))}
        </ul>

        <FadeIn className="mt-12 flex flex-col gap-3 sm:flex-row">
          <CtaButton
            variant="light"
            onClick={() => openLeadCapture({ intent: "sell" })}
          >
            Sell my home
          </CtaButton>
          <CtaLink href="#savings" variant="outlineLight">
            See the comparison
          </CtaLink>
        </FadeIn>
      </Container>
    </section>
  );
}
