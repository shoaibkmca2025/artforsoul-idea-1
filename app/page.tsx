import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import CoursesPreview from "@/components/home/CoursesPreview";
import GalleryStrip from "@/components/home/GalleryStrip";
import Testimonials from "@/components/home/Testimonials";
import AffirmationMarquee from "@/components/home/AffirmationMarquee";
import CTASection from "@/components/home/CTASection";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [portfolio, courses, testimonials, gallery] = await Promise.all([
    prisma.portfolioItem.findMany({ where: { featured: true }, orderBy: { order: "asc" }, take: 6 }),
    prisma.course.findMany({ where: { featured: true, published: true }, orderBy: { order: "asc" }, take: 6 }),
    prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
    prisma.galleryItem.findMany({ orderBy: { order: "asc" }, take: 12 }),
  ]);

  return (
    <>
      <Hero />
      <AffirmationMarquee />
      <AboutSection />
      <ServicesSection />
      <BenefitsSection />
      <PortfolioPreview items={portfolio} />
      <CoursesPreview courses={courses} />
      <GalleryStrip items={gallery} />
      <Testimonials items={testimonials} />
      <CTASection />
    </>
  );
}
