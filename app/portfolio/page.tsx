import PageHero from "@/components/ui/PageHero";
import PortfolioGrid from "./PortfolioGrid";
import { portfolioItems } from "@/lib/data";

export const metadata = {
  title: "NM Art Studio — Art For Soul",
  description:
    "NM Art Studio — a collection of mix-media art images, wall art, customised paintings, mandala art, Vastu-based artworks and large healing canvases.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="NM Art Studio"
        title="Art images & wall art,"
        script="in mix media."
        subtitle="A growing collection from NM Art Studio — mix-media art images, large wall art, customised canvases, Mandala & Dot Mandala art, Vastu-based paintings and energy artworks for positive vibrations."
      />
      <PortfolioGrid items={portfolioItems} />
    </>
  );
}
