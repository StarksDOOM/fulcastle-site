import { headers } from "next/headers";
import Link from "next/link";
import { isLocale, localizePath, messages, type Locale } from "@/lib/i18n";

export async function SiteFooter() {
  const requestHeaders = await headers();
  const localeValue = requestHeaders.get("x-site-locale") ?? "en";
  const locale: Locale = isLocale(localeValue) ? localeValue : "en";
  const copy = messages[locale].footer;

  return (
    <footer className="border-t border-muted-gold/35 bg-graphite text-ivory">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-8 text-sm leading-6 text-ivory/75 sm:flex-row sm:items-center sm:justify-between sm:px-10 sm:py-9">
        <p>© {new Date().getFullYear()} FulCastle Holdings, Inc.</p>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <p>{copy.tagline}</p>
          <Link className="underline decoration-muted-gold/70 underline-offset-4 transition-colors hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold" href={localizePath("/privacy-policy", locale)}>
            {copy.privacy}
          </Link>
          <Link className="underline decoration-muted-gold/70 underline-offset-4 transition-colors hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold" href={localizePath("/terms-of-use", locale)}>
            {copy.terms}
          </Link>
        </div>
      </div>
    </footer>
  );
}
