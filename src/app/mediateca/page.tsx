
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
  // EL CENTRO VIVE Y RESUENA CON EL SEMANARIO - SOCIALIZACIÓN
  { id: 'v-social-vive', title: 'SOCIALIZACIÓN DEL PROYECTO', season: 'DESTACADO', youtubeId: 'g23v49jUT1s', description: 'Presentación oficial de la iniciativa cultural y periodística que busca revitalizar el corazón de Medellín.', project: 'centro-vive' },

  // TEMPORADA 2 (2026) / REGISTRO ACTUALIDAD
  { id: 'v-t2-reg', title: 'EL CENTRO VIVE Y RESUENA: REGISTRO ACTUAL', season: 'TEMPORADA 2 (2026)', youtubeId: 'l530ZiOZjQk', description: 'Un faro en el corazón de Medellín - Registro 2024.', project: 'centro-vive' },
  { id: 'v-t2-confiar', title: 'CASA DE LA CULTURA Y LA COOPERACIÓN - CONFIAR', season: 'TEMPORADA 2 (2026)', youtubeId: 'pjaVRc87HXs', description: 'Registro patrimonial 2024 en el corazón de la ciudad.', project: 'centro-vive' },
  { id: 'v-t2-homero', title: 'LA CASA CULTURAL DEL TANGO - HOMERO MANZI', season: 'TEMPORADA 2 (2026)', youtubeId: 'H-xpovnPZaQ', description: 'La esquina del tango en Medellín. Tradición y bohemia.', project: 'centro-vive' },
  { id: 'v-t2-tpm', title: 'TEATRO POPULAR DE MEDELLÍN', season: 'TEMPORADA 2 (2026)', youtubeId: 'VDFE_1Cgl2g', description: 'Donde el silencio habla y la palabra vuela.', project: 'centro-vive' },
  { id: 'v-t2-pablo', title: 'TEATRO PABLO TOBÓN URIBE', season: 'TEMPORADA 2 (2026)', youtubeId: 'lrrYQthosl8', description: 'En el alma de Medellín. Un recorrido por la gestión cultural actual.', project: 'centro-vive' },

  // TEMPORADA 1 (2025)
  { id: 'v-t1-9', title: 'EPISODIO 9: LA HUERTA', season: 'TEMPORADA 1 (2025)', youtubeId: 'YaLSyFGmT5Y', description: 'Un espacio cultural en el corazón de Medellín. Soberanía alimentaria y cultura.', project: 'centro-vive' },
  { id: 'v-t1-8', title: 'EPISODIO 8: AGUA DULCE', season: 'TEMPORADA 1 (2025)', youtubeId: 'vgiHCjG4OzY', description: 'Un oasis con tres experiencias en el Parque del Periodista.', project: 'centro-vive' },
  { id: 'v-t1-7', title: 'EPISODIO 7: VIVA PALABRA', season: 'TEMPORADA 1 (2025)', youtubeId: 'jaS5sXS67Xc', description: '28 años contando cuentos en el centro de Medellín.', project: 'centro-vive' },
  { id: 'v-t1-6', title: 'EPISODIO 6: ARTE URBANO', season: 'TEMPORADA 1 (2025)', youtubeId: 'KdFvqG0qUlQ', description: 'La calle como lienzo de expresión cultural.', project: 'centro-vive' },
  { id: 'v-t1-5', title: 'EPISODIO 5: CASA DEL ENCUENTRO', season: 'TEMPORADA 1 (2025)', youtubeId: 'zMFHJfp6st4', description: 'Diálogos y saberes en un espacio histórico.', project: 'centro-vive' },
  { id: 'v-t1-4', title: 'EPISODIO 4: PEQUEÑO TEATRO', season: 'TEMPORADA 1 (2025)', youtubeId: '3nwMCxiW57E', description: '45 años de arte dramático y resistencia cultural.', project: 'centro-vive' },
  { id: 'v-t1-3', title: 'EPISODIO 3: TRADICIÓN', season: 'TEMPORADA 1 (2025)', youtubeId: 'l1nhyWNDgp0', description: 'Historias que definen nuestra identidad.', project: 'centro-vive' },
  { id: 'v-t1-2', title: 'EPISODIO 2: REGISTRO', season: 'TEMPORADA 1 (2025)', youtubeId: 'D_7TBSnII94', description: 'Primeros pasos del proyecto El Centro Vive.', project: 'centro-vive' },
  { id: 'v-t1-1', title: 'EPISODIO 1: EL ORIGEN', season: 'TEMPORADA 1 (2025)', youtubeId: 'FaGMpv2db_M', description: 'El inicio de una historia de resistencia cultural en el corazón de la ciudad.', project: 'centro-vive' },

  // CREA DIGITAL 2026
  { 
    id: 'v-2026-1', 
    title: 'CORTOMETRAJE 1: ORIGEN Y RESISTENCIA', 
    season: 'PRODUCCIÓN 2026', 
    description: 'Acto I: El contexto, el sueño fundacional y los primeros pasos de las organizaciones que habitan el centro.',
    thumbnailUrl: 'https://picsum.photos/seed/crea1/800/450',
    isPlaceholder: true,
    project: 'crea-digital'
  },
  { 
    id: 'v-2026-2', 
    title: 'CORTOMETRAJE 2: PRESENTE Y ECOSISTEMA', 
    season: 'PRODUCCIÓN 2026', 
    description: 'Acto II: El quehacer cotidiano y el impacto en el entorno. El trabajo vivo capturado desde el aire y la calle.',
    thumbnailUrl: 'https://picsum.photos/seed/crea2/800/450',
    isPlaceholder: true,
    project: 'crea-digital'
  },
  { 
    id: 'v-2026-3', 
    title: 'CORTOMETRAJE 3: FUTURO Y CIUDADANÍAS', 
    season: 'PRODUCCIÓN 2026', 
    description: 'Acto III: Los sueños por cumplir y las nuevas ciudadanías. Un cierre que abre preguntas sobre el territorio.',
    thumbnailUrl: 'https://picsum.photos/seed/crea3/800/450',
    isPlaceholder: true,
    project: 'crea-digital'
  }
];

