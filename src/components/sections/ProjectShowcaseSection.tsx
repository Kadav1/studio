
"use client";

import { allProjects } from "@/data/projects";
import ProjectCard from "@/components/cards/ProjectCard";
import { AppWindow } from "lucide-react";

const projectsToDisplay = allProjects.filter(project => ["1", "5", "4"].includes(project.id));

export default function ProjectShowcaseSection() {
  return (
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
  );
}
