"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HeartPulse, HandHeart, Brush } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/modalities", label: "Healing Modalities", icon: HeartPulse },
  { href: "/courses", label: "Healing Sessions", icon: HandHeart },
  { href: "/portfolio", label: "Art Studioz", icon: Brush },
];

export default function ServiceTabs() {
  const pathname = usePathname();

  return (
    <div className="container-page -mt-2 mb-10 sm:mb-12">
      <div className="mx-auto flex w-fit max-w-full flex-wrap items-center justify-center gap-2 rounded-full border border-earth-300/40 bg-cream-50/70 p-1.5 shadow-soft backdrop-blur sm:gap-3">
        {tabs.map((t) => {
          const active = pathname === t.href || pathname.startsWith(t.href + "/");
          return (
            <Link
              key={t.href}
              href={t.href}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-medium transition-all sm:px-5",
                active
                  ? "bg-plum-700 text-cream-50 shadow-soft"
                  : "text-earth-700 hover:bg-cream-100"
              )}
            >
              <t.icon className="h-4 w-4" strokeWidth={1.7} />
              {t.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
