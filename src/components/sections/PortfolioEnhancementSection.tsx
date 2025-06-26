
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Sparkles, Wand2, ClipboardCopy, Check, Lightbulb, CheckCircle, Target, ArrowUpCircle, Award, Briefcase, Code, BrainCircuit, Search } from "lucide-react";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { diffWordsWithSpace } from 'diff';

const formSchema = z.object({
  description: z.string().min(20, "Please provide at least 20 characters.").max(1000, "Description must be 1000 characters or less."),
});
type FormValues = z.infer<typeof formSchema>;

const DiffView = ({ originalText, newText }: { originalText: string | null; newText: string }) => {
  if (!originalText || !newText) return <p className="text-foreground/90 leading-relaxed whitespace-pre-wrap">{newText}</p>;
  
  const parts = diffWordsWithSpace(originalText, newText);

  return (
    <div className="text-foreground/90 leading-relaxed whitespace-pre-wrap">
      {parts.map((part, index) => {
        const style = part.added
          ? 'bg-green-100 dark:bg-green-800/30 text-green-800 dark:text-green-300 rounded mx-[1px] px-[1px]'
          : part.removed
          ? 'bg-red-100 dark:bg-red-800/30 text-red-800 dark:text-red-300 line-through rounded mx-[1px] px-[1px]'
          : '';
        return (
          <span key={index} className={style}>
            {part.value}
          </span>
        );
      })}
    </div>
  );
};

const WritingTips = () => (
    <div className="mt-2 mb-6 p-4 bg-primary/5 border-l-4 border-primary/20 rounded-r-lg">
        <div className="flex">
            <div className="flex-shrink-0">
                <Lightbulb className="h-6 w-6 text-primary mt-0.5" />
            </div>
            <div className="ml-3">
                <h3 className="text-lg font-medium text-primary">Tips for a Great Description</h3>
                <div className="mt-2 text-sm text-foreground/80 space-y-1">
                    <p><strong>Use Action Verbs:</strong> Start sentences with words like <em>Architected, Implemented, Optimized, Led</em>.</p>
                    <p><strong>Quantify Your Impact:</strong> Use numbers to show results. "Reduced latency by 50%" is better than "made it faster."</p>
                    <p><strong>State the Problem:</strong> Briefly explain what problem you were solving. This gives your work context.</p>
                </div>
            </div>
        </div>
    </div>
);

const ResultSkeleton = () => (
  <div className="mt-8 space-y-8 pt-6 border-t">
    {/* Feedback Skeleton */}
    <div className="space-y-3">
      <Skeleton className="h-6 w-1/3 rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
    
    {/* Rewrites Skeleton */}
    <div className="space-y-3">
      <Skeleton className="h-6 w-1/3 rounded-lg" />
      <Skeleton className="h-10 w-1/2 rounded-lg" /> {/* Tabs List */}
      <div className="space-y-2 pt-2 border-t mt-4">
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4 rounded-lg" />
      </div>
    </div>

    {/* Skills Skeleton */}
    <div className="space-y-3">
      <Skeleton className="h-6 w-1/3 rounded-lg" />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
            <Skeleton className="h-5 w-1/4 rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-5 w-1/4 rounded-lg" />
            <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>
    </div>

    {/* Keywords Skeleton */}
      <div className="space-y-3">
      <Skeleton className="h-6 w-1/4 rounded-lg" />
      <Skeleton className="h-4 w-full" />
      <div className="flex flex-wrap gap-2 pt-2">
        <Skeleton className="h-7 w-24 rounded-full" />
        <Skeleton className="h-7 w-20 rounded-full" />
        <Skeleton className="h-7 w-28 rounded-full" />
      </div>
    </div>
  </div>
);


