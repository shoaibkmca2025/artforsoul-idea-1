"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Wind, Heart, Brush, Leaf } from "lucide-react";

const benefits = [
  {
    icon: Wind,
    title: "Heal",
    text: "Release.",
    tint: "bg-rose-soft/70",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=70",
  },
  {
    icon: Heart,
    title: "Align",
    text: "Balance.",
    tint: "bg-sage-300/70",
    image: "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?w=600&q=70",
  },
  {
    icon: Brush,
    title: "Create",
    text: "Express.",
    tint: "bg-lavender-300/70",
    image: "https://images.unsplash.com/photo-1576773689115-5cd2b0223523?w=600&q=70",
  },
  {
    icon: Leaf,
    title: "Transform",
    text: "Grow.",
    tint: "bg-rose-dusty/60",
    image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=600&q=70",
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
              className={`card-journal group text-center ${b.tint}`}
            >
              <span className="tape z-10" />
              {/* Polaroid-style image */}
              <div className="mt-3 overflow-hidden rounded-2xl border-4 border-cream-50 shadow-soft">
                <img
                  src={b.image}
                  alt={b.title}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="relative z-10 -mt-7 grid h-14 w-14 mx-auto place-items-center rounded-full bg-cream-50 text-earth-900 shadow-soft ring-2 ring-cream-50">
                <b.icon className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-3 font-display text-xl text-earth-900">{b.title}</h3>
              <p className="mt-1 body-soft text-sm">{b.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
