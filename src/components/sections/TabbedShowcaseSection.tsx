
"use client";

import { Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { BlogPost } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ProjectShowcaseSection from "./ProjectShowcaseSection";
import ArtworksSection from "./ArtworksSection";
import BlogSection from "./BlogSection";
import { Skeleton } from '../ui/skeleton';
import { AppWindow, Palette, FileText } from "lucide-react";

interface TabbedShowcaseSectionProps {
  posts: BlogPost[];
}

function TabbedShowcaseComponent({ posts }: TabbedShowcaseSectionProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || "projects";

  const handleTabChange = (value: string) => {
    const newUrl = `${pathname}?tab=${value}#showcase`;
    router.push(newUrl, { scroll: false });
  };

  return (
    <section id="showcase" className="bg-secondary py-16 md:py-24">
      <Tabs
        defaultValue={tab}
        onValueChange={handleTabChange}
        className="container mx-auto"
      >
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 h-auto">
          <TabsTrigger value="projects" className="py-2.5 text-base gap-2">
            <AppWindow className="h-5 w-5" />
            Projects
          </TabsTrigger>
          <TabsTrigger value="artworks" className="py-2.5 text-base gap-2">
            <Palette className="h-5 w-5" />
            Artworks
          </TabsTrigger>
          <TabsTrigger value="blog" className="py-2.5 text-base gap-2">
            <FileText className="h-5 w-5" />
            Blog
          </TabsTrigger>
        </TabsList>
        <TabsContent value="projects">
          <AnimatedSection>
            <ProjectShowcaseSection />
          </AnimatedSection>
        </TabsContent>
        <TabsContent value="artworks">
          <AnimatedSection>
            <ArtworksSection />
          </AnimatedSection>
        </TabsContent>
        <TabsContent value="blog">
          <AnimatedSection>
            <BlogSection posts={posts} />
          </AnimatedSection>
        </TabsContent>
      </Tabs>
    </section>
  );
}


export default function TabbedShowcaseSection(props: TabbedShowcaseSectionProps) {
    return (
        <Suspense fallback={<div className="h-[500px] w-full"><Skeleton className="h-full w-full"/></div>}>
            <TabbedShowcaseComponent {...props} />
        </Suspense>
    )
}
