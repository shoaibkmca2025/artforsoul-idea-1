"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Sparkles, BookOpen, CalendarHeart, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * App-style bottom tab bar (mobile/tablet only — hidden on lg+).
 *
 * Pure navigation/layout: every tab points at an existing route, so no
 * functionality changes. The top header & drawer stay for the full menu;
 * this gives the site a native-app feel on phones.
 */
const TABS = [
  { href: "/", label: "Home", icon: Home },
  { href: "/courses", label: "Sessions", icon: Sparkles },
  { href: "/blog", label: "Wisdom", icon: BookOpen },
  { href: "/dashboard", label: "Account", icon: CalendarHeart },
  { href: "/contact", label: "Connect", icon: MessageCircle },
];

export default function MobileTabBar() {
  const pathname = usePathname();

  // Admin has its own chrome — no app tab bar there.
  if (pathname?.startsWith("/admin")) return null;

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : Boolean(pathname?.startsWith(href));

  return (
    <>
      {/* Spacer so page content / footer never hides behind the fixed bar */}
      <div aria-hidden className="h-[4.75rem] lg:hidden" />

      <nav className="fixed inset-x-0 bottom-0 z-50 lg:hidden" aria-label="Primary">
        <div className="mx-auto flex max-w-md items-stretch justify-around gap-1 border-t border-earth-300/40 bg-cream-50/90 px-2 pb-[max(0.35rem,env(safe-area-inset-bottom))] pt-1.5 shadow-[0_-10px_30px_-12px_rgba(60,40,30,0.28)] backdrop-blur-xl">
          {TABS.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "group flex flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-1 text-[10px] font-semibold tracking-wide transition-colors",
                  active ? "text-plum-700" : "text-earth-500"
                )}
              >
                <span
                  className={cn(
                    "grid h-9 w-9 place-items-center rounded-2xl transition-all duration-300",
                    active
                      ? "bg-rose-soft/70 text-plum-700 shadow-soft scale-105"
                      : "text-earth-500 group-active:bg-cream-100"
                  )}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={active ? 2.3 : 1.8} />
                </span>
                {label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
