"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Mail, MessageCircle, Heart, ArrowUpRight } from "lucide-react";
import LotusLogo from "@/components/ui/LotusLogo";

const wa = process.env.NEXT_PUBLIC_WHATSAPP || "+919834040231";
const ig = process.env.NEXT_PUBLIC_INSTAGRAM || "https://www.instagram.com/artforsoul.in";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="relative mt-16 overflow-hidden border-t border-earth-300/40 bg-cream-100/70 backdrop-blur sm:mt-24">
      <div className="container-page grid gap-10 py-12 sm:gap-12 sm:py-16 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-rose-soft via-cream-100 to-lavender-100 shadow-soft ring-1 ring-gold-300/60">
              <LotusLogo className="h-8 w-8" />
            </span>
            <div className="leading-tight">
              <div className="font-script text-3xl text-plum-700 sm:text-4xl">Art For Soul</div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-gold-700">
                Heal · Create · Transform
              </div>
            </div>
          </div>
          <p className="mt-4 max-w-md body-soft">
            Healing · Art · Energy Alignment · Personal Transformation. A studio
            for personalised one-to-one and group sessions designed to help you
            heal, create, transform and align.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={`https://wa.me/${wa.replace(/[^0-9]/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="btn-ghost text-sm"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
            <a href={ig} target="_blank" rel="noreferrer" className="btn-ghost text-sm">
              <Instagram className="h-4 w-4" /> Instagram
            </a>
            <a href="mailto:artforsoul.in@gmail.com" className="btn-ghost text-sm">
              <Mail className="h-4 w-4" /> Email
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-lg text-earth-900">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-earth-700/90">
            <li><Link href="/about-studio" className="hover:text-earth-900">About Art For Soul</Link></li>
            <li><Link href="/about" className="hover:text-earth-900">Meet the Founder</Link></li>
            <li><Link href="/portfolio" className="hover:text-earth-900">Art Studioz</Link></li>
            <li><Link href="/courses" className="hover:text-earth-900">Sessions</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-lg text-earth-900">Visit</h4>
          <ul className="mt-3 space-y-2 text-sm text-earth-700/90">
            <li><Link href="/contact" className="hover:text-earth-900">Contact</Link></li>
            <li><Link href="/admin/login" className="inline-flex items-center gap-1 hover:text-earth-900">Studio Admin <ArrowUpRight className="h-3 w-3" /></Link></li>
          </ul>
          <p className="mt-6 text-xs uppercase tracking-[0.3em] text-earth-500">
            www.artforsoul.in
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-plum-900 via-plum-700 to-plum-900 py-5">
        <div className="container-page flex flex-col items-center justify-between gap-2 text-xs text-cream-100/90 md:flex-row">
          <p>© {new Date().getFullYear()} Art For Soul. All hearts reserved.</p>
          <p className="text-cream-100/70">
            Digitally designed by <span className="font-medium text-cream-100">4AM Global Media</span>
          </p>
          <p className="inline-flex items-center gap-1 font-script text-base text-gold-300">
            You deserve to heal, grow &amp; thrive
            <Heart className="ml-1 h-3 w-3 fill-gold-300 text-gold-300" />
          </p>
        </div>
      </div>
    </footer>
  );
}
