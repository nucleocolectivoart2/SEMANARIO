import { config } from 'dotenv';
config();

/**
 * Los flujos de IA han sido desactivados para evitar costos de pago por uso (Gemini API).
 * Esta acción detiene la carga de los agentes de curaduría, categorización y sugerencias.
 * Para reactivarlos en el futuro, simplemente descomente las líneas siguientes.
 */

// import '@/ai/flows/admin-content-categorization.ts';
// import '@/ai/flows/admin-content-connection-suggester.ts';
// import '@/ai/flows/cultural-place-discovery.ts';
// import '@/ai/flows/newsletter-generator.ts';
// import '@/ai/flows/content-curator.ts';
