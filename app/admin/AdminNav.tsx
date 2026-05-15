"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Brush, GraduationCap, Inbox, CalendarCheck, LogOut } from "lucide-react";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/portfolio", label: "Portfolio", icon: Brush },
  { href: "/admin/courses", label: "Courses", icon: GraduationCap },
  { href: "/admin/bookings", label: "Bookings", icon: CalendarCheck },
  { href: "/admin/messages", label: "Messages", icon: Inbox },
];

export default function AdminNav({ name }: { name: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/auth/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <header className="border-b border-earth-300/40 bg-cream-50/90 backdrop-blur">
      <div className="container-page flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-script text-2xl text-earth-900">Art for Soul</Link>
          <span className="rounded-full bg-rose-soft/70 px-2.5 py-0.5 text-[10px] uppercase tracking-[0.3em] text-earth-900">studio</span>
        </div>

        <nav className="-mx-1 flex flex-wrap items-center gap-1 overflow-x-auto">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm transition-all",
                pathname === l.href
                  ? "bg-earth-700 text-cream-50"
                  : "text-earth-700 hover:bg-cream-100"
              )}
            >
              <l.icon className="h-3.5 w-3.5" /> {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 text-sm">
          <span className="hidden text-earth-700/70 sm:inline">hi, {name.split(" ")[0]}</span>
          <button onClick={logout} className="btn-ghost text-xs">
            <LogOut className="h-3.5 w-3.5" /> Logout
          </button>
        </div>
      </div>
    </header>
  );
}
