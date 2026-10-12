export type Locale = "en" | "es";

export const locales: Locale[] = ["en", "es"];
export const defaultLocale: Locale = "en";

export const messages = {
  en: {
    navigation: { company: "Company", ventures: "Ventures", contact: "Contact", main: "Main navigation", skip: "Skip to main content", home: "FulCastle Holdings home", language: "Language", english: "English", spanish: "Spanish" },
    footer: { tagline: "Independent ventures. Shared vision.", privacy: "Privacy Policy", terms: "Terms of Use" },
    contact: {
      labels: { name: "Name", email: "Email", subject: "Subject", message: "Message" },
      placeholders: { name: "Your name", email: "you@example.com", subject: "What would you like to discuss?", message: "Tell us a little more..." },
      errors: { name: "Please enter your name.", email: "Please enter your email address.", subject: "Please add a subject.", message: "Please enter a message.", invalidEmail: "Enter a valid email address, like you@example.com." },
      sending: "Sending…", submit: "Send message", failed: "We couldn’t send your message right now. Please try again later.",
      successTitle: "Message received.", success: "Thanks for reaching out. Your message is on its way to our team. We’ll follow up if a response is appropriate.",
      partial: "Your message was received, but we couldn’t send a confirmation email. You don’t need to submit it again.",
    },
  },
  es: {
    navigation: { company: "La empresa", ventures: "Iniciativas", contact: "Contacto", main: "Navegación principal", skip: "Saltar al contenido principal", home: "Inicio de FulCastle Holdings", language: "Idioma", english: "Inglés", spanish: "Español" },
    footer: { tagline: "Iniciativas independientes. Una visión compartida.", privacy: "Política de privacidad", terms: "Términos de uso" },
    contact: {
      labels: { name: "Nombre", email: "Correo electrónico", subject: "Asunto", message: "Mensaje" },
      placeholders: { name: "Tu nombre", email: "tu@ejemplo.com", subject: "¿Sobre qué te gustaría conversar?", message: "Cuéntanos un poco más..." },
      errors: { name: "Escribe tu nombre.", email: "Escribe tu correo electrónico.", subject: "Añade un asunto.", message: "Escribe un mensaje.", invalidEmail: "Introduce un correo electrónico válido, como tu@ejemplo.com." },
      sending: "Enviando…", submit: "Enviar mensaje", failed: "No pudimos enviar tu mensaje en este momento. Inténtalo de nuevo más tarde.",
      successTitle: "Mensaje recibido.", success: "Gracias por escribirnos. Tu mensaje ya está en camino a nuestro equipo. Nos pondremos en contacto si corresponde responder.",
      partial: "Recibimos tu mensaje, pero no pudimos enviar un correo de confirmación. No necesitas enviarlo de nuevo.",
    },
  },
} as const;

export function isLocale(value: string | undefined): value is Locale {
  return value === "en" || value === "es";
}

export function localizePath(pathname: string, locale: Locale): string {
  const path = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutLocale = path.replace(/^\/(en|es)(?=\/|$)/, "") || "/";
  if (locale === defaultLocale) return withoutLocale;
  return withoutLocale === "/" ? `/${locale}` : `/${locale}${withoutLocale}`;
}
