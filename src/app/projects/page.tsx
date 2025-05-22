
import ProjectCard from '@/components/ProjectCard';
import { getProjects } from '@/lib/projects';
import { MdGridView } from 'react-icons/md'; // Material Design Icons
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Projects - måsstaden',
  description: 'A showcase of projects by Alex Zewebrand, exploring brutalist design and web technologies.',
  openGraph: {
    title: 'Projects - måsstaden',
    description: 'A collection of innovative web projects with a brutalist aesthetic.',
  },
  twitter: {
    title: 'Projects - måsstaden',
    description: 'Explore diverse web projects by Alex Zewebrand.',
  }
};

export default async function ProjectsPage() {
  const allProjects = await getProjects();

  return (
    <div className="space-y-12">
      <header className="text-center md:text-left border-b-2 border-foreground pb-6 mb-10 md:mb-12">
        <div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
          <MdGridView className="h-10 w-10 md:h-12 md:w-12 text-accent mr-0 md:mr-4 mb-2 md:mb-0" aria-hidden="true" />
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Projects
          </h1>
        </div>
        <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground font-mono text-center md:text-left">
          A collection of my work, experiments, and explorations in the digital realm.
        </p>
      </header>

      {allProjects.length === 0 ? (
        <p className="text-center text-muted-foreground font-mono text-lg">No projects to display yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-4 masonry">
          {allProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
