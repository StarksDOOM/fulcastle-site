import Image from "next/image";
import Link from "next/link";

const navigation = [
  { label: "Company", href: "/about" },
  { label: "Ventures", href: "/ventures" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-graphite/10 bg-ivory">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-5 py-5 sm:gap-5 sm:px-10 sm:py-6 md:flex-row md:items-center md:justify-between">
        <Link
          aria-label="FulCastle Holdings home"
          className="flex w-fit items-center gap-3 rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold"
          href="/"
        >
          <Image alt="" aria-hidden="true" height={38} priority src="/brand-mark.svg" width={38} />
          <span className="font-display text-lg font-semibold tracking-tight text-graphite">
            FulCastle
            <span className="ml-2 hidden text-[0.65rem] font-medium uppercase tracking-[0.2em] text-slate sm:inline">
              Holdings, Inc.
            </span>
          </span>
        </Link>
        <nav aria-label="Main navigation" className="flex flex-wrap items-center gap-x-5 gap-y-3 sm:gap-x-6">
          {navigation.map((item) => (
            <Link
              className="rounded-sm py-1 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-slate transition-colors hover:text-graphite focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-muted-gold"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
