"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn, safeJson } from "@/lib/utils";
import { X, MapPin, Calendar } from "lucide-react";

type Item = {
  id: string;
  title: string;
  slug: string;
  category: string;
  location?: string | null;
  year?: string | null;
  description: string;
  coverImage: string;
  images: string;
};

export default function PortfolioGrid({ items }: { items: Item[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    items.forEach((i) => set.add(i.category));
    return Array.from(set);
  }, [items]);

  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<Item | null>(null);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section className="container-page pb-20 sm:pb-24">
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-all",
              active === c
                ? "border-earth-700 bg-earth-700 text-cream-50"
                : "border-earth-300/50 bg-cream-50/70 text-earth-700 hover:bg-cream-100"
            )}
          >
            {c}
          </button>
        ))}
      </div>

      <LayoutGroup>
        <motion.div layout className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.button
                layout
                key={item.id}
                onClick={() => setSelected(item)}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6, delay: (i % 6) * 0.05, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                className="group relative text-left"
              >
                <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border-4 border-cream-50 shadow-soft">
                  <motion.img
                    src={item.coverImage}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 1.2 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-900/60 via-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-cream-50">
                    <div className="text-[11px] uppercase tracking-[0.3em] opacity-80">{item.category}</div>
                    <div className="font-display text-xl">{item.title}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-earth-900/60 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative max-h-[92vh] w-full max-w-4xl overflow-y-auto overscroll-contain rounded-3xl bg-cream-50 p-4 shadow-journal sm:p-6"
              initial={{ scale: 0.95, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full bg-cream-100 text-earth-900 hover:bg-rose-soft"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="aspect-[16/9] overflow-hidden rounded-2xl">
                <img src={selected.coverImage} alt={selected.title} className="h-full w-full object-cover" />
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <div className="text-xs uppercase tracking-[0.3em] text-earth-500">{selected.category}</div>
                  <h3 className="mt-2 heading-display text-3xl">{selected.title}</h3>
                  <p className="mt-4 body-soft">{selected.description}</p>
                </div>
                <div className="space-y-3 text-sm">
                  {selected.location && (
                    <div className="flex items-center gap-2 text-earth-700"><MapPin className="h-4 w-4" /> {selected.location}</div>
                  )}
                  {selected.year && (
                    <div className="flex items-center gap-2 text-earth-700"><Calendar className="h-4 w-4" /> {selected.year}</div>
                  )}
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {safeJson<string[]>(selected.images, []).map((img, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="overflow-hidden rounded-2xl"
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
