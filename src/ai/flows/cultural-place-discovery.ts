'use server';
/**
 * @fileOverview Flujo de IA para descubrir una amplia gama de lugares culturales en el Centro de Medellín.
 *
 * - discoverCulturalPlaces - Función que genera sugerencias de lugares históricos, teatros, bares y más.
 * - DiscoverPlacesOutput - El tipo de retorno con la lista extendida de lugares.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiscoverPlacesOutputSchema = z.array(z.object({
  name: z.string().describe('Nombre del lugar emblemático.'),
  description: z.string().describe('Descripción histórica y cultural elegante.'),
  latitude: z.number().describe('Latitud aproximada (ej. 6.2512).'),
  longitude: z.number().describe('Longitud aproximada (ej. -75.5634).'),
  address: z.string().describe('Dirección física.'),
  category: z.string().describe('Categoría del lugar (ej: Teatro, Museo, Bar Histórico, Centro Cultural).'),
}));

export type DiscoverPlacesOutput = z.infer<typeof DiscoverPlacesOutputSchema>;

export async function discoverCulturalPlaces(): Promise<DiscoverPlacesOutput> {
  const {output} = await ai.generate({
    prompt: `Actúa como un historiador y curador cultural experto en el Centro de Medellín (Comuna 10 - La Candelaria). 
    Genera una lista de 16 lugares culturales e históricos absolutamente emblemáticos y diversos.
    
    La lista DEBE incluir una mezcla de las siguientes categorías:
    1. MUSEOS: Museo de Antioquia, Casa de la Memoria (cerca al Parque Bicentenario).
    2. TEATROS: Teatro Pablo Tobón Uribe, Teatro Lido, Teatro Matacandelas, Teatro de Títeres La Fanfarria.
    3. BARES Y CAFÉS HISTÓRICOS: Salón Málaga (Tango), El Eslabón Prendido (Salsa), Café Astor, Homero Manzi.
    4. HITOS ARQUITECTÓNICOS: Edificio Coltejer, Palacio de la Cultura Rafael Uribe Uribe, Iglesia de la Veracruz.
    5. ESPACIOS PÚBLICOS: Plaza Botero, Parque de Berrío, Pasaje Junín, Plazuela de San Ignacio.
    6. CENTROS CULTURALES: Palacio Nacional, Centro Colombo Americano.

    Para cada lugar, proporciona:
    1. Nombre oficial completo.
    2. Una descripción contemporánea, sofisticada y breve (máximo 3 frases) que resalte su importancia para la memoria de Medellín.
    3. Coordenadas geográficas precisas para el mapa (latitud entre 6.24 y 6.26, longitud entre -75.57 y -75.55).
    4. Dirección exacta.
    5. Categoría clara y descriptiva.

    Asegúrate de que las coordenadas sean variadas para poblar bien el mapa del centro.`,
    output: {schema: DiscoverPlacesOutputSchema},
  });

  if (!output) {
    throw new Error('No se pudieron descubrir lugares culturales.');
  }

  return output;
}
