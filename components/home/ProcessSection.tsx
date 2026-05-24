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
  { icon: Brain,      label: "Understanding the nature of your mind.",  left: 8,  row: "top" },
  { icon: Search,     label: "Identifying your emotional triggers.",     left: 22, row: "bottom" },
  { icon: Dumbbell,   label: "Discover your inner strengths.",           left: 36, row: "top" },
  { icon: Heart,      label: "Embrace gratitude & positivity.",          left: 50, row: "bottom" },
  { icon: MapPin,     label: "Plan out your goals.",                     left: 64, row: "top" },
  { icon: TrendingUp, label: "Experience continuous growth.",            left: 78, row: "bottom" },
  { icon: Crown,      label: "Development of a resilient mindset.",      left: 92, row: "top" },
];

// SVG viewBox dimensions (px) are shared with the absolute desktop layout.
const VB_W = 1000;
const VB_H = 400;
const TOP_CENTER_Y = 108;
const BOTTOM_CENTER_Y = 288;
const NODE_RADIUS = 48;
const ARROW_GAP = 12;
const LABEL_WIDTH = 176;
const ICON_SIZE = 80;

function pointForStep(step: Step) {
  return {
    x: (step.left / 100) * VB_W,
    y: step.row === "top" ? TOP_CENTER_Y : BOTTOM_CENTER_Y,
  };
}

function arrowPath(from: Step, to: Step) {
  const start = pointForStep(from);
  const end = pointForStep(to);
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const length = Math.hypot(dx, dy);
  const ux = dx / length;
  const uy = dy / length;
  const padding = NODE_RADIUS + ARROW_GAP;
  const sx = start.x + ux * padding;
  const sy = start.y + uy * padding;
  const tx = end.x - ux * padding;
  const ty = end.y - uy * padding;
  const curve = from.row === "top" ? 34 : -34;
  const cpx = (sx + tx) / 2 + curve;
  const cpy = (sy + ty) / 2;

  return `M ${sx} ${sy} Q ${cpx} ${cpy} ${tx} ${ty}`;
}

export default function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="process" ref={ref} className="container-page py-20 sm:py-24">
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
      <div className="relative mx-auto hidden h-[400px] w-full max-w-6xl overflow-visible lg:block">
        {/* Animated SVG arrows */}
        <svg
          className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
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
            const path = arrowPath(step, next);

            return (
              <motion.path
                key={i}
                d={path}
                stroke="#8FA37E"
                strokeWidth={3}
                strokeLinecap="round"
                fill="none"
                markerEnd="url(#process-arrow)"
                vectorEffect="non-scaling-stroke"
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
          const centerY = pointForStep(step).y;
          const labelTop =
            step.row === "top"
              ? centerY - NODE_RADIUS - 58
              : centerY + NODE_RADIUS + 18;
          return (
            <div key={i}>
              <motion.div
                whileHover={{ scale: 1.08, rotate: 4 }}
                initial={{ opacity: 0, scale: 0.5, y: 14 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="absolute z-20 grid h-20 w-20 place-items-center rounded-full bg-sage-500 text-cream-50 shadow-soft ring-4 ring-sage-100"
                style={{
                  left: `calc(${step.left}% - ${ICON_SIZE / 2}px)`,
                  top: centerY - ICON_SIZE / 2,
                }}
              >
                <Icon className="h-9 w-9" strokeWidth={1.6} />
              </motion.div>
              <motion.p
                className="absolute z-20 text-center text-sm font-medium leading-snug text-earth-900"
                style={{
                  left: `calc(${step.left}% - ${LABEL_WIDTH / 2}px)`,
                  top: labelTop,
                  width: LABEL_WIDTH,
                }}
                initial={{ opacity: 0, y: step.row === "top" ? -10 : 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.45,
                  delay: 0.1 + i * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {step.label}
              </motion.p>
            </div>
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
