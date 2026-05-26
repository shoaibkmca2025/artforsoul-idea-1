"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart } from "lucide-react";
import ScrollProgress from "@/components/animations/ScrollProgress";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/portfolio", label: "Art of Healing" },
  { href: "/courses", label: "Sessions" },
  { href: "/contact", label: "Contact" },
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
            <span className="relative grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-rose-dusty via-cream-200 to-sage-300 shadow-soft sm:h-10 sm:w-10">
              <Heart className="h-4 w-4 text-earth-900 sm:h-5 sm:w-5" strokeWidth={1.5} />
            </span>
            <div className="leading-tight">
              <div className="font-script text-xl text-earth-900 sm:text-2xl">Art for Soul</div>
              <div className="-mt-1 hidden text-[10px] uppercase tracking-[0.35em] text-earth-500 sm:block">
                Create · Feel · Heal
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-full px-4 py-2 text-sm transition-all",
                  pathname === item.href
                    ? "text-earth-900"
                    : "text-earth-700/80 hover:text-earth-900"
                )}
              >
                {pathname === item.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 -z-10 rounded-full bg-rose-soft/70"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/contact" className="btn-primary text-sm">
              Book a Session
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            className="grid h-11 w-11 place-items-center rounded-full border border-earth-300/50 bg-cream-50/80 lg:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
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
              <Link href="/contact" className="btn-primary mt-3 w-full">
                Book a Session
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
