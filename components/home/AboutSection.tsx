"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Sparkles } from "lucide-react";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yImg = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const yQuote = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section ref={ref} className="container-page py-16 sm:py-24 lg:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <div className="relative">
          <motion.div
            style={{ y: yImg }}
            className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[2rem] border-[6px] border-cream-50 shadow-journal sm:border-8 lg:max-w-none"
          >
            <img
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80"
              alt="Art journal"
              className="h-full w-full object-cover"
            />
          </motion.div>

          <motion.div
            style={{ y: yQuote }}
            className="relative mx-auto -mt-8 max-w-xs rotate-[3deg] rounded-2xl border border-earth-300/40 bg-cream-50/95 p-5 shadow-soft backdrop-blur sm:absolute sm:-bottom-6 sm:-right-4 sm:mx-0 sm:mt-0"
          >
            <p className="font-script text-2xl leading-tight text-earth-900">
              "Art is the gentlest doorway back into your body."
            </p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-earth-500">
              — Founder's note
            </p>
          </motion.div>
        </div>

        <div>
          <ScrollReveal direction="up">
            <div className="pill mb-5"><Sparkles className="h-3.5 w-3.5" /> Our gentle why</div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
              A studio that holds you while you{" "}
              <span className="heading-script text-rose-dusty">come home</span> to yourself.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <p className="mt-6 max-w-xl body-soft text-base md:text-lg">
              Art For Soul began as a private journaling ritual — a way to make sense
              of overwhelm without needing to explain. Today it has grown into a
              creative healing space offering 1:1 art therapy, group workshops,
              soulful interior design and online courses for the tender-hearted.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.3}>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Trauma-informed creative practice",
                "Mindful, no-experience-needed sessions",
                "Beautifully designed healing spaces",
                "Live courses + lifetime access replays",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-earth-700/90">
                  <span className="mt-1 h-2 w-2 rounded-full bg-rose-dusty" />
                  {t}
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
