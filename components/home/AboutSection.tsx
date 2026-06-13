"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import SafeImage from "@/components/ui/SafeImage";
import { FOUNDER_IMAGE_ALT, FOUNDER_IMAGE_FALLBACK_TEXT, FOUNDER_IMAGE_SRC } from "@/lib/siteImages";
import { testimonials } from "@/lib/data";
import {
  ArrowRight,
  Sparkles,
  HeartPulse,
  Palette,
  Baby,
  Compass,
  Star,
  Quote,
} from "lucide-react";

// ── Update this with the founder's actual name ──
const FOUNDER_NAME = "Nitu Mastud";

const badges = [
  { icon: HeartPulse, label: "Healing", color: "bg-rose-soft/80" },
  { icon: Palette,    label: "Art",     color: "bg-sage-300/80" },
  { icon: Baby,       label: "Mother & Child", color: "bg-lavender-300/80" },
  { icon: Compass,    label: "Spiritual", color: "bg-rose-dusty/80" },
];

const cardTints = ["bg-rose-soft/55", "bg-sage-300/55", "bg-lavender-300/55", "bg-cream-200"];
const cardRotations = ["-rotate-1", "rotate-1", "-rotate-2", "rotate-2"];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={ref} id="about" className="container-page py-16 sm:py-24 lg:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ── Photo column ── */}
        <motion.div
          style={{ y: yImg }}
          className="relative mx-auto w-full max-w-md lg:max-w-lg"
        >
          {/* Soft watercolor blob behind the photo */}
          <div className="pointer-events-none absolute -inset-4 -z-10 rounded-[3rem] bg-rose-soft/40 blur-2xl" />

          <div className="relative aspect-square overflow-hidden rounded-[2rem] border-[6px] border-cream-50 bg-cream-100 shadow-journal sm:rounded-[2.5rem] sm:border-8">
            <SafeImage
              src={FOUNDER_IMAGE_SRC}
              alt={FOUNDER_IMAGE_ALT}
              fallbackText={FOUNDER_IMAGE_FALLBACK_TEXT}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Decorative floating sticker — bottom right */}
          <motion.div
            className="absolute -bottom-5 -right-3 grid h-20 w-20 place-items-center rounded-full bg-sage-300/90 text-earth-900 shadow-journal sm:-right-5 sm:h-24 sm:w-24"
            animate={{ rotate: [-6, 4, -6] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-center font-script text-sm leading-tight sm:text-base">
              heal<br />create<br />align
            </span>
          </motion.div>

          {/* Decorative tape — top left */}
          <span className="absolute -top-3 left-8 h-6 w-24 rotate-[-4deg] rounded-sm bg-rose-soft/80 shadow" />
        </motion.div>

        {/* ── Text column ── */}
        <div>
          <ScrollReveal direction="up">
            <div className="pill mb-5 border-sage-500/50 bg-cream-50/80">
              <Sparkles className="h-3.5 w-3.5 text-sage-500" />
              <span>Know the Founder</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="font-display text-[clamp(2.2rem,5.5vw,4rem)] leading-[1.05] text-earth-900">
              Hi, I'm{" "}
              <span className="heading-script text-sage-500">{FOUNDER_NAME}!</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="mt-5 body-soft text-base sm:text-lg">
              <span className="font-medium text-earth-900">
                Artist · Interior Designer · Expressive Art Therapist &amp; Healing Coach
              </span>
              <br />Personalised sessions to take you from <em>stuck</em> to <em>aligned</em>.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <div className="mt-6 flex flex-wrap gap-2.5 sm:gap-3">
              {badges.map((b, i) => (
                <motion.div
                  key={b.label}
                  initial={{ opacity: 0, scale: 0.7 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  whileHover={{ y: -3, rotate: 2 }}
                  className={`inline-flex items-center gap-2 rounded-full ${b.color} px-4 py-2 text-sm font-medium text-earth-900 shadow-soft`}
                >
                  <b.icon className="h-4 w-4" strokeWidth={1.7} />
                  {b.label}
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.4}>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn-primary group">
                Book Consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="/courses" className="btn-ghost">
                See all sessions
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.5}>
            <p className="mt-6 font-script text-2xl text-earth-700/80">
              ✨ Heal · Create · Transform · Align ✨
            </p>
          </ScrollReveal>
        </div>
      </div>

      {/* ── Reviews / Testimonials ── */}
      <div className="mt-20 sm:mt-24">
        <div className="mb-10 text-center sm:mb-12">
          <ScrollReveal>
            <div className="pill mx-auto mb-3">
              <Sparkles className="h-3.5 w-3.5" /> Loved by clients
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h3 className="heading-display text-3xl sm:text-4xl md:text-5xl">
              Hearts she has{" "}
              <span className="heading-script text-rose-dusty">held</span>
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="mt-3 flex items-center justify-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-rose-dusty text-rose-dusty" strokeWidth={1.5} />
              ))}
              <span className="ml-2 text-sm text-earth-700/80">5.0 from clients</span>
            </div>
          </ScrollReveal>
        </div>

        <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40, rotate: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, rotate: 0 }}
              className={`card-journal flex h-full flex-col ${cardTints[i % cardTints.length]} ${cardRotations[i % cardRotations.length]}`}
            >
              <Quote className="h-7 w-7 text-earth-700/40" strokeWidth={1.5} />
              <p className="mt-3 flex-1 font-display text-base italic leading-relaxed text-earth-900 sm:text-lg">
                "{t.quote}"
              </p>

              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <Star key={idx} className="h-3.5 w-3.5 fill-rose-dusty text-rose-dusty" strokeWidth={1.5} />
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3 border-t border-earth-300/40 pt-4">
                <div className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-full bg-cream-50 font-display text-base text-earth-900 shadow-soft">
                  {t.name.charAt(0)}
                </div>
                <div className="leading-tight">
                  <div className="font-display text-sm text-earth-900">{t.name}</div>
                  {t.role && (
                    <div className="text-[10px] uppercase tracking-[0.2em] text-earth-500">
                      {t.role}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
