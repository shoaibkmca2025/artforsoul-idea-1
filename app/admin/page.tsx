import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { Brush, GraduationCap, Inbox, CalendarCheck, Sparkles, Users } from "lucide-react";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const session = await getSession();
  if (!session.userId) redirect("/admin/login");

  const [portfolioCount, courseCount, bookingCount, messageCount, enrollmentCount, recentBookings, recentMessages] = await Promise.all([
    prisma.portfolioItem.count(),
    prisma.course.count(),
    prisma.booking.count(),
    prisma.contactMessage.count(),
    prisma.enrollment.count(),
    prisma.booking.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const stats = [
    { icon: Brush, label: "Portfolio items", value: portfolioCount, href: "/admin/portfolio" },
    { icon: GraduationCap, label: "Courses", value: courseCount, href: "/admin/courses" },
    { icon: CalendarCheck, label: "Bookings", value: bookingCount, href: "/admin/bookings" },
    { icon: Inbox, label: "Messages", value: messageCount, href: "/admin/messages" },
    { icon: Users, label: "Enrollments", value: enrollmentCount, href: "/admin/courses" },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="pill mb-3"><Sparkles className="h-3.5 w-3.5" /> Studio</div>
        <h1 className="heading-display text-4xl">Welcome back, gentle soul.</h1>
        <p className="mt-1 body-soft">Tend to your studio with care. Here's what's new.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card-journal transition-transform hover:-translate-y-1">
            <div className="grid h-10 w-10 place-items-center rounded-2xl bg-rose-soft/70">
              <s.icon className="h-5 w-5" />
            </div>
            <div className="mt-3 font-display text-3xl text-earth-900">{s.value}</div>
            <div className="text-xs uppercase tracking-[0.25em] text-earth-500">{s.label}</div>
          </Link>
        ))}
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <div className="card-journal">
          <h3 className="font-display text-xl">Recent bookings</h3>
          {recentBookings.length === 0 && <p className="mt-2 body-soft text-sm">Nothing yet.</p>}
          <ul className="mt-3 divide-y divide-earth-300/40">
            {recentBookings.map((b) => (
              <li key={b.id} className="py-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-earth-900">{b.name}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-earth-500">{b.status}</span>
                </div>
                <div className="text-earth-700/80">{b.service} {b.date ? `· ${b.date}` : ""}</div>
                <div className="text-xs text-earth-700/70">{b.email} · {b.phone}</div>
              </li>
            ))}
          </ul>
        </div>

        <div className="card-journal">
          <h3 className="font-display text-xl">Recent messages</h3>
          {recentMessages.length === 0 && <p className="mt-2 body-soft text-sm">Nothing yet.</p>}
          <ul className="mt-3 divide-y divide-earth-300/40">
            {recentMessages.map((m) => (
              <li key={m.id} className="py-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-earth-900">{m.name}</span>
                  <span className="text-xs text-earth-500">{new Date(m.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="text-earth-700/80">{m.subject || "(no subject)"}</div>
                <p className="mt-1 line-clamp-2 text-earth-700/70">{m.message}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
