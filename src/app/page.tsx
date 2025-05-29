
import BioSection from '@/components/BioSection';
import SocialLinks from '@/components/SocialLinks';
import ProjectCard from '@/components/ProjectCard';
import { getProjects } from '@/lib/projects';
import { MdGridView, MdArrowForward } from 'react-icons/md'; // Material Design Icons
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home - Alex Zewebrand',
  description: 'Welcome to måsstaden, a brutalist-inspired portfolio showcasing innovative web projects, design experiments, and a passion for creative technology.',
  openGraph: {
    title: 'Home - Alex Zewebrand',
    description: 'Welcome to måsstaden, a brutalist-inspired portfolio.',
    // Potentially add a specific OG image for the homepage if different from the default
  },
  twitter: {
    title: 'Home - Alex Zewebrand',
    description: 'Welcome to måsstaden, a brutalist-inspired portfolio.',
     // Potentially add a specific Twitter image for the homepage
  }
};

export default async function HomePage() {
  const allProjects = await getProjects();
  const featuredProjects = allProjects.slice(0, 4); // Show first 4 projects

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
                <MdGridView className="h-10 w-10 md:h-12 md:w-12 text-accent mr-0 md:mr-4 mb-2 md:mb-0" aria-hidden="true" />
                <h2 id="featured-projects-heading" className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                  Featured Pr<span className="text-accent">Ø</span>ject
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

            {allProjects.length > featuredProjects.length && (
              <div className="mt-10 md:mt-12 text-center">
                <Link href="/projects" className="btn-brutalist group inline-flex items-center">
                  View All Pr
                  <span className="text-accent group-hover:text-[hsl(var(--accent-projects-values))]">
                    Ø
                  </span>
                  jects
                  <MdArrowForward className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
