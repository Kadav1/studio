export type AiLabProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageUrl?: string; // Optional image
  imageHint?: string;
  videoUrl?: string; // Optional video
  codeUrl?: string; // Optional link to code repository
  demoUrl?: string; // Optional link to a live demo
  tags?: string[]; // Optional array of tags
};

export const aiLabProjects: AiLabProject[] = [
  {
    id: "1",
    slug: "ai-text-generator-experiment",
    title: "AI Text Generator Experiment",
    description: "Exploring prompt engineering and output variations using a large language model for creative text generation.",
    codeUrl: "https://github.com/your-username/ai-text-experiment",
    tags: ["AI", "Code", "Experiment", "LLM"],
  },
  {
    id: "2",
    slug: "abstract-ai-art-series",
    title: "Abstract AI Art Series",
    description: "A collection of abstract art pieces generated using AI, focusing on color palettes and forms.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "abstract art",
    tags: ["AI Art", "Experiment", "Digital Art"],
  },
];
