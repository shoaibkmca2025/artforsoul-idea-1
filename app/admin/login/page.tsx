import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  const session = await getSession();
  if (session.userId) redirect("/admin");

  return (
    <div className="grid min-h-screen place-items-center px-5">
      <div className="card-journal w-full max-w-md">
        <h1 className="font-script text-4xl text-earth-900">Studio sign in</h1>
        <p className="mt-1 text-sm body-soft">Welcome back. Tend your studio softly.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
