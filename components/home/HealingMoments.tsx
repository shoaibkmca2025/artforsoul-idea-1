"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Sparkles } from "lucide-react";
import { healingMoments } from "@/lib/data";

export default function HealingMoments() {
  return (
    <section id="healing-moments" className="container-page scroll-mt-24 py-20 sm:py-24">
      <div className="mb-10 text-center sm:mb-12">
        <ScrollReveal>
          <div className="pill mx-auto mb-4">
            <Sparkles className="h-3.5 w-3.5" /> A little gallery
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
            Healing <span className="heading-script text-rose-dusty">Moments</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="mx-auto mt-3 max-w-xl body-soft">
            Soft glimpses of art, colour and calm from the studio.
          </p>
        </ScrollReveal>
      </div>

      {/* Masonry-style columns */}
      <div className="columns-2 gap-3 sm:gap-4 lg:columns-4">
        {healingMoments.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02 }}
            className={`group mb-3 break-inside-avoid overflow-hidden rounded-2xl border-[5px] border-cream-50 shadow-journal sm:mb-4 ${
              i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/5]"
            }`}
          >
            <img
              src={src}
              alt="Healing moment"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
