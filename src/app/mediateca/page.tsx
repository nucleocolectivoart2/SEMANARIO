"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { BrandStrip } from '@/components/BrandStrip';
import { RevealSection } from '@/components/RevealSection';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, Pause, Mic, Smartphone, BookOpen, X, Loader2, 
  Video, Sparkles, ArrowRight, Download, History, 
  MapPin, Eye, Info, Volume2, SkipForward, SkipBack,
  Clock, Activity, Film, Library, Image as ImageIcon,
  ChevronRight, Layers, Target, Heart, Zap, Users,
  Facebook, Instagram, Mail, Quote
} from 'lucide-react';
import Image from 'next/image';
import { useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from '@/lib/utils';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Slider } from '@/components/ui/slider';

const COLLAGE_URL = "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/archivo/portadas/collage.jpg";
const FRAGMENTOS_BASE = "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/mas%20imagenes";

export const officialVideos = [
  { id: 'v-social-vive', title: 'SOCIALIZACIÓN DEL PROYECTO', season: 'DESTACADO', youtubeId: 'g23v49jUT1s', description: 'Presentación oficial de la iniciativa cultural y periodística que busca revitalizar el corazón de Medellín.', project: 'centro-vive' },
  { id: 'v-t2-reg', title: 'EL CENTRO VIVE Y RESUENA: REGISTRO ACTUAL', season: 'TEMPORADA 2 (2026)', youtubeId: 'l530ZiOZjQk', description: 'Un faro en el corazón de Medellín - Registro 2024.', project: 'centro-vive' },
  { id: 'v-t2-confiar', title: 'CASA DE LA CULTURA Y LA COOPERACIÓN - CONFIAR', season: 'TEMPORADA 2 (2026)', youtubeId: 'pjaVRc87HXs', description: 'Registro patrimonial 2024 en el corazón de la ciudad.', project: 'centro-vive' },
  { id: 'v-t2-homero', title: 'LA CASA CULTURAL DEL TANGO - HOMERO MANZI', season: 'TEMPORADA 2 (2026)', youtubeId: 'H-xpovnPZaQ', description: 'La esquina del tango en Medellín. Tradición y bohemia.', project: 'centro-vive' },
  { id: 'v-t2-tpm', title: 'TEATRO POPULAR DE MEDELLÍN', season: 'TEMPORADA 2 (2026)', youtubeId: 'VDFE_1Cgl2g', description: 'Donde el silencio habla y la palabra vuela.', project: 'centro-vive' },
  { id: 'v-t2-pablo', title: 'TEATRO PABLO TOBÓN URIBE', season: 'TEMPORADA 2 (2026)', youtubeId: 'lrrYQthosl8', description: 'En el alma de Medellín. Un recorrido por la gestión cultural actual.', project: 'centro-vive' },
  { id: 'v-t1-9', title: 'EPISODIO 9: LA HUERTA', season: 'TEMPORADA 1 (2025)', youtubeId: 'YaLSyFGmT5Y', description: 'Un espacio cultural en el corazón de Medellín. Soberanía alimentaria y cultura.', project: 'centro-vive' },
  { id: 'v-t1-8', title: 'EPISODIO 8: AGUA DULCE', season: 'TEMPORADA 1 (2025)', youtubeId: 'vgiHCjG4OzY', description: 'Un oasis con tres experiencias en el Parque del Periodista.', project: 'centro-vive' },
  { id: 'v-t1-7', title: 'EPISODIO 7: VIVA PALABRA', season: 'TEMPORADA 1 (2025)', youtubeId: 'jaS5sXS67Xc', description: '28 años contando cuentos en el centro de Medellín.', project: 'centro-vive' },
  { id: 'v-t1-6', title: 'EPISODIO 6: ARTE URBANO', season: 'TEMPORADA 1 (2025)', youtubeId: 'KdFvqG0qUlQ', description: 'La calle como lienzo de expresión cultural.', project: 'centro-vive' },
  { id: 'v-t1-5', title: 'EPISODIO 5: CASA DEL ENCUENTRO', season: 'TEMPORADA 1 (2025)', youtubeId: 'zMFHJfp6st4', description: 'Diálogos y saberes en un espacio histórico.', project: 'centro-vive' },
  { id: 'v-t1-4', title: 'EPISODIO 4: PEQUEÑO TEATRO', season: 'TEMPORADA 1 (2025)', youtubeId: '3nwMCxiW57E', description: '45 años de arte dramático y resistance cultural.', project: 'centro-vive' },
  { id: 'v-t1-3', title: 'EPISODIO 3: TRADICIÓN', season: 'TEMPORADA 1 (2025)', youtubeId: 'l1nhyWNDgp0', description: 'Historias que definen nuestra identidad.', project: 'centro-vive' },
  { id: 'v-t1-2', title: 'EPISODIO 2: REGISTRO', season: 'TEMPORADA 1 (2025)', youtubeId: 'D_7TBSnII94', description: 'Primeros pasos del proyecto El Centro Vive.', project: 'centro-vive' },
  { id: 'v-t1-1', title: 'EPISODIO 1: EL ORIGEN', season: 'TEMPORADA 1 (2025)', youtubeId: 'FaGMpv2db_M', description: 'El inicio de una historia de resistance cultural en el corazón de la ciudad.', project: 'centro-vive' },
  { id: 'v-2026-1', title: 'CORTOMETRAJE 1: ORIGEN Y RESISTENCIA', season: 'PRODUCCIÓN 2026', description: 'Acto I: El contexto, el sueño fundacional y los primeros pasos de las organizaciones que habitan el centro.', thumbnailUrl: 'https://picsum.photos/seed/crea1/800/450', isPlaceholder: true, project: 'crea-digital' },
  { id: 'v-2026-2', title: 'CORTOMETRAJE 2: PRESENTE Y ECOSISTEMA', season: 'PRODUCCIÓN 2026', description: 'Acto II: El quehacer cotidiano y el impacto en el entorno. El trabajo vivo capturado desde el aire y la calle.', thumbnailUrl: 'https://picsum.photos/seed/crea2/800/450', isPlaceholder: true, project: 'crea-digital' },
  { id: 'v-2026-3', title: 'CORTOMETRAJE 3: FUTURO Y CIUDADANÍAS', season: 'PRODUCCIÓN 2026', description: 'Acto III: Los sueños por cumplir y las nuevas ciudadanías. Un cierre que abre preguntas sobre el territorio.', thumbnailUrl: 'https://picsum.photos/seed/crea3/800/450', isPlaceholder: true, project: 'crea-digital' }
];

