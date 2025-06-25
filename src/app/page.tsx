
import dynamic from 'next/dynamic'
import HeroSection from "@/components/sections/HeroSection";
import { Separator } from "@/components/ui/separator";
import { getSortedPostsData } from '@/lib/blog';
import TabbedShowcaseSection from '@/components/sections/TabbedShowcaseSection';

const PortfolioEnhancementSection = dynamic(() => import('@/components/sections/PortfolioEnhancementSection'));
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'));

export default function Home() {
  const blogPosts = getSortedPostsData();

  return (
    <>
      <HeroSection />
      <TabbedShowcaseSection posts={blogPosts} />
      <Separator className="my-0"/>
      <PortfolioEnhancementSection />
      <Separator className="my-0"/>
      <ContactSection />
    </>
  );
}
