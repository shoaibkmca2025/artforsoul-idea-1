"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, Clock, Trash2 } from "lucide-react";

type Booking = {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  sessionTitle: string;
  amount: number;
  status: string;
  createdAt: string;
};

export default function BookingRow({ b }: { b: Booking }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(b.status);

  async function setStatusTo(next: string) {
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/bookings/${b.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: next }),
      });
      const d = await res.json();
      if (!res.ok || !d.ok) throw new Error(d.error || "Failed");
      setStatus(next);
      toast.success(`Marked ${next.toLowerCase()}`);
      router.refresh();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  async function remove() {
    if (!confirm("Delete this booking?")) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/admin/bookings/${b.id}`, { method: "DELETE" });
      const d = await res.json();
      if (!res.ok || !d.ok) throw new Error(d.error || "Failed");
      toast.success("Deleted");
      router.refresh();
    } catch (e: any) {
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  }

  const badge =
    status === "PAID"
      ? "bg-sage-300/70 text-earth-900"
      : status === "PENDING"
      ? "bg-gold-100 text-earth-900"
      : "bg-rose-soft/70 text-earth-900";

  return (
    <tr className="align-top">
      <td className="p-4 text-xs text-earth-500">
        {new Date(b.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
      </td>
      <td className="p-4">
        <div className="font-medium text-earth-900">{b.name || "—"}</div>
        <div className="text-xs text-earth-500">{b.email}</div>
        {b.phone && <div className="text-xs text-earth-500">{b.phone}</div>}
      </td>
      <td className="p-4 text-earth-900">{b.sessionTitle}</td>
      <td className="p-4 font-medium">₹{b.amount.toLocaleString("en-IN")}</td>
      <td className="p-4">
        <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${badge}`}>
          {status === "PAID" ? <Check className="h-3 w-3" /> : <Clock className="h-3 w-3" />}
          {status}
        </span>
      </td>
      <td className="p-4">
        <div className="flex flex-wrap gap-2">
          {status !== "PAID" && (
            <button disabled={busy} onClick={() => setStatusTo("PAID")} className="rounded-full bg-sage-500 px-3 py-1 text-xs font-medium text-cream-50 disabled:opacity-50">
              Mark paid
            </button>
          )}
          {status !== "PENDING" && (
            <button disabled={busy} onClick={() => setStatusTo("PENDING")} className="rounded-full border border-earth-300/60 px-3 py-1 text-xs text-earth-700 disabled:opacity-50">
              Pending
            </button>
          )}
          <button disabled={busy} onClick={remove} className="rounded-full border border-rose-dusty/60 px-2 py-1 text-xs text-rose-dusty disabled:opacity-50" aria-label="Delete">
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </td>
    </tr>
  );
}
