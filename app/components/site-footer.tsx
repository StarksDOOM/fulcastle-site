import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/15 bg-graphite text-ivory">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-7 text-sm text-ivory/70 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <p>© {new Date().getFullYear()} FulCastle Holdings, Inc.</p>
          <Link
            className="underline decoration-muted-gold/70 underline-offset-4 transition-colors hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold"
            href="/privacy-policy"
          >
            Privacy Policy
          </Link>
        </div>
        <p>Independent ventures. Shared vision.</p>
      </div>
    </footer>
  );
}
