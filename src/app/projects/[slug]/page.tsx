
import type { Metadata, ResolvingMetadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MdArrowBack, MdLocalOffer } from 'react-icons/md'; 
import type { Project } from '@/types';
import { getProjectBySlug, getProjects } from '@/lib/projects';

interface PageParams {
  slug: string;
}

interface GenerateMetadataProps {
  params: PageParams;
  searchParams?: { [key: string]: string | string[] | undefined };
}

interface ProjectDetailPageProps {
  params: PageParams;
  searchParams?: { [key: string]: string | string[] | undefined };
}

export async function generateStaticParams(): Promise<PageParams[]> {
  const projects = await getProjects();
  if (!Array.isArray(projects)) {
    return [];
  }
  return projects.map((project: Project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata(
  { params, searchParams }: GenerateMetadataProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);
  const _parentResult = await parent; // "Use" parent to satisfy linters if not merging

  if (!project) {
    return { 
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
    };
  }
  return {
    title: project.title, 
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} - måsstaden`,
      description: project.shortDescription,
      type: 'article',
      url: `https://alexzewebrand.com/projects/${project.slug}`, 
      images: [
        {
          url: project.imageUrl, 
          width: 1200, 
          height: 800, 
          alt: `Showcase image for ${project.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - måsstaden`,
      description: project.shortDescription,
      images: [project.imageUrl], 
    },
  };
}

export default async function ProjectDetailPage({ params, searchParams }: ProjectDetailPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex flex-col">
      <header className="mb-8 md:mb-12">
        <Link href="/projects" className="inline-flex items-center btn-brutalist-sm mb-8 group">
          <MdArrowBack className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" aria-hidden="true" />
          Back to Pr
          <span className="text-accent group-hover:text-[hsl(var(--accent-projects-values))]">
            Ø
          </span>
          jects
        </Link>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black uppercase tracking-tighter break-words">
          {project.title.split('').map((char, index) =>
            char.toLowerCase() === 'o' ? (
              <span key={index} className="text-accent">
                Ø
              </span>
            ) : (
              char
            )
          )}
        </h1>
      </header>

      <div className="relative w-full aspect-[16/9] md:aspect-[2/1] border-2 border-foreground mb-8 md:mb-12 overflow-hidden 
                     shadow-[4px_4px_0px_0px_hsl(var(--foreground))] 
                     hover:shadow-[6px_6px_0px_0px_hsl(var(--foreground))] 
                     md:shadow-[8px_8px_0px_0px_hsl(var(--foreground))] 
                     md:hover:shadow-[10px_10px_0px_0px_hsl(var(--foreground))] 
                     transition-shadow duration-200">
        <Image
          src={project.imageUrl}
          alt={`Showcase image for ${project.title}`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          data-ai-hint={project.dataAiHint || "project main image"}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        <div className="md:col-span-2">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4 border-b-2 border-accent pb-2">
            Description
          </h2>
          <p className="text-base md:text-lg leading-relaxed font-mono whitespace-pre-line">
            {project.description}
          </p>
        </div>
        <div>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4 border-b-2 border-accent pb-2">
            Tech Stack
          </h2>
          <ul className="space-y-2">
            {project.technologies.map((tech) => (
              <li key={tech} className="flex items-center font-mono text-base md:text-lg">
                <MdLocalOffer className="h-5 w-5 mr-3 text-accent" aria-hidden="true" />
                {tech}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
