
"use client";

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Download, Loader2, ArrowUpRight, Sparkles, Eye, X } from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { RevealSection } from '@/components/RevealSection';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogPortal,
  DialogOverlay
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';

const GITHUB_BASE = "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/archivo";
const PORTADA_BASE = `${GITHUB_BASE}/portadas`;

const MOCK_ARCHIVE = [
  {
    id: 'sh-01',
    title: 'EDICIÓN No. 1: EL NACIMIENTO',
    year: '1990',
    description: 'Presentación del semanario. Programación de Cine Buho en el Teatro Junín con Rain Man y Fanny y Alexander. Teatro de Muñecos La Fanfarria presenta Cuartico Azul.',
    imageUrl: `${PORTADA_BASE}/sem1%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem1%20(1).pdf`,
    category: 'Fundacional'
  },
  {
    id: 'sh-02',
    title: 'EDICIÓN No. 2: CINE Y SINFÓNICA',
    year: '1990',
    description: 'Aniversario de la Orquesta Sinfónica de Antioquia en el Teatro Metropolitano. Programación de El matrimonio de María Braun y la obra Pareja Abierta en la Casa del Teatro.',
    imageUrl: `${PORTADA_BASE}/sem2%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem2%20(1).pdf`,
    category: 'Registro'
  },
  {
    id: 'sh-03',
    title: 'EDICIÓN No. 3: CANTO GREGORIANO',
    year: '1990',
    description: 'Concierto de Canto Gregoriano por el conjunto francés Organum en San Ignacio. El Teatro Matacandelas presenta La zapatera prodigiosa de García Lorca.',
    imageUrl: `${PORTADA_BASE}/sem3%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem3%20(1).pdf`,
    category: 'Registro'
  },
  {
    id: 'sh-04',
    title: 'EDICIÓN No. 4: REGISTRO SEMANAL',
    year: '1990',
    description: 'Boletín cultural semanal con el calendario de eventos para la cuarta semana de circulación. Incluye secciones de cine, teatro y música en el Centro.',
    imageUrl: `${PORTADA_BASE}/sem4%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem4%20(1).pdf`,
    category: 'Registro'
  },
  {
    id: 'sh-05',
    title: 'EDICIÓN No. 5: AGENDA CULTURAL',
    year: '1990',
    description: 'Calendario completo de actividades artísticas en universidades, bibliotecas y centros culturales de la Comuna 10.',
    imageUrl: `${PORTADA_BASE}/sem5%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem5%20(1).pdf`,
    category: 'Registro'
  },
  {
    id: 'sh-27',
    title: 'EDICIÓN No. 27: LA MANCHA Y GABO',
    year: '1990',
    description: 'Inauguración del Teatro Experimental La Mancha con el estreno de "Album". Ciclo de cine basado en Gabriel García Márquez: Cartas del Parque y Milagro en Roma.',
    imageUrl: `${PORTADA_BASE}/sem%2027%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem%2027%20(1).pdf`,
    category: 'Hito'
  },
  {
    id: 'sh-32',
    title: 'EDICIÓN No. 32: ANIVERSARIO TEATRAL',
    year: '1990',
    description: 'Celebración de 5 años del Teatro Universidad de Medellín con el Festival del Recuerdo. Exposición de 100 años de Fotografía de Modas en el Museo de Antioquia.',
    imageUrl: `${PORTADA_BASE}/sem%2032%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem%2032%20(1).pdf`,
    category: 'Especial'
  },
  {
    id: 'sh-38',
    title: 'EDICIÓN No. 38: ARTES VISUALES',
    year: '1990',
    description: 'Retrospectiva póstuma de Humberto Castaño "Mataco". XXI Salón de Artes Visuales en el Museo de Antioquia y ciclo de Rainer Fassbinder en la Cinemateca.',
    imageUrl: `${PORTADA_BASE}/sem%2038%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem%2038%20(1).pdf`,
    category: 'Hito'
  },
  {
    id: 'sh-40',
    title: 'EDICIÓN No. 40: LITERATURA HOY',
    year: '1990',
    description: 'Presentaciones de libros de Juan Manuel Roca y Darío Ruiz Gómez en la Piloto. Estreno de "Sexo, mentiras y video" y ciclo de cine japonés en el Colombo.',
    imageUrl: `${PORTADA_BASE}/sem%2040%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem%2040%20(1).pdf`,
    category: 'Registro'
  },
  {
    id: 'sh-59',
    title: 'EDICIÓN No. 59: CINE DE AUTOR',
    year: '1991',
    description: 'Ciclos de Ingmar Bergman, Antonioni y Bertolucci. El Teatro Matacandelas presenta "O Marinheiro" de Fernando Pessoa y el Pequeño Teatro "El Fin del Comienzo".',
    imageUrl: `${PORTADA_BASE}/sem%2059%20(1).PNG`,
    pdfUrl: `${GITHUB_BASE}/sem%2059%20(1).pdf`,
    category: 'Registro'
  }
];

