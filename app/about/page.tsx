import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Parallax from "@/components/animations/Parallax";
import { Heart, Leaf, Brush, Sparkles } from "lucide-react";

export const metadata = { title: "About — Art For Soul" };

const values = [
  { icon: Heart, title: "Tenderness first", text: "We approach every soul with care, slowness and zero judgement." },
  { icon: Leaf, title: "Soft science", text: "Trauma-informed, somatic, evidence-aware creative practice." },
  { icon: Brush, title: "Process over polish", text: "We celebrate the mess, the smudge, the unfinished page." },
  { icon: Sparkles, title: "Beauty as healing", text: "We believe a beautiful space and a beautiful brushstroke are medicine." },
];

const timeline = [
  { year: "2019", title: "A journal, alone", text: "It began as a private nightly ritual to soften an anxious heart." },
  { year: "2021", title: "First circle", text: "A handful of friends gathered to paint, cry and laugh." },
  { year: "2023", title: "Interior chapter", text: "Designing emotionally resonant homes became part of the practice." },
  { year: "2025", title: "Art for Soul, today", text: "A creative healing studio with 1:1 work, workshops, courses & soulful interiors." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About the studio"
        title="A studio that listens,"
        script="and gently makes room."
        subtitle="Art For Soul is a tender meeting place between art therapy, interior storytelling and emotional wellness — built for soft souls and slow becomings."
      />

      <section className="container-page py-12 sm:py-16">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2">
          <Parallax offset={50}>
            <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-[1.75rem] border-[6px] border-cream-50 shadow-journal sm:rounded-[2rem] sm:border-8 lg:max-w-none">
              <img
                src="https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=1200&q=80"
                alt="Founder portrait"
                className="h-full w-full object-cover"
              />
            </div>
          </Parallax>

          <div>
            <ScrollReveal>
              <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
                Hello, I'm <span className="heading-script text-rose-dusty">your guide</span>.
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="mt-4 body-soft text-base sm:mt-5 sm:text-lg">
                Art therapist, interior designer and softness-keeper. I work with people
                who are tired of holding it all in. With paper, paint and rooms full of
                light, I help you put some of it down — gently.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-4 body-soft">
                My practice blends trauma-informed art therapy, mindful design and a deep
                love for slow craft. Every workshop, every interior, every course is
                shaped by one belief — your inner life deserves a beautiful place to live.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

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

      <section className="container-page py-16 sm:py-20">
        <div className="mb-8 text-center sm:mb-10">
          <ScrollReveal>
            <h2 className="heading-display text-3xl sm:text-4xl md:text-5xl">
              A short <span className="heading-script text-rose-dusty">story</span>
            </h2>
          </ScrollReveal>
        </div>
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-3 top-0 h-full w-px bg-earth-300/60 md:left-1/2" />
          {timeline.map((t, i) => (
            <ScrollReveal key={t.year} delay={i * 0.1}>
              <div className={`relative mb-8 grid gap-3 pl-9 sm:mb-10 sm:gap-4 md:grid-cols-2 md:gap-10 md:pl-0`}>
                <div className={`md:text-right ${i % 2 ? "md:order-2 md:text-left" : ""}`}>
                  <div className="inline-flex items-center gap-2 rounded-full bg-rose-soft/70 px-3 py-1 text-xs uppercase tracking-[0.25em] text-earth-900">
                    {t.year}
                  </div>
                  <h3 className="mt-2 font-display text-xl sm:text-2xl">{t.title}</h3>
                  <p className="mt-1 body-soft text-sm">{t.text}</p>
                </div>
                <div className={`hidden md:block ${i % 2 ? "md:order-1" : ""}`} />
                <span className="absolute left-3 top-2 h-3 w-3 -translate-x-1/2 rounded-full bg-rose-dusty md:left-1/2" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
