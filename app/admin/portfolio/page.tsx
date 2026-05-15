import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import PortfolioAdmin from "./PortfolioAdmin";

export const dynamic = "force-dynamic";

export default async function AdminPortfolioPage() {
  const session = await getSession();
  if (!session.userId) redirect("/admin/login");
  const items = await prisma.portfolioItem.findMany({ orderBy: { order: "asc" } });
  return <PortfolioAdmin initialItems={items} />;
}
