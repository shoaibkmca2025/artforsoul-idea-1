import PageHero from "@/components/ui/PageHero";
import PortfolioGrid from "./PortfolioGrid";
import { portfolioItems } from "@/lib/data";

export const metadata = {
  title: "Healing Art Gallery — Art For Soul",
  description:
    "A collection of customised healing paintings, mandala art, Vastu-based artworks and energy paintings by Art For Soul.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Healing Art"
        title="Customised paintings,"
        script="charged with energy."
        subtitle="A growing collection of healing artworks — customised paintings, large healing canvases, Mandala & Dot Mandala art, Vastu-based paintings, and energy artworks for positive vibrations."
      />
      <PortfolioGrid items={portfolioItems} />
    </>
  );
}
