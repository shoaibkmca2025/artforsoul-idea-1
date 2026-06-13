import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma, isDbConfigured } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/session";
import { formatINR } from "@/lib/utils";
import { CheckCircle2, Clock, Sparkles, ArrowRight } from "lucide-react";

export const metadata = { title: "My Sessions — Art For Soul" };
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?redirect_url=/dashboard");

  const firstName = (user.name || "").split(" ")[0] || "friend";

  const purchases = isDbConfigured()
    ? await prisma.purchase.findMany({
        where: { userId: user.id, status: "PAID" },
        orderBy: { createdAt: "desc" },
      })
    : [];

  return (
    <section className="container-page pt-28 pb-20 sm:pt-32 sm:pb-24">
      <div className="mb-8 sm:mb-10">
        <div className="pill mb-3"><Sparkles className="h-3.5 w-3.5" /> Your space</div>
        <h1 className="heading-display text-3xl sm:text-4xl md:text-5xl">
          Welcome, <span className="heading-script text-plum-500">{firstName}</span>
        </h1>
        <p className="mt-2 body-soft">Here are the sessions you've booked. 🌸</p>
      </div>

      {purchases.length === 0 ? (
        <div className="card-journal mx-auto max-w-xl text-center">
          <p className="font-script text-2xl text-plum-700">No sessions yet</p>
          <p className="mt-2 body-soft">
            When you book and pay for a session, it will appear here so you can
            access it anytime.
          </p>
          <Link href="/courses" className="btn-primary mt-5">
            Explore sessions <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {purchases.map((p) => (
            <div key={p.id} className="card-journal flex h-full flex-col">
              <div className="inline-flex w-fit items-center gap-1.5 rounded-full bg-sage-300/60 px-3 py-1 text-xs font-medium text-earth-900">
                <CheckCircle2 className="h-3.5 w-3.5" /> Paid
              </div>
              <h3 className="mt-3 font-display text-xl text-earth-900">{p.sessionTitle}</h3>
              <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-earth-500">
                <Clock className="h-3 w-3" />
                {new Date(p.createdAt).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <div className="mt-auto flex items-center justify-between pt-4">
                <span className="price-chip">{formatINR(p.amount)}</span>
                <Link
                  href="/contact"
                  className="text-sm text-earth-700 underline-offset-2 hover:underline"
                >
                  Schedule →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
