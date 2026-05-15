"use client";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import SafeImage from "@/components/ui/SafeImage";

type G = { id: string; image: string; caption?: string | null; category: string };

export default function GalleryMasonry({ items }: { items: G[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>(["All"]);
    items.forEach((i) => set.add(i.category));
    return Array.from(set);
  }, [items]);

  const [active, setActive] = useState("All");
  const [selected, setSelected] = useState<G | null>(null);

  const filtered = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <section className="container-page pb-20 sm:pb-24">
      <div className="mb-8 flex flex-wrap items-center justify-center gap-2 sm:mb-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm capitalize transition-all",
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
        <motion.div layout className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4 [&>*]:break-inside-avoid">
          <AnimatePresence>
            {filtered.map((g, i) => (
              <motion.button
                layout
                key={g.id}
                onClick={() => setSelected(g)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, delay: (i % 12) * 0.04 }}
                whileHover={{ scale: 1.02 }}
                className="block w-full overflow-hidden rounded-2xl border-4 border-cream-50 shadow-soft"
                style={{ rotate: `${(i % 5 - 2) * 0.6}deg` }}
              >
                <SafeImage src={g.image} alt="" className="block w-full" />
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-earth-900/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="relative max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close"
                onClick={() => setSelected(null)}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-cream-50/90 text-earth-900"
              >
                <X className="h-4 w-4" />
              </button>
              <SafeImage src={selected.image} alt="" className="block w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
