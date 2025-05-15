import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/projects';
import { MdGridView } from 'react-icons/md'; // Material Design Icons

export const metadata = {
  title: 'Projects - BruteFolio',
  description: 'A showcase of projects with brutalist design.',
};

export default function ProjectsPage() {
  return (
    <div className="space-y-12">
      <header className="border-b-2 border-foreground pb-6 mb-12">
        <div className="flex items-center">
          <MdGridView className="h-12 w-12 text-accent mr-4" />
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Projects
          </h1>
        </div>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground font-mono">
          A collection of my work, experiments, and explorations in the digital realm.
        </p>
      </header>

      {projects.length === 0 ? (
        <p className="text-center text-muted-foreground font-mono text-lg">No projects to display yet. Check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
