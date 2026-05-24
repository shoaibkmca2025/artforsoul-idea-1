"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { HeartPulse, Palette, Baby, Users, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

const services = [
  {
    icon: HeartPulse,
    title: "Healing Therapies",
    color: "bg-rose-soft/70",
    text: "Pranic, Sound, Chakra, Crystal, Mudra, Pranayama, Acupressure, Face Yoga, Inner Child & Therapeutic Yoga sessions.",
  },
  {
    icon: Palette,
    title: "Art & Creative Therapy",
    color: "bg-sage-300/70",
    text: "Art therapy, Mandala & Dot Mandala, Texture art, Clay molding, Journaling and Music therapy for emotional release.",
  },
  {
    icon: Baby,
    title: "Garbha Sanskar & Child",
    color: "bg-lavender-300/70",
    text: "Conscious pregnancy sessions for mother & baby, plus mother-and-child development sessions for ages 0–10.",
  },
  {
    icon: Users,
    title: "Mindset & Spiritual Guidance",
    color: "bg-rose-dusty/70",
    text: "Money Manifestation, Vision Board, Personality Development, Parenting, Vastu Shastra and Feng Shui guidance.",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="container-page py-20 sm:py-24">
      <div className="mb-10 flex flex-col items-start justify-between gap-5 sm:mb-14 md:flex-row md:items-end">
        <div>
          <ScrollReveal>
            <div className="pill mb-4"><Sparkles className="h-3.5 w-3.5" /> What we offer</div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
              Soft doorways into your <span className="heading-script">healing</span>.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-3 max-w-xl body-soft text-sm sm:text-base">
              Sessions are conducted individually or as a combination of different
              healing modalities — chosen according to your needs and energy.
            </p>
          </ScrollReveal>
        </div>
        <ScrollReveal delay={0.2}>
          <Link href="/services" className="btn-ghost">
            Explore all sessions <ArrowRight className="h-4 w-4" />
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
