
"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { BrandStrip } from '@/components/BrandStrip';
import { Badge } from '@/components/ui/badge';
import { 
  History, Heart, Globe, Star, Zap, Sparkles, 
  ShieldCheck, MapPin, Users, Send, CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RevealSection } from '@/components/RevealSection';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const fundadoresPrincipales = [
  {
    name: "MARIA VICTORIA ALVAREZ GÓMEZ",
    role: "FUNDADORA Y DIRECCIÓN GENERAL",
    image: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/fundadores/01%20maria-victoria.png",
    bio: "Gestión cultural, arte y memoria en el centro de Medellín."
  },
  {
    name: "LUIS MIGUEL USUGA SAMUDIO",
    role: "FUNDADOR Y DIRECTOR",
    image: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/fundadores/02%20luis-miguel-usuga.png",
  },
  {
    name: "CARMEN ISABEL USUGA SAMUDIO",
    role: "FUNDADORA",
    image: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/fundadores/03%20carmen-usuga.png",
  }
];

const otrosProtagonistas = [
  {
    name: "LUIS FERNANDO MONTOYA FERNÁNDEZ",
    role: "ALIADO HISTÓRICO",
    image: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/fundadores/04%20luis-fernando%20Montoya.png",
  },
  {
    name: "José Enrique García Úsuga",
    role: "ALIADO HISTÓRICO",
    image: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/fundadores/05%20Jose%20Enrique%20Garcia%20usuga.png",
  }
];

