"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Wind, Heart, Brush, Leaf } from "lucide-react";

const benefits = [
  {
    icon: Wind,
    title: "Relax & De-stress",
    text: "Down-regulate a tired nervous system with rhythmic, repetitive creative ritual.",
    tint: "bg-rose-soft/60",
  },
  {
    icon: Heart,
    title: "Heal Emotional Blocks",
    text: "Make space for emotions that words alone could not reach.",
    tint: "bg-sage-300/60",
  },
  {
    icon: Brush,
    title: "Creative Self-Expression",
    text: "Find your unique visual voice — no perfect outcome required.",
    tint: "bg-lavender-300/60",
  },
  {
    icon: Leaf,
    title: "Calm & Mindfulness",
    text: "Slow down. Soften. Return to the present, brush stroke by brush stroke.",
    tint: "bg-cream-200",
  },
];

export default function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} className="relative overflow-hidden py-20 sm:py-24 lg:py-28">
      <motion.div
        style={{ x }}
        className="pointer-events-none absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap font-script text-[14vw] leading-none text-earth-300/25 sm:top-12 sm:text-[16vw] lg:text-[18vw]"
      >
        soft healing soft healing
      </motion.div>

      <div className="container-page relative">
        <div className="mb-10 text-center sm:mb-14">
          <ScrollReveal>
            <div className="pill mx-auto mb-4">Why it works</div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
              The quiet medicine of <span className="heading-script">making</span>.
            </h2>
          </ScrollReveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 50, rotate: i % 2 === 0 ? -3 : 3 }}
              whileInView={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ rotate: 0, y: -6 }}
              className={`card-journal text-center ${b.tint}`}
            >
              <span className="tape" />
              <div className="mt-4 grid h-14 w-14 mx-auto place-items-center rounded-full bg-cream-50 text-earth-900">
                <b.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-display text-xl text-earth-900">{b.title}</h3>
              <p className="mt-2 body-soft text-sm">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
