'use server';
/**
 * @fileOverview Flujo de IA para generar boletines culturales semanales para El Semanario HOY.
 *
 * - generateNewsletter - Función que redacta el boletín basado estrictamente en contenido real.
 * - NewsletterInput - Tipo de entrada con eventos y multimedia recientes.
 * - NewsletterOutput - Tipo de retorno con el boletín redactado.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NewsletterInputSchema = z.object({
  recentEvents: z.array(z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.string().optional(),
    category: z.string().optional(),
  })).describe('Eventos culturales reales extraídos de la base de datos.'),
  recentMultimedia: z.array(z.object({
    title: z.string(),
    type: z.string(),
    description: z.string(),
  })).describe('Contenidos multimedia reales extraídos de la base de datos.'),
  tone: z.enum(['informativo', 'emocional', 'periodistico']).default('periodistico'),
});
export type NewsletterInput = z.infer<typeof NewsletterInputSchema>;

const NewsletterOutputSchema = z.object({
  subject: z.string().describe('Asunto atractivo para el correo electrónico.'),
  header: z.string().describe('Encabezado o saludo editorial.'),
  body: z.string().describe('Cuerpo del boletín con los destaques culturales reales.'),
  multimediaSection: z.string().describe('Sección específica para recomendar el contenido audiovisual real.'),
  footer: z.string().describe('Cierre y llamado a la acción (CTA).'),
});
export type NewsletterOutput = z.infer<typeof NewsletterOutputSchema>;

const newsletterPrompt = ai.definePrompt({
  name: 'newsletterPrompt',
  input: { schema: NewsletterInputSchema },
  output: { schema: NewsletterOutputSchema },
  prompt: `Actúa como el Editor en Jefe de "El Semanario HOY". Tu tarea es redactar un boletín cultural semanal vibrante y PROFESIONAL.

CRITICAL INSTRUCTION:
1. SOLO utiliza la información proporcionada en las listas de EVENTOS y MULTIMEDIA.
2. NO INVENTES eventos, lugares ni fechas que no estén explícitamente en los datos de entrada.
3. Si las listas están vacías, redacta un mensaje editorial invitando a la ciudadanía a estar pendiente de la próxima gran cartelera de El Semanario HOY.
4. El tono debe ser {{{tone}}}.

CONCEPTO EDITORIAL:
El Semanario HOY es el registro periodístico del Centro de Medellín. 

EVENTOS REALES (USAR SOLO ESTOS):
{{#if recentEvents}}
{{#each recentEvents}}
- {{{title}}}: {{{description}}} (Fecha: {{{startDate}}})
{{/each}}
{{else}}
(No hay eventos registrados para esta semana)
{{/if}}

MULTIMEDIA REAL (USAR SOLO ESTA):
{{#if recentMultimedia}}
{{#each recentMultimedia}}
- [{{{type}}}] {{{title}}}: {{{description}}}
{{/each}}
{{else}}
(No hay contenido multimedia nuevo para esta semana)
{{/if}}

RESTRICCIONES DE MARCA:
1. El nombre oficial SIEMPRE es "El Semanario HOY".
2. Resalta la palabra HOY en mayúsculas cuando hables de la actualidad.
3. Usa un lenguaje que invite a la ciudadanía a vivir el corazón de Medellín.

Genera el boletín en formato JSON respetando el esquema de salida.`,
});

export async function generateNewsletter(input: NewsletterInput): Promise<NewsletterOutput> {
  const { output } = await newsletterPrompt(input);
  if (!output) throw new Error('Error al generar el boletín.');
  return output;
}
