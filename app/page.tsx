import type { Metadata } from "next";
import { headers } from "next/headers";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";

export async function generateMetadata(): Promise<Metadata> {
 const requestHeaders = await headers(); const isSpanish = requestHeaders.get("x-site-locale") === "es";
 return { alternates: { canonical: isSpanish ? "/es" : "/", languages: { en: "/", es: "/es" } }, openGraph: { locale: isSpanish ? "es_ES" : "en_US" }, title: isSpanish ? "Construidos sobre una base sólida. Impulsados por las posibilidades." : "Built on Structure. Driven by Possibility.", description: isSpanish ? "FulCastle Holdings, Inc. es una empresa matriz con una visión a largo plazo para desarrollar y apoyar iniciativas independientes." : "FulCastle Holdings, Inc. is a parent company behind a portfolio of independent ventures, with a long-term perspective on what comes next." };
}

const ventures = [
  {
    name: "Rodar",
    category: "Mobility", categoryEs: "Movilidad",
    href: "https://rodar.do",
  },
  {
    name: "Vantage",
    category: "Commerce intelligence", categoryEs: "Inteligencia comercial",
    href: "/ventures#vantage",
  },
  {
    name: "Civora",
    category: "Public-sector technology", categoryEs: "Tecnología para el sector público",
    href: "/ventures#civora",
  },
  {
    name: "Sweet Nothings",
    category: "Personal expression", categoryEs: "Expresión personal",
    href: "/ventures#sweet-nothings",
  },
  {
    name: "PropTech Real Estate",
    category: "Real estate workflows", categoryEs: "Procesos inmobiliarios",
    href: "/ventures#proptech-real-estate",
  },
];

