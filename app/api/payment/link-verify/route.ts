import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma, isDbConfigured } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { sendBookingPaidEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

const secret = () =>
  (process.env.RAZORPAY_KEY_SECRET || "").trim().replace(/^["']|["']$/g, "");

/**
 * Confirms a booking after the customer returns from a Razorpay Payment Link.
 *
 * Razorpay redirects (in the customer's own logged-in browser) with:
 *   razorpay_payment_link_id, razorpay_payment_link_reference_id,
 *   razorpay_payment_link_status, razorpay_payment_id, razorpay_signature
 *
 * We VERIFY the signature against RAZORPAY_KEY_SECRET, so a booking can only be
 * marked PAID by a genuine, signed Razorpay redirect — it can't be faked by
 * editing the URL. Unverified / unpaid → left pending (studio confirms).
 */
export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) return NextResponse.json({ ok: false, status: "unauthed" }, { status: 401 });
  if (!isDbConfigured()) return NextResponse.json({ ok: true, status: "pending" });

  let body: any = {};
  try {
    body = await req.json();
  } catch {
    /* ignore */
  }

  const {
    razorpay_payment_link_id = "",
    razorpay_payment_link_reference_id = "",
    razorpay_payment_link_status = "",
    razorpay_payment_id = "",
    razorpay_signature = "",
  } = body;

  // The booking the customer just started (most recent pending for this user)
  const booking = await prisma.purchase.findFirst({
    where: { userId: user.id, status: "PENDING" },
    orderBy: { createdAt: "desc" },
  });

  // Verify the Razorpay payment-link signature
  let valid = false;
  if (secret() && razorpay_signature && razorpay_payment_link_id && razorpay_payment_id) {
    const payload = `${razorpay_payment_link_id}|${razorpay_payment_link_reference_id}|${razorpay_payment_link_status}|${razorpay_payment_id}`;
    const expected = crypto.createHmac("sha256", secret()).update(payload).digest("hex");
    valid =
      expected.length === razorpay_signature.length &&
      crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(razorpay_signature));
  }

  // Paid + verified → confirm the booking
  if (razorpay_payment_link_status === "paid" && valid && booking) {
    await prisma.purchase.update({
      where: { id: booking.id },
      data: { status: "PAID", razorpayPaymentId: razorpay_payment_id, razorpaySignature: razorpay_signature },
    });
    await sendBookingPaidEmail({
      sessionTitle: booking.sessionTitle,
      amount: booking.amount,
      name: booking.name,
      email: booking.email,
    });
    return NextResponse.json({ ok: true, status: "success" });
  }

  // Explicitly not paid → failed
  if (razorpay_payment_link_status && razorpay_payment_link_status !== "paid" && booking) {
    await prisma.purchase.update({ where: { id: booking.id }, data: { status: "FAILED" } });
    return NextResponse.json({ ok: true, status: "failed" });
  }

  // Paid but signature couldn't be verified → keep pending (studio confirms),
  // so a tampered URL can never auto-confirm.
  return NextResponse.json({
    ok: true,
    status: razorpay_payment_link_status === "paid" ? "pending" : "failed",
  });
}
