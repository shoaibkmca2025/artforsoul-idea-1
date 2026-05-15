"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function EnrollForm({ courseId, courseTitle }: { courseId: string; courseTitle: string }) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId,
          name: form.get("name"),
          email: form.get("email"),
          phone: form.get("phone"),
          notes: form.get("notes"),
        }),
      });
      if (!res.ok) throw new Error("Could not enroll");
      toast.success(`You're enrolled in ${courseTitle}. We'll be in touch soon.`);
      (e.currentTarget as HTMLFormElement).reset();
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input name="name" required placeholder="Your name" className="input" />
      <input name="email" type="email" required placeholder="Email" className="input" />
      <input name="phone" required placeholder="Phone" className="input" />
      <textarea name="notes" rows={3} placeholder="A line about what brought you here (optional)" className="input resize-none" />
      <button disabled={loading} className="btn-primary w-full">
        {loading ? "Securing your seat..." : "Enroll Now"}
      </button>
      <style jsx>{`
        :global(.input) {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(176, 137, 104, 0.4);
          background: rgba(251, 247, 240, 0.85);
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          color: #3a2a20;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        :global(.input:focus) {
          border-color: #8c6a4f;
          box-shadow: 0 0 0 4px rgba(140, 106, 79, 0.15);
        }
      `}</style>
    </form>
  );
}
