"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CoverImage } from "@/components/shared/cover-image";
import { CtaButton } from "@/components/shared/cta-button";
import { useLeadCapture } from "@/components/lead/lead-provider";
import { images } from "@/lib/site-content";

export function Hero() {
  const { openLeadCapture } = useLeadCapture();
  const reduceMotion = useReducedMotion();

  return (
    <section id="top" className="relative min-h-dvh overflow-hidden bg-ink">
      <div className="absolute inset-0">
        <CoverImage
          src={images.hero.src}
          alt={images.hero.alt}
          priority
          className="scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/55 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/30" />

      <div className="relative flex min-h-dvh items-end">
        <div className="container-site w-full pb-16 pt-32 sm:pb-20 lg:pb-24">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl text-white"
          >
            <p className="eyebrow text-gold">The 1% Realtor</p>
            <h1 className="display-title mt-6 text-[2.8rem] uppercase sm:text-6xl lg:text-[5.2rem]">
              I list.
              <span className="mt-2 block">I write offers.</span>
              <span className="mt-2 block">I get deals done.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/75 sm:text-lg">
              Hire me to sell your home for 1%, or as a 1% buyer representative
              if you&apos;ve already found the property.
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
          </motion.div>
        </div>
      </div>
    </section>
  );
}
