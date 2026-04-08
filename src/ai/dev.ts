import { config } from 'dotenv';
config();

import '@/ai/flows/admin-content-categorization.ts';
import '@/ai/flows/admin-content-connection-suggester.ts';
import '@/ai/flows/cultural-place-discovery.ts';
import '@/ai/flows/newsletter-generator.ts';
import '@/ai/flows/content-curator.ts';
