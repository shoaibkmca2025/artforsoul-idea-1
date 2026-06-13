"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { cn, safeJson } from "@/lib/utils";
import { X, MapPin, Calendar, ArrowLeft } from "lucide-react";

/* ──────────────────────────── types ──────────────────────────── */

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

/* ──────────── category definitions (label + image) ──────────── */

const CATEGORIES = [
  {
    label: "Canvas Paintings",
    image: "/images/categories/canvas-paintings.png",
  },
  {
    label: "Wall Art",
    image: "/images/categories/wall-art.png",
  },
  {
    label: "Mix Media Art",
    image: "/images/categories/mix-media-art.png",
  },
  {
    label: "Texture Art",
    image: "/images/categories/texture-art.png",
  },
  {
    label: "Resin Art",
    image: "/images/categories/resin-art.png",
  },
  {
    label: "Furniture Painting Makeover & Restoration",
    image: "/images/categories/furniture-restoration.png",
  },
  {
    label: "Textured Wall Panels",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=900&q=70",
  },
  {
    label: "Customised Paintings & Artwork",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=900&q=70",
  },
  {
    label: "Vastu & Feng Shui Based Art",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=900&q=70",
  },
];

/* ───────────────────── component ───────────────────── */

export default function ArtStudiozSection({ items }: { items: Item[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<Item | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory
    ? items.filter((i) => i.category === activeCategory)
    : [];

  const handleCategoryClick = (label: string) => {
    setActiveCategory(label);
    // Scroll to the gallery section smoothly
    setTimeout(() => {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      {/* ═══════ Category Cards Grid ═══════ */}
      <section className="container-page pb-6 sm:pb-10">
        <motion.div
          layout
          className="mx-auto grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5"
        >
          {CATEGORIES.map((cat, i) => {
            const isActive = activeCategory === cat.label;
            return (
              <motion.button
                key={cat.label}
                onClick={() => handleCategoryClick(cat.label)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -5, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border-2 transition-all duration-300",
                  isActive
                    ? "border-plum-600 shadow-lg shadow-plum-200/40 ring-2 ring-plum-400/30"
                    : "border-earth-200/50 shadow-soft hover:border-plum-300/60 hover:shadow-md"
                )}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className={cn(
                      "h-full w-full object-cover transition-transform duration-700",
                      isActive
                        ? "scale-105"
                        : "group-hover:scale-110"
                    )}
                  />
                  {/* Gradient overlay */}
                  <div
                    className={cn(
                      "absolute inset-0 transition-all duration-300",
                      isActive
                        ? "bg-gradient-to-t from-plum-900/80 via-plum-800/30 to-transparent"
                        : "bg-gradient-to-t from-earth-900/70 via-earth-900/20 to-transparent"
                    )}
                  />

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="active-badge"
                      className="absolute right-2 top-2 rounded-full bg-plum-600 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-white shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      Viewing
                    </motion.div>
                  )}
                </div>

                {/* Label */}
                <div
                  className={cn(
                    "absolute bottom-0 left-0 right-0 px-3 py-2.5 text-left transition-all duration-300 sm:px-4 sm:py-3",
                  )}
                >
                  <span
                    className={cn(
                      "text-xs font-semibold leading-tight sm:text-sm",
                      isActive ? "text-white" : "text-cream-50"
                    )}
                  >
                    {cat.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </motion.div>
      </section>

      {/* ═══════ Filtered Gallery (visible only when a category is selected) ═══════ */}
      <AnimatePresence>
        {activeCategory && (
          <motion.section
            ref={gridRef}
            key={activeCategory}
            className="container-page pb-20 sm:pb-24"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Header with back button */}
            <div className="mb-8 flex flex-col items-center gap-3 text-center sm:mb-10">
              <button
                onClick={() => setActiveCategory(null)}
                className="inline-flex items-center gap-1.5 rounded-full border border-earth-300/50 bg-cream-50/80 px-4 py-2 text-sm font-medium text-earth-700 backdrop-blur transition-all hover:border-plum-300 hover:bg-plum-50 hover:text-plum-700"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                All Categories
              </button>
              <h2 className="heading-display text-2xl text-earth-900 sm:text-3xl">
                {activeCategory}
              </h2>
              <p className="body-soft max-w-lg text-sm">
                {filtered.length} artwork{filtered.length !== 1 ? "s" : ""} in this collection
              </p>
            </div>

            {/* Grid */}
            <LayoutGroup>
              <motion.div
                layout
                className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {filtered.map((item, i) => (
                    <motion.button
                      layout
                      key={item.id}
                      onClick={() => setSelected(item)}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{
                        duration: 0.6,
                        delay: (i % 6) * 0.05,
                        ease: [0.22, 1, 0.36, 1],
                      }}
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
                          <div className="text-[11px] uppercase tracking-[0.3em] opacity-80">
                            {item.category}
                          </div>
                          <div className="font-display text-xl">{item.title}</div>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </AnimatePresence>
              </motion.div>
            </LayoutGroup>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ═══════ Lightbox Detail Modal ═══════ */}
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
                <img
                  src={selected.coverImage}
                  alt={selected.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <div className="text-xs uppercase tracking-[0.3em] text-earth-500">
                    {selected.category}
                  </div>
                  <h3 className="mt-2 heading-display text-3xl">
                    {selected.title}
                  </h3>
                  <p className="mt-4 body-soft">{selected.description}</p>
                </div>
                <div className="space-y-3 text-sm">
                  {selected.location && (
                    <div className="flex items-center gap-2 text-earth-700">
                      <MapPin className="h-4 w-4" /> {selected.location}
                    </div>
                  )}
                  {selected.year && (
                    <div className="flex items-center gap-2 text-earth-700">
                      <Calendar className="h-4 w-4" /> {selected.year}
                    </div>
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
                    <img
                      src={img}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
