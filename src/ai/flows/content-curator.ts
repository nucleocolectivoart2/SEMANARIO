'use server';
/**
 * @fileOverview Flujo de IA para curar y estructurar contenido extraído de redes sociales o la web.
 *
 * - curateEventFromWeb - Extrae datos reales de un texto desestructurado o una URL.
 * - WebCurationInput - El texto pegado o la URL proporcionada.
 * - WebCurationOutput - Objeto CulturalEvent estructurado.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const WebCurationInputSchema = z.object({
  rawText: z.string().optional().describe('El texto copiado de una red social o sitio web.'),
  url: z.string().url().optional().describe('La URL de la página web que contiene la información del evento.'),
});

const WebCurationOutputSchema = z.object({
  title: z.string().describe('Título atractivo y periodístico del evento.'),
  description: z.string().describe('Descripción detallada basada únicamente en la información real encontrada.'),
  startDate: z.string().describe('Fecha y hora de inicio en formato ISO 8601 (YYYY-MM-DDTHH:mm).'),
  category: z.string().describe('Categoría del evento (ej: Concierto, Teatro, Taller, Convocatoria).'),
  locationName: z.string().describe('Nombre del lugar mencionado en el texto.'),
  imageUrl: z.string().url().optional().describe('URL de una imagen promocional si se encuentra en el texto o página.'),
  sourceUrl: z.string().url().optional().describe('URL original de la fuente de información.'),
  isAuthentic: z.boolean().describe('Indica si se encontró suficiente información (Título y al menos una fecha o lugar) para ser un evento válido.'),
});

export type WebCurationInput = z.infer<typeof WebCurationInputSchema>;
export type WebCurationOutput = z.infer<typeof WebCurationOutputSchema>;

/**
 * Herramienta para extraer el texto legible de una página web.
 */
const scrapeWebsiteContent = ai.defineTool(
  {
    name: 'scrapeWebsiteContent',
    description: 'Extrae el contenido de texto principal de una URL proporcionada para su análisis.',
    inputSchema: z.object({ url: z.string().url() }),
    outputSchema: z.string(),
  },
  async ({ url }) => {
    try {
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        }
      });
      if (!response.ok) throw new Error(`Error al acceder a la página: ${response.statusText}`);
      const html = await response.text();
      
      // Limpieza básica de HTML para reducir tokens y mejorar el procesamiento de la IA
      return html
        .replace(/<script\b[^>]*>([\s\S]*?)<\/script>/gms, '')
        .replace(/<style\b[^>]*>([\s\S]*?)<\/style>/gms, '')
        .replace(/<footer\b[^>]*>([\s\S]*?)<\/footer>/gms, '')
        .replace(/<header\b[^>]*>([\s\S]*?)<\/header>/gms, '')
        .replace(/<nav\b[^>]*>([\s\S]*?)<\/nav>/gms, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
        .substring(0, 20000); 
    } catch (error: any) {
      return `No se pudo extraer contenido de la URL: ${error.message}`;
    }
  }
);

const curationPrompt = ai.definePrompt({
  name: 'curationPrompt',
  input: { schema: WebCurationInputSchema },
  output: { schema: WebCurationOutputSchema },
  tools: [scrapeWebsiteContent],
  prompt: `Actúa como un Curador de Contenidos Senior para "El Semanario HOY". 
Tu misión es transformar información desestructurada en entradas de agenda cultural reales para el Centro de Medellín.

FUENTES DISPONIBLES:
- Texto proporcionado: {{{rawText}}}
- URL proporcionada: {{{url}}}

INSTRUCCIONES DE PROCESAMIENTO:
1. Si se proporciona una URL, DEBES usar la herramienta 'scrapeWebsiteContent'.
2. EXTRAE información REAL. Si el texto menciona fechas sin año, ASUME el año 2025.
3. FORMATO DE FECHA: Transforma las horas al formato ISO 8601 (YYYY-MM-DDTHH:mm).
4. VALIDACIÓN (isAuthentic): Marca como TRUE si identificas un TÍTULO y al menos un LUGAR o una FECHA clara.
5. IMAGEN: Si encuentras una URL de imagen clara, extráela.
6. FUENTE: Si se proporciona una URL, úsala como sourceUrl.

Si la fuente es publicidad irrelevante o spam, marca isAuthentic como falso.`,
});

export async function curateEventFromWeb(input: WebCurationInput): Promise<WebCurationOutput> {
  const { output } = await curationPrompt(input);
  if (!output) throw new Error('No se pudo procesar la solicitud de curaduría.');
  return output;
}
