"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectUrl = params.get("redirect_url") || "/dashboard";
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    setLoading(true);
    try {
      const res = await fetch("/api/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Could not log in.");
      toast.success("Welcome back 🌸");
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
      <input name="email" type="email" required placeholder="📧 Email ID" className="afs-input" />
      <input name="password" type="password" required placeholder="🔒 Password" className="afs-input" />
      <button disabled={loading} className="btn-primary mt-2 w-full disabled:opacity-60">
        {loading ? "Signing in…" : "Log in"}
      </button>
      <p className="text-center text-sm text-earth-600">
        New here?{" "}
        <Link href="/signup" className="font-medium text-plum-700 hover:underline">Create an account</Link>
      </p>
    </form>
  );
}