export default async function HomePage() {
 const requestHeaders = await headers(); const localeValue = requestHeaders.get("x-site-locale") ?? "en"; const locale: Locale = isLocale(localeValue) ? localeValue : "en";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-graphite text-ivory">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 opacity-25">
            <div className="absolute -right-36 -top-40 h-[34rem] w-[34rem] rounded-full border border-muted-gold/60 sm:right-[-8rem] sm:top-[-15rem]" />
            <div className="absolute -right-20 -top-24 h-[26rem] w-[26rem] rounded-full border border-ivory/20 sm:right-[-2rem] sm:top-[-9rem]" />
            <div className="absolute bottom-0 right-[12%] top-0 hidden w-px bg-ivory/10 lg:block" />
            <div className="absolute bottom-0 right-[27%] top-0 hidden w-px bg-ivory/10 lg:block" />
          </div>
          <div className="mx-auto grid w-full max-w-7xl items-center gap-14 px-6 py-20 sm:px-10 sm:py-28 lg:min-h-[610px] lg:grid-cols-[1.2fr_0.8fr] lg:gap-10 lg:py-32">
            <div className="hero-copy max-w-3xl">
              <p className="mb-7 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-gold">
                <span className="h-px w-8 bg-muted-gold" />
                FulCastle Holdings, Inc.
              </p>
              <h1 className="font-display text-5xl leading-[1.04] tracking-[-0.045em] sm:text-6xl md:text-7xl lg:text-[5.35rem]" id="hero-title">
                {locale === "es" ? "Construidos sobre una base sólida." : "Built on structure."}
                <span className="mt-2 block text-muted-gold">{locale === "es" ? "Impulsados por las posibilidades." : "Driven by possibility."}</span>
              </h1>
              <p className="mt-8 max-w-xl text-base leading-7 text-ivory/75 sm:text-lg sm:leading-8">
                {locale === "es" ? "Una empresa matriz con una visión a largo plazo para desarrollar y apoyar iniciativas independientes." : "A parent company with a long-term perspective on building and supporting independent ventures."}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link className="inline-flex min-h-12 items-center justify-center gap-3 bg-muted-gold px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:bg-muted-gold hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold" href={localizePath("/#ventures", locale)}>
                  {locale === "es" ? "Explorar las iniciativas" : "Explore the ventures"} <span aria-hidden="true">↗</span>
                </Link>
                <Link className="inline-flex min-h-12 items-center justify-center border border-ivory/35 px-5 py-3 text-sm font-semibold text-ivory transition-colors hover:border-muted-gold hover:text-muted-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold" href={localizePath("/about", locale)}>
                  {locale === "es" ? "Acerca de FulCastle Holdings, Inc." : "About FulCastle Holdings, Inc."}
                </Link>
              </div>
            </div>
            <div className="hero-artwork mx-auto hidden w-full max-w-[23rem] sm:block sm:max-w-[27rem] lg:max-w-none">
              <div
                aria-label={locale === "es" ? "Obra arquitectónica de FulCastle que representa estructura y perspectiva" : "FulCastle architectural artwork depicting structure and perspective"}
                role="img"
                className="relative aspect-square w-full overflow-hidden border border-ivory/15 bg-graphite"
              >
                <Image
                  src="/images/home-hero.jpg"
                  alt={locale === "es" ? "Obra arquitectónica de FulCastle que representa una estructura fundamental y perspectiva" : "FulCastle architectural artwork depicting foundational structure and perspective"}
                  fill
                  priority
                  sizes="(min-width: 1024px) 440px, (min-width: 640px) 432px, 100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-4 text-right text-[0.6rem] uppercase leading-5 tracking-[0.2em] text-ivory/55">
                {locale === "es" ? "Una visión a largo plazo" : "A long-term view"}
              </p>
            </div>
          </div>
          <div className="border-t border-ivory/15">
            <div className="mx-auto grid w-full max-w-7xl gap-5 px-6 py-5 text-[0.65rem] font-medium uppercase tracking-[0.18em] text-ivory/60 sm:grid-cols-3 sm:px-10 sm:py-6">
              <p>{locale === "es" ? "Iniciativas independientes" : "Independent ventures"}</p>
              <p className="sm:text-center">{locale === "es" ? "Una base bien pensada" : "A considered foundation"}</p>
              <p className="sm:text-right">{locale === "es" ? "Visión a largo plazo" : "Long-term perspective"}</p>
            </div>
          </div>
        </section>

        <section aria-labelledby="company-title" className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20" id="company">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate">{locale === "es" ? "La empresa" : "The company"}</p>
            <h2 className="max-w-xl font-display text-4xl leading-tight tracking-[-0.035em] sm:text-5xl" id="company-title">
              {locale === "es" ? "Una base." : "One foundation."}
              <span className="block text-slate">{locale === "es" ? "Caminos independientes." : "Independent paths."}</span>
            </h2>
          </div>
          <div className="max-w-2xl lg:pt-9">
            <p className="text-lg leading-8 text-graphite/85 sm:text-xl sm:leading-9">
              {locale === "es" ? "FulCastle Holdings, Inc. es la empresa matriz de una cartera de iniciativas independientes. Cada iniciativa tiene su propio enfoque, mientras FulCastle aporta una perspectiva a largo plazo al conjunto." : "FulCastle Holdings, Inc. is the parent company behind a portfolio of independent ventures. Each venture has its own focus, while FulCastle brings a long-term perspective to the portfolio as a whole."}
            </p>
            <div className="mt-8 h-px w-full bg-graphite/15" />
            <p className="mt-6 max-w-xl text-sm leading-7 text-slate">
              {locale === "es" ? "Creemos que el trabajo duradero comienza con una estructura clara, decisiones meditadas y espacio para que las ideas se desarrollen a su manera." : "We believe durable work starts with a clear structure, thoughtful decisions, and room for ideas to develop on their own terms."}
            </p>
          </div>
        </section>

        <section aria-labelledby="ventures-title" className="bg-[#fffdf9] py-20 sm:py-28" id="ventures">
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
            <div className="border-b border-graphite/15 pb-8">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate">{locale === "es" ? "La cartera" : "The portfolio"}</p>
              <h2 className="max-w-3xl font-display text-4xl leading-tight tracking-[-0.035em] sm:text-5xl" id="ventures-title">
                {locale === "es" ? "Caminos distintos. Propósitos claros." : "Different paths. Clear purpose."}
              </h2>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate">
                {locale === "es" ? "FulCastle Holdings, Inc. es la empresa matriz de estas iniciativas independientes. Cada una tiene un área de enfoque propia y espacio para desarrollarse." : "FulCastle Holdings, Inc. is the parent company behind these independent venture concepts. Each has a distinct area of focus and room to develop."}
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
                      <Link className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold" href={venture.href.startsWith("https://") ? venture.href : localizePath(venture.href, locale)}>
                        {venture.name}
                      </Link>
                    </h3>
                    <p className="mt-2 min-h-[2.5rem] text-[0.65rem] font-medium uppercase leading-5 tracking-[0.12em] text-slate">
                      {locale === "es" ? venture.categoryEs : venture.category}
                    </p>
                  </div>
                </article>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 border-t border-graphite/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm leading-6 text-slate">
                {locale === "es" ? "Estas son áreas de enfoque; no significa que todas las iniciativas estén lanzadas o disponibles comercialmente." : "These are areas of focus, not claims that every venture is launched or commercially available."}
              </p>
              <Link className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start bg-muted-gold px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold sm:self-center" href={localizePath("/ventures", locale)}>
                {locale === "es" ? "Explorar todas las iniciativas" : "Explore all ventures"} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>

        <section aria-labelledby="contact-title" className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-20 sm:px-10 sm:py-24 md:flex-row md:items-center md:justify-between" id="contact">
          <div>
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate">{locale === "es" ? "Iniciemos una conversación" : "Start a conversation"}</p>
            <h2 className="max-w-2xl font-display text-4xl leading-tight tracking-[-0.035em] sm:text-5xl" id="contact-title">
              {locale === "es" ? "¿Tienes algo que valga la pena construir?" : "Have something worth building?"}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-7 text-slate">
              {locale === "es" ? "Para consultas y posibles colaboraciones, ponte en contacto con FulCastle Holdings, Inc." : "For inquiries and potential collaborations, get in touch with FulCastle Holdings, Inc."}
            </p>
          </div>
          <Link className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start border border-graphite px-5 py-3 text-sm font-semibold text-graphite transition-colors hover:border-muted-gold hover:bg-muted-gold hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold md:self-center" href={localizePath("/contact", locale)}>
            {locale === "es" ? "Contactar con FulCastle" : "Contact FulCastle"} <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
