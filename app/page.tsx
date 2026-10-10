import { SiteFooter } from "@/app/components/site-footer";
import { SiteHeader } from "@/app/components/site-header";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center">
        <section
          aria-labelledby="starter-title"
          className="mx-auto w-full max-w-7xl px-6 py-24 sm:px-10 sm:py-32"
        >
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.24em] text-slate">
            FulCastle Holdings, Inc.
          </p>
          <h1
            className="max-w-4xl font-display text-5xl leading-[1.04] tracking-[-0.04em] text-graphite sm:text-7xl lg:text-8xl"
            id="starter-title"
          >
            Building with
            <span className="block text-slate">long-term vision.</span>
          </h1>
          <div className="mt-9 h-px w-20 bg-muted-gold" />
          <p className="mt-8 max-w-xl text-base leading-7 text-slate sm:text-lg sm:leading-8">
            A considered foundation for the FulCastle corporate presence. The
            full homepage and portfolio content will be developed in their own
            tracked page issues.
          </p>
          <p className="mt-10 text-xs font-medium uppercase tracking-[0.2em] text-slate/80">
            Site foundation preview
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
