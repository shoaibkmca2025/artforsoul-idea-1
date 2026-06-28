"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import TextReveal from "@/components/animations/TextReveal";
import BookCtaButton from "@/components/BookCtaButton";

// ── Hero video (committed in /public/media so it deploys to Vercel) ──
// If the file is ever missing, the card falls back to the founder photo.
const HERO_VIDEO_SRC = "/media/hero-video.mp4";
const HERO_VIDEO_POSTER = "/media/hero-poster.jpg";

const STATS = [
  { n: "20+", l: "Modalities" },
  { n: "1:1", l: "Personalised" },
  { n: "100%", l: "Online" },
];

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [videoOk, setVideoOk] = useState(true);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yArt = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yText = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 0.7, 0]);

  return (
    <section ref={ref} className="relative overflow-hidden">
      {/* ===================== MOBILE — app-style hero ===================== */}
      <div className="px-4 pb-2 pt-24 lg:hidden">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="pill mx-auto mb-4 flex w-fit"
        >
          <Sparkles className="h-3.5 w-3.5" /> Healing · Art · Energy
        </motion.div>

        <div className="text-center">
          <TextReveal text="Heal · Create" as="h1" className="heading-display text-[clamp(2.3rem,11vw,3.4rem)]" />
          <TextReveal
            text="Transform · Align"
            as="h1"
            delay={0.2}
            className="heading-script text-gradient-warm -mt-1 text-[clamp(2.7rem,13vw,4rem)]"
          />
        </div>

        {/* Full-width media feature card — the app's hero visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="relative mt-5 h-[19rem] w-full rounded-[1.75rem] border-4 border-cream-50 shadow-journal"
        >
          {/* Static clip layer — keeps the <video> inside the rounded frame on
              iOS Safari (which ignores overflow-hidden on transformed parents) */}
          <div className="absolute inset-0 overflow-hidden rounded-[1.45rem] [transform:translateZ(0)]">
            {videoOk ? (
              <video
                src={HERO_VIDEO_SRC}
                poster={HERO_VIDEO_POSTER}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Art & healing session in motion"
                className="absolute inset-0 h-full w-full object-cover object-center"
                onError={() => setVideoOk(false)}
              />
            ) : (
              <img
                src={HERO_VIDEO_POSTER}
                alt="Founder — Art For Soul"
                className="absolute inset-0 h-full w-full object-cover object-center"
              />
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-earth-900/65 via-earth-900/10 to-transparent" />
            <p className="absolute inset-x-0 bottom-0 p-4 text-sm font-medium text-cream-50/95">
              Personalised healing, art therapy &amp; energy alignment — held in one tender space.
            </p>
          </div>

          {/* Sticker sits on the frame, above the clip layer */}
          <div className="absolute right-3 top-3 z-10 grid h-14 w-14 place-items-center rounded-full bg-rose-soft/95 shadow-journal">
            <span className="px-1 text-center font-script text-[9px] leading-tight text-earth-900">
              heal<br />create<br />align
            </span>
          </div>
        </motion.div>

        {/* Full-width app CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-5 grid gap-2.5"
        >
          <BookCtaButton className="btn-primary group w-full text-base">
            Book a Session
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </BookCtaButton>
          <Link href="/contact" className="btn-ghost w-full">
            Enquire First
          </Link>
        </motion.div>

        {/* Stat chips */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-5 grid grid-cols-3 gap-2"
        >
          {STATS.map((s) => (
            <div
              key={s.l}
              className="rounded-2xl border border-earth-300/40 bg-cream-50/70 px-1 py-3 text-center shadow-soft"
            >
              <div className="font-display text-xl text-earth-900">{s.n}</div>
              <div className="mt-0.5 text-[9px] uppercase tracking-[0.12em] text-earth-600">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* ===================== DESKTOP — unchanged ===================== */}
      <div className="hidden pt-32 lg:block lg:min-h-[100svh]">
        <div className="container-page relative grid items-center gap-6 pb-16 lg:grid-cols-2">
          <motion.div style={{ y: yText, opacity }} className="relative z-10 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="pill mx-auto mb-5 lg:mx-0 lg:mb-6"
            >
              <Sparkles className="h-3.5 w-3.5" /> Healing · Art · Energy Alignment
            </motion.div>

            <TextReveal
              text="Heal · Create"
              as="h1"
              className="heading-display text-[clamp(2.2rem,8vw,5.5rem)]"
            />
            <TextReveal
              text="Transform · Align"
              as="h1"
              delay={0.25}
              className="heading-script text-gradient-warm -mt-1 text-[clamp(2.6rem,9.5vw,6.5rem)] sm:-mt-2"
            />

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="mx-auto mt-5 max-w-xl text-base sm:mt-6 sm:text-lg body-soft lg:mx-0"
            >
              Personalised one-to-one &amp; group sessions for emotional healing, inner
              transformation, creativity, wellness and positive energy alignment.
              Pranic, Sound &amp; Chakra healing · Art therapy · Garbha Sanskar ·
              Vastu &amp; more — gathered in one tender space.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:mt-8 lg:justify-start"
            >
              <BookCtaButton className="btn-primary group">
                Book a Session
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </BookCtaButton>
              <Link href="/contact" className="btn-ghost">
                Enquire First
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 1 }}
              className="mx-auto mt-10 flex items-center justify-center gap-5 text-sm text-earth-700/80 sm:gap-6 sm:mt-12 lg:mx-0 lg:justify-start"
            >
              <div>
                <div className="font-display text-xl sm:text-2xl text-earth-900">20+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] sm:text-xs">Healing Modalities</div>
              </div>
              <div className="h-8 w-px bg-earth-300/60" />
              <div>
                <div className="font-display text-xl sm:text-2xl text-earth-900">1:1</div>
                <div className="text-[10px] uppercase tracking-[0.2em] sm:text-xs">Personalised</div>
              </div>
              <div className="h-8 w-px bg-earth-300/60" />
              <div>
                <div className="font-display text-xl sm:text-2xl text-earth-900">100%</div>
                <div className="text-[10px] uppercase tracking-[0.2em] sm:text-xs">Online Sessions</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual — founder portrait card + accents */}
          <motion.div
            style={{ y: yArt }}
            className="relative mx-auto h-[36rem] w-full max-w-none"
          >
            <motion.div
              className="group absolute left-1/2 top-2 h-[28rem] w-[22rem] -translate-x-1/2 rotate-[-2deg] overflow-hidden rounded-3xl border-8 border-cream-50 shadow-journal"
              initial={{ opacity: 0, y: 40, rotate: -6 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ delay: 0.4, duration: 1 }}
              whileHover={{ rotate: 0, y: -8 }}
            >
              {videoOk ? (
                <video
                  src={HERO_VIDEO_SRC}
                  poster={HERO_VIDEO_POSTER}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label="Art & healing session in motion"
                  className="h-full w-full object-cover"
                  onError={() => setVideoOk(false)}
                />
              ) : (
                <motion.img
                  src={HERO_VIDEO_POSTER}
                  alt="Founder — Art For Soul"
                  className="h-full w-full object-cover"
                  animate={{ scale: [1, 1.08, 1], x: [0, -8, 0], y: [0, -10, 0] }}
                  transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-earth-900/25 via-transparent to-transparent" />
              <motion.div
                className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-rose-soft/50 blur-2xl"
                animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="pointer-events-none absolute -bottom-12 -right-10 h-44 w-44 rounded-full bg-lavender-300/45 blur-2xl"
                animate={{ x: [0, -25, 0], y: [0, -18, 0] }}
                transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="tape" />
            </motion.div>

            <motion.div
              className="absolute bottom-10 right-2 grid h-24 w-24 place-items-center rounded-full bg-rose-soft text-center font-script text-earth-900 shadow-journal"
              animate={{ rotate: [0, 12, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="px-2 text-sm leading-tight">heal<br />create<br />align</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.4em] text-earth-700/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
            ↓ scroll &nbsp; gently
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
