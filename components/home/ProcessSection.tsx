"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Brain,
  Search,
  Dumbbell,
  Heart,
  MapPin,
  TrendingUp,
  Crown,
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

type Step = {
  icon: typeof Brain;
  label: string;
  left: number; // % of container width (center of circle)
  row: "top" | "bottom";
};

// Sequence follows the zigzag flow: top → bottom → top → bottom → ...
const steps: Step[] = [
  { icon: Brain,      label: "Understanding the nature of your mind.",  left: 7,  row: "top" },
  { icon: Search,     label: "Identifying your emotional triggers.",     left: 22, row: "bottom" },
  { icon: Dumbbell,   label: "Discover your inner strengths.",           left: 36, row: "top" },
  { icon: Heart,      label: "Embrace gratitude & positivity.",          left: 50, row: "bottom" },
  { icon: MapPin,     label: "Plan out your goals.",                     left: 64, row: "top" },
  { icon: TrendingUp, label: "Experience continuous growth.",            left: 78, row: "bottom" },
  { icon: Crown,      label: "Development of a resilient mindset.",      left: 93, row: "top" },
];

// SVG viewBox dimensions (px) — used purely for path math
const VB_W = 1000;
const VB_H = 420;
const TOP_Y = 90;
const BOT_Y = 330;

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section ref={ref} className="container-page py-20 sm:py-24">
      <div className="mb-12 text-center sm:mb-16">
        <ScrollReveal>
          <div className="pill mx-auto mb-4">The Journey</div>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
            The <span className="heading-script text-sage-500">Process</span>
          </h2>
        </ScrollReveal>
        <ScrollReveal delay={0.15}>
          <p className="mt-3 mx-auto max-w-xl body-soft">
            A gentle, structured path from where you are now to a calmer, more
            aligned version of you.
          </p>
        </ScrollReveal>
      </div>

      {/* ── Desktop / Tablet layout ── */}
      <div className="relative mx-auto hidden h-[440px] w-full max-w-6xl lg:block">
        {/* Animated SVG arrows */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <marker
              id="process-arrow"
              markerWidth="10"
              markerHeight="10"
              refX="6"
              refY="5"
              orient="auto"
              markerUnits="strokeWidth"
            >
              <path d="M0,0 L0,10 L8,5 z" fill="#8FA37E" />
            </marker>
          </defs>

          {steps.slice(0, -1).map((step, i) => {
            const next = steps[i + 1];
            const x1 = (step.left / 100) * VB_W;
            const y1 = step.row === "top" ? TOP_Y : BOT_Y;
            const x2 = (next.left / 100) * VB_W;
            const y2 = next.row === "top" ? TOP_Y : BOT_Y;

            // Quadratic curve: bulge the curve away from the midline
            // If going down (top→bottom): bulge right of midline
            // If going up (bottom→top): bulge left of midline
            const mx = (x1 + x2) / 2;
            const my = (y1 + y2) / 2;
            const goingDown = step.row === "top";
            const offsetX = goingDown ? 40 : -40;
            const offsetY = goingDown ? -30 : 30;
            const cpx = mx + offsetX;
            const cpy = my + offsetY;

            // Pull endpoints slightly toward control point so the arrow doesn't poke into the circle
            const shorten = (sx: number, sy: number, tx: number, ty: number, dist: number) => {
              const dx = tx - sx;
              const dy = ty - sy;
              const len = Math.hypot(dx, dy);
              return [sx + (dx / len) * dist, sy + (dy / len) * dist] as const;
            };
            const [sx, sy] = shorten(x1, y1, cpx, cpy, 48);
            const [tx, ty] = shorten(x2, y2, cpx, cpy, 55);

            const path = `M ${sx} ${sy} Q ${cpx} ${cpy} ${tx} ${ty}`;

            return (
              <motion.path
                key={i}
                d={path}
                stroke="#8FA37E"
                strokeWidth={2.5}
                strokeLinecap="round"
                fill="none"
                markerEnd="url(#process-arrow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.3 + i * 0.22,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </svg>

        {/* Step nodes */}
        {steps.map((step, i) => {
          const Icon = step.icon;
          const topPct = step.row === "top" ? "0%" : "52%";
          return (
            <motion.div
              key={i}
              className="absolute flex w-36 -translate-x-1/2 flex-col items-center text-center"
              style={{ left: `${step.left}%`, top: topPct }}
              initial={{ opacity: 0, scale: 0.5, y: 14 }}
              animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: i * 0.18,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: 4 }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="grid h-20 w-20 place-items-center rounded-full bg-sage-500 text-cream-50 shadow-soft ring-4 ring-sage-100"
              >
                <Icon className="h-9 w-9" strokeWidth={1.6} />
              </motion.div>
              <p className="mt-4 text-sm font-medium leading-snug text-earth-900">
                {step.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* ── Mobile vertical timeline ── */}
      <div className="relative mx-auto max-w-md lg:hidden">
        <div className="absolute left-7 top-2 h-[calc(100%-1rem)] w-px bg-sage-300/70" />
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={i}
              className="relative mb-5 flex items-start gap-4"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-full bg-sage-500 text-cream-50 shadow-soft ring-4 ring-sage-100">
                <Icon className="h-6 w-6" strokeWidth={1.6} />
              </div>
              <p className="pt-4 text-sm font-medium text-earth-900">
                {step.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
