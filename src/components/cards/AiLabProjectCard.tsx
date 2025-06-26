
"use client";

import type { AiLabProject } from "@/data/aiLabProjects";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

interface AiLabProjectCardProps {
  project: AiLabProject;
  index: number;
}

export default function AiLabProjectCard({ project, index }: AiLabProjectCardProps) {
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
      <Card className="h-full flex flex-col overflow-hidden transition-shadow duration-300 rounded-xl group border bg-card">
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
    </motion.div>
  );
}
