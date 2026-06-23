import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  signAdminSession,
  cookieOptions,
} from "@/lib/session";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const e = String(email ?? "").trim().toLowerCase();
    const p = String(password ?? "");

    if (e !== ADMIN_EMAIL.toLowerCase() || p !== ADMIN_PASSWORD) {
      return NextResponse.json({ ok: false, error: "Incorrect admin email or password." }, { status: 401 });
    }

    const token = await signAdminSession(ADMIN_EMAIL);
    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE, token, cookieOptions);
    return res;
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Login failed." }, { status: 500 });
  }
}

// Logout
export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { ...cookieOptions, maxAge: 0 });
  return res;
}
