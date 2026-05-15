export default function BookingsPage() {
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
            <tr><td colSpan={6} className="p-8 text-center text-earth-700/70">No bookings yet — prototype mode.</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
