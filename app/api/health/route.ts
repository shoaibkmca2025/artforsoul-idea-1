import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

/**
 * Diagnostic — open /api/health on the live site to see what's misconfigured.
 * Reports which env vars are present and whether the DB + Razorpay actually work.
 * (No secrets are exposed — only booleans and short status strings.)
 */
export async function GET() {
  const env = {
    DATABASE_URL: Boolean(process.env.DATABASE_URL),
    DIRECT_URL: Boolean(process.env.DIRECT_URL),
    SESSION_SECRET: Boolean(process.env.SESSION_SECRET),
    NEXT_PUBLIC_RAZORPAY_KEY_ID: Boolean(process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID),
    RAZORPAY_KEY_SECRET: Boolean(process.env.RAZORPAY_KEY_SECRET),
    keyIdPrefix: (process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "").slice(0, 11),
  };

  // DB check
  let db = "skipped";
  try {
    await prisma.purchase.count();
    db = "ok";
  } catch (e: any) {
    db = "FAIL: " + (e?.message || "unknown").slice(0, 140);
  }

  // Razorpay check (creates a tiny test order)
  let razorpay = "skipped";
  if (env.NEXT_PUBLIC_RAZORPAY_KEY_ID && env.RAZORPAY_KEY_SECRET) {
    try {
      const rzp = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!.trim(),
        key_secret: process.env.RAZORPAY_KEY_SECRET!.trim(),
      });
      const o = await rzp.orders.create({ amount: 100, currency: "INR", receipt: "health_" + Date.now() });
      razorpay = "ok (" + o.id + ")";
    } catch (e: any) {
      razorpay = "FAIL: " + (e?.error?.description || e?.message || "unknown");
    }
  } else {
    razorpay = "keys missing";
  }

  return NextResponse.json({ env, db, razorpay });
}
