"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Link from "next/link";
import SafeImage from "@/components/ui/SafeImage";

type GalleryItem = { id: string; image: string; caption?: string | null };

export default function GalleryStrip({ items }: { items: GalleryItem[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["-25%", "0%"]);

  const row1 = items.slice(0, Math.ceil(items.length / 2));
  const row2 = items.slice(Math.ceil(items.length / 2));

  return (
    <section ref={ref} className="overflow-hidden py-24">
      <div className="container-page mb-10 text-center">
        <ScrollReveal>
          <div className="pill mx-auto mb-4">Healing art wall</div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="heading-display text-4xl md:text-5xl">
            A wall of <span className="heading-script">tender</span> moments.
          </h2>
        </ScrollReveal>
      </div>

      <div className="space-y-6">
        <motion.div style={{ x: xLeft }} className="flex gap-4">
          {[...row1, ...row1].map((g, i) => (
            <div
              key={`${g.id}-${i}`}
              className="relative h-56 w-72 shrink-0 overflow-hidden rounded-2xl border-4 border-cream-50 shadow-soft"
            >
              <SafeImage src={g.image} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </motion.div>
        <motion.div style={{ x: xRight }} className="flex gap-4">
          {[...row2, ...row2].map((g, i) => (
            <div
              key={`${g.id}-${i}`}
              className="relative h-56 w-72 shrink-0 overflow-hidden rounded-2xl border-4 border-cream-50 shadow-soft"
            >
              <SafeImage src={g.image} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container-page mt-10 text-center">
        <Link href="/gallery" className="btn-ghost">Open full gallery</Link>
      </div>
    </section>
  );
}
