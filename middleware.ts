import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/session";

// Routes that require a signed-in customer.
// (Browsing is open; only these deeper actions need login.)
const PROTECTED = [/^\/dashboard(\/.*)?$/, /^\/workshops(\/.*)?$/];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const needsAuth = PROTECTED.some((re) => re.test(pathname));
  if (!needsAuth) return NextResponse.next();

  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const user = token ? await verifySession(token) : null;

  if (!user) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect_url", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/workshops/:path*"],
};
