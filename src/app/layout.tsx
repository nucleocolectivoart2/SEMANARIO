import type {Metadata} from 'next';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Toaster } from '@/components/ui/toaster';
import { RadioWidget } from '@/components/RadioWidget';
import { Footer } from '@/components/Footer';

// URL oficial del favicon desde el repositorio GitHub (versión raw para máxima compatibilidad)
const ICON_URL = 'https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/src/app/favicon.ico?v=6';

export const metadata: Metadata = {
  title: 'El Semanario HOY | Archivo Vivo y Cultura de Medellín',
  description: 'Revitalizamos la memoria urbana a través de una narrativa transmedia que conecta un archivo cultural de la década de los 90 con la escena cultural actual de la ciudad de Medellín.',
  keywords: ['Medellín', 'Cultura Medellín', 'Agenda Cultural', 'Memoria Urbana', 'Patrimonio', 'El Semanario HOY', 'Archivo Vivo'],
  authors: [{ name: 'El Semanario HOY' }],
  icons: {
    icon: [
      { url: ICON_URL, type: 'image/x-icon' },
      { url: ICON_URL, sizes: '32x32', type: 'image/x-icon' },
      { url: ICON_URL, sizes: '16x16', type: 'image/x-icon' },
    ],
    shortcut: [ICON_URL],
    apple: [ICON_URL],
    other: [
      {
        rel: 'icon',
        url: ICON_URL,
      },
    ],
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
        url: ICON_URL,
        width: 800,
        height: 800,
        alt: 'El Semanario HOY',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'El Semanario HOY | Cultura y Memoria Urbana',
    description: 'Revitalizamos la memoria urbana a través de una narrativa transmedia que conecta un archivo cultural de la década de los 90 con la escena cultural actual de la ciudad de Medellín.',
    images: [ICON_URL],
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
        {/* Inyección forzada de favicon al final del head para máxima prioridad sobre archivos locales */}
        <link rel="icon" href={ICON_URL} sizes="any" type="image/x-icon" />
        <link rel="shortcut icon" href={ICON_URL} type="image/x-icon" />
        <link rel="apple-touch-icon" href={ICON_URL} />
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
