"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

const faqs = [
  {
    q: "Do I need to be good at art?",
    a: "Absolutely not! Art therapy is about expression, not artistic skill. There's no right or wrong way to create. The process itself is what heals.",
  },
  {
    q: "How many sessions will I need?",
    a: "This varies for each person. Some find benefit in just a few sessions, while others prefer ongoing support. We'll discuss your goals together in the discovery stage and shape a plan around your pace.",
  },
  {
    q: "Are sessions online or in-person?",
    a: "All one-to-one and group sessions are conducted online over video — so you can heal from the comfort of your own space. Customised healing paintings and wall art can be shipped to your home.",
  },
  {
    q: "Can I combine different healing modalities in one session?",
    a: "Yes — sessions are designed individually or as a combination of modalities according to your needs and energy. Pranic, Sound, Crystal, Art therapy, Mandala and more can be woven together into one personalised flow.",
  },
  {
    q: "What if I've never tried healing or therapy before?",
    a: "That's completely okay. Every session begins with a gentle discovery call where we understand your history, lifestyle and what you'd like support with. No prior experience needed — just an open heart.",
  },
  {
    q: "How do I book a session?",
    a: "Use the Book Consultation button anywhere on the site, fill the short booking form, or reach out on WhatsApp / Instagram. We'll confirm your slot and share a video link before the session.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="container-page py-20 sm:py-24">
      <div className="mb-10 text-center sm:mb-14">
        <ScrollReveal>
          <p className="font-script text-2xl text-sage-500 sm:text-3xl">
            Common questions
          </p>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <h2 className="heading-display mt-2 text-4xl sm:text-5xl md:text-6xl">
            Frequently{" "}
            <span className="relative inline-block">
              Asked
              <span className="pointer-events-none absolute -bottom-1.5 left-0 right-0 mx-auto h-3 w-[110%] -translate-x-[5%] rounded-full bg-rose-soft/70 blur-[2px]" />
            </span>
          </h2>
        </ScrollReveal>
      </div>

      <div className="mx-auto max-w-3xl space-y-3 sm:space-y-4">
        {faqs.map((f, i) => {
          const open = openIdx === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-2xl border border-earth-300/40 bg-rose-soft/25 backdrop-blur transition-colors sm:rounded-3xl ${
                open ? "bg-rose-soft/40 shadow-soft" : "hover:bg-rose-soft/35"
              }`}
            >
              <button
                onClick={() => setOpenIdx(open ? null : i)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-7 sm:py-5"
              >
                <h3 className="font-display text-base font-semibold text-earth-900 sm:text-lg">
                  {f.q}
                </h3>
                <motion.span
                  animate={{ rotate: open ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full bg-cream-50/70 text-earth-900"
                >
                  <ChevronDown className="h-4 w-4" strokeWidth={2} />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-earth-700 sm:px-7 sm:pb-6 sm:text-base">
                      {f.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
