
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
    description: "A scalable and secure e-commerce platform built with Next.js and integrated with Stripe for seamless payments. Features a modern UI and robust product management.",
    imageUrl: "https://placehold.co/600x400.png", 
    imageHint: "online store",
    tags: ["Next.js", "Stripe", "Tailwind CSS", "Firebase"],
    projectUrl: "#",
  },
  {
    id: "3",
    slug: "mobile-app-concept",
    title: "TBA Mobile App",
    description: "A cross-platform mobile application concept designed with React Native. Focuses on a clean user experience and real-time data synchronization using Firebase.",
    imageUrl: "https://placehold.co/600x400.png", 
    imageHint: "mobile app interface",
    tags: ["React Native", "Firebase", "Redux"],
    repoUrl: "#",
  },
  {
    id: "4",
    slug: "ai-portfolio-enhancer",
    title: "TBA AI Tool",
    description: "An innovative AI-powered tool that enhances creative workflows. Utilizes generative AI to provide smart suggestions and automate repetitive tasks for designers.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "ai interface",
    tags: ["Next.js", "GenAI", "Tailwind CSS", "Framer Motion"],
    projectUrl: "#ai-enhancer",
    usesMotionPrimitives: true,
  },
  {
    id: "5",
    slug: "focus-flow",
    title: "Focus Flow",
    description: "A sleek and intuitive task management application designed to help users organize their daily tasks and boost productivity through focused work sessions.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "task manager app",
    tags: ["React", "TypeScript", "Node.js", "Express", "PostgreSQL", "Tailwind CSS"],
    projectUrl: "#",
    repoUrl: "#",
    usesMotionPrimitives: false,
    caseStudy: {
        problem: "Users often struggle with managing multiple tasks and maintaining focus. Many existing to-do apps are either too simple or overly complex, leading to a cluttered workflow and decreased productivity.",
        solution: "Focus Flow provides a clean, minimalist interface for task management. It integrates a Pomodoro-style timer to encourage focused work intervals. Users can create projects, add tasks with due dates and priorities, and track their progress. The back-end is a robust REST API built with Node.js and Express, connected to a PostgreSQL database.",
        outcome: "The application helps users better organize their work and life. The clean design reduces cognitive load, while the integrated focus timer promotes deep work, leading to improved efficiency and a greater sense of accomplishment.",
        gallery: [
            {
                url: "https://placehold.co/600x400.png",
                hint: "app tasks view",
                caption: "The main task view, showing a list of tasks organized by project."
            },
            {
                url: "https://placehold.co/600x400.png",
                hint: "app timer view",
                caption: "The integrated focus timer helps users work in dedicated, distraction-free intervals."
            }
        ]
    }
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return allProjects.find((project) => project.slug === slug);
}
