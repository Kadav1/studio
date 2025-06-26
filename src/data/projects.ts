
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
        solution: "Chroma AI was built to solve this by leveraging the creative power of generative AI. Using Google's Gemini Pro model via the Genkit framework, the application interprets complex user input—whether a text prompt like 'a serene sunset over a futuristic city', a photograph, or a single seed color—to generate unique and context-aware 5-color palettes. The system offers two modes: 'AI Magic' for maximum creativity and 'Color Theory' for generating traditional schemes (complementary, triadic, etc.). The front-end, built with Next.js and ShadCN UI, provides a highly interactive experience where users can view color values (Hex, RGB, HSL), analyze accessibility contrast ratios against WCAG standards, and preview the palette on a sample UI in real-time.",
        outcome: "The result is a powerful, intuitive tool that significantly accelerates the design process and empowers creativity. It not only generates palettes but also educates users on their choices by providing AI-driven analysis of color psychology and accessibility scores for each color pair. The use of Framer Motion for subtle animations and state transitions creates a polished, modern user experience that feels responsive and engaging, demonstrating a strong command of front-end development and AI integration.",
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
    title: "NextGen E-commerce",
    description: "A scalable and secure e-commerce platform built with Next.js and integrated with Stripe for seamless payments. Features a modern UI and robust product management.",
    imageUrl: "https://placehold.co/600x400.png", 
    imageHint: "online store",
    tags: ["Next.js", "Stripe", "Tailwind CSS", "Firebase"],
    projectUrl: "#",
    caseStudy: {
      problem: "Small businesses need a cost-effective and easy-to-manage solution to sell their products online, but custom solutions are often expensive and complex.",
      solution: "This project provides a full-featured e-commerce storefront built with Next.js for high performance and SEO. It integrates Stripe for secure payment processing and uses Firebase for backend services like user authentication and product management, offering a complete, scalable solution.",
      outcome: "The platform enables businesses to quickly launch a professional online store with minimal setup. The separation of the front-end from back-end services allows for easy customization and maintenance."
    }
  },
  {
    id: "3",
    slug: "mobile-app-concept",
    title: "SyncUp Mobile",
    description: "A cross-platform mobile application concept designed with React Native. Focuses on a clean user experience and real-time data synchronization using Firebase.",
    imageUrl: "https://placehold.co/600x400.png", 
    imageHint: "mobile app interface",
    tags: ["React Native", "Firebase", "Redux"],
    repoUrl: "#",
    caseStudy: {
      problem: "Teams working remotely need a simple way to stay connected and share updates without the clutter of complex project management tools.",
      solution: "SyncUp is a mobile-first application built with React Native, allowing it to run on both iOS and Android from a single codebase. It uses Firebase's Realtime Database to keep team activities synchronized instantly. State management is handled efficiently with Redux.",
      outcome: "The app offers a lightweight, real-time solution for team collaboration, improving communication and ensuring everyone stays on the same page, regardless of their location or device."
    }
  },
  {
    id: "4",
    slug: "ai-portfolio-enhancer",
    title: "AI Portfolio Assistant",
    description: "An innovative AI-powered tool leveraging Google's Genkit and Gemini to transform raw project details into compelling, recruiter-friendly narratives. It provides granular feedback, suggests tailored rewrites, and optimizes for keywords, helping users articulate their value and showcase their work effectively.",
    imageUrl: "https://placehold.co/600x400.png",
    imageHint: "ai interface",
    tags: ["Next.js", "Genkit", "Gemini", "Tailwind CSS", "Framer Motion"],
    projectUrl: "/ai-lab#ai-enhancer",
    usesMotionPrimitives: true,
    caseStudy: {
 problem: "Many talented individuals struggle to effectively articulate the value and impact of their portfolio projects, often focusing on technical features rather than outcomes and key skills that resonate with recruiters and clients.",
 solution: "Built as an interactive feature within this portfolio using the power of Google's Genkit framework and the Gemini model, the AI Portfolio Assistant acts as a smart co-pilot. Users input their project description, and the AI provides insightful feedback, suggesting improvements to highlight impact, quantify results, and optimize language. It offers rewritten versions and relevant keywords. This demonstrates a practical application of AI, integrated seamlessly into a Next.js front-end, showcasing both AI development and full-stack capabilities.",
 outcome: "More than just a static project display, this tool offers immediate value to visitors, allowing them to experience the power of AI firsthand while improving their own professional profiles. It serves as a dynamic showcase of expertise in AI integration, full-stack development, and a creative approach to building helpful applications that solve real-world problems. It positions the portfolio as an innovative and useful resource.",
        gallery: [
 {
                url: "https://placehold.co/600x400.png",
                hint: "ai feedback interface",
                caption: "The AI enhancer providing feedback on a sample project description." 
 }
        ]
    }
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
        problem: "Users often struggle with managing multiple tasks and maintaining focus in a world full of digital distractions. Many existing to-do apps are either too simple, lacking organizational features, or overly complex, leading to a cluttered workflow and decreased productivity.",
        solution: "Focus Flow addresses this with a clean, minimalist interface for distraction-free task management. Built with a classic MERN-like stack (PostgreSQL, Express, React, Node.js), it integrates a Pomodoro-style timer to encourage focused work intervals. Users can create projects, add tasks with due dates and priorities, and drag-and-drop them to reorder. The back-end is a robust RESTful API built with Node.js and Express, connected to a PostgreSQL database for reliable data persistence. The front-end uses React with TypeScript for a type-safe and maintainable codebase, and Tailwind CSS for styling.",
        outcome: "The application helps users better organize their work and personal life by providing a simple yet powerful structure. The clean design reduces cognitive load, while the integrated focus timer promotes deep work, leading to improved efficiency and a greater sense of accomplishment. The project demonstrates full-stack capabilities, including database design, API development, and modern front-end practices.",
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
