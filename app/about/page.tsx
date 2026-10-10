import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "About FulCastle",
  description:
    "Learn about FulCastle Holdings, Inc., the parent company behind a portfolio of independent ventures.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section
          aria-labelledby="about-title"
          className="relative isolate overflow-hidden bg-graphite text-ivory"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-2/5 border-l border-ivory/10 lg:block"
          >
            <div className="absolute right-1/4 top-1/2 aspect-square w-64 -translate-y-1/2 rotate-45 border border-muted-gold/45" />
            <div className="absolute right-[18%] top-1/2 aspect-square w-44 -translate-y-1/2 rotate-45 border border-ivory/20" />
          </div>
          <div className="mx-auto w-full max-w-7xl px-6 py-20 sm:px-10 sm:py-28 lg:py-32">
            <p className="mb-7 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-gold">
              <span aria-hidden="true" className="h-px w-8 bg-muted-gold" />
              About FulCastle
            </p>
            <h1
              className="max-w-4xl font-display text-5xl leading-[1.04] tracking-[-0.045em] sm:text-6xl md:text-7xl"
              id="about-title"
            >
              A clear foundation.
              <span className="mt-2 block text-muted-gold">Independent paths.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-ivory/75 sm:text-lg sm:leading-8">
              FulCastle Holdings, Inc. is the parent company behind a portfolio
              of independent ventures. Each venture has its own focus, while
              FulCastle brings a long-term perspective to the portfolio as a whole.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="role-title"
          className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
        >
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate">
              The company
            </p>
            <h2
              className="max-w-xl font-display text-4xl leading-tight tracking-[-0.035em] sm:text-5xl"
              id="role-title"
            >
              One parent company.
              <span className="block text-slate">Distinct ventures.</span>
            </h2>
          </div>
          <div className="max-w-2xl lg:pt-9">
            <p className="text-lg leading-8 text-graphite/85 sm:text-xl sm:leading-9">
              FulCastle provides the parent-company context for its portfolio.
              The ventures are presented as distinct businesses rather than as
              a single service or operating brand.
            </p>
            <div className="mt-8 h-px w-full bg-graphite/15" />
            <p className="mt-6 max-w-xl text-sm leading-7 text-slate">
              This distinction keeps the focus clear: a shared long-term
              perspective at the portfolio level, with room for each venture
              to develop its own identity and purpose.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="approach-title"
          className="bg-[#fffdf9] py-20 sm:py-28"
        >
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate">
              A considered approach
            </p>
            <h2
              className="max-w-3xl font-display text-4xl leading-tight tracking-[-0.035em] sm:text-5xl"
              id="approach-title"
            >
              Structure creates room for possibility.
            </h2>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              <article className="border border-graphite/12 bg-ivory p-7 sm:p-8">
                <span className="text-xs font-semibold tracking-[0.18em] text-muted-gold">01</span>
                <h3 className="mt-6 font-display text-2xl tracking-tight text-graphite">
                  Long-term perspective
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate">
                  Consider decisions in the context of the portfolio over time,
                  not only in the moment.
                </p>
              </article>
              <article className="border border-graphite/12 bg-ivory p-7 sm:p-8">
                <span className="text-xs font-semibold tracking-[0.18em] text-muted-gold">02</span>
                <h3 className="mt-6 font-display text-2xl tracking-tight text-graphite">
                  Independent focus
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate">
                  Give each venture room to communicate its own purpose and
                  identity clearly.
                </p>
              </article>
              <article className="border border-graphite/12 bg-ivory p-7 sm:p-8">
                <span className="text-xs font-semibold tracking-[0.18em] text-muted-gold">03</span>
                <h3 className="mt-6 font-display text-2xl tracking-tight text-graphite">
                  Thoughtful development
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate">
                  Leave room for ideas to mature with clear structure and
                  deliberate choices.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-20 sm:px-10 sm:py-24 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate">
              Explore the portfolio
            </p>
            <h2 className="max-w-2xl font-display text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">
              Different paths. Clear purpose.
            </h2>
          </div>
          <Link
            className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start bg-muted-gold px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:bg-muted-gold hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold md:self-center"
            href="/#ventures"
          >
            Explore the ventures <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
