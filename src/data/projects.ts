
import type { Project } from "@/types";

export const allProjects: Project[] = [
  {
    id: "1",
    slug: "chroma-ai",
    title: "Chroma AI",
    description: "An intelligent design assistant that generates 5-color palettes from images, text, or a single color using Google's Gemini and Genkit.",
    imageUrl: "/images/projects/chroma-ai.png",
    imageHint: "color palette app",
    tags: ["NextJS", "TypeScript", "Tailwind CSS", "Gemini", "Genkit", "AI", "Framer Motion"],
    projectUrl: "https://studio--chroma-ai-3nasf.us-central1.hosted.app/",
    repoUrl: "https://github.com/Firebase/firebase-genkit-samples/tree/main/chroma-ai",
    usesMotionPrimitives: true,
    caseStudy: {
        problem: "Designers and developers often struggle with creating harmonious and accessible color palettes. Existing tools can be rigid, lacking the contextual understanding to generate truly creative or thematically appropriate color schemes from abstract ideas or images.",
        solution: "Chroma AI was built to solve this by leveraging generative AI. Using Google's Gemini Pro and Genkit, it interprets user input—whether a text prompt, an image, or a single color—to generate unique 5-color palettes. It provides both 'AI Magic' for creative freedom and classic color theory for traditional harmony. The front-end, built with Next.js and ShadCN UI, offers an interactive experience where users can view color values, analyze accessibility, and preview the palette on a sample UI in real-time.",
        outcome: "The result is a powerful, intuitive tool that significantly speeds up the design process. It not only generates palettes but also educates users on their choices by providing AI-driven analysis of color psychology and accessibility. The use of Framer Motion for subtle animations creates a polished, modern user experience that feels responsive and engaging.",
        gallery: [
            { 
                url: "https://placehold.co/600x400.png",
                hint: "app screenshot dashboard",
                caption: "The main dashboard showing a generated palette and real-time UI preview." 
            },
            { 
                url: "https://placehold.co/600x400.png",
                hint: "color analysis accessibility",
                caption: "AI-powered analysis of color accessibility and psychology."
            }
        ]
    }
  },
  {
    id: "2",
    slug: "e-commerce-platform",
    title: "TBA E-commerce",
    description: "dolore eu sea dolore ipsum tempor molestie et eos lorem accusam option stet dolores zzril dolor.",
    imageUrl: "https://placehold.co/600x400.png", 
    imageHint: "online store",
    tags: ["Next.js", "Stripe", "Tailwind CSS", "Firebase"],
    projectUrl: "#",
  },
  {
    id: "3",
    slug: "mobile-app-concept",
    title: "TBA Mobile App",
    description: "at diam esse eum dolore ut delenit sit voluptua stet ut sea ea at labore ipsum.",
    imageUrl: "https://placehold.co/600x400.png", 
    imageHint: "mobile app interface",
    tags: ["React Native", "Firebase", "Redux"],
    repoUrl: "#",
  },
  {
    id: "4",
    slug: "ai-portfolio-enhancer",
    title: "TBA AI Tool",
    description: "et gubergren sit velit dolore in ea quis sit blandit elitr dolor iusto nulla et ut",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "ai interface",
    tags: ["Next.js", "GenAI", "Tailwind CSS", "Framer Motion"],
    projectUrl: "#ai-enhancer",
    usesMotionPrimitives: true,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug);
}
