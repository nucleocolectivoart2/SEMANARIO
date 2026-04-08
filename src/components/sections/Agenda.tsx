
"use client";

import React, { useState, useMemo } from 'react';
import { 
  Calendar as CalendarIcon, MapPin, Loader2, ArrowUpRight, 
  Clock, ChevronRight, Search, Filter, ExternalLink,
  X
} from 'lucide-react';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { format, isToday, isTomorrow, isAfter, startOfToday } from 'date-fns';
import { es } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RevealSection } from '@/components/RevealSection';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function Agenda() {
  const db = useFirestore();
  
  // States
  const [searchQuery, setSearchQuery] = useState('');
  const [dateTab, setDateTab] = useState('all'); 
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  // Firestore Query
  const agendaQuery = useMemoFirebase(() => 
    query(collection(db, 'cultural_events'), orderBy('startDate', 'asc')), 
  [db]);
  const { data: rawEvents, isLoading } = useCollection(agendaQuery);

  // Filtering
  const filteredEvents = useMemo(() => {
    if (!rawEvents) return [];
    
    return rawEvents.filter(event => {
      const eventDate = new Date(event.startDate);
      const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           event.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || event.category === categoryFilter;
      
      let matchesDate = true;
      if (dateTab === 'today') matchesDate = isToday(eventDate);
      else if (dateTab === 'tomorrow') matchesDate = isTomorrow(eventDate);
      else if (dateTab === 'upcoming') matchesDate = isAfter(eventDate, startOfToday());

      return matchesSearch && matchesCategory && matchesDate;
    });
  }, [rawEvents, searchQuery, dateTab, categoryFilter]);

  const categories = useMemo(() => {
    if (!rawEvents) return [];
    const cats = new Set(rawEvents.map(e => e.category).filter(Boolean));
    return Array.from(cats);
  }, [rawEvents]);

  const agendaHeroImg = PlaceHolderImages.find(img => img.id === 'cultural-event');

  return (
    <section id="agenda" className="py-16 md:py-32 bg-white relative overflow-hidden">
      {/* Elementos gráficos de imprenta 90s */}
      <div className="absolute top-10 right-10 flex flex-col items-end gap-3 opacity-30 pointer-events-none hidden lg:flex">
        <div className="flex gap-1 h-3 w-32 border border-black/10">
          <div className="flex-1 bg-[#00FFFF]"></div>
          <div className="flex-1 bg-[#FF00FF]"></div>
          <div className="flex-1 bg-[#FFFF00]"></div>
          <div className="flex-1 bg-black"></div>
        </div>
        <div className="relative w-8 h-8 flex items-center justify-center">
          <div className="absolute w-full h-[1px] bg-black"></div>
          <div className="absolute h-full w-[1px] bg-black"></div>
          <div className="w-4 h-4 border border-black rounded-full"></div>
        </div>
        <span className="text-[7px] font-black tracking-[0.3em] uppercase">COLOR CALIBRATION UNIT</span>
      </div>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 md:mb-24 items-center">
          <div className="lg:col-span-7 space-y-8 md:space-y-10">
            <RevealSection>
              <Badge className="bg-brand-gold text-brand-black px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.5em] w-fit mb-6 md:mb-8">
                PROGRAMACIÓN VIVA • HOY
              </Badge>
              <h1 className="text-5xl md:text-8xl font-black text-brand-black tracking-tighter leading-[0.8] uppercase">
                AGENDESE <br />
                <span className="text-brand-gold">Destacados de la semana</span>
              </h1>
              <div className="pt-8 md:pt-12 border-l-[12px] md:border-l-[16px] border-brand-teal pl-6 md:pl-10">
                <p className="text-lg md:text-2xl text-muted-foreground font-medium leading-tight max-w-2xl">
                  Encuentra en este lugar opciones para hacer y vivir la movida cultural de la ciudad.
                </p>
              </div>
            </RevealSection>
          </div>
          <div className="lg:col-span-5 relative group">
            <RevealSection delay={300}>
              <div className="relative aspect-[4/5] w-full bg-muted shadow-2xl overflow-hidden border-4 border-brand-black">
                {agendaHeroImg && (
                  <Image 
                    src={agendaHeroImg.imageUrl} 
                    alt="Agenda Cultural" 
                    fill 
                    className="object-cover transition-transform duration-[20s] group-hover:scale-110"
                    data-ai-hint="Urban Festival"
                  />
                )}
                <div className="absolute inset-0 bg-brand-black/10 mix-blend-multiply pointer-events-none" />
              </div>
            </RevealSection>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-10 md:mb-12 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center bg-brand-black p-2 shadow-2xl">
            <div className="lg:col-span-4 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" size={18} />
              <Input 
                placeholder="BUSCAR EVENTOS..." 
                className="bg-white/5 border-none text-white h-12 md:h-14 pl-12 rounded-none placeholder:text-white/20 font-black uppercase text-[9px] md:text-[10px] tracking-widest"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="lg:col-span-5 overflow-x-auto custom-scrollbar">
              <Tabs defaultValue="all" className="w-full" onValueChange={setDateTab}>
                <TabsList className="bg-transparent h-12 md:h-14 w-full p-0 gap-1 rounded-none min-w-[320px]">
                  <TabsTrigger value="all" className="flex-1 h-full rounded-none data-[state=active]:bg-brand-gold data-[state=active]:text-black text-white/60 font-black text-[8px] md:text-[9px] uppercase tracking-widest">TODOS</TabsTrigger>
                  <TabsTrigger value="today" className="flex-1 h-full rounded-none data-[state=active]:bg-brand-gold data-[state=active]:text-black text-white/60 font-black text-[8px] md:text-[9px] uppercase tracking-widest">HOY</TabsTrigger>
                  <TabsTrigger value="tomorrow" className="flex-1 h-full rounded-none data-[state=active]:bg-brand-gold data-[state=active]:text-black text-white/60 font-black text-[8px] md:text-[9px] uppercase tracking-widest">MAÑANA</TabsTrigger>
                  <TabsTrigger value="upcoming" className="flex-1 h-full rounded-none data-[state=active]:bg-brand-gold data-[state=active]:text-black text-white/60 font-black text-[8px] md:text-[9px] uppercase tracking-widest">PRÓXIMOS</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="lg:col-span-3">
              <Select onValueChange={setCategoryFilter} defaultValue="all">
                <SelectTrigger className="bg-white/5 border-none text-white h-12 md:h-14 rounded-none font-black uppercase text-[8px] md:text-[9px] tracking-widest">
                  <div className="flex items-center gap-3">
                    <Filter size={14} className="text-brand-gold" />
                    <SelectValue placeholder="CATEGORÍA" />
                  </div>
                </SelectTrigger>
                <SelectContent className="rounded-none border-brand-black bg-brand-black text-white">
                  <SelectItem value="all" className="text-[9px] font-black uppercase tracking-widest">TODAS</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat} className="text-[9px] font-black uppercase tracking-widest">{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20 md:py-32 gap-6">
            <Loader2 className="animate-spin text-brand-gold" size={48} />
            <span className="text-[9px] font-black uppercase tracking-[0.5em] text-muted-foreground">SINCRONIZANDO HOY...</span>
          </div>
        ) : filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-muted shadow-2xl bg-white">
            {filteredEvents.map((event, idx) => (
              <div 
                key={event.id} 
                onClick={() => setSelectedEvent(event)}
                className={cn(
                  "group relative p-0 border-r border-b border-muted hover:bg-muted/10 transition-all duration-700 cursor-pointer overflow-hidden flex flex-col",
                  idx % 3 === 1 ? "bg-muted/5" : "bg-white"
                )}
              >
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <img 
                    src={event.imageUrl || `https://picsum.photos/seed/${event.id}/800/450`} 
                    alt={event.title} 
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" 
                  />
                  {!event.imageUrl && (
                    <div className="absolute inset-0 bg-brand-black/20 flex items-center justify-center">
                       <span className="text-white font-black text-[8px] uppercase tracking-widest">ARCHIVO VIVO</span>
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-10 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-6 md:mb-8">
                    <div className="flex flex-col border-l-2 border-brand-gold pl-4">
                      <span className="text-2xl md:text-3xl font-black text-brand-black leading-none tracking-tighter">
                        {event.startDate ? format(new Date(event.startDate), "dd") : '00'}
                      </span>
                      <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.3em] text-brand-gold mt-1">
                        {event.startDate ? format(new Date(event.startDate), "MMMM", { locale: es }) : 'Pendiente'}
                      </span>
                    </div>
                    <Badge variant="outline" className="border-brand-black text-brand-black text-[6px] md:text-[7px] font-black uppercase px-2 py-0.5 rounded-none tracking-widest">
                      {event.category}
                    </Badge>
                  </div>

                  <div className="space-y-3 md:space-y-4 flex-grow">
                    <h3 className="text-lg md:text-2xl font-black uppercase tracking-tighter leading-[1] group-hover:text-brand-teal transition-colors duration-500">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground text-[9px] md:text-[10px] font-medium leading-relaxed line-clamp-3">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-6 md:mt-8 space-y-2 pt-4 md:pt-6 border-t border-muted">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Clock size={12} className="text-brand-teal" />
                      <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.2em]">
                        {event.startDate ? format(new Date(event.startDate), "HH:mm") : '--:--'} HRS
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin size={12} className="text-brand-teal" />
                      <span className="text-[7px] md:text-[8px] font-bold uppercase tracking-[0.2em] truncate">{event.locationName || 'CENTRO, MEDELLÍN'}</span>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                      <span className="text-[7px] md:text-[8px] font-black uppercase tracking-[0.4em] text-brand-black group-hover:text-brand-teal">VER DETALLES</span>
                      <ChevronRight size={14} className="text-brand-gold" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 md:py-32 border-2 border-dashed border-muted text-center bg-muted/5">
             <div className="max-w-xs mx-auto space-y-4">
                <CalendarIcon className="w-10 h-10 md:w-12 md:h-12 text-muted-foreground mx-auto opacity-20" />
                <h3 className="text-xs md:text-sm font-black text-muted-foreground uppercase tracking-widest">Sin resultados para esta búsqueda</h3>
                <Button variant="ghost" onClick={() => {setSearchQuery(''); setCategoryFilter('all'); setDateTab('all');}} className="text-[8px] md:text-[9px] font-black uppercase underline tracking-widest">Limpiar Filtros</Button>
             </div>
          </div>
        )}
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={(open) => !open && setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl p-0 bg-white border-none rounded-none overflow-hidden shadow-2xl flex flex-col md:flex-row h-full max-h-[90vh]">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedEvent?.title || 'Detalles del Evento'}</DialogTitle>
          </DialogHeader>
          <DialogClose className="absolute right-4 top-4 z-[100] bg-white p-2 border-2 border-brand-black hover:bg-brand-black hover:text-white transition-all rounded-none">
            <X size={20} />
          </DialogClose>
          
          <div className="relative w-full md:w-1/2 bg-brand-black h-40 md:h-auto shrink-0">
            <img 
              src={selectedEvent?.imageUrl || `https://picsum.photos/seed/${selectedEvent?.id}/800/1200`} 
              className="object-cover w-full h-full opacity-80" 
              alt="" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
               <Badge className="bg-brand-gold text-brand-black font-black uppercase text-[8px] md:text-[10px] tracking-widest rounded-none px-4 md:px-6 py-1.5 md:py-2">
                  {selectedEvent?.category}
               </Badge>
            </div>
          </div>

          <ScrollArea className="flex-grow w-full md:w-1/2">
            <div className="p-6 md:p-12 space-y-6 md:space-y-8">
              <div className="space-y-3 md:space-y-4">
                <span className="text-brand-teal font-black text-[8px] md:text-[10px] uppercase tracking-[0.5em] border-b-2 border-brand-teal pb-1">DETALLES DEL EVENTO</span>
                <h3 className="text-2xl md:text-4xl font-black text-brand-black tracking-tighter uppercase leading-[0.9]">
                  {selectedEvent?.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 border-y border-muted py-6 md:py-8">
                 <div className="space-y-1 md:space-y-2">
                    <span className="text-[7px] md:text-[8px] font-black text-muted-foreground uppercase tracking-widest">FECHA</span>
                    <p className="text-base md:text-xl font-black uppercase">
                      {selectedEvent?.startDate ? format(new Date(selectedEvent.startDate), "dd MMMM", { locale: es }) : '---'}
                    </p>
                 </div>
                 <div className="space-y-1 md:space-y-2">
                    <span className="text-[7px] md:text-[8px] font-black text-muted-foreground uppercase tracking-widest">HORA</span>
                    <p className="text-base md:text-xl font-black uppercase">
                      {selectedEvent?.startDate ? format(new Date(selectedEvent.startDate), "HH:mm") : '--:--'} HRS
                    </p>
                 </div>
                 <div className="col-span-1 sm:col-span-2 space-y-1 md:space-y-2">
                    <span className="text-[7px] md:text-[8px] font-black text-muted-foreground uppercase tracking-widest">LUGAR</span>
                    <p className="text-base md:text-xl font-black uppercase text-brand-teal flex items-center gap-2">
                      <MapPin size={18} /> {selectedEvent?.locationName || 'CENTRO, MEDELLÍN'}
                    </p>
                 </div>
              </div>

              <div className="prose prose-sm max-w-none">
                 <p className="text-muted-foreground text-xs md:text-sm font-medium leading-relaxed whitespace-pre-line text-justify">
                   {selectedEvent?.description}
                 </p>
              </div>

              <div className="pt-6 md:pt-8 flex flex-col gap-3 md:gap-4">
                {selectedEvent?.sourceUrl && (
                  <Button asChild className="bg-brand-black hover:bg-brand-gold text-white font-black text-[9px] md:text-[10px] uppercase tracking-widest h-12 md:h-14 rounded-none w-full">
                    <a href={selectedEvent.sourceUrl} target="_blank" rel="noopener noreferrer">
                      VER FUENTE OFICIAL <ExternalLink size={16} className="ml-3" />
                    </a>
                  </Button>
                )}
                <Button onClick={() => setSelectedEvent(null)} variant="outline" className="border-brand-black font-black text-[9px] md:text-[10px] uppercase tracking-widest h-12 md:h-14 rounded-none w-full">
                  VOLVER A LA AGENDA
                </Button>
              </div>
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </section>
  );
}
