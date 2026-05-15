"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import TextReveal from "@/components/animations/TextReveal";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yArt = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.7, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden pt-28 sm:pt-32 lg:min-h-[100svh]">
      <div className="container-page relative grid items-center gap-10 pb-10 sm:pb-16 lg:grid-cols-2 lg:gap-6">
        <motion.div style={{ y: yText, opacity }} className="relative z-10 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="pill mx-auto mb-5 lg:mx-0 lg:mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" /> A creative healing studio
          </motion.div>

          <TextReveal
            text="Let Your Art Speak"
            as="h1"
            className="heading-display text-[clamp(2.2rem,8vw,5.5rem)]"
          />
          <TextReveal
            text="& Your Soul Heal"
            as="h1"
            delay={0.25}
            className="heading-script -mt-1 text-[clamp(2.6rem,9.5vw,6.5rem)] sm:-mt-2"
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mx-auto mt-5 max-w-xl text-base sm:mt-6 sm:text-lg body-soft lg:mx-0"
          >
            Step into a soulful art journal of watercolor mornings, mindful brush
            strokes and rooms that hold you. Art therapy, healing workshops, soft
            interiors and online courses — gathered in one tender place.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8 lg:justify-start"
          >
            <Link href="/contact" className="btn-primary group">
              Book a Session
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href="/courses" className="btn-ghost">
              Explore Courses
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6, duration: 1 }}
            className="mx-auto mt-10 flex items-center justify-center gap-5 text-sm text-earth-700/80 sm:gap-6 sm:mt-12 lg:mx-0 lg:justify-start"
          >
            <div>
              <div className="font-display text-xl sm:text-2xl text-earth-900">500+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] sm:text-xs">Souls Healed</div>
            </div>
            <div className="h-8 w-px bg-earth-300/60" />
            <div>
              <div className="font-display text-xl sm:text-2xl text-earth-900">40+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] sm:text-xs">Workshops</div>
            </div>
            <div className="h-8 w-px bg-earth-300/60" />
            <div>
              <div className="font-display text-xl sm:text-2xl text-earth-900">60+</div>
              <div className="text-[10px] uppercase tracking-[0.2em] sm:text-xs">Interiors</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Visual — scaled per screen */}
        <motion.div
          style={{ y: yArt }}
          className="relative mx-auto h-[22rem] w-full max-w-[26rem] sm:h-[28rem] sm:max-w-[32rem] lg:h-[36rem] lg:max-w-none"
        >
          <motion.div
            className="absolute left-[6%] top-2 h-48 w-36 rotate-[-6deg] overflow-hidden rounded-2xl border-[6px] border-cream-50 shadow-journal sm:h-60 sm:w-44 sm:border-8 lg:left-[10%] lg:top-4 lg:h-72 lg:w-56"
            initial={{ opacity: 0, y: 40, rotate: -12 }}
            animate={{ opacity: 1, y: 0, rotate: -6 }}
            transition={{ delay: 0.4, duration: 1 }}
            whileHover={{ rotate: -2, y: -8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=80"
              alt="Watercolor"
              className="h-full w-full object-cover"
            />
            <span className="tape" />
          </motion.div>

          <motion.div
            className="absolute right-[4%] top-12 h-56 w-40 rotate-[5deg] overflow-hidden rounded-2xl border-[6px] border-cream-50 shadow-journal sm:h-64 sm:w-48 sm:border-8 lg:right-2 lg:top-20 lg:h-80 lg:w-60"
            initial={{ opacity: 0, y: 40, rotate: 12 }}
            animate={{ opacity: 1, y: 0, rotate: 5 }}
            transition={{ delay: 0.6, duration: 1 }}
            whileHover={{ rotate: 1, y: -8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=900&q=80"
              alt="Brushes"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute bottom-2 left-[12%] h-44 w-52 rotate-[-3deg] overflow-hidden rounded-2xl border-[6px] border-cream-50 shadow-journal sm:h-52 sm:w-60 sm:border-8 lg:bottom-4 lg:left-[16%] lg:h-64 lg:w-72"
            initial={{ opacity: 0, y: 40, rotate: -10 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ delay: 0.8, duration: 1 }}
            whileHover={{ rotate: 0, y: -8 }}
          >
            <img
              src="https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=900&q=80"
              alt="Journal"
              className="h-full w-full object-cover"
            />
            <span className="tape bg-sage-300/70" />
          </motion.div>

          {/* Floating sticker */}
          <motion.div
            className="absolute bottom-8 right-2 grid h-16 w-16 place-items-center rounded-full bg-rose-soft text-center font-script text-earth-900 shadow-journal sm:h-20 sm:w-20 lg:bottom-16 lg:h-24 lg:w-24"
            animate={{ rotate: [0, 12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="px-2 text-[10px] leading-tight sm:text-xs lg:text-sm">create<br/>feel<br/>heal</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue (desktop only — saves mobile vertical space) */}
      <motion.div
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-earth-700/70 lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          ↓ scroll &nbsp; gently
        </motion.div>
      </motion.div>
    </section>
  );
}
