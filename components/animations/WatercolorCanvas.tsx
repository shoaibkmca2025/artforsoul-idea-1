/**
 * Fixed watercolor-on-canvas backdrop.
 *
 * Uses SVG turbulence + displacement filters so the colour washes have soft,
 * bleeding, organic edges — like real watercolour on paper — instead of flat
 * blurred circles. It's painted once (no animation) so it stays cheap; the
 * scroll-reactive motion in FloatingDoodles layers on top.
 */
export default function WatercolorCanvas() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{ background: "var(--cream-50)" }}
    >
      <svg
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        viewBox="0 0 1440 900"
      >
        <defs>
          {/* Watercolour bleed: warps + softens edges of each wash */}
          <filter id="wc-bleed" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.016" numOctaves="4" seed="7" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="70" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="10" />
          </filter>
          <filter id="wc-bleed-2" x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.014" numOctaves="5" seed="22" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="90" xChannelSelector="R" yChannelSelector="G" />
            <feGaussianBlur stdDeviation="14" />
          </filter>

          {/* Canvas / paper grain */}
          <filter id="paper-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="g" />
            <feColorMatrix in="g" type="matrix"
              values="0 0 0 0 0.36
                      0 0 0 0 0.26
                      0 0 0 0 0.20
                      0 0 0 0.6 0" />
          </filter>
        </defs>

        {/* ── Watercolour washes (organic bleeding edges) ── */}
        <g opacity="0.5">
          <ellipse cx="220" cy="130" rx="360" ry="280" fill="#F5D6D0" filter="url(#wc-bleed)" />
          <ellipse cx="1280" cy="170" rx="380" ry="300" fill="#C9B6DE" filter="url(#wc-bleed-2)" />
          <ellipse cx="120" cy="640" rx="320" ry="300" fill="#E8C97A" opacity="0.7" filter="url(#wc-bleed)" />
          <ellipse cx="1320" cy="760" rx="360" ry="300" fill="#F5D6D0" filter="url(#wc-bleed-2)" />
          <ellipse cx="720" cy="880" rx="460" ry="280" fill="#B4C4A0" filter="url(#wc-bleed)" />
          <ellipse cx="760" cy="380" rx="280" ry="220" fill="#E8DEF0" opacity="0.6" filter="url(#wc-bleed-2)" />
        </g>

        {/* ── Soft brush-stroke streaks ── */}
        <g opacity="0.18" filter="url(#wc-bleed)">
          <path d="M-40 300 Q 360 240 760 300 T 1480 300" stroke="#B06E8E" strokeWidth="26" fill="none" strokeLinecap="round" />
          <path d="M-40 560 Q 420 620 840 560 T 1500 560" stroke="#8FA37E" strokeWidth="22" fill="none" strokeLinecap="round" />
        </g>

        {/* ── Paper grain over everything ── */}
        <rect width="1440" height="900" filter="url(#paper-grain)" opacity="0.05" />
      </svg>
    </div>
  );
}
