"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";

type Status = "success" | "failed" | "pending";

export default function StatusView() {
  const params = useSearchParams();

  // The status reflects THIS transaction only:
  //  • ?status=success  → set by the verified Razorpay Checkout (real payment)
  //  • ?status=failed   → set when the payment failed / was cancelled
  //  • no param         → the hosted-link path → "pending" (never claims paid)
  // We intentionally do NOT infer status from the latest historical booking,
  // which previously made the page show "paid" on every visit.
  const direct = params.get("status");
  const status: Status =
    direct === "success" ? "success" : direct === "failed" ? "failed" : "pending";

  const config = {
    success: {
      icon: CheckCircle2,
      ring: "bg-sage-300/70 text-earth-900",
      title: "Payment successful 🌸",
      msg: "Your booking is confirmed. You'll find it in My Sessions.",
    },
    pending: {
      icon: Clock,
      ring: "bg-gold-100 text-earth-900",
      title: "Booking saved — payment being confirmed",
      msg: "Thank you! Your booking is saved and will show as confirmed once we receive your payment. It already appears in My Sessions.",
    },
    failed: {
      icon: XCircle,
      ring: "bg-rose-soft/70 text-earth-900",
      title: "Payment not completed",
      msg: "Your payment didn't go through. No worries — you can try booking again, or reach out and we'll help.",
    },
  }[status];

  const Icon = config.icon;

  return (
    <div className="card-journal mx-auto max-w-md text-center">
      <div className={`mx-auto grid h-16 w-16 place-items-center rounded-full ${config.ring}`}>
        <Icon className="h-8 w-8" strokeWidth={1.6} />
      </div>
      <h1 className="mt-4 font-display text-2xl text-earth-900 sm:text-3xl">{config.title}</h1>
      <p className="mt-2 body-soft">{config.msg}</p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {status === "failed" ? (
          <Link href="/courses" className="btn-primary">
            Try again <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link href="/dashboard" className="btn-primary">
            View My Sessions <ArrowRight className="h-4 w-4" />
          </Link>
        )}
        <Link href="/" className="btn-ghost">Back home</Link>
      </div>
    </div>
  );
}
