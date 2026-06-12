"use client";

import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import LotusLogo from "@/components/ui/LotusLogo";
import { Sparkles, MessageCircle, Phone } from "lucide-react";

const wa = process.env.NEXT_PUBLIC_WHATSAPP || "+919834040231";

export default function CTASection() {
  return (
    <section className="container-page py-16 sm:py-24">
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-plum-900 via-plum-700 to-plum-500 p-7 shadow-journal sm:rounded-[2.5rem] sm:p-10 md:p-16">
        {/* Watercolor glow accents */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-rose-dusty/30 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-72 w-72 rounded-full bg-gold-500/20 blur-3xl" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lavender-500/15 blur-3xl" />

        <div className="relative grid items-center gap-8 sm:gap-10 md:grid-cols-2">
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-gold-300/50 bg-plum-900/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold-300 backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" /> A soft invitation
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-display mt-4 text-3xl text-cream-50 sm:text-4xl md:text-5xl">
                Book your{" "}
                <span className="heading-script text-gold-300">session</span> today.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-4 max-w-md leading-relaxed text-cream-100/85 sm:mt-5">
                Personalised one-to-one online sessions — emotional healing, energy
                alignment, Garbha Sanskar, mother &amp; child development and the
                4-week transformation journey.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="mt-6 flex flex-wrap gap-3 sm:mt-7">
                <Link
                  href="/contact"
                  className="btn bg-gold-500 font-semibold text-plum-900 shadow-journal hover:bg-gold-300"
                >
                  Book a Session
                </Link>
                <a
                  href={`https://wa.me/${wa.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn border border-cream-50/40 bg-plum-900/30 text-cream-50 backdrop-blur hover:bg-plum-900/50"
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
                <a
                  href={`tel:${wa.replace(/[^0-9+]/g, "")}`}
                  className="btn border border-cream-50/40 bg-plum-900/30 text-cream-50 backdrop-blur hover:bg-plum-900/50"
                >
                  <Phone className="h-4 w-4" /> Call
                </a>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.4}>
              <p className="mt-6 font-script text-xl text-gold-300/90 sm:text-2xl">
                You deserve to heal, grow &amp; thrive — we are here to support you.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="right" delay={0.2}>
            <div className="relative mx-auto max-w-md md:mx-0 md:max-w-none">
              <div className="relative aspect-square overflow-hidden rounded-[1.75rem] border-[6px] border-cream-50/90 shadow-journal sm:rounded-[2rem] sm:border-8">
                <img
                  src="https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=900&q=70"
                  alt="Healing session"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 left-4 flex max-w-[230px] rotate-[-4deg] items-center gap-2.5 rounded-2xl bg-cream-50/95 p-3 shadow-soft sm:-bottom-5 sm:-left-5 sm:left-auto sm:p-4">
                <LotusLogo className="h-9 w-9 flex-shrink-0" />
                <div>
                  <p className="font-script text-lg leading-tight text-plum-700 sm:text-xl">soft beginnings,</p>
                  <p className="font-script text-lg leading-tight text-plum-700 sm:text-xl">deep returns.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
