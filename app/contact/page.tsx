import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ContactForm from "./ContactForm";
import BookingForm from "./BookingForm";
import GroupInterestForm from "./GroupInterestForm";
import { Mail, MessageCircle, Instagram, MapPin } from "lucide-react";

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

      <section className="container-page pb-20 sm:pb-24">
        <div className="grid items-start gap-5 sm:gap-6 lg:grid-cols-2">
          <ScrollReveal>
            <div className="card-journal">
              <h3 className="font-display text-2xl text-plum-700">✨ Art Therapy &amp; Healing Session — Booking</h3>
              <p className="mt-1 text-sm body-soft">Reserve your one-to-one online healing session.</p>
              <div className="mt-4">
                <BookingForm />
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="card-journal">
              <h3 className="font-display text-2xl text-plum-700">🌿 Group Circles · Workshops · Retreats</h3>
              <p className="mt-1 text-sm body-soft">Interested in healing together? Tell us what calls to you.</p>
              <div className="mt-4">
                <GroupInterestForm />
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="mt-6 grid items-start gap-5 sm:gap-6 lg:grid-cols-2">
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
                  <div className="text-xs text-earth-700/80">@artforsoul</div>
                </div>
              </a>

              <a
                href="mailto:hello@artforsoul.in"
                className="flex items-center gap-3 rounded-2xl border border-earth-300/40 bg-cream-50/80 p-4 hover:bg-cream-100"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-lavender-300/70">
                  <Mail className="h-5 w-5" />
                </span>
                <div>
                  <div className="font-display text-base">Email</div>
                  <div className="text-xs text-earth-700/80">hello@artforsoul.in</div>
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
