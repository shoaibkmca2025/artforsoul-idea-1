"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import { X, CreditCard, CheckCircle2, ExternalLink } from "lucide-react";

const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
// Your own UPI ID — a QR to this is REAL and any UPI app can pay it.
const UPI_ID = process.env.NEXT_PUBLIC_UPI_ID;
const UPI_NAME = process.env.NEXT_PUBLIC_UPI_NAME || "Art For Soul";
// Razorpay hosted payment link (shown as a QR when no UPI ID is set).
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

type Props = { slug: string; amount?: number; className?: string; label?: string };

export default function BookSessionButton({ slug, amount, className = "btn-primary", label = "Book & Pay" }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPay, setShowPay] = useState(false);

  // Real UPI deep-link (payable by any UPI app, exact amount to your account)
  const upiString =
    UPI_ID && amount
      ? `upi://pay?pa=${encodeURIComponent(UPI_ID)}&pn=${encodeURIComponent(
          UPI_NAME
        )}&am=${amount}&cu=INR&tn=${encodeURIComponent("Art For Soul session")}`
      : null;

  // What the QR encodes: the real UPI link if set, else the Razorpay link.
  const qrValue = upiString ?? PAYMENT_LINK;
  const isUpi = Boolean(upiString);

  async function handleClick() {
    setLoading(true);
    try {
      const me = (await (await fetch("/api/account/me")).json()).user;
      if (!me) {
        router.push(`/login?redirect_url=/courses/${slug}`);
        return;
      }
      // Show the scan-to-pay popup (QR for every service).
      setShowPay(true);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  // Record a pending booking (UPI-scan path → admin confirms once money arrives)
  async function recordBooking() {
    const res = await fetch("/api/account/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug }),
    });
    const d = await res.json();
    if (!res.ok || !d.ok) throw new Error(d.error || "Could not create booking.");
  }

  // Razorpay Standard Checkout — auto-verified (card / UPI)
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

  async function afterUpiPaid() {
    setLoading(true);
    try {
      await recordBooking();
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

      {showPay && (
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
            {isUpi ? (
              <p className="mt-1 text-sm body-soft">
                Scan with any UPI app (GPay, PhonePe, Paytm) to pay{" "}
                <span className="font-semibold text-earth-900">₹{amount?.toLocaleString("en-IN")}</span>.
              </p>
            ) : (
              <p className="mt-1 text-sm body-soft">
                Scan with your <span className="font-medium">phone camera</span> to open the
                secure payment page.
              </p>
            )}

            <div className="mx-auto mt-4 w-fit rounded-2xl border border-gold-300/60 bg-white p-3 shadow-soft">
              <QRCodeSVG value={qrValue} size={170} level="M" />
            </div>
            {isUpi && (
              <p className="mt-2 text-xs text-earth-500">Paying to {UPI_NAME} · {UPI_ID}</p>
            )}

            {!isUpi && (
              <a
                href={PAYMENT_LINK}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost mt-4 w-full text-sm"
              >
                <ExternalLink className="h-4 w-4" /> Open payment link
              </a>
            )}
            {RAZORPAY_KEY_ID && (
              <button
                onClick={payWithCheckout}
                disabled={loading}
                className="btn-ghost mt-2 w-full text-sm disabled:opacity-60"
              >
                <CreditCard className="h-4 w-4" /> Or pay by Card / Netbanking
              </button>
            )}
            <button onClick={afterUpiPaid} disabled={loading} className="btn-primary mt-2 w-full text-sm disabled:opacity-60">
              <CheckCircle2 className="h-4 w-4" /> I've paid — save my booking
            </button>
            <p className="mt-3 text-xs text-earth-500">
              We'll confirm your booking once payment is received.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
