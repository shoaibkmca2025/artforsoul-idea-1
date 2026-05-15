"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const lines = [
  "you are not behind",
  "you are allowed to soften",
  "your art is enough",
  "breathing is a kind of prayer",
  "you can begin again",
  "messy is still meaningful",
];

export default function AffirmationMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-30%"]);

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-earth-300/40 bg-cream-100/60 py-7 sm:py-10">
      <motion.div style={{ x }} className="flex items-center gap-8 whitespace-nowrap font-script text-3xl text-earth-700 sm:gap-12 sm:text-5xl md:text-7xl">
        {[...lines, ...lines, ...lines].map((l, i) => (
          <span key={i} className="inline-flex items-center gap-8 sm:gap-12">
            {l}
            <span className="text-rose-dusty">✿</span>
          </span>
        ))}
      </motion.div>
    </section>
  );
}
