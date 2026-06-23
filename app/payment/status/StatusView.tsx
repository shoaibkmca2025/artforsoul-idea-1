"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, XCircle, Clock, ArrowRight } from "lucide-react";

type Status = "loading" | "success" | "failed" | "pending";

export default function StatusView() {
  const params = useSearchParams();
  const [status, setStatus] = useState<Status>("loading");
  const [title, setTitle] = useState<string | null>(null);

  useEffect(() => {
    const direct = params.get("status"); // from the Razorpay Checkout flow
    if (direct === "success" || direct === "failed") {
      setStatus(direct);
      return;
    }
    // From the hosted payment link redirect (or a manual return)
    const linkStatus =
      params.get("razorpay_payment_link_status") || params.get("razorpay_status") || "";
    fetch("/api/account/payment-return", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkStatus }),
    })
      .then((r) => r.json())
      .then((d) => {
        setStatus((d.status as Status) || "pending");
        setTitle(d.title ?? null);
      })
      .catch(() => setStatus("pending"));
  }, [params]);

  if (status === "loading") {
    return (
      <div className="card-journal mx-auto max-w-md text-center">
        <p className="font-script text-2xl text-plum-700">Checking your payment…</p>
        <div className="mx-auto mt-4 h-8 w-8 animate-spin rounded-full border-2 border-earth-300 border-t-plum-500" />
      </div>
    );
  }

  const config = {
    success: {
      icon: CheckCircle2,
      ring: "bg-sage-300/70 text-earth-900",
      title: "Payment successful 🌸",
      msg: title
        ? `Your booking for "${title}" is confirmed. You'll find it in My Sessions.`
        : "Your booking is confirmed. You'll find it in My Sessions.",
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
