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
        This website, {new URL(site.url).host}, is operated by{" "}
        {site.agent.name}, {site.agent.dreNumber}, affiliated with{" "}
        {site.brokerage.name}. {site.name} is the consumer-facing brand for this
        practice. This policy describes how this website handles information. It
        is not a privacy policy for {site.brokerage.name} as a whole.
      </p>

      <p>
        Submitting a form on this website does not create a listing or buyer
        representation agreement.
      </p>

      <p>
        <strong className="font-medium text-foreground">
          Information you submit.
        </strong>{" "}
        If you use Get Started or another inquiry form, the site collects the
        information you enter: name, email address, and phone number. Depending
        on the form, you may also provide a property address, a listing or
        property URL, an estimated timeline or offer deadline, and any additional
        information you choose to write. If you used the home-value calculator
        before opening the form, the estimated value shown there may be included
        with your inquiry. The form also records which button or page section you
        used to start the request.
      </p>

      <p>
        <strong className="font-medium text-foreground">
          Information collected automatically.
        </strong>{" "}
        When you submit an inquiry, the site stores the browser user-agent string
        sent with that request. This website does not include analytics scripts,
        advertising pixels, or similar tracking tools.
      </p>

      <p>
        <strong className="font-medium text-foreground">How it is used.</strong>{" "}
        Inquiry information is used to follow up about selling a home or 1% buyer
        representation, and to operate this website. Inquiry information is not
        sold. It may be shared with {site.brokerage.name} as needed to provide
        real estate services, comply with the law, or complete a transaction you
        request.
      </p>

      <p>
        <strong className="font-medium text-foreground">Where it is stored and sent.</strong>{" "}
        Form submissions are stored in a Neon Postgres database used by this
        website. A notification email with the inquiry details is sent through
        Resend to the practice so someone can follow up. The website is hosted
        and deployed on Netlify.
      </p>

      <p>
        <strong className="font-medium text-foreground">
          Questions about your information.
        </strong>{" "}
        To ask about inquiry information submitted through this website, use Get
        Started on {new URL(site.url).host} or contact{" "}
        {site.brokerage.name}.
      </p>
    </LegalPage>
  );
}
