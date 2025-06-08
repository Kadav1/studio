
import Link from 'next/link';
import Image from 'next/image';
import type { Project } from '@/types';
import BorderTrailCard from '@/components/ui/BorderTrailCard';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const displayTitle = typeof project.title === 'string' && project.title ? project.title : 'Untitled PrØject';

  return (
    <BorderTrailCard
      className={cn(
        "block group h-full transition-shadow duration-200",
        "shadow-[4px_4px_0px_0px_hsl(var(--accent))]",
        "hover:shadow-[6px_6px_0px_0px_hsl(var(--accent))]",
        "sm:shadow-[6px_6px_0px_0px_hsl(var(--accent))]",
        "sm:hover:shadow-[8px_8px_0px_0px_hsl(var(--accent))]",
        "md:shadow-[8px_8px_0px_0px_hsl(var(--accent))]",
        "md:hover:shadow-[10px_10px_0px_0px_hsl(var(--accent))]"
      )}
    >
      <Link
        href={`/projects/${project.slug}`}
        className={cn(
          "flex flex-col h-full",
          "bg-card p-4 rounded-[var(--radius)]" // Content background, padding, and rounding
        )}
      >
        <div className="aspect-[3/2] relative mb-4 border-2 border-foreground overflow-hidden">
          <Image
            src={project.thumbnailUrl}
            alt={project.title || 'Project image'} // Add fallback for alt text
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            data-ai-hint={project.dataAiHint || "abstract technology"}
          />
        </div>
        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">
          {displayTitle.split('').map((char, index) =>
            char.toLowerCase() === 'o' ? (
              <span key={index} className="text-accent group-hover:text-[hsl(var(--accent-projects-values))]">
                Ø
              </span>
            ) : (
              char
            )
          )}
        </h3>
        <p className="text-sm md:text-base text-muted-foreground font-mono mb-3 line-clamp-2 flex-grow">
          {project.shortDescription}
        </p>
      </Link>
    </BorderTrailCard>
  );
}
