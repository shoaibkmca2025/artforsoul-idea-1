"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Quote, Star } from "lucide-react";

type T = { id: string; name: string; role?: string | null; quote: string; rating: number };

export default function Testimonials({ items }: { items: T[] }) {
  return (
    <section id="testimonials" className="container-page scroll-mt-24 py-20 sm:py-24">
      <div className="mb-10 text-center sm:mb-12">
        <ScrollReveal>
          <div className="pill mx-auto mb-4">Loved by clients</div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
            Transformation <span className="heading-script text-rose-dusty">Stories</span>
          </h2>
        </ScrollReveal>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {items.map((t, i) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 60, rotate: i % 2 === 0 ? -2 : 2 }}
            whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1 : 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ rotate: 0, y: -6 }}
            className="card-journal flex flex-col"
          >
            <Quote className="h-8 w-8 text-rose-dusty" strokeWidth={1.4} />
            <p className="mt-3 font-display text-lg italic leading-relaxed text-earth-900">
              "{t.quote}"
            </p>
            <div className="mt-5 flex items-center gap-2 text-rose-dusty">
              {Array.from({ length: t.rating }).map((_, k) => (
                <Star key={k} className="h-3.5 w-3.5 fill-current" strokeWidth={1} />
              ))}
            </div>
            <div className="mt-3 border-t border-earth-300/40 pt-3">
              <div className="font-script text-xl text-earth-900">{t.name}</div>
              {t.role ? (
                <div className="text-xs uppercase tracking-[0.25em] text-earth-500">
                  {t.role}
                </div>
              ) : null}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
