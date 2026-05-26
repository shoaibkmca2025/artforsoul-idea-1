import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import { Clock, Sparkles } from "lucide-react";
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
    items: [
      "Pranic Healing",
      "Sound Healing",
      "Chakra Healing",
      "Crystal Healing",
      "Mudra Therapy",
      "Pranayama Therapy",
      "Therapeutic Yoga",
      "Acupressure Healing",
      "Face Yoga Therapy",
      "Inner Child Healing",
      "Child Healing",
    ],
  },
  {
    title: "Creative & Art Therapies",
    items: [
      "Art Therapy",
      "Mandala Art",
      "Dot Mandala Art",
      "Texture Art",
      "Clay Molding",
      "Journaling Therapy",
      "Music Therapy",
    ],
  },
  {
    title: "Customised Art & Healing Paintings",
    items: [
      "Customized Paintings",
      "Canvas Paintings",
      "Wall Art",
      "Large Healing Paintings",
      "Vastu-Based Paintings",
      "Energy & Healing Artworks",
    ],
  },
  {
    title: "Mindset, Spiritual & Energy",
    items: [
      "Money Manifestation",
      "Vision Board & Goal Setting",
      "Personality Development",
      "Parenting Guidance",
      "Vastu Shastra",
      "Feng Shui",
      "Garbha Sanskar",
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
            <ScrollReveal key={c.id} delay={i * 0.08} direction="up">
              <Link
                href={`/courses/${c.slug}`}
                className="card-journal group block overflow-hidden p-0 transition-transform hover:-translate-y-2"
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
                <div className="p-6">
                  <div className="text-[11px] uppercase tracking-[0.25em] text-earth-500">{c.level}</div>
                  <h3 className="mt-2 font-display text-2xl text-earth-900">{c.title}</h3>
                  <p className="mt-2 body-soft text-sm">{c.tagline}</p>
                  <div className="mt-5 flex items-center justify-between gap-3">
                    <div className="flex flex-col items-start gap-1">
                      <span className="price-chip">{formatINR(c.price)}</span>
                      {c.originalPrice ? (
                        <span className="price-strike">{formatINR(c.originalPrice)}</span>
                      ) : null}
                    </div>
                    <span className="btn-primary text-xs">View course</span>
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

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {modalityColumns.map((col) => (
              <div key={col.title}>
                <h3 className="font-display text-xl text-earth-900">{col.title}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-earth-700/90">
                  {col.items.map((it) => (
                    <li key={it} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-rose-dusty" />
                      {it}
                    </li>
                  ))}
                </ul>
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
