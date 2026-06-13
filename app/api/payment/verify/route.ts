import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma, isDbConfigured } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";

const isRazorpayConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Not signed in." }, { status: 401 });
  }
  if (!isRazorpayConfigured() || !isDbConfigured()) {
    return NextResponse.json({ ok: false, error: "Payments not configured." }, { status: 503 });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
    const valid = expected === razorpay_signature;

    const purchase = await prisma.purchase.findUnique({
      where: { razorpayOrderId: razorpay_order_id },
    });
    if (!purchase || purchase.userId !== user.id) {
      return NextResponse.json({ ok: false, error: "Order not found." }, { status: 404 });
    }

    await prisma.purchase.update({
      where: { razorpayOrderId: razorpay_order_id },
      data: {
        status: valid ? "PAID" : "FAILED",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      },
    });

    if (!valid) {
      return NextResponse.json({ ok: false, error: "Payment verification failed." }, { status: 400 });
    }
    return NextResponse.json({ ok: true });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Verification error." }, { status: 500 });
  }
}
