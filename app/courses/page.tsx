import { prisma } from "@/lib/prisma";
import PageHero from "@/components/ui/PageHero";
import Link from "next/link";
import { formatINR } from "@/lib/utils";
import { Clock, Sparkles } from "lucide-react";
import ScrollReveal from "@/components/animations/ScrollReveal";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Online Courses — Art For Soul",
  description: "Live cohorts and self-paced online courses for healing through art.",
};

export default async function CoursesIndex() {
  const courses = await prisma.course.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <PageHero
        eyebrow="Online courses"
        title="Learn at your"
        script="soft, soulful pace."
        subtitle="Live and self-paced courses on art therapy, watercolor, journaling and soulful interior styling. Lifetime access. Tender community."
      />

      <section className="container-page pb-20 sm:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {courses.map((c, i) => (
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
                  <div className="mt-5 flex items-baseline justify-between">
                    <div className="flex items-baseline gap-2">
                      <span className="font-display text-2xl text-earth-900">{formatINR(c.price)}</span>
                      {c.originalPrice ? (
                        <span className="text-xs text-earth-500 line-through">{formatINR(c.originalPrice)}</span>
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
    </>
  );
}