export function Timeline() {
  const db = useFirestore();
  const archiveQuery = useMemoFirebase(() => query(collection(db, 'archive_items'), orderBy('year', 'desc')), [db]);
  const { data: archiveItems, isLoading } = useCollection(archiveQuery);
  const [selectedPdf, setSelectedPdf] = useState<{ url: string, title: string } | null>(null);

  const displayItems = useMemo(() => {
    const firestoreData = archiveItems || [];
    const baseIds = new Set(firestoreData.map(item => item.id));
    const combined = [...firestoreData, ...MOCK_ARCHIVE.filter(m => !baseIds.has(m.id))];
    return combined.sort((a, b) => {
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      if (yearB !== yearA) return yearB - yearA;
      return b.id.localeCompare(a.id);
    });
  }, [archiveItems]);

  const archiveHeroImg = PlaceHolderImages.find(img => img.id === 'archive-photo');

  const openPdfViewer = (pdfUrl: string, title: string) => {
    setSelectedPdf({ url: pdfUrl, title });
  };

  return (
    <section id="archivo" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <RevealSection>
              <Badge className="bg-brand-purple text-white px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.5em] w-fit mb-8">
                ARCHIVO HISTÓRICO • SEMANARIO HOY
              </Badge>
              <h1 className="text-6xl md:text-8xl font-black text-brand-black tracking-tighter leading-[0.8] uppercase">
                MEMORIA <br />
                <span className="text-brand-purple">IMPRESA</span>
              </h1>
              <div className="pt-12 border-l-[16px] border-brand-purple pl-10">
                <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-tight max-w-2xl">
                  Nuestros archivos son tesoros visuales que documentan una época y la evolución cultural de Medellín.
                </p>
              </div>
            </RevealSection>
          </div>
          <div className="lg:col-span-5 relative group">
            <RevealSection delay={300}>
              <div className="relative aspect-[4/5] w-full bg-muted shadow-2xl overflow-hidden border-4 border-brand-black">
                {archiveHeroImg && (
                  <Image 
                    src={archiveHeroImg.imageUrl} 
                    alt="Archivo Histórico" 
                    fill 
                    className="object-cover transition-transform duration-[20s] group-hover:scale-110"
                    data-ai-hint="Historical Newspaper"
                  />
                )}
                <div className="absolute inset-0 bg-brand-purple/10 mix-blend-multiply pointer-events-none" />
              </div>
              <div className="absolute -bottom-10 -right-6 md:-right-10 w-40 h-40 bg-brand-purple flex items-center justify-center p-8 text-white font-black text-sm uppercase tracking-widest text-center leading-none z-20 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] transition-transform group-hover:scale-105">
                REGISTRO <br /> VIVO <br /> 1990-2003
              </div>
            </RevealSection>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 relative">
        <div className="mb-20 bg-brand-purple text-white p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 -translate-y-32 translate-x-32 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
           <div className="space-y-6 relative z-10 lg:max-w-2xl text-center lg:text-left">
              <div className="flex items-center gap-4 justify-center lg:justify-start">
                 <Sparkles className="text-white" size={32} />
                 <span className="text-[10px] font-black uppercase tracking-[0.5em]">RECURSO DE CONTEXTO</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-none">ANTES DE EXPLORAR EL ARCHIVO...</h2>
              <p className="text-lg font-medium text-white/80 leading-relaxed italic">
                "Descarga nuestro E-book interactivo para entender la historia, los protagonistas y el valor de estos archivos comunitarios en Medellín."
              </p>
           </div>
           <Link href="/mediateca" className="relative z-10 bg-white text-brand-purple px-10 py-5 font-black uppercase text-[11px] tracking-widest hover:bg-brand-black hover:text-white transition-all shadow-xl whitespace-nowrap">
              VER E-BOOK <ArrowUpRight className="inline-block ml-3" size={18} />
           </Link>
        </div>

        <div className="border-t-4 border-brand-black pt-20">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-32 gap-6">
              <Loader2 className="animate-spin text-brand-purple" size={48} />
              <span className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground">RESTAURANDO MEMORIA...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-muted relative shadow-2xl bg-white">
              {displayItems.map((edition) => {
                const pdfToOpen = edition.pdfUrl || edition.url;
                
                return (
                  <div key={edition.id} className="group p-8 md:p-12 border-r border-b last:border-r-0 hover:bg-muted/5 transition-all duration-700 relative flex flex-col h-full">
                    <div 
                      className="relative aspect-[3/4] overflow-hidden border border-muted mb-12 shadow-sm bg-muted/10 cursor-pointer"
                      onClick={() => pdfToOpen && openPdfViewer(pdfToOpen, edition.title)}
                    >
                      {edition.imageUrl && (
                        <img
                          src={edition.imageUrl}
                          alt={edition.title}
                          className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110"
                        />
                      )}
                      <div className="absolute top-0 left-0 bg-brand-purple text-white font-black text-[10px] px-6 py-3 uppercase tracking-widest">
                        AÑO {edition.year}
                      </div>
                      <div className="absolute inset-0 bg-brand-purple/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <div className="bg-white text-brand-purple p-4 rounded-full shadow-2xl transform scale-90 group-hover:scale-100 transition-transform">
                            <Eye size={32} />
                         </div>
                      </div>
                    </div>
                    
                    <div className="space-y-6 flex-grow flex flex-col">
                      <div className="space-y-2">
                        <Badge variant="outline" className="border-brand-purple text-brand-purple text-[7px] font-black uppercase rounded-none tracking-widest px-2">
                          {edition.category}
                        </Badge>
                        <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter leading-[0.9] group-hover:text-brand-purple transition-colors">
                          {edition.title}
                        </h3>
                      </div>
                      <p className="text-muted-foreground font-medium text-sm leading-relaxed line-clamp-4 text-justify">
                        {edition.description}
                      </p>
                      <div className="flex flex-col gap-3 pt-6 border-t border-muted/50 mt-auto">
                        {pdfToOpen && (
                          <>
                            <Button 
                              onClick={() => openPdfViewer(pdfToOpen, edition.title)}
                              className="flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-widest text-white bg-brand-purple hover:bg-brand-black px-4 py-4 transition-all shadow-lg w-full rounded-none h-14"
                            >
                              VISUALIZAR EDICIÓN <Eye size={14} />
                            </Button>
                            <a 
                              href={pdfToOpen} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="flex items-center justify-center gap-3 text-[9px] font-black uppercase tracking-widest text-brand-purple border-2 border-brand-purple hover:bg-brand-purple hover:text-white px-4 py-4 transition-all w-full h-14"
                            >
                              DESCARGAR PDF <Download size={14} />
                            </a>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <Dialog open={!!selectedPdf} onOpenChange={(open) => !open && setSelectedPdf(null)}>
        <DialogContent className="max-w-[95vw] w-full h-[95vh] p-0 bg-white border-none rounded-none overflow-hidden flex flex-col !z-[250]">
          <button 
            onClick={() => setSelectedPdf(null)}
            className="absolute top-4 right-4 z-[300] bg-brand-black text-white p-3 border-2 border-white hover:bg-brand-purple transition-all shadow-2xl"
            aria-label="Cerrar visor"
          >
            <X size={24} />
          </button>

          <DialogHeader className="p-6 border-b-4 border-brand-black bg-brand-purple text-white flex-row items-center justify-between space-y-0 shrink-0 pr-20">
            <DialogTitle className="font-black uppercase tracking-tighter text-xl truncate pr-4">
              {selectedPdf?.title}
            </DialogTitle>
            <div className="flex items-center gap-4">
              {selectedPdf?.url && (
                <a 
                  href={selectedPdf.url} 
                  download
                  className="bg-white text-brand-purple px-6 py-2 font-black uppercase text-[10px] tracking-widest hover:bg-brand-black hover:text-white transition-all items-center gap-2 hidden sm:flex"
                >
                  DESCARGAR <Download size={14} />
                </a>
              )}
            </div>
          </DialogHeader>
          
          <div className="flex-grow bg-muted/20 relative">
            {selectedPdf?.url && (
              <iframe 
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(selectedPdf.url)}&embedded=true`}
                className="absolute inset-0 w-full h-full border-none"
                title="Visor PDF"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
