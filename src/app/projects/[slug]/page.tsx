
import { getProjectBySlug, getProjects } from '@/lib/projects';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MdArrowBack, MdLocalOffer } from 'react-icons/md'; // Material Design Icons
import type { Metadata, ResolvingMetadata } from 'next';
import type { Project } from '@/types';

interface PageParams {
  slug: string;
}

interface PageProps {
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
  { params, searchParams }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  // Optionally use parent metadata
  // const previousImages = (await parent).openGraph?.images || []

  if (!project) {
    return { 
      title: 'Project Not Found',
      description: 'The project you are looking for does not exist.',
    };
  }
  return {
    title: project.title, // Will be combined with title.template from layout
    description: project.shortDescription,
    openGraph: {
      title: `${project.title} - måsstaden`,
      description: project.shortDescription,
      type: 'article',
      url: `https://alexzewebrand.com/projects/${project.slug}`, // Replace with your actual domain
      images: [
        {
          url: project.imageUrl, // Assuming imageUrl is absolute or will be prefixed
          width: 1200, // Adjust if your images have different dimensions
          height: 800, // Adjust if your images have different dimensions
          alt: `Showcase image for ${project.title}`,
        },
        // ...previousImages, // Example of merging parent images
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} - måsstaden`,
      description: project.shortDescription,
      images: [project.imageUrl], // Assuming imageUrl is absolute or will be prefixed
    },
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
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

      <div className="relative w-full aspect-[16/9] md:aspect-[2/1] border-2 border-foreground mb-8 md:mb-12 overflow-hidden shadow-[8px_8px_0px_0px_hsl(var(--foreground))] hover:shadow-[10px_10px_0px_0px_hsl(var(--foreground))] transition-shadow duration-200">
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
