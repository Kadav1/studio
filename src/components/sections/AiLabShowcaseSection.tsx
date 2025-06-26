
"use client";

import { aiLabProjects } from "@/data/aiLabProjects";
import AiLabProjectCard from "@/components/cards/AiLabProjectCard";
import { FlaskConical, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const projectsToDisplay = aiLabProjects.slice(0, 3);

export default function AiLabShowcaseSection() {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex items-center mb-12">
        <FlaskConical className="h-10 w-10 text-primary mr-4" />
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">AI Experiments</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsToDisplay.map((project, index) => (
          <AiLabProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
      <div className="text-center mt-16">
        <Button asChild variant="outline" size="lg" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
          <Link href="/ai-lab">
            Explore All AI Experiments <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
