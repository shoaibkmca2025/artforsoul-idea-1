import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ ok: false, error: "Uploads disabled in prototype mode" }, { status: 403 });
}
