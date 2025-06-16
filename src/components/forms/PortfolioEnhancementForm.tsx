"use client";

import { useState, useTransition } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { enhancePortfolioAction } from "@/app/actions/enhancePortfolioAction";
import { Loader2, Sparkles, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const portfolioEnhancementSchema = z.object({
  portfolioContent: z.string().min(50, { message: "Portfolio content must be at least 50 characters." }).max(5000, { message: "Portfolio content must be at most 5000 characters." }),
});

type PortfolioEnhancementFormValues = z.infer<typeof portfolioEnhancementSchema>;

export default function PortfolioEnhancementForm() {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<PortfolioEnhancementFormValues>({
    resolver: zodResolver(portfolioEnhancementSchema),
    defaultValues: {
      portfolioContent: "",
    },
  });

  const onSubmit: SubmitHandler<PortfolioEnhancementFormValues> = (data) => {
    setSuggestions(null);
    setError(null);
    startTransition(async () => {
      try {
        const result = await enhancePortfolioAction(data);
        if (result.suggestions) {
          setSuggestions(result.suggestions);
          toast({
            title: "Suggestions Ready!",
            description: "AI has generated improvement suggestions for your portfolio.",
            variant: "default",
            action: <CheckCircle className="text-green-500" />,
          });
        } else if (result.error) {
          setError(result.error);
           toast({
            title: "Error",
            description: result.error,
            variant: "destructive",
          });
        }
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "An unexpected error occurred.";
        setError(errorMessage);
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Textarea
            id="portfolioContent"
            placeholder="Paste your portfolio content here (e.g., about section, project description)..."
            {...form.register("portfolioContent")}
            className={`min-h-[200px] ${form.formState.errors.portfolioContent ? "border-destructive" : ""}`}
            aria-invalid={form.formState.errors.portfolioContent ? "true" : "false"}
            aria-describedby="portfolioContent-error"
            disabled={isPending}
          />
          {form.formState.errors.portfolioContent && (
            <p id="portfolioContent-error" className="text-sm text-destructive mt-1">
              {form.formState.errors.portfolioContent.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-4 w-4" />
              Get Suggestions
            </>
          )}
        </Button>
      </form>

      {isPending && (
        <div className="text-center py-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
          <p className="mt-2 text-muted-foreground">AI is thinking...</p>
        </div>
      )}

      {error && !isPending && (
         <Card className="border-destructive bg-destructive/10">
          <CardHeader className="flex flex-row items-center space-x-3 pb-2">
            <AlertTriangle className="h-6 w-6 text-destructive" />
            <CardTitle className="text-destructive">An Error Occurred</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}

      {suggestions && !isPending && (
        <Card className="border-green-500 bg-green-500/10">
          <CardHeader className="flex flex-row items-center space-x-3 pb-2">
             <CheckCircle className="h-6 w-6 text-green-600" />
            <CardTitle className="text-green-700 font-headline">AI Suggestions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-green-800 whitespace-pre-wrap">
              {suggestions}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
