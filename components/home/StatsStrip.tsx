"use client";

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { Sparkles, Heart, Palette, Users } from "lucide-react";

const stats = [
  { icon: Sparkles, label: "Healing Modalities",   value: 20, suffix: "+",  color: "bg-rose-soft/70" },
  { icon: Heart,    label: "Souls Healed",         value: 500, suffix: "+", color: "bg-sage-300/70" },
  { icon: Palette,  label: "Customised Artworks",  value: 80, suffix: "+",  color: "bg-lavender-300/70" },
  { icon: Users,    label: "Online Sessions",      value: 1000, suffix: "+", color: "bg-rose-dusty/70" },
];

function Counter({ to, suffix }: { to: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toLocaleString());

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, to, { duration: 1.6, ease: "easeOut" });
    return () => controls.stop();
  }, [inView, to, count]);

  return (
    <span ref={ref} className="inline-flex items-baseline font-display text-4xl text-earth-900 sm:text-5xl">
      <motion.span>{rounded}</motion.span>
      <span className="ml-0.5">{suffix}</span>
    </span>
  );
}

export default function StatsStrip() {
  return (
    <section className="container-page py-12 sm:py-16">
      <div className="rounded-[2rem] border border-earth-300/40 bg-cream-50/70 p-6 shadow-soft backdrop-blur sm:p-10">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: 4 }}
                className={`mb-3 grid h-14 w-14 place-items-center rounded-full ${s.color} text-earth-900 shadow-soft sm:h-16 sm:w-16`}
              >
                <s.icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.6} />
              </motion.div>
              <Counter to={s.value} suffix={s.suffix} />
              <p className="mt-1 text-xs uppercase tracking-[0.25em] text-earth-700/80 sm:text-sm">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
