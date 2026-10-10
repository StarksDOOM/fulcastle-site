import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="border-b border-black/10">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 sm:px-10">
        <Link
          aria-label="FulCastle Holdings home"
          className="flex items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold"
          href="/"
        >
          <Image
            alt=""
            aria-hidden="true"
            height={38}
            priority
            src="/brand-mark.svg"
            width={38}
          />
          <span className="font-display text-lg font-semibold tracking-tight text-graphite">
            FulCastle
            <span className="ml-2 hidden text-[0.65rem] font-medium uppercase tracking-[0.2em] text-slate sm:inline">
              Holdings, Inc.
            </span>
          </span>
        </Link>
        <span className="text-xs font-medium uppercase tracking-[0.18em] text-slate">
          Corporate
        </span>
      </div>
    </header>
  );
}
