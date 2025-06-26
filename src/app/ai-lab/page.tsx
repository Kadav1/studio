import { aiLabProjects } from "@/data/aiLabProjects";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FlaskConical, ExternalLink, Github } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: 'AI Lab',
  description: 'A collection of experimental projects where I explore and test new ideas with generative AI.',
};


export default function AiLabPage() {
  return (
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
          {aiLabProjects.map((project) => (
            <Card key={project.id} className="h-full flex flex-col overflow-hidden transition-shadow duration-300 rounded-xl group border bg-card">
              {project.imageUrl && (
                <div className="relative w-full h-48 overflow-hidden">
                  <Image 
                    src={project.imageUrl} 
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    data-ai-hint={project.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-headline text-xl text-primary">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                 <CardDescription className="mb-4 text-foreground/90">{project.description}</CardDescription>
                {project.tags && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                )}
              </CardContent>
               <CardFooter className="pt-4 border-t flex flex-wrap gap-2">
                {project.demoUrl && (
                  <Button asChild>
                    <Link href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> View Demo
                    </Link>
                  </Button>
                )}
                {project.codeUrl && (
                  <Button variant="outline" asChild>
                    <Link href={project.codeUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> View Code
                    </Link>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
