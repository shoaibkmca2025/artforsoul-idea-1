"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
const PAYMENT_LINK =
  process.env.NEXT_PUBLIC_RAZORPAY_PAYMENT_LINK || "https://rzp.io/rzp/MeCfWcy";

declare global {
  interface Window {
    Razorpay?: any;
  }
}

function loadRazorpay(): Promise<boolean> {
  return new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

type Props = { slug: string; className?: string; label?: string };

export default function BookSessionButton({ slug, className = "btn-primary", label = "Book & Pay" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      // 1. Must be signed in
      const me = (await (await fetch("/api/account/me")).json()).user;
      if (!me) {
        router.push(`/login?redirect_url=/courses/${slug}`);
        return;
      }

      // 2. No API keys configured → fall back to the hosted payment link
      //    (booking stays pending until the studio confirms it).
      if (!RAZORPAY_KEY_ID) {
        const r = await fetch("/api/account/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });
        const d = await r.json();
        if (!r.ok || !d.ok) throw new Error(d.error || "Could not create booking.");
        window.open(PAYMENT_LINK, "_blank", "noopener");
        router.push("/payment/status");
        return;
      }

      // 3. Razorpay Standard Checkout — card / UPI / QR, auto-verified.
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not start checkout.");

      const ready = await loadRazorpay();
      if (!ready) throw new Error("Could not load the payment window. Check your connection.");

      const rzp = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Art For Soul",
        description: data.sessionTitle,
        order_id: data.orderId,
        prefill: data.prefill,
        theme: { color: "#6B2D52" },
        handler: async (resp: any) => {
          const v = await fetch("/api/payment/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(resp),
          });
          const vd = await v.json();
          router.push(`/payment/status?status=${vd.ok ? "success" : "failed"}`);
          router.refresh();
        },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.on("payment.failed", () => router.push("/payment/status?status=failed"));
      rzp.open();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={`${className} disabled:opacity-60`}>
      {loading ? "Please wait…" : label}
    </button>
  );
}
