import type { Metadata, Viewport } from "next";
import { Caveat, Cormorant_Garamond, Quicksand, Dancing_Script } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/animations/SmoothScrollProvider";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import FloatingDoodles from "@/components/animations/FloatingDoodles";
import { Toaster } from "sonner";

const script = Caveat({ subsets: ["latin"], variable: "--font-script", display: "swap" });
const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-display", display: "swap" });
const body = Quicksand({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const hand = Dancing_Script({ subsets: ["latin"], variable: "--font-hand", display: "swap" });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FBF7F0",
};

export const metadata: Metadata = {
  title: "Art For Soul — Let Your Art Speak & Your Soul Heal",
  description:
    "Art For Soul is a creative healing studio offering art therapy, workshops, soulful interiors and online courses. A soft place to feel, create and come home to yourself.",
  keywords: ["art therapy", "healing", "interior design", "art workshops", "creative wellness", "online art courses"],
  openGraph: {
    title: "Art For Soul",
    description: "Create. Feel. Heal.",
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
