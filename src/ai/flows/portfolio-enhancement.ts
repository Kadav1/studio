
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

const RewrittenDescriptionsSchema = z.object({
    standard: z.string().describe("A balanced, professional rewrite of the description suitable for a general audience like a recruiter."),
    technical: z.string().describe("A version of the description rewritten to be more detailed and technical, aimed at a senior engineer or architect."),
    business: z.string().describe("A version rewritten to focus on business impact and value, aimed at a product manager or non-technical stakeholder."),
});

const SkillsAnalysisSchema = z.object({
    extracted: z.array(z.string()).describe("Skills explicitly mentioned or strongly implied in the original description."),
    suggested: z.array(z.string()).describe("Additional relevant skills that could be added to strengthen the description."),
});

const KeywordAnalysisSchema = z.object({
    feedback: z.string().describe("A brief analysis of how well the description uses relevant keywords and suggestions for improvement."),
    suggestedKeywords: z.array(z.string()).describe("An array of 5-7 relevant technical or soft-skill keywords based on the description."),
});

const PortfolioEnhancementOutputSchema = z.object({
  granularFeedback: GranularFeedbackSchema,
  rewrittenDescriptions: RewrittenDescriptionsSchema,
  skillsAnalysis: SkillsAnalysisSchema,
  keywordAnalysis: KeywordAnalysisSchema,
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

Your task is to analyze the following project description and provide a comprehensive, multi-faceted review to make it more impactful and appealing to different audiences.

Project Description:
"{{{prompt}}}"

Provide the following in a structured JSON format:

1.  **Granular Feedback**: Provide specific, actionable feedback on the following four aspects. Each piece of feedback should be a concise paragraph.
    -   **Clarity & Conciseness**: How clear and to-the-point is the description? Is there jargon that could be simplified?
    -   **Action Verbs**: Does it use strong, impactful action verbs (e.g., "developed", "architected", "optimized") instead of passive ones (e.g., "was responsible for")?
    -   **Quantifiable Results**: Does it include metrics that show the impact of the work (e.g., "reduced page load time by 30%", "handled 10,000 concurrent users")?
    -   **Role Targeting**: How could the description be tailored to better appeal to specific roles, like a front-end specialist, a back-end engineer, or a team lead?

2.  **Rewritten Descriptions**: Provide three distinct, rewritten versions of the project description, each tailored for a different audience.
    -   **standard**: A balanced, professional version suitable for a general audience like a recruiter or hiring manager.
    -   **technical**: A more detailed version that emphasizes the technical architecture, challenges, and solutions, aimed at a senior engineer or architect.
    -   **business**: A version that focuses on the business value, user impact, and problem-solving aspects, aimed at a product manager or non-technical stakeholder.

3.  **Skills Analysis**: Analyze the skills demonstrated in the project description.
    -   **extracted**: A list of technical and soft skills that are explicitly mentioned or strongly implied in the original description.
    -   **suggested**: A list of additional, relevant skills that are commonly associated with this type of project and could be added to strengthen the description if applicable.

4.  **Keyword Analysis**: Analyze the description from an SEO and keyword perspective for automated resume screeners (ATS).
    -   **feedback**: A brief analysis (2-3 sentences) of how well the description utilizes relevant keywords. Suggest where keywords could be integrated more naturally.
    -   **suggestedKeywords**: Suggest 5-7 relevant keywords (technologies, skills, methodologies) that a recruiter or ATS might search for.
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
