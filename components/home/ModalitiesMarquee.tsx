"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  AudioWaveform,
  CircleDot,
  Gem,
  Hand,
  Wind,
  PersonStanding,
  Target,
  Smile,
  Baby,
  Palette,
  Flower,
  Layers,
  HandMetal,
  NotebookPen,
  Music,
  Brush,
  Compass,
  Sun,
  Heart,
  Coins,
  Image as ImageIcon,
  Star,
  Users,
} from "lucide-react";

const modalities = [
  { icon: Sparkles,        label: "Pranic Healing",      color: "bg-rose-soft/70" },
  { icon: AudioWaveform,   label: "Sound Healing",       color: "bg-sage-300/70" },
  { icon: CircleDot,       label: "Chakra Healing",      color: "bg-lavender-300/70" },
  { icon: Gem,             label: "Crystal Healing",     color: "bg-rose-dusty/70" },
  { icon: Hand,            label: "Mudra Therapy",       color: "bg-cream-200" },
  { icon: Wind,            label: "Pranayama",           color: "bg-sage-300/70" },
  { icon: PersonStanding,  label: "Therapeutic Yoga",    color: "bg-rose-soft/70" },
  { icon: Target,          label: "Acupressure",         color: "bg-lavender-300/70" },
  { icon: Smile,           label: "Face Yoga",           color: "bg-cream-200" },
  { icon: Baby,            label: "Inner Child Healing", color: "bg-rose-dusty/70" },
  { icon: Palette,         label: "Art Therapy",         color: "bg-sage-300/70" },
  { icon: Flower,          label: "Mandala Art",         color: "bg-lavender-300/70" },
  { icon: Layers,          label: "Texture Art",         color: "bg-rose-soft/70" },
  { icon: HandMetal,       label: "Clay Molding",        color: "bg-cream-200" },
  { icon: NotebookPen,     label: "Journaling",          color: "bg-sage-300/70" },
  { icon: Music,           label: "Music Therapy",       color: "bg-rose-dusty/70" },
  { icon: Brush,           label: "Healing Paintings",   color: "bg-lavender-300/70" },
  { icon: Compass,         label: "Vastu Shastra",       color: "bg-rose-soft/70" },
  { icon: Sun,             label: "Feng Shui",           color: "bg-sage-300/70" },
  { icon: Heart,           label: "Garbha Sanskar",      color: "bg-rose-dusty/70" },
  { icon: Coins,           label: "Money Manifestation", color: "bg-cream-200" },
  { icon: ImageIcon,       label: "Vision Board",        color: "bg-lavender-300/70" },
  { icon: Star,            label: "Personality Dev",     color: "bg-rose-soft/70" },
  { icon: Users,           label: "Parenting Guidance",  color: "bg-sage-300/70" },
];

export default function ModalitiesMarquee() {
  // duplicate the list so the loop is seamless
  const list = [...modalities, ...modalities];

  return (
    <section className="relative overflow-hidden border-y border-earth-300/40 bg-cream-100/50 py-8 sm:py-10">
      <div className="container-page mb-5 text-center sm:mb-7">
        <div className="pill mx-auto mb-2">
          <Sparkles className="h-3.5 w-3.5" /> 24+ healing modalities
        </div>
        <h3 className="font-display text-xl text-earth-900 sm:text-2xl">
          One studio · <span className="heading-script text-rose-dusty">every way to heal</span>
        </h3>
      </div>

      <div className="relative">
        {/* fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream-100 to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream-100 to-transparent sm:w-24" />

        <motion.div
          className="flex w-max items-center gap-3 px-4 sm:gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        >
          {list.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={i}
                whileHover={{ y: -4, rotate: 2 }}
                className="flex items-center gap-2.5 rounded-full border border-earth-300/40 bg-cream-50/85 px-4 py-2.5 shadow-soft backdrop-blur sm:gap-3 sm:px-5 sm:py-3"
              >
                <span
                  className={`grid h-9 w-9 place-items-center rounded-full ${m.color} text-earth-900 sm:h-10 sm:w-10`}
                >
                  <Icon className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={1.6} />
                </span>
                <span className="whitespace-nowrap text-sm font-medium text-earth-900 sm:text-base">
                  {m.label}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
