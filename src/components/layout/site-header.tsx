"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BrandMark } from "@/components/shared/brand-mark";
import { CtaButton } from "@/components/shared/cta-button";
import { HashLink } from "@/components/shared/hash-link";
import { useLeadCapture } from "@/components/lead/lead-provider";
import { navLinks, site } from "@/lib/site-content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const { openLeadCapture } = useLeadCapture();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300",
        scrolled
          ? "border-b border-foreground/10 bg-background/92 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-4">
        <HashLink href="/#top" aria-label="1% Realtor home">
          <BrandMark inverted={!scrolled} />
        </HashLink>

        <nav className="hidden items-center gap-6 xl:gap-8 lg:flex">
          {navLinks.map((link) => (
            <HashLink
              key={link.href}
              href={link.href}
              className={cn(
                "text-[11px] font-medium tracking-[0.2em] uppercase transition-opacity hover:opacity-60",
                scrolled ? "text-foreground" : "text-white"
              )}
            >
              {link.label}
            </HashLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <CtaButton
            variant={scrolled ? "primary" : "light"}
            className="h-10 px-4 tracking-[0.16em] lg:h-12 lg:px-7"
            onClick={() =>
              openLeadCapture({ intent: "choice", source: "header-get-started" })
            }
          >
            Get started
          </CtaButton>

          <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "lg:hidden",
                  scrolled ? "text-foreground" : "text-white hover:bg-white/10"
                )}
              />
            }
          >
            <Menu className="size-5" />
            <span className="sr-only">Open menu</span>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-full max-w-xs rounded-none bg-background p-0"
          >
            <SheetHeader className="border-b border-border px-6 py-5">
              <SheetTitle className="font-sans text-foreground">
                <BrandMark />
              </SheetTitle>
            </SheetHeader>
            <nav className="flex flex-col gap-1 px-4 py-6">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  render={
                    <a
                      href={link.href}
                      className="px-2 py-3 text-sm tracking-[0.16em] uppercase"
                    />
                  }
                >
                  {link.label}
                </SheetClose>
              ))}
            </nav>
            <div className="px-6 pb-8">
              <CtaButton
                className="w-full"
                onClick={() =>
                  openLeadCapture({
                    intent: "choice",
                    source: "header-get-started-mobile",
                  })
                }
              >
                Get started
              </CtaButton>
              <p className="mt-4 text-xs text-muted-foreground">{site.region}</p>
            </div>
          </SheetContent>
        </Sheet>
        </div>
      </div>
    </header>
  );
}
