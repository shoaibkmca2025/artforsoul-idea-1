import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import ProcessSection from "@/components/home/ProcessSection";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import CoursesPreview from "@/components/home/CoursesPreview";
import GalleryStrip from "@/components/home/GalleryStrip";
import Testimonials from "@/components/home/Testimonials";
import AffirmationMarquee from "@/components/home/AffirmationMarquee";
import CTASection from "@/components/home/CTASection";
import { portfolioItems, courses, testimonials, galleryItems } from "@/lib/data";

export default function HomePage() {
  const portfolio = portfolioItems.filter((p) => p.featured).slice(0, 6);
  const featuredCourses = courses.filter((c) => c.featured && c.published).slice(0, 6);
  const gallery = galleryItems.slice(0, 12);

  return (
    <>
      <Hero />
      <AffirmationMarquee />
      <AboutSection />
      <ServicesSection />
      <BenefitsSection />
      <ProcessSection />
      <PortfolioPreview items={portfolio} />
      <CoursesPreview courses={featuredCourses} />
      <GalleryStrip items={gallery} />
      <Testimonials items={testimonials} />
      <CTASection />
    </>
  );
}
