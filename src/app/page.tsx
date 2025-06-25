import dynamic from 'next/dynamic'
import HeroSection from "@/components/sections/HeroSection";
import { Separator } from "@/components/ui/separator";
import { getSortedPostsData } from '@/lib/blog';

const ProjectShowcaseSection = dynamic(() => import('@/components/sections/ProjectShowcaseSection'));
const ArtworksSection = dynamic(() => import('@/components/sections/ArtworksSection'));
const BlogSection = dynamic(() => import('@/components/sections/BlogSection'));
const PortfolioEnhancementSection = dynamic(() => import('@/components/sections/PortfolioEnhancementSection'));
const ContactSection = dynamic(() => import('@/components/sections/ContactSection'));
const WorkHistorySection = dynamic(() => import('@/components/sections/WorkHistorySection'));

export default function Home() {
  const blogPosts = getSortedPostsData();

  return (
    <>
      <HeroSection />
      <WorkHistorySection />
      <Separator className="my-0"/>
      <ProjectShowcaseSection />
      <Separator className="my-0"/>
      <ArtworksSection />
      <Separator className="my-0"/>
      <BlogSection posts={blogPosts} />
      <Separator className="my-0"/>
      <PortfolioEnhancementSection />
      <Separator className="my-0"/>
      <ContactSection />
    </>
  );
}
