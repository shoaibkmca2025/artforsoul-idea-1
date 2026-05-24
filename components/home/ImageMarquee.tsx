"use client";

import { motion } from "framer-motion";

const images = [
  { src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80", caption: "Art Therapy" },
  { src: "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?w=800&q=80", caption: "Mandala Art" },
  { src: "https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80", caption: "Creative Healing" },
  { src: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80", caption: "Journaling" },
  { src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&q=80", caption: "Journal Pages" },
  { src: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80", caption: "Energy Art" },
  { src: "https://images.unsplash.com/photo-1531913764164-f85c52e6e654?w=800&q=80", caption: "Sound Healing" },
  { src: "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=800&q=80", caption: "Wellness" },
  { src: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&q=80", caption: "Watercolor" },
  { src: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80", caption: "Meditation" },
];

type Props = {
  direction?: "left" | "right";
  speed?: number;
};

export default function ImageMarquee({ direction = "left", speed = 50 }: Props) {
  const list = [...images, ...images];
  const xAnim = direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"];

  return (
    <section className="relative overflow-hidden py-8 sm:py-12">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[var(--cream-50)] to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[var(--cream-50)] to-transparent sm:w-32" />

        <motion.div
          className="flex w-max items-center gap-4 px-4 sm:gap-6"
          animate={{ x: xAnim }}
          transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
        >
          {list.map((img, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className={`relative h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl border-[5px] border-cream-50 shadow-journal sm:h-56 sm:w-56 ${
                i % 3 === 0 ? "rotate-[-2deg]" : i % 3 === 1 ? "rotate-[1.5deg]" : "rotate-[-1deg]"
              }`}
            >
              <img src={img.src} alt={img.caption} className="h-full w-full object-cover" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-earth-900/55 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 text-[10px] uppercase tracking-[0.2em] text-cream-50 sm:bottom-3 sm:left-3 sm:text-xs">
                {img.caption}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
