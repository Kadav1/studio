// This file is machine-generated - do not edit!

'use server';

/**
 * @fileOverview A dynamic bio generator AI agent.
 *
 * - generateBio - A function that handles the bio generation process.
 * - GenerateBioInput - The input type for the generateBio function.
 * - GenerateBioOutput - The return type for the generateBio function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBioInputSchema = z.object({
  keywords: z
    .string()
    .describe(
      'Keywords that best describe the user of the page, e.g. innovative designer, experienced developer.'
    ),
});
export type GenerateBioInput = z.infer<typeof GenerateBioInputSchema>;

const GenerateBioOutputSchema = z.object({
  bio: z.string().describe('A short, dynamically generated bio.'),
});
export type GenerateBioOutput = z.infer<typeof GenerateBioOutputSchema>;

export async function generateBio(input: GenerateBioInput): Promise<GenerateBioOutput> {
  return generateBioFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateBioPrompt',
  input: {schema: GenerateBioInputSchema},
  output: {schema: GenerateBioOutputSchema},
  prompt: `You are a creative content writer specializing in crafting engaging personal introductions for online portfolios.

  Based on the provided keywords, generate a short and engaging bio (around 50-75 words) that captures the essence of the portfolio owner's skills and experience. The tone should be professional yet approachable, suitable for a portfolio website.

  Keywords: {{{keywords}}}`,
});

const generateBioFlow = ai.defineFlow(
  {
    name: 'generateBioFlow',
    inputSchema: GenerateBioInputSchema,
    outputSchema: GenerateBioOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
