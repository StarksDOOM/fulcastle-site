import type { Metadata } from "next";
import { headers } from "next/headers";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";

export async function generateMetadata(): Promise<Metadata> {
 const requestHeaders = await headers(); const isSpanish = requestHeaders.get("x-site-locale") === "es";
 return { alternates: { canonical: isSpanish ? "/es/ventures" : "/ventures", languages: { en: "/ventures", es: "/es/ventures" } }, openGraph: { locale: isSpanish ? "es_ES" : "en_US" }, title: isSpanish ? "Iniciativas" : "Ventures", description: isSpanish ? "Explora las áreas de enfoque de las iniciativas independientes de FulCastle Holdings, Inc." : "Explore the distinct areas of focus across FulCastle Holdings, Inc.'s portfolio of independent ventures." };
}

const ventures = [
  {
    id: "rodar",
    number: "01",
    category: "Mobility", categoryEs: "Movilidad",
    name: "Rodar",
    description:
      "Vehicle-rental and agency tools focused on the Dominican Republic, with an emphasis on making rental operations easier to manage.", descriptionEs: "Herramientas de alquiler de vehículos y gestión para agencias en la República Dominicana, centradas en facilitar las operaciones de alquiler.",
    focus: "Rental and agency workflows", focusEs: "Procesos de alquiler y gestión de agencias",
    card: "bg-graphite text-ivory",
    label: "text-muted-gold",
    artwork:
      "bg-[radial-gradient(ellipse_at_70%_20%,rgba(190,160,103,0.22),transparent_45%),linear-gradient(145deg,#292b29,#111211)]",
    shape: "border-muted-gold/55",
    shapeAlt: "border-ivory/20",
    tone: "text-ivory/70",
  },
  {
    id: "vantage",
    number: "02",
    category: "Commerce intelligence", categoryEs: "Inteligencia comercial",
    name: "Vantage",
    description:
      "Product-discovery and trend-informed commerce technology connecting emerging demand signals with ecommerce workflows.", descriptionEs: "Tecnología de descubrimiento de productos y comercio basada en tendencias que conecta señales de demanda emergente con procesos de comercio electrónico.",
    focus: "Product discovery and ecommerce", focusEs: "Descubrimiento de productos y comercio electrónico",
    card: "bg-[#e8e3d8] text-graphite",
    label: "text-slate",
    artwork:
      "bg-[linear-gradient(135deg,rgba(255,255,255,0.7),transparent_55%),radial-gradient(ellipse_at_85%_85%,rgba(190,160,103,0.3),transparent_48%)]",
    shape: "border-graphite/20",
    shapeAlt: "border-muted-gold/80",
    tone: "text-graphite/70",
  },
  {
    id: "civora",
    number: "03",
    category: "Public-sector technology", categoryEs: "Tecnología para el sector público",
    name: "Civora",
    description:
      "A concept for discovering, organizing, and evaluating government-contracting opportunities.", descriptionEs: "Un concepto para descubrir, organizar y evaluar oportunidades de contratación pública.",
    focus: "Contract discovery and procurement intelligence", focusEs: "Descubrimiento de contratos e inteligencia de compras",
    card: "bg-[#202a30] text-ivory",
    label: "text-[#b8d0d6]",
    artwork:
      "bg-[radial-gradient(ellipse_at_20%_20%,rgba(117,158,173,0.22),transparent_42%),linear-gradient(145deg,#26343a,#111719)]",
    shape: "border-[#91b8c3]/45",
    shapeAlt: "border-ivory/20",
    tone: "text-ivory/70",
  },
  {
    id: "sweet-nothings",
    number: "04",
    category: "Personal expression", categoryEs: "Expresión personal",
    name: "Sweet Nothings",
    description:
      "A consumer product concept for personalized, AI-generated affectionate messages shaped around individual preferences.", descriptionEs: "Un concepto de producto de consumo para crear mensajes afectuosos personalizados mediante IA, adaptados a las preferencias individuales.",
    focus: "Personalized messages", focusEs: "Mensajes personalizados",
    card: "bg-[#eee4e0] text-graphite",
    label: "text-[#824752]",
    artwork:
      "bg-[radial-gradient(ellipse_at_80%_15%,rgba(180,111,121,0.2),transparent_45%),linear-gradient(135deg,#f3e9e5,#e5d5d1)]",
    shape: "border-[#b46f79]/45",
    shapeAlt: "border-[#b46f79]/35",
    tone: "text-graphite/70",
  },
  {
    id: "proptech-real-estate",
    number: "05",
    category: "Real estate workflows", categoryEs: "Procesos inmobiliarios",
    name: "PropTech Real Estate",
    description:
      "Property-listing and agent-inventory workflows for the Dominican Republic, with transaction tooling being explored as part of the broader concept.", descriptionEs: "Procesos de anuncios inmobiliarios e inventario de agentes en la República Dominicana, con herramientas transaccionales en evaluación.",
    focus: "Property listings and agent inventory", focusEs: "Anuncios inmobiliarios e inventario de agentes",
    card: "bg-[#dfe4df] text-graphite",
    label: "text-[#405b4a]",
    artwork:
      "bg-[linear-gradient(145deg,rgba(255,255,255,0.6),transparent_58%),radial-gradient(ellipse_at_85%_90%,rgba(108,133,116,0.25),transparent_45%)]",
    shape: "border-[#6c8574]/45",
    shapeAlt: "border-graphite/20",
    tone: "text-graphite/70",
  },
];

