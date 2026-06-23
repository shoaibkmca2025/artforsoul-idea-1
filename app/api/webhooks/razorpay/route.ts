import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma, isDbConfigured } from "@/lib/prisma";
import { sendBookingPaidEmail } from "@/lib/email";

/**
 * Razorpay webhook — the reliable, server-to-server confirmation.
 *
 * Configure in Razorpay Dashboard → Settings → Webhooks:
 *   URL:    https://artforsoul.in/api/webhooks/razorpay
 *   Events: payment.captured, order.paid
 *   Secret: set the same value as RAZORPAY_WEBHOOK_SECRET in your env
 *
 * Razorpay signs every request; we verify the signature before trusting it,
 * then mark the matching booking PAID by its Razorpay order id.
 */
export async function POST(req: Request) {
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!secret || !isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Webhook not configured." }, { status: 503 });
  }

  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  // constant-time compare
  const valid =
    expected.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  if (!valid) {
    return NextResponse.json({ ok: false, error: "Invalid signature." }, { status: 400 });
  }

  try {
    const event = JSON.parse(raw);
    const orderId =
      event?.payload?.payment?.entity?.order_id ||
      event?.payload?.order?.entity?.id ||
      null;
    if (!orderId) return NextResponse.json({ ok: true, ignored: true });

    const purchase = await prisma.purchase.findUnique({ where: { razorpayOrderId: orderId } });
    if (!purchase) return NextResponse.json({ ok: true, ignored: true });

    if (purchase.status !== "PAID") {
      await prisma.purchase.update({
        where: { razorpayOrderId: orderId },
        data: {
          status: "PAID",
          razorpayPaymentId: event?.payload?.payment?.entity?.id ?? purchase.razorpayPaymentId,
        },
      });
      await sendBookingPaidEmail({
        sessionTitle: purchase.sessionTitle,
        amount: purchase.amount,
        name: purchase.name,
        email: purchase.email,
      });
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Webhook error." }, { status: 500 });
  }
}
