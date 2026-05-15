import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const session = await getSession();
  if (!session.userId) redirect("/admin/login");
  const bookings = await prisma.booking.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="heading-display text-3xl">Bookings</h1>
      <p className="body-soft text-sm">All booking requests, newest first.</p>

      <div className="mt-6 overflow-x-auto rounded-3xl border border-earth-300/40 bg-cream-50/85">
        <table className="w-full min-w-[720px] text-sm">
          <thead className="bg-cream-100 text-left text-xs uppercase tracking-[0.2em] text-earth-500">
            <tr>
              <th className="p-4">When</th>
              <th className="p-4">Name</th>
              <th className="p-4">Service</th>
              <th className="p-4">Date</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Message</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-earth-300/40">
            {bookings.map((b) => (
              <tr key={b.id} className="align-top">
                <td className="p-4 text-xs text-earth-700/70">{new Date(b.createdAt).toLocaleString()}</td>
                <td className="p-4 font-medium text-earth-900">{b.name}</td>
                <td className="p-4">{b.service}</td>
                <td className="p-4">{b.date || "—"}</td>
                <td className="p-4 text-earth-700">{b.email}<br /><span className="text-xs text-earth-700/70">{b.phone}</span></td>
                <td className="p-4 max-w-sm text-earth-700/80">{b.message || "—"}</td>
              </tr>
            ))}
            {bookings.length === 0 && (
              <tr><td colSpan={6} className="p-8 text-center text-earth-700/70">No bookings yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
