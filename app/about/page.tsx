import type { Metadata } from "next";
import { headers } from "next/headers";
import { isLocale, type Locale } from "@/lib/i18n";
import { AboutSpanishPage } from "@/app/components/spanish-public-pages";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";

export async function generateMetadata(): Promise<Metadata> {
 const requestHeaders = await headers(); const isSpanish = requestHeaders.get("x-site-locale") === "es";
 return { title: isSpanish ? "Acerca de FulCastle" : "About FulCastle", description: isSpanish ? "Conoce FulCastle Holdings, Inc., la empresa matriz de una cartera de iniciativas independientes." : "Learn about FulCastle Holdings, Inc., the parent company behind a portfolio of independent ventures." };
}


export default async function AboutPage() {
 const requestHeaders = await headers(); const localeValue = requestHeaders.get("x-site-locale") ?? "en"; const locale: Locale = isLocale(localeValue) ? localeValue : "en";
 if (locale === "es") return <AboutSpanishPage />;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section
          aria-labelledby="about-title"
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
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:py-32">
            <div className="hero-copy relative z-10">
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

            <div
              aria-label="Abstract architectural composition representing a shared foundation and distinct paths"
              role="img"
              className="hero-artwork relative mx-auto hidden aspect-[4/5] w-full max-w-sm overflow-hidden border border-ivory/15 bg-[#20211f] sm:block sm:aspect-[5/4] lg:aspect-[4/5]"
            >
              <Image
                src="/images/architect-shared-foundation.jpg"
                alt="FulCastle architectural artwork depicting foundational structure with ascending pathways"
                fill
                priority
                sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 100vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-graphite/90 via-graphite/30 to-graphite/40" />
              <div className="relative z-10 p-6 sm:p-8 flex h-full flex-col justify-between">
                <div className="flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-ivory/80">
                  <span className="h-px w-6 bg-muted-gold" />
                  A shared foundation
                </div>
                <div>
                  <p className="font-display text-3xl leading-tight tracking-tight sm:text-4xl text-ivory">
                    Built with intention.
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-6 text-ivory/75">
                    One foundation. Room for different directions.
                  </p>
                </div>
              </div>
            </div>
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
            <p className={`text-lg leading-8 text-graphite/85 sm:text-xl sm:leading-9`}>
              FulCastle provides the parent-company context for its portfolio.
              The ventures are distinct in what they build, who they serve, and
              the identities they establish—not a single service under different names.
            </p>
            <div className="mt-8 h-px w-full bg-graphite/15" />
            <p className={`mt-6 max-w-xl text-sm leading-7 text-slate`}>
              The shared perspective is long-term; the work remains specific.
              Each venture has room to pursue its own purpose while sitting
              within a considered broader portfolio.
            </p>
          </div>
        </section>

        <section
          aria-labelledby="approach-title"
          className="relative overflow-hidden bg-[#fffdf9] py-20 sm:py-28"
        >
          <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 h-full w-[28%] border-l border-graphite/[0.04]">
            <div className="absolute right-[-7rem] top-16 h-64 w-64 rotate-45 border border-muted-gold/20" />
          </div>
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 sm:px-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate">
                A point of view
              </p>
              <h2
                className="max-w-xl font-display text-4xl leading-tight tracking-[-0.035em] sm:text-5xl"
                id="approach-title"
              >
                Build the foundation.
                <span className="block text-slate">Let each venture find its form.</span>
              </h2>
            </div>
            <div className="max-w-2xl lg:pt-10">
              <p className="text-lg leading-8 text-graphite/85 sm:text-xl sm:leading-9">
                FulCastle brings a long-term perspective to building distinct
                businesses. Each venture starts with its own problem to solve,
                audience to serve, and identity to establish.
              </p>
              <p className="mt-6 text-sm leading-7 text-slate sm:text-base sm:leading-8">
                A shared foundation should make that work clearer—not make
                every venture the same. The goal is room to build with
                intention, evolve with purpose, and let each idea stand on its
                own merits.
              </p>
              <div className="mt-10 grid gap-5 border-t border-graphite/15 pt-6 sm:grid-cols-2">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink">01 / Perspective</span>
                  <h3 className="mt-3 font-display text-xl text-graphite">Think beyond the moment</h3>
                  <p className="mt-2 text-sm leading-6 text-slate">
                    Make deliberate choices with the longer view in mind.
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gold-ink">02 / Independence</span>
                  <h3 className="mt-3 font-display text-xl text-graphite">Protect what makes each distinct</h3>
                  <p className="mt-2 text-sm leading-6 text-slate">
                    Let every venture speak clearly to its own audience and purpose.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="portfolio-title"
          className="bg-ivory py-20 sm:py-28"
        >
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
            <div className="flex flex-col gap-6">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate">
                  Across the portfolio
                </p>
                <h2
                  className="max-w-3xl font-display text-4xl leading-tight tracking-[-0.035em] sm:text-5xl"
                  id="portfolio-title"
                >
                  Different problems. Distinct paths.
                </h2>
              </div>
              <p className="max-w-2xl text-base leading-8 text-slate">
                A range of ideas, each shaped around a different need. Explore
                the areas taking form across the FulCastle portfolio.
              </p>
            </div>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
              <article className="group relative min-h-64 overflow-hidden border border-graphite/10 bg-graphite text-ivory sm:col-span-2 lg:col-span-2">
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(190,160,103,0.22),transparent_45%),linear-gradient(145deg,#292b29,#111211)]" />
                <div aria-hidden="true" className="absolute -right-5 bottom-[-4rem] h-56 w-40 rotate-[18deg] border border-muted-gold/55 bg-ivory/[0.04] transition-transform duration-500 group-hover:-translate-y-2" />
                <div aria-hidden="true" className="absolute right-12 bottom-[-3rem] h-44 w-24 rotate-[18deg] border border-ivory/20" />
                <div className="relative flex min-h-64 flex-col justify-between p-6 sm:p-7">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-muted-gold">Mobility</span>
                  <div>
                    <h3 className="font-display text-2xl">Rodar</h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-ivory/70">
                      Vehicle rental and agency tools focused on the Dominican Republic.
                    </p>
                  </div>
                </div>
              </article>

              <article className="group relative min-h-64 overflow-hidden border border-graphite/10 bg-[#e8e3d8] text-graphite sm:col-span-1 lg:col-span-2">
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.7),transparent_55%),radial-gradient(ellipse_at_85%_85%,rgba(190,160,103,0.3),transparent_48%)]" />
                <div aria-hidden="true" className="absolute right-[-1rem] top-8 h-40 w-40 rounded-full border border-graphite/20" />
                <div aria-hidden="true" className="absolute right-8 top-16 h-24 w-24 rounded-full border border-muted-gold/80" />
                <div className="relative flex min-h-64 flex-col justify-between p-6 sm:p-7">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-slate">Commerce intelligence</span>
                  <div>
                    <h3 className="font-display text-2xl">Vantage</h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-graphite/70">
                      Product discovery and trend-informed commerce workflows.
                    </p>
                  </div>
                </div>
              </article>

              <article className="group relative min-h-64 overflow-hidden border border-graphite/10 bg-[#202a30] text-ivory sm:col-span-1 lg:col-span-2">
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_20%,rgba(117,158,173,0.22),transparent_42%),linear-gradient(145deg,#26343a,#111719)]" />
                <div aria-hidden="true" className="absolute right-[-2rem] top-[-2rem] h-48 w-48 rotate-45 border border-[#91b8c3]/45" />
                <div aria-hidden="true" className="absolute right-8 top-12 h-28 w-28 rotate-45 border border-ivory/20" />
                <div className="relative flex min-h-64 flex-col justify-between p-6 sm:p-7">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#b8d0d6]">Public-sector technology</span>
                  <div>
                    <h3 className="font-display text-2xl">Civora</h3>
                    <p className="mt-2 max-w-xs text-sm leading-6 text-ivory/70">
                      Technology for discovering and evaluating government-contracting opportunities.
                    </p>
                  </div>
                </div>
              </article>

              <article className="group relative min-h-64 overflow-hidden border border-graphite/10 bg-[#eee4e0] text-graphite sm:col-span-1 lg:col-span-3">
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_15%,rgba(180,111,121,0.2),transparent_45%),linear-gradient(135deg,#f3e9e5,#e5d5d1)]" />
                <div aria-hidden="true" className="absolute right-8 top-8 h-28 w-28 rounded-full border border-[#b46f79]/45" />
                <div aria-hidden="true" className="absolute right-14 top-14 h-16 w-16 rounded-full border border-[#b46f79]/35" />
                <div className="relative flex min-h-64 flex-col justify-between p-6 sm:p-7">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#824752]">Personal expression</span>
                  <div>
                    <h3 className="font-display text-2xl">Sweet Nothings</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-graphite/70">
                      Personalized, AI-generated affectionate messages shaped around individual preferences.
                    </p>
                  </div>
                </div>
              </article>

              <article className="group relative min-h-64 overflow-hidden border border-graphite/10 bg-[#dfe4df] text-graphite sm:col-span-1 lg:col-span-3">
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,255,255,0.6),transparent_58%),radial-gradient(ellipse_at_85%_90%,rgba(108,133,116,0.25),transparent_45%)]" />
                <div aria-hidden="true" className="absolute right-8 top-8 h-36 w-28 border border-[#6c8574]/45" />
                <div aria-hidden="true" className="absolute right-14 top-14 h-36 w-28 border border-graphite/20" />
                <div className="relative flex min-h-64 flex-col justify-between p-6 sm:p-7">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-[#405b4a]">Real estate workflows</span>
                  <div>
                    <h3 className="font-display text-2xl">PropTech Real Estate</h3>
                    <p className="mt-2 max-w-sm text-sm leading-6 text-graphite/70">
                      Property listing and agent-inventory workflows, with transaction tooling for the Dominican Republic.
                    </p>
                  </div>
                </div>
              </article>
            </div>

            <div className="mt-9 flex flex-col gap-4 border-t border-graphite/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm leading-6 text-slate">
                Each venture has its own focus and identity. The portfolio will continue to take shape over time.
              </p>
              <Link
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start border border-graphite/20 px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:border-muted-gold hover:bg-muted-gold/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold sm:self-center"
                href="/ventures"
              >
                Explore the ventures <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="founders-title"
          className="bg-graphite py-20 text-ivory sm:py-28"
        >
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
            <div className="grid gap-8 border-b border-ivory/15 pb-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <div>
                <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-muted-gold">
                  The people behind FulCastle
                </p>
                <h2
                  className="max-w-2xl font-display text-4xl leading-tight tracking-[-0.035em] sm:text-5xl"
                  id="founders-title"
                >
                  Different perspectives.
                  <span className="block text-ivory/55">A shared ambition.</span>
                </h2>
              </div>
              <p className="max-w-xl text-base leading-8 text-ivory/70 lg:pt-10">
                Technology, product thinking, brand, and relationships each
                shape how a venture finds its place. FulCastle brings those
                perspectives together while leaving each business room to define itself.
              </p>
            </div>

            <div className="grid gap-5 pt-8 md:grid-cols-[1.1fr_0.9fr]">
              <article className="relative overflow-hidden border border-ivory/15 bg-ivory/[0.04] p-7 sm:p-9 lg:p-11">
                <div aria-hidden="true" className="absolute right-0 top-0 h-40 w-40 translate-x-1/3 -translate-y-1/3 rotate-45 border border-muted-gold/20" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-gold">
                    Founder &amp; CTO
                  </p>
                  <h3 className="mt-4 font-display text-3xl tracking-tight sm:text-4xl">
                    Gamaliel Fulgencio
                  </h3>
                  <p className="mt-5 max-w-2xl text-sm leading-7 text-ivory/75 sm:text-base sm:leading-8">
                    Gamaliel leads FulCastle&apos;s technology and product direction,
                    overseeing software architecture, engineering, and the
                    development of the platforms and systems behind its ventures.
                    His work brings business concepts into practical products,
                    combining systems thinking with hands-on technical execution.
                  </p>
                  <p className="mt-4 max-w-2xl text-sm leading-7 text-ivory/75 sm:text-base sm:leading-8">
                    His professional experience includes work with Nespresso,
                    Sony Music Entertainment, BMI, MLA, and FCB Health, across
                    consumer brands, media, digital platforms, and healthcare
                    marketing technology.
                  </p>
                </div>
              </article>

              <article className="relative overflow-hidden border border-ivory/15 bg-[#242522] p-7 sm:p-9 lg:mt-12 lg:p-10">
                <div aria-hidden="true" className="absolute bottom-0 right-0 h-48 w-48 translate-x-1/4 translate-y-1/4 rounded-full border border-muted-gold/25" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-gold">
                    Co-Founder
                  </p>
                  <h3 className="mt-4 font-display text-3xl tracking-tight">
                    Roman Castillo
                  </h3>
                  <p className="mt-5 text-sm leading-7 text-ivory/75">
                    Roman Castillo is a co-founder of FulCastle Holdings, Inc.,
                    contributing to brand identity, marketing direction, and
                    partnership development. He helps shape how FulCastle and its
                    ventures present themselves, building a cohesive presence
                    while preserving each venture&apos;s distinct identity.
                  </p>
                  <p className="mt-4 text-sm leading-7 text-ivory/75">
                    Roman helps ventures communicate their value and connect with
                    relevant audiences and partners. He supports FulCastle&apos;s
                    broader vision through clear positioning and meaningful
                    relationships.
                  </p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-[#fffdf9]">
          <div aria-hidden="true" className="absolute inset-y-0 right-0 -z-10 w-1/3 border-l border-graphite/[0.06]">
            <div className="absolute right-[-5rem] top-1/2 h-64 w-64 -translate-y-1/2 rotate-45 border border-muted-gold/25" />
          </div>
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-20 sm:px-10 sm:py-24 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-slate">
                Explore the portfolio
              </p>
              <h2 className="max-w-2xl font-display text-3xl leading-tight tracking-[-0.035em] sm:text-4xl">
                Different paths. Clear purpose.
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-slate">
                Get to know the ventures and the distinct problems each is built to address.
              </p>
            </div>
            <Link
              className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start bg-muted-gold px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold md:self-center"
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
