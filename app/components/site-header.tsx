import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { isLocale, localizePath, messages, type Locale } from "@/lib/i18n";

export async function SiteHeader() {
  const requestHeaders = await headers();
  const localeValue = requestHeaders.get("x-site-locale") ?? "en";
  const locale: Locale = isLocale(localeValue) ? localeValue : "en";
  const pathname = requestHeaders.get("x-site-pathname") ?? "/";
  const copy = messages[locale];
  const navigation = [
    { label: copy.navigation.company, href: "/about" },
    { label: copy.navigation.ventures, href: "/ventures" },
    { label: copy.navigation.contact, href: "/contact" },
  ];

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:bg-muted-gold focus:px-4 focus:py-3 focus:font-semibold focus:text-graphite focus:outline-2 focus:outline-offset-4 focus:outline-graphite"
        href="#main-content"
      >
        {copy.navigation.skip}
      </a>
      <header className="border-b border-graphite/10 bg-ivory">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-5 sm:gap-5 sm:px-10 sm:py-6 md:flex-row md:items-center md:justify-between">
          <Link
            aria-label={copy.navigation.home}
            className="flex w-fit items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold"
            href={localizePath("/", locale)}
          >
            <Image alt="" aria-hidden="true" height={38} priority src="/brand-mark.svg" width={38} />
            <span className="font-display text-lg font-semibold tracking-tight text-graphite">
              FulCastle
              <span className="ml-2 hidden text-[0.65rem] font-medium uppercase tracking-[0.2em] text-slate sm:inline">
                Holdings, Inc.
              </span>
            </span>
          </Link>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-6">
            <nav aria-label={copy.navigation.main} className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-6">
              {navigation.map((item) => (
                <Link
                  className="rounded-sm py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-slate transition-colors duration-200 hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold motion-reduce:transition-none"
                  href={localizePath(item.href, locale)}
                  key={item.href}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <nav aria-label={copy.navigation.language} className="flex items-center gap-2 border-l border-graphite/15 pl-4 text-[0.68rem] font-semibold uppercase tracking-[0.12em]">
              <a aria-current={locale === "en" ? "page" : undefined} className={locale === "en" ? "text-graphite underline decoration-muted-gold underline-offset-4" : "text-slate hover:text-graphite"} href={`${localizePath(pathname, "en")}?lang=en`}>EN</a>
              <span aria-hidden="true" className="text-graphite/30">/</span>
              <a aria-current={locale === "es" ? "page" : undefined} className={locale === "es" ? "text-graphite underline decoration-muted-gold underline-offset-4" : "text-slate hover:text-graphite"} href={localizePath(pathname, "es")}>ES</a>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
