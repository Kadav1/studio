import { aiLabProjects } from "@/data/aiLabProjects";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { FlaskConical } from "lucide-react";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import dynamic from "next/dynamic";
import AiLabProjectCard from "@/components/cards/AiLabProjectCard";

const PortfolioEnhancementSection = dynamic(() => import('@/components/sections/PortfolioEnhancementSection'));

export const metadata: Metadata = {
  title: 'AI Lab',
  description: 'A collection of experimental projects where I explore and test new ideas with generative AI.',
};


export default function AiLabPage() {
  return (
    <>
      <AnimatedSection className="bg-background py-20 md:py-28">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
              <div className="p-3 bg-primary/10 rounded-full mb-4 inline-block">
                  <FlaskConical className="h-10 w-10 text-primary" />
              </div>
              <h1 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-3">AI Lab</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                  A collection of experimental projects where I explore and test new ideas with generative AI. These are proofs-of-concept and creative explorations.
              </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiLabProjects.map((project, index) => (
              <AiLabProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </AnimatedSection>
      <Separator />
      <PortfolioEnhancementSection />
    </>
  );
}
