"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = { slug: string; amount?: number; paymentLink?: string; className?: string; label?: string };

declare global {
  interface Window {
    Razorpay: any;
  }
}

/**
 * Book & Pay → Razorpay Checkout (in-site popup).
 *
 * Flow:
 *   1. Must be signed in (else → /login).
 *   2. POST /api/checkout → creates a Razorpay order + a PENDING booking.
 *   3. Razorpay Checkout opens ON the site (card / UPI / netbanking).
 *   4. On success, POST /api/payment/verify checks the signature server-side and
 *      flips the booking to PAID, then we redirect to /payment/status?status=…
 *   5. The webhook is the backstop — if the customer closes the tab mid-redirect,
 *      Razorpay still confirms the booking server-to-server.
 *
 * The customer never leaves the site, and a session can only show as PAID after a
 * real, signature-verified payment.
 */
export default function BookSessionButton({
  slug,
  className = "btn-primary",
  label = "Book & Pay",
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  function loadCheckout(): Promise<boolean> {
    return new Promise((resolve) => {
      if (typeof window !== "undefined" && window.Razorpay) return resolve(true);
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });
  }

  async function handleClick() {
    setLoading(true);
    try {
      // 1. Require login
      const me = (await (await fetch("/api/account/me")).json()).user;
      if (!me) {
        router.push(`/login?redirect_url=/courses/${slug}`);
        return;
      }

      // 2. Load Razorpay Checkout
      const ready = await loadCheckout();
      if (!ready) {
        toast.error("Couldn't load the payment window. Check your connection and try again.");
        setLoading(false);
        return;
      }

      // 3. Create the order + pending booking
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok || !data.orderId) {
        toast.error(data?.error || "Couldn't start the payment. Please try again.");
        setLoading(false);
        return;
      }

      // 4. Open Razorpay Checkout
      const rzp = new window.Razorpay({
        key: data.keyId,
        order_id: data.orderId,
        amount: data.amount,
        currency: data.currency || "INR",
        name: "Art For Soul",
        description: data.sessionTitle,
        prefill: {
          name: data.prefill?.name || me.name || "",
          email: data.prefill?.email || me.email || "",
          contact: me.phone || "",
        },
        theme: { color: "#7c3aed" },
        handler: async (response: any) => {
          // 5. Verify on the server, then show the result
          try {
            const v = await fetch("/api/payment/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const vd = await v.json();
            window.location.href = vd.ok
              ? "/payment/status?status=success"
              : "/payment/status?status=failed";
          } catch {
            // Payment went through but our redirect hiccuped — the webhook will
            // still confirm it. Send them to the status page either way.
            window.location.href = "/payment/status";
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
      });

      rzp.on("payment.failed", () => {
        window.location.href = "/payment/status?status=failed";
      });
      rzp.open();
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={`${className} disabled:opacity-60`}>
      {loading ? "Opening payment…" : label}
    </button>
  );
}
