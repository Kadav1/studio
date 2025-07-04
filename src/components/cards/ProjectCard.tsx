
"use client";

import type { Project } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
  };

  return (
    <motion.div 
        variants={cardVariants} 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ y: -8, boxShadow: "0 10px 20px -5px hsl(var(--primary) / 0.2)" }}
        className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 border bg-card rounded-xl group hover:border-primary/30">
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            data-ai-hint={project.imageHint}
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {project.usesMotionPrimitives && (
            <div className="absolute top-2 right-2 bg-accent text-accent-foreground p-1.5 rounded-full shadow-md">
              <Zap size={16} aria-label="Uses Motion Primitives" />
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle className="font-headline text-xl text-primary">{project.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="mb-4 text-foreground/90">{project.description}</CardDescription>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-4 border-t">
          <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground group/link">
            <Link href={`/projects/${project.slug}`}>
              View Case Study <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
