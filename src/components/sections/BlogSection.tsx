
"use client";

import type { BlogPost } from "@/types";
import BlogPostCard from "@/components/cards/BlogPostCard";
import EmailSignupForm from "@/components/forms/EmailSignupForm";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { FileText } from "lucide-react";

const blogPosts: BlogPost[] = [
  {
    id: "4",
    title: "Building a Design System with Tailwind & ShadCN",
    date: "August 05, 2024",
    summary: "A practical guide to creating a scalable and maintainable design system from scratch using the power of Tailwind CSS and the flexibility of ShadCN UI.",
    slug: "design-system-tailwind-shadcn",
    imageUrl: "/images/blog/design-system.png",
    imageHint: "design system components",
  },
  {
    id: "5",
    title: "Why I Chose Next.js for This Portfolio",
    date: "July 22, 2024",
    summary: "An inside look at the decisions behind the tech stack for this portfolio, focusing on the advantages of Next.js for performance and developer experience.",
    slug: "why-nextjs",
    imageUrl: "/images/blog/why-nextjs.png",
    imageHint: "code editor",
  },
  {
    id: "1",
    title: "Mastering Motion Primitives in Web Design",
    date: "July 15, 2024",
    summary: "A deep dive into using Framer Motion to create stunning and interactive user experiences. Learn about key concepts and practical examples.",
    slug: "mastering-motion-primitives",
    imageUrl: "/images/blog/mastering-motion-primitives.png",
    imageHint: "abstract animation",
    quizId: "motion-primitives-quiz",
  },
  {
    id: "2",
    title: "The Rise of Server Components in Next.js",
    date: "June 28, 2024",
    summary: "Exploring the benefits and best practices of using React Server Components with Next.js for improved performance and developer experience.",
    slug: "server-components-nextjs",
    imageUrl: "/images/blog/server-components-nextjs.png",
    imageHint: "code server",
  },
  {
    id: "3",
    title: "AI in Modern Web Development: Beyond Chatbots",
    date: "May 10, 2024",
    summary: "How generative AI is transforming web development, from code generation to personalized user experiences. Featuring tools like the Portfolio Enhancer!",
    slug: "ai-in-web-dev",
    imageUrl: "/images/blog/ai-in-web-dev.png",
    imageHint: "artificial intelligence",
  },
];

export default function BlogSection() {
  return (
    <AnimatedSection id="blog" className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center mb-12">
          <FileText className="h-10 w-10 text-primary mr-4" />
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Latest Insights</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {blogPosts.map((post, index) => (
            <BlogPostCard key={post.id} post={post} index={index} />
          ))}
        </div>
        <div className="max-w-xl mx-auto">
          <h3 className="font-headline text-2xl font-semibold text-center mb-4 text-primary">Stay Updated</h3>
          <p className="text-center text-muted-foreground mb-8">
            Subscribe to my newsletter for the latest articles, project updates, and tech insights.
          </p>
          <EmailSignupForm />
        </div>
      </div>
    </AnimatedSection>
  );
}
