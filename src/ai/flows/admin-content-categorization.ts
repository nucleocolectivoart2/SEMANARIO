'use server';
/**
 * @fileOverview An AI tool to categorize and suggest relevant tags for cultural content.
 *
 * - categorizeContent - A function that handles the content categorization process.
 * - AdminContentCategorizationInput - The input type for the categorizeContent function.
 * - AdminContentCategorizationOutput - The return type for the categorizeContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdminContentCategorizationInputSchema = z.object({
  title: z.string().describe('The title of the content.'),
  description: z
    .string()
    .describe('A detailed description of the content, including its nature and context.'),
  contentType: z
    .enum([
      'cultural_agenda_entry',
      'multimedia_content',
      'archive_item',
      'map_location',
    ])
    .describe('The type of content being categorized.'),
});
export type AdminContentCategorizationInput = z.infer<
  typeof AdminContentCategorizationInputSchema
>;

const AdminContentCategorizationOutputSchema = z.object({
  categories: z
    .array(z.string())
    .describe('A list of relevant categories for the content.'),
  suggestedTags: z
    .array(z.string())
    .describe('A list of suggested tags for the content, focusing on keywords and themes.'),
  summary: z.string().describe('A concise summary of the content.'),
});
export type AdminContentCategorizationOutput = z.infer<
  typeof AdminContentCategorizationOutputSchema
>;

export async function categorizeContent(
  input: AdminContentCategorizationInput
): Promise<AdminContentCategorizationOutput> {
  return adminContentCategorizationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'adminContentCategorizationPrompt',
  input: {schema: AdminContentCategorizationInputSchema},
  output: {schema: AdminContentCategorizationOutputSchema},
  prompt: `You are an AI assistant specialized in cultural content management for "El Centro Vive y Resuena con el Semanario".
Your task is to analyze the provided content and suggest appropriate categories and tags to help administrators organize it efficiently.

Content Type: {{{contentType}}}
Title: {{{title}}}
Description: {{{description}}}

Based on the content type, title, and description, provide:
1. A list of relevant categories (e.g., "History", "Art", "Music", "Community", "Education", "Urban Memory", "Heritage", "Festivals", "Exhibitions", "Workshops", "Performance", "Digital Archive", "Interactive Map", "Podcast", "Video").
2. A list of suggested tags (keywords that are specific to the content).
3. A concise summary of the content.

Ensure your output strictly adheres to the JSON schema provided.
`,
});

const adminContentCategorizationFlow = ai.defineFlow(
  {
    name: 'adminContentCategorizationFlow',
    inputSchema: AdminContentCategorizationInputSchema,
    outputSchema: AdminContentCategorizationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to categorize content or suggest tags.');
    }
    return output;
  }
);
