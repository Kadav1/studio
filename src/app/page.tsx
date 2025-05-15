
import BioSection from '@/components/BioSection';
import SocialLinks from '@/components/SocialLinks';
import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/projects';
import { MdGridView, MdArrowForward } from 'react-icons/md'; // Material Design Icons
import Link from 'next/link';

export default function HomePage() {
  const featuredProjects = projects.slice(0, 3); // Show first 3 projects

  return (
    <div className="space-y-16 md:space-y-24 py-8">
      {/* Bio Section */}
      <div className="container mx-auto flex flex-col items-center px-4">
        <BioSection />
      </div>

      {/* Featured Projects Section */}
      {featuredProjects.length > 0 && (
        <section aria-labelledby="featured-projects-heading">
          <div className="container mx-auto px-4">
            <header className="mb-10 md:mb-12 text-center md:text-left border-b-2 border-foreground pb-6">
              <div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
                <MdGridView className="h-10 w-10 md:h-12 md:w-12 text-accent mr-0 md:mr-4 mb-2 md:mb-0" />
                <h2 id="featured-projects-heading" className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                  Featured Projects
                </h2>
              </div>
              <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground font-mono text-center md:text-left">
                A selection of my recent work and explorations.
              </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>

            {projects.length > 3 && (
              <div className="mt-10 md:mt-12 text-center">
                <Link href="/projects" className="btn-brutalist group inline-flex items-center">
                  View All Projects
                  <MdArrowForward className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Social Links Section */}
      <div className="container mx-auto flex flex-col items-center px-4">
        <SocialLinks />
      </div>
    </div>
  );
}
