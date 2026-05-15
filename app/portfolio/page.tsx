import { prisma } from "@/lib/prisma";
import PageHero from "@/components/ui/PageHero";
import PortfolioGrid from "./PortfolioGrid";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Interior Portfolio — Art For Soul",
  description: "A showcase of warm, soulful interior design work by Art For Soul.",
};

export default async function PortfolioPage() {
  const items = await prisma.portfolioItem.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <PageHero
        eyebrow="Interior portfolio"
        title="Spaces that breathe,"
        script="rooms that hold."
        subtitle="A growing collection of soulful interiors — homes, studios and cafes layered with handmade texture, gentle palettes and a great deal of love."
      />
      <PortfolioGrid items={items} />
    </>
  );
}
