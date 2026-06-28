"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = { slug: string; amount?: number; paymentLink?: string; className?: string; label?: string };

/**
 * Book & Pay → records a pending booking, then sends the customer to this
 * session's Razorpay payment link. After paying, Razorpay redirects back to
 * /payment/status, which verifies the payment and confirms the booking
 * (or shows "payment failed — pay again").
 *
 * IMPORTANT (one-time Razorpay setup): on each payment link, set the
 * "redirect after payment" URL to  https://www.artforsoul.in/payment/status
 */
export default function BookSessionButton({
  slug,
  paymentLink,
  className = "btn-primary",
  label = "Book & Pay",
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      // 1. Require a signed-in account
      const me = (await (await fetch("/api/account/me")).json()).user;
      if (!me) {
        router.push(`/login?redirect_url=/courses/${slug}`);
        return;
      }

      if (!paymentLink) {
        router.push("/contact");
        return;
      }

      // 2. Record a pending booking, then go to the payment link (same tab so
      //    Razorpay can redirect back to /payment/status after payment).
      try {
        await fetch("/api/account/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ slug }),
        });
      } catch {
        /* still let them pay even if recording hiccups */
      }
      window.location.href = paymentLink;
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
      setLoading(false);
    }
  }

  return (
    <button onClick={handleClick} disabled={loading} className={`${className} disabled:opacity-60`}>
      {loading ? "Redirecting to payment…" : label}
    </button>
  );
}
