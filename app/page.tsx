import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import ServicesSection from "@/components/home/ServicesSection";
import WorkshopsSection from "@/components/home/WorkshopsSection";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import HealingMoments from "@/components/home/HealingMoments";
import FaqSection from "@/components/home/FaqSection";
import CTASection from "@/components/home/CTASection";
import { testimonials } from "@/lib/data";

export default function HomePage() {
  return (
    <>
      {/* 1 */} <Hero />
      {/* 2 */} <AboutSection />
      {/* 3 */} <ServicesSection />
      {/* 4 */} <WorkshopsSection />
      {/* 5 */} <Testimonials items={testimonials} />
      {/* 6 */} <BlogPreview />
      {/* 7 */} <HealingMoments />
      {/* 8 */} <FaqSection />
      {/* 9 */} <CTASection />
    </>
  );
}
