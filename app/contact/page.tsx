import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Link from "next/link";
import ContactForm from "./ContactForm";
import { Mail, MessageCircle, Instagram, MapPin, Sparkles, ArrowRight } from "lucide-react";

const wa = process.env.NEXT_PUBLIC_WHATSAPP || "+919834040231";
const ig = process.env.NEXT_PUBLIC_INSTAGRAM || "https://www.instagram.com/artforsoul.in";

export const metadata = { title: "Contact — Art For Soul" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Say hello"
        title="A soft place to"
        script="reach out."
        subtitle="Drop a note, book a session or just say hi. There is no perfect way to begin — only the next gentle step."
      />

      {/* Booking happens through your account — the detailed intake is the signup form */}
      <section className="container-page pb-10">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-plum-900 via-plum-700 to-plum-500 p-7 text-center shadow-journal sm:p-10">
            <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gold-500/20 blur-3xl" />
            <div className="relative">
              <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-gold-300/50 bg-plum-900/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold-300">
                <Sparkles className="h-3.5 w-3.5" /> Book a session
              </div>
              <h2 className="heading-display text-2xl text-cream-50 sm:text-3xl">
                Create your free account to book &amp; track your sessions
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-cream-100/85">
                Your signup includes a short healing intake so every session is
                personalised to you. Already have an account? Just log in to book.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href="/signup" className="btn bg-gold-500 font-semibold text-plum-900 hover:bg-gold-300">
                  Create account &amp; book <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/courses" className="btn border border-cream-50/40 bg-plum-900/30 text-cream-50 backdrop-blur hover:bg-plum-900/50">
                  Browse sessions
                </Link>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <section className="container-page pb-20 sm:pb-24">
        <div className="grid items-start gap-5 sm:gap-6 lg:grid-cols-2">
          <ScrollReveal>
            <div className="card-journal">
              <h3 className="font-display text-2xl">Send a message</h3>
              <p className="mt-1 text-sm body-soft">For general enquiries and tender hellos.</p>
              <div className="mt-4">
                <ContactForm />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="card-journal flex flex-col gap-4">
              <h3 className="font-display text-2xl">Other ways to connect</h3>

              <a
                href={`https://wa.me/${wa.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-earth-300/40 bg-cream-50/80 p-4 hover:bg-cream-100"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-sage-300/70">
                  <MessageCircle className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-base">WhatsApp</div>
                  <div className="text-xs text-earth-700/80">{wa}</div>
                </div>
              </a>

              <a
                href={ig}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-2xl border border-earth-300/40 bg-cream-50/80 p-4 hover:bg-cream-100"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-rose-soft/70">
                  <Instagram className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-base">Instagram</div>
                  <div className="text-xs text-earth-700/80">@artforsoul.in</div>
                </div>
              </a>

              <a
                href="mailto:artforsoul.in@gmail.com"
                className="flex items-center gap-3 rounded-2xl border border-earth-300/40 bg-cream-50/80 p-4 hover:bg-cream-100"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-lavender-300/70">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-base">Email (Healing)</div>
                  <div className="text-xs text-earth-700/80">artforsoul.in@gmail.com</div>
                </div>
              </a>

              <a
                href="mailto:nmartstudioz@gmail.com"
                className="flex items-center gap-3 rounded-2xl border border-earth-300/40 bg-cream-50/80 p-4 hover:bg-cream-100"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gold-100">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-base">Email (Art Studioz)</div>
                  <div className="text-xs text-earth-700/80">nmartstudioz@gmail.com</div>
                </div>
              </a>

              <div className="mt-2 flex items-start gap-3 rounded-2xl border border-earth-300/40 bg-cream-50/80 p-4">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-cream-200">
                  <MapPin className="h-5 w-5" />
                </span>
                <div className="text-sm body-soft">
                  Studio visits by appointment only.<br />
                  India · serving globally online.
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
