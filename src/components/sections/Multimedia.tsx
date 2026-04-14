
"use client";

import React, { useState, useMemo } from 'react';
import { Play, Loader2, ArrowUpRight, X, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { BrandStrip } from '@/components/BrandStrip';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { RevealSection } from '@/components/RevealSection';

function getYouTubeId(url: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|live\/)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) return match[2];
  return null;
}

export const officialVideos = [
  { 
    id: 'v-resumen', 
    title: 'EL CENTRO DE MEDELLÍN VIVE Y RESUENA', 
    season: 'DESTACADO • HOY', 
    youtubeId: 'FaGMpv2db_M', 
    description: 'El Centro Vive y Resuena con el Semanario Medellín y Fundación Con Vida. Registro periodístico del corazón de la ciudad.' 
  },
  { 
    id: 'v-2026-1', 
    title: 'CORTOMETRAJE 1: ORGANIZACIÓN A', 
    season: 'PRODUCCIÓN 2026', 
    description: 'Nueva narrativa transmedia enfocada en el origen y resistencia de la primera organización seleccionada para Crea Digital.',
    thumbnailUrl: 'https://picsum.photos/seed/crea1/800/450',
    isPlaceholder: true 
  },
  { 
    id: 'v-2026-2', 
    title: 'CORTOMETRAJE 2: ORGANIZACIÓN B', 
    season: 'PRODUCCIÓN 2026', 
    description: 'Exploración cinematográfica del presente y futuro de una de las organizaciones pilares del ecosistema cultural del centro.',
    thumbnailUrl: 'https://picsum.photos/seed/crea2/800/450',
    isPlaceholder: true 
  },
  { 
    id: 'v-2026-3', 
    title: 'CORTOMETRAJE 3: ORGANIZACIÓN C', 
    season: 'PRODUCCIÓN 2026', 
    description: 'Cierre de la trilogía de cortometrajes 2026, conectando la memoria histórica con las nuevas ciudadanías.',
    thumbnailUrl: 'https://picsum.photos/seed/crea3/800/450',
    isPlaceholder: true 
  },
  { id: 'v-t2-1', title: 'EL CENTRO DE MEDELLÍN VIVE: T2 - INTRO', season: 'TEMPORADA 2', youtubeId: 'lrrYQthosl8', description: 'En el alma de Medellín con El Semanario HOY. Un recorrido por la resistencia cultural.' },
  { id: 'v-t2-2', title: 'EL CENTRO VIVE Y RESUENA: REGISTRO ACTUAL', season: 'TEMPORADA 2', youtubeId: 'l530ZiOZjQk', description: 'Un faro en el corazón de Medellín - Registro 2024.' },
  { id: 'v-t1-9', title: 'EPISODIO 9: LA HUERTA', season: 'TEMPORADA 1', youtubeId: 'YaLSyFGmT5Y', description: 'Un espacio cultural en el corazón de Medellín. Soberanía alimentaria y cultura.' },
  { id: 'v-t1-8', title: 'EPISODIO 8: AGUA DULCE', season: 'TEMPORADA 1', youtubeId: 'vgiHCjG4OzY', description: 'Un oasis con tres experiencias en el Parque del Periodista.' },
  { id: 'v-t1-7', title: 'EPISODIO 7: VIVA PALABRA', season: 'TEMPORADA 1', youtubeId: 'jaS5sXS67Xc', description: '28 años contando cuentos en el centro de Medellín.' },
  { id: 'v-t1-6', title: 'EPISODIO 6: ARTE URBANO', season: 'TEMPORADA 1', youtubeId: 'KdFvqG0qUlQ', description: 'La calle como lienzo de expresión cultural.' },
  { id: 'v-t1-5', title: 'EPISODIO 5: CASA DEL ENCUENTRO', season: 'TEMPORADA 1', youtubeId: 'zMFHJfp6st4', description: 'Diálogos y saberes en un espacio histórico.' },
  { id: 'v-t1-4', title: 'EPISODIO 4: PEQUEÑO TEATRO', season: 'TEMPORADA 1', youtubeId: '3nwMCxiW57E', description: '45 años de arte dramático y resistencia cultural.' },
  { id: 'v-t1-3', title: 'EPISODIO 3: TRADICIÓN', season: 'TEMPORADA 1', youtubeId: 'l1nhyWNDgp0', description: 'Historias que definen nuestra identidad.' },
  { id: 'v-t1-2', title: 'EPISODIO 2: REGISTRO', season: 'TEMPORADA 1', youtubeId: 'D_7TBSnII94', description: 'Primeros pasos del proyecto El Centro Vive.' },
  { id: 'v-t1-1', title: 'EPISODIO 1: EL ORIGEN', season: 'TEMPORADA 1', youtubeId: 'FaGMpv2db_M', description: 'El inicio de una historia de resistencia cultural en el corazón de la ciudad.' }
];

