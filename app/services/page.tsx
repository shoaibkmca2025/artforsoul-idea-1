import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Link from "next/link";
import { Palette, Users, HeartPulse, Sparkles, Home as HomeIcon, ArrowRight } from "lucide-react";

export const metadata = { title: "Services — Art For Soul" };

const services = [
  {
    icon: Palette,
    title: "1:1 Online Art Therapy",
    subtitle: "60 minutes · video session",
    text: "A private creative session — bring your worries, your sketchbook, your overwhelm. We'll explore them gently through art-making and reflection. Ideal for anxiety, overwhelm, creative blocks, life transitions.",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&q=80",
    price: "₹2,499 / session",
    tint: "bg-rose-soft/60",
  },
  {
    icon: Users,
    title: "Group Workshops",
    subtitle: "2.5 hours · in-person or online",
    text: "Small, soulful circles of 6–10 souls. Watercolor, collage and journaling led with breath and slowness. Perfect for a tender introduction to creative healing.",
    image: "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=1200&q=80",
    price: "from ₹1,499",
    tint: "bg-sage-300/60",
  },
  {
    icon: HeartPulse,
    title: "Emotional Healing Programs",
    subtitle: "4–8 week cohorts",
    text: "A multi-week guided journey through emotion, somatic awareness and creative ritual. Includes weekly live sessions, a curated workbook and a small group container.",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200&q=80",
    price: "from ₹6,999",
    tint: "bg-lavender-300/60",
  },
  {
    icon: Sparkles,
    title: "Creative Wellness Experiences",
    subtitle: "Retreats & corporate sessions",
    text: "Custom-designed creative wellness for teams, retreats and friend circles. From half-day workshops to weekend retreats, we will build something tender and unforgettable.",
    image: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=1200&q=80",
    price: "Custom quote",
    tint: "bg-rose-dusty/60",
  },
  {
    icon: HomeIcon,
    title: "Soulful Interior Design",
    subtitle: "Homes · studios · cafes",
    text: "Emotionally-led interior design rooted in handmade texture, calming palettes and your unique story. From a single room to a full home, we build sanctuaries that exhale with you.",
    image: "https://images.unsplash.com/photo-1616627547584-bf28cee262db?w=1200&q=80",
    price: "Project-based",
    tint: "bg-cream-200",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Soft, soulful"
        script="ways to begin."
        subtitle="A gentle menu of creative-care offerings. Choose what feels right — there is no wrong way to start."
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
                <div className="mt-5 flex flex-wrap gap-3 sm:mt-6">
                  <Link href="/contact" className="btn-primary">Book this</Link>
                  <Link href="/courses" className="btn-ghost">See courses <ArrowRight className="h-4 w-4" /></Link>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>
    </>
  );
}
