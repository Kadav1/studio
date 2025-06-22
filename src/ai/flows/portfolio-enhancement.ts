'use server';
/**
 * @fileOverview An AI agent that provides feedback on portfolio project descriptions.
 *
 * - enhancePortfolio - A function that handles the portfolio enhancement process.
 * - PortfolioEnhancementInput - The input type for the enhancePortfolio function.
 * - PortfolioEnhancementOutput - The return type for the enhancePortfolio function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import type { PortfolioEnhancementOutput } from '@/types';

const PortfolioEnhancementInputSchema = z.string().describe('A project description to be reviewed.');
export type PortfolioEnhancementInput = z.infer<typeof PortfolioEnhancementInputSchema>;

const PortfolioEnhancementOutputSchema = z.object({
  feedback: z.string().describe("Constructive feedback on how to improve the project description. This should be a single paragraph."),
  rewrittenDescription: z.string().describe("An improved, rewritten version of the project description."),
  suggestedKeywords: z.array(z.string()).describe("An array of 5-7 relevant technical or soft-skill keywords based on the description."),
});

// The exported function that the UI will call
export async function enhancePortfolio(description: PortfolioEnhancementInput): Promise<PortfolioEnhancementOutput> {
  return portfolioEnhancementFlow(description);
}

const prompt = ai.definePrompt({
  name: 'portfolioEnhancerPrompt',
  input: { schema: PortfolioEnhancementInputSchema },
  output: { schema: PortfolioEnhancementOutputSchema },
  prompt: `You are a helpful and friendly career coach and senior tech recruiter specializing in reviewing software engineering portfolios.

Your task is to analyze the following project description and provide feedback to make it more impactful and appealing to hiring managers.

Project Description:
"{{{prompt}}}"

Provide the following:
1.  **Constructive Feedback:** Write a short paragraph of actionable advice. Focus on what could be clearer, what's missing, or how to better showcase the skills involved.
2.  **Rewritten Description:** Rewrite the description to be more professional, concise, and results-oriented. Highlight the technologies and the impact of the project.
3.  **Suggested Keywords:** Suggest 5-7 relevant keywords (technologies, skills, methodologies) that a recruiter might search for.
`,
});

const portfolioEnhancementFlow = ai.defineFlow(
  {
    name: 'portfolioEnhancementFlow',
    inputSchema: PortfolioEnhancementInputSchema,
    outputSchema: PortfolioEnhancementOutputSchema,
  },
  async (description) => {
    const { output } = await prompt(description);
    if (!output) {
      throw new Error('The AI model did not return a valid response.');
    }
    return output;
  }
);
