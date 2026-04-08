
"use client";

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BrandStrip } from '@/components/BrandStrip';
import { Badge } from '@/components/ui/badge';
import { 
  History, Heart, Globe, Star, Zap, Sparkles, 
  Target, Eye, Quote, ArrowRight, ShieldCheck, 
  Share2, MapPin, Users, CheckCircle, Code
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RevealSection } from '@/components/RevealSection';

export default function NosotrosPage() {
  const [scrollY, setScrollY] = useState(0);
  const nosotrosHistoryImg = PlaceHolderImages.find(img => img.id === 'nosotros-secondary');
  const imgMaria = PlaceHolderImages.find(img => img.id === 'team-maria');
  const imgCarlos = PlaceHolderImages.find(img => img.id === 'team-carlos');
  const imgCecilia = PlaceHolderImages.find(img => img.id === 'team-cecilia');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white overflow-x-hidden text-brand-black">
      <Navbar />
      
      {/* SECCIÓN HERO EDITORIAL — ALGO DE HISTORIA */}
      <section className="pt-32 md:pt-44 pb-20 relative border-b border-muted">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
            <div className="lg:col-span-7 space-y-12">
              <RevealSection className="flex flex-col gap-10">
                <Badge className="bg-brand-gold text-brand-black px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.5em] w-fit shadow-lg">
                  TRAYECTORIA • SEMANARIO HOY
                </Badge>
                
                <div className="space-y-0">
                  <h1 className="text-6xl md:text-8xl font-black leading-[0.8] text-brand-black tracking-tighter uppercase">
                    ALGO DE
                  </h1>
                  <h1 className="text-6xl md:text-8xl font-black leading-[0.8] text-brand-gold tracking-tighter uppercase">
                    HISTORIA
                  </h1>
                </div>
              </RevealSection>

              <RevealSection delay={200} className="space-y-6 border-l-[16px] border-brand-teal pl-8">
                <Badge className="bg-brand-black text-white px-4 py-1 rounded-none text-[9px] font-black uppercase tracking-[0.3em] w-fit mb-2">
                  Qué queremos
                </Badge>
                <p className="text-2xl md:text-3xl font-bold text-brand-black leading-tight tracking-tight normal-case italic">
                  "Conectar a diversas generaciones con las múltiples apuestas estéticas y miradas del mundo que los artistas ofrecen"
                </p>
                <span className="text-brand-gold font-black text-[11px] uppercase tracking-[0.5em] block">
                  MEMORIA CULTURAL VIVA
                </span>
              </RevealSection>

              <RevealSection delay={400} className="space-y-8 text-lg md:text-xl text-brand-black/70 font-medium leading-relaxed">
                <div className="space-y-6">
                  <p>
                    El Semanario Cultural funcionó entre febrero de 1990 y diciembre de 2000 como una agenda semanal aliada de artistas y gestores en Medellín. Fue pionero en ofrecer información fidedigna sobre el acontecer académico y artístico, brindando espacios de reflexión frente al complejo contexto social de la época.
                  </p>
                  <p>
                    Conocido popularmente como <span className="text-brand-black font-bold">"La hojita amarilla"</span>, se distribuía gratuitamente en teatros, librerías, museos y centros culturales. En 1993 y 1994, el equipo editó las revistas "Semanuario", balances anuales del arte en la ciudad.
                  </p>
                  <p>
                    Hoy, el proyecto retorna bajo el concepto de <span className="text-brand-teal font-bold">"Sociedad 5.0"</span>, uniendo experiencia previa con nuevas tecnologías y visiones generacionales, para ser un puente entre la movida cultural nacional, sus artistas y públicos.
                  </p>
                </div>
              </RevealSection>
            </div>

            <div className="lg:col-span-5 relative group lg:-mt-6">
              <RevealSection delay={400} className="relative">
                <div className="relative aspect-[4/5] w-full bg-muted overflow-hidden shadow-2xl border-4 border-brand-black">
                  {nosotrosHistoryImg && (
                    <Image 
                      src={nosotrosHistoryImg.imageUrl} 
                      alt={nosotrosHistoryImg.description} 
                      fill 
                      className="object-cover transition-transform duration-[15s] ease-in-out group-hover:scale-110"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-brand-black/5 mix-blend-multiply pointer-events-none" />
                </div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-brand-teal flex items-center justify-center p-8 text-white font-black text-sm uppercase tracking-widest text-center leading-none z-10 hidden sm:flex shadow-[20px_20px_0px_0px_rgba(255,255,255,0.05)] transition-transform group-hover:scale-105">
                  MEMORIA <br /> URBANA
                </div>
              </RevealSection>
            </div>
          </div>

          {/* PILARES INSTITUCIONALES */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mb-32 bg-white border-4 border-brand-black shadow-2xl">
            {[
              { 
                label: "DIFERENCIADOR", 
                value: "Especialización Digital", 
                desc: "Nuestra plataforma trasciende el papel. Gracias a una estructura flexible, ofrecemos un acceso directo a contenidos exclusivos y seleccionados de la ciudad, garantizando una experiencia de consulta ágil y adaptada a las nuevas audiencias.",
                color: "bg-brand-gold/5", 
                accent: "bg-brand-gold" 
              },
              { 
                label: "VALOR", 
                value: "Memoria Viva", 
                desc: "Somos un registro de memoria cultural de la ciudad por excelencia. Revivimos nuestro archivo para dar contexto al presente, consolidando un espacio de información veraz y contrastada de una época, la década de los 90, en Medellín.",
                color: "bg-brand-teal/5", 
                accent: "bg-brand-teal" 
              },
              { 
                label: "PROYECCIÓN", 
                value: "Conexión Cultural", 
                desc: "Ser un puente entre diversas generaciones y las apuestas artísticas de hoy. Destacamos los hechos que enriquecen nuestra pluralidad cultural y conectamos a los creadores con una ciudadanía inquieta.",
                color: "bg-brand-red/5", 
                accent: "bg-brand-red" 
              }
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 200} className={cn("p-12 flex flex-col h-full border-r last:border-r-0 border-muted", item.color)}>
                <div className={cn("w-12 h-2 mb-6", item.accent)}></div>
                <span className="block text-[11px] font-black uppercase tracking-[0.4em] mb-4 text-brand-black opacity-40">{item.label}</span>
                <h3 className="text-2xl font-black uppercase text-brand-black tracking-tighter mb-6">{item.value}</h3>
                <p className="text-sm font-medium text-brand-black/70 leading-relaxed">{item.desc}</p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 1 — MEMORIA Y ADN */}
      <section className="py-24 bg-brand-black text-white relative">
        <div className="container mx-auto px-6">
          <RevealSection className="flex flex-col gap-12 mb-20">
            <Badge className="bg-brand-gold text-brand-black px-6 py-1.5 rounded-none text-[10px] font-black uppercase tracking-[0.4em] w-fit">
              BLOQUE 1 — MEMORIA Y ADN
            </Badge>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              LO QUE NOS HIZO <br /> <span className="text-brand-gold">ÚNICOS</span>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border border-white/10">
            {[
              { title: "PROGRAMACIÓN SEMANAL", desc: "En 1990 solo existía la agenda diaria. Permitimos programarse con antelación.", icon: History },
              { title: "VERACIDAD Y CONFIANZA", desc: "Medio veraz por su periodicidad semanal. Un referente de información real.", icon: ShieldCheck },
              { title: "APOYO A LA GESTIÓN", desc: "Artistas y gestores culturales sintieron nuestro apoyo.", icon: Star },
              { title: "FORMACIÓN DE PÚBLICOS", desc: "Pioneros en crear audiencias para la cultura en Medellín.", icon: Users },
              { title: "VERSATILIDAD REAL", desc: "Capacidad de reacción semanal frente a agendas mensuales.", icon: Zap },
              { title: "DISTRIBUCIÓN GRATUITA", desc: "La gente buscaba la 'hojita amarilla' cada lunes en 100 puntos.", icon: Globe },
              { title: "CONEXIÓN EFICIENTE", desc: "El puente directo entre el público y la oferta cultural.", icon: Zap },
              { title: "INCLUSIÓN TOTAL", desc: "Nunca dejamos de publicar la información de ningún artista o grupo.", icon: Sparkles },
              { title: "DIVERSIDAD ABSOLUTA", desc: "Del Mercado de San Alejo a la música de cámara. Todo cabía aquí.", icon: History },
              { title: "RED DE CIUDAD", desc: "100 puntos en museos, bares, teatros, librerías y universidades.", icon: MapPin },
              { title: "PUENTE EMOCIONAL", desc: "Cercanía y empatía real entre creadores y lectores.", icon: Heart }
            ].map((item, idx) => (
              <div key={idx} className="p-10 border-white/10 border hover:bg-brand-gold/5 transition-all group">
                <RevealSection delay={idx * 50}>
                  <item.icon className="w-10 h-10 text-brand-gold mb-8 transition-transform duration-500 group-hover:scale-110" />
                  <h3 className="text-xl font-black uppercase tracking-tighter leading-none mb-6 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                  <p className="text-white/40 text-[13px] font-medium leading-relaxed">{item.desc}</p>
                </RevealSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 2 — DECISIÓN DE ENFOQUE */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <RevealSection className="lg:col-span-7 space-y-12">
              <div className="space-y-6">
                <Badge className="bg-brand-teal text-white px-6 py-1.5 rounded-none text-[10px] font-black uppercase tracking-[0.4em] w-fit">
                  BLOQUE 2 — DECISIÓN DE ENFOQUE
                </Badge>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] text-brand-black">
                  MÁS QUE PRESERVAR, <br /> <span className="text-brand-teal">ACTIVAR EL HOY.</span>
                </h2>
              </div>
              <div className="space-y-8 text-xl font-medium text-brand-black/70 leading-relaxed border-l-[16px] border-brand-teal pl-10">
                <p>
                  Activar la escena cultural actual con diversos formatos y miradas, teniendo como preludio un trabajo de difusión hecho en una época social muy compleja de la ciudad.
                </p>
                <div className="text-brand-black">
                  El Semanario Hoy existe para: <p className="text-brand-teal font-bold normal-case italic">“Conectar a diversas generaciones con las múltiples apuestas estéticas y miradas del mundo que los artistas ofrecen”</p>
                </div>
              </div>
            </RevealSection>

            <RevealSection delay={300} className="lg:col-span-5 grid grid-cols-1 gap-10">
               <div className="p-12 bg-muted/30 border-none group transition-all duration-500 hover:bg-brand-teal/5 border-l-8 border-brand-teal shadow-xl">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-teal mb-6">DIRECCIÓN ESTRATÉGICA</h4>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-brand-black mb-6 group-hover:text-brand-teal transition-colors">EL SEMANARIO ASOCIATIVO</h3>
                  <p className="text-sm font-medium text-brand-black/60 leading-relaxed">
                    En 3 años seremos el referente cultural que conecte a los públicos con una oferta cualificada. Buscamos ser el medio activo donde diversas voces dar cuenta de hechos actuales que repercuten en el presente.
                  </p>
               </div>
               <div className="p-12 bg-brand-gold/10 border-none group transition-all duration-500 hover:bg-brand-gold/20 border-l-8 border-brand-gold shadow-xl">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold mb-6">IDENTIDAD Y TONO</h4>
                  <h3 className="text-2xl font-black uppercase tracking-tighter text-brand-black mb-6 group-hover:text-brand-gold transition-colors">UN MEDIO ACTIVO, NO SOLO ARCHIVO</h3>
                  <p className="text-sm font-medium text-brand-black/60 leading-relaxed">
                    No somos una ticketera, ni una productora, ni una agencia de noticias. Somos un dispositivo de memoria cultural digital organizado, editorialmente crítico y digitalmente ágil.
                  </p>
               </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* SECCIÓN CRÉDITOS — FICHA TÉCNICA */}
      <section className="py-24 bg-muted/20 border-t border-muted">
        <div className="container mx-auto px-6 text-center mb-16">
           <h2 className="text-4xl md:text-5xl font-black tracking-tighter uppercase text-brand-black">EL EQUIPO <span className="text-brand-gold">HOY</span></h2>
        </div>
        <div className="container mx-auto px-6">
          <RevealSection className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16">
              
              <div className="space-y-6 text-center md:text-left">
                <div className="relative aspect-square w-48 mx-auto md:mx-0 bg-muted grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden border-4 border-brand-black shadow-lg">
                   {imgMaria && <Image src={imgMaria.imageUrl} alt={imgMaria.description} fill className="object-cover" />}
                </div>
                <div className="space-y-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold">DIRECCIÓN</span>
                  <h4 className="text-lg font-black uppercase tracking-tighter text-brand-black leading-tight">
                    MARIA VICTORIA ALVAREZ GÓMEZ
                  </h4>
                  <p className="text-[11px] font-medium text-brand-black/50 leading-relaxed italic">
                    "Gestión cultural, arte y memoria en el centro de Medellín."
                  </p>
                </div>
              </div>

              <div className="space-y-6 text-center md:text-left">
                <div className="relative aspect-square w-48 mx-auto md:mx-0 bg-muted grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden border-4 border-brand-black shadow-lg">
                   {imgCarlos && <Image src={imgCarlos.imageUrl} alt={imgCarlos.description} fill className="object-cover" />}
                </div>
                <div className="space-y-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold">REALIZACIÓN AUDIOVISUAL Y EDICIÓN</span>
                  <h4 className="text-lg font-black uppercase tracking-tighter text-brand-black leading-tight">
                    CARLOS ANDRÉS LONDOÑO RUIZ
                  </h4>
                </div>
              </div>

              <div className="space-y-6 text-center md:text-left">
                <div className="relative aspect-square w-48 mx-auto md:mx-0 bg-muted grayscale hover:grayscale-0 transition-all duration-500 overflow-hidden border-4 border-brand-black shadow-lg">
                   {imgCecilia && <Image src={imgCecilia.imageUrl} alt={imgCecilia.description} fill className="object-cover" />}
                </div>
                <div className="space-y-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold">PRODUCCIÓN CREATIVA – AUDIOVISUAL</span>
                  <h4 className="text-lg font-black uppercase tracking-tighter text-brand-black leading-tight">
                    MARÍA CECILIA CASTAÑO RODRÍGUEZ
                  </h4>
                </div>
              </div>

              <div className="space-y-6 text-center md:text-left">
                <div className="relative aspect-square w-48 mx-auto md:mx-0 bg-brand-gold/10 flex items-center justify-center border-4 border-brand-black shadow-lg group hover:bg-brand-gold transition-colors duration-500 overflow-hidden">
                   <div className="relative w-24 h-24">
                      {/* Logo placeholder icon or similar */}
                      <Sparkles size={48} className="text-brand-gold" />
                   </div>
                </div>
                <div className="space-y-4">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-brand-gold">APOYO CREATIVO Y TECNOLÓGICO</span>
                  <h4 className="text-lg font-black uppercase tracking-tighter text-brand-black leading-tight">
                    NÚCLEO COLECTIVO
                  </h4>
                  <p className="text-[11px] font-medium text-brand-black/50 leading-relaxed italic">
                    "Transformación digital y narrativas transmedia para la cultura."
                  </p>
                </div>
              </div>

            </div>
          </RevealSection>
        </div>
      </section>

      <BrandStrip />
    </main>
  );
}
