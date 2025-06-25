
"use client";

import type { BlogPost } from "@/types";
import BlogPostCard from "@/components/cards/BlogPostCard";
import EmailSignupForm from "@/components/forms/EmailSignupForm";
import { FileText } from "lucide-react";

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="flex items-center mb-12">
        <FileText className="h-10 w-10 text-primary mr-4" />
        <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary">Latest Insights</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {posts.map((post, index) => (
          <BlogPostCard key={post.slug} post={post} index={index} />
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
  );
}
