
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { BrandStrip } from '@/components/BrandStrip';
import { RevealSection } from '@/components/RevealSection';
import { Badge } from '@/components/ui/badge';
import { 
  RotateCw, CheckCircle2, Trophy, ChevronLeft, ChevronRight,
  ExternalLink, Play, Mic, FileText, MapPin, Sparkles, Music,
  BookOpen, Smartphone, RefreshCcw
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useSoundEffects } from '@/hooks/use-sound-effects';

const triviaData = [
  {
    id: 1,
    category: "HISTORIA",
    question: "¿SABES CUÁNDO NACIÓ EL SEMANARIO HOY?",
    answer: "El 10 de octubre de 1990. Un grupo de periodistas populares decidió crear un medio que diera voz a los barrios del centro de Medellín.",
    link: "/mediateca",
    linkText: "ESCUCHAR PODCAST EP.1",
    icon: Mic,
    color: "bg-brand-red"
  },
  {
    id: 2,
    category: "UBICACIÓN",
    question: "¿SABES DÓNDE SE IMPRIMÍA LA HOJITA AMARILLA?",
    answer: "En la mítica calle Ayacucho. Allí se gestaron más de 200 ediciones que hoy son patrimonio documental de la ciudad.",
    link: "/mapa",
    linkText: "VER RUTA DE LA MEMORIA",
    icon: MapPin,
    color: "bg-brand-teal"
  },
  {
    id: 3,
    category: "CULTURA",
    question: "¿SABES CUÁNTAS SALAS CONCERTADAS HABÍA EN LOS 90?",
    answer: "Más de 50 salas. El Semanario servía como el tejido conector de toda esa efervescencia artística impresa.",
    link: "/mediateca",
    linkText: "ESCUCHAR PODCAST EP.4",
    icon: Mic,
    color: "bg-brand-gold"
  },
  {
    id: 4,
    category: "ARCHIVO",
    question: "¿SABES CUÁL FUE EL PRIMER GRAN HITO CUBIERTO?",
    answer: "La inauguración del Corredor Cultural del Centro, visibilizando espacios como el Palacio de Bellas Artes como ejes de resistencia.",
    link: "/archivo",
    linkText: "VER ARCHIVO VIVO",
    icon: FileText,
    color: "bg-brand-purple"
  },
  {
    id: 5,
    category: "LEGADO",
    question: "¿SABÍAS QUE NACIERON COLECTIVOS EN NUESTRAS PÁGINAS?",
    answer: "¡Sí! Muchas de las organizaciones que hoy lideran el centro tienen sus raíces en las redes comunitarias que documentamos hace 30 años.",
    link: "/mediateca",
    linkText: "VER CORTOMETRAJES",
    icon: Play,
    color: "bg-brand-red"
  },
  {
    id: 6,
    category: "POLÍTICA",
    question: "¿SABES QUÉ ANTICIPÓ EL SEMANARIO SOBRE EL CENTRO?",
    answer: "El Centro como Distrito Creativo, una realidad que hoy es política pública pero que nosotros ya narrábamos en los 90.",
    link: "/mediateca",
    linkText: "LEER TEXTO E-BOOK",
    icon: BookOpen,
    color: "bg-brand-teal"
  },
  {
    id: 7,
    category: "POESÍA",
    question: "¿SABÍAS QUE PUBLICÁBAMOS LITERATURA EN EL PERIÓDICO?",
    answer: "Constantemente. Era nuestra forma de resistir a la violencia con la palabra creativa de los artistas locales.",
    link: "/mediateca",
    linkText: "VER REELS",
    icon: Smartphone,
    color: "bg-brand-gold"
  },
  {
    id: 8,
    category: "TÉCNICA",
    question: "¿SABES CÓMO SE IMPRIMÍO EL PRIMER NÚMERO?",
    answer: "En mimeógrafo. Los primeros 500 ejemplares fueron hechos con una mística artesanal que hoy conservamos digitalmente.",
    link: "/archivo",
    linkText: "VER EDICIÓN No. 1",
    icon: FileText,
    color: "bg-brand-purple"
  },
  {
    id: 9,
    category: "SONORIDAD",
    question: "¿SABÍAS QUE EL PROYECTO TIENE MÚSICA ORIGINAL?",
    answer: "Cinco piezas únicas (Raíz, Tejido, Encuentro, Memoria Viva y Geografía) definen nuestra identidad transmedia actual.",
    link: "/mediateca",
    linkText: "ESCUCHAR SONORIDADES",
    icon: Music,
    color: "bg-brand-red"
  }
];

