
export type Project = {
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  thumbnailUrl: string;
  imageUrl: string;
  technologies: string[];
  dataAiHint?: string; // Added optional property for AI hints
};
