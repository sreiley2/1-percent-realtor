import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/legal-page";
import { legal, site } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Terms / Disclaimer | ${site.name}`,
  description: `Terms and disclaimer for ${site.name}, the consumer-facing practice of ${site.agent.name}.`,
};

export default function Terms() {
  return (
    <LegalPage title="Terms / Disclaimer">
      <p>
        {site.name} is the consumer-facing brand for the real estate practice of{" "}
        {site.agent.name}, {site.agent.dreNumber}, affiliated with{" "}
        {site.brokerage.name}. It is not a separate brokerage.
      </p>
      <p>
        Information on this website is general and for convenience only. It is
        not legal, tax, or financial advice, and it is not an offer of
        representation. A listing or buyer representation relationship exists
        only after the required agreements and disclosures are signed.
      </p>
      <p>{legal.footer}</p>
      <p>
        Advertising language, commission claims, buyer compensation language,
        and required disclosures are subject to brokerage review.
      </p>
    </LegalPage>
  );
}
