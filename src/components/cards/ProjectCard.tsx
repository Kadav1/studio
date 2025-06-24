
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
    <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-accent/30 border-2 rounded-xl group">
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
          <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground transition-transform group-hover:scale-105">
            <Link href={`/projects/${project.slug}`}>
              View Case Study <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
