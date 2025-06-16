"use client";

import PortfolioEnhancementForm from "@/components/forms/PortfolioEnhancementForm";
import AnimatedSection from "@/components/shared/AnimatedSection";
import { Brain, Sparkles } from "lucide-react";

export default function PortfolioEnhancementSection() {
  return (
    <AnimatedSection id="ai-enhancer" className="bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center mb-6 text-center flex-col">
          <div className="p-3 bg-primary/10 rounded-full mb-4 inline-block">
            <Brain className="h-10 w-10 text-primary" />
          </div>
          <h2 className="font-headline text-3xl md:text-4xl font-bold text-primary mb-3">
            AI Portfolio Enhancer
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Paste your current portfolio description or project details below. Our AI will provide personalized suggestions to make it shine, including how to highlight your skills with Motion-primitives!
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto bg-card p-6 sm:p-8 rounded-xl shadow-xl border">
          <div className="flex items-center mb-6">
            <Sparkles className="h-6 w-6 text-accent mr-3" />
            <h3 className="font-headline text-2xl font-semibold text-foreground">Get AI-Powered Feedback</h3>
          </div>
          <PortfolioEnhancementForm />
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>This tool uses generative AI to provide suggestions. Please review them carefully and use your best judgment.</p>
        </div>
      </div>
    </AnimatedSection>
  );
}
