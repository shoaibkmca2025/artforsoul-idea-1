import { Brush, GraduationCap, Inbox, CalendarCheck, Sparkles, Users } from "lucide-react";
import Link from "next/link";
import { portfolioItems, courses } from "@/lib/data";

export default function AdminDashboard() {
  const stats = [
    { icon: Brush, label: "Portfolio items", value: portfolioItems.length, href: "/admin/portfolio" },
    { icon: GraduationCap, label: "Courses", value: courses.length, href: "/admin/courses" },
    { icon: CalendarCheck, label: "Bookings", value: 0, href: "/admin/bookings" },
    { icon: Inbox, label: "Messages", value: 0, href: "/admin/messages" },
    { icon: Users, label: "Enrollments", value: 0, href: "/admin/courses" },
  ];

  return (
    <div>
      <div className="mb-8">
        <div className="pill mb-3"><Sparkles className="h-3.5 w-3.5" /> Studio</div>
        <h1 className="heading-display text-4xl">Welcome back, gentle soul.</h1>
        <p className="mt-1 body-soft">Tend to your studio with care. Here&apos;s what&apos;s new.</p>
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
          <p className="mt-2 body-soft text-sm">Nothing yet — this is prototype mode.</p>
        </div>

        <div className="card-journal">
          <h3 className="font-display text-xl">Recent messages</h3>
          <p className="mt-2 body-soft text-sm">Nothing yet — this is prototype mode.</p>
        </div>
      </div>
    </div>
  );
}
