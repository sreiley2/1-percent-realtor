import type { Metadata } from "next";
import { LegalPage } from "@/components/shared/legal-page";
import { site } from "@/lib/site-content";

export const metadata: Metadata = {
  title: `Privacy Policy | ${site.name}`,
  description: `Privacy policy for ${site.name}, the consumer-facing practice of ${site.agent.name}.`,
};

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy">
      <p>
        This website is operated by {site.agent.name}, {site.agent.dreNumber},
        affiliated with {site.brokerage.name}. {site.name} is the
        consumer-facing brand for this practice.
      </p>
      <p>
        If you submit a form, the information you provide — such as name, email,
        phone, property address, listing URL, timeline, and message — is used to
        follow up about your inquiry. Submitting a form does not create a
        listing or buyer representation agreement.
      </p>
      <p>
        Inquiry information is not sold. It may be shared with {site.brokerage.name}
        as needed to provide real estate services, comply with the law, or
        complete a transaction you request.
      </p>
      <p>
        This page describes how this website handles inquiry information. It is
        not a complete privacy policy for {site.brokerage.name} as a whole.
      </p>
    </LegalPage>
  );
}
