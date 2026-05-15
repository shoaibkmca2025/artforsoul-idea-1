import PageHero from "@/components/ui/PageHero";
import GalleryMasonry from "./GalleryMasonry";
import { galleryItems } from "@/lib/data";

export const metadata = { title: "Gallery — Art For Soul" };

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Healing art wall"
        title="A wall of"
        script="tender artwork."
        subtitle="A growing collection of student work, journaled prompts and affirmation art from inside the Art For Soul studio."
      />
      <GalleryMasonry items={galleryItems} />
    </>
  );
}