const podcasts = [
  { 
    id: 0, 
    title: "RESUMEN HISTÓRICO: EL SEMANARIO CULTURAL", 
    duration: "MÁX. 5 MIN", 
    audioUrl: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/podcast_semanario/el-semanario.mp3",
    desc: "Medellín, 1990. Una ciudad que bullía entre la industria y una violencia que empezaba a teñir sus calles. En ese contexto nació un periódico que no hablaba de política ni de crímenes, sino de versos, cámaras y escenarios.",
    image: "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/podcast_semanario/portada-podcast.png",
    position: "center",
    zoom: 1,
    hoverClass: "bg-brand-gold/40",
    borderClass: "border-b-brand-gold",
    iconClass: "text-brand-gold",
    questions: [
      "¿Cómo nació el Semanario Cultural en 1990?",
      "¿Quiénes fueron sus fundadores?",
      "¿Cuál era el lema de la primera edición?",
      "¿Qué papel jugó la Cooperativa Confiar?"
    ]
  },
  { 
    id: 1, 
    title: "EPISODIO 1: ORÍGENES", 
    duration: "MÁX. 5 MIN", 
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    desc: "Indagamos en los inicios del Semanario Cultural como herramienta de comunicación alternativa en una ciudad que aprendía a resistir.",
    image: COLLAGE_URL,
    position: "10% 10%",
    zoom: 1.5,
    hoverClass: "bg-brand-red/40",
    borderClass: "border-b-brand-red",
    iconClass: "text-brand-red",
    questions: [
      "¿Qué motivó la creación del Semanario?",
      "¿Cómo se tejieron las primeras redes de solidaridad?",
      "¿Qué temas atravesaban sus páginas?"
    ]
  },
  { 
    id: 2, 
    title: "EPISODIO 2: VOX POPULI", 
    duration: "MÁX. 5 MIN", 
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    desc: "Exploramos las organizaciones de ayer que permanecen aún hoy, demostrando que la cultura es un eje de transformación que persiste.",
    image: COLLAGE_URL,
    position: "90% 90%",
    zoom: 1.5,
    hoverClass: "bg-brand-teal/40",
    borderClass: "border-b-brand-teal",
    iconClass: "text-brand-teal",
    questions: [
      "¿Qué organizaciones de los 90 siguen activas?",
      "¿Cómo han evolucionado sus procesos?",
      "¿Cuál es su relación con la memoria del territorio?"
    ]
  },
  { 
    id: 3, 
    title: "EPISODIO 3: PERSONAJES", 
    duration: "MÁX. 5 MIN", 
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    desc: "Testimonios de protagonistas de una época: periodistas, artistas y gestores que hicieron del periodismo cultural un escudo de resistencia.",
    image: COLLAGE_URL,
    position: "85% 15%",
    zoom: 1.5,
    hoverClass: "bg-brand-gold/40",
    borderClass: "border-b-brand-gold",
    iconClass: "text-brand-gold",
    questions: [
      "¿Quiénes fueron las voces clave?",
      "¿Qué anécdotas marcaron la década?",
      "¿Cómo ven la ciudad hoy?"
    ]
  },
  { 
    id: 4, 
    title: "EPISODIO 4: CÓMO SE CRECE", 
    duration: "MÁX. 5 MIN", 
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    desc: "Redes culturales, salas concertadas y proyectos colaborativos. Analizamos cómo se ha construido el ecosistema creativo hoy en Medellín.",
    image: COLLAGE_URL,
    position: "15% 85%",
    zoom: 1.5,
    hoverClass: "bg-brand-purple/40",
    borderClass: "border-b-brand-purple",
    iconClass: "text-brand-purple",
    questions: [
      "¿Cómo funcionan las salas concertadas?",
      "¿Cuál es el poder de los proyectos colaborativos?",
      "¿Cómo se fortalece el tejido cultural?"
    ]
  },
  { 
    id: 5, 
    title: "EPISODIO 5: NUEVAS ORGANIZACIONES", 
    duration: "MÁX. 5 MIN", 
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    desc: "Jóvenes creadores y gestores que hoy lideran la escena. Un diálogo intergeneracional sobre el derecho a la ciudad desde la cultura.",
    image: COLLAGE_URL,
    position: "50% 50%",
    zoom: 1.5,
    hoverClass: "bg-brand-olive/40",
    borderClass: "border-b-brand-olive",
    iconClass: "text-brand-olive",
    questions: [
      "¿Quiénes son los nuevos protagonistas?",
      "¿Cómo narran la ciudad hoy?",
      "¿Cuál es su visión de futuro?"
    ]
  }
];

