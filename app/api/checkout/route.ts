import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma, isDbConfigured } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { courses } from "@/lib/data";

export const dynamic = "force-dynamic";

// Strip accidental surrounding quotes/whitespace — a common mistake when
// pasting values into Vercel env vars (which must NOT include quotes).
const clean = (v?: string) => (v || "").trim().replace(/^["']|["']$/g, "");
const RZP_KEY = () => clean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID);
const RZP_SECRET = () => clean(process.env.RAZORPAY_KEY_SECRET);

const hasRazorpay = () => Boolean(RZP_KEY() && RZP_SECRET());

// Razorpay SDK errors are { statusCode, error: { code, description } } — they
// have no `.message`, so pull the real reason out of any shape.
function reason(err: any): string {
  return (
    err?.error?.description ||
    err?.message ||
    (typeof err === "string" ? err : "") ||
    "unknown error"
  );
}

export async function POST(req: Request) {
  // 1. Auth
  let user;
  try {
    user = await getCurrentUser();
  } catch (e: any) {
    console.error("[checkout] session error:", reason(e));
    return NextResponse.json({ ok: false, error: "Session error. Please log in again." }, { status: 401 });
  }
  if (!user) {
    return NextResponse.json({ ok: false, error: "Please sign in first." }, { status: 401 });
  }

  // 2. Config presence
  if (!hasRazorpay()) {
    return NextResponse.json(
      { ok: false, error: "Payment keys are missing on the server (Razorpay)." },
      { status: 503 }
    );
  }
  if (!isDbConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Database is not configured on the server." },
      { status: 503 }
    );
  }

  // 3. Resolve session + amount
  let course;
  try {
    const { slug } = await req.json();
    course = courses.find((c) => c.slug === slug && c.published);
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request." }, { status: 400 });
  }
  if (!course) {
    return NextResponse.json({ ok: false, error: "Session not found." }, { status: 404 });
  }
  const amountPaise = course.price * 100;
  if (amountPaise < 100) {
    return NextResponse.json({ ok: false, error: "Amount too low." }, { status: 400 });
  }

  // 4. Create the Razorpay order (isolated, so we know if THIS is the failure)
  let order;
  try {
    const rzp = new Razorpay({
      key_id: RZP_KEY(),
      key_secret: RZP_SECRET(),
    });
    order = await rzp.orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt: `afs_${Date.now()}`,
      notes: { slug: course.slug, userId: user.id },
    });
  } catch (e: any) {
    console.error("[checkout] razorpay error:", reason(e), e);
    return NextResponse.json(
      { ok: false, error: `Payment gateway: ${reason(e)}` },
      { status: 502 }
    );
  }

  // 5. Save the pending booking (isolated)
  try {
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
  } catch (e: any) {
    console.error("[checkout] db error:", reason(e), e);
    return NextResponse.json(
      { ok: false, error: `Database: ${reason(e)}` },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    keyId: RZP_KEY(),
    sessionTitle: course.title,
    prefill: { name: user.name ?? "", email: user.email },
  });
}
