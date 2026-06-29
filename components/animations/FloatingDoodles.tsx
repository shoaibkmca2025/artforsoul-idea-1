/**
 * Lightweight ambient background.
 *
 * Pure CSS animations (transform-only, via Tailwind keyframes) — no scroll
 * listeners, no mouse tracking, no animated blurs. A handful of soft doodles
 * keep the page feeling alive while staying cheap to render and smooth to
 * scroll. The colour wash itself is painted once in globals.css (body::after).
 */
export default function FloatingDoodles() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-0 overflow-hidden">
      {/* Two soft, static depth blobs — hidden on phones (blur-3xl is GPU-heavy
          on low-end Android; the painted watercolor wash already covers it) */}
      <div className="absolute -left-32 -top-32 hidden h-96 w-96 rounded-full bg-rose-soft/30 blur-3xl sm:block" />
      <div className="absolute -right-32 top-1/3 hidden h-96 w-96 rounded-full bg-lavender-300/25 blur-3xl sm:block" />

      {/* A few gentle floating doodles — CSS-only infinite motion */}
      <svg
        className="animate-floaty absolute left-[6%] top-[16%] h-12 w-12 text-earth-300/45 sm:h-16 sm:w-16"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      >
        <path d="M10 32 Q22 12, 32 32 T 54 32" />
        <path d="M14 44 Q24 36, 32 44 T 50 44" />
      </svg>

      <svg
        className="animate-drift absolute right-[9%] top-[10%] h-14 w-14 text-rose-dusty/45 sm:h-20 sm:w-20"
        viewBox="0 0 64 64"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M32 12 C 40 22, 40 32, 32 42 C 24 32, 24 22, 32 12 Z" />
        <path d="M32 42 V56" />
      </svg>

      <svg
        className="animate-floaty absolute left-[55%] top-[78%] hidden h-12 w-12 text-sage-500/45 sm:block"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ animationDelay: "1.5s" }}
      >
        <path d="M12 2c2.5 3.2 3.2 6.4 0 10-3.2-3.6-2.5-6.8 0-10z" />
      </svg>

      <svg
        className="animate-drift absolute right-[18%] bottom-[12%] hidden h-10 w-10 text-gold-500/50 sm:block"
        viewBox="0 0 24 24"
        fill="currentColor"
        style={{ animationDelay: "2.5s" }}
      >
        <path d="M12 2l1.5 6.5L20 10l-6.5 1.5L12 18l-1.5-6.5L4 10l6.5-1.5L12 2z" />
      </svg>
    </div>
  );
}
