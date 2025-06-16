"use server";

import { portfolioEnhancement, type PortfolioEnhancementInput, type PortfolioEnhancementOutput } from "@/ai/flows/portfolio-enhancement";
import { z } from "zod";

const PortfolioEnhancementActionInputSchema = z.object({
  portfolioContent: z.string(),
});

interface ActionResult {
  suggestions?: string;
  error?: string;
}

export async function enhancePortfolioAction(
  input: z.infer<typeof PortfolioEnhancementActionInputSchema>
): Promise<ActionResult> {
  try {
    const validatedInput = PortfolioEnhancementActionInputSchema.parse(input);
    
    const result: PortfolioEnhancementOutput = await portfolioEnhancement({
      portfolioContent: validatedInput.portfolioContent,
    });
    
    return { suggestions: result.suggestions };

  } catch (error) {
    console.error("Error in portfolioEnhancementAction:", error);
    if (error instanceof z.ZodError) {
      return { error: "Invalid input: " + error.errors.map(e => e.message).join(", ") };
    }
    if (error instanceof Error) {
        return { error: error.message || "An unexpected error occurred while processing your request." };
    }
    return { error: "An unexpected error occurred while processing your request." };
  }
}
