'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Play, Pause, SkipForward, SkipBack, MapPin, 
  RefreshCw, Volume2, Maximize2, Minimize2, X, 
  VolumeX, Signal, Info, Target
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSoundEffects } from '@/hooks/use-sound-effects';

interface Station {
  name: string;
  location: string;
  url: string;
  format: string;
}

const STATIONS: Station[] = [
  { name: "RADIO PARADISE", location: "GLOBAL (ROCK)", url: "https://stream.radioparadise.com/rock-128", format: "AAC" },
  { name: "GROOVE SALAD", location: "SOMA FM (AMBIENT)", url: "https://ice1.somafm.com/groovesalad-128-mp3", format: "MP3" },
  { name: "DRONE ZONE", location: "SOMA FM (ATMOS)", url: "https://ice1.somafm.com/dronezone-128-mp3", format: "MP3" },
  { name: "FIP RADIO", location: "FRANCIA (CULTURAL)", url: "https://icecast.radiofrance.fr/fip-midfi.mp3", format: "MP3" },
  { name: "RADIO CALICO", location: "USA (INDIE)", url: "https://stream.radio-calico.com/calico", format: "STREAM" },
  { name: "RETRO SQUAD", location: "INDONESIA (HIGH)", url: "https://radio.retrosquad.id/listen/retrosquad/high", format: "STREAM" },
  { name: "BIG R 90s", location: "USA (90s HITS)", url: "https://bigrradio.cdnstream1.com/5174_128", format: "MP3" },
  { name: "SUN SOUL FUNK", location: "FRANCIA (SOUL)", url: "https://diffusion.lafrap.fr/sun-soul.funk.mp3", format: "MP3" },
  { name: "MAGIC RADIO", location: "GLOBAL (HI-FI)", url: "https://mp3.magic-radio.net/max192", format: "MP3" },
  { name: "RADIO EDUCACIÓN", location: "MÉXICO (CULTURA)", url: "https://playerservices.streamtheworld.com/api/livestream-redirect/XEPHAMAAC_SC", format: "AAC" },
  { name: "TROPICALISIMA", location: "USA (TROPICAL)", url: "http://tropicalisima.net:8000/tropicalisima.mp3", format: "MP3" },
  { name: "DOMIPLAY", location: "LATIN HITS", url: "http://radio.domiplay.net:2002/;stream.mp3", format: "MP3" },
  { name: "181.FM ROCK", location: "USA (80s ROCK)", url: "http://relay.181.fm:8066/", format: "STREAM" },
  { name: "SUN ROCK", location: "FRANCIA (ROCK)", url: "https://diffusion.lafrap.fr/sun-rock.mp3", format: "MP3" },
  { name: "SUN METAL", location: "FRANCIA (METAL)", url: "https://diffusion.lafrap.fr/sun-metal.mp3", format: "MP3" },
  { name: "SUN HIP HOP", location: "FRANCIA (HIP-HOP)", url: "https://diffusion.lafrap.fr/sun-hip-hop.mp3", format: "MP3" },
  { name: "SUN ELECTRO", location: "FRANCIA (ELECTRONIC)", url: "https://diffusion.lafrap.fr/sun-electro.mp3", format: "MP3" },
  { name: "RETRO DANCEWAVE", location: "EUROPA (DANCE)", url: "http://retro.dancewave.online/retrodance.mp3", format: "MP3" },
  { name: "ANTENNE 80s", location: "ALEMANIA (80s)", url: "http://mp3channels.webradio.antenne.de/80er-kulthits", format: "STREAM" },
  { name: "CASHMERE RADIO", location: "BERLÍN (INDIE)", url: "http://cashmereradio.out.airtime.pro:8000/cashmereradio_a", format: "STREAM" },
  { name: "NETIL RADIO", location: "LONDRES (GLOBAL)", url: "http://netilradio.out.airtime.pro:8000/netilradio_a", format: "STREAM" },
  { name: "RESONANCE FM", location: "LONDRES (ART)", url: "http://stream.resonance.fm:8000/resonance", format: "STREAM" },
  { name: "SUN JAZZ", location: "FRANCIA (JAZZ)", url: "https://diffusion.lafrap.fr/sun-jazz.mp3", format: "MP3" },
  { name: "SUN CLASSIQUE", location: "FRANCIA (CLASSIC)", url: "https://diffusion.lafrap.fr/sun-classique.mp3", format: "MP3" },
  { name: "REMUSICA", location: "CHILE (RETRO)", url: "https://remusica.cl/medios/remusica/", format: "STREAM" },
  { name: "CLUB RETRO HITS", location: "CHILE (80s/90s)", url: "https://clubretrohits.cl/medios/club-retrohits/", format: "STREAM" },
  { name: "INC. RETRO", location: "CHILE (CLASSICS)", url: "https://incondicionalmenteretro.cl/medios/incondicionalmente-retro/", format: "STREAM" },
  { name: "RADIO ABF", location: "GLOBAL (UHD)", url: "http://stream.radioabf.com:8000/abf-uhd.flac", format: "FLAC" },
  { name: "OPENSKY RADIO", location: "FRANCIA (HQ)", url: "https://audio.opensky.radio:8082/flac", format: "FLAC" },
  { name: "BLUESWAVE", location: "GLOBAL (BLUES)", url: "http://blueswave.radio:8050/FlacBlues", format: "FLAC" },
  { name: "RADIO ENERGY", location: "SUIZA (HITS)", url: "https://stream.radioenergy.to/stream", format: "STREAM" },
  { name: "SUN JUNIOR", location: "FRANCIA (KIDS)", url: "https://diffusion.lafrap.fr/sun-junior.mp3", format: "MP3" },
  { name: "SUN NOUVO", location: "FRANCIA (NEW)", url: "https://diffusion.lafrap.fr/sun-nouvo.mp3", format: "MP3" },
  { name: "SUN CINE SERIES", location: "FRANCIA (OST)", url: "https://diffusion.lafrap.fr/sun-cine-series.mp3", format: "MP3" },
  { name: "FLAC OGG", location: "GLOBAL (HQ)", url: "https://mscp4.live-streams.nl:8142/flac.ogg", format: "OGG" }
];

