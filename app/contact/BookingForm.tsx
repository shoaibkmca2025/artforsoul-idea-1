"use client";

import { useState } from "react";
import { toast } from "sonner";

const SERVICES = [
  "1:1 Online Art Therapy",
  "Group Workshop",
  "Healing Program",
  "Creative Wellness Experience",
  "Interior Design Project",
];

export default function BookingForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const payload = {
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone"),
        service: form.get("service"),
        date: form.get("date"),
        message: form.get("message"),
      };
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Could not book");
      toast.success("We've received your booking request. Talk soon ✿");
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" required placeholder="Your name" className="afs-input" />
        <input name="email" type="email" required placeholder="Email" className="afs-input" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="phone" required placeholder="Phone (WhatsApp)" className="afs-input" />
        <input name="date" type="date" className="afs-input" />
      </div>
      <select name="service" required className="afs-input">
        <option value="">Choose a service…</option>
        {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
      </select>
      <textarea name="message" rows={3} placeholder="Anything we should know? (optional)" className="afs-input resize-none" />
      <button disabled={loading} className="btn-primary w-full">
        {loading ? "Booking..." : "Request Booking"}
      </button>
      <style jsx>{`
        :global(.afs-input) {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(176, 137, 104, 0.4);
          background: rgba(251, 247, 240, 0.85);
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          color: #3a2a20;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        :global(.afs-input:focus) {
          border-color: #8c6a4f;
          box-shadow: 0 0 0 4px rgba(140, 106, 79, 0.15);
        }
      `}</style>
    </form>
  );
}
