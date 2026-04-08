
"use client";

import React, { useState } from 'react';
import { timelineEvents, TimelineEvent } from '@/lib/timeline-events';
import { RevealSection } from '@/components/RevealSection';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  PenTool, Music, Theater, Video, Camera, BookOpen, 
  Sparkles, Calendar, Info, X, ArrowUpRight, FileText,
  MapPin, Clock, Eye
} from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const iconMap = {
  pen: PenTool,
  music: Music,
  theater: Theater,
  video: Video,
  camera: Camera,
  book: BookOpen,
  sparkles: Sparkles
};

export function HistoryTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <section className="py-12 md:py-24 bg-muted/5 relative border-t-2 border-brand-black">
      <div className="container mx-auto px-6">
        <RevealSection className="mb-16 text-center md:text-left">
          <Badge className="bg-brand-gold text-brand-black px-4 py-1 rounded-none text-[9px] font-black uppercase tracking-[0.4em] w-fit mb-6 shadow-xl">
            CRONOLOGÍA CULTURAL • 1990 - 2026
          </Badge>
          <h2 className="text-4xl md:text-6xl font-black text-brand-black tracking-tighter leading-[0.8] uppercase">
            LÍNEA DE <br />
            <span className="text-brand-gold">TIEMPO</span>
          </h2>
        </RevealSection>

        <div className="relative max-w-4xl mx-auto">
          {/* Línea central sutil */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-black/5 -translate-x-1/2 hidden md:block"></div>
          
          <div className="space-y-10 md:space-y-12">
            {timelineEvents.map((event, idx) => {
              const Icon = iconMap[event.iconType as keyof typeof iconMap] || Sparkles;
              const isEven = idx % 2 === 0;
              const isHito = event.category === 'HITO' || event.category === 'PRESENTE';

              return (
                <RevealSection 
                  key={event.id} 
                  delay={idx * 20}
                  className={cn(
                    "relative flex flex-col md:flex-row items-center justify-between w-full",
                    isEven ? "md:flex-row-reverse" : ""
                  )}
                >
                  {/* Nodo central */}
                  <div className="absolute left-4 md:left-1/2 w-10 h-10 bg-white border-2 border-brand-black z-10 -translate-x-1/2 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] group">
                    <Icon size={16} className={cn("transition-transform duration-500 group-hover:scale-110", isHito ? "text-brand-gold" : "text-brand-teal")} />
                  </div>

                  {/* Tarjeta de evento */}
                  <div className={cn(
                    "w-full md:w-[46%] pl-12 md:pl-0",
                    isEven ? "md:text-left" : "md:text-right"
                  )}>
                    <div 
                      onClick={() => setSelectedEvent(event)}
                      className={cn(
                        "group bg-white border-2 border-brand-black/10 hover:border-brand-black shadow-sm hover:shadow-[12px_12px_0px_0px_rgba(217,160,47,0.1)] hover:-translate-y-1 transition-all duration-500 cursor-pointer overflow-hidden flex flex-col",
                        isHito ? "border-brand-gold/30 hover:border-brand-gold" : ""
                      )}
                    >
                      {event.imageUrl && (
                        <div className="relative aspect-[21/9] w-full max-h-36 overflow-hidden bg-muted">
                           <img 
                             src={event.imageUrl} 
                             className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
                             alt={event.title} 
                           />
                           <div className="absolute inset-0 bg-brand-black/5 group-hover:bg-transparent transition-colors" />
                           <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                              <Eye size={14} className="text-brand-black" />
                           </div>
                        </div>
                      )}
                      
                      <div className="p-5 md:p-6 space-y-4">
                        <div className={cn(
                          "flex flex-col gap-1",
                          isEven ? "items-start" : "md:items-end"
                        )}>
                          <span className="text-2xl font-black text-brand-gold leading-none tracking-tighter">{event.year}</span>
                          <Badge className={cn(
                            "text-[7px] font-black uppercase tracking-widest px-2 py-0.5 rounded-none",
                            isHito ? "bg-brand-black text-white" : "bg-brand-teal text-white"
                          )}>
                            {event.category}
                          </Badge>
                        </div>
                        
                        <h3 className="text-base md:text-lg font-black uppercase tracking-tighter leading-none group-hover:text-brand-teal transition-colors line-clamp-2">
                          {event.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-[11px] font-medium leading-relaxed line-clamp-2 italic">
                          "{event.description}"
                        </p>
                        
                        <div className={cn(
                          "flex flex-wrap items-center gap-3 pt-4 border-t border-muted",
                          isEven ? "justify-start" : "md:justify-end"
                        )}>
                          {event.hasArchive && (
                            <div className="flex items-center gap-1.5 text-[7px] font-black uppercase tracking-[0.2em] bg-brand-gold/10 text-brand-black px-2 py-1 border border-brand-gold/20">
                              <FileText size={8} /> REGISTRO DISPONIBLE
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 text-[8px] font-black uppercase tracking-[0.3em] text-brand-black group-hover:text-brand-teal transition-colors">
                            AMPLIAR CRÓNICA <ArrowUpRight size={12} className="text-brand-gold" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Espaciador para grid alterno */}
                  <div className="hidden md:block w-[46%]"></div>
                </RevealSection>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal de Detalle Editorial */}
      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl p-0 bg-white border-none rounded-none overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[85vh] !z-[300]">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedEvent?.title}</DialogTitle>
          </DialogHeader>
          
          {/* Botón Cerrar Personalizado */}
          <button 
            onClick={() => setSelectedEvent(null)}
            className="absolute right-4 top-4 z-[310] bg-brand-black text-white p-2 hover:bg-brand-gold hover:text-brand-black transition-all shadow-2xl border-2 border-white"
          >
            <X size={24} />
          </button>

          {/* Columna Visual */}
          <div className="relative w-full md:w-5/12 bg-brand-black h-48 md:h-auto shrink-0 overflow-hidden group">
            {selectedEvent?.imageUrl ? (
              <img 
                src={selectedEvent.imageUrl} 
                className="object-cover w-full h-full opacity-90 transition-transform duration-[10s] group-hover:scale-110" 
                alt="" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-brand-gold/5">
                 <PenTool size={64} className="text-brand-gold opacity-10" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-8 left-8 space-y-2">
               <span className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">{selectedEvent?.year}</span>
               <div className="h-2 w-20 bg-brand-gold"></div>
            </div>
          </div>

          {/* Columna de Texto Editorial */}
          <div className="p-8 md:p-14 flex flex-col justify-center space-y-8 w-full md:w-7/12 overflow-y-auto custom-scrollbar">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-muted px-3 py-1">
                  <Calendar className="text-brand-gold" size={14} />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-black">{selectedEvent?.date}</span>
                </div>
                <Badge className="bg-brand-teal text-white rounded-none tracking-widest text-[8px] px-3">
                  {selectedEvent?.category}
                </Badge>
              </div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.85] text-brand-black">
                {selectedEvent?.title}
              </h2>
            </div>
            
            <div className="prose prose-sm max-w-none">
              <p className="text-base md:text-lg font-medium text-brand-black/70 leading-relaxed italic text-justify border-l-8 border-brand-gold pl-8">
                "{selectedEvent?.fullDescription}"
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-muted">
              {selectedEvent?.hasArchive && (
                <Button asChild className="bg-brand-gold hover:bg-brand-black text-brand-black hover:text-white font-black uppercase text-[9px] tracking-[0.4em] h-14 rounded-none shadow-xl transition-all">
                  <Link href="/archivo" className="flex items-center justify-center gap-3">
                    CONSULTAR ARCHIVO PDF <FileText size={16} />
                  </Link>
                </Button>
              )}
              <Button 
                onClick={() => setSelectedEvent(null)}
                variant="outline"
                className="h-14 border-2 border-brand-black font-black uppercase text-[9px] tracking-[0.4em] hover:bg-brand-black hover:text-white transition-all rounded-none"
              >
                CERRAR CRÓNICA
              </Button>
            </div>
            
            <div className="flex items-center justify-between text-[8px] font-black text-muted-foreground uppercase tracking-widest opacity-40">
               <span>RECURSO DE MEMORIA HOY</span>
               <span>ID: {selectedEvent?.id}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
