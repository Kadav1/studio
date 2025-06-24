
import { getProjectBySlug } from "@/data/projects";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ExternalLink, Github, Zap } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: { slug:string } }): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return {
        title: "Project Not Found",
        description: "The project you are looking for does not exist.",
    }
  }
  return {
    title: `${project.title} - Project Case Study`,
    description: `An in-depth look at the ${project.title} project. ${project.description}`,
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <AnimatedSection className="py-12 md:py-20 bg-secondary/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <Button variant="ghost" asChild className="text-foreground hover:bg-accent/10 hover:text-accent">
            <Link href="/#projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Projects
            </Link>
          </Button>
        </div>

        <main className="max-w-5xl mx-auto">
          <Card className="overflow-hidden shadow-xl border-primary/20">
            <CardContent className="p-0">
              <header className="p-6 md:p-10">
                {project.usesMotionPrimitives && (
                   <div className="flex items-center text-accent mb-2">
                        <Zap size={16} className="mr-2"/>
                        <span className="text-sm font-semibold">Motion Primitives Project</span>
                    </div>
                )}
                <h1 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-3">{project.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map(tag => <Badge key={tag} variant="secondary" className="border border-primary/20 text-primary">{tag}</Badge>)}
                </div>
                 <div className="flex flex-wrap gap-4">
                  {project.projectUrl && (
                    <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                      <Link href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        View Live Demo
                      </Link>
                    </Button>
                  )}
                  {project.repoUrl && (
                    <Button variant="outline" asChild>
                      <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        <Github className="mr-2 h-4 w-4" />
                        View Source Code
                      </Link>
                    </Button>
                  )}
                </div>
              </header>
              
              <div className="relative w-full h-64 md:h-96">
                <Image
                  src={project.imageUrl}
                  alt={`Hero image for ${project.title}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 1024px"
                  data-ai-hint={project.imageHint}
                  className="object-cover"
                />
              </div>

              {project.caseStudy && (
                <div className="p-6 md:p-10 space-y-12">
                  <section>
                    <h2 className="font-headline text-3xl font-semibold text-primary mb-4">The Problem</h2>
                    <div className="text-foreground/90 space-y-4 leading-relaxed">
                      <p>{project.caseStudy.problem}</p>
                    </div>
                  </section>

                  <section>
                    <h2 className="font-headline text-3xl font-semibold text-primary mb-4">The Solution</h2>
                    <div className="text-foreground/90 space-y-4 leading-relaxed">
                      <p>{project.caseStudy.solution}</p>
                    </div>
                  </section>
                  
                  <section>
                    <h2 className="font-headline text-3xl font-semibold text-primary mb-4">The Outcome</h2>
                    <div className="text-foreground/90 space-y-4 leading-relaxed">
                      <p>{project.caseStudy.outcome}</p>
                    </div>
                  </section>

                  {project.caseStudy.gallery && project.caseStudy.gallery.length > 0 && (
                    <section>
                      <h2 className="font-headline text-3xl font-semibold text-primary mb-6">Project Gallery</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {project.caseStudy.gallery.map((image, index) => (
                          <div key={index} className="border rounded-lg overflow-hidden shadow-md">
                            <div className="relative aspect-video bg-muted">
                              <Image
                                src={image.url}
                                alt={image.caption || `Gallery image ${index + 1} for ${project.title}`}
                                fill
                                sizes="(max-width: 640px) 100vw, 50vw"
                                data-ai-hint={image.hint}
                                className="object-cover"
                              />
                            </div>
                            {image.caption && (
                              <div className="p-4 bg-muted/50 border-t">
                                <p className="text-sm text-muted-foreground">{image.caption}</p>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </AnimatedSection>
  );
}
