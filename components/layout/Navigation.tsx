"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ScrollProgress from "@/components/animations/ScrollProgress";
import LotusLogo from "@/components/ui/LotusLogo";
import AccountNav from "@/components/layout/AccountNav";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "My Journey" },
  { href: "/courses", label: "Services" },
  { href: "/#testimonials", label: "Transformation Stories" },
  { href: "/#faq", label: "Questions from the Heart" },
  { href: "/blog", label: "Wisdom & Inspiration" },
  { href: "/#healing-moments", label: "Healing Moments" },
  { href: "/contact", label: "Let's Connect" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Hide nav inside admin – admin gets its own header
  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
      <ScrollProgress />
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled ? "py-2" : "py-4"
        )}
      >
        <div
          className={cn(
            "mx-auto flex w-[calc(100%-1.25rem)] max-w-7xl items-center justify-between rounded-full border border-earth-300/40 px-3 py-2 transition-all duration-500 sm:w-[calc(100%-2rem)] sm:px-4",
            scrolled
              ? "bg-cream-50/85 shadow-soft backdrop-blur-xl"
              : "bg-cream-50/60 backdrop-blur"
          )}
        >
          <Link href="/" className="group flex items-center gap-2">
            <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-rose-soft via-cream-100 to-lavender-100 shadow-soft ring-1 ring-gold-300/60 transition-transform group-hover:scale-105 sm:h-11 sm:w-11">
              <LotusLogo className="h-6 w-6 sm:h-7 sm:w-7" />
            </span>
            <div className="leading-tight">
              <div className="font-script text-xl text-plum-700 sm:text-2xl">Art For Soul</div>
              <div className="-mt-1 hidden text-[10px] uppercase tracking-[0.35em] text-gold-700 sm:block">
                Heal · Create · Transform
              </div>
            </div>
          </Link>

          {/* Long, poetic labels live in an elegant drawer at every screen
              size — they don't fit a horizontal bar. */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <AccountNav />
            </div>
            <button
              aria-label="Toggle menu"
              className="inline-flex items-center gap-2 rounded-full border border-earth-300/50 bg-cream-50/80 px-3 py-2.5 text-sm text-earth-800 transition hover:bg-cream-100"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="hidden uppercase tracking-[0.2em] sm:inline">Menu</span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-earth-900/30 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              className="absolute right-3 top-20 w-[88vw] max-w-sm rounded-3xl border border-earth-300/40 bg-cream-50/95 p-5 shadow-journal backdrop-blur"
              initial={{ y: -16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
            >
              <ul className="flex flex-col gap-1">
                {NAV.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-2xl px-4 py-3 text-base transition-all",
                        pathname === item.href
                          ? "bg-rose-soft/70 text-earth-900"
                          : "text-earth-700 hover:bg-cream-100"
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-3 flex flex-col gap-2">
                <AccountNav compact />
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