export function Multimedia() {
  const db = useFirestore();
  const multimediaQuery = useMemoFirebase(() => 
    query(collection(db, 'multimedia_content'), orderBy('publicationDate', 'desc')), 
  [db]);
  const { data: firestoreContent, isLoading } = useCollection(multimediaQuery);
  const [selectedVideo, setSelectedVideo] = useState<{youtubeId?: string, title: string, url?: string} | null>(null);

  const allVideos = useMemo(() => {
    const userVideos = (firestoreContent || [])
      .filter(item => item.type === 'video')
      .map(v => ({
        id: v.id,
        title: v.title.toUpperCase(),
        description: v.description,
        youtubeId: getYouTubeId(v.url),
        url: v.url,
        season: v.category?.toUpperCase() || 'RECIENTE',
        thumbnailUrl: v.thumbnailUrl,
        isPlaceholder: false
      }));

    const userUrls = new Set(userVideos.map(v => v.url));
    const filteredOfficial = officialVideos.filter(v => !userUrls.has(v.url || (v.youtubeId ? `https://www.youtube.com/watch?v=${v.youtubeId}` : '')));

    return [...filteredOfficial, ...userVideos];
  }, [firestoreContent]);

  const handleVideoClick = (video: any) => {
    if (video.isPlaceholder) return;
    const ytId = video.youtubeId || getYouTubeId(video.url);
    if (ytId) {
      setSelectedVideo({ youtubeId: ytId, title: video.title });
    } else if (video.url) {
      window.open(video.url, '_blank');
    }
  };

  const multimediaHeroImg = PlaceHolderImages.find(img => img.id === 'multimedia-video');

  return (
    <section id="multimedia" className="bg-black min-h-screen">
      <div className="pt-24 pb-20 border-b border-white/10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <RevealSection className="lg:col-span-7 space-y-10">
              <Badge className="bg-brand-teal text-white px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.5em] w-fit mb-8">
              RETRATO AUDIOVISUAL 
              </Badge>
              <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.8] uppercase">
                MICRO <br />
                <span className="text-brand-teal">DOCUMENTALES</span>
              </h1>
              <div className="pt-12 border-l-[16px] border-brand-teal pl-10">
                <p className="text-xl md:text-2xl text-white/60 font-medium leading-tight max-w-2xl">
                   Promovemos la resignificación del corazón de Medellín como el mayor espacio público y destino artístico de la ciudad.
                </p>
              </div>
            </RevealSection>
            
            <RevealSection delay={300} className="lg:col-span-5 relative group">
              <div className="relative aspect-[4/5] w-full bg-white/5 shadow-2xl overflow-hidden border-4 border-white/20">
                {multimediaHeroImg && (
                  <Image 
                    src={multimediaHeroImg.imageUrl} 
                    alt="Multimedia" 
                    fill 
                    className="object-cover transition-transform duration-[20s] group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-brand-black/20 mix-blend-multiply pointer-events-none" />
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-brand-teal flex items-center justify-center p-8 text-white font-black text-sm uppercase tracking-widest text-center leading-none z-10 shadow-xl transition-transform group-hover:scale-105">
                  RESONANCIA <br /> VIDEO
                </div>
              </div>
            </RevealSection>
          </div>
        </div>
      </div>

      <div className="bg-black py-24">
        <div className="container mx-auto px-6">
           {isLoading ? (
             <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 className="animate-spin text-brand-teal" size={32} />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/40">SINCRONIZANDO VIDEOTECA...</span>
             </div>
           ) : (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
                {allVideos.map((video) => (
                  <VideoCard 
                    key={video.id} 
                    video={video} 
                    onOpenModal={() => handleVideoClick(video)} 
                  />
                ))}
             </div>
           )}
        </div>
      </div>

      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-7xl p-0 bg-black border-none rounded-none overflow-hidden">
          <DialogHeader className="sr-only">
            <DialogTitle>{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          <button onClick={() => setSelectedVideo(null)} className="absolute right-4 top-4 z-[100] bg-brand-red text-white p-2 hover:bg-white hover:text-brand-red transition-all">
            <X size={24} />
          </button>
          <div className="relative aspect-video w-full bg-black">
            {selectedVideo?.youtubeId && (
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                className="absolute inset-0 w-full h-full"
                allowFullScreen
              ></iframe>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function VideoCard({ video, onOpenModal }: { video: any, onOpenModal: () => void }) {
  const youtubeId = video.youtubeId || getYouTubeId(video.url);
  const thumbnail = youtubeId 
    ? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg` 
    : (video.thumbnailUrl || 'https://picsum.photos/seed/vid/600/400');

  return (
    <div className={cn("group space-y-5", !video.isPlaceholder && "cursor-pointer")} onClick={onOpenModal}>
      <div className="relative aspect-video overflow-hidden bg-muted border border-white/5">
        <Image
          src={thumbnail}
          alt={video.title}
          fill
          className={cn("object-cover transition-transform duration-700", !video.isPlaceholder && "group-hover:scale-105")}
        />
        
        {!video.isPlaceholder && (
          <div className="absolute inset-0 bg-brand-teal/80 z-10 p-8 flex flex-col justify-end transition-all duration-500 opacity-0 group-hover:opacity-100">
            <div className="relative z-10 space-y-4">
              <div className="space-y-1">
                <span className="text-white font-black text-[9px] uppercase tracking-[0.4em] border-b border-white/30 pb-1 w-fit block">
                  {video.season}
                </span>
                <h4 className="text-2xl font-black text-white uppercase tracking-tighter leading-[0.9]">
                  {video.title}
                </h4>
              </div>
              <div className="flex items-center gap-3 text-[9px] font-black text-white uppercase tracking-[0.4em]">
                REPRODUCIR <ArrowUpRight size={14} />
              </div>
            </div>
          </div>
        )}

        {video.isPlaceholder && (
          <div className="absolute inset-0 z-[15] bg-brand-black/40 backdrop-blur-[2px] flex items-center justify-center">
             <span className="text-[9px] font-black uppercase tracking-[0.4em] text-white/80">PRODUCCIÓN EN CURSO</span>
          </div>
        )}
        
        <div className={cn(
          "absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center transition-all",
          video.isPlaceholder 
            ? "bg-brand-teal text-white" 
            : "bg-white text-brand-teal shadow-2xl group-hover:scale-110 group-hover:bg-brand-teal group-hover:text-white"
        )}>
           {video.isPlaceholder ? <Sparkles size={18} /> : <Play size={18} className="fill-current ml-0.5" />}
        </div>
      </div>
      <div className="space-y-3">
         <div className="flex items-center gap-2">
           <Badge className={cn(
             "text-white text-[7px] font-black uppercase px-2 py-0.5 rounded-none",
             video.isPlaceholder ? "bg-brand-gold" : "bg-brand-teal"
           )}>
             {video.season}
           </Badge>
         </div>
         <span className="text-white font-black text-[10px] uppercase tracking-[0.3em] block leading-tight">{video.title}</span>
         <p className="text-white/40 text-[11px] font-medium leading-relaxed line-clamp-2">
           {video.description}
         </p>
      </div>
    </div>
  );
}
