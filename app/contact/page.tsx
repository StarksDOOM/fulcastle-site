import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";
import { ContactForm } from "@/app/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact FulCastle Holdings, Inc. for business inquiries, partnerships, and general questions.",
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section
          aria-labelledby="contact-title"
          className="relative isolate overflow-hidden bg-graphite text-ivory"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
          >
            <div className="absolute -right-24 top-8 h-[30rem] w-[30rem] rotate-45 border border-muted-gold/25 sm:right-0 lg:right-[8%] lg:top-[-5rem] lg:h-[42rem] lg:w-[42rem]" />
            <div className="absolute -right-10 top-24 h-[22rem] w-[22rem] rotate-45 border border-ivory/10 sm:right-[8%] lg:right-[15%] lg:top-12 lg:h-[30rem] lg:w-[30rem]" />
            <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-muted-gold/50 to-transparent" />
          </div>
          <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:py-32">
            <p className="mb-7 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-gold">
              <span aria-hidden="true" className="h-px w-8 bg-muted-gold" />
              Contact FulCastle
            </p>
            <h1
              className="max-w-4xl font-display text-5xl leading-[1.04] tracking-[-0.045em] sm:text-6xl md:text-7xl"
              id="contact-title"
            >
              Start a conversation.
              <span className="mt-2 block text-muted-gold">Build with intention.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-ivory/75 sm:text-lg sm:leading-8">
              For business inquiries, potential partnerships, or questions about
              FulCastle Holdings, Inc. and its ventures, send us a message using
              the form below.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="form-title"
          className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-16 sm:px-10 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
        >
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate">
              Get in touch
            </p>
            <h2
              className="max-w-xl font-display text-3xl leading-tight tracking-[-0.035em] sm:text-4xl"
              id="form-title"
            >
              Tell us what you have in mind.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate">
              Share a little context and the right person at FulCastle will
              follow up if a response is appropriate.
            </p>
          </div>
          <div className="max-w-2xl border border-graphite/15 bg-[#fffdf9] p-6 sm:p-9">
            <ContactForm />
            <p className="mt-6 border-t border-graphite/10 pt-5 text-xs leading-6 text-slate">
              Your message and contact details are used to respond to your
              inquiry. Please do not include passwords, payment details, or
              other sensitive information.
            </p>
          </div>
        </section>

        <section className="border-t border-graphite/10 bg-[#fffdf9]">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-10 sm:px-10 md:flex-row md:items-center md:justify-between">
            <p className="max-w-2xl text-sm leading-7 text-slate">
              Learn more about FulCastle Holdings, Inc. and the independent ventures
              taking shape across its portfolio.
            </p>
            <Link
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 border border-graphite/20 px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:border-muted-gold hover:bg-muted-gold/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold"
              href="/ventures"
            >
              Explore the ventures <span aria-hidden="true">↗</span>
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
