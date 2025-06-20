
import { getProjectBySlug, getProjects } from '@/lib/projects';
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MdArrowBack, MdLayers, MdChevronLeft, MdChevronRight } from 'react-icons/md';
import type { Project } from '@/types';

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const projects = await getProjects();
  if (!Array.isArray(projects)) {
    return [];
  }
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: 'Project Not Found | Alex Zewebrand',
      description: 'The project you are looking for does not exist.',
    };
  }

  const pageTitle = typeof project.title === 'string' && project.title ? project.title : 'Project Details';
  const pageDescription = typeof project.shortDescription === 'string' && project.shortDescription ? project.shortDescription : 'View details about this project.';


  return {
    title: `${pageTitle} | Project Details - Alex Zewebrand`,
    description: pageDescription,
    openGraph: {
      title: `${pageTitle} - Project Details`,
      description: pageDescription,
      images: [
        {
          url: project.imageUrl,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${pageTitle} - Project Details`,
      description: pageDescription,
      images: [project.imageUrl],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound(); 
  }

  const allProjects = await getProjects();
  let previousProject: Project | null = null;
  let nextProject: Project | null = null;

  if (Array.isArray(allProjects) && allProjects.length > 0) {
    const currentIndex = allProjects.findIndex(p => p.slug === project.slug);
    if (currentIndex > 0) {
      previousProject = allProjects[currentIndex - 1];
    }
    if (currentIndex !== -1 && currentIndex < allProjects.length - 1) {
      nextProject = allProjects[currentIndex + 1];
    }
  }

  const technologies =
    project.technologies && Array.isArray(project.technologies)
      ? project.technologies
      : [];
      
  const displayTitle = typeof project.title === 'string' && project.title ? project.title : 'Untitled PrØject';
  const projectDescription = typeof project.description === 'string' ? project.description : 'No detailed description available for this prØject.';
  const projectImageAlt = `Showcase image for ${displayTitle}`;

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <Link
        href="/"
        className="btn-brutalist-sm mb-8 inline-flex items-center group"
      >
        <MdArrowBack className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
        Back t<span className="text-accent group-hover:text-[hsl(var(--accent-projects-values))]">Ø</span> H<span className="text-accent group-hover:text-[hsl(var(--accent-projects-values))]">Ø</span>me
      </Link>

      <article className="bg-card border-2 border-foreground p-6 md:p-8 shadow-[8px_8px_0px_0px_hsl(var(--accent))]">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8">
          {displayTitle.split('').map((char, index) =>
            char.toLowerCase() === 'o' ? (
              <span key={index} className="text-accent">
                Ø
              </span>
            ) : (
              char
            )
          )}
        </h1>

        <div className="aspect-[16/9] relative mb-6 md:mb-8 border-2 border-foreground overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={projectImageAlt}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
            className="object-cover"
            priority
            data-ai-hint={project.dataAiHint || "project showcase"}
          />
        </div>

        
        <div className="prose prose-invert prose-lg max-w-none mb-6 md:mb-8 font-mono text-foreground">
          <p>{projectDescription}</p>
        </div>

        {technologies.length > 0 && (
          <section aria-labelledby="technologies-heading" className="mb-8 md:mb-10">
            <div className="flex items-center mb-4">
              <MdLayers className="h-6 w-6 text-accent mr-3" aria-hidden="true" />
              <h2 id="technologies-heading" className="text-2xl md:text-3xl font-black uppercase tracking-tight">
                Tech Stack
              </h2>
            </div>
            <ul className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <li
                  key={tech}
                  className="bg-background border-2 border-foreground text-foreground px-3 py-1 text-sm md:text-base font-mono"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>

      {(previousProject || nextProject) && (
        <nav className="mt-10 md:mt-12 flex flex-col sm:flex-row justify-between items-center gap-4" aria-label="Project navigation">
          {previousProject ? (
            <Link
              href={`/projects/${previousProject.slug}`}
              className="btn-brutalist-sm inline-flex items-center group order-1 sm:order-none"
              aria-label={`Previous project: ${previousProject.title}`}
            >
              <MdChevronLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
              Prev Pr<span className="text-accent group-hover:text-[hsl(var(--accent-projects-values))]">Ø</span>ject
            </Link>
          ) : <div className="order-1 sm:order-none"></div> /* Placeholder for spacing */}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="btn-brutalist-sm inline-flex items-center group order-2 sm:order-none"
              aria-label={`Next project: ${nextProject.title}`}
            >
              Next Pr<span className="text-accent group-hover:text-[hsl(var(--accent-projects-values))]">Ø</span>ject
              <MdChevronRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          ) : <div className="order-2 sm:order-none"></div> /* Placeholder for spacing */}
        </nav>
      )}
    </div>
  );
}
