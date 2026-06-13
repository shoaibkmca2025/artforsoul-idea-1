import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ServiceTabs from "@/components/ui/ServiceTabs";
import {
  Sparkles,
  HeartPulse,
  Palette,
  Brush,
  Compass,
  AudioWaveform,
  CircleDot,
  Hand,
  Wind,
  PersonStanding,
  Target,
  Smile,
  Baby,
  Flower2,
  Layers,
  NotebookPen,
  Music,
  Image as ImageIcon,
  Frame,
  Maximize2,
  Zap,
  Coins,
  Star,
  Users,
  Sun,
  Heart,
  ArrowRight,
} from "lucide-react";

export const metadata = {
  title: "Healing Modalities — Art For Soul",
  description:
    "All the holistic healing modalities offered at Art For Soul — Pranic, Sound, Chakra, Mudra, Pranayama, Art & Mandala therapy, Vastu, Feng Shui and more.",
};

const modalityColumns = [
  {
    title: "Healing Therapies",
    icon: HeartPulse,
    tint: "bg-rose-soft/70",
    image: "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?w=700&q=70",
    items: [
      { label: "Pranic Healing", icon: Sparkles },
      { label: "Sound Healing", icon: AudioWaveform },
      { label: "Chakra Healing", icon: CircleDot },
      { label: "Mudra Therapy", icon: Hand },
      { label: "Pranayama Therapy", icon: Wind },
      { label: "Therapeutic Yoga", icon: PersonStanding },
      { label: "Acupressure Healing", icon: Target },
      { label: "Face Yoga Therapy", icon: Smile },
      { label: "Inner Child Healing", icon: Baby },
      { label: "Child Healing", icon: Heart },
    ],
  },
  {
    title: "Creative & Art Therapies",
    icon: Palette,
    tint: "bg-sage-300/70",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=700&q=70",
    items: [
      { label: "Art Therapy", icon: Palette },
      { label: "Mandala Art", icon: Flower2 },
      { label: "Dot Mandala Art", icon: CircleDot },
      { label: "Texture Art", icon: Layers },
      { label: "Clay Molding", icon: Hand },
      { label: "Journaling Therapy", icon: NotebookPen },
      { label: "Music Therapy", icon: Music },
    ],
  },
  {
    title: "Customised Art & Healing Paintings",
    icon: Brush,
    tint: "bg-lavender-300/70",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=700&q=70",
    items: [
      { label: "Customized Paintings", icon: Brush },
      { label: "Canvas Paintings", icon: ImageIcon },
      { label: "Wall Art", icon: Frame },
      { label: "Large Healing Paintings", icon: Maximize2 },
      { label: "Vastu-Based Paintings", icon: Compass },
      { label: "Energy & Healing Artworks", icon: Zap },
    ],
  },
  {
    title: "Mindset, Spiritual & Energy",
    icon: Compass,
    tint: "bg-rose-dusty/70",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&q=70",
    items: [
      { label: "Money Manifestation", icon: Coins },
      { label: "Vision Board & Goal Setting", icon: Target },
      { label: "Personality Development", icon: Star },
      { label: "Parenting Guidance", icon: Users },
      { label: "Vastu Shastra", icon: Compass },
      { label: "Feng Shui", icon: Sun },
      { label: "Garbha Sanskar", icon: Heart },
    ],
  },
];

export default function ModalitiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Healing Modalities"
        title="Every holistic way"
        script="to heal & align."
        subtitle="20+ healing modalities under one roof. Sessions are conducted individually or as a combination of modalities, chosen according to your needs and energy."
      />

      <ServiceTabs />

      <section className="container-page pb-20 sm:pb-24">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {modalityColumns.map((col) => (
            <div key={col.title} className="card-journal flex h-full flex-col overflow-hidden p-0">
              <div className="relative aspect-[5/3] overflow-hidden">
                <img src={col.image} alt={col.title} loading="lazy" className="h-full w-full object-cover" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream-50/90 via-transparent to-transparent" />
              </div>
              <div className={`icon-bubble relative z-10 -mt-8 ml-5 h-14 w-14 ${col.tint} ring-4 ring-cream-50`}>
                <col.icon className="h-6 w-6" strokeWidth={1.6} />
              </div>
              <div className="flex flex-1 flex-col px-5 pb-5 pt-2">
                <h3 className="font-display text-xl font-semibold text-plum-700">{col.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-earth-700/90">
                  {col.items.map((it) => (
                    <li key={it.label} className="flex items-center gap-2.5">
                      <span className="grid h-6 w-6 flex-shrink-0 place-items-center rounded-full bg-cream-100 text-earth-700">
                        <it.icon className="h-3.5 w-3.5" strokeWidth={1.7} />
                      </span>
                      {it.label}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/courses" className="btn-primary">
            See healing sessions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
