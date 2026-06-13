import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Link from "next/link";
import LotusLogo from "@/components/ui/LotusLogo";
import {
  Palette,
  Drama,
  Music,
  AudioWaveform,
  Brain,
  NotebookPen,
  Sparkles,
  HeartHandshake,
  Leaf,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "About Art For Soul — A Holistic Healing Studio",
  description:
    "Art For Soul combines powerful healing modalities — art therapy, music, sound healing, meditation, energy healing and more — to support holistic transformation for every age and stage of life.",
};

const modalities = [
  { icon: Palette, label: "Expressive Art Therapy" },
  { icon: Drama, label: "Creative Arts Therapy" },
  { icon: Music, label: "Music Therapy" },
  { icon: AudioWaveform, label: "Sound Healing" },
  { icon: Brain, label: "Meditation & Mindfulness" },
  { icon: NotebookPen, label: "Therapeutic Journaling" },
  { icon: Sparkles, label: "Pranic & Energy Healing" },
  { icon: HeartHandshake, label: "Emotional Release Techniques" },
  { icon: Leaf, label: "Holistic Wellness Practices" },
];

const helps = [
  "Heal emotional wounds & past experiences",
  "Reduce stress, anxiety & overwhelm",
  "Improve mental & emotional well-being",
  "Enhance physical wellness & inner balance",
  "Strengthen relationships & family bonding",
  "Improve communication & self-expression",
  "Gain clarity, focus & direction in life",
  "Support abundance, confidence & growth",
  "Build self-love, self-worth & inner strength",
  "Reconnect with your authentic self",
];

const audiences = [
  "Children",
  "Teenagers",
  "Students",
  "Working Professionals",
  "Homemakers",
  "Pregnancy & Motherhood",
  "Parent–Child Bonding",
  "Couples & Families",
  "Seniors",
];

export default function AboutStudioPage() {
  return (
    <>
      <PageHero
        eyebrow="About the Studio"
        title="A holistic journey of healing,"
        script="growth & transformation."
        subtitle="Art For Soul combines powerful healing modalities to support your overall well-being and help you create positive change in every area of life."
      />

      {/* Modalities */}
      <section className="container-page py-6 sm:py-10">
        <ScrollReveal>
          <h2 className="heading-display text-center text-3xl sm:text-4xl">
            Healing modalities <span className="heading-script text-rose-dusty">we weave together</span>
          </h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {modalities.map((m, i) => (
            <ScrollReveal key={m.label} delay={i * 0.05}>
              <div className="card-journal flex items-center gap-4">
                <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-rose-soft/70 text-earth-900">
                  <m.icon className="h-5 w-5" strokeWidth={1.7} />
                </span>
                <span className="font-display text-lg text-earth-900">{m.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* How it helps */}
      <section className="container-page py-12 sm:py-16">
        <div className="rounded-[2rem] border border-earth-300/40 bg-cream-50/70 p-7 shadow-soft backdrop-blur sm:p-10">
          <ScrollReveal>
            <h2 className="heading-display text-center text-3xl sm:text-4xl">
              How can Art For Soul <span className="heading-script text-plum-500">help you?</span>
            </h2>
          </ScrollReveal>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {helps.map((h, i) => (
              <ScrollReveal key={h} delay={i * 0.04}>
                <div className="flex items-start gap-3 text-sm text-earth-700/90 sm:text-base">
                  <span className="mt-1 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-sage-300/70 text-[10px] text-earth-900">
                    ✓
                  </span>
                  {h}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Every age & stage */}
      <section className="container-page py-6 sm:py-10">
        <div className="mb-8 text-center">
          <ScrollReveal>
            <h2 className="heading-display text-3xl sm:text-4xl">
              For every age &amp; <span className="heading-script text-rose-dusty">stage of life</span>
            </h2>
          </ScrollReveal>
        </div>
        <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
          {audiences.map((a, i) => (
            <ScrollReveal key={a} delay={i * 0.04}>
              <span className="inline-flex rounded-full border border-earth-300/50 bg-cream-50/80 px-4 py-2 text-sm font-medium text-plum-700 shadow-soft">
                {a}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Safe space + closing */}
      <section className="container-page pb-20 sm:pb-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-plum-900 via-plum-700 to-plum-500 p-8 text-center shadow-journal sm:p-12">
          <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gold-500/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-10 h-56 w-56 rounded-full bg-rose-dusty/25 blur-3xl" />
          <div className="relative">
            <LotusLogo className="mx-auto h-14 w-14" />
            <h2 className="heading-display mt-4 text-2xl text-cream-50 sm:text-3xl">
              A safe, supportive &amp; non-judgmental space
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-cream-100/85">
              No artistic experience is required — just bring an open heart and a
              willingness to explore, heal and grow. When you connect with Art For
              Soul, you begin a journey of holistic transformation: mind, body,
              heart, relationships and soul.
            </p>
            <p className="mt-5 font-script text-2xl text-gold-300 sm:text-3xl">
              Create · Heal · Discover · Transform
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn bg-gold-500 font-semibold text-plum-900 hover:bg-gold-300">
                Begin Your Journey
              </Link>
              <Link href="/about" className="btn border border-cream-50/40 bg-plum-900/30 text-cream-50 backdrop-blur hover:bg-plum-900/50">
                Meet the founder <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
