import Link from "next/link";
import { BrandMark } from "@/components/shared/brand-mark";
import { BrokerageMark } from "@/components/shared/brokerage-mark";
import { Container } from "@/components/shared/container";
import { HashLink } from "@/components/shared/hash-link";
import { legal, navLinks, site } from "@/lib/site-content";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-ink text-cream">
      <Container className="py-14 md:py-20">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <HashLink href="/#top" aria-label="1% Realtor home">
              <BrandMark inverted />
            </HashLink>
            <p className="mt-4 max-w-xs text-sm leading-6 text-cream/60">
              {site.tagline}
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-6 gap-y-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <HashLink
                  href={link.href}
                  className="text-[11px] tracking-[0.18em] text-cream/70 uppercase transition-colors hover:text-cream"
                >
                  {link.label}
                </HashLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14 grid gap-10 border-t border-white/10 pt-10 md:grid-cols-[auto_1fr] md:items-start md:gap-16">
          <BrokerageMark />
          <div className="max-w-md">
            <p className="font-display text-2xl">{site.agent.name}</p>
            <p className="mt-2 text-sm text-cream/70">{site.agent.dreNumber}</p>
            <p className="mt-1 text-sm text-cream/70">{site.brokerage.name}</p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[11px] tracking-[0.16em] uppercase">
              <li>
                <Link href="/privacy" className="text-cream/60 transition-colors hover:text-cream">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-cream/60 transition-colors hover:text-cream">
                  Terms / Disclaimer
                </Link>
              </li>
              <li className="text-cream/60">Equal Housing Opportunity</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] leading-5 text-cream/45 sm:flex-row sm:items-end sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.agent.name}. All rights reserved.
          </p>
          <p className="max-w-xl sm:text-right">{legal.footer}</p>
        </div>
      </Container>
    </footer>
  );
}
