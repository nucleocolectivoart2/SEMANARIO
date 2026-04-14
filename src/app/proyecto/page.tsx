
"use client";

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { BrandStrip } from '@/components/BrandStrip';
import { RevealSection } from '@/components/RevealSection';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { 
  Network, Mic, Video, Globe, BookOpen, 
  Smartphone, Zap, Cpu, Music, Camera, 
  Layers, ShieldCheck, Mail, Phone, Users,
  History, Target, Heart, MapPin, 
  ExternalLink, ChevronRight, FileText,
  BarChart, Rocket
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ProyectoPage() {
  const logoGaia = "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/Logo-gaia-Color.png";
  const mainImage = PlaceHolderImages.find(img => img.id === 'nosotros-main');

  const teamMembers = [
    { name: "CARLOS LONDOÑO", role: "Realización y creación audiovisual" },
    { name: "MANUEL PALACIO", role: "ESTRUCTURA WEB Y NARRATIVA DIGITAL" },
    { name: "MARIA VICTORIA ALVAREZ", role: "Dirección general y coordinación editorial" },
    { name: "MARÍA CECILIA CASTAÑO", role: "Producción creativa audiovisual" },
    { name: "PAULA ÚSUGA", role: "Investigación y comunicaciones" },
    { name: "ALIANZAS O APOYO", role: "NÚCLEO COLECTIVO Y CORPORACIÓN GAIA" }
  ];

  return (
    <main className="min-h-screen bg-white text-brand-black overflow-x-hidden">
      <Navbar />
      
      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6 max-w-7xl">
          {/* SECCIÓN 0: HEADER — FICHA DEL PROYECTO */}
          <RevealSection className="mb-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-7 flex flex-col gap-10">
                <div className="space-y-6">
                  <Badge className="bg-brand-gold text-brand-black px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.5em] w-fit shadow-lg">
                    FICHA DEL PROYECTO
                  </Badge>
                  
                  {/* BLOQUE NARRATIVO */}
                  <div className="flex gap-6 border-l-[12px] border-brand-teal pl-8 py-2">
                    <div className="space-y-4">
                      <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-brand-black leading-none">
                        SEMANARIO HOY: ARCHIVO VIVO
                      </h2>
                      <p className="text-lg md:text-xl font-bold italic text-brand-black/60 leading-tight normal-case">
                      Una narrativa transmedia que revitaliza el archivo histórico del Semanario Cultural (1990-2000) y lo trae al presente (2026), activando la memoria y cultural de la ciudad y fortaleciendo su identidad.
                      </p>
                    </div>
                  </div>

                  <h1 className="text-6xl md:text-[110px] font-black tracking-tighter leading-[0.8] uppercase mt-10">
                    ARCHIVO <br />
                    <span className="text-brand-gold">VIVO</span>
                  </h1>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                  <div className="border-l-4 border-brand-teal pl-6 space-y-1">
                    <span className="text-[9px] font-black text-brand-teal uppercase tracking-widest">NOMBRE DEL PROYECTO</span>
                    <p className="text-lg font-black uppercase">El Semanario Hoy: Archivo Vivo</p>
                  </div>
                  <a href="https://corporaciongaia.org/" target="_blank" rel="noopener noreferrer" className="border-l-4 border-brand-red pl-6 space-y-1 group hover:bg-brand-red/5 transition-colors">
                    <span className="text-[9px] font-black text-brand-red uppercase tracking-widest flex items-center gap-2">
                      EMPRESA <ExternalLink size={10} />
                    </span>
                    <p className="text-lg font-black uppercase group-hover:text-brand-red transition-colors">Corporación Gaia</p>
                  </a>
                  <div className="col-span-full border-l-4 border-brand-black pl-6 space-y-1">
                    <span className="text-[9px] font-black text-brand-black/40 uppercase tracking-widest">CATEGORÍA</span>
                    <p className="text-base font-bold uppercase">Categoría 3: Desarrollo de Narrativas Transmedia</p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 relative group mt-12 lg:mt-0">
                <div className="relative aspect-[4/5] w-full overflow-hidden border-4 border-brand-black shadow-2xl">
                  {mainImage && (
                    <Image 
                      src={mainImage.imageUrl} 
                      alt="Archivo Vivo Visual" 
                      fill 
                      className="object-cover transition-transform duration-[20s] group-hover:scale-110"
                      priority
                    />
                  )}
                  <div className="absolute inset-0 bg-brand-black/5 mix-blend-multiply pointer-events-none" />
                </div>
                <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 bg-brand-gold p-10 shadow-2xl z-20 max-w-[320px] transition-transform group-hover:scale-105 border-2 border-brand-black">
                  <p className="text-brand-black font-black text-sm uppercase tracking-widest leading-tight">
                    "REVITALIZAR EL ARCHIVO, HACERLO HABLAR CON LAS VOCES DE HOY"
                  </p>
                </div>
              </div>
            </div>
          </RevealSection>

          <div className="space-y-40">
            {/* 1. TEMÁTICA PRINCIPAL */}
            <RevealSection className="space-y-12">
              <div className="flex items-center gap-6 border-b-4 border-brand-black pb-6">
                <History className="text-brand-teal" size={48} />
                <h2 className="text-4xl font-black uppercase tracking-tighter">1. TEMÁTICA PRINCIPAL</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7 space-y-8 text-justify">
                  <p className="text-xl font-bold leading-relaxed text-brand-black">
                    El proyecto “El Semanario Hoy: Archivo Vivo” nace del encuentro entre un archivo histórico fundamental para la memoria cultural de Medellín y la urgencia de pensar el presente desde las narrativas locales.
                  </p>
                  <p className="text-lg font-medium text-brand-black/70 leading-relaxed">
                    El Semanario Cultural fue una agenda cultural publicada entre 1990 y 2000, en plena época en la que Medellín atravesaba por dinámicas violentas, contrarrestadas por procesos comunicativos que buscaron dar voz a los artistas y gestores culturales. Sus más de 450 ediciones son un retrato de una época fundamental de resistencia.
                  </p>
                  <p className="text-lg font-medium text-brand-black/70 leading-relaxed">
                    La temática central es la **memoria cultural como herramienta y fuerza viva**. No se trata de una mirada arqueológica, sino de una apuesta por revitalizar el archivo para activar conversaciones contemporáneas sobre identidad, territorio y futuro.
                  </p>
                </div>
                <div className="lg:col-span-5 bg-brand-teal/5 p-10 border-l-[16px] border-brand-teal space-y-6">
                  <h4 className="text-sm font-black uppercase tracking-widest text-brand-teal">PREGUNTA ESENCIAL</h4>
                  <p className="text-lg font-black italic tracking-tight leading-snug">
                    "¿Cómo la comprensión de estas experiencias de los 90 puede convertirse en una fuerza viva que ayude a imaginar y construir mejores futuros posibles?"
                  </p>
                </div>
              </div>
            </RevealSection>

            {/* 2. CONCEPTO Y SINOPSIS */}
            <RevealSection className="space-y-16">
              <div className="flex items-center gap-6 border-b-4 border-brand-black pb-6">
                <Zap className="text-brand-gold" size={48} />
                <h2 className="text-4xl font-black uppercase tracking-tighter">2. CONCEPTO DEL PROYECTO - SINOPSIS</h2>
              </div>
              
              <p className="text-2xl font-black tracking-tight leading-[0.9] max-w-5xl">
                UN UNIVERSO NARRATIVO TRANSMEDIA QUE ACTIVA LA MEMORIA DE MEDELLÍN ARTICULANDO PASADO Y PRESENTE.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  { 
                    title: "PODCAST: VOCES DE LA CIUDAD", 
                    desc: "Cinco episodios que construyen un recorrido sonoro por el tejido cultural actual, conectando con temas de resistencia y derecho a la ciudad.",
                    icon: Mic,
                    color: "bg-brand-red"
                  },
                  { 
                    title: "RETRATO AUDIOVISUAL", 
                    desc: "Micro documentales sobre organizaciones que  hoy siguen construyendo la identidad cultural de Medellín.",
                    icon: Video,
                    color: "bg-brand-teal"
                  },
                  { 
                    title: "WEB INTERACTIVA", 
                    desc: "Corazón del universo transmedia. Repositorio donde la memoria se explora mediante mapas, gamificación y archivo colaborativo.",
                    icon: Globe,
                    color: "bg-brand-black"
                  },
                  { 
                    title: "E-BOOK DIGITAL", 
                    desc: "PDF interactivo de 10-15 páginas. Puerta de entrada para nuevos públicos que contextualiza el valor del archivo de los 90.",
                    icon: BookOpen,
                    color: "bg-brand-purple"
                  },
                  { 
                    title: "PIEZAS SOCIALES", 
                    desc: "5 Reels diseñados para captar atención en Instagram/TikTok. Narrativas rápidas como 'Un día en la vida' o 'Manos que crean'.",
                    icon: Smartphone,
                    color: "bg-brand-gold"
                  }
                ].map((item, i) => (
                  <div key={i} className="border-2 border-brand-black p-8 flex flex-col h-full group hover:bg-muted/5 transition-all">
                    <div className={cn("w-14 h-14 flex items-center justify-center text-white mb-8 shadow-xl", item.color)}>
                      <item.icon size={28} />
                    </div>
                    <h3 className="text-xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
                    <p className="text-sm font-medium text-brand-black/60 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </RevealSection>

            {/* 3. TRATAMIENTO AUDIOVISUAL */}
            <RevealSection className="space-y-16">
              <div className="flex items-center gap-6 border-b-4 border-brand-black pb-6">
                <Cpu className="text-brand-red" size={48} />
                <h2 className="text-4xl font-black uppercase tracking-tighter">3. TRATAMIENTO AUDIOVISUAL</h2>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border-4 border-brand-black">
                <div className="lg:col-span-4 bg-brand-black text-white p-12 space-y-10">
                  <div className="space-y-4">
                    <Badge className="bg-brand-red text-white rounded-none tracking-widest text-[9px]">IMAGEN Y CINE</Badge>
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">ESTÉTICA DE AUTOR</h3>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <Camera className="text-brand-red" size={24} />
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-white/40">CÁMARA</p>
                        <p className="text-sm font-bold">Sony FX30 (APS-C, S-Log3)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Layers className="text-brand-red" size={24} />
                      <div className="space-y-1">
                        <p className="text-[10px] font-black uppercase text-white/40">ÓPTICA</p>
                        <p className="text-sm font-bold">Lentes Anamórficos Sirui 50mm</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-8 p-12 bg-white grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-brand-black">
                      <Music size={32} />
                      <h4 className="font-black text-lg uppercase tracking-tighter">SONIDO Y MÚSICA</h4>
                    </div>
                    <p className="text-sm font-medium leading-relaxed opacity-70 text-justify">
                      Captura en **32 bits flotante** para garantizar cero saturación. La banda sonora es original y generada con **Suno IA**, traduciendo testimonios en piezas emocionales únicas mediante prompts curados.
                    </p>
                  </div>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 text-brand-black">
                      <Zap size={32} />
                      <h4 className="font-black text-lg uppercase tracking-tighter">POSTPRODUCCIÓN</h4>
                    </div>
                    <p className="text-sm font-medium leading-relaxed opacity-70 text-justify">
                      Flujo de trabajo en **DaVinci Resolve**. Look cinematográfico con negros profundos y sombras azul-verde. Motion graphics 2D integrados orgánicamente para potenciar la narrativa.
                    </p>
                  </div>
                </div>
              </div>
            </RevealSection>

            {/* 4. ESTRUCTURA NARRATIVA */}
            <RevealSection className="space-y-12">
              <div className="flex items-center gap-6 border-b-4 border-brand-black pb-6">
                <Network className="text-brand-purple" size={48} />
                <h2 className="text-4xl font-black uppercase tracking-tighter">4. ESTRUCTURA NARRATIVA</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {[
                  { 
                    t: "EL ARCHIVO MOTOR", 
                    d: "El Semanario no es un repositorio, es un personaje colectivo que atraviesa toda la experiencia planteando preguntas al presente.",
                    i: FileText
                  },
                  { 
                    t: "DIÁLOGOS GENERACIONALES", 
                    d: "Encuentro entre fundadores de los 90, organizaciones actuales y públicos diversos para construir memoria colectiva.",
                    i: Users
                  },
                  { 
                    t: "TERRITORIO CENTRO", 
                    d: "La geografía es el centro de Medellín: calles, plazas y edificios patrimoniales actuando como testigos y escenarios activos.",
                    i: MapPin
                  }
                ].map((item, i) => (
                  <div key={i} className="space-y-6 border-t-2 border-brand-purple pt-8">
                    <item.i className="text-brand-purple" size={32} />
                    <h4 className="font-black text-xl uppercase tracking-tighter">{item.t}</h4>
                    <p className="text-sm font-medium opacity-70 leading-relaxed text-justify">{item.d}</p>
                  </div>
                ))}
              </div>
            </RevealSection>

            {/* EQUIPO DE TRABAJO — DISEÑO SIN RECUADRO */}
            <RevealSection className="space-y-16">
              <div className="flex items-center gap-6 border-b-4 border-brand-black pb-6">
                <Users className="text-brand-teal" size={48} />
                <h2 className="text-4xl font-black uppercase tracking-tighter">EQUIPO DE TRABAJO</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                {teamMembers.map((member, i) => (
                  <div key={i} className="border-l-4 border-brand-gold pl-6 py-1 group hover:border-brand-black transition-colors duration-500">
                    <span className="block text-[10px] font-black text-brand-gold uppercase tracking-[0.2em] mb-2">
                      {member.role}
                    </span>
                    <h4 className="text-xl md:text-2xl font-black uppercase tracking-tight text-brand-black leading-tight">
                      {member.name}
                    </h4>
                  </div>
                ))}
              </div>
            </RevealSection>

            {/* 5. PÚBLICO OBJETIVO */}
            <RevealSection className="space-y-12">
              <div className="flex items-center gap-6 border-b-4 border-brand-black pb-6">
                <Target className="text-brand-teal" size={48} />
                <h2 className="text-4xl font-black uppercase tracking-tighter">5. PÚBLICO O AUDIENCIA</h2>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {[
                  { 
                    label: "JÓVENES Y NATIVOS DIGITALES", 
                    text: "Estudiantes, artistas y nuevos creadores interesados en la cultura y la historia. Encuentran en este universo transmedia un lenguaje actual para conectar con el legado de la ciudad.",
                    icon: Smartphone
                  },
                  { 
                    label: "ADULTOS Y PÚBLICO GENERAL", 
                    text: "Ciudadanos que vivieron la época del Semanario y todos aquellos interesados en la memoria urbana. Un puente intergeneracional diseñado para ser accesible y emocionante para todos.",
                    icon: Users
                  },
                  { 
                    label: "ESPECIALIZADO Y AMANTES DEL ARTE", 
                    text: "Investigadores, gestores y público de todas las edades. Material diseñado para todos los públicos que buscan conectar profundamente con el arte, la historia y el patrimonio vivo.",
                    icon: BarChart
                  }
                ].map((p, i) => (
                  <div key={i} className="bg-muted/30 p-10 space-y-6">
                    <p.icon className="text-brand-teal" size={28} />
                    <h4 className="font-black text-lg uppercase tracking-widest leading-tight">{p.label}</h4>
                    <p className="text-sm font-medium opacity-70 leading-relaxed">{p.text}</p>
                  </div>
                ))}
              </div>
            </RevealSection>

            {/* 6 & 7. IMPACTO Y COMERCIALIZACIÓN */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <RevealSection className="space-y-8">
                <div className="flex items-center gap-4 border-b-4 border-brand-black pb-4">
                  <Heart className="text-brand-red" size={32} />
                  <h2 className="text-2xl font-black uppercase tracking-tighter">6. IMPACTO ESPERADO</h2>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "fortalecimiento del tejido social",
                    "Generación de empleo local y visibilidad para organizaciones del centro.",
                    "Revitalización del patrimonio cultural inmaterial de Medellín."
                  ].map((imp, i) => (
                    <div key={i} className="flex gap-4 items-start bg-brand-red/5 p-4 border-l-4 border-brand-red">
                      <Zap size={16} className="text-brand-red mt-1 shrink-0" />
                      <p className="text-sm font-bold uppercase tracking-tight">{imp}</p>
                    </div>
                  ))}
                </div>
              </RevealSection>

              <RevealSection className="space-y-8">
                <div className="flex items-center gap-4 border-b-4 border-brand-black pb-4">
                  <Rocket className="text-brand-gold" size={32} />
                  <h2 className="text-2xl font-black uppercase tracking-tighter">7. COMERCIALIZACIÓN</h2>
                </div>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-black text-xs uppercase tracking-widest text-brand-gold">MONETIZACIÓN</h4>
                    <ul className="grid grid-cols-1 gap-2 text-[11px] font-bold uppercase">
                      <li>• Prestación de servicios de producción transmedia</li>
                      <li>• Talleres de formación en gestión digital de archivos</li>
                      <li>• Venta de E-book impreso y merchandising temático</li>
                      <li>• Campañas de crowdfunding y membresías exclusivas</li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-black text-xs uppercase tracking-widest text-brand-gold">CIRCULACIÓN</h4>
                    <ul className="grid grid-cols-1 gap-2 text-[11px] font-bold uppercase opacity-60">
                      <li>• YouTube, Vimeo, Spotify, Apple Podcasts</li>
                      <li>• Alianzas con salas de cine y centros culturales</li>
                      <li>• Redes de patrimonio y Bibliotecas Nacionales</li>
                    </ul>
                  </div>
                </div>
              </RevealSection>
            </div>

            {/* 8. CUMPLIMIENTO CREA DIGITAL */}
            <RevealSection className="bg-brand-red text-white p-6 md:p-10 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 -translate-y-48 translate-x-48 rounded-full blur-3xl"></div>
              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-6">
                  <ShieldCheck size={32} className="text-white" />
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] opacity-60">DOCUMENTACIÓN TÉCNICA</span>
                    <h2 className="text-xl md:text-3xl font-black uppercase tracking-tighter leading-none">CONVOCATORIA CREA DIGITAL 2026</h2>
                  </div>
                </div>
                <div className="prose prose-invert max-w-none">
                  <p className="text-sm md:text-base font-bold leading-relaxed">
                    Este prototipo constituye el cumplimiento del numeral 3.11 de los Términos de Referencia, funcionando como el eje central del ecosistema narrativo transmedia "Semanario Hoy: Archivo Vivo".
                  </p>
                </div>
                <div className="pt-6 flex flex-wrap gap-6">
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20">
                    <span className="text-[8px] font-black uppercase tracking-widest block mb-1">ENTIDAD EJECUTORA</span>
                    <p className="text-sm font-black uppercase">CORPORACIÓN GAIA</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20">
                    <span className="text-[8px] font-black uppercase tracking-widest block mb-1">ESTADO DEL DESARROLLO</span>
                    <p className="text-sm font-black uppercase text-brand-gold">WEB EN DESARROLLO (ALFA)</p>
                  </div>
                </div>
              </div>
            </RevealSection>
          </div>

          {/* Footer del Proyecto */}
          <div className="mt-40 pt-20 border-t-4 border-brand-black grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="space-y-8">
              <a href="https://corporaciongaia.org/" target="_blank" rel="noopener noreferrer" className="relative block w-48 h-20 transition-transform hover:scale-105">
                <Image src={logoGaia} alt="Logo Corporación GAIA" fill className="object-contain object-left" />
              </a>
              <div className="space-y-2">
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none">CORPORACIÓN GAIA</h3>
                <p className="text-sm font-black uppercase tracking-widest text-brand-black/40">NIT 811.013.237-7</p>
                <p className="text-lg font-bold text-brand-black/70 italic">"Cultura, territorio y transformación social."</p>
              </div>
            </div>
            <div className="space-y-10 md:text-right flex flex-col md:items-end justify-center">
              <div className="space-y-4">
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-gold block">CANALES DE CONTACTO</span>
                <div className="flex flex-col md:items-end gap-2">
                  <a href="mailto:comunicaciones@corporaciongaia.org" className="text-xl md:text-2xl font-black text-brand-black hover:text-brand-red transition-colors flex items-center gap-3">
                    comunicaciones@corporaciongaia.org <Mail size={20} className="text-brand-red" />
                  </a>
                  <p className="text-xl md:text-2xl font-black text-brand-black flex items-center gap-3">
                    (604) 500 79 15 <Phone size={20} className="text-brand-red" />
                  </p>
                </div>
              </div>
              <a href="https://corporaciongaia.org/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-brand-teal hover:text-brand-black transition-colors">
                VISITAR SITIO WEB OFICIAL <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <BrandStrip />
    </main>
  );
}
