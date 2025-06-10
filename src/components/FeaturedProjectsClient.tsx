
"use client";

import { useState, useEffect } from 'react';
import type { Project } from '@/types';
import ProjectCard from '@/components/ProjectCard';
import { Button } from '@/components/ui/button'; // Import Button for potential styling
import { Loader2 } from 'lucide-react'; // Import a loader icon

const INITIAL_PROJECT_COUNT = 3;
const PROJECTS_PER_LOAD = 3;

interface FeaturedProjectsClientProps {
  allProjects: Project[];
}

export default function FeaturedProjectsClient({ allProjects }: FeaturedProjectsClientProps) {
  const [visibleProjectsCount, setVisibleProjectsCount] = useState(INITIAL_PROJECT_COUNT);
  const [isLoading, setIsLoading] = useState(false);

  const visibleProjects = allProjects.slice(0, visibleProjectsCount);

  const loadMoreProjects = () => {
    setIsLoading(true);
    // Simulate a short delay for loading effect, remove in production if not needed
    setTimeout(() => {
      setVisibleProjectsCount(prevCount => Math.min(prevCount + PROJECTS_PER_LOAD, allProjects.length));
      setIsLoading(false);
    }, 500); // 0.5 second delay
  };

  // Effect to handle focus after loading more projects - optional UX enhancement
  useEffect(() => {
    if (!isLoading && visibleProjectsCount > INITIAL_PROJECT_COUNT) {
      const newCards = document.querySelectorAll('.project-card-link');
      // Focus the first newly loaded card, if available
      // This requires ProjectCard's Link to have a class like 'project-card-link'
      // and potentially an identifier for the newly loaded ones.
      // For simplicity, this part is commented out but shows the idea.
      // const firstNewCardIndex = visibleProjectsCount - PROJECTS_PER_LOAD;
      // if (newCards[firstNewCardIndex]) {
      //   (newCards[firstNewCardIndex] as HTMLElement).focus();
      // }
    }
  }, [isLoading, visibleProjectsCount]);

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
            disabled={isLoading}
            aria-live="polite" // Announce changes for screen readers
            aria-busy={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                L<span className="text-accent">Ø</span>ading...
              </>
            ) : (
              <>
                Load M<span className="text-accent">Ø</span>re Pr<span className="text-accent">Ø</span>jects
              </>
            )}
          </button>
        </div>
      )}
    </>
  );
}
