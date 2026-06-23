import { NextResponse } from "next/server";
import { prisma, isDbConfigured } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

/**
 * READ-ONLY status report for the customer's most recent booking.
 *
 * It NEVER changes a booking's status — payment confirmation only ever comes
 * from verified sources:
 *   • Razorpay Checkout signature verify  (/api/payment/verify)
 *   • Razorpay webhook                     (/api/webhooks/razorpay)
 *   • Admin "Mark paid"                    (/admin/bookings)
 *
 * This is what fixes the false "payment done" / wrong-status bugs.
 */
export async function POST() {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, status: "unauthed" }, { status: 401 });
  if (!isDbConfigured()) return NextResponse.json({ ok: true, status: "pending" });

  const latest = await prisma.purchase.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  if (!latest) return NextResponse.json({ ok: true, status: "pending", title: null });

  const status =
    latest.status === "PAID" ? "success" : latest.status === "FAILED" ? "failed" : "pending";

  return NextResponse.json({ ok: true, status, title: latest.sessionTitle });
}
