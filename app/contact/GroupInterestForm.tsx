"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const INTERESTS = [
  "🎨 Art Therapy Workshops",
  "🌿 Group Healing Sessions",
  "🎶 Sound Healing Sessions",
  "🧘 Meditation & Mindfulness Circles",
  "💛 Emotional Wellness Workshops",
  "👩 Women Wellness Circles",
  "🤱 Mother & Child Sessions",
  "🤰 Pregnancy Wellness Sessions",
  "🌼 Garbha Sanskar Group Sessions",
  "👨‍👩‍👧 Parenting Workshops",
  "✨ Creative Healing Gatherings",
  "🌿 Healing Retreats",
];

const FORMATS = [
  "🌸 2–3 Hour Group Session",
  "☀️ Half-Day Workshop",
  "🌿 Full-Day Workshop",
  "✨ 1-Day Retreat",
  "🌙 2-Day Retreat",
  "💻 Online Sessions",
  "📍 Offline / In-Person Sessions",
];

const DAYS = ["🌼 Weekdays", "🌸 Weekends"];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex items-center gap-2 border-t border-earth-300/40 pt-5 first:mt-0 first:border-t-0 first:pt-0">
      <Sparkles className="h-3.5 w-3.5 text-gold-700" />
      <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-plum-700">{children}</h4>
    </div>
  );
}

export default function GroupInterestForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    setLoading(true);
    try {
      const payload = {
        type: "group-interest",
        name: form.get("name"),
        age: form.get("age"),
        profession: form.get("profession"),
        phone: form.get("phone"),
        email: form.get("email"),
        city: form.get("city"),
        interests: form.getAll("interests"),
        formats: form.getAll("formats"),
        preferredDays: form.getAll("preferredDays"),
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Could not submit");
      toast.success("Thank you! You'll be informed whenever new gatherings are planned 🌸");
      formEl.reset();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <p className="text-sm body-soft">
        A soulful space to heal, connect, create &amp; grow together 💫 Fill the
        form and you'll be informed whenever new gatherings are planned. 🌸
      </p>

      <SectionTitle>🌸 I am interested in</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {INTERESTS.map((s) => (
          <label key={s} className="check-chip">
            <input type="checkbox" name="interests" value={s} />
            {s}
          </label>
        ))}
      </div>

      <SectionTitle>⏳ Preferred Session Format</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {FORMATS.map((s) => (
          <label key={s} className="check-chip">
            <input type="checkbox" name="formats" value={s} />
            {s}
          </label>
        ))}
      </div>

      <SectionTitle>📅 Preferred Days</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {DAYS.map((d) => (
          <label key={d} className="check-chip">
            <input type="checkbox" name="preferredDays" value={d} />
            {d}
          </label>
        ))}
      </div>

      <SectionTitle>🌿 Personal Details</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" required placeholder="👤 Full Name" className="afs-input" />
        <input name="age" type="number" min={1} max={120} placeholder="🎂 Age" className="afs-input" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="profession" placeholder="💼 Profession" className="afs-input" />
        <input name="city" placeholder="📍 Preferred City" className="afs-input" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="phone" required placeholder="📞 Phone Number" className="afs-input" />
        <input name="email" type="email" required placeholder="📧 Email ID" className="afs-input" />
      </div>

      <button disabled={loading} className="btn-primary mt-3 w-full disabled:opacity-60">
        {loading ? "Sending…" : "🌿 Keep Me Informed"}
      </button>
      <p className="text-center text-xs text-earth-500">
        ✨ Thank you for your interest in healing, creativity, mindfulness &amp; soulful gatherings ✨
      </p>
    </form>
  );
}
