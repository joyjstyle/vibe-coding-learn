import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

/**
 * A quick, cookie-only check before intern pages load (Next.js 16 "proxy"). It only sends
 * visitors without a session cookie to sign-in; every page and action still checks the
 * session itself. Also passes the requested path on, so sign-in can return there.
 */
const PUBLIC = [/^\/sign-in(\/|$)/, /^\/share\//, /^\/api\/auth\//];

export default function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname + req.nextUrl.search;
  const headers = new Headers(req.headers);
  headers.set("x-genie-path", path);
  if (process.env.DATABASE_URL && process.env.GENIE_LAB_LOGIN !== "0" && !PUBLIC.some((p) => p.test(req.nextUrl.pathname)) && !getSessionCookie(req)) {
    const url = req.nextUrl.clone();
    url.pathname = "/sign-in";
    url.search = req.nextUrl.pathname === "/" ? "" : `?next=${encodeURIComponent(path)}`;
    return NextResponse.redirect(url);
  }
  return NextResponse.next({ request: { headers } });
}

export const config = {
  // Not for Next.js assets, files with an extension, or the files route handled by pages.
  matcher: ["/((?!_next/|favicon.ico|.*\\.[a-zA-Z0-9]+$).*)"],
};