const reels = [
  { id: 'r1', title: 'UN DÍA EN LA VIDA', youtubeId: 'jaS5sXS67Xc', description: 'Narrativa observacional de 60 segundos.' },
  { id: 'r2', title: 'EL ORIGEN EN 60"', youtubeId: 'KdFvqG0qUlQ', description: 'Condensado de la historia fundacional.' },
  { id: 'r3', title: 'MANOS QUE CREAN', youtubeId: 'lrrYQthosl8', description: 'Estudio visual sobre el trabajo manual.' },
  { id: 'r4', title: 'LO QUE MEDELLÍN NO SABE', youtubeId: 'l530ZiOZjQk', description: 'Tríptico cinematográfico que conecta organizaciones.' },
  { id: 'r5', title: 'NECESITAN TU MIRADA', youtubeId: 'YaLSyFGmT5Y', description: 'Pieza honesta donde los protagonistas responden.' }
];

const comparisons = [
  {
    id: 1,
    title: 'PUENTE DE MEMORIA',
    location: 'CENTRO HISTÓRICO',
    oldImage: `${FRAGMENTOS_BASE}/agenda-cp-puente-arch-1.png`,
    newImage: `${FRAGMENTOS_BASE}/agenda-cp-puente-arch-2.png`,
    description: 'Registro visual del puente que conecta la historia del Semanario con el presente.'
  },
  {
    id: 2,
    title: 'SISTEMAS DE INFORMACIÓN',
    location: 'REDISEÑO DIGITAL',
    oldImage: `${FRAGMENTOS_BASE}/data-stream.png`,
    newImage: `${FRAGMENTOS_BASE}/data-stream2.png`,
    description: 'La transformación de los lenguajes informativos. Del registro impreso a los flujos de datos.'
  },
  {
    id: 3,
    title: 'FRAGMENTOS DE ARCHIVO',
    location: 'MEMORIA URBANA',
    oldImage: `${FRAGMENTOS_BASE}/fragmentos-de-memoria-archivo-vivo-4.png`,
    newImage: `${FRAGMENTOS_BASE}/fragmentos-de-memoria-archivo-vivo-4-v2.png`,
    description: 'Recuperación visual de hitos emblemáticos.'
  }
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
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setActivePodcast(podcast);
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.src = podcast.audioUrl;
        audioRef.current.play();
      }
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
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(values[0]);
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const mediatecaHeroImg = PlaceHolderImages.find(img => img.id === 'multimedia-video');

  const navItems = [
    { 
      id: 'centro-vive', 
      label: 'EL CENTRO VIVE\nY RESUENA CON\NEL SEMANARIO', 
      icon: Library, 
      color: 'bg-brand-teal', 
      hoverColor: 'hover:bg-brand-teal',
      activeColor: 'data-[state=active]:bg-brand-teal'
    },
    { 
      id: 'podcasts', 
      label: 'PODCASTS:\nVOCES DE\nLA CIUDAD', 
      icon: Mic, 
      color: 'bg-brand-red', 
      hoverColor: 'hover:bg-brand-red',
      activeColor: 'data-[state=active]:bg-brand-red'
    },
    { 
      id: 'documentales', 
      label: 'SERIE: TRES\nCORTOMETRAJES', 
      icon: Video, 
      color: 'bg-brand-gold', 
      hoverColor: 'hover:bg-brand-gold',
      activeColor: 'data-[state=active]:bg-brand-gold'
    },
    { 
      id: 'reels', 
      label: 'PIEZAS PARA REDES', 
      icon: Smartphone, 
      color: 'bg-brand-purple', 
      hoverColor: 'hover:bg-brand-purple',
      activeColor: 'data-[state=active]:bg-brand-purple'
    },
    { 
      id: 'galeria', 
      label: 'GALERÍA: ANTES Y AHORA', 
      icon: ImageIcon, 
      color: 'bg-brand-olive', 
      hoverColor: 'hover:bg-brand-olive',
      activeColor: 'data-[state=active]:bg-brand-olive'
    },
    { 
      id: 'ebook', 
      label: 'E-BOOK INTERACTIVO', 
      icon: BookOpen, 
      color: 'bg-brand-ash', 
      hoverColor: 'hover:bg-brand-ash',
      activeColor: 'data-[state=active]:bg-brand-ash'
    },
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
            
            <RevealSection delay={300} className="lg:col-span-5 relative group hidden lg:block">
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
            </RevealSection>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="z-50 bg-brand-black border-y border-white/10 -mx-6 px-6 py-8 mb-16">
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between lg:hidden mb-2">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">EXPLORAR SECCIONES</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-brand-gold rounded-full animate-pulse"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">
                      {navItems.find(i => i.id === activeTab)?.label.replace(/\n/g, ' ')}
                    </span>
                  </div>
                </div>
                
                <TabsList className="bg-transparent h-auto p-0 flex flex-wrap lg:flex-nowrap gap-2 lg:gap-4 w-full justify-start overflow-visible">
                  {navItems.map((item) => (
                    <TabsTrigger 
                      key={item.id}
                      value={item.id} 
                      className={cn(
                        "flex-1 min-w-[140px] lg:min-w-0 lg:flex-1 h-24 lg:h-32 rounded-none border border-white/5 flex flex-col items-center justify-center gap-2 transition-all duration-500",
                        "bg-white text-brand-black",
                        item.hoverColor, "hover:text-white",
                        item.activeColor, "data-[state=active]:text-white data-[state=active]:border-transparent data-[state=active]:shadow-2xl"
                      )}
                    >
                      <item.icon 
                        size={20} 
                        className={cn(
                          "transition-transform group-hover:scale-110 shrink-0", 
                          activeTab === item.id ? "text-white" : "text-brand-black opacity-60 group-hover:text-white group-hover:opacity-100"
                        )} 
                      />
                      <span className="font-black uppercase text-[8px] lg:text-[9px] tracking-widest leading-tight text-center whitespace-pre-line px-1">
                        {item.label}
                      </span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>

            <TabsContent value="centro-vive" className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
              {/* Bloque de Contexto Editorial */}
              <RevealSection className="bg-[#0a1a1a] border-l-[12px] border-brand-teal p-8 md:p-12 mb-16 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 pointer-events-none">
                   <Library className="w-64 h-64" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
                  <div className="lg:col-span-8 space-y-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <Target className="text-brand-gold" size={32} />
                        <h2 className="text-2xl md:text-5xl font-black uppercase tracking-tighter leading-none">EL CENTRO VIVE Y RESUENA CON EL SEMANARIO</h2>
                      </div>
                      <p className="text-base md:text-xl font-bold text-white leading-relaxed text-justify italic">
                        "El Centro vive y resuena con el Semanario busca promover, resignificar y visibilizar el Centro de Medellín como el mayor espacio público y destino artístico por excelencia de la ciudad y lugar de encuentro social, ciudadano, multicultural, inclusivo y diverso."
                      </p>
                      <p className="text-sm md:text-base font-medium text-white/60 leading-relaxed text-justify">
                        Aquí destacamos la inmensa diversidad de sus organizaciones, las cuales nos ofrecen una múltiple y rica oferta cultural. Porque ¡El Centro de Medellín, todo en un mismo lugar!
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-white/10">
                      {[
                        { icon: Zap, label: "PROPÓSITO", text: "Cambiar la narrativa sobre el centro, destacándolo como el mayor destino artístico." },
                        { icon: Film, label: "ENFOQUE", text: "Estrategia de piezas audiovisuales y crónicas para mostrar la vibrante vida cotidiana." },
                        { icon: Heart, label: "LUGARES", text: "Enfoque en iconos patrimoniales y edificios que guardan historias vivas." },
                        { icon: Users, label: "CONEXIÓN", text: "Busca conectar a ciudadanos con el arte, el territorio y la cultura que resuena." }
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

                    <div className="flex flex-wrap gap-6 pt-8">
                       <a href="https://facebook.com/ElSemanarioHOY" target="_blank" className="flex items-center gap-3 bg-white/5 px-6 py-3 border border-white/10 hover:bg-white hover:text-brand-black transition-all">
                          <Facebook size={18} /> <span className="font-black uppercase text-[10px] tracking-widest">FACEBOOK</span>
                       </a>
                       <a href="https://instagram.com/elsemanariohoy" target="_blank" className="flex items-center gap-3 bg-white/5 px-6 py-3 border border-white/10 hover:bg-white hover:text-brand-black transition-all">
                          <Instagram size={18} /> <span className="font-black uppercase text-[10px] tracking-widest">INSTAGRAM</span>
                       </a>
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
                      <p className="text-[10px] font-bold text-white/40 uppercase leading-tight">
                        Presentación oficial de la estrategia transmedia en el corazón de la ciudad (2026).
                      </p>
                    </div>

                    <div className="p-6 bg-brand-gold/10 border border-brand-gold/20 space-y-4">
                       <div className="flex items-center gap-2">
                          <Quote className="text-brand-gold rotate-180" size={16} />
                          <span className="text-[9px] font-black uppercase tracking-widest text-brand-gold">AVAL INSTITUCIONAL</span>
                       </div>
                       <p className="text-[10px] font-bold leading-relaxed text-white/80">
                         “Proyecto Apoyado por el MINISTERIO DE LAS CULTURAS, LAS ARTES Y LOS SABERES, Programa Nacional de Concertación Cultural”
                       </p>
                       <div className="pt-2 border-t border-white/10">
                          <span className="text-[8px] font-black text-white/40 uppercase">MEDELLÍN 2025</span>
                       </div>
                    </div>
                  </div>
                </div>
              </RevealSection>

              {/* Temporadas de Video */}
              <SectionHeader badge="TEMPORADA 2 (2026)" title="EL CENTRO VIVE • ACTUALIDAD" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allVideos.filter(v => v.project === 'centro-vive' && v.season.includes('TEMPORADA 2')).map(video => (
                  <VideoCardCompact key={video.id} video={video} onClick={() => handleVideoClick(video)} />
                ))}
              </div>

              <SectionHeader badge="TEMPORADA 1 (2025)" title="EL CENTRO VIVE • SERIE" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {allVideos.filter(v => v.project === 'centro-vive' && v.season.includes('TEMPORADA 1')).map(video => (
                  <VideoCardCompact key={video.id} video={video} onClick={() => handleVideoClick(video)} />
                ))}
              </div>

              {/* Bloque de Equipo y Organizaciones */}
              <RevealSection className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-32 pt-20 border-t border-white/10">
                 <div className="lg:col-span-5 space-y-10">
                    <div className="space-y-4">
                       <Badge className="bg-brand-gold text-brand-black rounded-none tracking-widest text-[10px]">FICHA TÉCNICA</Badge>
                       <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">EQUIPO HOY</h2>
                    </div>
                    
                    <div className="space-y-8">
                       {[
                         { role: "DIRECCIÓN", name: "María Victoria Álvarez Gómez" },
                         { role: "REALIZACIÓN AUDIOVISUAL Y EDICIÓN", name: "Carlos Andrés Londoño Ruiz / @carlos.londor" },
                         { role: "PRODUCCIÓN", name: "María Cecilia Castaño Rodríguez / @duna_movil" },
                         { role: "COMUNICACIONES", name: "Estefany Rivera Orrego • Natalia Vélez Sepúlveda" },
                         { role: "IMÁGENES DRONE", name: "John Cuervo Moreno / @_cuervofilms" },
                         { role: "LOCUCIÓN", name: "Paula Úsuga Álvarez" },
                         { role: "TÉCNICO DE SONIDO", name: "Julián Álvarez Kusy" }
                       ].map((m, i) => (
                         <div key={i} className="border-l-4 border-brand-gold pl-6 space-y-1">
                            <span className="text-[8px] font-black text-brand-gold uppercase tracking-[0.2em]">{m.role}</span>
                            <p className="text-base font-black uppercase tracking-tighter">{m.name}</p>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="lg:col-span-7 space-y-10">
                    <div className="space-y-4">
                       <Badge className="bg-brand-teal text-white rounded-none tracking-widest text-[10px]">ECOSISTEMA CULTURAL</Badge>
                       <h2 className="text-4xl font-black uppercase tracking-tighter leading-none">ORGANIZACIONES PARTICIPANTES</h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       {[
                         "Agua Dulce Restaurante", "Donde Robin Bar – Tango Bar",
                         "Corporación Cultural Viva Palabra", "El Club del Jazz",
                         "Centro Cultural La Huerta", "La Casa Centro Cultural",
                         "Pequeño Teatro", "Teatro Casa Clown", "Teatro Matacandelas"
                       ].map((org, i) => (
                         <div key={i} className="bg-white/5 p-6 border border-white/5 hover:border-brand-teal transition-colors group">
                            <div className="flex items-center gap-4">
                               <div className="w-2 h-2 bg-brand-teal rounded-full" />
                               <span className="font-bold text-sm md:text-base uppercase tracking-tight group-hover:text-brand-teal transition-colors">{org}</span>
                            </div>
                         </div>
                       ))}
                    </div>

                    <div className="pt-10 space-y-6">
                       <div className="p-8 border-2 border-brand-teal/20 bg-brand-teal/5 space-y-4">
                          <span className="text-[9px] font-black text-brand-teal uppercase tracking-[0.3em]">AGRADECIMIENTOS ESPECIALES</span>
                          <p className="text-xl font-black uppercase tracking-tighter">Caminá pa'l Centro - Agenda cultural</p>
                       </div>
                    </div>
                 </div>
              </RevealSection>
            </TabsContent>

            <TabsContent value="podcasts" className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
              {activePodcast && (
                <RevealSection className="max-w-5xl mx-auto bg-[#0f0f0f] border-2 border-brand-teal p-0 shadow-2xl relative overflow-hidden group mb-16">
                  <div className="absolute top-0 right-0 p-4 z-20">
                    <div className="flex gap-1.5">
                      {[1,2,3,4].map(i => (
                        <div key={i} className={cn("w-1 h-4 bg-brand-teal/40", isPlaying && "animate-pulse")} style={{ animationDelay: `${i * 0.2}s` }} />
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 relative z-10">
                    <div className="lg:col-span-3 relative aspect-video lg:aspect-auto h-full overflow-hidden bg-brand-black flex flex-col items-center justify-center p-4 lg:p-6 border-b lg:border-b-0 lg:border-r border-white/10">
                      <div className="relative w-full aspect-video lg:aspect-square shadow-2xl border-2 border-brand-teal/30">
                        <img src={activePodcast.image} className="w-full h-full object-cover" alt="" style={{ objectPosition: activePodcast.position, transform: `scale(${activePodcast.zoom || 1})` }} />
                        <div className="absolute inset-0 bg-brand-black/20 mix-blend-multiply" />
                      </div>
                    </div>
                    <div className="lg:col-span-6 p-6 lg:p-8 space-y-6">
                      <div>
                        <Badge className="bg-brand-gold text-brand-black rounded-none text-[8px] tracking-[0.3em] mb-3 uppercase border-none">SINTONIZANDO</Badge>
                        <h2 className="text-xl lg:text-3xl font-black uppercase tracking-tighter text-white leading-tight">{activePodcast.title}</h2>
                        <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest mt-2">{activePodcast.duration} • VOCES DEL CENTRO</p>
                      </div>
                      <div className="space-y-3">
                        <Slider value={[progress]} max={100} step={0.1} onValueChange={handleSeek} className="cursor-pointer" />
                        <div className="flex justify-between text-[10px] font-black font-mono text-brand-teal uppercase tracking-[0.2em]">
                          <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
                          <span>{formatTime(duration)}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 lg:gap-6">
                        <button onClick={() => handlePlayPodcast(activePodcast)} className="w-16 h-16 bg-brand-teal text-white flex items-center justify-center rounded-none shadow-2xl hover:bg-white hover:text-brand-teal transition-all">
                          {isPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" className="ml-1" />}
                        </button>
                        <div className="flex items-center gap-4">
                          <button className="text-white/30 hover:text-brand-teal transition-all p-2"><SkipBack size={24} /></button>
                          <button className="text-white/30 hover:text-brand-teal transition-all p-2"><SkipForward size={24} /></button>
                        </div>
                      </div>
                    </div>
                    <div className="lg:col-span-3 bg-brand-teal/5 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l-2 border-brand-teal self-stretch flex flex-col justify-center overflow-hidden">
                      <span className="text-xs font-black uppercase text-brand-teal block mb-5 tracking-widest">ESTADO DEL CANAL</span>
                      <p className="text-xs lg:text-[13px] font-medium leading-relaxed text-white/70 italic text-justify">"{activePodcast.desc}"</p>
                    </div>
                  </div>
                </RevealSection>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {podcasts.map(pod => (
                  <div key={pod.id} className={cn("bg-[#1a1a1a] border border-white/10 overflow-hidden group hover:bg-white/5 transition-all border-b-[6px] flex flex-col shadow-2xl", pod.borderClass, activePodcast?.id === pod.id && "ring-2 ring-white/20")}>
                    <div className="relative aspect-video w-full overflow-hidden">
                      <img src={pod.image} alt={pod.title} className="object-cover w-full h-full transition-transform duration-1000 group-hover:scale-110" style={{ objectPosition: pod.position, transform: `scale(${pod.zoom || 1})` }} />
                      <div className={cn("absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10", pod.hoverClass)} />
                      <button onClick={() => handlePlayPodcast(pod)} className="absolute inset-0 flex items-center justify-center z-20">
                         <div className="w-16 h-16 bg-white text-brand-black flex items-center justify-center transition-all shadow-2xl">
                            {activePodcast?.id === pod.id && isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                         </div>
                      </button>
                    </div>
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex justify-between items-start mb-4">
                        <span className={cn("text-[9px] font-black uppercase tracking-widest block", pod.iconClass)}>{pod.duration}</span>
                      </div>
                      <h3 className="text-xl font-black uppercase tracking-tighter mb-4 leading-none">{pod.title}</h3>
                      <p className="text-white/40 text-xs font-medium leading-relaxed mb-6 flex-grow line-clamp-4">{pod.desc}</p>
                      <div className="space-y-3 pt-6 border-t border-white/5">
                        <span className="text-[7px] font-black uppercase text-brand-gold tracking-[0.2em]">PREGUNTAS ORIENTADORAS:</span>
                        <ul className="space-y-2">
                          {pod.questions.map((q, i) => (
                            <li key={i} className="text-[9px] font-bold opacity-50 flex gap-2 leading-tight group-hover:opacity-80 transition-opacity">
                              <span className={pod.iconClass}>•</span> {q}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="documentales" className="space-y-20 animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
              <SectionHeader badge="CREA DIGITAL 2026" title="MICRO-DOCUMENTALES EN DESARROLLO" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-12">
                {allVideos.filter(v => v.project === 'crea-digital').map((video) => (
                  <VideoCardCompact key={video.id} video={video} onClick={() => handleVideoClick(video)} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reels" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
              <SectionHeader badge="REDES SOCIALES" title="NARRATIVAS VERTICALES" />
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
                {reels.map(reel => (
                  <div key={reel.id} className="group relative aspect-[9/16] bg-muted overflow-hidden border border-white/10 cursor-pointer" onClick={() => handleVideoClick({ youtubeId: reel.youtubeId, title: reel.title })}>
                    <img src={`https://i.ytimg.com/vi/${reel.youtubeId}/maxresdefault.jpg`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60" alt={reel.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center">
                       <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-brand-red transition-all">
                          <Play className="text-white fill-current" size={24} />
                       </div>
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-center">
                       <span className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-gold mb-2 block">CLIP REDES</span>
                       <h3 className="text-lg font-black uppercase tracking-tighter text-white leading-none">{reel.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="galeria" className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
              <SectionHeader badge="MEMORIA VISUAL" title="CRÓNICAS DEL TIEMPO" />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {comparisons.map(item => (
                  <div key={item.id} className="bg-[#1a1a1a] border border-white/5 p-6 lg:p-8 space-y-10 group hover:bg-[#222] transition-all duration-500 shadow-2xl relative">
                    <div className="flex justify-between items-start">
                       <div className="space-y-2">
                          <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tighter text-white leading-none">{item.title}</h3>
                          <div className="flex items-center gap-2 text-brand-teal">
                             <MapPin size={14} className="fill-current" />
                             <span className="text-[11px] font-black uppercase tracking-[0.2em]">{item.location}</span>
                          </div>
                       </div>
                       <History size={24} className="text-brand-gold" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 h-60 lg:h-80 relative">
                       <div className="relative overflow-hidden group/img bg-muted">
                          <img src={item.oldImage} className="w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 transition-all duration-1000" alt="Antaño" />
                          <div className="absolute top-2 left-2 bg-brand-black/80 backdrop-blur-md text-white px-3 py-1.5 text-[8px] font-black uppercase tracking-widest border border-white/10 z-20">ANTAÑO</div>
                       </div>
                       <div className="relative overflow-hidden group/img bg-muted">
                          <img src={item.newImage} className="w-full h-full object-cover transition-all duration-1000 group-hover/img:scale-105" alt="Actualidad" />
                          <div className="absolute top-2 left-2 bg-brand-gold text-brand-black px-3 py-1.5 text-[8px] font-black uppercase tracking-widest shadow-2xl z-20">ACTUALIDAD</div>
                       </div>
                    </div>
                    <div className="border-l-[6px] border-brand-teal pl-6 lg:pl-8 py-2">
                      <p className="text-white/60 text-sm lg:text-base font-medium leading-relaxed text-justify">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="ebook" className="animate-in fade-in slide-in-from-bottom-4 duration-700 outline-none">
              <div className="max-w-6xl mx-auto">
                <div className="bg-brand-gold text-brand-black text-center lg:text-left flex flex-col lg:flex-row relative overflow-hidden group shadow-[20px_20px_0px_0px_rgba(217,160,47,0.1)]">
                  <div className="relative w-full lg:w-1/2 aspect-[4/5] lg:aspect-auto overflow-hidden bg-brand-black">
                     <img src="https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/archivo/portadas/collage.jpg" className="object-cover w-full h-full opacity-80" alt="Ebook Cover" />
                     <div className="absolute bottom-6 left-6 lg:bottom-10 lg:left-10 z-20">
                        <Badge className="bg-white text-brand-black font-black px-4 py-1 mb-4 rounded-none text-[9px] tracking-widest shadow-xl">PRÓXIMO LANZAMIENTO</Badge>
                        <h2 className="text-white font-black text-3xl lg:text-4xl tracking-tighter uppercase leading-[0.8]">ARCHIVO <br /> VIVO</h2>
                     </div>
                  </div>
                  <div className="relative z-10 flex flex-col p-8 lg:p-20 justify-center lg:w-1/2">
                    <div className="space-y-8">
                      <div className="flex items-center gap-4 justify-center lg:justify-start">
                         <BookOpen size={40} className="text-brand-black" />
                         <span className="text-[10px] lg:text-[12px] font-black uppercase tracking-[0.4em]">E-BOOK OFICIAL • HOY</span>
                      </div>
                      <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter leading-[0.9]">ARCHIVO VIVO: UNA HISTORIA DEL SEMANARIO HOY</h2>
                      <p className="font-bold text-base lg:text-lg leading-relaxed max-w-xl">Un PDF interactivo que funciona como puerta de entrada para públicos que se acercan por primera vez al archivo.</p>
                      <button className="flex items-center gap-4 justify-center bg-brand-black text-white px-8 py-5 font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-brand-black transition-all shadow-2xl w-full lg:w-fit">
                        SOLICITAR PRE-ACCESO <Download size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
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
      <h2 className="text-xl md:text-4xl font-black uppercase tracking-tighter leading-[0.85] text-white">
        {title}
      </h2>
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
        <Badge className={cn("text-[7px] font-black uppercase px-2 py-0.5 rounded-none", video.isPlaceholder ? "bg-brand-gold" : "bg-brand-teal")}>
          {video.season}
        </Badge>
        <h4 className="text-base font-black text-white uppercase tracking-tighter leading-tight group-hover:text-brand-teal transition-colors">{video.title}</h4>
        <p className="text-white/40 text-[10px] font-medium leading-relaxed line-clamp-2">{video.description}</p>
      </div>
    </div>
  );
}
