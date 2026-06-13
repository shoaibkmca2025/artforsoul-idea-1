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
    const name = body.name ? String(body.name).trim() : null;

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return NextResponse.json({ ok: false, error: "Please enter a valid email." }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ ok: false, error: "Password must be at least 6 characters." }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ ok: false, error: "An account with this email already exists. Please log in." }, { status: 409 });
    }

    // Everything beyond the core fields is the healing intake questionnaire.
    const intake = {
      sessions: body.sessions ?? [],
      experiencing: body.experiencing ?? [],
      helpWith: body.helpWith ?? "",
      physicalConcerns: body.physicalConcerns ?? "",
      therapyBefore: body.therapyBefore ?? "",
      hopingToAchieve: body.hopingToAchieve ?? "",
      preferredDays: body.preferredDays ?? [],
      preferredTime: body.preferredTime ?? [],
      interests: body.interests ?? [],
    };

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        name,
        phone: body.phone ? String(body.phone) : null,
        city: body.city ? String(body.city) : null,
        age: body.age ? String(body.age) : null,
        occupation: body.occupation ? String(body.occupation) : null,
        intake: JSON.stringify(intake),
      },
    });

    const token = await signSession({ id: user.id, email: user.email, name: user.name });
    const res = NextResponse.json({ ok: true });
    res.cookies.set(SESSION_COOKIE, token, cookieOptions);
    return res;
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Could not create account." }, { status: 500 });
  }
}
