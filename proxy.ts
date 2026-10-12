import { NextRequest, NextResponse } from "next/server";

const localizedPath = /^\/es(?:\/|$)/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-site-locale", localizedPath.test(pathname) ? "es" : "en");
  requestHeaders.set("x-site-pathname", pathname);

  if (!localizedPath.test(pathname)) {
    return NextResponse.next({ request: { headers: requestHeaders } });
  }

  const rewritten = request.nextUrl.clone();
  rewritten.pathname = pathname.replace(/^\/es(?=\/|$)/, "") || "/";
  return NextResponse.rewrite(rewritten, { request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images/|.*\\..*).*)"],
};
