"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, LogIn, LogOut } from "lucide-react";

type Me = { id: string; email: string; name?: string | null } | null;

/**
 * Account controls for the navbar. Always renders (custom auth, no
 * third-party provider needed). Shows Sign In when logged out, and
 * My Sessions + Log out when logged in.
 */
export default function AccountNav({ compact = false }: { compact?: boolean }) {
  const [me, setMe] = useState<Me>(null);
  const [loaded, setLoaded] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    let active = true;
    fetch("/api/account/me")
      .then((r) => r.json())
      .then((d) => {
        if (active) {
          setMe(d.user ?? null);
          setLoaded(true);
        }
      })
      .catch(() => active && setLoaded(true));
    return () => {
      active = false;
    };
  }, [pathname]);

  async function logout() {
    await fetch("/api/account/logout", { method: "POST" });
    setMe(null);
    router.push("/");
    router.refresh();
  }

  const btn = compact ? "w-full text-sm" : "text-sm";

  if (!loaded) return null;

  if (!me) {
    return (
      <Link href="/login" className={`btn-primary ${btn}`}>
        <LogIn className="h-4 w-4" /> Sign In
      </Link>
    );
  }

  return (
    <>
      <Link href="/dashboard" className={`btn-ghost ${btn}`}>
        <LayoutDashboard className="h-4 w-4" /> My Sessions
      </Link>
      <button onClick={logout} className={`btn-ghost ${btn}`} aria-label="Log out">
        <LogOut className="h-4 w-4" /> Log out
      </button>
    </>
  );
}
