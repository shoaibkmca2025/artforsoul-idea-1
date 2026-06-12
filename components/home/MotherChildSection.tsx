"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import {
  Flower2,
  Baby,
  HeartHandshake,
  Users,
  Palette,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const categories = [
  {
    icon: Flower2,
    title: "Before Pregnancy",
    tint: "bg-rose-soft/70",
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=600&q=70",
    items: ["Womb Healing", "Feminine Energy Healing", "Fertility Healing"],
  },
  {
    icon: Baby,
    title: "Pregnancy",
    tint: "bg-lavender-300/70",
    image: "https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=600&q=70",
    items: ["Garbha Sanskar", "Prenatal Meditation", "Pregnancy Emotional Healing", "Mother & Baby Bonding"],
  },
  {
    icon: HeartHandshake,
    title: "Postpartum",
    tint: "bg-sage-300/70",
    image: "https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?w=600&q=70",
    items: ["Postpartum Healing", "Emotional Support", "Stress Relief"],
  },
  {
    icon: Users,
    title: "Mother & Child",
    tint: "bg-rose-dusty/70",
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=600&q=70",
    items: ["Parenting Sessions", "Bonding Sessions", "Creative Healing"],
  },
  {
    icon: Palette,
    title: "Children & Teens",
    tint: "bg-gold-100",
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=70",
    items: ["Child Art Therapy", "Confidence Building", "Teen Emotional Wellness", "Stress & Anxiety Support"],
  },
];

export default function MotherChildSection() {
  return (
    <section id="mother-child" className="relative overflow-hidden py-20 sm:py-24">
      {/* Soft watercolor wash behind */}
      <div className="pointer-events-none absolute -left-24 top-10 h-80 w-80 rounded-full bg-rose-soft/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-lavender-300/35 blur-3xl" />

      <div className="container-page relative">
        <div className="mb-10 text-center sm:mb-14">
          <ScrollReveal>
            <div className="pill mx-auto mb-4 border-gold-300/60">
              <Sparkles className="h-3.5 w-3.5 text-gold-700" /> Nourishing the womb · Nurturing the future
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
              Pregnancy, Mother &amp;{" "}
              <span className="heading-script text-plum-500">Child Healing</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="gold-rule mt-5" />
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="mx-auto mt-4 max-w-xl body-soft">
              A good beginning creates a beautiful future — healing support for
              every stage, from womb to growing years.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5">
          {categories.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 50, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? -1 : 1 }}
              className="card-journal group flex h-full flex-col items-center overflow-hidden text-center"
            >
              {/* Image header */}
              <div className="relative -mx-5 -mt-5 mb-3 aspect-[4/3] w-[calc(100%+2.5rem)] overflow-hidden sm:-mx-6 sm:-mt-6 sm:w-[calc(100%+3rem)]">
                <img
                  src={c.image}
                  alt={c.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream-50/90 via-transparent to-transparent" />
              </div>
              <div className={`icon-bubble relative z-10 -mt-11 h-16 w-16 ${c.tint} ring-4 ring-cream-50 backdrop-blur`}>
                <c.icon className="h-7 w-7" strokeWidth={1.6} />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold text-plum-700">{c.title}</h3>
              <ul className="mt-3 space-y-1.5 text-sm text-earth-700/90">
                {c.items.map((it) => (
                  <li key={it} className="flex items-center justify-center gap-1.5">
                    <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gold-500" />
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-10 text-center">
            <Link href="/contact" className="btn-primary">
              Book a Mother &amp; Child Session <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
