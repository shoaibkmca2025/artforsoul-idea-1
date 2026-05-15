import Link from "next/link";
import { ReactNode } from "react";
import { getSession } from "@/lib/session";
import AdminNav from "./AdminNav";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getSession();
  // Allow /admin/login without auth
  return (
    <div className="min-h-screen bg-cream-100/60">
      {session.userId && (
        <AdminNav name={session.name || session.email || "Admin"} />
      )}
      <div className="container-page py-10">{children}</div>
    </div>
  );
}
