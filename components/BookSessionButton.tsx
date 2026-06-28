"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type Props = { slug: string; amount?: number; paymentLink?: string; className?: string; label?: string };

/**
 * Book & Pay → records a pending booking, then sends the customer to this
 * session's Razorpay payment link to pay.
 *
 * After paying:
 *   • If the payment link has a "redirect after payment" URL set to
 *     https://www.artforsoul.in/payment/status , the booking is verified &
 *     confirmed automatically (or shows "payment failed — pay again").
 *   • Otherwise, the studio confirms the payment in /admin/bookings.
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
      const me = (await (await fetch("/api/account/me")).json()).user;
      if (!me) {
        router.push(`/login?redirect_url=/courses/${slug}`);
        return;
      }
      if (!paymentLink) {
        router.push("/contact");
        return;
      }

      // Record a pending booking, then redirect to the payment link.
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
