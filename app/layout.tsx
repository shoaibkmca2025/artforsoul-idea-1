import type { Metadata, Viewport } from "next";
import { Caveat, Fraunces, Plus_Jakarta_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/animations/SmoothScrollProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FloatingDoodles from "@/components/animations/FloatingDoodles";
import { Toaster } from "sonner";

const script = Caveat({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-script", display: "swap" });
const display = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  variable: "--font-display",
  display: "swap",
});
const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-body",
  display: "swap",
});
const hand = Dancing_Script({ subsets: ["latin"], variable: "--font-hand", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FBF7F0",
};

export const metadata: Metadata = {
  title: "Art For Soul — Heal · Create · Transform · Align",
  description:
    "Art For Soul is a healing studio offering personalised one-to-one and group sessions for emotional healing, art therapy, energy alignment, Garbha Sanskar, mother & child development and personal transformation.",
  keywords: [
    "pranic healing",
    "sound healing",
    "chakra healing",
    "art therapy",
    "mandala art",
    "garbha sanskar",
    "vastu shastra",
    "mother child development",
    "energy healing",
    "transformation program",
  ],
  openGraph: {
    title: "Art For Soul",
    description: "Heal · Create · Transform · Align",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${script.variable} ${display.variable} ${body.variable} ${hand.variable}`}>
      <body className="min-h-screen antialiased">
        <SmoothScrollProvider>
          <FloatingDoodles />
          <Navigation />
          <main className="relative">{children}</main>
          <Footer />
        </SmoothScrollProvider>
        <Toaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
