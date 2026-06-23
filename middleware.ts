import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession, ADMIN_COOKIE, verifyAdminSession } from "@/lib/session";

// Customer-protected routes (need a signed-in account).
const CUSTOMER = [/^\/dashboard(\/.*)?$/, /^\/workshops(\/.*)?$/];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ── Admin area ──
  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") return NextResponse.next();
    const token = req.cookies.get(ADMIN_COOKIE)?.value;
    const ok = token ? await verifyAdminSession(token) : false;
    if (!ok) {
      const url = req.nextUrl.clone();
      url.pathname = "/admin/login";
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  // ── Customer-protected routes ──
  if (CUSTOMER.some((re) => re.test(pathname))) {
    const token = req.cookies.get(SESSION_COOKIE)?.value;
    const user = token ? await verifySession(token) : null;
    if (!user) {
      const url = req.nextUrl.clone();
      url.pathname = "/login";
      url.searchParams.set("redirect_url", pathname);
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/workshops/:path*"],
};
