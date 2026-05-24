"use client";

import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { Sparkles, MessageCircle } from "lucide-react";

const wa = process.env.NEXT_PUBLIC_WHATSAPP || "+919999999999";

export default function CTASection() {
  return (
    <section className="container-page py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-earth-300/40 bg-gradient-to-br from-rose-soft/70 via-cream-100 to-sage-300/60 p-7 shadow-journal sm:rounded-[2.5rem] sm:p-10 md:p-16">
        <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-lavender-300/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-72 w-72 rounded-full bg-rose-dusty/40 blur-3xl" />

        <div className="relative grid items-center gap-8 sm:gap-10 md:grid-cols-2">
          <div>
            <ScrollReveal>
              <div className="pill mb-4"><Sparkles className="h-3.5 w-3.5" /> A soft invitation</div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
                Your <span className="heading-script">healing</span> doesn't have to be loud.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-4 body-soft max-w-md sm:mt-5">
                Book a personalised one-to-one online session — for emotional healing,
                energy alignment, conscious pregnancy, mother & child development, or
                a 4-week transformation journey.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
                <Link href="/contact" className="btn-primary">Book a Session</Link>
                <a
                  href={`https://wa.me/${wa.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative mx-auto max-w-md md:mx-0 md:max-w-none">
              <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border-[6px] border-cream-50 shadow-journal sm:rounded-[2rem] sm:border-8">
                <img
                  src="https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=1200&q=80"
                  alt="Healing"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-4 max-w-[200px] rotate-[-4deg] rounded-2xl bg-cream-50/95 p-3 shadow-soft sm:-bottom-5 sm:-left-5 sm:left-auto sm:max-w-[220px] sm:p-4">
                <p className="font-script text-lg text-earth-900 sm:text-xl">soft beginnings,</p>
                <p className="font-script text-lg text-earth-900 sm:text-xl">deep returns.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
