import { ReactNode } from "react";
import AdminNav from "./AdminNav";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-100/60">
      <AdminNav name="Admin" />
      <div className="container-page py-10">{children}</div>
    </div>
  );
}
