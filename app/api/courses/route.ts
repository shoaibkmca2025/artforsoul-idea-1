import { NextResponse } from "next/server";
import { courses } from "@/lib/data";

export async function GET() {
  return NextResponse.json({ ok: true, courses });
}

export async function POST() {
  return NextResponse.json({ ok: false, error: "Read-only in prototype mode" }, { status: 403 });
}
