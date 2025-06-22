"use client";

import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { enhancePortfolio } from "@/ai/flows/portfolio-enhancement";
import type { PortfolioEnhancementOutput } from "@/types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Wand2 } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { motion } from "framer-motion";

const formSchema = z.object({
  description: z.string().min(20, "Please provide at least 20 characters.").max(1000, "Description must be 1000 characters or less."),
});
type FormValues = z.infer<typeof formSchema>;

export default function PortfolioEnhancementSection() {
  const [result, setResult] = useState<PortfolioEnhancementOutput | null>(null);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: "" },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setResult(null);
    startTransition(async () => {
      try {
        const aiResponse = await enhancePortfolio(data.description);
        setResult(aiResponse);
      } catch (error) {
        console.error("Portfolio enhancement failed:", error);
        toast({
          title: "An Error Occurred",
          description: "The AI failed to generate a response. Please try again.",
          variant: "destructive",
        });
      }
    });
  };

  return (
    <AnimatedSection id="ai-enhancer" className="bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center mb-12 flex-col text-center">
          <div className="p-3 bg-primary/10 rounded-full mb-4 inline-block">
            <Sparkles className="h-10 w-10 text-primary" />
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-3">AI Portfolio Review</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Want to make your project descriptions stand out? Paste one below and let my AI assistant, powered by Genkit, give you feedback.
          </p>
        </div>

        <Card className="max-w-4xl mx-auto shadow-lg border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center"><Wand2 className="mr-2 h-5 w-5 text-accent"/> Your Project Description</CardTitle>
            <CardDescription>Enter a description of one of your projects to get feedback, a rewritten version, and keyword suggestions.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Textarea
                {...form.register("description")}
                placeholder="For example: 'I built a simple to-do list app using React and CSS...'"
                className="min-h-[150px] text-base"
                disabled={isPending}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>
              )}
              <Button type="submit" className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Feedback
                  </>
                )}
              </Button>
            </form>

            {isPending && (
                <div className="mt-8 space-y-4 pt-6 border-t">
                    <div className="bg-muted/50 p-4 rounded-lg animate-pulse">
                        <div className="h-4 bg-muted rounded w-1/4 mb-4"></div>
                        <div className="h-3 bg-muted rounded w-full mb-2"></div>
                        <div className="h-3 bg-muted rounded w-5/6"></div>
                    </div>
                     <div className="bg-muted/50 p-4 rounded-lg animate-pulse">
                        <div className="h-4 bg-muted rounded w-1/3 mb-4"></div>
                        <div className="h-3 bg-muted rounded w-full mb-2"></div>
                         <div className="h-3 bg-muted rounded w-full mb-2"></div>
                        <div className="h-3 bg-muted rounded w-3/4"></div>
                    </div>
                </div>
            )}

            {result && (
              <div className="mt-8 space-y-6 pt-6 border-t">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h3 className="font-headline text-xl font-semibold text-primary mb-2">Constructive Feedback</h3>
                  <p className="text-foreground/90 leading-relaxed">{result.feedback}</p>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <h3 className="font-headline text-xl font-semibold text-primary mb-2">Suggested Rewrite</h3>
                   <blockquote className="border-l-4 border-accent pl-4 italic text-foreground/80 bg-accent/10 p-4 rounded-r-lg">
                    {result.rewrittenDescription}
                  </blockquote>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <h3 className="font-headline text-xl font-semibold text-primary mb-3">Suggested Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {result.suggestedKeywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="bg-primary/10 text-primary-foreground text-sm py-1 px-3">
                        {keyword}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AnimatedSection>
  );
}