function TriviaStep({ 
  item, 
  isDiscovered, 
  onDiscover 
}: { 
  item: typeof triviaData[0], 
  isDiscovered: boolean, 
  onDiscover: () => void 
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const { playClick, playHover, playTransition } = useSoundEffects();

  const handleFlip = () => {
    playTransition();
    setIsFlipped(!isFlipped);
    if (!isDiscovered) onDiscover();
  };

  useEffect(() => {
    setIsFlipped(false);
  }, [item.id]);

  return (
    <div 
      className="w-full max-w-[340px] md:max-w-[460px] mx-auto h-[550px] [perspective:2000px] cursor-pointer" 
      onClick={handleFlip}
      onMouseEnter={playHover}
    >
      <div className={cn(
        "relative h-full w-full transition-all duration-[800ms] [transform-style:preserve-3d] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.4)] bg-white rounded-none border-[1px] border-muted/20",
        isFlipped ? "[transform:rotateY(180deg)]" : ""
      )}>
        <div className="absolute inset-0 h-full w-full bg-white [backface-visibility:hidden] p-6 md:p-10 flex flex-col items-center">
          <div className={cn("text-white font-black px-10 py-2.5 rounded-none text-[10px] tracking-[0.4em] uppercase z-10", item.color)}>
            {item.category}
          </div>

          <div className="flex-1 flex flex-col items-center justify-center w-full space-y-10">
            <div className={cn("w-20 h-20 rounded-full flex items-center justify-center text-white shadow-2xl", item.color)}>
              <item.icon size={32} />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-brand-black tracking-tighter leading-[0.9] uppercase px-2 text-center">
              {item.question}
            </h3>
          </div>

          <div className="pt-6 w-full flex flex-col items-center gap-4">
            <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">
              <RotateCw size={14} /> TOCAR PARA REVELAR
            </div>
            <div className="flex gap-2">
              <div className="w-2 h-2 bg-brand-gold/20 rounded-full"></div>
              <div className="w-2 h-2 bg-brand-gold/40 rounded-full"></div>
              <div className="w-2 h-2 bg-brand-gold/60 rounded-full"></div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 h-full w-full bg-[#1A1A1A] text-white [backface-visibility:hidden] [transform:rotateY(180deg)] p-6 md:p-10 flex flex-col items-center">
          <div className="w-full flex flex-col items-center shrink-0">
            <span className="text-brand-gold font-black text-[11px] uppercase tracking-[0.6em] block mb-4">FRAGMENTO REVELADO</span>
            <div className="w-20 h-1 bg-brand-gold mb-8"></div>
          </div>

          <div className="flex-1 flex items-center justify-center w-full">
            <p className="text-lg md:text-xl lg:text-2xl font-bold leading-tight italic text-white/95 normal-case px-2 text-center">
              "{item.answer}"
            </p>
          </div>

          <div className="w-full space-y-8 pt-8 shrink-0">
            <a 
              href={item.link} 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-4 bg-white text-brand-black px-8 py-5 font-black uppercase text-[11px] tracking-[0.3em] hover:bg-brand-gold transition-all shadow-2xl w-full rounded-none"
              onClick={(e) => {
                e.stopPropagation();
                playClick();
              }}
              onMouseEnter={playHover}
            >
              {item.linkText} <ExternalLink size={16} />
            </a>
            <button 
              className="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 hover:opacity-100 transition-opacity flex items-center gap-3 mx-auto"
              onMouseEnter={playHover}
            >
              <RotateCw size={14} /> VOLVER A PREGUNTA
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SabiasQuePage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [discovered, setDiscovered] = useState<Set<number>>(new Set());
  const [hasMounted, setHasMounted] = useState(false);
  const { playClick, playHover, playTransition } = useSoundEffects();
  
  const bgBridge = "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/img_botones/03%20PUENTE.png";

  useEffect(() => {
    setHasMounted(true);
    const saved = localStorage.getItem('sh_fragments_discovered');
    if (saved) {
      try {
        const ids = JSON.parse(saved);
        setDiscovered(new Set(ids));
      } catch (e) {
        console.error("Error loading progress", e);
      }
    }
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('sh_fragments_discovered', JSON.stringify(Array.from(discovered)));
    }
  }, [discovered, hasMounted]);

  const handleDiscover = (id: number) => {
    setDiscovered(prev => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const resetMission = () => {
    playClick();
    if (confirm("¿Seguro que quieres reiniciar tu progreso de exploración?")) {
      setDiscovered(new Set());
      setCurrentIndex(0);
    }
  };

  const nextCard = () => {
    playTransition();
    if (currentIndex < triviaData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevCard = () => {
    playTransition();
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const progressValue = (discovered.size / triviaData.length) * 100;
  const currentItem = triviaData[currentIndex];

  if (!hasMounted) return null;

  return (
    <main className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      <Navbar />
      
      <div className="pt-32 pb-10 bg-white border-b border-brand-black/5 shrink-0">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
            <RevealSection className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <Badge className="bg-brand-red text-white px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.4em] border-none shadow-md">
                  GAMIFICACIÓN • MEMORIA HOY
                </Badge>
                <div className="flex items-center gap-3 text-brand-gold font-black text-[11px] uppercase tracking-[0.3em]">
                  <Trophy size={20} className="text-brand-red" /> {discovered.size} DE {triviaData.length} FRAGMENTOS
                </div>
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-brand-black tracking-tighter leading-[0.8] uppercase">
                ¿SABÍAS <br />
                <span className="text-brand-red">QUÉ...?</span>
              </h1>
              <p className="mt-6 text-xl text-brand-black/60 font-medium max-w-2xl leading-relaxed border-l-[16px] border-brand-red pl-10 italic">
                Aquí puedes explorar los secretos del Centro en orden secuencial. Descubre cada fragmento para completar el archivo de curiosidades y memoria urbana.
              </p>
            </RevealSection>

            <div className="w-full md:w-80 space-y-4">
              <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-[0.4em] text-brand-black/40">
                <div className="flex items-center gap-2">
                  <span>AVANCE DE MISIÓN</span>
                  <span className="text-brand-red">{Math.round(progressValue)}%</span>
                </div>
                {discovered.size > 0 && (
                  <button 
                    onClick={resetMission}
                    onMouseEnter={playHover}
                    className="flex items-center gap-1 hover:text-brand-red transition-colors"
                    title="Reiniciar Progreso"
                  >
                    <RefreshCcw size={12} /> REINICIAR
                  </button>
                )}
              </div>
              <div className="h-2 bg-muted/20 rounded-none overflow-hidden border border-brand-black/5">
                 <div 
                   className="h-full bg-brand-red transition-all duration-1000 ease-out" 
                   style={{ width: `${progressValue}%` }}
                 />
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="relative flex-grow flex items-center bg-[#d49529] overflow-hidden min-h-[700px] py-12">
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <div className="absolute inset-0 opacity-100">
            <Image src={bgBridge} alt="" fill className="object-cover object-center" priority />
          </div>
          <div className="absolute inset-0 bg-[#d49529]/80" />
          
          <div className="absolute top-20 left-10 text-[120px] lg:text-[160px] font-black text-black/[0.08] tracking-tighter leading-none whitespace-nowrap">FRAGMENTOS DE MEMORIA</div>
          <div className="absolute bottom-40 right-[-5%] text-[140px] lg:text-[200px] font-black text-black/[0.08] tracking-tighter leading-none whitespace-nowrap">EL PUENTE // 2026</div>
        </div>

        <div className="container mx-auto px-6 relative z-10 h-full flex flex-col justify-center">
          <div className="flex flex-col items-center gap-10 md:gap-14">
            
            <div className="flex items-center justify-center gap-4 md:gap-16 w-full">
              <button 
                onClick={prevCard} 
                onMouseEnter={playHover}
                disabled={currentIndex === 0}
                className="hidden md:flex w-16 h-16 items-center justify-center bg-white shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-brand-black hover:text-white disabled:opacity-10 transition-all group shrink-0 rounded-none"
              >
                <ChevronLeft size={32} strokeWidth={3} className="group-hover:-translate-x-1 transition-transform text-black group-hover:text-white" />
              </button>

              <div className="flex-1 w-full max-w-[340px] md:max-w-[460px]">
                <RevealSection key={currentIndex} threshold={0.01}>
                  <TriviaStep 
                    item={currentItem} 
                    isDiscovered={discovered.has(currentItem.id)}
                    onDiscover={() => handleDiscover(currentItem.id)}
                  />
                </RevealSection>
              </div>

              <button 
                onClick={nextCard} 
                onMouseEnter={playHover}
                disabled={currentIndex === triviaData.length - 1}
                className="hidden md:flex w-16 h-16 items-center justify-center bg-white shadow-[0_20px_40px_rgba(0,0,0,0.2)] hover:bg-brand-black hover:text-white disabled:opacity-10 transition-all group shrink-0 rounded-none"
              >
                <ChevronRight size={32} strokeWidth={3} className="group-hover:translate-x-1 transition-transform text-black group-hover:text-white" />
              </button>
            </div>

            <div className="flex flex-col items-center gap-8 w-full shrink-0">
              <div className="flex items-center gap-8 md:hidden">
                <Button onMouseEnter={playHover} onClick={prevCard} disabled={currentIndex === 0} variant="outline" className="w-16 h-16 rounded-none border-none bg-white shadow-2xl text-black"><ChevronLeft size={24} /></Button>
                <Button onMouseEnter={playHover} onClick={nextCard} disabled={currentIndex === triviaData.length - 1} variant="outline" className="w-16 h-16 rounded-none border-none bg-white shadow-2xl text-black"><ChevronRight size={24} /></Button>
              </div>

              <div className="flex items-center gap-3">
                {triviaData.map((_, idx) => (
                  <button
                    key={idx}
                    onMouseEnter={playHover}
                    onClick={() => {
                      playTransition();
                      setCurrentIndex(idx);
                    }}
                    className={cn(
                      "h-2 transition-all duration-700",
                      currentIndex === idx ? "w-12 bg-white shadow-lg" : "w-3 bg-white/30 hover:bg-white/50"
                    )}
                  />
                ))}
              </div>

              <div className="bg-brand-black text-white px-10 py-3 font-black uppercase text-[10px] tracking-[0.5em] shadow-2xl">
                FRAGMENTO {currentIndex + 1} DE {triviaData.length}
              </div>
            </div>
          </div>
        </div>
      </section>

      {discovered.size === triviaData.length && (
        <div className="container mx-auto px-6 py-20 shrink-0">
          <div className="animate-in fade-in zoom-in-95 slide-in-from-bottom-10 duration-1000">
            <div className="bg-brand-purple p-10 md:p-20 text-center shadow-[40px_40px_0px_0px_rgba(125,81,143,0.15)] border border-white/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 -translate-y-1/2 translate-x-1/2 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-gold/10 -translate-x-1/2 translate-y-1/2 rounded-full blur-2xl"></div>
              
              <div className="relative z-10 space-y-10">
                <div className="w-20 h-20 bg-brand-gold text-brand-purple rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                  <CheckCircle2 size={40} strokeWidth={3} />
                </div>
                
                <div className="space-y-6">
                  <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none">¡ARCHIVO COMPLETO!</h2>
                  <p className="text-xl md:text-2xl font-bold max-w-3xl mx-auto text-white/90 leading-tight italic normal-case text-center">
                    Has recolectado todos los fragmentos de curiosidad histórica. Ahora posees el contexto necesario para vivir la experiencia transmedia total.
                  </p>
                </div>

                <div className="pt-6">
                  <Link 
                    href="/mediateca" 
                    onMouseEnter={playHover}
                    onClick={playClick}
                    className="inline-flex items-center gap-6 bg-white text-brand-purple px-14 py-6 font-black uppercase text-[13px] tracking-[0.5em] hover:bg-brand-black hover:text-white transition-all shadow-2xl rounded-none border-2 border-white group"
                  >
                    IR A LA MEDIATECA <Sparkles size={20} className="group-hover:rotate-12 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <BrandStrip />
    </main>
  );
}
