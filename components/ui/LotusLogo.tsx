type Props = {
  className?: string;
};

/** Watercolor-style lotus mark used as the site logo */
export default function LotusLogo({ className = "h-6 w-6" }: Props) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="lotus-petal" x1="8" y1="8" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E8B4B8" />
          <stop offset="55%" stopColor="#A48BC4" />
          <stop offset="100%" stopColor="#8E4A6B" />
        </linearGradient>
        <linearGradient id="lotus-center" x1="18" y1="14" x2="30" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F5E7C1" />
          <stop offset="100%" stopColor="#C9A227" />
        </linearGradient>
      </defs>

      {/* Outer petals */}
      <path
        d="M9 30c0-7 4-13 7.5-16.5C18 19 18.5 25 16.5 30.5 14 35 11 35.5 9 30z"
        fill="url(#lotus-petal)"
        opacity="0.75"
      />
      <path
        d="M39 30c0-7-4-13-7.5-16.5C30 19 29.5 25 31.5 30.5 34 35 37 35.5 39 30z"
        fill="url(#lotus-petal)"
        opacity="0.75"
      />
      {/* Mid petals */}
      <path
        d="M15 32c-1-8 2.5-15.5 6-19 2.5 5 3 13 1 18.5-2.2 5-5.5 5-7 .5z"
        fill="url(#lotus-petal)"
        opacity="0.9"
      />
      <path
        d="M33 32c1-8-2.5-15.5-6-19-2.5 5-3 13-1 18.5 2.2 5 5.5 5 7 .5z"
        fill="url(#lotus-petal)"
        opacity="0.9"
      />
      {/* Center petal */}
      <path
        d="M24 8c3.5 5 5 11.5 5 16.5S26.5 34 24 36c-2.5-2-5-6.5-5-11.5S20.5 13 24 8z"
        fill="url(#lotus-center)"
      />
      {/* Base curve */}
      <path
        d="M12 36c3.5 3 8 4.5 12 4.5s8.5-1.5 12-4.5c-2 5-7 7.5-12 7.5s-10-2.5-12-7.5z"
        fill="url(#lotus-petal)"
      />
    </svg>
  );
}
