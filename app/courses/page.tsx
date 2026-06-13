import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import { Clock, Sparkles, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";
import ServiceTabs from "@/components/ui/ServiceTabs";
import { courses } from "@/lib/data";

export const metadata = {
  title: "Healing Sessions — Art For Soul",
  description:
    "Personalised healing sessions, follow-ups, Garbha Sanskar, Mother & Child healing and the 4-week transformation program.",
};

export default function CoursesIndex() {
  const published = courses.filter((c) => c.published);

  return (
    <>
      <PageHero
        eyebrow="Healing Sessions"
        title="Heal · Create · Transform"
        script="at your own pace."
        subtitle="One-to-one personalised sessions and programs for emotional healing, energy alignment, conscious pregnancy, mother & child development and personal transformation."
      />

      <ServiceTabs />

      <section className="container-page pb-16 sm:pb-20">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {published.map((c, i) => (
            <ScrollReveal key={c.id} delay={i * 0.08} direction="up" className="h-full">
              <Link
                href={`/courses/${c.slug}`}
                className="card-journal group flex h-full flex-col overflow-hidden p-0 transition-transform hover:-translate-y-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden sm:aspect-[5/4]">
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
                  <div className="mt-auto flex flex-nowrap items-end justify-between gap-2 pt-5">
                    <span className="flex flex-col gap-1">
                      <span className="flex items-baseline gap-2">
                        <span className="price-chip whitespace-nowrap">{formatINR(c.price)}</span>
                        {c.originalPrice ? (
                          <span className="price-strike whitespace-nowrap">{formatINR(c.originalPrice)}</span>
                        ) : null}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-earth-500">
                        {c.priceUnit ?? "per session"}
                      </span>
                    </span>
                    <span className="btn-primary shrink-0 whitespace-nowrap px-4 text-xs">View course</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-10 text-center">
          <p className="body-soft mb-4 text-sm">
            Curious about the techniques used in each session?
          </p>
          <Link href="/modalities" className="btn-ghost">
            Explore all healing modalities <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
