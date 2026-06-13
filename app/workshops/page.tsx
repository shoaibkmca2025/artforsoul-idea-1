import PageHero from "@/components/ui/PageHero";
import ScrollReveal from "@/components/animations/ScrollReveal";
import Link from "next/link";
import { workshopEvents, upcomingWorkshops } from "@/lib/data";
import { MapPin, CalendarDays, Clock, ArrowRight } from "lucide-react";

export const metadata = { title: "Workshops & Events — Art For Soul" };
export const dynamic = "force-dynamic";

export default function WorkshopsPage() {
  return (
    <>
      <PageHero
        eyebrow="Members · Workshops & Events"
        title="Circles, workshops"
        script="& retreats."
        subtitle="A soulful space to heal, connect, create & grow together. Explore our past gatherings and upcoming workshops — and register your interest."
      />

      {/* Upcoming — registerable */}
      <section className="container-page pb-12 sm:pb-16">
        <ScrollReveal>
          <h2 className="heading-display text-3xl sm:text-4xl">
            Upcoming <span className="heading-script text-plum-500">workshops</span>
          </h2>
        </ScrollReveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {upcomingWorkshops.map((w, i) => (
            <ScrollReveal key={w.id} delay={i * 0.08} className="h-full">
              <div className="card-journal group flex h-full flex-col overflow-hidden p-0">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img src={w.image} alt={w.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-cream-50/85 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-earth-700 backdrop-blur">
                    {w.format}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl text-earth-900">{w.title}</h3>
                  <div className="mt-2 space-y-1 text-xs text-earth-500">
                    <p className="inline-flex items-center gap-1.5"><MapPin className="h-3 w-3" /> {w.mode}</p>
                    <p className="inline-flex items-center gap-1.5"><Clock className="h-3 w-3" /> {w.when}</p>
                  </div>
                  <Link href="/contact" className="btn-primary mt-4 w-full text-sm">
                    Register interest
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Past gatherings gallery */}
      <section className="container-page pb-20 sm:pb-24">
        <ScrollReveal>
          <h2 className="heading-display text-3xl sm:text-4xl">
            Past <span className="heading-script text-rose-dusty">gatherings</span>
          </h2>
        </ScrollReveal>
        <div className="mt-8 grid auto-rows-[180px] grid-cols-2 gap-3 sm:auto-rows-[230px] sm:gap-4 lg:grid-cols-4">
          {workshopEvents.map((ev, i) => {
            const big = i === 0 || i === 3;
            return (
              <div
                key={ev.id}
                className={`group relative overflow-hidden rounded-2xl border-[5px] border-cream-50 shadow-journal sm:rounded-3xl ${big ? "row-span-2" : ""}`}
              >
                <img src={ev.image} alt={ev.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-plum-900/75 via-plum-900/10 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-cream-50 sm:p-4">
                  <h3 className="font-display text-base leading-tight sm:text-lg">{ev.title}</h3>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-[11px] text-cream-100/85">
                    {ev.location && <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {ev.location}</span>}
                    {ev.date && <span className="inline-flex items-center gap-1"><CalendarDays className="h-3 w-3" /> {ev.date}</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link href="/contact" className="btn-primary">
            Join the next gathering <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