const podcasts = [
  { id: 0, title: "RESUMEN HISTÓRICO: EL SEMANARIO CULTURAL", duration: "MÍN. 5 MIN", audioUrl: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/podcast_semanario/el-semanario.mp3", desc: "Medellín, 1990. Una ciudad que bullía entre la industria y una violencia que empezaba a teñir sus calles.", image: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/podcast_semanario/portada-podcast.png", position: "center", zoom: 1, hoverClass: "bg-brand-gold/40", borderClass: "border-b-brand-gold", iconClass: "text-brand-gold", questions: ["¿Cómo nació el Semanario Cultural en 1990?", "¿Quiénes fueron sus fundadores?", "¿Cuál era el lema de la primera edición?", "¿Qué papel jugó la Cooperativa Confiar?"] },
  { id: 1, title: "EPISODIO 1: ORÍGENES", duration: "MÍN. 5 MIN", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", desc: "Indagamos en los inicios del Semanario Cultural como herramienta de comunicación alternativa.", image: COLLAGE_URL, position: "10% 10%", zoom: 1.5, hoverClass: "bg-brand-red/40", borderClass: "border-b-brand-red", iconClass: "text-brand-red", questions: ["¿Qué motivó la creación del Semanario?", "¿Cómo se tejieron las primeras redes?", "¿Qué temas atravesaban sus páginas?"] },
  { id: 2, title: "EPISODIO 2: VOX POPULI", duration: "MÍN. 5 MIN", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3", desc: "Exploramos las organizaciones de ayer que permanecen aún hoy.", image: COLLAGE_URL, position: "90% 90%", zoom: 1.5, hoverClass: "bg-brand-teal/40", borderClass: "border-b-brand-teal", iconClass: "text-brand-teal", questions: ["¿Qué organizaciones de los 90 siguen activas?", "¿Cómo han evolucionado?", "¿Cuál es su relación con la memoria?"] },
  { id: 3, title: "EPISODIO 3: PERSONAJES", duration: "MÍN. 5 MIN", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3", desc: "Testimonios de protagonistas de una época.", image: COLLAGE_URL, position: "85% 15%", zoom: 1.5, hoverClass: "bg-brand-gold/40", borderClass: "border-b-brand-gold", iconClass: "text-brand-gold", questions: ["¿Quiénes fueron las voces clave?", "¿Qué anécdotas marcaron la década?", "¿Cómo ven la ciudad hoy?"] },
  { id: 4, title: "EPISODIO 4: CÓMO SE CRECE", duration: "MÍN. 5 MIN", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3", desc: "Redes culturales, salas concertadas y proyectos colaborativos.", image: COLLAGE_URL, position: "15% 85%", zoom: 1.5, hoverClass: "bg-brand-purple/40", borderClass: "border-b-brand-purple", iconClass: "text-brand-purple", questions: ["¿Cómo funcionan las salas concertadas?", "¿Cuál es el poder de lo colaborativo?", "¿Cómo se fortalece el tejido?"] },
  { id: 5, title: "EPISODIO 5: NUEVAS ORGANIZACIONES", duration: "MÍN. 5 MIN", audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3", desc: "Jóvenes creadores y gestores que hoy lideran la escena.", image: COLLAGE_URL, position: "50% 50%", zoom: 1.5, hoverClass: "bg-brand-olive/40", borderClass: "border-b-brand-olive", iconClass: "text-brand-olive", questions: ["¿Quiénes son los nuevos protagonistas?", "¿Cómo narran la ciudad hoy?", "¿Cuál es su visión de futuro?"] }
];

const reels = [
  { id: 'r1', title: 'UN DÍA EN LA VIDA', youtubeId: 'jaS5sXS67Xc' },
  { id: 'r2', title: 'EL ORIGEN EN 60"', youtubeId: 'KdFvqG0qUlQ' },
  { id: 'r3', title: 'MANOS QUE CREAN', youtubeId: 'lrrYQthosl8' },
  { id: 'r4', title: 'MANOS QUE CREAN 2', youtubeId: 'l530ZiOZjQk' },
  { id: 'r5', title: 'LO QUE MEDELLÍN NO SABE', youtubeId: 'YaLSyFGmT5Y' }
];

const comparisons = [
  { id: 1, title: 'PUENTE DE MEMORIA', location: 'CENTRO HISTÓRICO', oldImage: `${FRAGMENTOS_BASE}/agenda-cp-puente-arch-1.png`, newImage: `${FRAGMENTOS_BASE}/agenda-cp-puente-arch-2.png`, description: 'Registro visual del puente que conecta la historia del Semanario con el presente.' },
  { id: 2, title: 'SISTEMAS DE INFORMACIÓN', location: 'REDISEÑO DIGITAL', oldImage: `${FRAGMENTOS_BASE}/data-stream.png`, newImage: `${FRAGMENTOS_BASE}/data-stream2.png`, description: 'La transformación de los lenguajes informativos.' },
  { id: 3, title: 'FRAGMENTOS DE ARCHIVO', location: 'MEMORIA URBANA', oldImage: `${FRAGMENTOS_BASE}/fragmentos-de-memoria-archivo-vivo-4.png`, newImage: `${FRAGMENTOS_BASE}/fragmentos-de-memoria-archivo-vivo-4-v2.png`, description: 'Recuperación visual de hitos emblemáticos.' }
];

function getYouTubeId(url: string) {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|live\/)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) return match[2];
  return null;
}

export default function MediatecaPage() {
  const db = useFirestore();
  const multimediaQuery = useMemoFirebase(() => query(collection(db, 'multimedia_content'), orderBy('publicationDate', 'desc')), [db]);
  const { data: firestoreContent } = useCollection(multimediaQuery);
  
  const [activeTab, setActiveTab] = useState('centro-vive');
  const [selectedVideo, setSelectedVideo] = useState<{youtubeId?: string, title: string, url?: string} | null>(null);
  const [activePodcast, setActivePodcast] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      project: 'external'
    }));
    return [...officialVideos, ...userVideos];
  }, [firestoreContent]);

  const handleVideoClick = (video: any) => {
    if (video.isPlaceholder) return;
    const ytId = video.youtubeId || getYouTubeId(video.url);
    if (ytId) setSelectedVideo({ youtubeId: ytId, title: video.title });
    else if (video.url) window.open(video.url, '_blank');
  };

  const handlePlayPodcast = (podcast: any) => {
    if (activePodcast?.id === podcast.id) {
      if (isPlaying) { audioRef.current?.pause(); setIsPlaying(false); }
      else { audioRef.current?.play(); setIsPlaying(true); }
    } else {
      setActivePodcast(podcast);
      setIsPlaying(true);
      if (audioRef.current) { audioRef.current.src = podcast.audioUrl; audioRef.current.play(); }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const updateProgress = () => setProgress((audio.currentTime / audio.duration) * 100 || 0);
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => { setIsPlaying(false); setProgress(0); };
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('loadedmetadata', onLoadedMetadata);
    audio.addEventListener('ended', onEnded);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('loadedmetadata', onLoadedMetadata);
      audio.removeEventListener('ended', onEnded);
    };
  }, []);

  const handleSeek = (values: number[]) => {
    const newTime = (values[0] / 100) * duration;
    if (audioRef.current) { audioRef.current.currentTime = newTime; setProgress(values[0]); }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const mediatecaHeroImg = PlaceHolderImages.find(img => img.id === 'multimedia-video');

  const navItems = [
    { id: 'centro-vive', label: 'EL CENTRO VIVE\nY RESUENA\nCON EL SEMANARIO', icon: Library, color: 'bg-brand-teal', hoverColor: 'hover:bg-brand-teal', activeColor: 'data-[state=active]:bg-brand-teal' },
    { id: 'podcasts', label: 'PODCASTS:\nVOCES DE\nLA CIUDAD', icon: Mic, color: 'bg-brand-red', hoverColor: 'hover:bg-brand-red', activeColor: 'data-[state=active]:bg-brand-red' },
    { id: 'documentales', label: 'SERIE: TRES\nCORTOMETRAJES', icon: Video, color: 'bg-brand-gold', hoverColor: 'hover:bg-brand-gold', activeColor: 'data-[state=active]:bg-brand-gold' },
    { id: 'reels', label: 'PIEZAS PARA REDES', icon: Smartphone, color: 'bg-brand-purple', hoverColor: 'hover:bg-brand-purple', activeColor: 'data-[state=active]:bg-brand-purple' },
    { id: 'galeria', label: 'GALERÍA: ANTES Y AHORA', icon: ImageIcon, color: 'bg-brand-olive', hoverColor: 'hover:bg-brand-olive', activeColor: 'data-[state=active]:bg-brand-olive' },
    { id: 'ebook', label: 'E-BOOK INTERACTIVO', icon: BookOpen, color: 'bg-brand-ash', hoverColor: 'hover:bg-brand-ash', activeColor: 'data-[state=active]:bg-brand-ash' },
  ];

  return (
    <main className="min-h-screen bg-brand-black text-white selection:bg-brand-teal selection:text-white">
      <Navbar />
      <audio ref={audioRef} />
      
      <div className="pt-28 pb-24">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
            <RevealSection className="lg:col-span-7 space-y-8">
              <Badge className="bg-brand-teal text-white px-6 py-2 rounded-none text-[10px] font-black uppercase tracking-[0.5em] w-fit shadow-xl">
                UNIVERSO TRANSMEDIA • MEDIATECA HOY
              </Badge>
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.8] uppercase">
                LA <br />
                <span className="text-brand-teal">MEDIATECA</span>
              </h1>
              <div className="pt-8 border-l-[16px] border-brand-teal pl-10">
                <p className="text-lg md:text-xl text-white/60 font-medium leading-tight max-w-2xl">
                  Un repositorio activo donde confluyen los lenguajes narrativos del patrimonio vivo de Medellín.
                </p>
              </div>
            </RevealSection>
            
            <RevealSection delay={300} className="lg:col-span-5 relative group flex flex-col items-end">
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
                  NARRATIVAS <br /> DIGITALES
                </div>
              </div>
            </RevealSection>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="z-50 bg-brand-black border-y border-white/10 -mx-6 px-6 py-8 mb-16">
              <TabsList className="bg-transparent h-auto p-0 flex flex-wrap lg:flex-nowrap gap-2 lg:gap-4 w-full justify-start overflow-visible">
                {navItems.map((item) => (
                  <TabsTrigger 
                    key={item.id}
                    value={item.id} 
                    className={cn(
                      "flex-1 min-w-[140px] lg:min-w-0 lg:flex-1 h-24 lg:h-32 rounded-none border border-white/5 flex flex-col items-center justify-center gap-2 transition-all duration-500",
                      "bg-white text-brand-black",
                      item.hoverColor, "hover:text-white",
                      item.activeColor, "data-[state=active]:bg-brand-teal"
                    )}
                  >
                    <item.icon size={20} className={cn("transition-transform group-hover:scale-110 shrink-0", activeTab === item.id ? "text-white" : "text-brand-black opacity-60 group-hover:text-white group-hover:opacity-100")} />
                    <span className="font-black uppercase text-[8px] lg:text-[9px] tracking-widest leading-tight text-center whitespace-pre-line px-1">
                      {item.label}
                    </span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            <TabsContent value="centro-vive" className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
              <RevealSection className="bg-[#0a1a1a] border-l-[12px] border-brand-teal p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none"><Library className="w-64 h-64" /></div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
                  <div className="lg:col-span-8 space-y-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4"><Target className="text-brand-gold" size={32} /><h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-none">EL CENTRO VIVE Y RESUENA CON EL SEMANARIO</h2></div>
                      <p className="text-base md:text-xl font-bold text-white leading-relaxed text-justify italic">"El Centro vive y resuena con el Semanario busca promover, resignificar y visibilizar el Centro de Medellín..."</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
                      {[
                        { icon: Zap, label: "PROPÓSITO", text: "Cambiar la narrativa sobre el centro." },
                        { icon: Film, label: "ENFOQUE", text: "Estrategia de piezas audiovisuales y crónicas." },
                        { icon: Heart, label: "LUGARES", text: "Enfoque en iconos patrimoniales." },
                        { icon: Users, label: "CONEXIÓN", text: "Conectar ciudadanos con el arte." }
                      ].map((item, idx) => (
                        <div key={idx} className="flex gap-4 group">
                          <div className="w-10 h-10 bg-brand-gold/10 flex items-center justify-center shrink-0 mt-1 group-hover:bg-brand-gold transition-colors"><item.icon className="text-brand-gold group-hover:text-brand-black" size={20} /></div>
                          <div className="space-y-1"><span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">{item.label}</span><p className="text-xs text-white/70">{item.text}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="lg:col-span-4 space-y-8">
                    <div className="bg-white/5 border border-white/10 p-6 space-y-4">
                      <span className="text-[9px] font-black uppercase tracking-widest text-brand-gold flex items-center gap-2"><Play size={12} fill="currentColor" /> VIDEO DE SOCIALIZACIÓN</span>
                      <div className="relative aspect-video group cursor-pointer overflow-hidden border border-white/20" onClick={() => setSelectedVideo({ youtubeId: 'g23v49jUT1s', title: 'SOCIALIZACIÓN' })}>
                        <img src="https://i.ytimg.com/vi/g23v49jUT1s/hqdefault.jpg" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="" />
                        <div className="absolute inset-0 flex items-center justify-center bg-brand-black/20"><div className="w-12 h-12 bg-white text-brand-black flex items-center justify-center shadow-2xl"><Play size={20} fill="currentColor" /></div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealSection>

              <SectionHeader badge="TEMPORADA 2 (2026)" title="EL CENTRO VIVE • ACTUALIDAD" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allVideos.filter(v => v.project === 'centro-vive' && v.season.includes('TEMPORADA 2')).map(video => (
                  <VideoCardCompact key={video.id} video={video} onClick={() => handleVideoClick(video)} />
                ))}
              </div>

              {/* BANNER INSTITUCIONAL UNIFICADO */}
              <div className="relative w-[100vw] left-1/2 -translate-x-1/2 mt-20">
                <div className="bg-white text-brand-black py-12 border-y border-gray-100">
                  <div className="container mx-auto px-6 max-w-7xl">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 md:gap-20 mb-16">
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
                            { role: "COMUNICACIONES", name: "Estefany Rivera Orrego • Natalia Vélez Sepúlveda • Paula Andrea Úsuga Álvarez" },
                            { role: "IMÁGENES DRONE", name: "John Cuervo Moreno / @_cuervofilms" },
                            { role: "LOCUCIÓN", name: "Paula Andrea Úsuga Álvarez" },
                            { role: "TÉCNICO DE SONIDO", name: "Julián Álvarez Kusy" }
                          ].map((m, i) => (
                            <div key={i} className="border-l-4 border-brand-gold pl-6 space-y-1 group">
                              <span className="text-[8px] font-black text-brand-gold uppercase tracking-[0.2em]">{m.role}</span>
                              <p className="text-sm font-black uppercase tracking-tighter">{m.name}</p>
                            </div>
                          ))}
                        </div>
                      </RevealSection>

                      <RevealSection delay={200} className="lg:col-span-7 space-y-10">
                        <div className="space-y-4">
                          <span className="inline-block bg-brand-teal text-white px-4 py-1.5 text-[9px] font-black uppercase tracking-[0.3em]">ECOSISTEMA CULTURAL</span>
                          <h2 className="text-3xl font-black uppercase tracking-tighter leading-none mt-4">ORGANIZACIONES PARTICIPANTES</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {["Agua Dulce Restaurante", "Donde Robin Bar – Tango Bar", "Corporación Cultural Viva Palabra", "El Club del Jazz", "Centro Cultural La Huerta", "La Casa Centro Cultural", "Pequeño Teatro", "Teatro Casa Clown", "Teatro Matacandelas"].map((org, i) => (
                            <div key={i} className="bg-white p-4 border border-gray-100 hover:border-brand-teal transition-all group shadow-sm">
                              <div className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-brand-teal rounded-full" /><span className="font-bold text-xs uppercase tracking-tight">{org}</span></div>
                            </div>
                          ))}
                        </div>
                        <div className="pt-4 border-t border-gray-100 space-y-2">
                          <div className="flex items-center gap-2 text-brand-teal"><Sparkles size={14} /><span className="font-black text-[9px] uppercase tracking-[0.4em]">AGRADECIMIENTOS ESPECIALES</span></div>
                          <div className="group flex items-center gap-6">
                            <div className="relative w-28 h-28 shrink-0"><Image src="https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/logo-camina-pal-centro.png" alt="Logo Caminá pa'l Centro" fill className="object-contain" /></div>
                            <div className="space-y-1"><p className="text-[9px] font-black text-brand-black/60 leading-tight max-w-sm uppercase tracking-tight">Iniciativa colaborativa para valorar un bien común: <br className="hidden md:block" /> el centro de Medellín, el barrio de todos.</p></div>
                          </div>
                        </div>
                      </RevealSection>
                    </div>

                    <RevealSection className="border-t border-gray-100 pt-12 mb-12 flex justify-center">
                      <a href="https://www.youtube.com/channel/UCqns8GIBFKxWKipQKIUSNPA" target="_blank" className="relative block w-full max-w-[35rem] h-60 transition-transform hover:scale-105">
                        <Image src="https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/Logo_El_Centro.jpg" alt="El Centro Vive" fill className="object-contain" />
                      </a>
                    </RevealSection>

                    <RevealSection className="border-t border-gray-100 pt-12">
                      <div className="flex justify-center mb-6"><div className="relative w-full max-w-xl h-24 md:h-28"><Image src="https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/Logos_institucionales.png" alt="Logos Institucionales" fill className="object-contain" /></div></div>
                      <div className="text-center max-w-4xl mx-auto"><p className="text-[9px] md:text-[10px] font-black uppercase leading-relaxed tracking-wider text-brand-black/80">“PROYECTO APOYADO POR EL MINISTERIO DE LAS CULTURAS, LAS ARTES Y LOS SABERES, <br className="hidden md:block" /> PROGRAMA NACIONAL DE CONCERTACIÓN CULTURAL”</p></div>
                    </RevealSection>
                  </div>
                </div>
                
                <div className="bg-[#9D6BA1] py-12 px-6 border-t-4 border-brand-gold">
                  <p className="text-base md:text-xl font-black tracking-tighter text-white text-center max-w-4xl mx-auto leading-tight">
                    <span className="uppercase block mb-2">EL CENTRO VIVE Y RESUENA CON EL SEMANARIO:</span>
                    <span className="italic text-white font-medium normal-case">¡El Centro de Medellín, todo en un mismo lugar!</span>
                  </p>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="podcasts" className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
              {/* Contenido de Podcasts */}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <BrandStrip />

      <Dialog open={!!selectedVideo} onOpenChange={(open) => !open && setSelectedVideo(null)}>
        <DialogContent className="max-w-7xl p-0 bg-black border-none rounded-none overflow-hidden">
          <DialogHeader className="sr-only"><DialogTitle>{selectedVideo?.title}</DialogTitle></DialogHeader>
          <button onClick={() => setSelectedVideo(null)} className="absolute right-4 top-4 z-[100] bg-brand-red text-white p-3 hover:bg-white hover:text-brand-red transition-all shadow-2xl"><X size={24} /></button>
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
        {video.isPlaceholder && <div className="absolute inset-0 z-10 bg-brand-black/40 backdrop-blur-[2px] flex items-center justify-center"><span className="text-[8px] font-black uppercase tracking-[0.4em] text-white/80">PRODUCCIÓN EN CURSO</span></div>}
        <div className={cn("absolute top-3 right-3 z-20 w-10 h-10 flex items-center justify-center transition-all", video.isPlaceholder ? "bg-brand-teal text-white" : "bg-white text-brand-black group-hover:bg-brand-teal group-hover:text-white")}><Play size={18} fill="currentColor" /></div>
      </div>
      <div className="space-y-2">
        <Badge className={cn("text-[7px] font-black uppercase px-2 py-0.5 rounded-none", video.isPlaceholder ? "bg-brand-gold" : "bg-brand-teal")}>{video.season}</Badge>
        <h4 className="text-base font-black text-white uppercase tracking-tighter leading-tight group-hover:text-brand-teal transition-colors">{video.title}</h4>
        <p className="text-white/40 text-[10px] font-medium leading-relaxed line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
}
