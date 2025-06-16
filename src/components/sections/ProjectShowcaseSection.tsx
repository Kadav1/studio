"use client";

import type { Project } from "@/types";
import ProjectCard from "@/components/cards/ProjectCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Code2 } from "lucide-react";

const projects: Project[] = [
  {
    id: "1",
    title: "Interactive Data Visualization Platform",
    description: "A web platform for visualizing complex datasets using D3.js and React. Features dynamic charts and real-time data updates. Enhanced with subtle loading animations and transitions using Motion-primitives (Framer Motion).",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "data dashboard",
    tags: ["React", "D3.js", "Node.js", "Framer Motion"],
    projectUrl: "#",
    repoUrl: "#",
    usesMotionPrimitives: true,
  },
  {
    id: "2",
    title: "E-commerce Website",
    description: "A full-featured e-commerce site built with Next.js and Stripe integration. Includes product listings, shopping cart, and user authentication.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "online store",
    tags: ["Next.js", "Stripe", "Tailwind CSS", "Firebase"],
    projectUrl: "#",
  },
  {
    id: "3",
    title: "Mobile Task Management App",
    description: "A cross-platform mobile app developed with React Native for managing daily tasks and team collaboration.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "mobile app interface",
    tags: ["React Native", "Firebase", "Redux"],
    repoUrl: "#",
  },
  {
    id: "4",
    title: "AI-Powered Portfolio Reviewer",
    description: "This very portfolio features a GenAI tool to analyze and suggest improvements for portfolio content, built with Next.js server actions and Google's Gemini.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "ai interface",
    tags: ["Next.js", "GenAI", "Tailwind CSS", "Framer Motion"],
    projectUrl: "#ai-enhancer",
    usesMotionPrimitives: true,
  },
];

export default function ProjectShowcaseSection() {
  return (
    <AnimatedSection id="projects" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center mb-12">
          <Code2 className="h-10 w-10 text-primary mr-4" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Featured Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
