"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useMotionValue,
  type MotionValue,
} from "framer-motion";
import { useEffect } from "react";
import LotusLogo from "@/components/ui/LotusLogo";

/**
 * Scroll-reactive global background.
 *
 * - Pixel-based parallax (visible on every wheel tick)
 * - Scroll-velocity reactions (faster scroll = stronger motion)
 * - Chakra trail that lights up with page progress
 * - Mouse parallax on desktop
 *
 * Everything animates with transform/opacity only — GPU-composited,
 * no repaints. Pointer-events disabled so it never blocks UI.
 */

const CHAKRA_COLORS = [
  "#E57373", // root
  "#FFB74D", // sacral
  "#FFD54F", // solar plexus
  "#81C784", // heart
  "#64B5F6", // throat
  "#7986CB", // third eye
  "#BA68C8", // crown
];

function ChakraDot({ p, i }: { p: MotionValue<number>; i: number }) {
  const at = i / (CHAKRA_COLORS.length - 1);
  const opacity = useTransform(p, [at - 0.08, at], [0.2, 1]);
  const scale = useTransform(p, [at - 0.08, at], [0.6, 1.3]);
  return (
    <motion.span
      style={{ opacity, scale, backgroundColor: CHAKRA_COLORS[i] }}
      className="block h-2.5 w-2.5 rounded-full shadow-soft"
    />
  );
}

