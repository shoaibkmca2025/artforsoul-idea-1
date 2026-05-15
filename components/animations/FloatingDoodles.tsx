"use client";

import { motion } from "framer-motion";

/**
 * Soft, full-page background doodles + watercolor blobs.
 * Pure SVG/CSS, no images required. Pointer-events disabled so they never
 * block UI.
 */
export default function FloatingDoodles() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-0 overflow-hidden opacity-70 sm:opacity-100">
      {/* Watercolor blobs */}
      <div className="watercolor-blob absolute -top-20 -left-24 h-[28rem] w-[28rem] bg-rose-soft" />
      <div className="watercolor-blob absolute top-[40%] -right-24 h-[26rem] w-[26rem] bg-lavender-300" />
      <div className="watercolor-blob absolute bottom-[-6rem] left-[20%] h-[24rem] w-[24rem] bg-sage-300" />

      {/* Floating doodles */}
      <motion.svg
        className="absolute left-[8%] top-[18%] h-16 w-16 text-earth-300/60"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        animate={{ y: [0, -10, 0], rotate: [0, 6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M10 32 Q22 12, 32 32 T 54 32" />
        <path d="M14 44 Q24 36, 32 44 T 50 44" />
      </motion.svg>

      <motion.svg
        className="absolute right-[10%] top-[28%] h-20 w-20 text-rose-dusty/70"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={{ y: [0, 14, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M32 12 C 40 22, 40 32, 32 42 C 24 32, 24 22, 32 12 Z" />
        <path d="M32 42 V56" />
      </motion.svg>

      <motion.svg
        className="absolute left-[55%] bottom-[10%] h-16 w-16 text-sage-500/70"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      >
        <circle cx="32" cy="32" r="6" />
        <path d="M32 10v8M32 46v8M10 32h8M46 32h8M16 16l6 6M42 42l6 6M48 16l-6 6M16 48l6-6" />
      </motion.svg>

      <motion.svg
        className="absolute right-[18%] bottom-[18%] h-20 w-20 text-lavender-500/60"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        animate={{ y: [0, 12, 0], rotate: [0, -6, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      >
        <path d="M14 50 Q20 30, 32 30 T 50 14" />
        <circle cx="14" cy="50" r="2.5" />
        <circle cx="50" cy="14" r="2.5" />
      </motion.svg>
    </div>
  );
}
