"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.get("email"),
          password: form.get("password"),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Invalid credentials");
      toast.success("Welcome back ✿");
      router.push("/admin");
      router.refresh();
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input name="email" type="email" required placeholder="Email" defaultValue="admin@artforsoul.in" className="afs-input" />
      <input name="password" type="password" required placeholder="Password" className="afs-input" />
      <button disabled={loading} className="btn-primary w-full">
        {loading ? "Signing in..." : "Sign in"}
      </button>
      <style jsx>{`
        :global(.afs-input) {
          width: 100%;
          border-radius: 1rem;
          border: 1px solid rgba(176, 137, 104, 0.4);
          background: rgba(251, 247, 240, 0.85);
          padding: 0.85rem 1rem;
          font-size: 0.95rem;
          color: #3a2a20;
          outline: none;
        }
        :global(.afs-input:focus) {
          border-color: #8c6a4f;
          box-shadow: 0 0 0 4px rgba(140, 106, 79, 0.15);
        }
      `}</style>
    </form>
  );
}
