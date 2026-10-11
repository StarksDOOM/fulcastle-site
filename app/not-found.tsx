import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you’re looking for could not be found.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="relative isolate flex flex-1 items-center overflow-hidden bg-graphite text-ivory">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -right-24 top-1/2 h-[26rem] w-[26rem] -translate-y-1/2 rotate-45 border border-muted-gold/25 sm:right-[8%] sm:h-[34rem] sm:w-[34rem]" />
          <div className="absolute -right-8 top-1/2 h-[18rem] w-[18rem] -translate-y-1/2 rotate-45 border border-ivory/10 sm:right-[14%] sm:h-[24rem] sm:w-[24rem]" />
        </div>
        <section aria-labelledby="not-found-title" className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 sm:py-32">
          <p className="mb-6 flex items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-muted-gold">
            <span aria-hidden="true" className="h-px w-8 bg-muted-gold" />
            Error 404
          </p>
          <h1 className="max-w-3xl font-display text-5xl leading-[1.04] tracking-[-0.045em] sm:text-6xl md:text-7xl" id="not-found-title">
            This path ends here.
            <span className="mt-2 block text-muted-gold">The next one is yours.</span>
          </h1>
          <p className="mt-7 max-w-xl text-base leading-7 text-ivory/75 sm:text-lg sm:leading-8">
            We couldn’t find the page you requested. It may have moved, or the address may be incorrect.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link className="inline-flex min-h-12 items-center justify-center gap-3 bg-muted-gold px-5 py-3 text-sm font-semibold text-graphite transition-[filter,transform] duration-200 hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold motion-reduce:transition-none" href="/">
              Back to home <span aria-hidden="true">↗</span>
            </Link>
            <Link className="inline-flex min-h-12 items-center justify-center border border-ivory/35 px-5 py-3 text-sm font-semibold text-ivory transition-colors duration-200 hover:border-muted-gold hover:text-muted-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold motion-reduce:transition-none" href="/contact">
              Contact FulCastle
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
