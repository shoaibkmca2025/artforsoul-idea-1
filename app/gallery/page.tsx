import PageHero from "@/components/ui/PageHero";
import { prisma } from "@/lib/prisma";
import GalleryMasonry from "./GalleryMasonry";

export const dynamic = "force-dynamic";
export const metadata = { title: "Gallery — Art For Soul" };

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { order: "asc" } });

  return (
    <>
      <PageHero
        eyebrow="Healing art wall"
        title="A wall of"
        script="tender artwork."
        subtitle="A growing collection of student work, journaled prompts and affirmation art from inside the Art For Soul studio."
      />
      <GalleryMasonry items={items} />
    </>
  );
}
