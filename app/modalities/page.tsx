import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ServiceTabs from "@/components/ui/ServiceTabs";
import {
  Palette,
  Sparkles,
  AudioWaveform,
  CircleDot,
  Brain,
  Music,
  Activity,
  PersonStanding,
  Wind,
  Hand,
  Fingerprint,
  HandMetal,
  Smile,
  Apple,
  Leaf,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Healing Modalities & Wellness Practices — Art For Soul",
  description:
    "Holistic healing modalities at Art For Soul — Expressive Art Therapy, Pranic & Sound Healing, Chakra Balancing, Meditation, Music & Dance therapy, Yoga, Breathwork, EFT, Acupressure, Mudra, Facial Yoga, Nutrition & holistic wellness coaching.",
};

const tints = ["bg-rose-soft/70", "bg-sage-300/70", "bg-lavender-300/70", "bg-rose-dusty/70", "bg-gold-100"];

const modalities = [
  { label: "Expressive Art Therapy", icon: Palette },
  { label: "Pranic Healing", icon: Sparkles },
  { label: "Sound Healing Therapy", icon: AudioWaveform },
  { label: "Chakra Healing & Balancing", icon: CircleDot },
  { label: "Guided Meditation & Mindfulness", icon: Brain },
  { label: "Music Therapy", icon: Music },
  { label: "Dance & Rhythmic Movement Therapy", icon: Activity },
  { label: "Therapeutic Yoga", icon: PersonStanding },
  { label: "Breathwork & Pranayama Therapy", icon: Wind },
  { label: "EFT (Emotional Freedom Technique) Tapping", icon: Hand },
  { label: "Acupressure Therapy", icon: Fingerprint },
  { label: "Mudra Therapy", icon: HandMetal },
  { label: "Facial Yoga", icon: Smile },
  { label: "Nutrition & Healthy Diet Guidance", icon: Apple },
  { label: "Natural Lifestyle & Holistic Wellness Coaching", icon: Leaf },
];

export default function ModalitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Healing Modalities & Wellness Practices"
        title="Every holistic way"
        script="to heal & align."
        subtitle="A complete range of holistic healing modalities & wellness practices. Sessions are conducted individually or as a combination, chosen according to your needs and energy."
      />

      <ServiceTabs />

      <section className="container-page pb-20 sm:pb-24">
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {modalities.map((m, i) => (
            <ScrollReveal key={m.label} delay={(i % 3) * 0.06}>
              <div className="card-journal group flex h-full items-center gap-4 transition-transform hover:-translate-y-1">
                <span className={`icon-bubble h-14 w-14 flex-shrink-0 ${tints[i % tints.length]} ring-2 ring-cream-50 group-hover:rotate-6`}>
                  <m.icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <span className="font-display text-lg leading-tight text-earth-900">{m.label}</span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm italic text-earth-700/80">
          Sessions are conducted individually or as a combination of modalities according to your needs and energy.
        </p>

        <div className="mt-8 text-center">
          <Link href="/courses" className="btn-primary">
            See healing sessions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
