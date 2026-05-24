import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Link from "next/link";
import {
  Sparkles,
  HeartPulse,
  Repeat,
  Baby,
  Users,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

export const metadata = { title: "Sessions — Art For Soul" };

const services = [
  {
    icon: HeartPulse,
    title: "Personal Counseling & Healing Therapy Session",
    subtitle: "One-to-One Online · ~90 min",
    text:
      "A personalised session for emotional healing, mental clarity, inner transformation, energy balancing and overall well-being. Customised to your personal challenges, emotional state, lifestyle and healing requirements.",
    stages: [
      "Discovery & Assessment — discovery call, history, lifestyle, root-cause questionnaires.",
      "Healing & Therapy — personalised healing technique, emotional release, energy balancing.",
      "Counseling & Transformation — one-to-one counseling, mindset shift, self-awareness.",
      "Action Plan & Follow-Up — homework, healing practices, actionable plan.",
    ],
    image: "https://images.unsplash.com/photo-1545389336-cf090694435e?w=1200&q=80",
    price: "₹1999 / session",
    tint: "bg-rose-soft/60",
  },
  {
    icon: Repeat,
    title: "Follow-Up Counseling Session",
    subtitle: "One-to-One Online · ~30 min · within 1 month",
    text:
      "Continued support after your main healing & therapy session. Review your emotional progress, clear doubts, understand challenges and receive ongoing guidance.",
    stages: [
      "Progress review & emotional support.",
      "Guidance for challenges during the healing journey.",
      "Clarity, motivation & counseling support.",
      "Adjustments in healing practices or actionable plans if required.",
    ],
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80",
    price: "₹1111 / session",
    tint: "bg-sage-300/60",
  },
  {
    icon: Baby,
    title: "Garbha Sanskar — Personalised One-to-One Sessions",
    subtitle: "For pregnant mothers · Online · per session",
    text:
      "A special healing & counseling program designed exclusively for pregnant women and their babies. Focuses on emotional well-being of the mother, positive energy healing, healthy brain development of the baby and a calm, nurturing 9-month journey.",
    stages: [
      "Emotional & mental well-being of the mother.",
      "Positive energy healing for mother & baby.",
      "Healthy brain development of the baby.",
      "Calm, happy & nurturing pregnancy — stronger emotional bonding.",
    ],
    image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?w=1200&q=80",
    price: "₹3333 / session",
    tint: "bg-lavender-300/60",
  },
  {
    icon: Users,
    title: "Mother & Child Development Session",
    subtitle: "Mother + Child (0–10 yrs) · Online · per session",
    text:
      "Personalised one-to-one sessions for mothers and children to support the child's emotional, mental and neurological development during the most important foundation years of life. Includes conscious parenting guidance.",
    stages: [
      "Healthy neurological & brain development (most crucial 0–7 yrs).",
      "Focus, intelligence, creativity & learning abilities.",
      "Emotional balance, confidence & natural talents.",
      "Conscious parenting & a loving, nurturing home environment.",
    ],
    image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=1200&q=80",
    price: "₹3333 / session",
    tint: "bg-rose-dusty/60",
  },
  {
    icon: CalendarDays,
    title: "4-Week Consistency & Transformation Program",
    subtitle: "1 Month · 8 Online Sessions",
    text:
      "A one-month healing & growth journey to become emotionally balanced, mentally clear, spiritually aligned and consistent in achieving your goals. Includes 4 deep therapy sessions (90 min, Fridays) and 4 meditation & journaling sessions (30 min, Tuesdays).",
    stages: [
      "4 Deep Therapy Sessions — healing, counseling, emotional release, art therapy, meditation, journaling & guidance.",
      "4 Meditation & Journaling Sessions — inner healing, consistency, mental clarity, goal planning, motivation.",
      "Heal emotionally · create healthy routines · stay focused.",
      "Achieve goals with clarity, direction & guidance.",
    ],
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&q=80",
    price: "1:1 ₹9999  ·  Group ₹5555",
    tint: "bg-cream-200",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Sessions & Programs"
        title="Heal · Create · Transform"
        script="· Align ·"
        subtitle="Personalised one-to-one and group sessions for emotional healing, inner transformation, creativity, wellness and positive energy alignment. Choose what feels right — sessions can be combined according to your needs."
      />

      <section className="container-page space-y-14 pb-16 sm:space-y-16 sm:pb-20">
        {services.map((s, i) => (
          <ScrollReveal key={s.title} direction={i % 2 ? "left" : "right"}>
            <div className={`grid items-center gap-8 sm:gap-10 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
              <div className="relative">
                <div className="relative aspect-[5/4] overflow-hidden rounded-[1.75rem] border-[6px] border-cream-50 shadow-journal sm:rounded-[2rem] sm:border-8">
                  <img src={s.image} alt={s.title} className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" />
                </div>
                <div className={`absolute bottom-2 ${i % 2 ? "right-2 sm:-right-5" : "left-2 sm:-left-5"} rotate-[-3deg] rounded-2xl ${s.tint} px-3 py-2 font-script text-lg text-earth-900 shadow-soft sm:-bottom-5 sm:px-5 sm:py-3 sm:text-2xl`}>
                  {s.price}
                </div>
              </div>

              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-cream-50/80 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-earth-700 backdrop-blur sm:mb-4 sm:text-xs">
                  <s.icon className="h-3.5 w-3.5" /> {s.subtitle}
                </div>
                <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl">{s.title}</h2>
                <p className="mt-3 body-soft text-base sm:mt-4 sm:text-lg">{s.text}</p>

                <ul className="mt-5 space-y-2">
                  {s.stages.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-earth-700/90">
                      <span className="mt-1 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-rose-soft/70 text-[10px] font-medium text-earth-900">
                        {idx + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-3 sm:mt-6">
                  <Link href="/contact" className="btn-primary">Book this session</Link>
                  <Link href="/courses" className="btn-ghost">All sessions <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
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
            {[
              {
                title: "Healing Therapies",
                items: ["Pranic Healing", "Sound Healing", "Chakra Healing", "Crystal Healing", "Mudra Therapy", "Pranayama Therapy", "Therapeutic Yoga", "Acupressure Healing", "Face Yoga Therapy", "Inner Child Healing", "Child Healing"],
              },
              {
                title: "Creative & Art Therapies",
                items: ["Art Therapy", "Mandala Art", "Dot Mandala Art", "Texture Art", "Clay Molding", "Journaling Therapy", "Music Therapy"],
              },
              {
                title: "Customised Art & Healing Paintings",
                items: ["Customized Paintings", "Canvas Paintings", "Wall Art", "Large Healing Paintings", "Vastu-Based Paintings", "Energy & Healing Artworks"],
              },
              {
                title: "Mindset, Spiritual & Energy",
                items: ["Money Manifestation", "Vision Board & Goal Setting", "Personality Development", "Parenting Guidance", "Vastu Shastra", "Feng Shui", "Garbha Sanskar"],
              },
            ].map((col) => (
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
