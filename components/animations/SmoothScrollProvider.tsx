"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scrolling — DESKTOP ONLY.
 *
 * On touch devices (phones/tablets) we deliberately use the browser's native
 * scrolling. Smooth-scroll libraries like Lenis hijack touch/scroll and are
 * known to lag or even freeze scrolling on some Android browsers (notably
 * Samsung Internet). Native scroll is smoother and rock-solid there.
 *
 * In-page anchor links (#faq, #testimonials, …) still scroll smoothly on
 * mobile via the browser's own scrollInto, and land below the fixed header
 * thanks to the global `scroll-margin-top`.
 */
export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const anchorTarget = (e: Event) => {
      const link = (e.target as HTMLElement | null)?.closest('a[href^="#"]') as HTMLAnchorElement | null;
      const id = link?.getAttribute("href")?.slice(1);
      if (!id) return null;
      return document.getElementById(id);
    };

    // ── Touch / reduced-motion → native scroll only ──
    if (coarse || reduce) {
      const handler = (e: Event) => {
        const el = anchorTarget(e);
        if (!el) return;
        e.preventDefault();
        el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      };
      document.addEventListener("click", handler);
      return () => document.removeEventListener("click", handler);
    }

    // ── Desktop → Lenis smooth scroll ──
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.15,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const id = requestAnimationFrame(raf);

    const handler = (e: Event) => {
      const el = anchorTarget(e);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el, { offset: -80, duration: 0.9 });
    };
    document.addEventListener("click", handler);

    return () => {
      cancelAnimationFrame(id);
      document.removeEventListener("click", handler);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
