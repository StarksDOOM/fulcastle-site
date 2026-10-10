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

        <section
          aria-labelledby="founders-title"
          className="bg-graphite py-20 text-ivory sm:py-28"
        >
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-gold">
              The people behind FulCastle
            </p>
            <h2
              className="max-w-3xl font-display text-4xl leading-tight tracking-[-0.035em] sm:text-5xl"
              id="founders-title"
            >
              Different perspectives. A shared ambition.
            </h2>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              <article className="border border-ivory/15 bg-ivory/[0.04] p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-gold">
                  Founder &amp; CTO
                </p>
                <h3 className="mt-4 font-display text-3xl tracking-tight">
                  Gamaliel Fulgencio
                </h3>
                <p className="mt-5 text-sm leading-7 text-ivory/75">
                  Gamaliel leads FulCastle&apos;s technology and product direction,
                  overseeing software architecture, engineering, and the
                  development of the platforms and systems behind its ventures.
                  His work brings business concepts into practical products,
                  combining systems thinking with hands-on technical execution.
                </p>
                <p className="mt-4 text-sm leading-7 text-ivory/75">
                  His professional experience includes work with Nespresso,
                  Sony Music Entertainment, BMI, MLA, and FCB Health, across
                  consumer brands, media, digital platforms, and healthcare
                  marketing technology.
                </p>
              </article>
              <article className="border border-ivory/15 bg-ivory/[0.04] p-7 sm:p-9">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-gold">
                  Co-Founder
                </p>
                <h3 className="mt-4 font-display text-3xl tracking-tight">
                  Roman Castillo
                </h3>
                <p className="mt-5 text-sm leading-7 text-ivory/75">
                  Roman Castillo is a co-founder of FulCastle Holdings, Inc.,
                  contributing to the company&apos;s brand identity, marketing
                  direction, and partnership development. His focus is on
                  shaping how FulCastle and its ventures present themselves to
                  the market, establishing a cohesive brand presence, and
                  cultivating relationships that support long-term growth.
                </p>
                <p className="mt-4 text-sm leading-7 text-ivory/75">
                  Across FulCastle&apos;s diverse portfolio, Roman is focused on
                  helping each venture define its identity, communicate its
                  value, and connect with the audiences, collaborators, and
                  partners relevant to its goals. He brings a brand-oriented
                  perspective to the company&apos;s broader vision, supporting
                  the development of distinct venture identities under a
                  unified holding company.
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