export default async function VenturesPage() {
 const requestHeaders = await headers(); const localeValue = requestHeaders.get("x-site-locale") ?? "en"; const locale: Locale = isLocale(localeValue) ? localeValue : "en";

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <section
          aria-labelledby="ventures-title"
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
          <div className="mx-auto grid w-full max-w-7xl gap-12 px-6 py-20 sm:px-10 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20 lg:py-32">
            <div className="hero-copy relative z-10">
              <p className="mb-7 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-gold">
                <span aria-hidden="true" className="h-px w-8 bg-muted-gold" />
                {locale === "es" ? "La cartera" : "The portfolio"}
              </p>
              <h1
                className="max-w-4xl font-display text-5xl leading-[1.04] tracking-[-0.045em] sm:text-6xl md:text-7xl"
                id="ventures-title"
              >
                {locale === "es" ? "Problemas distintos." : "Different problems."}
                <span className="mt-2 block text-muted-gold">{locale === "es" ? "Caminos propios." : "Distinct paths."}</span>
              </h1>
              <p className="mt-8 max-w-2xl text-base leading-7 text-ivory/75 sm:text-lg sm:leading-8">
                {locale === "es"
                  ? "FulCastle Holdings, Inc. es la empresa matriz de una cartera de iniciativas independientes. Cada iniciativa tiene su propia área de enfoque y espacio para desarrollar su identidad."
                  : "FulCastle Holdings, Inc. is the parent company behind a portfolio of independent ventures. Each initiative has its own area of focus and room to develop its own identity."}
              </p>
            </div>
            <aside className="hero-side-note relative border-l-2 border-muted-gold/70 pl-7 sm:pl-9 lg:mb-2 lg:ml-4">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-gold">
                {locale === "es" ? "Una cartera en desarrollo" : "A portfolio in development"}
              </p>
              <p className="mt-5 max-w-md text-sm leading-7 text-ivory/70 sm:text-base sm:leading-8">
                {locale === "es"
                  ? "Estos perfiles describen áreas de enfoque; no prometen que todas las iniciativas estén lanzadas o disponibles comercialmente. Cada una evolucionará a su propio ritmo."
                  : "These profiles describe areas of focus, not a promise that every venture is launched or commercially available. The work will take shape at its own pace."}
              </p>
            </aside>
          </div>
        </section>

        <section
          aria-labelledby="portfolio-heading"
          className="bg-ivory py-20 sm:py-28"
        >
          <div className="mx-auto w-full max-w-7xl px-6 sm:px-10">
            <div className="border-b border-graphite/15 pb-8">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-slate">
                {locale === "es" ? "Cinco áreas de enfoque" : "Five areas of focus"}
              </p>
              <h2
                className="max-w-3xl font-display text-3xl leading-tight tracking-[-0.035em] sm:text-4xl"
                id="portfolio-heading"
              >
                {locale === "es" ? "Una empresa matriz. Caminos independientes." : "One parent company. Independent directions."}
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate">
                {locale === "es" ? "Explora los problemas que cada iniciativa busca abordar." : "Explore the problems each initiative is intended to address."}
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
              {ventures.map((venture) => (
                <article
                  aria-labelledby={`${venture.id}-title`}
                  className={`group relative isolate flex min-h-[25rem] flex-col overflow-hidden border border-graphite/10 ${venture.card} sm:col-span-1 lg:col-span-2 ${venture.id === "sweet-nothings" ? "lg:col-start-2" : ""} ${venture.id === "proptech-real-estate" ? "lg:col-start-4" : ""}`}
                  id={venture.id}
                  key={venture.id}
                >
                  <div
                    aria-hidden="true"
                    className={`absolute inset-0 -z-10 ${venture.artwork}`}
                  />
                  <div
                    aria-hidden="true"
                    className={`absolute -right-5 top-12 h-36 w-36 rotate-[18deg] border group-hover:-translate-y-1 motion-reduce:transition-none ${venture.shape}`}
                  />
                  <div
                    aria-hidden="true"
                    className={`absolute right-8 top-20 h-28 w-28 rotate-[18deg] border ${venture.shapeAlt}`}
                  />
                  <div className="flex items-start justify-between gap-4 p-6 sm:p-7">
                    <span className={`text-xs font-semibold tracking-[0.18em] ${venture.label}`}>
                      {venture.number}
                    </span>
                    <span className={`max-w-[65%] text-right text-[0.62rem] font-semibold uppercase tracking-[0.15em] ${venture.label}`}>
                      {locale === "es" ? venture.categoryEs : venture.category}
                    </span>
                  </div>
                  <div className="mt-auto p-6 pt-12 sm:p-7 sm:pt-12">
                    <h3
                      className="max-w-sm font-display text-2xl leading-tight tracking-tight sm:text-3xl"
                      id={`${venture.id}-title`}
                    >
                      {venture.id === "rodar" ? (
                        <Link
                          className="focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold hover:text-muted-gold"
                          href="https://rodar.do"
                        >
                          Rodar <span aria-hidden="true">↗</span>
                        </Link>
                      ) : (
                        venture.name
                      )}
                    </h3>
                    <p className={`mt-4 max-w-md text-sm leading-7 ${venture.tone}`}>
                      {locale === "es" ? venture.descriptionEs : venture.description}
                    </p>
                    <div className="mt-7 border-t border-current/15 pt-4">
                      <p className={`text-[0.62rem] font-semibold uppercase tracking-[0.17em] ${venture.label}`}>
                        {locale === "es" ? "Área de enfoque" : "Area of focus"}
                      </p>
                      <p className={`mt-2 text-sm leading-6 ${venture.tone}`}>
                        {locale === "es" ? venture.focusEs : venture.focus}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-20 flex flex-col gap-6 border-t border-graphite/15 pt-10 sm:mt-24 sm:flex-row sm:items-center sm:justify-between sm:pt-12">
              <div>
                <p className="font-display text-2xl text-graphite sm:text-3xl">
                  {locale === "es" ? "Una base. Espacio para distintos caminos." : "One foundation. Room for different directions."}
                </p>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-slate sm:text-base">
                  {locale === "es" ? "Conoce la perspectiva de la empresa y a las personas detrás de la cartera." : "Learn more about the company&apos;s perspective and the people behind the portfolio."}
                </p>
              </div>
              <Link
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-3 self-start border border-graphite/20 px-6 py-3.5 text-sm font-semibold text-graphite transition-colors hover:border-muted-gold hover:bg-muted-gold/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold sm:self-center"
                href={localizePath("/about", locale)}
              >
                {locale === "es" ? "Acerca de FulCastle" : "About FulCastle"} <span aria-hidden="true">↗</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
