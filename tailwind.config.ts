import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FBF7F0",
          100: "#F7F0E4",
          200: "#F0E5D2",
          300: "#E8D9BD",
        },
        rose: {
          soft: "#F5D6D0",
          dusty: "#E8B4B8",
          blush: "#F2C4C0",
        },
        earth: {
          50: "#EEE3D3",
          100: "#D9C2A4",
          300: "#B08968",
          500: "#8C6A4F",
          700: "#5E4434",
          900: "#3A2A20",
        },
        sage: {
          100: "#DDE5D5",
          300: "#B4C4A0",
          500: "#8FA37E",
          700: "#5F7350",
        },
        lavender: {
          100: "#E8DEF0",
          300: "#C9B6DE",
          500: "#A48BC4",
        },
        plum: {
          300: "#B06E8E",
          500: "#8E4A6B",
          700: "#6B2D52",
          900: "#4A1E3A",
        },
        gold: {
          100: "#F5E7C1",
          300: "#E8C97A",
          500: "#C9A227",
          700: "#A07E1C",
        },
        ink: "#3A2A20",
      },
      fontFamily: {
        script: ["var(--font-script)", "cursive"],
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      backgroundImage: {
        "paper-grain":
          "radial-gradient(circle at 20% 10%, rgba(176,137,104,0.08) 0, transparent 40%), radial-gradient(circle at 80% 70%, rgba(143,163,126,0.06) 0, transparent 40%)",
      },
      boxShadow: {
        soft: "0 10px 40px -10px rgba(94, 68, 52, 0.15)",
        journal: "0 2px 0 #d9c2a4, 0 12px 30px -10px rgba(94,68,52,0.25)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translateY(0) rotate(0)" },
          "50%": { transform: "translateY(-12px) rotate(3deg)" },
        },
        drift: {
          "0%,100%": { transform: "translate(0,0)" },
          "50%": { transform: "translate(20px,-15px)" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        drift: "drift 10s ease-in-out infinite",
        wiggle: "wiggle 3s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
