import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    // Prototype mode: just acknowledge the booking
    console.log("Booking received:", data);
    return NextResponse.json({ ok: true, id: "proto-" + Date.now() });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || "Bad request" }, { status: 400 });
  }
}
