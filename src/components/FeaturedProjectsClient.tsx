
"use client";

import { useState } from 'react';
import type { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';

const INITIAL_PROJECT_COUNT = 4; // Number of projects to show initially
const PROJECTS_PER_LOAD = 4;     // Number of projects to load each time "Load More" is clicked

interface FeaturedProjectsClientProps {
  allProjects: Project[];
}

export default function FeaturedProjectsClient({ allProjects }: FeaturedProjectsClientProps) {
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(INITIAL_PROJECT_COUNT);

  const visibleProjects = allProjects.slice(0, visibleProjectsCount);

  const loadMoreProjects = () => {
    setVisibleProjectsCount(prevCount => Math.min(prevCount + PROJECTS_PER_LOAD, allProjects.length));
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {visibleProjects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
      {visibleProjectsCount < allProjects.length && (
        <div className="mt-10 md:mt-12 text-center">
          <button
            onClick={loadMoreProjects}
            className="btn-brutalist" 
          >
            Load M<span className="text-accent">Ø</span>re Pr<span className="text-accent">Ø</span>jects
          </button>
        </div>
      )}
    </>
  );
}
