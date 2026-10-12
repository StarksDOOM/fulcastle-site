import { NextRequest, NextResponse } from "next/server";

const localizedPath = /^\/es(?:\/|$)/;
const spanishSpeakingCountries = new Set([
  "AR", "BO", "CL", "CO", "CR", "CU", "DO", "EC", "ES", "GQ",
  "GT", "HN", "MX", "NI", "PA", "PE", "PR", "PY", "SV", "UY", "VE",
]);
const localeCookie = "site-locale";

export function isSpanishSpeakingCountry(countryCode: string | null | undefined): boolean {
  return spanishSpeakingCountries.has((countryCode ?? "").toUpperCase());
}

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const explicitLocale = localizedPath.test(pathname) ? "es" : null;
  const requestedLocale = searchParams.get("lang");
  const savedLocale = request.cookies.get(localeCookie)?.value;
  const countryCode = request.headers.get("x-vercel-ip-country");

  // Language-switch links use lang=en to persist an explicit English choice.
  if (requestedLocale === "en" && !explicitLocale) {
    const destination = request.nextUrl.clone();
    destination.searchParams.delete("lang");
    const response = NextResponse.redirect(destination);
    response.cookies.set(localeCookie, "en", { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return response;
  }

  const requestHeaders = new Headers(request.headers);
  const locale = explicitLocale ?? (savedLocale === "en" || savedLocale === "es"
    ? savedLocale
    : isSpanishSpeakingCountry(countryCode)
      ? "es"
      : "en");

  // An explicit /es route is a deliberate Spanish choice and persists across visits.
  if (explicitLocale === "es") {
    const response = localizedResponse(request, requestHeaders, pathname);
    response.cookies.set(localeCookie, "es", { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
    return response;
  }

  // Keep Spanish-country defaults and saved Spanish preferences on localized URLs.
  if (locale === "es") {
    const destination = request.nextUrl.clone();
    destination.pathname = pathname === "/" ? "/es" : `/es${pathname}`;
    return NextResponse.redirect(destination);
  }

  requestHeaders.set("x-site-locale", locale);
  requestHeaders.set("x-site-pathname", pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

function localizedResponse(request: NextRequest, requestHeaders: Headers, pathname: string) {
  requestHeaders.set("x-site-locale", "es");
  requestHeaders.set("x-site-pathname", pathname);
  const rewritten = request.nextUrl.clone();
  rewritten.pathname = pathname.replace(/^\/es(?=\/|$)/, "") || "/";
  return NextResponse.rewrite(rewritten, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/|.*\\..*).*)"],
};
