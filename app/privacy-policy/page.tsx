import type { Metadata } from "next";
import { headers } from "next/headers";
import { isLocale, type Locale } from "@/lib/i18n";
import { PrivacySpanishPage } from "@/app/components/spanish-public-pages";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";

export async function generateMetadata(): Promise<Metadata> {
 const requestHeaders = await headers(); const isSpanish = requestHeaders.get("x-site-locale") === "es";
 return { title: isSpanish ? "Política de privacidad" : "Privacy Policy", description: isSpanish ? "Conoce cómo FulCastle Holdings, Inc. trata la información enviada a través de su sitio web corporativo." : "Learn how FulCastle Holdings, Inc. handles information submitted through its corporate website." };
}

const sections = [
  {
    title: "1. Who we are and what this policy covers",
    paragraphs: [
      "FulCastle Holdings, Inc. is the parent company behind a portfolio of independent ventures. This policy covers the fulcastle.com corporate website and its contact form. A venture may operate its own product or service under separate terms and privacy notices; this policy does not replace those notices.",
      "This website is intended to provide information about FulCastle and its portfolio. It is not designed as an account-based service and the current site does not provide user registration or a database-backed customer portal.",
    ],
  },
  {
    title: "2. Information you provide",
    paragraphs: [
      "If you use the contact form, we collect the name, email address, subject, and message you submit. Please do not send passwords, payment-card details, government identification numbers, or other sensitive information through the form.",
      "The form also includes a hidden anti-spam field. It is used to identify automated submissions; it is not intended to collect additional information from ordinary visitors.",
    ],
  },
  {
    title: "3. How we use information",
    paragraphs: [
      "We use contact-form information to review and respond to inquiries, route messages to the appropriate person, maintain necessary business correspondence, and protect the site against abuse or misuse.",
      "We do not use the contact form to enroll you in a marketing mailing list. A confirmation email may be sent to acknowledge receipt of your message.",
    ],
  },
  {
    title: "4. Service providers and disclosures",
    paragraphs: [
      "The website is hosted through Vercel. When you submit the contact form, the site uses Resend to transmit the inquiry and, where configured, send an acknowledgment email. Those providers process information as needed to provide their services and are subject to their own terms and privacy practices.",
      "The website application does not currently store contact submissions in a site-owned database. Messages may remain in the recipient's or copied recipient's email systems and in service-provider systems or operational logs, subject to the relevant configurations and retention practices.",
      "We may also disclose information when reasonably necessary to protect the website or our rights, respond to lawful requests, or meet applicable legal obligations. We do not use contact-form information to enroll you in unrelated marketing through this website.",
    ],
  },
  {
    title: "5. Technical information, cookies, and analytics",
    paragraphs: [
      "When you visit a hosted website, technical information such as your IP address, browser or device details, requested page, and request time may be processed by hosting, delivery, or security infrastructure to deliver the site, diagnose errors, and help prevent abuse. The exact information and retention periods depend on provider configuration and their policies.",
      "The current website code does not include an analytics or advertising-tracking integration. We do not intentionally set analytics or advertising cookies through the site application. Hosting or security providers may use necessary technical mechanisms to operate or protect their services. Provider settings should be reviewed periodically to ensure this description remains accurate.",
    ],
  },
  {
    title: "6. Retention and security",
    paragraphs: [
      "We retain inquiry information for as long as reasonably needed to handle the inquiry, maintain relevant business records, address security concerns, and meet legal obligations. We have not established a single fixed deletion period for every inquiry; retention can also depend on the email and service-provider systems involved.",
      "We use reasonable operational measures intended to protect information, but no website, email transmission, or storage system can be guaranteed to be completely secure.",
    ],
  },
  {
    title: "7. Your choices and privacy rights",
    paragraphs: [
      "Depending on where you live, applicable law may give you rights to request access to, correction of, or deletion of personal information, or to object to or restrict certain processing. These rights are not universal and may be subject to exceptions.",
      "To ask a privacy question or make a request, use our contact page. We may need to verify your request before acting on it.",
    ],
  },
  {
    title: "8. International processing",
    paragraphs: [
      "Our website and email service providers may process information in countries other than the country where you are located. The locations and safeguards applicable to a particular service depend on the provider, its configuration, and the services used.",
    ],
  },
  {
    title: "9. Children",
    paragraphs: [
      "This corporate website is not directed to children, and we do not knowingly request personal information from children through the contact form. If you believe a child has submitted personal information, contact us so the matter can be reviewed.",
    ],
  },
  {
    title: "10. Changes and contact",
    paragraphs: [
      "We may update this policy when the website, its providers, or our practices change. The date shown above indicates when this text was last updated. Please review the policy periodically.",
      "For privacy questions or requests, visit the contact page on this website.",
    ],
  },
];

export default async function PrivacyPolicyPage() {
 const requestHeaders = await headers(); const localeValue = requestHeaders.get("x-site-locale") ?? "en"; const locale: Locale = isLocale(localeValue) ? localeValue : "en";
 if (locale === "es") return <PrivacySpanishPage />;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 bg-ivory">
        <section className="bg-graphite text-ivory">
          <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10 sm:py-20">
            <p className="mb-5 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-gold">
              <span aria-hidden="true" className="h-px w-8 bg-muted-gold" />
              Legal information
            </p>
            <h1 className="max-w-3xl font-display text-5xl leading-tight tracking-[-0.04em] sm:text-6xl">
              Privacy <span className="text-muted-gold">Policy</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ivory/75 sm:text-lg sm:leading-8">
              What information this corporate website handles, why it is used,
              and the choices available to you.
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-ivory/55">
              Last updated: October 10, 2026
            </p>
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
          <article className="min-w-0 space-y-10">
            {sections.map((section) => (
              <section aria-labelledby={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")} key={section.title}>
                <h2
                  className="font-display text-2xl leading-tight tracking-tight text-graphite sm:text-3xl"
                  id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")}
                >
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-slate sm:text-base sm:leading-8">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
            <p className="border-l-2 border-muted-gold pl-4 text-sm leading-7 text-slate">
              This page is general website information, not legal advice. The
              company should confirm its actual hosting, logging, email-retention,
              cookie, and jurisdiction-specific obligations with qualified counsel
              before treating this policy as final.
            </p>
          </article>

          <aside className="h-fit border border-graphite/10 bg-[#fffdf9] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">
              Get in touch
            </p>
            <nav aria-label="Related legal pages" className="mt-4 flex flex-col gap-3 text-sm font-semibold text-graphite">
              <Link className="underline decoration-muted-gold underline-offset-4 hover:text-slate" href="/contact">
                Contact FulCastle
              </Link>
            </nav>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
