import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/types';
import { MdArrowOutward } from 'react-icons/md'; // Material Design Icons

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.slug}`} className="block group">
      <div className="border-2 border-foreground bg-card p-4 group-hover:bg-secondary transition-all duration-200 ease-out group-hover:shadow-[8px_8px_0px_0px_hsl(var(--accent))] group-hover:-translate-y-1">
        <div className="aspect-[3/2] relative mb-4 border-2 border-foreground overflow-hidden">
          <Image
            src={project.thumbnailUrl}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={project.dataAiHint || "abstract technology"}
          />
        </div>
        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">
          {project.title.split('').map((char, index) =>
            char.toLowerCase() === 'o' ? (
              <span key={index} className="text-accent group-hover:text-[hsl(var(--accent-projects-values))]">
                Ø
              </span>
            ) : (
              char
            )
          )}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground font-mono mb-3 line-clamp-2">
          {project.shortDescription}
        </p>
        <div className="flex items-center text-accent font-bold uppercase text-sm tracking-wider group-hover:text-[hsl(var(--accent-projects-values))]">
          View Pr
          <span className="text-accent group-hover:text-[hsl(var(--accent-projects-values))]">
            Ø
          </span>
          ject{' '}
          <MdArrowOutward className="h-5 w-5 ml-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform group-hover:text-[hsl(var(--accent-projects-values))]" />
        </div>
      </div>
    </Link>
  );
}
