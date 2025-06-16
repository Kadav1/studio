import HeroSection from "@/components/sections/HeroSection";
import WorkHistorySection from "@/components/sections/WorkHistorySection";
import ProjectShowcaseSection from "@/components/sections/ProjectShowcaseSection";
import BlogSection from "@/components/sections/BlogSection";
import PortfolioEnhancementSection from "@/components/sections/PortfolioEnhancementSection";
import ContactSection from "@/components/sections/ContactSection";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <>
      <HeroSection />
      <WorkHistorySection />
      <Separator className="my-0"/>
      <ProjectShowcaseSection />
      <Separator className="my-0"/>
      <BlogSection />
      <Separator className="my-0"/>
      <PortfolioEnhancementSection />
      <Separator className="my-0"/>
      <ContactSection />
    </>
  );
}
