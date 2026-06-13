import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma, isDbConfigured } from "@/lib/prisma";
import { signSession, SESSION_COOKIE, cookieOptions } from "@/lib/session";

export async function POST(req: Request) {
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Accounts aren't connected yet. Please connect the database (DATABASE_URL)." },
      { status: 503 }
    );
  }

  try {
    const body = await req.json();
    const email = String(body.email ?? "").trim().toLowerCase();
    const password = String(body.password ?? "");

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return NextResponse.json({ ok: false, error: "Incorrect email or password." }, { status: 401 });
    }

    const token = await signSession({ id: user.id, email: user.email, name: user.name });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, cookieOptions);
    return res;
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Could not log in." }, { status: 500 });
  }
}
