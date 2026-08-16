import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Container } from "@/components/shared/container";
import { FadeIn } from "@/components/shared/fade-in";
import { faqGroups } from "@/lib/site-content";

export function Faq() {
  return (
    <section id="faq" className="section-space scroll-mt-24 bg-secondary/40">
      <Container>
        <FadeIn>
          <p className="eyebrow text-gold">Questions</p>
          <h2 className="display-title mt-5 max-w-3xl text-4xl uppercase sm:text-5xl lg:text-[3.6rem]">
            FAQ
          </h2>
          <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground">
            The details, without the extra pages.
          </p>
        </FadeIn>

        <div className="mt-16 space-y-16">
          {faqGroups.map((group) => (
            <FadeIn key={group.title}>
              <h3 className="eyebrow text-gold">{group.title}</h3>
              <Accordion className="mt-6 border-t border-foreground/10">
                {group.items.map((faq) => (
                  <AccordionItem key={faq.question} value={faq.question}>
                    <AccordionTrigger className="py-6 text-left font-display text-xl hover:no-underline sm:text-2xl">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-sm leading-7 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </FadeIn>
          ))}
        </div>
      </Container>
    </section>
  );
}