export default function PortfolioEnhancementSection() {
  const [result, setResult] = useState<PortfolioEnhancementOutput | null>(null);
  const [originalDescription, setOriginalDescription] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { description: "" },
  });
  
  const handleCopy = (key: string, textToCopy: string) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopied((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setResult(null);
    setOriginalDescription(data.description);

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
            <WritingTips />
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

            {isPending && <ResultSkeleton />}

            {result && !isPending && (
              <div className="mt-8 space-y-8 pt-6 border-t">
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                  <h3 className="font-headline text-xl font-semibold text-primary mb-3">Granular Feedback</h3>
                  <Accordion type="multiple" className="w-full space-y-2">
                    <AccordionItem value="clarity" className="bg-background/50 rounded-lg border px-4">
                      <AccordionTrigger className="py-3 hover:no-underline"><div className="flex items-center"><CheckCircle className="mr-3 h-5 w-5 text-accent"/> Clarity & Conciseness</div></AccordionTrigger>
                      <AccordionContent className="pb-4 text-foreground/90">{result.granularFeedback.clarity}</AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="action-verbs" className="bg-background/50 rounded-lg border px-4">
                      <AccordionTrigger className="py-3 hover:no-underline"><div className="flex items-center"><ArrowUpCircle className="mr-3 h-5 w-5 text-accent"/> Action Verbs</div></AccordionTrigger>
                      <AccordionContent className="pb-4 text-foreground/90">{result.granularFeedback.actionVerbs}</AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="quantifiable-results" className="bg-background/50 rounded-lg border px-4">
                      <AccordionTrigger className="py-3 hover:no-underline"><div className="flex items-center"><Award className="mr-3 h-5 w-5 text-accent"/> Quantifiable Results</div></AccordionTrigger>
                      <AccordionContent className="pb-4 text-foreground/90">{result.granularFeedback.quantifiableResults}</AccordionContent>
                    </AccordionItem>
                     <AccordionItem value="role-targeting" className="bg-background/50 rounded-lg border px-4">
                      <AccordionTrigger className="py-3 hover:no-underline"><div className="flex items-center"><Target className="mr-3 h-5 w-5 text-accent"/> Role Targeting</div></AccordionTrigger>
                      <AccordionContent className="pb-4 text-foreground/90">{result.granularFeedback.roleTargeting}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <h3 className="font-headline text-xl font-semibold text-primary mb-3">Suggested Rewrites</h3>
                     <Tabs defaultValue="standard">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="standard"><Wand2 className="mr-2 h-4 w-4" /> Standard</TabsTrigger>
                            <TabsTrigger value="technical"><Code className="mr-2 h-4 w-4" /> Technical</TabsTrigger>
                            <TabsTrigger value="business"><Briefcase className="mr-2 h-4 w-4" /> Business</TabsTrigger>
                        </TabsList>
                        <TabsContent value="standard" className="mt-4">
                            <div className="relative border-l-4 border-accent pl-4 bg-accent/10 p-4 rounded-r-lg">
                                <Button size="sm" variant="ghost" className="absolute top-2 right-2 text-accent hover:text-accent/80 hover:bg-accent/10" onClick={() => handleCopy('rewrite_standard', result.rewrittenDescriptions.standard)}>
                                    {copied['rewrite_standard'] ? <Check className="mr-2" /> : <ClipboardCopy className="mr-2" />}
                                    {copied['rewrite_standard'] ? 'Copied' : 'Copy'}
                                </Button>
                                <DiffView originalText={originalDescription} newText={result.rewrittenDescriptions.standard} />
                           </div>
                        </TabsContent>
                        <TabsContent value="technical" className="mt-4">
                             <div className="relative border-l-4 border-accent pl-4 bg-accent/10 p-4 rounded-r-lg">
                                <Button size="sm" variant="ghost" className="absolute top-2 right-2 text-accent hover:text-accent/80 hover:bg-accent/10" onClick={() => handleCopy('rewrite_technical', result.rewrittenDescriptions.technical)}>
                                    {copied['rewrite_technical'] ? <Check className="mr-2" /> : <ClipboardCopy className="mr-2" />}
                                    {copied['rewrite_technical'] ? 'Copied' : 'Copy'}
                                </Button>
                                <DiffView originalText={originalDescription} newText={result.rewrittenDescriptions.technical} />
                           </div>
                        </TabsContent>
                        <TabsContent value="business" className="mt-4">
                             <div className="relative border-l-4 border-accent pl-4 bg-accent/10 p-4 rounded-r-lg">
                                <Button size="sm" variant="ghost" className="absolute top-2 right-2 text-accent hover:text-accent/80 hover:bg-accent/10" onClick={() => handleCopy('rewrite_business', result.rewrittenDescriptions.business)}>
                                    {copied['rewrite_business'] ? <Check className="mr-2" /> : <ClipboardCopy className="mr-2" />}
                                    {copied['rewrite_business'] ? 'Copied' : 'Copy'}
                                </Button>
                                <DiffView originalText={originalDescription} newText={result.rewrittenDescriptions.business} />
                           </div>
                        </TabsContent>
                    </Tabs>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                  <h3 className="font-headline text-xl font-semibold text-primary mb-3">Skills Analysis</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center"><BrainCircuit className="mr-2 h-5 w-5 text-accent" /> Extracted Skills</h4>
                        <div className="flex flex-wrap gap-2">
                           {result.skillsAnalysis.extracted.map((skill) => (
                            <Badge key={skill} variant="secondary" className="bg-primary/10 text-primary text-sm py-1 px-3">
                                {skill}
                            </Badge>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h4 className="font-semibold text-foreground mb-2 flex items-center"><Lightbulb className="mr-2 h-5 w-5 text-accent" /> Suggested Skills</h4>
                        <div className="flex flex-wrap gap-2">
                           {result.skillsAnalysis.suggested.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-sm py-1 px-3">
                                {skill}
                            </Badge>
                            ))}
                        </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                    <div className="flex justify-between items-center mb-3">
                        <h3 className="font-headline text-xl font-semibold text-primary flex items-center"><Search className="mr-2 h-5 w-5"/> Keyword Analysis</h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy('keywords', result.keywordAnalysis.suggestedKeywords.join(', '))}
                            className="text-accent hover:text-accent/80 hover:bg-accent/10"
                        >
                            {copied['keywords'] ? <Check className="mr-2" /> : <ClipboardCopy className="mr-2" />}
                            {copied['keywords'] ? 'Copied!' : 'Copy'}
                        </Button>
                    </div>
                    <p className="text-foreground/80 mb-4">{result.keywordAnalysis.feedback}</p>
                  <div className="flex flex-wrap gap-2">
                    {result.keywordAnalysis.suggestedKeywords.map((keyword) => (
                      <Badge key={keyword} variant="secondary" className="bg-primary/10 text-primary text-sm py-1 px-3">
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
