'use server';
/**
 * @fileOverview This file implements a Genkit flow for suggesting connections between new content and existing cultural resources.
 *
 * - adminContentConnectionSuggester - A function that handles the content connection suggestion process.
 * - AdminContentConnectionSuggesterInput - The input type for the adminContentConnectionSuggester function.
 * - AdminContentConnectionSuggesterOutput - The return type for the adminContentConnectionSuggester function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AdminContentConnectionSuggesterInputSchema = z.object({
  newContentTitle: z.string().describe('The title of the new cultural content being added.'),
  newContentDescription: z.string().describe('The detailed description or text of the new cultural content.'),
  existingMapLocations: z.array(
    z.object({
      name: z.string().describe('The name of an existing map location.'),
      description: z.string().describe('A brief description of the map location.'),
    })
  ).describe('A list of currently existing interactive map locations.'),
  existingTimelineEntries: z.array(
    z.object({
      title: z.string().describe('The title of an existing timeline entry.'),
      description: z.string().describe('A brief description of the timeline entry.'),
    })
  ).describe('A list of currently existing historical timeline entries.'),
  existingMultimediaContent: z.array(
    z.object({
      title: z.string().describe('The title of an existing multimedia content item (video/podcast).'),
      description: z.string().describe('A brief description of the multimedia content.'),
    })
  ).describe('A list of currently existing multimedia content (videos, podcasts, etc.).'),
});
export type AdminContentConnectionSuggesterInput = z.infer<typeof AdminContentConnectionSuggesterInputSchema>;

const AdminContentConnectionSuggesterOutputSchema = z.object({
  suggestedMapLocations: z.array(z.string()).describe('A list of names of existing map locations that are strongly related to the new content.'),
  suggestedTimelineEntries: z.array(z.string()).describe('A list of titles of existing timeline entries that are strongly related to the new content.'),
  suggestedMultimediaContent: z.array(z.string()).describe('A list of titles of existing multimedia content that is strongly related to the new content.'),
});
export type AdminContentConnectionSuggesterOutput = z.infer<typeof AdminContentConnectionSuggesterOutputSchema>;

const adminContentConnectionSuggesterPrompt = ai.definePrompt({
  name: 'adminContentConnectionSuggesterPrompt',
  input: { schema: AdminContentConnectionSuggesterInputSchema },
  output: { schema: AdminContentConnectionSuggesterOutputSchema },
  prompt: `You are an AI assistant specialized in content curation for 'el Centro Vive y Resuena con el Semanario'. Your task is to analyze new cultural content and suggest relevant connections to existing map locations, historical timeline entries, and multimedia content.

Based on the provided new content and lists of existing items, identify which existing items are most strongly related to the new content. Focus on strong, meaningful connections that enrich the user's understanding and discoverability.

New Content:
Title: {{{newContentTitle}}}
Description: {{{newContentDescription}}}

Existing Map Locations:
{{#each existingMapLocations}}
- Name: {{{name}}}, Description: {{{description}}}
{{/each}}

Existing Timeline Entries:
{{#each existingTimelineEntries}}
- Title: {{{title}}}, Description: {{{description}}}
{{/each}}

Existing Multimedia Content (Videos/Podcasts):
{{#each existingMultimediaContent}}
- Title: {{{title}}}, Description: {{{description}}}
{{/each}}

Provide your suggestions in the specified JSON format, listing only the names/titles of the items that have a strong connection. If no strong connection is found for a category, return an empty array for that category.`,
});

const adminContentConnectionSuggesterFlow = ai.defineFlow(
  {
    name: 'adminContentConnectionSuggesterFlow',
    inputSchema: AdminContentConnectionSuggesterInputSchema,
    outputSchema: AdminContentConnectionSuggesterOutputSchema,
  },
  async (input) => {
    const { output } = await adminContentConnectionSuggesterPrompt(input);
    return output!;
  }
);

export async function adminContentConnectionSuggester(
  input: AdminContentConnectionSuggesterInput
): Promise<AdminContentConnectionSuggesterOutput> {
  return adminContentConnectionSuggesterFlow(input);
}
