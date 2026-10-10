export function SiteFooter() {
  return (
    <footer className="border-t border-white/15 bg-graphite text-ivory">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-6 py-7 text-sm text-ivory/70 sm:flex-row sm:items-center sm:justify-between sm:px-10">
        <p>© {new Date().getFullYear()} FulCastle Holdings, Inc.</p>
        <p>Independent ventures. Shared vision.</p>
      </div>
    </footer>
  );
}
