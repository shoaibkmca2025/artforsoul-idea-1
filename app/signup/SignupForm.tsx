"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
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
];
const EXPERIENCING = [
  "Stress", "Anxiety", "Overthinking", "Emotional Pain", "Low Confidence",
  "Relationship Challenges", "Burnout", "Fear or Worry", "Sadness",
  "Pregnancy-related Emotions", "Lack of Motivation",
];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIMES = ["🌞 Morning", "☀️ Afternoon", "🌙 Evening"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-6 border-t border-earth-300/40 pt-5 first:mt-0 first:border-t-0 first:pt-0">
      <div className="mb-3 flex items-center gap-2">
        <Sparkles className="h-3.5 w-3.5 text-gold-700" />
        <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-plum-700">{title}</h4>
      </div>
      {children}
    </div>
  );
}

export default function SignupForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectUrl = params.get("redirect_url") || "/dashboard";
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const payload = {
        name: form.get("name"),
        email: form.get("email"),
        password: form.get("password"),
        age: form.get("age"),
        city: form.get("city"),
        phone: form.get("phone"),
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
      const res = await fetch("/api/account/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not create account.");
      toast.success("Welcome to Art For Soul ✿ Your account is ready.");
      router.push(redirectUrl);
      router.refresh();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <p className="text-sm body-soft">
        Create your account &amp; share a little about your healing journey 💫 All
        information stays confidential, respected &amp; held with care. 🌸
      </p>

      <Section title="🌿 Account details">
        <div className="grid gap-3 sm:grid-cols-2">
          <input name="name" required placeholder="👤 Full Name" className="afs-input" />
          <input name="age" type="number" min={1} max={120} placeholder="🎂 Age" className="afs-input" />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input name="email" type="email" required placeholder="📧 Email ID" className="afs-input" />
          <input name="password" type="password" required minLength={6} placeholder="🔒 Password (min 6 chars)" className="afs-input" />
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input name="phone" placeholder="📞 Phone (WhatsApp)" className="afs-input" />
          <input name="city" placeholder="📍 City & Country" className="afs-input" />
        </div>
        <input name="occupation" placeholder="💼 Occupation / Profession" className="afs-input mt-3" />
      </Section>

      <Section title="🌸 Which session(s) interest you?">
        <div className="flex flex-wrap gap-2">
          {SESSION_TYPES.map((s) => (
            <label key={s} className="check-chip"><input type="checkbox" name="sessions" value={s} />{s}</label>
          ))}
        </div>
      </Section>

      <Section title="💫 What are you currently experiencing?">
        <div className="flex flex-wrap gap-2">
          {EXPERIENCING.map((s) => (
            <label key={s} className="check-chip"><input type="checkbox" name="experiencing" value={s} />{s}</label>
          ))}
        </div>
      </Section>

      <Section title="💛 Tell us a little more">
        <textarea name="helpWith" rows={2} placeholder="💛 What would you like help or healing with?" className="afs-input resize-none" />
        <input name="physicalConcerns" placeholder="🌸 Any physical health concerns? (optional)" className="afs-input mt-3" />
        <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-earth-700">
          <span>🌿 Taken therapy or counseling before?</span>
          <label className="check-chip"><input type="radio" name="therapyBefore" value="Yes" /> Yes</label>
          <label className="check-chip"><input type="radio" name="therapyBefore" value="No" /> No</label>
        </div>
        <textarea name="hopingToAchieve" rows={2} placeholder="✨ What are you hoping to achieve?" className="afs-input mt-3 resize-none" />
      </Section>

      <Section title="📅 Preferred timing">
        <div className="flex flex-wrap gap-2">
          {DAYS.map((d) => (
            <label key={d} className="check-chip"><input type="checkbox" name="preferredDays" value={d} />{d}</label>
          ))}
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {TIMES.map((t) => (
            <label key={t} className="check-chip"><input type="checkbox" name="preferredTime" value={t} />{t}</label>
          ))}
        </div>
      </Section>

      <Section title="🌿 Consent & understanding">
        <div className="grid gap-2 text-sm text-earth-700">
          <label className="flex items-start gap-2">
            <input type="checkbox" required className="mt-1 accent-plum-700" />
            I understand these sessions are for emotional wellness, healing &amp; self-growth support.
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" required className="mt-1 accent-plum-700" />
            I understand these sessions do not replace medical or psychological treatment.
          </label>
          <label className="flex items-start gap-2">
            <input type="checkbox" required className="mt-1 accent-plum-700" />
            I agree to attend with openness, honesty &amp; respect.
          </label>
        </div>
      </Section>

      <button disabled={loading} className="btn-primary mt-4 w-full disabled:opacity-60">
        {loading ? "Creating your account…" : "✨ Create my account"}
      </button>
      <p className="text-center text-sm text-earth-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-plum-700 hover:underline">Log in</Link>
      </p>
    </form>
  );
}
