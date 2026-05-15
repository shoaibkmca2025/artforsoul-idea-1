"use client";

import { motion } from "framer-motion";
import TextReveal from "@/components/animations/TextReveal";

export default function PageHero({
  eyebrow,
  title,
  script,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  script?: string;
  subtitle?: string;
}) {
  return (
    <section className="container-page pb-10 pt-28 text-center sm:pb-12 sm:pt-36">
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="pill mx-auto mb-6"
        >
          {eyebrow}
        </motion.div>
      )}
      <TextReveal as="h1" text={title} className="heading-display text-[clamp(2.4rem,6vw,4.5rem)]" />
      {script && (
        <TextReveal
          as="h1"
          text={script}
          delay={0.2}
          className="heading-script -mt-2 text-[clamp(3rem,8vw,6rem)] text-rose-dusty"
        />
      )}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mx-auto mt-5 max-w-2xl body-soft text-base sm:mt-6 sm:text-lg"
        >
          {subtitle}
        </motion.p>
      )}
    </section>
  );
}
