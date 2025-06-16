
"use client";

import type { Project } from "@/types";
import ProjectCard from "@/components/cards/ProjectCard";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Code2 } from "lucide-react";

const projects: Project[] = [
  {
    id: "1",
    title: "Chroma AI",
    description: "Chroma AI is an intelligent design assistant that empowers users to effortlessly generate captivating 5-color palettes. Leveraging the power of Google's Gemini and Genkit, it offers multiple intuitive methods for color discovery: derive schemes from uploaded images, translate text prompts into vibrant palettes, or expand a single color choice using classic color theory or an 'AI Magic' mode for unique suggestions.\n\nKey features include:\n*   **Versatile Palette Generation:** Create harmonious color schemes from images, text, or a single seed color.\n*   **Interactive Color Exploration:** Clickable swatches display HEX, RGB, and HSL values, with easy copy-to-clipboard functionality.\n*   **AI-Powered Analysis:** Automatically assesses palettes for WCAG accessibility (contrast ratios) and provides insights into color psychology.\n*   **Real-Time UI Preview:** Instantly visualize how generated palettes will appear in a practical UI mockup.\n\nDeveloped with Next.js, TypeScript, and Tailwind CSS, Chroma AI features a clean, modern interface. The user experience is enhanced by carefully selected typography (Space Grotesk and Inter), minimalist iconography, and subtle animations powered by Framer Motion.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "color palette app",
    tags: ["NextJS", "TypeScript", "Tailwind CSS", "Gemini", "Genkit", "AI", "Framer Motion"],
    projectUrl: "https://studio--chroma-ai-3nasf.us-central1.hosted.app/",
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

