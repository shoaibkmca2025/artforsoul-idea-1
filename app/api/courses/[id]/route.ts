import { NextResponse } from "next/server";

export async function PATCH() {
  return NextResponse.json({ ok: false, error: "Read-only in prototype mode" }, { status: 403 });
}

export async function DELETE() {
  return NextResponse.json({ ok: false, error: "Read-only in prototype mode" }, { status: 403 });
}
