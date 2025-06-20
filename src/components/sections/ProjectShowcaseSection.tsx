
"use client";

import type { Project } from "@/types";
import ProjectCard from "@/components/cards/ProjectCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { AppWindow } from "lucide-react";

const allProjects: Project[] = [
  {
    id: "1",
    title: "Chroma AI",
    description: "Chroma AI is an intelligent design assistant that generates captivating 5-color palettes using Google's Gemini and Genkit. Create schemes from images, text prompts, or a single color with classic theory or 'AI Magic'. Features include interactive swatches (HEX, RGB, HSL values with copy-to-clipboard), AI-powered accessibility/color psychology analysis, and a real-time UI preview. Developed with Next.js, TypeScript, and Tailwind CSS, it offers a modern interface with Space Grotesk/Inter fonts and Framer Motion animations.",
    imageUrl: "/images/projects/chroma-ai.png",
    imageHint: "color palette app",
    tags: ["NextJS", "TypeScript", "Tailwind CSS", "Gemini", "Genkit", "AI", "Framer Motion"],
    projectUrl: "https://studio--chroma-ai-3nasf.us-central1.hosted.app/",
    repoUrl: "#",
    usesMotionPrimitives: true,
  },
  {
    id: "2",
    title: "TBA",
    description: "dolore eu sea dolore ipsum tempor molestie et eos lorem accusam option stet dolores zzril dolor.",
    imageUrl: "https://placehold.co/600x400.png", // This project is not displayed, so placeholder is fine
    imageHint: "online store",
    tags: ["Next.js", "Stripe", "Tailwind CSS", "Firebase"],
    projectUrl: "#",
  },
  {
    id: "3",
    title: "TBA",
    description: "at diam esse eum dolore ut delenit sit voluptua stet ut sea ea at labore ipsum.",
    imageUrl: "https://placehold.co/600x400.png", // This project is not displayed
    imageHint: "mobile app interface",
    tags: ["React Native", "Firebase", "Redux"],
    repoUrl: "#",
  },
  {
    id: "4",
    title: "TBA",
    description: "et gubergren sit velit dolore in ea quis sit blandit elitr dolor iusto nulla et ut",
    imageUrl: "https://placehold.co/600x400.png", // This project is not displayed
    imageHint: "ai interface",
    tags: ["Next.js", "GenAI", "Tailwind CSS", "Framer Motion"],
    projectUrl: "#ai-enhancer",
    usesMotionPrimitives: true,
  },
];

const projectsToDisplay = allProjects.filter(project => !["2", "3", "4"].includes(project.id));

export default function ProjectShowcaseSection() {
  return (
    <AnimatedSection id="projects" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center mb-12">
          <AppWindow className="h-10 w-10 text-primary mr-4" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Featured Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsToDisplay.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}

