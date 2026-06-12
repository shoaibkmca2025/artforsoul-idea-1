import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import {
  Clock,
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
} from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import { courses } from "@/lib/data";

export const metadata = {
  title: "Sessions & Programs — Art For Soul",
  description:
    "Personalised healing sessions, follow-ups, Garbha Sanskar, Mother & Child development and the 4-week transformation program.",
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

export default function CoursesIndex() {
  const published = courses.filter((c) => c.published);

  return (
    <>
      <PageHero
        eyebrow="Sessions & Programs"
        title="Heal · Create · Transform"
        script="at your own pace."
        subtitle="One-to-one personalised sessions and group programs for emotional healing, energy alignment, conscious pregnancy, mother & child development and personal transformation."
      />

      <section className="container-page pb-16 sm:pb-20">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {published.map((c, i) => (
            <ScrollReveal key={c.id} delay={i * 0.08} direction="up" className="h-full">
              <Link
                href={`/courses/${c.slug}`}
                className="card-journal group flex h-full flex-col overflow-hidden p-0 transition-transform hover:-translate-y-2"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <img src={c.coverImage} alt={c.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute left-4 top-4 inline-flex items-center gap-1 rounded-full bg-cream-50/80 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-earth-700 backdrop-blur">
                    <Clock className="h-3 w-3" /> {c.duration}
                  </div>
                  {c.featured && (
                    <div className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-rose-dusty px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-cream-50">
                      <Sparkles className="h-3 w-3" /> Featured
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-earth-500">{c.level}</div>
                  <h3 className="mt-2 font-display text-2xl text-earth-900">{c.title}</h3>
                  <p className="mt-2 body-soft text-sm">{c.tagline}</p>
                  <div className="mt-auto flex flex-nowrap items-center justify-between gap-2 pt-5">
                    <span className="flex items-baseline gap-2">
                      <span className="price-chip whitespace-nowrap">{formatINR(c.price)}</span>
                      {c.originalPrice ? (
                        <span className="price-strike whitespace-nowrap">{formatINR(c.originalPrice)}</span>
                      ) : null}
                    </span>
                    <span className="btn-primary shrink-0 whitespace-nowrap px-4 text-xs">View course</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Healing modalities at a glance */}
      <section className="container-page pb-20 sm:pb-24">
        <div className="rounded-[2rem] border border-earth-300/40 bg-cream-50/70 p-7 shadow-soft backdrop-blur sm:p-10">
          <div className="mb-8 text-center">
            <ScrollReveal>
              <div className="pill mx-auto mb-3"><Sparkles className="h-3.5 w-3.5" /> Modalities</div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="heading-display text-3xl sm:text-4xl">
                All healing modalities, <span className="heading-script">in one studio</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {modalityColumns.map((col) => (
              <div key={col.title} className="card-journal flex h-full flex-col overflow-hidden p-0">
                {/* Image header */}
                <div className="relative aspect-[5/3] overflow-hidden">
                  <img
                    src={col.image}
                    alt={col.title}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-cream-50/90 via-transparent to-transparent" />
                </div>
                {/* Category icon bubble overlapping the image */}
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

          <p className="mt-8 text-center text-sm italic text-earth-700/80">
            Sessions are conducted individually or as a combination of modalities according to your needs and energy.
          </p>
        </div>
      </section>
    </>
  );
}