export default function HistoriaPage() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', memory: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nosotrosHistoryImg = PlaceHolderImages.find(img => img.id === 'nosotros-secondary');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: "¡Recuerdo Recibido!",
        description: "Tu participación fortalece nuestra memoria colectiva.",
      });
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-white overflow-x-hidden text-brand-black">
      <Navbar />
      
      {/* SECCIÓN HERO EDITORIAL — ALGO DE HISTORIA */}
      <section className="pt-28 md:pt-44 pb-16 md:pb-20 relative border-b border-muted">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-16 md:mb-24">
            <div className="lg:col-span-7 space-y-10 md:space-y-12">
              <RevealSection className="flex flex-col gap-6">
                <div className="space-y-0">
                  <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[0.8] text-brand-black tracking-tighter uppercase">
                    ALGO DE
                  </h1>
                  <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[0.8] text-brand-gold tracking-tighter uppercase">
                    HISTORIA
                  </h1>
                </div>
              </RevealSection>

              <RevealSection delay={200} className="space-y-6 border-l-[8px] md:border-l-[12px] border-brand-teal pl-6 md:pl-8">
                <Badge className="bg-brand-black text-white px-4 py-1 rounded-none text-[9px] font-black uppercase tracking-[0.3em] w-fit mb-2">
                  QUÉ FUIMOS
                </Badge>
                <p className="text-lg md:text-2xl font-bold text-brand-black leading-tight tracking-tight normal-case italic">
                  "Una agenda cultural versátil, confiable y gratuita, pionera en la formación de públicos que apoyó la gestión cultural."
                </p>
                <span className="text-brand-gold font-black text-[10px] md:text-[11px] uppercase tracking-[0.4em] md:tracking-[0.5em] block">
                  MEMORIA CULTURAL VIVA
                </span>
              </RevealSection>

              <RevealSection delay={400} className="space-y-8 md:space-y-10 text-base md:text-xl text-brand-black/70 font-medium leading-relaxed max-w-3xl">
                <div className="space-y-8 md:space-y-10">
                  <p className="text-justify">
                    Las entidades y gestores culturales, artists, grupos, espacios reconocidos y alternos y personas interesadas en el arte y en las diferentes expresiones culturales tuvieron en la década de los 90, en la ciudad de Medellín, un aliado incondicional para promover su quehacer y formar públicos, el <span className="text-brand-black font-bold underline decoration-brand-gold/30">Semanario Cultural</span>, una agenda semanal que circuló en la ciudad entre febrero de 1990 y diciembre del 2000, que permitió un acercamiento real entre los productores de sentido desde el arte y la cultura a una gran cantidad de públicos diversos.
                  </p>
                  
                  <p className="text-justify">
                    El Semanario Cultural fue la primera iniciativa con información fidedigna y oportuna, que permitió a sus lectores enterarse de manera permanente y sencilla del acontecer académico y artístico, a la vez que registró para la posteridad las dinámicas instauradas desde el arte por una gran cantidad de organizaciones y agentes que, frente al caos imperante de una época compleja, social y políticamente, opusieron sus ideas, representaciones y creaciones artísticas, ofreciendo a quienes fuimos su espectadores espacios de lúdica, reflexión, goce y esparcimiento.
                  </p>

                  {/* BLOQUE DESTACADO: LA HOJITA AMARILLA */}
                  <div className="bg-brand-gold/5 border-l-8 border-brand-gold p-6 md:p-12 shadow-sm i my-10 md:my-12 group transition-all hover:bg-brand-gold/10">
                    <p className="text-lg md:text-2xl font-medium text-brand-black leading-relaxed text-justify">
                      <span className="text-brand-gold font-black uppercase tracking-widest block mb-4 text-[10px] md:text-xs">El ícono</span>
                      <span className="text-brand-gold font-black">La hojita amarilla</span>, como le decían por el color del papel que se utilizó en sus primeras ediciones, se distribuyó gratuitamente en una gran cantidad de lugares y espacios de ciudad como universidades, teatros, librerías, bibliotecas, museos, bares, restaurantes, hoteles y centros culturales.
                    </p>
                  </div>

                  <p className="text-justify">
                    En los años 93 y 94, quienes conformamos el equipo de la publicación convocamos a un gran número de personas, entre asesores, colaboradores especiales, docentes, periodistas, fotógrafos, columnistas, diseñadores y equipo de producción, y editamos las revistas <span className="text-brand-black font-bold uppercase tracking-tight">Semanario 1993 y Semanuario 1994</span>, una especie de balance de lo que pasó en Medellín en el referido año en materia de arte y cultura. Un esfuerzo editorial muy interesante y valioso, pero que no logró sostenerse económicamente en el tiempo.
                  </p>

                  <div className="pt-8 md:pt-10 border-t-2 border-muted space-y-6 md:space-y-8">
                    <p className="text-justify">
                      Hoy, ad portas de la <span className="text-brand-teal font-black uppercase tracking-widest text-sm md:text-base">Sociedad 5.0</span>, retornamos con una propuesta que retoma la experiencia, aprendizajes y know-how, sumados a las posibilidades que nos brinda la tecnología y los nuevos conocimientos e ideas que vienen de la mano de las nuevas generaciones.
                    </p>
                    
                    <p className="text-justify">
                      Hoy queremos ser un puente entre la movida cultural de la ciudad, del país, sus organizaciones, sus artistas, sus estéticas, sus miradas y apuestas, su pensamiento e ideas y diversos públicos y generaciones, y seguir siendo un repositorio de memoria cultural de una época.
                    </p>
                  </div>

                  <div className="pt-10 md:pt-12 mt-10 md:mt-12 bg-brand-black text-white p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-brand-gold/20 -translate-y-12 md:-translate-y-16 translate-x-12 md:translate-x-16 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative z-10 space-y-4 md:space-y-6">
                      <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-none">
                        ¿Quieres acompañar esta <br />
                        nueva ruta? <span className="text-brand-gold">¡Bienvenido!</span>
                      </p>
                      <div className="w-16 md:w-20 h-1 bg-brand-gold"></div>
                    </div>
                  </div>
                </div>
              </RevealSection>
            </div>

            <div className="lg:col-span-5 relative group lg:-mt-12">
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
                <div className="absolute -bottom-6 -right-4 md:-bottom-8 md:-right-8 w-32 h-32 md:w-40 md:h-40 bg-brand-teal flex items-center justify-center p-6 md:p-8 text-white font-black text-xs md:text-sm uppercase tracking-widest text-center leading-none z-10 shadow-[10px_10px_0px_0px_rgba(255,255,255,0.05)] md:shadow-[20px_20px_0px_0px_rgba(255,255,255,0.05)] transition-transform group-hover:scale-105">
                  MEMORIA <br /> URBANA
                </div>
              </RevealSection>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 mb-20 md:mb-32 bg-white border-4 border-brand-black shadow-2xl">
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
              <RevealSection key={i} delay={i * 200} className={cn("p-8 md:p-12 flex flex-col h-full border-b lg:border-b-0 lg:border-r last:border-r-0 last:border-b-0 border-muted", item.color)}>
                <div className={cn("w-12 h-2 mb-6", item.accent)}></div>
                <span className="block text-[10px] md:text-[11px] font-black uppercase tracking-[0.4em] mb-4 text-brand-black opacity-40">{item.label}</span>
                <h3 className="text-xl md:text-2xl font-black uppercase text-brand-black tracking-tighter mb-6">{item.value}</h3>
                <p className="text-xs md:text-sm font-medium text-brand-black/70 leading-relaxed text-justify">{item.desc}</p>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* BLOQUE 1 — MEMORIA Y ADN */}
      <section className="py-16 md:py-24 bg-brand-black text-white relative">
        <div className="container mx-auto px-6">
          <RevealSection className="flex flex-col gap-8 md:gap-12 mb-16 md:mb-20">
            <Badge className="bg-brand-gold text-brand-black px-6 py-1.5 rounded-none text-[10px] font-black uppercase tracking-[0.4em] w-fit">
              BLOQUE 1 — MEMORIA Y ADN
            </Badge>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
              LO QUE NOS HIZO <br /> <span className="text-brand-gold">ÚNICOS</span>
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-0 border border-white/10">
            {[
              { title: "PROGRAMACIÓN SEMANAL", desc: "En 1990 solo existía la agenda diaria. Permitimos programarse con antelación.", icon: History },
              { title: "VERACIDAD Y CONFIANZA", desc: "Medio veraz por su periodicidad semanal. Un referente de información real.", icon: ShieldCheck },
              { title: "APOYO A LA GESTIÓN", desc: "Artistas y gestores culturales sintieron nuestro apoyo.", icon: Star },
              { title: "FORMACIÓN DE PÚBLICOS", desc: "Pioneros en crear audiencias para la cultura en Medellín.", icon: History },
              { title: "VERSATILIDAD REAL", desc: "Capacidad de reacción semanal frente a agendas mensuales.", icon: Zap },
              { title: "DISTRIBUCIÓN GRATUITA", desc: "La gente buscaba la 'hojita amarilla' cada lunes en 100 puntos.", icon: Globe },
              { title: "CONEXIÓN EFICIENTE", desc: "El puente directo entre el público y la oferta cultural.", icon: Zap },
              { title: "INCLUSIÓN TOTAL", desc: "Nunca dejamos de publicar la información de ningún artista o grupo.", icon: Sparkles },
              { title: "DIVERSIDAD ABSOLUTA", desc: "Del Mercado de San Alejo a la música de cámara. Todo cabía aquí.", icon: History },
              { title: "RED DE CIUDAD", desc: "100 puntos en museos, bares, teatros, librerías y universidades.", icon: MapPin },
              { title: "PUENTE EMOCIONAL", desc: "Cercanía y empatía real entre creadores y lectores.", icon: Heart }
            ].map((item, idx) => (
              <div key={idx} className="p-8 md:p-10 border-white/10 border hover:bg-brand-gold/5 transition-all group">
                <RevealSection delay={idx * 50}>
                  <item.icon className="w-8 h-8 md:w-10 md:h-10 text-brand-gold mb-6 md:mb-8 transition-transform duration-500 group-hover:scale-110" />
                  <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-none mb-4 md:mb-6 group-hover:text-brand-gold transition-colors">{item.title}</h3>
                  <p className="text-white/40 text-[12px] md:text-[13px] font-medium leading-relaxed text-justify">{item.desc}</p>
                </RevealSection>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECCIÓN COMPARTE TU RECUERDO - PASO 2 */}
      <section className="py-20 md:py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-5 space-y-8">
              <RevealSection>
                <Badge className="bg-brand-red text-white px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.4em] w-fit mb-8">
                  PARTICIPACIÓN CIUDADANA
                </Badge>
                <h2 className="text-5xl md:text-7xl font-black text-brand-black tracking-tighter leading-[0.8] uppercase">
                  TU MEMORIA <br />
                  <span className="text-brand-red">ES NUESTRO ARCHIVO</span>
                </h2>
                <div className="pt-8 border-l-[16px] border-brand-red pl-10 mt-8">
                  <p className="text-xl text-muted-foreground font-medium leading-tight">
                    ¿Viviste el Centro en los 90? ¿Tienes alguna historia con "la hojita amarilla"? Comparte tu recuerdo para que sea parte de nuestra memoria colectiva.
                  </p>
                </div>
              </RevealSection>
            </div>

            <div className="lg:col-span-7">
              <RevealSection delay={300}>
                <div className="bg-muted/30 p-8 md:p-12 border-4 border-brand-black shadow-2xl relative">
                  {submitted ? (
                    <div className="text-center py-12 space-y-8 animate-in zoom-in-95 duration-500">
                      <div className="w-20 h-20 bg-brand-green text-white rounded-full flex items-center justify-center mx-auto shadow-xl">
                        <CheckCircle size={40} />
                      </div>
                      <div className="space-y-4">
                        <h3 className="text-3xl font-black uppercase tracking-tighter">¡GRACIAS POR COMPARTIR!</h3>
                        <p className="text-xl font-bold italic text-brand-black/60 normal-case">
                          "Tu recuerdo será parte del archivo comunitario de El Semanario HOY."
                        </p>
                      </div>
                      <Button 
                        onClick={() => setSubmitted(false)} 
                        variant="outline" 
                        className="rounded-none border-brand-black uppercase font-black text-[10px] tracking-widest px-10 h-12"
                      >
                        COMPARTIR OTRO RECUERDO
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest opacity-40">NOMBRE COMPLETO</label>
                          <Input 
                            required 
                            placeholder="TU NOMBRE" 
                            className="rounded-none border-2 border-brand-black h-12 font-bold"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-widest opacity-40">CORREO ELECTRÓNICO</label>
                          <Input 
                            required 
                            type="email" 
                            placeholder="TU@EMAIL.COM" 
                            className="rounded-none border-2 border-brand-black h-12 font-bold"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest opacity-40">TU RECUERDO DEL CENTRO</label>
                        <Textarea 
                          required 
                          placeholder="ESCRIBE AQUÍ TU HISTORIA, ANÉCDOTA O RECUERDO..." 
                          className="rounded-none border-2 border-brand-black min-h-[150px] font-medium text-lg leading-relaxed"
                          value={formData.memory}
                          onChange={(e) => setFormData({...formData, memory: e.target.value})}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-brand-red hover:bg-brand-black text-white rounded-none h-16 font-black uppercase tracking-[0.4em] text-[11px] shadow-xl transition-all"
                      >
                        <Send className="mr-3" size={18} />
                        ENVIAR AL ARCHIVO COMUNITARIO
                      </Button>
                    </form>
                  )}
                </div>
              </RevealSection>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN FUNDADORES — DISEÑO DE TARJETAS COMPACTAS */}
      <section className="py-16 md:py-24 bg-muted/20 border-t border-muted">
        <div className="container mx-auto px-6 text-center mb-12 md:mb-16">
           <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase text-brand-black">FUNDADORES</h2>
        </div>
        
        {/* GRUPO 1: FUNDADORES PRINCIPALES */}
        <div className="container mx-auto px-6 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
            {fundadoresPrincipales.map((f, i) => (
              <RevealSection key={i} delay={i * 100} className="h-full">
                <div className="bg-white p-6 md:p-8 shadow-xl border-b-4 border-brand-gold h-full flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-500">
                  <div className="relative aspect-square w-24 md:w-32 mb-6 bg-muted overflow-hidden shadow-md">
                    <Image 
                      src={f.image} 
                      alt={f.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  <div className="space-y-3">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-gold block">{f.role}</span>
                    <h4 className="text-lg md:text-xl font-black uppercase tracking-tighter text-brand-black leading-tight">
                      {f.name}
                    </h4>
                    {f.bio && (
                      <p className="text-[11px] font-medium text-brand-black/50 leading-relaxed italic border-t border-muted pt-3 mt-3">
                        "{f.bio}"
                      </p>
                    )}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>

        {/* SEPARADOR: OTROS PROTAGONISTAS */}
        <div className="container mx-auto px-6 text-center mb-12 md:mb-16">
           <h3 className="text-lg md:text-xl font-black tracking-tighter uppercase text-brand-black opacity-60">Otros protagonistas y aliados</h3>
        </div>

        {/* GRUPO 2: OTROS PROTAGONISTAS */}
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            {otrosProtagonistas.map((f, i) => (
              <RevealSection key={i} delay={i * 100} className="h-full">
                <div className="bg-white p-6 md:p-8 shadow-xl border-b-4 border-brand-teal h-full flex flex-col items-center text-center group hover:-translate-y-1 transition-all duration-500">
                  <div className="relative aspect-square w-24 md:w-32 mb-6 bg-muted overflow-hidden shadow-md">
                    <Image 
                      src={f.image} 
                      alt={f.name} 
                      fill 
                      className="object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                  </div>
                  <div className="space-y-3">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-teal block">{f.role}</span>
                    <h4 className="text-lg md:text-xl font-black uppercase tracking-tighter text-brand-black leading-tight">
                      {f.name}
                    </h4>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      <BrandStrip />
    </main>
  );
}
