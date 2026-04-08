
import type {Metadata} from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { RadioWidget } from '@/components/RadioWidget';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'El Semanario HOY | Archivo Vivo y Cultura de Medellín',
  description: 'Una narrativa transmedia que revitaliza la memoria urbana y el archivo histórico del corazón de Medellín. Conéctate con la escena cultural actual.',
  keywords: ['Medellín', 'Cultura Medellín', 'Agenda Cultural', 'Memoria Urbana', 'Patrimonio', 'El Semanario HOY', 'Archivo Vivo'],
  authors: [{ name: 'El Semanario HOY' }],
  icons: {
    icon: 'https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/favicon.png',
    shortcut: 'https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/favicon.png',
    apple: 'https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/favicon.png',
  },
  openGraph: {
    title: 'El Semanario HOY - Archivo Vivo del Corazón de Medellín',
    description: 'Revitalizamos la memoria urbana a través de una narrativa transmedia que conecta un archivo cultural de la década de los 90 con la escena cultural actual de la ciudad de Medellín.',
    url: 'https://elsemanariohoy.com',
    siteName: 'El Semanario HOY',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: 'https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/favicon.png',
        width: 800,
        height: 800,
        alt: 'El Semanario HOY',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Semanario HOY | Cultura y Memoria Urbana',
    description: 'Archivo vivo cultural que revitaliza la historia de Medellín y te conecta con su presente artístico.',
    images: ['https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/favicon.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        {/* Etiqueta de enlace explícita para forzar el favicon oficial */}
        <link rel="icon" type="image/png" href="https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/favicon.png" />
      </head>
      <body className="font-body antialiased selection:bg-brand-gold selection:text-white bg-white">
        <FirebaseClientProvider>
          {children}
          <RadioWidget />
          <Footer />
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
