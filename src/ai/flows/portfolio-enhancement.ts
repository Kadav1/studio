'use server';

/**
 * @fileOverview Provides an AI tool to review portfolio content and suggest improvements.
 *
 * - portfolioEnhancement - A function that handles the portfolio enhancement process.
 * - PortfolioEnhancementInput - The input type for the portfolioEnhancement function.
 * - PortfolioEnhancementOutput - The return type for the portfolioEnhancement function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PortfolioEnhancementInputSchema = z.object({
  portfolioContent: z
    .string()
    .describe('The content of the portfolio to be reviewed.'),
});
export type PortfolioEnhancementInput = z.infer<typeof PortfolioEnhancementInputSchema>;

const PortfolioEnhancementOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('AI-powered suggestions for improving the portfolio content, especially regarding Motion-primitives.'),
});
export type PortfolioEnhancementOutput = z.infer<typeof PortfolioEnhancementOutputSchema>;

export async function portfolioEnhancement(input: PortfolioEnhancementInput): Promise<PortfolioEnhancementOutput> {
  return portfolioEnhancementFlow(input);
}

const prompt = ai.definePrompt({
  name: 'portfolioEnhancementPrompt',
  input: {schema: PortfolioEnhancementInputSchema},
  output: {schema: PortfolioEnhancementOutputSchema},
  prompt: `You are an AI portfolio enhancement tool. Review the following portfolio content and provide personalized suggestions for improvement based on industry best practices and trends, with a particular focus on highlighting skills using Motion-primitives.

Portfolio Content:
{{{portfolioContent}}}

Provide specific, actionable suggestions. Focus on improving the presentation and content to highlight key skills and projects.
`,
});

const portfolioEnhancementFlow = ai.defineFlow(
  {
    name: 'portfolioEnhancementFlow',
    inputSchema: PortfolioEnhancementInputSchema,
    outputSchema: PortfolioEnhancementOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
