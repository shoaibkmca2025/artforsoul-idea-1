"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { X, CreditCard, ExternalLink, CheckCircle2 } from "lucide-react";

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

type Props = {
  slug: string;
  amount?: number;
  paymentLink?: string;
  className?: string;
  label?: string;
};

export default function BookSessionButton({
  slug,
  amount,
  paymentLink,
  className = "btn-primary",
  label = "Book & Pay",
}: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPay, setShowPay] = useState(false);

  async function handleClick() {
    setLoading(true);
    try {
      const me = (await (await fetch("/api/account/me")).json()).user;
      if (!me) {
        router.push(`/login?redirect_url=/courses/${slug}`);
        return;
      }
      // Has a per-session payment link → show the scannable QR popup.
      if (paymentLink) {
        setShowPay(true);
        return;
      }
      // Otherwise go straight to Razorpay Checkout (auto-verified).
      await payWithCheckout();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Razorpay Standard Checkout — cryptographically verified, auto-confirms.
  async function payWithCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not start checkout.");

      const ready = await loadRazorpay();
      if (!ready) throw new Error("Could not load the payment window.");

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

  // Records a PENDING booking after paying via the per-session link/QR.
  // It only becomes "Confirmed" once the studio verifies the payment in admin
  // (a session never shows as paid without a real, verified payment).
  async function afterLinkPaid() {
    setLoading(true);
    try {
      const res = await fetch("/api/account/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      });
      const d = await res.json();
      if (!res.ok || !d.ok) throw new Error(d.error || "Could not save booking.");
      setShowPay(false);
      router.push("/payment/status");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <button onClick={handleClick} disabled={loading} className={`${className} disabled:opacity-60`}>
        {loading ? "Please wait…" : label}
      </button>

      {showPay && paymentLink && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-earth-900/50 p-4 backdrop-blur-sm"
          onClick={() => setShowPay(false)}
        >
          <div
            className="relative w-full max-w-sm rounded-3xl border border-earth-300/40 bg-cream-50 p-6 text-center shadow-journal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowPay(false)}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-cream-100 text-earth-700 hover:bg-cream-200"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="font-script text-2xl text-plum-700">Scan to pay 🌸</p>
            <p className="mt-1 text-sm body-soft">
              Scan to pay{" "}
              {amount && (
                <span className="font-semibold text-earth-900">₹{amount.toLocaleString("en-IN")}</span>
              )}{" "}
              for this session, or tap below.
            </p>

            <div className="mx-auto mt-4 w-fit rounded-2xl border border-gold-300/60 bg-white p-3 shadow-soft">
              <QRCodeSVG value={paymentLink} size={170} level="M" />
            </div>

            <a
              href={paymentLink}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost mt-4 w-full text-sm"
            >
              <ExternalLink className="h-4 w-4" /> Open payment page
            </a>
            {RAZORPAY_KEY_ID && (
              <button
                onClick={payWithCheckout}
                disabled={loading}
                className="btn-ghost mt-2 w-full text-sm disabled:opacity-60"
              >
                <CreditCard className="h-4 w-4" /> Or pay by Card / Netbanking
              </button>
            )}
            <button
              onClick={afterLinkPaid}
              disabled={loading}
              className="btn-primary mt-2 w-full text-sm disabled:opacity-60"
            >
              <CheckCircle2 className="h-4 w-4" /> I've completed payment
            </button>
            <p className="mt-3 text-xs text-earth-500">
              Your booking is saved &amp; confirmed once we receive your payment.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