export default function FloatingDoodles() {
  const { scrollY, scrollYProgress } = useScroll();
  // Pixel-based smoothed scroll — clearly visible on every wheel tick
  const v = useSpring(scrollY, { stiffness: 70, damping: 18, mass: 0.3 });
  // Progress (0→1) for the slow color story + chakra trail
  const p = useSpring(scrollYProgress, { stiffness: 55, damping: 18, mass: 0.4 });
  // Scroll velocity — elements lean/stretch when you scroll fast
  const vel = useVelocity(v);
  const velTilt = useTransform(vel, [-2500, 0, 2500], [-14, 0, 14]);
  const velStretch = useTransform(vel, [-3000, 0, 3000], [1.12, 1, 1.12]);

  // ── Mouse parallax (desktop) ──
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  useEffect(() => {
    const fn = (e: MouseEvent) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 36);
      my.set((e.clientY / window.innerHeight - 0.5) * 28);
    };
    window.addEventListener("mousemove", fn, { passive: true });
    return () => window.removeEventListener("mousemove", fn);
  }, [mx, my]);
  const mxs = useSpring(mx, { stiffness: 40, damping: 14 });
  const mys = useSpring(my, { stiffness: 40, damping: 14 });
  const mxsInv = useTransform(mxs, (n) => -n);
  const mysInv = useTransform(mys, (n) => -n);

  // ── Blob parallax (top-left cluster) — scroll + mouse combined ──
  const yTLs = useTransform(v, (y) => -y * 0.22);
  const xTLs = useTransform(v, (y) => y * 0.08);
  const yTL = useTransform([yTLs, mys] as const, ([a, b]) => (a as number) + (b as number));
  const xTL = useTransform([xTLs, mxs] as const, ([a, b]) => (a as number) + (b as number));
  const sTL = useTransform(p, [0, 0.5, 1], [1, 1.3, 1.1]);
  const oTLrose = useTransform(p, [0, 0.35, 0.7], [0.65, 0.15, 0]);
  const oTLlav = useTransform(p, [0, 0.35, 0.7], [0, 0.6, 0.1]);
  const oTLgold = useTransform(p, [0.3, 0.7], [0, 0.5]);

  // ── Blob parallax (right cluster) — moves opposite the mouse for depth ──
  const yRs = useTransform(v, (y) => y * 0.16);
  const xRs = useTransform(v, (y) => -y * 0.06);
  const yR = useTransform([yRs, mysInv] as const, ([a, b]) => (a as number) + (b as number));
  const xR = useTransform([xRs, mxsInv] as const, ([a, b]) => (a as number) + (b as number));
  const oRlav = useTransform(p, [0, 0.4, 0.8], [0.55, 0.2, 0]);
  const oRsage = useTransform(p, [0, 0.4, 0.8], [0, 0.55, 0.2]);
  const oRrose = useTransform(p, [0.4, 0.8], [0, 0.55]);

  // ── Blob parallax (bottom cluster) — rises fast, stretches with velocity ──
  const yB = useTransform(v, (y) => -y * 0.3);
  const oBsage = useTransform(p, [0, 0.35, 0.7], [0.5, 0.25, 0]);
  const oBplum = useTransform(p, [0.25, 0.6, 1], [0, 0.4, 0.55]);

  // ── Rotating mandala rings — breathe when scrolling fast ──
  const rotA = useTransform(v, (y) => y * 0.06);
  const rotB = useTransform(v, (y) => -y * 0.045);
  const oRingA = useTransform(p, [0, 0.15, 0.85, 1], [0.5, 1, 1, 0.5]);

  // ── Giant lotus watermark — center, slowly turning & swelling ──
  const lotusRot = useTransform(v, (y) => y * 0.018);
  const lotusScale = useTransform(p, [0, 0.5, 1], [0.85, 1.2, 1]);
  const lotusOp = useTransform(p, [0, 0.25, 0.75, 1], [0.05, 0.1, 0.1, 0.06]);

  // ── Floating petals — fast upward parallax + velocity tilt ──
  const yP1 = useTransform(v, (y) => -y * 0.45);
  const yP2 = useTransform(v, (y) => -y * 0.3);
  const yP3 = useTransform(v, (y) => -y * 0.6);
  const rotPs = useTransform(v, (y) => y * 0.08);
  const rotP = useTransform([rotPs, velTilt] as const, ([a, b]) => (a as number) + (b as number));

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* ════ Giant lotus watermark — center ════ */}
      <motion.div
        style={{ x: "-50%", y: "-50%", rotate: lotusRot, scale: lotusScale, opacity: lotusOp }}
        className="absolute left-1/2 top-1/2 will-change-transform"
      >
        <LotusLogo className="h-[18rem] w-[18rem] sm:h-[38rem] sm:w-[38rem]" />
      </motion.div>

      {/* ════ Top-left color-morphing blob cluster ════ */}
      <motion.div
        style={{ y: yTL, x: xTL, scale: sTL }}
        className="absolute -left-28 -top-28 h-[22rem] w-[22rem] will-change-transform sm:h-[30rem] sm:w-[30rem]"
      >
        <motion.div style={{ opacity: oTLrose }} className="absolute inset-0 rounded-full bg-rose-soft blur-3xl" />
        <motion.div style={{ opacity: oTLlav }} className="absolute inset-0 rounded-full bg-lavender-300 blur-3xl" />
        <motion.div style={{ opacity: oTLgold }} className="absolute inset-0 rounded-full bg-gold-300 blur-3xl" />
      </motion.div>

      {/* ════ Right color-morphing blob cluster — desktop only (GPU relief on phones) ════ */}
      <motion.div
        style={{ y: yR, x: xR }}
        className="absolute -right-24 top-[28%] hidden h-[20rem] w-[20rem] will-change-transform sm:block sm:h-[28rem] sm:w-[28rem]"
      >
        <motion.div style={{ opacity: oRlav }} className="absolute inset-0 rounded-full bg-lavender-300 blur-3xl" />
        <motion.div style={{ opacity: oRsage }} className="absolute inset-0 rounded-full bg-sage-300 blur-3xl" />
        <motion.div style={{ opacity: oRrose }} className="absolute inset-0 rounded-full bg-rose-dusty blur-3xl" />
      </motion.div>

      {/* ════ Bottom color-morphing blob — desktop only (GPU relief on phones) ════ */}
      <motion.div
        style={{ y: yB, scaleY: velStretch }}
        className="absolute bottom-[-8rem] left-[18%] hidden h-[20rem] w-[20rem] will-change-transform sm:block sm:h-[26rem] sm:w-[26rem]"
      >
        <motion.div style={{ opacity: oBsage }} className="absolute inset-0 rounded-full bg-sage-300 blur-3xl" />
        <motion.div style={{ opacity: oBplum }} className="absolute inset-0 rounded-full bg-plum-300 blur-3xl" />
      </motion.div>

      {/* ════ Large rotating mandala ring — right edge ════ */}
      <motion.svg
        style={{ rotate: rotA, opacity: oRingA, scale: velStretch }}
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        className="absolute -right-36 top-[12%] h-[22rem] w-[22rem] text-plum-500/25 will-change-transform sm:-right-28 sm:h-[32rem] sm:w-[32rem]"
      >
        <circle cx="100" cy="100" r="96" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="78" strokeWidth="0.5" strokeDasharray="3 6" />
        <circle cx="100" cy="100" r="58" strokeWidth="0.5" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x1 = 100 + Math.cos(a) * 58;
          const y1 = 100 + Math.sin(a) * 58;
          const x2 = 100 + Math.cos(a) * 96;
          const y2 = 100 + Math.sin(a) * 96;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth="0.4" />;
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * 360;
          return (
            <path
              key={`p${i}`}
              d="M100 42 C 108 56, 108 70, 100 82 C 92 70, 92 56, 100 42 Z"
              strokeWidth="0.5"
              transform={`rotate(${a} 100 100)`}
            />
          );
        })}
      </motion.svg>

      {/* ════ Counter-rotating dotted ring — bottom-left ════ */}
      <motion.svg
        style={{ rotate: rotB }}
        viewBox="0 0 200 200"
        fill="none"
        stroke="currentColor"
        className="absolute -bottom-24 -left-24 hidden h-[20rem] w-[20rem] text-gold-500/30 will-change-transform sm:block sm:h-[26rem] sm:w-[26rem]"
      >
        <circle cx="100" cy="100" r="90" strokeWidth="0.6" strokeDasharray="1 9" strokeLinecap="round" />
        <circle cx="100" cy="100" r="70" strokeWidth="0.5" strokeDasharray="4 8" />
        <circle cx="100" cy="100" r="50" strokeWidth="0.5" />
      </motion.svg>

      {/* ════ Chakra progress trail — lights up as you journey down ════ */}
      <div className="absolute right-3 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex lg:right-5">
        {CHAKRA_COLORS.map((_, i) => (
          <ChakraDot key={i} p={p} i={i} />
        ))}
      </div>

      {/* ════ Parallax petals / sparks — tilt with scroll speed ════ */}
      <motion.div style={{ y: yP1, rotate: rotP }} className="absolute left-[12%] top-[65%] will-change-transform">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-rose-dusty/50 sm:h-10 sm:w-10" fill="currentColor">
          <path d="M12 2c2.5 3.2 3.2 6.4 0 10-3.2-3.6-2.5-6.8 0-10z" />
        </svg>
      </motion.div>
      <motion.div style={{ y: yP2, rotate: velTilt }} className="absolute right-[20%] top-[85%] will-change-transform">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-lavender-500/50 sm:h-8 sm:w-8" fill="currentColor">
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </motion.div>
      <motion.div style={{ y: yP3, rotate: rotP }} className="absolute left-[55%] top-[110%] will-change-transform">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-gold-500/45 sm:h-9 sm:w-9" fill="currentColor">
          <path d="M12 2l2 7 7 3-7 3-2 7-2-7-7-3 7-3 2-7z" />
        </svg>
      </motion.div>
      <motion.div style={{ y: yP2 }} className="absolute left-[78%] top-[55%] hidden will-change-transform sm:block">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-sage-500/50" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M12 3c3 4 3 8 0 11-3-3-3-7 0-11z" />
          <path d="M12 14v7" strokeLinecap="round" />
        </svg>
      </motion.div>

      {/* Deeper petals — enter the viewport as the page scrolls on */}
      <motion.div style={{ y: yP1, rotate: rotP }} className="absolute left-[28%] top-[210%] will-change-transform">
        <svg viewBox="0 0 24 24" className="h-8 w-8 text-lavender-500/50 sm:h-10 sm:w-10" fill="currentColor">
          <path d="M12 2c2.5 3.2 3.2 6.4 0 10-3.2-3.6-2.5-6.8 0-10z" />
        </svg>
      </motion.div>
      <motion.div style={{ y: yP3 }} className="absolute right-[15%] top-[290%] will-change-transform">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-rose-dusty/50 sm:h-9 sm:w-9" fill="currentColor">
          <path d="M12 2l2 7 7 3-7 3-2 7-2-7-7-3 7-3 2-7z" />
        </svg>
      </motion.div>
      <motion.div style={{ y: yP2, rotate: rotP }} className="absolute left-[60%] top-[260%] will-change-transform">
        <svg viewBox="0 0 24 24" className="h-6 w-6 text-gold-500/50 sm:h-8 sm:w-8" fill="currentColor">
          <circle cx="12" cy="12" r="3" />
          <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" strokeWidth="0.8" />
        </svg>
      </motion.div>
      <motion.div style={{ y: yP1 }} className="absolute left-[8%] top-[330%] hidden will-change-transform sm:block">
        <svg viewBox="0 0 24 24" className="h-9 w-9 text-plum-300/50" fill="currentColor">
          <path d="M12 2c2.5 3.2 3.2 6.4 0 10-3.2-3.6-2.5-6.8 0-10z" />
        </svg>
      </motion.div>
      <motion.div style={{ y: yP3, rotate: rotP }} className="absolute right-[35%] top-[400%] will-change-transform">
        <svg viewBox="0 0 24 24" className="h-7 w-7 text-sage-500/50 sm:h-9 sm:w-9" fill="currentColor">
          <path d="M12 2c2.5 3.2 3.2 6.4 0 10-3.2-3.6-2.5-6.8 0-10z" />
        </svg>
      </motion.div>

      {/* ════ Twinkling sparkles — alive even when idle ════ */}
      {[
        { cls: "left-[20%] top-[30%]", dur: 3.2, delay: 0 },
        { cls: "right-[28%] top-[18%]", dur: 4.1, delay: 1.2 },
        { cls: "left-[70%] top-[75%]", dur: 3.6, delay: 0.6 },
        { cls: "left-[40%] top-[12%] hidden sm:block", dur: 4.6, delay: 2 },
      ].map((s, i) => (
        <motion.svg
          key={i}
          viewBox="0 0 24 24"
          fill="currentColor"
          className={`absolute h-4 w-4 text-gold-500/70 sm:h-5 sm:w-5 ${s.cls}`}
          animate={{ opacity: [0.15, 0.8, 0.15], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: s.dur, delay: s.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
        </motion.svg>
      ))}

      {/* ════ Gentle always-on floats ════ */}
      <motion.svg
        className="absolute left-[6%] top-[16%] h-12 w-12 text-earth-300/50 sm:h-16 sm:w-16"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M10 32 Q22 12, 32 32 T 54 32" />
        <path d="M14 44 Q24 36, 32 44 T 50 44" />
      </motion.svg>
      <motion.svg
        className="absolute right-[8%] top-[8%] h-14 w-14 text-rose-dusty/50 sm:h-20 sm:w-20"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={{ y: [0, 12, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M32 12 C 40 22, 40 32, 32 42 C 24 32, 24 22, 32 12 Z" />
        <path d="M32 42 V56" />
      </motion.svg>
    </div>
  );
}
