import type { ReactNode } from "react";
import { Container } from "@/components/shared/container";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <main className="flex-1 bg-background pt-28 pb-20 md:pt-32 md:pb-28">
      <Container>
        <p className="eyebrow text-gold">1% Realtor</p>
        <h1 className="display-title mt-5 max-w-3xl text-4xl uppercase sm:text-5xl">
          {title}
        </h1>
        <div className="mt-10 max-w-2xl space-y-6 text-sm leading-7 text-muted-foreground">
          {children}
        </div>
      </Container>
    </main>
  );
}
