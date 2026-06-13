import PageHero from "@/components/ui/PageHero";
import ServiceTabs from "@/components/ui/ServiceTabs";
import { portfolioItems } from "@/lib/data";
import ArtStudiozSection from "./ArtStudiozSection";

export const metadata = {
  title: "Art Studioz — Art For Soul",
  description:
    "Art Studioz — a collection of mix-media art images, wall art, customised paintings, texture & resin art, furniture restoration and Vastu/Feng Shui based artwork.",
};

export default function PortfolioPage() {
  return (
    <>
      <PageHero
        eyebrow="Art Studioz"
        title="Soulful art inspired by"
        script="nature & creativity."
        subtitle="Art Studioz creates soulful art inspired by nature, modern art, landscapes and creative expression — thoughtfully made according to the space, colours, theme, emotions, Vastu and Feng Shui to bring beauty, harmony and positive energy to every space."
      />

      <ServiceTabs />

      <ArtStudiozSection items={portfolioItems} />
    </>
  );
}
