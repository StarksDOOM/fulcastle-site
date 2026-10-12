import type { Metadata } from "next";
import { headers } from "next/headers";
import { isLocale, localizePath, type Locale } from "@/lib/i18n";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";

export async function generateMetadata(): Promise<Metadata> {
 const requestHeaders = await headers(); const isSpanish = requestHeaders.get("x-site-locale") === "es";
 return { alternates: { canonical: isSpanish ? "/es/terms-of-use" : "/terms-of-use", languages: { en: "/terms-of-use", es: "/es/terms-of-use" } }, openGraph: { locale: isSpanish ? "es_ES" : "en_US" }, title: isSpanish ? "Términos de uso" : "Terms of Use", description: isSpanish ? "Términos para utilizar el sitio web corporativo de FulCastle Holdings, Inc." : "Terms for using the FulCastle Holdings, Inc. corporate website." };
}

const englishSections = [
  {
    title: "1. About these terms",
    paragraphs: [
      'These Terms of Use apply to your access to and use of the fulcastle.com website operated for FulCastle Holdings, Inc. ("FulCastle"). By using the website, you agree to use it in accordance with these terms and applicable law. If you do not agree, please do not use the website.',
      "These terms cover this corporate website only. They do not create or replace customer, subscription, rental, marketplace, or other agreements for independent ventures in FulCastle's portfolio. Those products or services may have separate terms and privacy notices.",
    ],
  },
  {
    title: "2. Website purpose and information",
    paragraphs: [
      "The website provides general information about FulCastle and its portfolio. Portfolio descriptions may include concepts or initiatives still in development and not available to the public.",
      "We aim to keep website content useful and accurate, but do not promise that all content is complete, current, error-free, or suitable for a particular purpose. Information may change without notice.",
    ],
  },
  {
    title: "3. No professional advice or offer",
    paragraphs: [
      "Website content is for general informational purposes and is not legal, financial, tax, investment, or other professional advice. Seek advice from an appropriately qualified professional for decisions that require it.",
      "Nothing on this website is an offer to sell or solicitation to buy securities, a promise that a venture or feature will launch, or a commitment to enter into a business relationship. Any actual offer or service will be subject to its own documentation.",
    ],
  },
  {
    title: "4. Permitted use",
    paragraphs: [
      "You may use the website for lawful personal and business-information purposes. You must not knowingly disrupt, damage, overload, or gain unauthorized access to the website or its supporting systems; bypass security controls; submit malicious code; or use the contact form to send unlawful, deceptive, abusive, or unsolicited bulk messages.",
      "Do not misrepresent your identity or use website content in a way that infringes another person's rights or violates applicable law.",
    ],
  },
  {
    title: "5. Intellectual property",
    paragraphs: [
      "Unless a page or asset states otherwise, original website text, design, branding, and other content are owned by FulCastle or used with permission and are protected by applicable intellectual-property laws. These terms do not transfer ownership to you.",
      "You may link to public pages and quote brief excerpts for lawful purposes with appropriate attribution, provided you do not misrepresent FulCastle or imply endorsement. Other reproduction, redistribution, or commercial use requires permission from the relevant rights holder unless applicable law permits it. Third-party names and marks belong to their respective owners.",
    ],
  },
  {
    title: "6. Third-party links",
    paragraphs: [
      "The website may link to third-party websites or services for convenience or reference. FulCastle does not control those third parties and is not responsible for their content, availability, terms, or privacy practices. Visiting a third-party site is at your discretion and subject to that site's terms.",
    ],
  },
  {
    title: "7. Availability and disclaimers",
    paragraphs: [
      "We may update, suspend, or discontinue all or part of the website. We do not guarantee uninterrupted access or that the website will always be error-free or free from service interruptions.",
      'To the extent permitted by applicable law, the website is provided on an "as available" basis. Nothing in these terms excludes or limits any right or liability that cannot lawfully be excluded or limited.',
    ],
  },
  {
    title: "8. Responsibility for use",
    paragraphs: [
      "You are responsible for your use of the website and for ensuring your activities comply with applicable law. To the extent permitted by law, FulCastle is not responsible for losses arising from reliance on website information, interruption or unavailability of the site, or third-party websites. This does not limit liability that cannot lawfully be limited.",
    ],
  },
  {
    title: "9. Changes and contact",
    paragraphs: [
      "We may revise these terms as the website or our practices change. The date shown above identifies the latest text update. Questions about these terms can be sent through the contact page.",
    ],
  },
];

