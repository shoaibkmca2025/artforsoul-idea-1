import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma, isDbConfigured } from "@/lib/prisma";
import { sendBookingPaidEmail } from "@/lib/email";

export const dynamic = "force-dynamic";

/**
 * Razorpay webhook — the reliable, server-to-server confirmation.
 *
 * Configure in Razorpay Dashboard → Settings → Webhooks:
 *   URL:    https://www.artforsoul.in/api/webhooks/razorpay
 *   Events: payment.captured, order.paid, payment.failed
 *   Secret: the same value as RAZORPAY_WEBHOOK_SECRET in your env
 *
 * Why email + amount matching?
 * The studio uses Razorpay *Payment Pages* (pages.razorpay.com/pl_…/view).
 * Those pages create their OWN order — there's no order id we generated — and
 * they never redirect back to the site. So we can't match on our order id.
 * Instead, when Razorpay tells us a payment was captured, we find the pending
 * booking for that customer (by the email they paid with) and the matching
 * amount, and confirm it. Razorpay signs every request, so this is trustworthy.
 */
export async function POST(req: Request) {
  const secret = (process.env.RAZORPAY_WEBHOOK_SECRET || "").trim().replace(/^["']|["']$/g, "");
  if (!secret || !isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Webhook not configured." }, { status: 503 });
  }

  const raw = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  const expected = crypto.createHmac("sha256", secret).update(raw).digest("hex");
  const valid =
    expected.length === signature.length &&
    crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature));
  if (!valid) {
    return NextResponse.json({ ok: false, error: "Invalid signature." }, { status: 400 });
  }

  try {
    const event = JSON.parse(raw);
    const type: string = event?.event || "";
    const payment = event?.payload?.payment?.entity || null;
    const orderEntity = event?.payload?.order?.entity || null;

    const orderId = payment?.order_id || orderEntity?.id || null;
    const paymentId = payment?.id || null;
    const email = (payment?.email || "").toString().trim().toLowerCase();
    const amountPaise: number | null =
      typeof payment?.amount === "number" ? payment.amount : null;

    const isPaid = type === "payment.captured" || type === "order.paid";
    const isFailed = type === "payment.failed";

    // ── 1) Try to match a booking we created with our own order id (Checkout) ──
    if (orderId) {
      const byOrder = await prisma.purchase.findUnique({ where: { razorpayOrderId: orderId } });
      if (byOrder) {
        if (isPaid && byOrder.status !== "PAID") {
          await prisma.purchase.update({
            where: { id: byOrder.id },
            data: { status: "PAID", razorpayPaymentId: paymentId ?? byOrder.razorpayPaymentId },
          });
          await sendBookingPaidEmail({
            sessionTitle: byOrder.sessionTitle,
            amount: byOrder.amount,
            name: byOrder.name,
            email: byOrder.email,
          });
        }
        return NextResponse.json({ ok: true, matched: "order" });
      }
    }

    // ── 2) Payment Page flow → match the customer's pending booking by email ──
    // Find this customer's pending bookings (newest first), then prefer the one
    // whose amount matches the amount Razorpay says was paid.
    if ((isPaid || isFailed) && email) {
      const pendings = await prisma.purchase.findMany({
        where: { status: "PENDING", email: { equals: email, mode: "insensitive" } },
        orderBy: { createdAt: "desc" },
        take: 20,
      });

      // Prefer an exact amount match; otherwise the most recent pending booking.
      const exact =
        amountPaise != null ? pendings.find((p) => p.amount * 100 === amountPaise) : undefined;
      const target = exact || pendings[0];

      if (target) {
        if (isPaid) {
          await prisma.purchase.update({
            where: { id: target.id },
            data: { status: "PAID", razorpayPaymentId: paymentId ?? target.razorpayPaymentId },
          });
          await sendBookingPaidEmail({
            sessionTitle: target.sessionTitle,
            amount: target.amount,
            name: target.name,
            email: target.email,
          });
          return NextResponse.json({ ok: true, matched: exact ? "email+amount" : "email" });
        }
        if (isFailed) {
          await prisma.purchase.update({ where: { id: target.id }, data: { status: "FAILED" } });
          return NextResponse.json({ ok: true, matched: "email", result: "failed" });
        }
      }
    }

    return NextResponse.json({ ok: true, ignored: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Webhook error." }, { status: 500 });
  }
}
