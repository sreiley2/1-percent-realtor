import { About } from "@/components/sections/about";
import { BuyerOffer } from "@/components/sections/buyer-offer";
import { CalculatorSection } from "@/components/sections/calculator-section";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { SellerValue } from "@/components/sections/seller-value";
import { WhatIDo } from "@/components/sections/what-i-do";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIDo />
      <BuyerOffer />
      <SellerValue />
      <HowItWorks />
      <CalculatorSection />
      <About />
      <Faq />
      <FinalCta />
    </main>
  );
}
