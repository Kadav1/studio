
"use client";

import { Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { BlogPost } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AnimatedSection from "@/components/shared/AnimatedSection";
import ProjectShowcaseSection from "./ProjectShowcaseSection";
import ArtworksSection from "./ArtworksSection";
import BlogSection from "./BlogSection";
import AiLabShowcaseSection from './AiLabShowcaseSection';
import { Skeleton } from '../ui/skeleton';
import { AppWindow, Palette, FileText, FlaskConical } from "lucide-react";

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
    <AnimatedSection id="showcase" className="bg-secondary">
      <Tabs
        defaultValue={tab}
        onValueChange={handleTabChange}
        className="container mx-auto"
      >
        <TabsList className="grid w-full max-w-lg mx-auto grid-cols-4 mb-12 h-auto">
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
           <TabsTrigger value="ai-lab" className="py-2.5 text-base gap-2">
            <FlaskConical className="h-5 w-5" />
            AI Lab
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
        <TabsContent value="ai-lab">
          <AnimatedSection>
            <AiLabShowcaseSection />
          </AnimatedSection>
        </TabsContent>
      </Tabs>
    </AnimatedSection>
  );
}

function ShowcaseSkeleton() {
  return (
     <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
            <Skeleton className="h-12 w-full max-w-lg mx-auto mb-12" />
            <div className="flex items-center mb-12">
                <Skeleton className="h-10 w-10 mr-4 rounded-md" />
                <Skeleton className="h-10 w-64 rounded-md" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(3)].map((_, i) => (
                <div key={i} className="space-y-4">
                    <Skeleton className="h-48 w-full rounded-xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-10 w-full" />
                </div>
                ))}
            </div>
        </div>
     </section>
  );
}


export default function TabbedShowcaseSection(props: TabbedShowcaseSectionProps) {
    return (
        <Suspense fallback={<ShowcaseSkeleton />}>
            <TabbedShowcaseComponent {...props} />
        </Suspense>
    )
}
