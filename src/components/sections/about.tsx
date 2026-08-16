import Image from "next/image";
import { BrokerageMark } from "@/components/shared/brokerage-mark";
import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { site } from "@/lib/site-content";

const credentials = [
  site.agent.name,
  site.agent.dreNumber,
  site.agent.experience,
  site.agent.areas,
] as const;

export function About() {
  return (
    <section id="about" className="section-space scroll-mt-24 bg-background">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <FadeIn>
            <div className="mx-auto w-full max-w-[14rem] lg:mx-0">
              <Image
                src="/brand/logo.png"
                alt=""
                width={512}
                height={512}
                quality={100}
                unoptimized
                className="h-auto w-full"
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <p className="eyebrow text-gold">About</p>
            <h2 className="display-title mt-5 text-4xl uppercase sm:text-5xl lg:text-[3.4rem]">
              A different kind of Realtor.
            </h2>
            <div className="mt-8 max-w-xl space-y-6 text-base leading-8 text-muted-foreground">
              <p>Real estate doesn&apos;t have to be done the traditional way.</p>
              <p>
                Some clients want an agent beside them at every open house.
                Others already know how to find properties and want professional
                expertise where it matters most: pricing, analysis, strategy,
                negotiation, and transaction management.
              </p>
              <p>
                This practice is designed around those high-value parts of real
                estate — for sellers listing at 1%, and for buyers who have
                already found the home they want.
              </p>
            </div>

            <ul className="mt-10 max-w-md space-y-3 border-t border-foreground/10 pt-6">
              {credentials.map((item) => (
                <li key={item} className="text-sm leading-6">
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-8">
              <p className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                Affiliated with
              </p>
              <div className="mt-3 w-[4.75rem]">
                <BrokerageMark className="w-full" />
              </div>
            </div>
          </FadeIn>
        </div>
      </Container>
    </section>
  );
}
