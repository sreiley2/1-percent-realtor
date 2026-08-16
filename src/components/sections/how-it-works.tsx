import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { buyerSteps, sellerSteps } from "@/lib/site-content";

export function HowItWorks() {
  return (
    <section id="process" className="section-space scroll-mt-24 bg-background">
      <Container>
        <FadeIn>
          <p className="eyebrow text-gold">Process</p>
          <h2 className="display-title mt-5 text-4xl uppercase sm:text-5xl lg:text-[3.6rem]">
            How it works.
          </h2>
        </FadeIn>

        <div className="mt-16 grid gap-16 lg:grid-cols-2 lg:gap-20">
          <ProcessColumn eyebrow="Buy" title="Find → Close" steps={buyerSteps} />
          <ProcessColumn eyebrow="Sell" title="Strategy → Close" steps={sellerSteps} delay={0.08} />
        </div>
      </Container>
    </section>
  );
}

function ProcessColumn({
  eyebrow,
  title,
  steps,
  delay = 0,
}: {
  eyebrow: string;
  title: string;
  steps: readonly { number: string; title: string; description: string }[];
  delay?: number;
}) {
  return (
    <FadeIn delay={delay}>
      <p className="eyebrow text-gold">{eyebrow}</p>
      <h3 className="display-title mt-4 text-3xl sm:text-4xl">{title}</h3>
      <ol className="mt-10 space-y-8">
        {steps.map((step) => (
          <li key={`${eyebrow}-${step.number}`} className="border-t border-foreground/10 pt-5">
            <p className="font-display text-2xl text-gold">{step.number}</p>
            <h4 className="mt-3 font-display text-2xl">{step.title}</h4>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {step.description}
            </p>
          </li>
        ))}
      </ol>
    </FadeIn>
  );
}
