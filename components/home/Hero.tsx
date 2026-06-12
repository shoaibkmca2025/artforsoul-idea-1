"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import TextReveal from "@/components/animations/TextReveal";
import { FOUNDER_IMAGE_SRC } from "@/lib/siteImages";

// ── Hero video — drop your own MP4 at public/uploads/hero-video.mp4 ──
// If the file is missing the card falls back to an animated founder photo,
// so the hero is always alive.
const HERO_VIDEO_SRC = "/uploads/hero-video.mp4";
const HERO_VIDEO_POSTER = FOUNDER_IMAGE_SRC;

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [videoOk, setVideoOk] = useState(true);
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
            Personalised one-to-one & group sessions for emotional healing, inner
            transformation, creativity, wellness and positive energy alignment.
            Pranic, Sound, Chakra & Crystal healing · Art therapy · Garbha Sanskar ·
            Vastu & more — gathered in one tender space.
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
              Explore Sessions
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
          className="relative mx-auto h-[22rem] w-full max-w-[26rem] sm:h-[28rem] sm:max-w-[32rem] lg:h-[36rem] lg:max-w-none"
        >
          {/* Hero video — center, large */}
          <motion.div
            className="group absolute left-1/2 top-2 h-[18rem] w-[14rem] -translate-x-1/2 rotate-[-2deg] overflow-hidden rounded-3xl border-[6px] border-cream-50 shadow-journal sm:h-[22rem] sm:w-[17rem] sm:border-8 lg:h-[28rem] lg:w-[22rem]"
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
              /* Fallback: founder photo with a slow ken-burns drift, so the
                 card is always alive even without a video file */
              <motion.img
                src={HERO_VIDEO_POSTER}
                alt="Founder — Art For Soul"
                className="h-full w-full object-cover"
                animate={{ scale: [1, 1.08, 1], x: [0, -8, 0], y: [0, -10, 0] }}
                transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
              />
            )}
            {/* Soft tint so text/badge stays legible over busy frames */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-earth-900/25 via-transparent to-transparent" />
            {/* Drifting watercolor glow over the card */}
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
            {/* Animated play badge — only while the video is active */}
            {videoOk && (
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="pointer-events-none absolute bottom-4 left-4 grid h-11 w-11 place-items-center rounded-full bg-cream-50/90 text-earth-900 shadow-soft backdrop-blur sm:h-12 sm:w-12"
              >
                <Play className="h-4 w-4 sm:h-5 sm:w-5 translate-x-[1px]" fill="currentColor" />
              </motion.div>
            )}
            <span className="tape" />
          </motion.div>

          {/* Floating sticker */}
          <motion.div
            className="absolute bottom-6 right-2 grid h-16 w-16 place-items-center rounded-full bg-rose-soft text-center font-script text-earth-900 shadow-journal sm:h-20 sm:w-20 lg:bottom-10 lg:h-24 lg:w-24"
            animate={{ rotate: [0, 12, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="px-2 text-[10px] leading-tight sm:text-xs lg:text-sm">heal<br/>create<br/>align</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
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
