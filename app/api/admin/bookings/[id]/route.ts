import { NextResponse } from "next/server";
import { prisma, isDbConfigured } from "@/lib/prisma";
import { isAdmin } from "@/lib/session";
import { sendBookingPaidEmail } from "@/lib/email";

// Admin: update a booking's status (PAID / PENDING / FAILED)
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorised." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }
  try {
    const { status } = await req.json();
    if (!["PAID", "PENDING", "FAILED"].includes(status)) {
      return NextResponse.json({ ok: false, error: "Invalid status." }, { status: 400 });
    }
    const existing = await prisma.purchase.findUnique({ where: { id: params.id } });
    await prisma.purchase.update({ where: { id: params.id }, data: { status } });

    // Email the studio when a booking is newly confirmed as paid
    if (status === "PAID" && existing && existing.status !== "PAID") {
      await sendBookingPaidEmail({
        sessionTitle: existing.sessionTitle,
        amount: existing.amount,
        name: existing.name,
        email: existing.email,
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Update failed." }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Not authorised." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }
  try {
    await prisma.purchase.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Delete failed." }, { status: 500 });
  }
}
