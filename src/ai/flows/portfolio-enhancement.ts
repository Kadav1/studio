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

const GranularFeedbackSchema = z.object({
    clarity: z.string().describe("Feedback on the clarity and conciseness of the description. Be specific and provide examples."),
    actionVerbs: z.string().describe("Feedback on the use of strong, results-oriented action verbs. Suggest stronger verbs if applicable."),
    quantifiableResults: z.string().describe("Feedback on including measurable metrics and quantifiable results. Explain why this is important and give examples of what could be quantified."),
    roleTargeting: z.string().describe("Feedback on how well the description could be tailored for a specific role or industry. Suggest how to add focus."),
});

const PortfolioEnhancementOutputSchema = z.object({
  granularFeedback: GranularFeedbackSchema,
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

Provide the following in a structured JSON format:

1.  **Granular Feedback**: Provide specific, actionable feedback on the following four aspects. Each piece of feedback should be a concise paragraph.
    -   **Clarity & Conciseness**: How clear and to-the-point is the description? Is there jargon that could be simplified?
    -   **Action Verbs**: Does it use strong, impactful action verbs (e.g., "developed", "architected", "optimized") instead of passive ones (e.g., "was responsible for")?
    -   **Quantifiable Results**: Does it include metrics that show the impact of the work (e.g., "reduced page load time by 30%", "handled 10,000 concurrent users")?
    -   **Role Targeting**: How could the description be tailored to better appeal to specific roles, like a front-end specialist, a back-end engineer, or a team lead?

2.  **Rewritten Description**: Rewrite the description to be more professional, concise, and results-oriented. Incorporate your feedback to highlight the technologies and the impact of the project.

3.  **Suggested Keywords**: Suggest 5-7 relevant keywords (technologies, skills, methodologies) that a recruiter might search for.
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
