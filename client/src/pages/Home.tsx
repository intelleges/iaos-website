import SEO from "@/components/seo";
import HeroSection from "@/components/sections/home/hero-section";
import SectionPillars from "@/components/sections/home/section-pillars";
import SectionValueProp from "@/components/sections/home/section-value-prop";
import SectionPlatform from "@/components/sections/home/section-platform";
import SectionTestimonials from "@/components/sections/home/section-testimonials";
import SectionCertifications from "@/components/sections/home/section-certifications";
import SectionIndustries from "@/components/sections/home/section-industries";
import SectionFeatures from "@/components/sections/home/section-features";
import SectionSystemMaps from "@/components/sections/home/section-system-maps";
import SectionNews from "@/components/sections/home/section-news";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <SEO 
        title="Home" 
        description="Intelleges is the universal engine for supplier management, compliance automation, and nearshoring intelligence. Streamline your federal compliance today."
      />
      <HeroSection />
      <SectionPillars />
      <SectionValueProp />
      <SectionPlatform />
      <SectionIndustries />
      <SectionFeatures />
      <SectionSystemMaps />
      <SectionNews />
      <SectionTestimonials />
      <SectionCertifications />
    </div>
  );
}
