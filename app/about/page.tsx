import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Parallax from "@/components/animations/Parallax";
import SafeImage from "@/components/ui/SafeImage";
import { FOUNDER_IMAGE_ALT, FOUNDER_IMAGE_FALLBACK_TEXT, FOUNDER_IMAGE_SRC } from "@/lib/siteImages";
import { Heart, Leaf, Brush, Sparkles, HeartPulse, Palette, Baby, Home as HomeIcon } from "lucide-react";

export const metadata = { title: "About — Art For Soul" };

const values = [
  { icon: Heart, title: "Tender & personalised", text: "Every session is designed around your unique needs, energy and pace." },
  { icon: Leaf, title: "Holistic healing", text: "We weave together energy work, therapy, art and spiritual guidance." },
  { icon: Brush, title: "Creative as medicine", text: "Art, mandala, clay and journaling are used as powerful healing tools." },
  { icon: Sparkles, title: "Energy alignment", text: "Bringing your inner & outer worlds into harmony — at home and within." },
];

const offerings = [
  { icon: HeartPulse, label: "Healing Therapies", items: "Pranic · Sound · Chakra · Mudra · Pranayama · Acupressure · Face Yoga · Inner Child" },
  { icon: Palette, label: "Creative & Art Therapies", items: "Art · Mandala · Dot Mandala · Texture · Clay · Journaling · Music" },
  { icon: Baby, label: "Garbha Sanskar & Child", items: "Conscious pregnancy · Mother & child development (0–10 yrs) · Parenting guidance" },
  { icon: HomeIcon, label: "Spiritual & Energy", items: "Vastu Shastra · Feng Shui · Customised Healing Paintings · Money Manifestation · Vision Boards" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Me"
        title="Hi, I'm Nitu Mastud —"
        script="artist & healing coach."
        subtitle="Artist · Interior Designer · Expressive Art Therapist & Healing Coach. ✨ I create beautiful spaces, meaningful experiences, and healing transformations. ✨"
      />

      <section className="container-page py-12 sm:py-16">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2">
          <Parallax offset={50}>
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[1.75rem] border-[6px] border-cream-50 shadow-journal sm:rounded-[2rem] sm:border-8 lg:max-w-none">
              <SafeImage
                src={FOUNDER_IMAGE_SRC}
                alt={FOUNDER_IMAGE_ALT}
                fallbackText={FOUNDER_IMAGE_FALLBACK_TEXT}
                className="h-full w-full object-cover"
              />
            </div>
          </Parallax>

          <div>
            <ScrollReveal>
              <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
                My <span className="heading-script text-rose-dusty">creative journey</span>.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-4 body-soft text-base sm:mt-5 sm:text-lg">
                Creativity has always been at the heart of my life. As a self-taught
                artist and creative soul, I pursued a professional degree in Interior
                Design — discovering the perfect blend of aesthetics, emotions and
                functionality — and went on to teach at renowned institutes and
                colleges in Mumbai.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-4 body-soft">
                Over the past 20 years my journey has expanded across interior design,
                art, photography, décor styling, set design, event management, live
                shows, short films, workshops and creative mentoring. Yet through
                every role, art remained closest to my heart — a powerful tool for
                self-discovery, emotional expression and healing.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.25}>
              <p className="mt-4 body-soft">
                Driven by this passion, I pursued professional studies in Counseling,
                Psychology and Art Therapy, expanding into holistic modalities including
                Pranic Healing, Sound Healing, Chakra Healing, Therapeutic Yoga, Mudra
                Therapy, Nutrition and Wellness Coaching. This vision gave birth to
                <span className="font-medium text-earth-900"> Art For Soul</span> — a
                heart-centred space dedicated to helping individuals heal, grow and
                reconnect with themselves.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="mt-4 font-script text-2xl text-earth-900">
                ✨ I create beautiful spaces… and beautifully healed lives. ✨
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="container-page py-12 sm:py-16">
        <div className="mb-8 text-center sm:mb-10">
          <ScrollReveal>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
              Our quiet <span className="heading-script text-rose-dusty">values</span>
            </h2>
          </ScrollReveal>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 0.08}>
              <div className="card-journal">
                <div className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-rose-soft/70">
                  <v.icon className="h-5 w-5" />
                </div>
                <h3 className="font-display text-xl">{v.title}</h3>
                <p className="mt-2 body-soft text-sm">{v.text}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Offerings overview */}
      <section className="container-page py-12 sm:py-16">
        <div className="mb-8 text-center sm:mb-10">
          <ScrollReveal>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
              Everything I <span className="heading-script text-rose-dusty">offer</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="mt-3 body-soft mx-auto max-w-2xl">
              One-to-one personalised sessions available. Customised group sessions also available.
            </p>
          </ScrollReveal>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {offerings.map((o, i) => (
            <ScrollReveal key={o.label} delay={i * 0.08}>
              <div className="card-journal flex gap-4">
                <div className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl bg-sage-300/60">
                  <o.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-display text-xl text-earth-900">{o.label}</h3>
                  <p className="mt-1 body-soft text-sm">{o.items}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Closing affirmation */}
      <section className="container-page pb-16 sm:pb-20">
        <div className="relative overflow-hidden rounded-[2rem] border border-earth-300/40 bg-gradient-to-br from-rose-soft/60 via-cream-100 to-sage-300/50 p-8 text-center shadow-soft sm:p-12">
          <p className="heading-script text-4xl text-earth-900 sm:text-5xl">
            Heal · Create · Transform · Align
          </p>
          <p className="mt-4 body-soft mx-auto max-w-xl">
            Sessions are conducted individually or as a combination of different
            healing modalities according to your requirements and energy needs.
          </p>
        </div>
      </section>
    </>
  );
}
