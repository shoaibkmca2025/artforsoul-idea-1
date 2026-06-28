"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * "Book a Session" call-to-action.
 *
 * Requires the visitor to be signed in first:
 *   • Logged in   → straight to /courses (sessions & services).
 *   • Logged out  → /login?redirect_url=/courses (login or sign up, then land
 *                   back on the services page automatically).
 */
export default function BookCtaButton({
  className = "btn-primary",
  children,
  redirectTo = "/courses",
}: {
  className?: string;
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function go() {
    setLoading(true);
    try {
      const me = (await (await fetch("/api/account/me")).json()).user;
      router.push(me ? redirectTo : `/login?redirect_url=${encodeURIComponent(redirectTo)}`);
    } catch {
      router.push(`/login?redirect_url=${encodeURIComponent(redirectTo)}`);
    }
  }

  return (
    <button onClick={go} disabled={loading} className={`${className} disabled:opacity-70`}>
      {children}
    </button>
  );
}
