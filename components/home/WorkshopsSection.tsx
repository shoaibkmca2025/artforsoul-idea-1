"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Sparkles, MapPin, CalendarDays, ArrowRight } from "lucide-react";
import { workshopEvents } from "@/lib/data";

export default function WorkshopsSection() {
  return (
    <section id="workshops" className="relative overflow-hidden py-20 sm:py-24">
      {/* soft watercolor washes */}
      <div className="pointer-events-none absolute -left-20 top-12 h-72 w-72 rounded-full bg-rose-soft/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-12 h-72 w-72 rounded-full bg-sage-300/30 blur-3xl" />

      <div className="container-page relative">
        <div className="mb-10 text-center sm:mb-14">
          <ScrollReveal>
            <div className="pill mx-auto mb-4 border-gold-300/60">
              <Sparkles className="h-3.5 w-3.5 text-gold-700" /> Moments together
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
              Workshops &amp; <span className="heading-script text-plum-500">Events</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="gold-rule mt-5" />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl body-soft">
              A glimpse into our past circles, offline gatherings and creative
              healing workshops — moments of connection, art and transformation.
            </p>
          </ScrollReveal>
        </div>

        {/* Photo collage */}
        <div className="grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[230px] sm:gap-4 lg:grid-cols-4">
          {workshopEvents.slice(0, 4).map((ev, i) => {
            // a couple of tiles span larger for a collage feel
            const big = i === 0 || i === 3;
            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, scale: 0.94, y: 30 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className={`group relative overflow-hidden rounded-2xl border-[5px] border-cream-50 shadow-journal sm:rounded-3xl ${
                  big ? "row-span-2" : ""
                }`}
              >
                <img
                  src={ev.image}
                  alt={ev.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-900/75 via-plum-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-cream-50 sm:p-4">
                  <h3 className="font-display text-base leading-tight sm:text-lg">{ev.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-cream-100/85">
                    {ev.location && (
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {ev.location}
                      </span>
                    )}
                    {ev.date && (
                      <span className="inline-flex items-center gap-1">
                        <CalendarDays className="h-3 w-3" /> {ev.date}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <ScrollReveal delay={0.2}>
          <div className="mt-10 text-center">
            <Link href="/workshops" className="btn-primary">
              See all workshops &amp; events <ArrowRight className="h-4 w-4" />
            </Link>
            <p className="mt-2 text-xs text-earth-500">
              Sign in to view all gatherings &amp; register for upcoming workshops.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
