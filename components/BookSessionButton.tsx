"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

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

type Props = { slug: string; amount?: number; className?: string; label?: string };

/**
 * Booking is ALWAYS confirmed by a verified Razorpay payment — never by a
 * self-claim. A session only becomes PAID when:
 *   • the Razorpay Checkout signature verifies (/api/payment/verify), or
 *   • the Razorpay webhook fires (/api/webhooks/razorpay).
 * This is what prevents "showing paid without paying".
 */
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

      // 2. Payments must be configured (auto-verify needs Razorpay keys)
      if (!RAZORPAY_KEY_ID) {
        toast.error("Online payment isn't enabled yet. Please contact the studio to book.");
        return;
      }

      // 3. Create the order (also creates a PENDING booking server-side)
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not start checkout.");

      const ready = await loadRazorpay();
      if (!ready) throw new Error("Could not load the payment window. Check your connection.");

      // 4. Open Razorpay Checkout — card / UPI / QR, cryptographically verified
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
          // 5. Verify the signature on the server before anything is marked paid
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