const LOGO_URL = "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/logo-amarillo.png";

type TabType = 'player' | 'about' | 'purpose';

function MeshVisualizer({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 20;

    const init = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (active ? 1.2 : 0.2),
          vy: (Math.random() - 0.5) * (active ? 1.2 : 0.2),
          radius: Math.random() * 1.5 + 0.5
        });
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = active ? 'rgba(217, 160, 47, 0.4)' : 'rgba(255, 255, 255, 0.1)';
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 100) {
            ctx.beginPath();
            ctx.strokeStyle = active ? `rgba(217, 160, 47, ${0.2 * (1 - dist/100)})` : `rgba(255, 255, 255, ${0.05 * (1 - dist/100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const handleResize = () => init();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export function RadioWidget() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [status, setStatus] = useState('SYSTEM IDLE');
  const [isLoading, setIsLoading] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('player');
  const { playClick, playHover } = useSoundEffects();
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentStation = STATIONS[currentIndex];

  useEffect(() => {
    setMounted(true);
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.crossOrigin = "anonymous";
    }

    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume / 100;

    const handlePlaying = () => {
      setStatus(`LIVE: ${STATIONS[currentIndex].name}`);
      setIsLoading(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
      setStatus(`SYNCING SIGNAL...`);
    };

    const handleError = () => {
      setStatus(`SIGNAL LOST`);
      setIsLoading(false);
      if (isPlaying) setTimeout(() => nextStation(), 3000);
    };

    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('error', handleError);
    };
  }, [currentIndex, isMuted, volume, isPlaying]);

  const loadAndPlay = (index: number) => {
    if (!audioRef.current) return;
    setIsLoading(true);
    setCurrentIndex(index);
    setStatus(`TUNING...`);
    
    audioRef.current.pause();
    audioRef.current.src = STATIONS[index].url;
    audioRef.current.load();
    
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch((e) => {
        console.error("Audio play error:", e);
        setStatus('LINK BROKEN');
        setIsLoading(false);
      });
    }
  };

  const togglePlay = () => {
    playClick();
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setStatus('STANDBY MODE');
    } else {
      if (pathname !== '/mediateca') setIsFloating(true);
      
      const currentSrc = audioRef.current.src;
      if (!currentSrc || currentSrc === "" || currentSrc === window.location.href) {
        loadAndPlay(currentIndex);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => loadAndPlay(currentIndex));
      }
    }
  };

  const nextStation = () => {
    playClick();
    let next;
    if (isShuffle) {
      next = Math.floor(Math.random() * STATIONS.length);
      while (next === currentIndex && STATIONS.length > 1) {
        next = Math.floor(Math.random() * STATIONS.length);
      }
    } else {
      next = (currentIndex + 1) % STATIONS.length;
    }
    loadAndPlay(next);
  };

  const prevStation = () => {
    playClick();
    const prev = (currentIndex - 1 + STATIONS.length) % STATIONS.length;
    loadAndPlay(prev);
  };

  const handleClose = () => {
    playClick();
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    setIsPlaying(false);
    setIsFloating(false);
    setIsMinimized(false);
    setIsVisible(false);
    setTimeout(() => setIsVisible(true), 2000);
  };

  if (!mounted) return null;

  const isMediateca = pathname === '/mediateca';
  if (!isMediateca && !isFloating && !isPlaying) return null;
  if (!isVisible) return null;

  if (isMinimized && (isFloating || !isMediateca)) {
    return (
      <div 
        className="fixed bottom-8 right-8 z-[300] flex items-center bg-brand-gold h-[60px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] animate-in slide-in-from-right duration-500 overflow-hidden cursor-pointer group select-none"
        onMouseEnter={playHover}
        onClick={() => { playClick(); setIsMinimized(false); }}
      >
        <div className="flex items-center px-5 gap-4 h-full">
          <img src={LOGO_URL} alt="NC" className={cn("w-6 h-6 object-contain brightness-0", isPlaying && "animate-pulse")} />
          <div className="flex flex-col min-w-[100px]">
            <span className="text-[7px] font-black uppercase tracking-[0.2em] text-brand-black/60 leading-none mb-1">ON AIR</span>
            <span className="text-[10px] font-black uppercase text-brand-black truncate max-w-[120px] leading-none tracking-tight">{currentStation.name}</span>
          </div>
        </div>
        <button className="h-full w-12 bg-brand-black flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-black transition-all">
          <Maximize2 size={16} strokeWidth={3} />
        </button>
      </div>
    );
  }

  const containerClasses = (isFloating || !isMediateca)
    ? "fixed bottom-8 right-6 md:right-8 z-[300] w-[calc(100%-3rem)] md:w-[480px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] animate-in zoom-in-95 duration-300"
    : "max-w-4xl mx-auto shadow-2xl mb-12 border-2 border-white/5";

  return (
    <section className={cn("relative transition-all duration-700", (isFloating || !isMediateca) ? "p-0" : "py-12 bg-brand-black text-white")}>
      <div className={cn("bg-[#0a0a0f] border-2 border-white/10 relative overflow-hidden rounded-none h-[460px] flex flex-col", containerClasses)}>
        
        {/* BARRA SUPERIOR (DORADA) */}
        <div className="bg-brand-gold flex justify-between items-center h-12 border-b-2 border-brand-black relative shrink-0">
          <div className="flex h-full items-center">
            <div className="flex h-full">
              {[
                { id: 'player', icon: Signal },
                { id: 'about', icon: Info },
                { id: 'purpose', icon: Target },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => { playClick(); setActiveTab(tab.id as TabType); }}
                  className={cn(
                    "flex items-center justify-center w-12 h-full transition-all border-r border-brand-black/10",
                    activeTab === tab.id 
                      ? "bg-brand-black text-brand-gold shadow-[inset_0_4px_10px_rgba(0,0,0,0.5)]" 
                      : "hover:bg-black/10 text-brand-black/60"
                  )}
                >
                  <tab.icon size={16} strokeWidth={3} />
                </button>
              ))}
            </div>

            <div className="flex items-center px-6 h-full border-l border-brand-black/10">
               <span className="text-[9px] font-black uppercase tracking-[0.1em] text-brand-black whitespace-nowrap">
                 NC RADIO // ARCHIVO MULTI-MODAL
               </span>
            </div>
          </div>

          <div className="flex gap-2 px-4 items-center shrink-0">
            {(isFloating || !isMediateca) ? (
              <button onClick={() => { playClick(); setIsMinimized(true); }} className="text-brand-black/60 hover:text-brand-black transition-colors">
                <Minimize2 size={16} strokeWidth={3} />
              </button>
            ) : (
              <button onClick={() => { playClick(); setIsFloating(true); }} className="text-brand-black/60 hover:text-brand-black transition-colors">
                <Maximize2 size={16} strokeWidth={3} />
              </button>
            )}
            <button onClick={handleClose} className="text-brand-black/60 hover:text-brand-red transition-all ml-2">
              <X size={20} strokeWidth={3} />
            </button>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="flex-grow flex flex-col bg-gradient-to-b from-[#12121a] to-[#0a0a0f] relative p-6 justify-between overflow-hidden">
          
          {activeTab === 'player' && (
            <>
              {/* DISPLAY DE ESTACIÓN (CON NODOS) */}
              <div className="bg-brand-gold/5 border border-brand-gold/20 relative overflow-hidden h-28 flex flex-col justify-center px-8 shadow-inner shrink-0">
                <MeshVisualizer active={isPlaying && !isLoading} />
                <div className="relative z-10 space-y-1">
                  <span className="text-[8px] font-black uppercase text-brand-gold tracking-[0.4em] opacity-60">SOURCE_SIGNAL</span>
                  <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-tight truncate">{currentStation.name}</h3>
                  <div className="flex items-center gap-2 text-[9px] font-bold text-white/40 uppercase tracking-widest">
                    <MapPin size={12} className="text-brand-gold" /> {currentStation.location}
                  </div>
                </div>
              </div>

              {/* CONTROLES DE CONSOLA */}
              <div className="flex items-center justify-center gap-10 py-6">
                <div className="flex flex-col items-center gap-2 group">
                  <button onClick={prevStation} className="w-14 h-14 flex items-center justify-center border-2 border-white/10 group-hover:border-brand-gold text-white hover:text-brand-gold transition-all active:scale-95">
                    <SkipBack size={24} />
                  </button>
                  <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.4em] group-hover:text-brand-gold">PREV</span>
                </div>

                <div className="flex flex-col items-center gap-2 group">
                  <button 
                    onClick={togglePlay} 
                    disabled={isLoading}
                    className="w-20 h-20 flex items-center justify-center bg-white text-brand-black shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all active:scale-95"
                  >
                    {isLoading ? <RefreshCw size={32} className="animate-spin" /> : isPlaying ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-1.5" />}
                  </button>
                  <span className="text-[10px] font-black text-brand-gold uppercase tracking-[0.5em] group-hover:scale-110 transition-transform">PLAY / PAUSE</span>
                </div>

                <div className="flex flex-col items-center gap-2 group">
                  <button onClick={nextStation} className="w-14 h-14 flex items-center justify-center border-2 border-white/10 group-hover:border-brand-gold text-white hover:text-brand-gold transition-all active:scale-95">
                    <SkipForward size={24} />
                  </button>
                  <span className="text-[9px] font-black text-white/60 uppercase tracking-[0.4em] group-hover:text-brand-gold">NEXT</span>
                </div>
              </div>

              {/* FOOTER DE DISPLAY (GAIN / STATION) */}
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5 shrink-0">
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">GAIN</span>
                    <span className="text-[9px] font-mono text-brand-gold font-bold">{isMuted ? 'OFF' : volume}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-grow bg-white/5 h-7 p-1 border border-white/10 relative overflow-hidden">
                      <input type="range" min="0" max="100" value={isMuted ? 0 : volume} onChange={(e) => { setVolume(parseInt(e.target.value)); setIsMuted(false); }} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" />
                      <div className="h-full bg-brand-gold/40 border-r-2 border-brand-gold transition-all" style={{ width: `${isMuted ? 0 : volume}%` }} />
                    </div>
                    <button onClick={() => { playClick(); setIsMuted(!isMuted); }} className={cn("w-9 h-9 flex items-center justify-center transition-all bg-white/5 border border-white/10 shrink-0", isMuted ? "text-brand-red" : "text-white/30 hover:text-brand-gold")}>
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em]">STATION</span>
                    <button onClick={() => { playClick(); setIsShuffle(!isShuffle); }} className={cn("text-[8px] font-black uppercase px-2 py-0.5 border transition-all", isShuffle ? "bg-brand-gold border-brand-gold text-brand-black" : "text-white/20 border-white/10")}>RND</button>
                  </div>
                  <div className="relative">
                    <select value={currentIndex} onChange={(e) => loadAndPlay(parseInt(e.target.value))} className="bg-white/5 border border-white/10 text-brand-gold text-[10px] font-black uppercase p-2 w-full appearance-none focus:outline-none font-mono cursor-pointer h-7">
                      {STATIONS.map((st, idx) => (<option key={idx} value={idx} className="bg-[#0d0d12] text-white">{st.name}</option>))}
                    </select>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'about' && (
            <div className="animate-in slide-in-from-bottom-2 duration-500 space-y-6 h-full flex flex-col justify-center px-4 overflow-hidden">
              <div className="space-y-2 shrink-0">
                <div className="flex items-center gap-3">
                  <img src={LOGO_URL} alt="NC" className="w-8 h-8 object-contain" />
                  <div>
                    <h4 className="text-xl font-black uppercase tracking-widest text-white leading-none">NÚCLEO/RADIO</h4>
                    <p className="text-[9px] font-black text-brand-gold uppercase tracking-[0.2em] mt-1">La voz viva de Núcleo Colectivo</p>
                  </div>
                </div>
              </div>
              <p className="text-[11px] text-white/70 leading-relaxed text-justify font-medium italic">
                "Sintetizador global de frecuencias experimentales, comunitarias y culturales. Curaduría viva de radios independientes + producciones sonoras propias."
              </p>
              <div className="space-y-3 pt-4 border-t border-white/10">
                <h5 className="text-[10px] font-black uppercase text-brand-gold tracking-widest">Definición del Sistema</h5>
                <p className="text-[10px] text-white/60 leading-relaxed">
                  Plataforma sonora digital que nace como espacio de escucha, curaduría y circulación cultural. No es solo una emisora online, sino una vitrina sonora viva que conecta radios independientes y proyectos experimentales del mundo.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'purpose' && (
            <div className="animate-in slide-in-from-bottom-2 duration-500 space-y-6 h-full flex flex-col justify-center px-4 overflow-hidden">
              <div className="space-y-1 shrink-0">
                <h4 className="text-xl font-black uppercase tracking-widest text-white border-l-4 border-brand-teal pl-4">EL ECOSISTEMA</h4>
                <p className="text-[9px] font-black text-brand-teal uppercase tracking-[0.3em] pl-5">Articulación</p>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-[10px] font-black uppercase text-white/40 mb-1">Comunidad</h5>
                  <p className="text-[11px] text-white/80 leading-relaxed font-bold uppercase tracking-tight">
                    Artistas, gestores, estudiantes y comunidades conectadas. Un espacio para contenidos culturales no hegemónicos.
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h5 className="text-[10px] font-black uppercase text-white/40 mb-1">Funciones</h5>
                  {[
                    "Vitrina de proyectos culturales y artísticos",
                    "Herramienta pedagógica IA/Sonido",
                    "Difusión de talleres y procesos"
                  ].map((func, i) => (
                    <div key={i} className="flex items-center gap-3 text-[10px] font-black text-white/60 uppercase tracking-[0.1em]">
                      <span className="text-brand-gold">›</span> {func}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* LÍNEA DE MARCA INFERIOR */}
        <div className="flex h-1.5 w-full shrink-0">
          <div className="flex-1 bg-brand-gold"></div>
          <div className="flex-1 bg-brand-teal"></div>
          <div className="flex-1 bg-brand-red"></div>
          <div className="flex-1 bg-brand-purple"></div>
        </div>
      </div>
    </section>
  );
}
