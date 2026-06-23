import { prisma, isDbConfigured } from "@/lib/prisma";
import BookingRow from "./BookingRow";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const bookings = isDbConfigured()
    ? await prisma.purchase.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: { select: { phone: true } } },
      })
    : [];

  const paid = bookings.filter((b) => b.status === "PAID").length;
  const pending = bookings.filter((b) => b.status === "PENDING").length;
  const revenue = bookings.filter((b) => b.status === "PAID").reduce((s, b) => s + b.amount, 0);

  return (
    <div>
      <h1 className="heading-display text-3xl">Bookings</h1>
      <p className="body-soft text-sm">Every session booked by your clients, newest first.</p>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Total" value={String(bookings.length)} />
        <Stat label="Paid" value={String(paid)} />
        <Stat label="Pending" value={String(pending)} />
        <Stat label="Revenue" value={`₹${revenue.toLocaleString("en-IN")}`} />
      </div>

      {!isDbConfigured() && (
        <p className="mt-6 rounded-2xl border border-gold-300/60 bg-gold-100/60 p-4 text-sm text-earth-800">
          Database not connected yet. Add your Supabase <code>DATABASE_URL</code> password and run
          <code> npx prisma migrate dev</code> to start receiving bookings.
        </p>
      )}

      <div className="mt-6 overflow-x-auto rounded-3xl border border-earth-300/40 bg-cream-50/85">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-cream-100 text-left text-xs uppercase tracking-[0.2em] text-earth-500">
            <tr>
              <th className="p-4">When</th>
              <th className="p-4">Client</th>
              <th className="p-4">Session</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-earth-300/40">
            {bookings.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-earth-700/70">
                  No bookings yet.
                </td>
              </tr>
            ) : (
              bookings.map((b) => (
                <BookingRow
                  key={b.id}
                  b={{
                    id: b.id,
                    name: b.name,
                    email: b.email,
                    phone: b.user?.phone ?? null,
                    sessionTitle: b.sessionTitle,
                    amount: b.amount,
                    status: b.status,
                    createdAt: b.createdAt.toISOString(),
                  }}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-earth-300/40 bg-cream-50/85 p-4">
      <div className="font-display text-2xl text-earth-900">{value}</div>
      <div className="text-[11px] uppercase tracking-[0.2em] text-earth-500">{label}</div>
    </div>
  );
}
