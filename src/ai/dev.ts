import { config } from 'dotenv';
config();

// Se desactivan los flujos de IA para evitar cargos por uso de tokens (Google Gemini)
// import '@/ai/flows/admin-content-categorization.ts';
// import '@/ai/flows/admin-content-connection-suggester.ts';
// import '@/ai/flows/cultural-place-discovery.ts';
// import '@/ai/flows/newsletter-generator.ts';
// import '@/ai/flows/content-curator.ts';