const spanishSections = [
{title:"1. Sobre estos términos",paragraphs:["Estos términos regulan el acceso y uso de fulcastle.com, operado para FulCastle Holdings, Inc. («FulCastle»). Al utilizar el sitio, aceptas cumplir estos términos y la legislación aplicable. Si no estás de acuerdo, no utilices el sitio.","Se aplican únicamente a este sitio corporativo y no crean ni sustituyen acuerdos de clientes, suscripciones, alquileres, mercados u otros acuerdos de las iniciativas independientes. Esos productos o servicios pueden tener términos y avisos de privacidad propios."]},
{title:"2. Finalidad e información",paragraphs:["El sitio ofrece información general sobre FulCastle y su cartera. Algunas descripciones pueden corresponder a conceptos o iniciativas en desarrollo que aún no están disponibles al público.","Procuramos que el contenido sea útil y preciso, pero no garantizamos que sea completo, actual, libre de errores o adecuado para un fin particular. La información puede cambiar sin previo aviso."]},
{title:"3. Sin asesoramiento ni oferta",paragraphs:["El contenido tiene fines informativos generales y no constituye asesoramiento jurídico, financiero, fiscal, de inversión ni profesional. Consulta a un profesional cualificado para decisiones que lo requieran.","Nada en este sitio constituye una oferta de valores, una promesa de lanzamiento de una iniciativa o función, ni un compromiso comercial. Cualquier oferta o servicio estará sujeto a su propia documentación."]},
{title:"4. Uso permitido",paragraphs:["Puedes utilizar el sitio con fines lícitos de información personal y comercial. No debes interrumpir, dañar o sobrecargar el sitio o sus sistemas, acceder sin autorización, eludir controles de seguridad, enviar código malicioso ni utilizar el formulario para mensajes ilícitos, engañosos, abusivos o masivos no solicitados.","No falsees tu identidad ni utilices el contenido de forma que infrinja derechos de terceros o la legislación aplicable."]},
{title:"5. Propiedad intelectual",paragraphs:["Salvo indicación contraria, los textos originales, el diseño, la marca y demás contenidos pertenecen a FulCastle o se utilizan con permiso, y están protegidos por las leyes aplicables. Estos términos no te transfieren su titularidad.","Puedes enlazar páginas públicas y citar fragmentos breves con atribución adecuada, sin tergiversar a FulCastle ni sugerir respaldo. Otras reproducciones, redistribuciones o usos comerciales requieren permiso, salvo que la ley disponga otra cosa. Las marcas de terceros pertenecen a sus titulares."]},
{title:"6. Enlaces de terceros",paragraphs:["El sitio puede incluir enlaces a sitios o servicios de terceros por comodidad o referencia. FulCastle no los controla ni es responsable de su contenido, disponibilidad, términos o prácticas de privacidad. Visitar un sitio externo queda a tu discreción y se rige por sus términos."]},
{title:"7. Disponibilidad y exenciones",paragraphs:["Podemos actualizar, suspender o interrumpir todo o parte del sitio. No garantizamos acceso ininterrumpido ni ausencia permanente de errores o interrupciones.","En la medida permitida por la ley, el sitio se proporciona según disponibilidad. Nada excluye o limita derechos o responsabilidades que legalmente no puedan excluirse o limitarse."]},
{title:"8. Responsabilidad por el uso",paragraphs:["Eres responsable de tu uso del sitio y de cumplir la legislación aplicable. En la medida permitida por la ley, FulCastle no responde por pérdidas derivadas de confiar en la información del sitio, de interrupciones o falta de disponibilidad, o de sitios de terceros. Esto no limita responsabilidades que legalmente no puedan limitarse."]},
{title:"9. Cambios y contacto",paragraphs:["Podemos revisar estos términos cuando cambien el sitio o nuestras prácticas. La fecha indicada identifica la última actualización del texto. Puedes enviar preguntas mediante la página de contacto."]}
];

export default async function TermsOfUsePage() {
 const requestHeaders = await headers(); const localeValue = requestHeaders.get("x-site-locale") ?? "en"; const locale: Locale = isLocale(localeValue) ? localeValue : "en";
 const sections = locale === "es" ? spanishSections : englishSections;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 bg-ivory">
        <section className="bg-graphite text-ivory">
          <div className="mx-auto w-full max-w-5xl px-6 py-16 sm:px-10 sm:py-20">
            <p className="mb-5 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-gold">
              <span aria-hidden="true" className="h-px w-8 bg-muted-gold" />
              {locale === "es" ? "Información legal" : "Legal information"}
            </p>
            <h1 className="max-w-3xl font-display text-5xl leading-tight tracking-[-0.04em] sm:text-6xl">
              {locale === "es" ? "Términos de" : "Terms of"} <span className="text-muted-gold">{locale === "es" ? "uso" : "Use"}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-ivory/75 sm:text-lg sm:leading-8">
              {locale === "es" ? "Condiciones aplicables al utilizar el sitio web corporativo de FulCastle." : "The expectations that apply when using the FulCastle corporate website."}
            </p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-ivory/55">
              {locale === "es" ? "Última actualización: 10 de octubre de 2026" : "Last updated: October 10, 2026"}
            </p>
          </div>
        </section>

        <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-16">
          <article className="min-w-0 space-y-10">
            {sections.map((section) => {
              const id = section.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
              return (
                <section aria-labelledby={id} key={section.title}>
                  <h2 className="font-display text-2xl leading-tight tracking-tight text-graphite sm:text-3xl" id={id}>
                    {section.title}
                  </h2>
                  <div className="mt-4 space-y-4 text-sm leading-7 text-slate sm:text-base sm:leading-8">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                </section>
              );
            })}
            <p className="border-l-2 border-muted-gold pl-4 text-sm leading-7 text-slate">
              {locale === "es" ? "Este documento es un borrador general y no constituye asesoramiento jurídico. Antes de publicarlo como versión definitiva, un profesional cualificado debe revisar su aplicabilidad, jurisdicción, responsabilidad y requisitos de protección al consumidor." : "This is a general website-use draft, not legal advice. Qualified counsel should review enforceability, jurisdiction, liability language, and consumer-protection requirements before publication."}
            </p>
          </article>

          <aside className="h-fit border border-graphite/10 bg-[#fffdf9] p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">{locale === "es" ? "Contacto" : "Get in touch"}</p>
            <p className="mt-3 text-sm leading-6 text-slate">{locale === "es" ? "¿Tienes alguna pregunta sobre estos términos?" : "Have a question about these terms?"}</p>
            <Link className="mt-4 inline-block text-sm font-semibold text-graphite underline decoration-muted-gold underline-offset-4 hover:text-slate" href={localizePath("/contact", locale)}>
              {locale === "es" ? "Contactar con FulCastle" : "Contact FulCastle"}
            </Link>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
