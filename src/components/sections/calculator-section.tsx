import { CommissionCalculator } from "@/components/calculator/commission-calculator";
import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";

export function CalculatorSection() {
  return (
    <section id="savings" className="section-space scroll-mt-24 bg-secondary/40">
      <Container>
        <FadeIn>
          <p className="eyebrow text-gold">Calculator</p>
          <h2 className="display-title mt-5 max-w-3xl text-4xl uppercase sm:text-5xl lg:text-[3.6rem]">
            How much could you save?
          </h2>
        </FadeIn>
        <FadeIn delay={0.12} className="mt-12 lg:mt-16">
          <CommissionCalculator />
        </FadeIn>
      </Container>
    </section>
  );
}
