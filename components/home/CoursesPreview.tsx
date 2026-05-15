"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { ArrowRight, Clock, Sparkles } from "lucide-react";
import { formatINR } from "@/lib/utils";

type Course = {
  id: string;
  title: string;
  slug: string;
  tagline: string;
  coverImage: string;
  price: number;
  originalPrice: number | null;
  duration: string;
  level: string;
};

export default function CoursesPreview({ courses }: { courses: Course[] }) {
  return (
    <section className="container-page py-20 sm:py-24">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:mb-12 md:flex-row md:items-end">
        <div>
          <ScrollReveal>
            <div className="pill mb-4"><Sparkles className="h-3.5 w-3.5" /> Online courses</div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
              Learn at your own <span className="heading-script">soft pace</span>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mt-4 max-w-xl body-soft">
              Live cohorts and self-paced courses for healing through creativity.
              Lifetime access. Soft community. No pressure to be perfect.
            </p>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.3}>
          <Link href="/courses" className="btn-ghost">
            Browse all courses <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        {courses.slice(0, 3).map((c, i) => (
          <motion.article
            key={c.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8 }}
            className="card-journal flex h-full flex-col overflow-hidden p-0"
          >
            <Link href={`/courses/${c.slug}`} className="block">
              <div className="relative aspect-[5/4] overflow-hidden">
                <motion.img
                  src={c.coverImage}
                  alt={c.title}
                  className="h-full w-full object-cover"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 1.1 }}
                />
                <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-cream-50/80 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-earth-700 backdrop-blur">
                  <Clock className="h-3 w-3" /> {c.duration}
                </div>
              </div>
            </Link>
            <div className="flex flex-1 flex-col p-6">
              <div className="text-[11px] uppercase tracking-[0.25em] text-earth-500">
                {c.level}
              </div>
              <h3 className="mt-2 font-display text-2xl text-earth-900">{c.title}</h3>
              <p className="mt-2 body-soft text-sm">{c.tagline}</p>
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl text-earth-900">
                    {formatINR(c.price)}
                  </span>
                  {c.originalPrice ? (
                    <span className="text-xs text-earth-500 line-through">
                      {formatINR(c.originalPrice)}
                    </span>
                  ) : null}
                </div>
                <Link href={`/courses/${c.slug}`} className="btn-primary text-xs">
                  Enroll
                </Link>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
