import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    // Prototype mode: accept any credentials
    if (email && password) {
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, error: "Invalid credentials" }, { status: 401 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Bad request" }, { status: 400 });
  }
}

export async function DELETE() {
  return NextResponse.json({ ok: true });
}
