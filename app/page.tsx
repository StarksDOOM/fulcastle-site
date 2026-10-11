import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "Built on Structure. Driven by Possibility.",
  description:
    "FulCastle Holdings, Inc. is a parent company behind a portfolio of independent ventures, with a long-term perspective on what comes next.",
};

const ventures = [
  {
    name: "Rodar",
    category: "Mobility",
    href: "/ventures#rodar",
  },
  {
    name: "Vantage",
    category: "Commerce intelligence",
    href: "/ventures#vantage",
  },
  {
    name: "Civora",
    category: "Public-sector technology",
    href: "/ventures#civora",
  },
  {
    name: "Sweet Nothings",
    category: "Personal expression",
    href: "/ventures#sweet-nothings",
  },
  {
    name: "PropTech Real Estate",
    category: "Real estate workflows",
    href: "/ventures#proptech-real-estate",
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-graphite text-ivory">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-25">
            <div className="absolute -right-36 -top-40 h-[34rem] w-[34rem] rounded-full border border-muted-gold/60 sm:right-[-8rem] sm:top-[-15rem]" />
            <div className="absolute -right-20 -top-24 h-[26rem] w-[26rem] rounded-full border border-ivory/20 sm:right-[-2rem] sm:top-[-9rem]" />
            <div className="absolute bottom-0 right-[12%] top-0 hidden w-px bg-ivory/10 lg:block" />
            <div className="absolute bottom-0 right-[27%] top-0 hidden w-px bg-ivory/10 lg:block" />
          </div>
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-20 sm:px-10 sm:py-28 lg:min-h-[610px] lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 lg:py-32">
            <div className="max-w-3xl">
              <p className="mb-7 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-gold">
                <span className="h-px w-8 bg-muted-gold" />
                FulCastle Holdings, Inc.
              </p>
              <h1 className="font-display text-5xl leading-[1.04] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[5.35rem]" id="hero-title">
                Built on structure.
                <span className="mt-2 block text-muted-gold">Driven by possibility.</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-7 text-ivory/75 sm:text-lg sm:leading-8">
                A parent company with a long-term perspective on building and supporting independent ventures.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link className="inline-flex min-h-12 items-center justify-center gap-3 bg-muted-gold px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:bg-muted-gold hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold" href="/#ventures">
                  Explore the ventures <span aria-hidden="true">↗</span>
                </Link>
                <Link className="inline-flex min-h-12 items-center justify-center border border-ivory/35 px-5 py-3 text-sm font-semibold text-ivory transition-colors hover:border-muted-gold hover:text-muted-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold" href="/about">
                  About FulCastle Holdings, Inc.
                </Link>
              </div>
            </div>
            <div className="mx-auto w-full max-w-[23rem] sm:max-w-[27rem] lg:max-w-none">
              <div className="relative flex aspect-square w-full items-center justify-center">
                <div aria-hidden="true" className="absolute inset-[7%] rotate-45 border border-muted-gold/60" />
                <div aria-hidden="true" className="absolute inset-[19%] rotate-45 border border-ivory/25" />
                <div aria-hidden="true" className="absolute inset-[31%] rotate-45 border border-muted-gold/50" />
                <div aria-hidden="true" className="absolute left-1/2 top-[7%] h-[86%] w-px -translate-x-1/2 bg-ivory/20" />
                <div aria-hidden="true" className="absolute left-[7%] top-1/2 h-px w-[86%] -translate-y-1/2 bg-ivory/20" />
                <div className="relative flex h-28 w-28 items-center justify-center border border-muted-gold bg-graphite sm:h-36 sm:w-36">
                  <div className="flex h-16 w-16 items-center justify-center border border-ivory/60 sm:h-20 sm:w-20">
                    <span aria-label="FC" className="font-display text-3xl tracking-[-0.08em] text-muted-gold sm:text-4xl">FC</span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-right text-[0.6rem] uppercase leading-5 tracking-[0.2em] text-ivory/55">
                A long-term view
              </p>
            </div>
          </div>
          <div className="border-t border-ivory/15">
            <div className="mx-auto grid w-full max-w-7xl gap-5 px-6 py-5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ivory/60 sm:grid-cols-3 sm:px-10 sm:py-6">
              <p>Independent ventures</p>
              <p className="sm:text-center">A considered foundation</p>
              <p className="sm:text-right">Long-term perspective</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="company-title" className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20" id="company">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate">The company</p>
            <h2 className="max-w-xl font-display text-4xl leading-tight tracking-[-0.035em] sm:text-5xl" id="company-title">
              One foundation.
              <span className="block text-slate">Independent paths.</span>
            </h2>
          </div>
          <div className="max-w-2xl lg:pt-9">
            <p className="text-lg leading-8 text-graphite/85 sm:text-xl sm:leading-9">
              FulCastle Holdings, Inc. is the parent company behind a portfolio of independent ventures. Each venture has its own focus, while FulCastle brings a long-term perspective to the portfolio as a whole.
            </p>
            <div className="mt-8 h-px w-full bg-graphite/15" />
            <p className="mt-6 max-w-xl text-sm leading-7 text-slate">
              We believe durable work starts with a clear structure, thoughtful decisions, and room for ideas to develop on their own terms.
            </p>
          </div>
        </section>

        <section aria-labelledby="ventures-title" className="bg-[#fffdf9] py-20 sm:py-28" id="ventures">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
            <div className="border-b border-graphite/15 pb-8">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate">The portfolio</p>
              <h2 className="max-w-3xl font-display text-4xl leading-tight tracking-[-0.035em] sm:text-5xl" id="ventures-title">
                Different paths. Clear purpose.
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate">
                FulCastle Holdings, Inc. is the parent company behind these independent venture concepts. Each has a distinct area of focus and room to develop.
              </p>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {ventures.map((venture, index) => (
                <article className="group flex min-h-[10.5rem] flex-col justify-between border border-graphite/12 bg-ivory p-5 hover:bg-white motion-reduce:transition-none sm:p-6" key={venture.name}>
                  <span className="text-xs font-semibold tracking-[0.18em] text-gold-ink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="mt-6 flex flex-1 flex-col justify-end">
                    <h3 className="font-display text-xl leading-tight tracking-tight text-graphite">
                      <Link className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold" href={venture.href}>
                        {venture.name}
                      </Link>
                    </h3>
                    <p className="mt-2 min-h-[2.5rem] text-[0.65rem] font-medium uppercase leading-5 tracking-[0.12em] text-slate">
                      {venture.category}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 border-t border-graphite/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm leading-6 text-slate">
                These are areas of focus, not claims that every venture is launched or commercially available.
              </p>
              <Link className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start bg-muted-gold px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold sm:self-center" href="/ventures">
                Explore all ventures <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="contact-title" className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-20 sm:px-10 sm:py-24 md:flex-row md:items-center md:justify-between" id="contact">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate">Start a conversation</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight tracking-[-0.035em] sm:text-5xl" id="contact-title">
              Have something worth building?
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate">
              For inquiries and potential collaborations, get in touch with FulCastle Holdings, Inc.
            </p>
          </div>
          <Link className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start border border-graphite px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:border-muted-gold hover:bg-muted-gold hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold md:self-center" href="/contact">
            Contact FulCastle <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
