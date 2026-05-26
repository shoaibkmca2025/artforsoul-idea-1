"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { ArrowUpRight } from "lucide-react";

type Item = {
  id: string;
  title: string;
  slug: string;
  category: string;
  location?: string | null;
  coverImage: string;
};

export default function PortfolioPreview({ items }: { items: Item[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xDesktop = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const prefersReduced = useReducedMotion();

  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const x = isDesktop && !prefersReduced ? xDesktop : 0;

  return (
    <section ref={ref} className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <div className="container-page">
        <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:mb-12 md:flex-row md:items-end">
          <div>
            <ScrollReveal>
              <div className="pill mb-4">NM Art Studio</div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
                Art images &amp; wall art, <span className="heading-script">in mix media</span>.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-4 max-w-xl body-soft">
                Mix-media art images and large wall art — customised canvases,
                Mandala &amp; Dot Mandala art, Vastu-based paintings and energy
                artworks for positive vibrations.
              </p>
            </ScrollReveal>
          </div>
          <ScrollReveal delay={0.3}>
            <Link href="/portfolio" className="btn-ghost">
              Visit NM Art Studio <ArrowUpRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </div>

      <motion.div style={{ x }} className="container-page grid gap-5 sm:gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.slice(0, 3).map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="group relative"
          >
            <Link href="/portfolio" className="block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-earth-300/40 bg-cream-100 shadow-soft">
                <motion.img
                  src={item.coverImage}
                  alt={item.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-earth-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-cream-50 sm:bottom-5 sm:left-5 sm:right-5">
                  <div className="text-[10px] uppercase tracking-[0.3em] opacity-80 sm:text-xs">
                    {item.category}{item.location ? ` · ${item.location}` : ""}
                  </div>
                  <div className="font-display text-xl sm:text-2xl">{item.title}</div>
                </div>
                <div className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-cream-50/85 text-earth-900 backdrop-blur transition-opacity sm:opacity-0 group-hover:opacity-100">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
