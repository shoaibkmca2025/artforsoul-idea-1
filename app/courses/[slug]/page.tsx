import { notFound } from "next/navigation";
import { formatINR, safeJson } from "@/lib/utils";
import ScrollReveal from "@/components/animations/ScrollReveal";
import EnrollForm from "./EnrollForm";
import BookSessionButton from "@/components/BookSessionButton";
import { Clock, Layers, Sparkles, CheckCircle2 } from "lucide-react";
import { courses } from "@/lib/data";

type Module = { title: string; lessons: string[] };

export default function CourseDetail({ params }: { params: { slug: string } }) {
  const course = courses.find((c) => c.slug === params.slug);
  if (!course || !course.published) return notFound();

  const modules = safeJson<Module[]>(course.modules, []);
  const outcomes = safeJson<string[]>(course.outcomes, []);

  return (
    <article className="pb-20 sm:pb-24">
      <section className="container-page pt-28 sm:pt-32">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <ScrollReveal direction="left">
              <div className="relative mx-auto aspect-[5/6] max-w-md overflow-hidden rounded-[1.75rem] border-[6px] border-cream-50 shadow-journal sm:rounded-[2rem] sm:border-8 lg:max-w-none">
                <img src={course.coverImage} alt={course.title} className="h-full w-full object-cover" />
              </div>
            </ScrollReveal>
            <div className="absolute bottom-2 right-2 rotate-[3deg] rounded-2xl bg-rose-soft/90 px-3 py-2 font-script text-lg text-earth-900 shadow-soft sm:-bottom-6 sm:-right-6 sm:px-5 sm:py-3 sm:text-2xl">
              ✿ heal as you learn
            </div>
          </div>

          <div>
            <ScrollReveal>
              <div className="pill mb-4"><Sparkles className="h-3.5 w-3.5" /> Course</div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="heading-display text-3xl sm:text-4xl md:text-5xl">{course.title}</h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="mt-3 font-script text-2xl text-rose-dusty sm:text-3xl">{course.tagline}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <p className="mt-5 body-soft">{course.description}</p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="mt-6 flex flex-wrap gap-2 text-sm">
                <span className="pill"><Clock className="h-3 w-3" /> {course.duration}</span>
                <span className="pill"><Layers className="h-3 w-3" /> {course.level}</span>
                <span className="pill">{modules.length} modules</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.5}>
              <div className="mt-7 flex flex-wrap items-baseline gap-3 sm:mt-8">
                <span className="price-chip-large">{formatINR(course.price)}</span>
                {course.originalPrice ? (
                  <span className="price-strike">{formatINR(course.originalPrice)}</span>
                ) : null}
                <span className="text-xs uppercase tracking-[0.25em] text-earth-500">
                  {course.priceUnit ?? "per session"}
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.55}>
              <div className="mt-6 flex flex-wrap gap-3">
                <BookSessionButton
                  slug={course.slug}
                  label={`Book & Pay · ${formatINR(course.price)} ${course.priceUnit ?? "per session"}`}
                />
              </div>
              <p className="mt-2 text-xs text-earth-500">
                Secure online payment · You'll need a free account to save &amp; access your sessions.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.6}>
              <div className="mt-6 rounded-3xl border border-earth-300/40 bg-cream-50/85 p-6 shadow-soft backdrop-blur">
                <h3 className="font-display text-xl text-earth-900">Prefer to enquire first?</h3>
                <p className="mt-1 text-sm body-soft">Leave your details and we'll guide you through the next step — no payment needed to enquire.</p>
                <div className="mt-4">
                  <EnrollForm courseId={course.id} courseTitle={course.title} />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="container-page mt-16 sm:mt-20">
        <ScrollReveal>
          <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl">What you'll <span className="heading-script text-rose-dusty">walk away with</span></h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {outcomes.map((o, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <div className="flex items-start gap-3 rounded-2xl border border-earth-300/40 bg-cream-50/80 p-5 shadow-soft">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sage-500" strokeWidth={1.6} />
                <p className="body-soft text-sm">{o}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="container-page mt-16 sm:mt-20">
        <ScrollReveal>
          <h2 className="heading-display text-2xl sm:text-3xl md:text-4xl">Course <span className="heading-script text-rose-dusty">syllabus</span></h2>
        </ScrollReveal>
        <div className="mt-8 space-y-4">
          {modules.map((m, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <details className="group rounded-2xl border border-earth-300/40 bg-cream-50/85 p-5 shadow-soft transition-all open:bg-cream-50">
                <summary className="cursor-pointer list-none font-display text-xl text-earth-900">
                  <span className="mr-3 inline-block rounded-full bg-rose-soft/80 px-3 py-1 text-xs uppercase tracking-[0.2em] text-earth-900">
                    Module {i + 1}
                  </span>
                  {m.title}
                </summary>
                <ul className="mt-4 list-disc space-y-1.5 pl-6 text-sm body-soft">
                  {m.lessons.map((l, k) => <li key={k}>{l}</li>)}
                </ul>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </article>
  );
}
