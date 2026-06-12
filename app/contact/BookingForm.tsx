"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Sparkles } from "lucide-react";

const SESSION_TYPES = [
  "🎨 Art Therapy",
  "🌿 Emotional Healing",
  "💛 Personal Counseling",
  "🧘 Meditation & Relaxation",
  "✨ Confidence Building",
  "🌼 Stress Relief",
  "🌙 Inner Child Healing",
  "🤰 Garbha Sanskar / Pregnancy Healing",
  "🎭 Creative Healing",
  "🌸 Other",
];

const EXPERIENCING = [
  "Stress",
  "Anxiety",
  "Overthinking",
  "Emotional Pain",
  "Low Confidence",
  "Relationship Challenges",
  "Burnout",
  "Fear or Worry",
  "Sadness",
  "Pregnancy-related Emotions",
  "Lack of Motivation",
  "Other",
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIMES = ["🌞 Morning", "☀️ Afternoon", "🌙 Evening"];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-6 flex items-center gap-2 border-t border-earth-300/40 pt-5 first:mt-0 first:border-t-0 first:pt-0">
      <Sparkles className="h-3.5 w-3.5 text-gold-700" />
      <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-plum-700">{children}</h4>
    </div>
  );
}

export default function BookingForm() {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    setLoading(true);
    try {
      const payload = {
        type: "session-booking",
        name: form.get("name"),
        age: form.get("age"),
        city: form.get("city"),
        phone: form.get("phone"),
        email: form.get("email"),
        occupation: form.get("occupation"),
        sessions: form.getAll("sessions"),
        experiencing: form.getAll("experiencing"),
        helpWith: form.get("helpWith"),
        physicalConcerns: form.get("physicalConcerns"),
        therapyBefore: form.get("therapyBefore"),
        hopingToAchieve: form.get("hopingToAchieve"),
        preferredDays: form.getAll("preferredDays"),
        preferredTime: form.getAll("preferredTime"),
      };
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Could not book");
      toast.success("We've received your booking request. You'll get confirmation & details soon ✿");
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
        Welcome to this soulful healing journey 💫 All information shared remains
        confidential, respected &amp; held with care. 🌸
      </p>

      <SectionTitle>🌿 Personal Information</SectionTitle>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" required placeholder="👤 Full Name" className="afs-input" />
        <input name="age" type="number" min={1} max={120} placeholder="🎂 Age" className="afs-input" />
      </div>
      <input name="city" placeholder="📍 City & Country" className="afs-input" />
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="phone" required placeholder="📞 Phone (WhatsApp)" className="afs-input" />
        <input name="email" type="email" required placeholder="📧 Email ID" className="afs-input" />
      </div>
      <input name="occupation" placeholder="💼 Occupation / Profession" className="afs-input" />

      <SectionTitle>🌸 Which session would you like to book?</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {SESSION_TYPES.map((s) => (
          <label key={s} className="check-chip">
            <input type="checkbox" name="sessions" value={s} />
            {s}
          </label>
        ))}
      </div>

      <SectionTitle>💫 What are you currently experiencing?</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {EXPERIENCING.map((s) => (
          <label key={s} className="check-chip">
            <input type="checkbox" name="experiencing" value={s} />
            {s}
          </label>
        ))}
      </div>

      <SectionTitle>💛 Tell us a little more</SectionTitle>
      <textarea
        name="helpWith"
        rows={2}
        placeholder="💛 What would you like help or healing with?"
        className="afs-input resize-none"
      />
      <input
        name="physicalConcerns"
        placeholder="🌸 Any physical health concerns? (optional)"
        className="afs-input"
      />
      <div className="flex flex-wrap items-center gap-3 text-sm text-earth-700">
        <span>🌿 Taken therapy or counseling before?</span>
        <label className="check-chip">
          <input type="radio" name="therapyBefore" value="Yes" /> Yes
        </label>
        <label className="check-chip">
          <input type="radio" name="therapyBefore" value="No" /> No
        </label>
      </div>
      <textarea
        name="hopingToAchieve"
        rows={2}
        placeholder="✨ What are you hoping to achieve from these sessions?"
        className="afs-input resize-none"
      />

      <SectionTitle>📅 Preferred Session Timing</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {DAYS.map((d) => (
          <label key={d} className="check-chip">
            <input type="checkbox" name="preferredDays" value={d} />
            {d}
          </label>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        {TIMES.map((t) => (
          <label key={t} className="check-chip">
            <input type="checkbox" name="preferredTime" value={t} />
            {t}
          </label>
        ))}
      </div>

      <SectionTitle>🌿 Consent &amp; Understanding</SectionTitle>
      <div className="grid gap-2 text-sm text-earth-700">
        <label className="flex items-start gap-2">
          <input type="checkbox" required className="mt-1 accent-plum-700" />
          I understand these sessions are for emotional wellness, healing &amp; self-growth support purposes.
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" required className="mt-1 accent-plum-700" />
          I understand these sessions do not replace medical or psychological treatment.
        </label>
        <label className="flex items-start gap-2">
          <input type="checkbox" required className="mt-1 accent-plum-700" />
          I agree to attend the sessions with openness, honesty &amp; respect.
        </label>
      </div>

      <button disabled={loading} className="btn-primary mt-3 w-full disabled:opacity-60">
        {loading ? "Sending…" : "✨ Book My Healing Session"}
      </button>
      <p className="text-center text-xs text-earth-500">
        🌸 You will receive confirmation &amp; further details after submitting. 🌸
      </p>
    </form>
  );
}
