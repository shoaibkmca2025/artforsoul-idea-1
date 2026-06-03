import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import ProcessSection from "@/components/home/ProcessSection";
import PortfolioPreview from "@/components/home/PortfolioPreview";
import CoursesPreview from "@/components/home/CoursesPreview";
import AffirmationMarquee from "@/components/home/AffirmationMarquee";
import FaqSection from "@/components/home/FaqSection";
import CTASection from "@/components/home/CTASection";
import { portfolioItems, courses } from "@/lib/data";

export default function HomePage() {
  const portfolio = portfolioItems.filter((p) => p.featured).slice(0, 6);
  const featuredCourses = courses.filter((c) => c.featured && c.published).slice(0, 6);

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
      <FaqSection />
      <CTASection />
    </>
  );
}
