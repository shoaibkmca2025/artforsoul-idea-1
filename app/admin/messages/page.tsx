import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const session = await getSession();
  if (!session.userId) redirect("/admin/login");
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="heading-display text-3xl">Messages</h1>
      <p className="body-soft text-sm">Notes from soft hearts.</p>

      <div className="mt-6 space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="card-journal">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-display text-xl">{m.name}</div>
                <div className="text-xs text-earth-700/70">{m.email} · {new Date(m.createdAt).toLocaleString()}</div>
              </div>
              {m.subject && (
                <div className="rounded-full bg-rose-soft/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-earth-900">{m.subject}</div>
              )}
            </div>
            <p className="mt-3 whitespace-pre-wrap body-soft">{m.message}</p>
          </div>
        ))}
        {messages.length === 0 && <p className="body-soft">No messages yet.</p>}
      </div>
    </div>
  );
}
