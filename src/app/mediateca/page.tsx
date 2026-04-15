"use client";

import React, { useState, useMemo } from 'react';
import { Navbar } from '@/components/Navbar';
import { BrandStrip } from '@/components/BrandStrip';
import { RevealSection } from '@/components/RevealSection';
import { Badge } from '@/components/ui/badge';
import { 
  Play, X, Library, Heart, Zap, Film, Users, Quote, Sparkles
} from 'lucide-react';
import Image from 'next/image';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { officialVideos, getYouTubeId } from '@/lib/media-data';

export default function MediatecaPage() {
  const db = useFirestore();
  const multimediaQuery = useMemoFirebase(() => query(collection(db, 'multimedia_content'), orderBy('publicationDate', 'desc')), [db]);
  const { data: firestoreContent } = useCollection(multimediaQuery);
  
  const [selectedVideo, setSelectedVideo] = useState<{youtubeId?: string, title: string, url?: string} | null>(null);

  const allVideos = useMemo(() => {
    const userVideos = (firestoreContent || []).filter(item => item.type === 'video').map(v => ({
      id: v.id,
      title: v.title.toUpperCase(),
      description: v.description,
      youtubeId: getYouTubeId(v.url),
      url: v.url,
      season: v.category?.toUpperCase() || 'RECIENTE',
      thumbnailUrl: v.thumbnailUrl,
      isPlaceholder: false,
      project: 'centro-vive'
    }));
    return [...officialVideos.filter(v => v.project === 'centro-vive'), ...userVideos];
  }, [firestoreContent]);

  const handleVideoClick = (video: any) => {
    if (video.isPlaceholder) return;
    const ytId = video.youtubeId || getYouTubeId(video.url);
    if (ytId) setSelectedVideo({ youtubeId: ytId, title: video.title });
    else if (video.url) window.open(video.url, '_blank');
  };

  const mediatecaHeroImg = PlaceHolderImages.find(img => img.id === 'multimedia-video');

  return (
    <main className="min-h-screen bg-brand-black text-white selection:bg-brand-teal selection:text-white">
      <Navbar />
      
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <RevealSection className="lg:col-span-7 space-y-8">
              <Badge className="bg-brand-teal text-white px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.5em] w-fit shadow-xl">
                MEDIATECA • EL CENTRO VIVE
              </Badge>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.8] uppercase">
                EL CENTRO <br />
                <span className="text-brand-teal">VIVE Y RESUENA</span>
              </h1>
              <div className="pt-8 border-l-[16px] border-brand-teal pl-10">
                <p className="text-lg md:text-xl text-white/60 font-medium leading-tight max-w-2xl">
                  Registro audiovisual y crónicas de la vida cotidiana en el corazón de Medellín.
                </p>
              </div>
            </RevealSection>
            
            <RevealSection delay={300} className="lg:col-span-5 relative group hidden lg:flex flex-col items-end">
              <div className="relative w-[65%]">
                <div className="relative aspect-[4/5] w-full bg-white/5 shadow-2xl overflow-hidden border-4 border-white/10">
                  {mediatecaHeroImg && (
                    <Image 
                      src={mediatecaHeroImg.imageUrl} 
                      alt="Mediateca Cultural" 
                      fill 
                      className="object-cover transition-transform duration-[20s] group-hover:scale-110"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-brand-black/20 mix-blend-multiply pointer-events-none" />
                </div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-brand-teal flex items-center justify-center p-8 text-white font-black text-sm uppercase tracking-widest text-center leading-none z-20 shadow-2xl transition-transform group-hover:scale-105">
                  NARRATIVAS<br /> DIGITALES
                </div>
              </div>
            </RevealSection>
          </div>

          <div className="space-y-20">
            {/* Bloque de Contexto Editorial */}
            <RevealSection className="bg-[#0a1a1a] border-l-[12px] border-brand-teal p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                 <Library className="w-64 h-64" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
                <div className="lg:col-span-8 space-y-10">
                  <div className="space-y-6">
                    <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-none">EL CENTRO VIVE Y RESUENA CON EL SEMANARIO</h2>
                    <p className="text-base md:text-xl font-bold text-white leading-relaxed text-justify italic">
                      "El Centro vive y resuena con el Semanario busca promover, resignificar y visibilizar el Centro de Medellín como el mayor espacio público y destino artístico por excelencia de la ciudad."
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
                    {[
                      { icon: Zap, label: "PROPÓSITO", text: "Incentivar el encuentro y la apropiación del centro de la ciudad y contribuir en su resignificación." },
                      { icon: Film, label: "ENFOQUE", text: "Campaña digital que destaca organizaciones culturales y espacios patrimoniales del centro de Medellín y muestra su variada oferta." },
                      { icon: Heart, label: "LUGARES", text: "Iconos patrimoniales y edificios con historias vivas." },
                      { icon: Users, label: "CONEXIÓN", text: "Busca reconectar a jóvenes y adultos con el corazón cultural de la ciudad." }
                    ].map((item, idx) => (
                      <div key={idx} className="flex gap-4 group">
                        <div className="w-10 h-10 bg-brand-gold/10 flex items-center justify-center shrink-0 mt-1 transition-colors group-hover:bg-brand-gold">
                           <item.icon className="text-brand-gold group-hover:text-brand-black transition-colors" size={20} />
                        </div>
                        <div className="space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">{item.label}</span>
                          <p className="text-xs text-white/70 leading-relaxed">{item.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-8">
                  <div className="bg-white/5 border border-white/10 p-6 space-y-4">
                    <span className="text-[9px] font-black uppercase tracking-widest text-brand-gold flex items-center gap-2">
                      <Play size={12} fill="currentColor" /> VIDEO DE SOCIALIZACIÓN
                    </span>
                    <div 
                      className="relative aspect-video group cursor-pointer overflow-hidden border border-white/20"
                      onClick={() => setSelectedVideo({ youtubeId: 'g23v49jUT1s', title: 'SOCIALIZACIÓN DEL PROYECTO' })}
                    >
                      <img 
                        src="https://i.ytimg.com/vi/g23v49jUT1s/hqdefault.jpg" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        alt="" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-brand-black/20">
                        <div className="w-12 h-12 bg-white text-brand-black flex items-center justify-center shadow-2xl">
                          <Play size={20} fill="currentColor" className="ml-0.5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-brand-gold/10 border border-brand-gold/20 space-y-4">
                     <div className="flex items-center gap-2">
                        <Quote className="text-brand-gold rotate-180" size={16} />
                        <span className="text-[9px] font-black uppercase tracking-widest text-brand-gold">AVAL INSTITUCIONAL</span>
                     </div>
                     <p className="text-[10px] font-bold leading-relaxed text-white/80">
                       “Proyecto Apoyado por el MINISTERIO DE LAS CULTURAS, LAS ARTES Y LOS SABERES, Programa Nacional de Concertación Cultural”
                     </p>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* Temporadas de Video */}
            <SectionHeader badge="TEMPORADA 2 (2026)" title="EL CENTRO VIVE • ACTUALIDAD" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allVideos.filter(v => v.season.includes('TEMPORADA 2')).map(video => (
                <VideoCardCompact key={video.id} video={video} onClick={() => handleVideoClick(video)} />
              ))}
            </div>

            <SectionHeader badge="TEMPORADA 1 (2025)" title="EL CENTRO VIVE • SERIE" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {allVideos.filter(v => v.season.includes('TEMPORADA 1')).map(video => (
                <VideoCardCompact key={video.id} video={video} onClick={() => handleVideoClick(video)} />
              ))}
            </div>

            {/* BANNER INSTITUCIONAL UNIFICADO */}
            <div className="relative w-[100vw] left-1/2 -translate-x-1/2 mt-20">
              <div className="bg-white text-brand-black py-16 border-y border-gray-100">
                <div className="container mx-auto px-6 max-w-7xl">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20">
                    {/* Ficha Técnica */}
                    <RevealSection className="lg:col-span-5 space-y-10">
                      <div className="space-y-4">
                        <span className="inline-block bg-brand-gold text-brand-black px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.3em]">FICHA TÉCNICA</span>
                        <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mt-4">EQUIPO EL SEMANARIO HOY</h2>
                      </div>
                      
                      <div className="space-y-6">
                        {[
                          { role: "DIRECCIÓN", name: "María Victoria Álvarez Gómez" },
                          { role: "REALIZACIÓN AUDIOVISUAL Y EDICIÓN", name: "Carlos Andrés Londoño Ruiz / @carlos.londor" },
                          { role: "PRODUCCIÓN", name: "María Cecilia Castaño Rodríguez / @duna_movil" },
                          { role: "COMUNICACIONES", name: "• Estefany Rivera Orrego\n• Natalia Vélez Sepúlveda\n• Paula Andrea Úsuga Álvarez." },
                          { role: "IMÁGENES DRONE", name: "John Cuervo Moreno / @_cuervofilms" },
                          { role: "LOCUCIÓN", name: "Paula Andrea Úsuga Álvarez" },
                          { role: "TÉCNICO DE SONIDO", name: "Julián Álvarez Kusy" }
                        ].map((m, i) => (
                          <div key={i} className="border-l-4 border-brand-gold pl-6 space-y-1 group">
                            <span className="text-[8px] font-black text-brand-gold uppercase tracking-[0.2em] group-hover:text-brand-black transition-colors">{m.role}</span>
                            <p className="text-base md:text-lg font-black uppercase tracking-tighter whitespace-pre-line leading-tight">{m.name}</p>
                          </div>
                        ))}
                      </div>
                    </RevealSection>

                    {/* Organizaciones y Agradecimientos */}
                    <RevealSection delay={200} className="lg:col-span-7 space-y-10">
                      <div className="space-y-4">
                        <span className="inline-block bg-brand-teal text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.3em]">ECOSISTEMA CULTURAL</span>
                        <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mt-4">ORGANIZACIONES PARTICIPANTES</h2>
                      </div>

                      <div className="space-y-12">
                        <div className="space-y-4">
                          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-teal border-l-4 border-brand-teal pl-3">Temporada 1</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {["Centro Cultural La Huerta", "Restaurante Bar Agua Dulce", "Teatro Casa Clown", "Teatro Matacandelas", "Corporación Cultural Viva Palabra", "Pequeño Teatro", "El club del Jazz", "La Casa Centro Cultural"].map((org, i) => (
                              <OrgBadge key={i} name={org} color="teal" />
                            ))}
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold border-l-4 border-brand-gold pl-3">Temporada 2</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {["Teatro Popular de Medellín", "Palacio de Bellas Artes", "Edificio Universidad de Antioquia", "Casa Cultural Homero Manzi", "Casa de la Cultura Confiar", "Teatro Pablo Tobón Uribe"].map((org, i) => (
                              <OrgBadge key={i} name={org} color="gold" />
                            ))}
                          </div>
                        </div>

                        {/* BLOQUE DE AGRADECIMIENTOS ESPECIALES */}
                        <div className="pt-10 border-t border-gray-100">
                          <div className="flex items-center gap-3 mb-8">
                            <Sparkles className="text-brand-teal" size={16} />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-teal">AGRADECIMIENTOS ESPECIALES</span>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row items-center gap-8">
                            <div className="relative w-32 h-16 shrink-0 grayscale hover:grayscale-0 transition-all">
                              <Image 
                                src="https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/logo-camina-pal-centro.png" 
                                alt="Logo Caminá pa'l Centro" 
                                fill 
                                className="object-contain"
                              />
                            </div>
                            <p className="text-[11px] font-bold uppercase tracking-tight text-brand-black/60 leading-snug max-w-sm text-center sm:text-left">
                              Iniciativa colaborativa para valorar un bien común: <br />
                              <span className="text-brand-black">el centro de Medellín, el barrio de todos.</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </RevealSection>
                  </div>

                  {/* SECCIÓN DE LOGOS Y AVAL INSTITUCIONAL — RÉPLICA EXACTA REFERENCIA */}
                  <RevealSection className="border-t border-gray-100 pt-20 mt-20 flex flex-col items-center gap-12">
                    {/* Logo El Centro Vive y Resuena — Centrado y Grande */}
                    <div className="relative w-full max-w-2xl h-48 md:h-64">
                      <Image 
                        src="https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/Logo_El_Centro.jpg" 
                        alt="Logo El Centro Vive y Resuena" 
                        fill 
                        className="object-contain" 
                      />
                    </div>

                    <div className="w-full max-w-4xl h-[1px] bg-gray-100 my-4" />

                    {/* Logos Ministerio y Fundación — Side by side */}
                    <div className="relative w-full max-w-xl h-24 md:h-32">
                      <Image 
                        src="https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/Logos_institucionales.png" 
                        alt="Logos Institucionales" 
                        fill 
                        className="object-contain" 
                      />
                    </div>

                    {/* Texto Legal — Centrado y Pequeño */}
                    <p className="text-[8px] md:text-[9px] font-black uppercase leading-relaxed tracking-widest text-center text-brand-black/80 max-w-3xl px-4 italic">
                      “PROYECTO APOYADO POR EL MINISTERIO DE LAS CULTURAS, LAS ARTES Y LOS SABERES, <br />
                      PROGRAMA NACIONAL DE CONCERTACIÓN CULTURAL”
                    </p>

                    {/* Fecha de Vigencia — Puente Visual */}
                    <div className="mt-8 mb-4">
                      <span className="text-brand-gold font-black text-[11px] md:text-[13px] uppercase tracking-[0.6em] text-center block">
                        MEDELLÍN 2025 - 2026
                      </span>
                    </div>
                  </RevealSection>
                </div>
              </div>

              {/* BANNER FINAL PÚRPURA — RÉPLICA EXACTA REFERENCIA */}
              <div className="w-full bg-[#9D6BA1] py-16 px-6 border-t-[10px] border-brand-gold text-center space-y-4">
                <h2 className="text-xl md:text-3xl font-black tracking-tighter text-white uppercase leading-none">
                  EL CENTRO VIVE Y RESUENA CON EL SEMANARIO:
                </h2>
                <p className="text-base md:text-2xl font-black tracking-tight text-white/95 leading-tight italic">
                  ¡el centro de medellín, todo en un mismo lugar!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BrandStrip />

      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-7xl p-0 bg-black border-none rounded-none overflow-hidden">
          <DialogHeader className="sr-only"><DialogTitle>{selectedVideo?.title}</DialogTitle></DialogHeader>
          <button onClick={() => setSelectedVideo(null)} className="absolute right-4 top-4 z-[100] bg-brand-red text-white p-3 hover:bg-white hover:text-brand-red transition-all shadow-2xl">
            <X size={24} />
          </button>
          <div className="relative aspect-video w-full bg-black">
            {selectedVideo?.youtubeId && (
              <iframe src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`} className="absolute inset-0 w-full h-full" allowFullScreen></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}

function SectionHeader({ badge, title }: { badge: string, title: string }) {
  return (
    <div className="space-y-6 border-b-2 border-white/10 pb-8 mb-12">
      <Badge className="bg-brand-gold text-brand-black rounded-none text-[10px] md:text-xs font-black uppercase tracking-[0.4em] px-4 py-1.5">{badge}</Badge>
      <h2 className="text-xl md:text-4xl font-black uppercase tracking-tighter leading-[0.85] text-white">{title}</h2>
    </div>
  );
}

function VideoCardCompact({ video, onClick }: { video: any, onClick: () => void }) {
  const ytId = video.youtubeId || getYouTubeId(video.url);
  const thumbnail = ytId ? `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg` : (video.thumbnailUrl || 'https://picsum.photos/seed/vid/600/400');

  return (
    <div className={cn("group space-y-4", !video.isPlaceholder && "cursor-pointer")} onClick={onClick}>
      <div className="relative aspect-video overflow-hidden bg-muted border border-white/5">
        <Image src={thumbnail} alt={video.title} fill className={cn("object-cover transition-transform duration-700", !video.isPlaceholder && "group-hover:scale-105")} />
        {video.isPlaceholder && (
          <div className="absolute inset-0 z-10 bg-brand-black/40 backdrop-blur-[2px] flex items-center justify-center">
            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/80">PRODUCCIÓN EN CURSO</span>
          </div>
        )}
        <div className={cn(
          "absolute top-3 right-3 z-20 w-10 h-10 flex items-center justify-center transition-all shadow-2xl",
          video.isPlaceholder ? "bg-brand-teal text-white" : "bg-white text-brand-black group-hover:bg-brand-teal group-hover:text-white"
        )}>
          {video.isPlaceholder ? <Sparkles size={18} /> : <Play size={18} className="fill-current ml-0.5" />}
        </div>
      </div>
      <div className="space-y-2">
        <Badge className={cn("text-[7px] font-black uppercase px-2 py-0.5 rounded-none", video.isPlaceholder ? "bg-brand-gold" : "bg-brand-teal")}>{video.season}</Badge>
        <h4 className="text-base font-black text-white uppercase tracking-tighter leading-tight group-hover:text-brand-teal transition-colors">{video.title}</h4>
        <p className="text-white/40 text-[10px] font-medium leading-relaxed line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
}

function OrgBadge({ name, color }: { name: string, color: 'teal' | 'gold' }) {
  const dotColor = color === 'teal' ? 'bg-brand-teal' : 'bg-brand-gold';
  const hoverBorder = color === 'teal' ? 'hover:border-brand-teal' : 'hover:border-brand-gold';
  const hoverText = color === 'teal' ? 'group-hover:text-brand-teal' : 'group-hover:text-brand-gold';

  return (
    <div className={cn("bg-white p-4 border border-gray-100 transition-all group shadow-sm", hoverBorder)}>
      <div className="flex items-center gap-3">
        <div className={cn("w-1.5 h-1.5 rounded-full transition-colors group-hover:scale-125", dotColor)} />
        <span className={cn("font-bold text-xs md:text-sm uppercase tracking-tight transition-colors", hoverText)}>{name}</span>
      </div>
    </div>
  );
}
