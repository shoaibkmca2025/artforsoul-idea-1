import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma, isDbConfigured } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { courses } from "@/lib/data";

const isRazorpayConfigured = () =>
  Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET);

export async function POST(req: Request) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ ok: false, error: "Please sign in first." }, { status: 401 });
  }
  if (!isRazorpayConfigured() || !isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Payments are not configured yet. Please contact the studio." },
      { status: 503 }
    );
  }

  try {
    const { slug } = await req.json();
    const course = courses.find((c) => c.slug === slug && c.published);
    if (!course) {
      return NextResponse.json({ ok: false, error: "Session not found." }, { status: 404 });
    }

    const rzp = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await rzp.orders.create({
      amount: course.price * 100,
      currency: "INR",
      receipt: `afs_${Date.now()}`,
      notes: { slug: course.slug, userId: user.id },
    });

    await prisma.purchase.create({
      data: {
        userId: user.id,
        email: user.email,
        name: user.name ?? null,
        sessionSlug: course.slug,
        sessionTitle: course.title,
        amount: course.price,
        razorpayOrderId: order.id,
        status: "PENDING",
      },
    });

    return NextResponse.json({
      ok: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      sessionTitle: course.title,
      prefill: { name: user.name ?? "", email: user.email },
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message || "Could not start checkout." }, { status: 500 });
  }
}
