"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

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
      const meRes = await fetch("/api/account/me");
      const me = (await meRes.json()).user;
      if (!me) {
        router.push(`/login?redirect_url=/courses/${slug}`);
        return;
      }

      // 2. Create order
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not start checkout.");

      // 3. Open Razorpay
      const ready = await loadRazorpay();
      if (!ready) throw new Error("Could not load payment window. Check your connection.");

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
          if (vd.ok) {
            toast.success("Payment successful! Your session is booked ✿");
            router.push("/dashboard");
            router.refresh();
          } else {
            toast.error(vd.error || "Payment could not be verified.");
          }
        },
        modal: { ondismiss: () => setLoading(false) },
      });
      rzp.open();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={`${className} disabled:opacity-60`}>
      {loading ? "Please wait…" : label}
    </button>
  );
}
