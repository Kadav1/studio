
"use client";

import type { BlogPost } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, CalendarDays, BrainCircuit } from "lucide-react";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { getQuizById } from "@/data/quiz";
import QuizComponent from "@/components/shared/Quiz";

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogPostCard({ post, index }: BlogPostCardProps) {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } },
  };

  const quiz = post.quizId ? getQuizById(post.quizId) : undefined;

  return (
    <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-xl group">
        {post.imageUrl && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              sizes="100vw"
              data-ai-hint={post.imageHint || "blog article"}
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="font-headline text-xl text-primary">{post.title}</CardTitle>
          <CardDescription className="flex items-center text-muted-foreground pt-1">
            <CalendarDays className="h-4 w-4 mr-2" />
            {post.date}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-foreground/90 leading-relaxed">{post.summary}</p>
        </CardContent>
        <CardFooter className="pt-4 border-t flex justify-between items-center">
          <Button variant="link" asChild className="text-accent p-0 hover:text-accent/80 group/link">
            {/* In a real app, this would link to `/blog/${post.slug}` */}
            <Link href={`#blog`}> 
              Read More <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/link:translate-x-1" />
            </Link>
          </Button>

          {quiz && (
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary">
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  Take Quiz
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl p-0 bg-transparent border-0">
                <DialogHeader className="sr-only">
                    <DialogTitle>{quiz.title}</DialogTitle>
                    <DialogDescription>A short quiz about the blog post: {post.title}</DialogDescription>
                </DialogHeader>
                {/* The QuizComponent contains its own Card for styling */}
                <QuizComponent quiz={quiz} />
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
}
