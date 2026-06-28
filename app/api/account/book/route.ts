import { NextResponse } from "next/server";
import { prisma, isDbConfigured } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { courses } from "@/lib/data";

// Records a PENDING booking when a customer pays via the hosted payment link.
// It only becomes "Confirmed" once the studio verifies the payment in
// /admin/bookings, so a session never shows as paid without a real payment.
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Please sign in first." }, { status: 401 });
  }
  if (!isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Database not connected." }, { status: 503 });
  }

  try {
    const { slug } = await req.json();
    const course = courses.find((c) => c.slug === slug && c.published);
    if (!course) {
      return NextResponse.json({ ok: false, error: "Session not found." }, { status: 404 });
    }

    const purchase = await prisma.purchase.create({
      data: {
        userId: user.id,
        email: user.email,
        name: user.name ?? null,
        sessionSlug: course.slug,
        sessionTitle: course.title,
        amount: course.price,
        status: "PENDING",
      },
    });
    return NextResponse.json({ ok: true, id: purchase.id });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Could not save booking." }, { status: 500 });
  }
}
