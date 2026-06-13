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
        eyebrow="NM Art Studioz"
        title="Soulful art inspired by"
        script="nature & creativity."
        subtitle="Art Studioz creates soulful art inspired by nature, modern art, landscapes and creative expression — thoughtfully made according to the space, colours, theme, emotions, Vastu and Feng Shui to bring beauty, harmony and positive energy to every space."
      />

      <section className="container-page pb-2">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
          {[
            "Canvas Paintings",
            "Wall Art",
            "Mix Media Art",
            "Texture Art",
            "Resin Art",
            "Furniture Painting Makeover & Restoration",
            "Textured Wall Panels",
            "Customised Paintings & Artwork",
            "Vastu & Feng Shui Based Art",
          ].map((s) => (
            <div
              key={s}
              className="rounded-2xl border border-earth-300/40 bg-cream-50/70 px-4 py-3 text-center text-sm font-medium text-plum-700 shadow-soft backdrop-blur"
            >
              {s}
            </div>
          ))}
        </div>
      </section>

      <PortfolioGrid items={portfolioItems} />
    </>
  );
}
