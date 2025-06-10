
import BioSection from '@/components/BioSection';
import SocialLinks from '@/components/SocialLinks';
import { getProjects } from '@/lib/projects';
import { MdGridView } from 'react-icons/md';
import type { Metadata } from 'next';
import FeaturedProjectsClient from '@/components/FeaturedProjectsClient';

export const metadata: Metadata = {
  title: 'Home - Alex Zewebrand',
  description: 'Welcome to måsstaden, a brutalist-inspired portfolio showcasing innovative web projects, design experiments, and a passion for creative technology. All content is on this single page.',
  openGraph: {
    title: 'Home - Alex Zewebrand',
    description: 'Welcome to måsstaden, a brutalist-inspired single-page portfolio.',
  },
  twitter: {
    title: 'Home - Alex Zewebrand',
    description: 'Welcome to måsstaden, a brutalist-inspired single-page portfolio.',
  }
};

export default async function HomePage() {
  const allProjects = await getProjects();

  return (
    <div className="space-y-16 md:space-y-24 py-8">
      <div className="container mx-auto flex flex-col items-center px-4">
        <BioSection />
      </div>

      <section aria-labelledby="featured-projects-heading">
        <div className="container mx-auto px-4">
          <header className="mb-10 md:mb-12 text-center border-b-2 border-foreground pb-6">
            <div className="flex flex-col md:flex-row items-center justify-center">
              <MdGridView className="h-10 w-10 md:h-12 md:w-12 text-accent mr-0 md:mr-4 mb-2 md:mb-0" aria-hidden="true" />
              <h2 id="featured-projects-heading" className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
                Featured Pr<span className="text-accent">Ø</span>jects
              </h2>
            </div>
            <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground font-mono text-center">
              A selection of my recent work and explorations.
            </p>
          </header>
          {allProjects.length > 0 ? (
            <FeaturedProjectsClient allProjects={allProjects} />
          ) : (
            <div className="text-center py-10">
              <p className="text-xl md:text-2xl text-muted-foreground font-mono">
                N<span className="text-accent">Ø</span> pr<span className="text-accent">Ø</span>jects t<span className="text-accent">Ø</span> display yet.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground font-mono mt-2">
                C<span className="text-accent">Ø</span>ming s<span className="text-accent">ØØ</span>n!
              </p>
            </div>
          )}
        </div>
      </section>

      <div className="container mx-auto flex flex-col items-center px-4">
        <SocialLinks />
      </div>
    </div>
  );
}
