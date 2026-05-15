"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Palette, Users, HeartPulse, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: Palette,
    title: "1:1 Online Sessions",
    color: "bg-rose-soft/70",
    text: "Tender, focused art therapy sessions over video — for anxiety, overwhelm, grief and creative blocks.",
  },
  {
    icon: Users,
    title: "Group Workshops",
    color: "bg-sage-300/70",
    text: "Small, soulful circles. Watercolor, collage and journal-making — together, in safe creative containers.",
  },
  {
    icon: HeartPulse,
    title: "Healing Programs",
    color: "bg-lavender-300/70",
    text: "Multi-week guided programs that combine art, writing and somatic practice for deep nervous-system care.",
  },
  {
    icon: Sparkles,
    title: "Creative Wellness",
    color: "bg-rose-dusty/70",
    text: "Curated retreats, corporate workshops and bespoke healing experiences for teams and friend-circles.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="container-page py-20 sm:py-24">
      <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:mb-14 md:flex-row md:items-end">
        <div>
          <ScrollReveal>
            <div className="pill mb-4">What we offer</div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
              Four soft doorways into your <span className="heading-script">healing</span>.
            </h2>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.2}>
          <Link href="/services" className="btn-ghost">
            Explore all services <ArrowRight className="h-4 w-4" />
          </Link>
        </ScrollReveal>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -8, rotate: i % 2 === 0 ? -1.2 : 1.2 }}
            className="card-journal group flex h-full flex-col"
          >
            <div className={`mb-5 grid h-14 w-14 place-items-center rounded-2xl ${s.color} text-earth-900 transition-transform group-hover:rotate-6`}>
              <s.icon className="h-6 w-6" strokeWidth={1.6} />
            </div>
            <h3 className="font-display text-2xl text-earth-900">{s.title}</h3>
            <p className="mt-3 flex-1 body-soft text-sm">{s.text}</p>
            <Link href="/services" className="mt-5 inline-flex items-center gap-1 text-sm text-earth-700 hover:text-earth-900">
              Learn more <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
