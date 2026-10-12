import { NextRequest, NextResponse } from "next/server";

const localizedPath = /^\/es(?:\/|$)/;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!localizedPath.test(pathname)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-site-locale", "en");
    requestHeaders.set("x-site-pathname", pathname);
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site-locale", "es");
  requestHeaders.set("x-site-pathname", pathname);

  const rewritten = request.nextUrl.clone();
  rewritten.pathname = pathname.replace(/^\/es(?=\/|$)/, "") || "/";
  return NextResponse.rewrite(rewritten, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/|.*\\..*).*)"],
};
