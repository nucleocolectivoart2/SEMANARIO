
"use client";

import React, { useMemo, useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { 
  ArrowUpRight, Play, Globe, History, Users
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';
import { BrandStrip } from '@/components/BrandStrip';
import { RevealSection } from '@/components/RevealSection';
import { useSoundEffects } from '@/hooks/use-sound-effects';

// Lista oficial de IDs de YouTube del registro para el fondo aleatorio
const BACKGROUND_VIDEOS = [
  'FaGMpv2db_M', 'lrrYQthosl8', 'l530ZiOZjQk', 'YaLSyFGmT5Y', 
  'vgiHCjG4OzY', 'jaS5sXS67Xc', 'KdFvqG0qUlQ', 'zMFHJfp6st4', 
  '3nwMCxiW57E', 'l1nhyWNDgp0', 'D_7TBSnII94'
];

export function HomeHero() {
  const [currentVideoId, setCurrentVideoId] = useState<string | null>(null);
  const heroFallback = PlaceHolderImages.find(img => img.id === 'hero-center');
  const { playClick, playHover } = useSoundEffects();

  useEffect(() => {
    const randomId = BACKGROUND_VIDEOS[Math.floor(Math.random() * BACKGROUND_VIDEOS.length)];
    setCurrentVideoId(randomId);
  }, []);

  return (
    <section className="relative h-screen w-full bg-brand-black overflow-hidden flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-50">
        {currentVideoId ? (
          <iframe
            className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 scale-110"
            src={`https://www.youtube.com/embed/${currentVideoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${currentVideoId}&rel=0&showinfo=0&iv_load_policy=3&modestbranding=1`}
            allow="autoplay; encrypted-media"
            frameBorder="0"
          ></iframe>
        ) : heroFallback && (
          <Image 
            src={heroFallback.imageUrl} 
            alt="El Semanario HOY" 
            fill 
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/40 via-transparent to-brand-black/80 z-10" />
      </div>

      <div className="container mx-auto px-6 relative z-20 text-center flex flex-col h-full items-center">
        <div className="flex-[1.5]" />

        <RevealSection className="space-y-0 flex flex-col items-center w-full max-w-[95vw]">
          <h1 className="flex flex-col items-center select-none font-black uppercase tracking-tighter leading-[0.85] text-[54px] xs:text-[64px] sm:text-[80px] md:text-[115px] lg:text-[140px]">
            <span className="text-white">EL</span>
            <span className="text-white">SEMANARIO</span>
            <span className="text-brand-gold">HOY</span>
          </h1>
        </RevealSection>

        <div className="flex-1 flex items-center justify-center w-full">
          <RevealSection delay={400} className="w-full flex justify-center">
            <div className="flex items-center gap-4 md:gap-6 w-full max-w-2xl px-4">
              <div className="h-[1px] flex-1 bg-brand-gold/40"></div>
              <p className="text-brand-gold font-black text-[8px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] whitespace-nowrap">
                ARCHIVO VIVO • MEDELLÍN
              </p>
              <div className="h-[1px] flex-1 bg-brand-gold/40"></div>
            </div>
          </RevealSection>
        </div>

        <div className="h-[280px] md:h-[140px] shrink-0" />

        <div className="absolute bottom-0 left-0 right-0 grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-white/10 bg-brand-black/40 backdrop-blur-2xl">
          <Link 
            href="/historia" 
            onMouseEnter={playHover}
            onClick={playClick}
            className="group border-b md:border-b-0 md:border-r border-white/10 p-5 md:p-10 hover:bg-brand-gold transition-all duration-700 text-left"
          >
            <div className="relative z-10">
              <span className="block text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-1 md:mb-2 text-white/50 group-hover:text-brand-black transition-colors">CONOCE NUESTRA</span>
              <h3 className="text-lg md:text-2xl font-black uppercase tracking-tighter flex items-center gap-3 text-white group-hover:text-brand-black transition-colors">
                HISTORIA <ArrowUpRight size={18} className="opacity-30 group-hover:opacity-100" />
              </h3>
            </div>
          </Link>
          <Link 
            href="/archivo" 
            onMouseEnter={playHover}
            onClick={playClick}
            className="group border-b md:border-b-0 md:border-r border-white/10 p-5 md:p-10 hover:bg-brand-teal transition-all duration-700 text-left"
          >
            <div className="relative z-10">
              <span className="block text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-1 md:mb-2 text-white/50 group-hover:text-white transition-colors">EXPLORA EL</span>
              <h3 className="text-lg md:text-2xl font-black uppercase tracking-tighter flex items-center gap-3 text-white group-hover:text-white transition-colors">
                ARCHIVO <ArrowUpRight size={18} className="opacity-30 group-hover:opacity-100" />
              </h3>
            </div>
          </Link>
          <Link 
            href="/mediateca" 
            onMouseEnter={playHover}
            onClick={playClick}
            className="group p-5 md:p-10 hover:bg-brand-red transition-all duration-700 text-left"
          >
            <div className="relative z-10">
              <span className="block text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-1 md:mb-2 text-white/50 group-hover:text-white transition-colors">DESCUBRE LA</span>
              <h3 className="text-lg md:text-2xl font-black uppercase tracking-tighter flex items-center gap-3 text-white group-hover:text-white transition-colors">
                MEDIATECA <ArrowUpRight size={18} className="opacity-30 group-hover:opacity-100" />
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function LegacySection() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-center');
  const { playClick, playHover } = useSoundEffects();

  return (
    <section className="relative min-h-screen w-full bg-white overflow-hidden pt-20 md:pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8 z-10">
            <RevealSection>
              <div className="space-y-0">
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.8] text-brand-black tracking-tighter uppercase">
                  MÁS QUE
                </h1>
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.8] text-brand-gold tracking-tighter uppercase">
                  UNA
                </h1>
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.8] text-brand-gold tracking-tighter uppercase">
                  AGENDA,
                </h1>
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black leading-[0.8] text-brand-black tracking-tighter uppercase">
                  UN PUENTE
                </h1>
              </div>
            </RevealSection>

            <RevealSection delay={300} className="pt-8 md:pt-12">
              <div className="flex gap-4 md:gap-6 items-start">
                <div className="w-2 md:w-3 h-16 md:h-20 bg-brand-teal shrink-0 mt-2" />
                <p className="text-2xl md:text-4xl font-black tracking-tighter text-brand-black leading-[0.9] max-w-xl">
                  El Semanario Hoy quiere <br />
                  <span className="text-brand-teal">conectarte con la escena cultural actual</span>
                </p>
              </div>
              <p className="mt-8 text-lg md:text-xl font-bold italic text-brand-black/70 max-w-xl normal-case leading-relaxed">
                "Conectar a diversas generaciones con las múltiples apuestas estéticas y miradas del mundo que los artistas ofrecen"
              </p>
              
              <Badge className="mt-10 bg-brand-gold text-brand-black px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.3em] border-none shadow-lg w-fit block">
                Archivos que documentan una época.<br />
                SEMANARIO CULTURAL
              </Badge>
            </RevealSection>
          </div>

          <div className="lg:col-span-5 relative group">
            <RevealSection delay={500} className="relative">
              <div className="relative aspect-[4/5] w-full bg-muted shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] md:shadow-[40px_40px_0px_0px_rgba(0,0,0,0.05)] overflow-hidden border-4 border-brand-black">
                {heroImage && (
                  <Image 
                    src={heroImage.imageUrl} 
                    alt="Archivo Vivo Medellín" 
                    fill 
                    className="object-cover transition-transform duration-[20s] group-hover:scale-110"
                    priority
                  />
                )}
                <div className="absolute inset-0 bg-brand-black/5 mix-blend-multiply pointer-events-none" />
              </div>
              
              <div 
                onMouseEnter={playHover}
                onClick={playClick}
                className="absolute -bottom-6 -right-4 md:-bottom-10 md:-right-10 w-32 h-32 md:w-44 md:h-44 bg-brand-gold flex items-center justify-center p-6 md:p-8 text-brand-black font-black text-xs md:text-base uppercase tracking-widest text-center leading-none z-20 shadow-2xl transition-transform group-hover:scale-105 cursor-pointer"
              >
                ARCHIVO <br /> VIVO <br /> MEDELLÍN
              </div>
            </RevealSection>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { playClick, playHover } = useSoundEffects();

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <HomeHero />
      <LegacySection />
      
      <section className="py-20 md:py-32 bg-brand-black text-white border-t-8 border-brand-gold">
        <div className="container mx-auto px-6">
          <RevealSection className="text-center mb-16 md:mb-24">
            <Badge className="bg-brand-teal text-white px-6 py-2 rounded-none text-[10px] md:text-[11px] font-black uppercase tracking-[0.5em] mb-8 md:mb-10">
              EXPANSIÓN NARRATIVA
            </Badge>
            <h2 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.8]">
              NUESTRO UNIVERSO <br /> <span className="text-brand-gold">TRANSMEDIA</span>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-white/10">
            {[
              { 
                title: "ARCHIVO VIVO", 
                desc: "Repositorio digital de ediciones históricas del Semanario Hoy (1990-2003).",
                icon: History,
                href: "/archivo",
                imgId: "archive-photo"
              },
              { 
                title: "VOCES DEL CENTRO", 
                desc: "5 episodios de podcast que reconstruyen el tejido cultural de la ciudad.",
                icon: Users,
                href: "/mediateca",
                imgId: "team-maria"
              },
              { 
                title: "RESONANCIA VIDEO", 
                desc: "3 cortometrajes documentales sobre organizaciones que resisten hoy.",
                icon: Play,
                href: "/mediateca",
                imgId: "multimedia-video"
              },
              { 
                title: "RUTA MEMORIA", 
                desc: "Mapa interactivo con hotspots de hitos históricos y culturales.",
                icon: Globe,
                href: "/mapa",
                imgId: "cultural-event"
              }
            ].map((item, idx) => (
              <Link 
                key={idx} 
                href={item.href} 
                onMouseEnter={playHover}
                onClick={playClick}
                className="relative p-8 md:p-12 border-white/10 hover:bg-brand-gold/5 transition-all duration-500 group flex flex-col h-full border-b md:border-b-0 md:border-r last:border-r-0 overflow-hidden"
              >
                <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 grayscale">
                  <Image 
                    src={PlaceHolderImages.find(img => img.id === item.imgId)?.imageUrl || ''}
                    alt="" fill className="object-cover"
                  />
                </div>
                <div className="relative z-10 flex flex-col h-full">
                  <item.icon className="w-10 h-10 md:w-14 md:h-14 text-brand-gold mb-8 md:mb-10 group-hover:scale-110 transition-transform duration-500" />
                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter mb-4 md:mb-6 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                  <p className="text-white/40 text-xs md:text-[13px] font-medium leading-relaxed flex-grow">{item.desc}</p>
                  <div className="mt-8 md:mt-10 flex items-center gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em]">
                    EXPLORAR <ArrowUpRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BrandStrip />
    </main>
  );
}
