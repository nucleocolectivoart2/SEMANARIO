
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { 
  Play, Pause, SkipForward, SkipBack, MapPin, 
  RefreshCw, Volume2, Maximize2, Minimize2, X, 
  VolumeX, Shuffle, Signal, Wifi, AlertTriangle,
  Activity, ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { RevealSection } from '@/components/RevealSection';
import { useSoundEffects } from '@/hooks/use-sound-effects';

interface Station {
  name: string;
  location: string;
  url: string;
  format: string;
}

const STATIONS: Station[] = [
  { name: "RADIO PARADISE", location: "GLOBAL (ROCK)", url: "https://stream.radioparadise.com/rock-128", format: "AAC" },
  { name: "FIP RADIO", location: "FRANCIA (CULTURAL)", url: "https://icecast.radiofrance.fr/fip-midfi.mp3", format: "MP3" },
  { name: "SALSA DEL CENTRO", location: "LATINOAMÉRICA", url: "http://radio.domiplay.net:2002/;stream.mp3", format: "MP3" },
  { name: "GROOVE SALAD", location: "SOMA FM (AMBIENT)", url: "https://ice1.somafm.com/groovesalad-128-mp3", format: "MP3" },
  { name: "SUN SOUL & FUNK", location: "FRANCIA", url: "https://diffusion.lafrap.fr/sun-soul.funk.mp3", format: "MP3" },
  { name: "BIG R 90s FM", location: "USA (HITS 90s)", url: "https://bigrradio.cdnstream1.com/5174_128", format: "MP3" },
  { name: "AWESOME 80s", location: "181.FM (HITS 80s)", url: "http://relay.181.fm:8000/", format: "MP3" },
  { name: "SUN JAZZ", location: "FRANCIA", url: "https://diffusion.lafrap.fr/sun-jazz.mp3", format: "MP3" },
  { name: "RADIO CALICO", location: "USA (ALTERNATIVE)", url: "https://stream.radio-calico.com/calico", format: "AAC" },
  { name: "TROPICALÍSIMA", location: "MIAMI (SALSA)", url: "http://tropicalisima.net:8000/tropicalisima.mp3", format: "MP3" }
];

const LOGO_URL = "https://raw.githubusercontent.com/nucleocolectivoart2/SEMANARIO/main/img/logo-amarillo.png";

function MeshVisualizer({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];
    const particleCount = 25;

    const init = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (active ? 1.2 : 0.1),
          vy: (Math.random() - 0.5) * (active ? 1.2 : 0.1),
          radius: Math.random() * 1.5 + 0.5
        });
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = active ? 'rgba(217, 160, 47, 0.15)' : 'rgba(255, 255, 255, 0.03)';
      ctx.fillStyle = active ? 'rgba(217, 160, 47, 0.6)' : 'rgba(255, 255, 255, 0.05)';

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 70) {
            ctx.beginPath();
            ctx.lineWidth = active ? 0.5 : 0.2;
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

  return <canvas ref={canvasRef} className="w-full h-24 opacity-80" />;
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
  const [hasError, setHasError] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isShuffle, setIsShuffle] = useState(false);
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
      setStatus(`STREAMING: ${STATIONS[currentIndex].name}`);
      setIsLoading(false);
      setHasError(false);
    };

    const handleWaiting = () => {
      setIsLoading(true);
      setStatus(`SYNCING SIGNAL...`);
    };

    const handleError = () => {
      setStatus(`SIGNAL LOST - RETRYING...`);
      setIsLoading(true);
      setHasError(true);
      const timer = setTimeout(() => {
        nextStation();
      }, 4000);
      return () => clearTimeout(timer);
    };

    audio.addEventListener('playing', handlePlaying);
    audio.addEventListener('waiting', handleWaiting);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('playing', handlePlaying);
      audio.removeEventListener('waiting', handleWaiting);
      audio.removeEventListener('error', handleError);
    };
  }, [currentIndex, isMuted, volume]);

  const loadAndPlay = (index: number) => {
    if (!audioRef.current) return;
    setIsLoading(true);
    setHasError(false);
    setCurrentIndex(index);
    setStatus(`TUNING ${STATIONS[index].name}...`);
    
    audioRef.current.pause();
    audioRef.current.src = STATIONS[index].url;
    audioRef.current.load();
    
    if (isPlaying) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          setStatus('LINK BROKEN - AUTO SCANNING...');
          setIsLoading(false);
          setHasError(true);
        });
      }
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
      setIsPlaying(true);
      if (pathname !== '/mediateca') setIsFloating(true);
      
      if (!audioRef.current.src || audioRef.current.src === "") {
        loadAndPlay(currentIndex);
      } else {
        audioRef.current.play().catch(() => loadAndPlay(currentIndex));
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
        className="fixed bottom-8 right-8 z-[300] flex items-center bg-brand-gold h-[70px] shadow-[0_20px_50px_rgba(0,0,0,0.4)] animate-in slide-in-from-right duration-500 overflow-hidden cursor-pointer group select-none"
        onMouseEnter={playHover}
        onClick={() => {
          playClick();
          setIsMinimized(false);
        }}
      >
        <div className="flex items-center px-6 gap-5 h-full">
          <div className="relative">
            <div className="w-10 h-10 flex items-center justify-center bg-brand-black/10 rounded-full">
              <img src={LOGO_URL} alt="NC" className={cn("w-7 h-7 object-contain brightness-0", isPlaying && "animate-pulse")} />
            </div>
            {isPlaying && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-brand-red rounded-full border-2 border-brand-gold animate-ping" />
            )}
          </div>
          <div className="flex flex-col min-w-[120px]">
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-brand-black/60 leading-none mb-1.5">ON AIR</span>
            <span className="text-[11px] font-black uppercase text-brand-black truncate max-w-[140px] leading-none tracking-tight">{currentStation.name}</span>
          </div>
        </div>
        <button 
          className="h-full w-[60px] bg-brand-black flex items-center justify-center text-white hover:bg-brand-gold hover:text-brand-black transition-all border-l border-brand-black/10"
          title="Expandir Consola"
        >
          <Maximize2 size={20} strokeWidth={3} />
        </button>
      </div>
    );
  }

  const containerClasses = (isFloating || !isMediateca)
    ? "fixed bottom-8 right-6 md:right-8 z-[300] w-[calc(100%-3rem)] md:w-[380px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] animate-in zoom-in-95 duration-300"
    : "max-w-4xl mx-auto shadow-2xl mb-12 border-4 border-white/5";

  return (
    <section className={cn("relative transition-all duration-700", (isFloating || !isMediateca) ? "p-0" : "py-16 bg-brand-black text-white")}>
      {!isFloating && isMediateca && (
        <div className="container mx-auto px-6 mb-12">
          <RevealSection className="text-center max-w-2xl mx-auto space-y-6">
            <Badge className="bg-brand-gold text-brand-black px-6 py-1.5 rounded-none text-[9px] font-black uppercase tracking-[0.5em] shadow-xl">
              AUDIÓFILO • ARCHIVO VIVO
            </Badge>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.85]">
              NC <span className="text-brand-gold italic">RADIO</span> <br /> 
              <span className="text-stroke-thin text-transparent">VIRTUAL</span>
            </h2>
            <div className="w-24 h-1 bg-brand-gold mx-auto"></div>
            <p className="text-lg md:text-xl text-white/40 font-medium italic max-w-xl mx-auto leading-relaxed">
              "Sintonía viva del Centro: frecuencias que rescatan el pulso de nuestra memoria y la activan en el HOY."
            </p>
          </RevealSection>
        </div>
      )}

      <div className={cn(
        "bg-[#0a0a0f] border-2 border-white/10 relative overflow-hidden transition-all duration-500 rounded-none",
        containerClasses
      )}>
        <div 
          className="bg-brand-gold px-6 py-4 flex justify-between items-center border-b-2 border-brand-black shadow-inner relative overflow-hidden"
          style={{ 
            borderTopRightRadius: '2rem',
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)',
            backgroundSize: '6px 6px'
          }}
        >
          <div className="flex items-center gap-4 relative z-10">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-black/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-black shadow-lg" />
            </div>
            <div className="flex flex-col">
              <span className="text-[11px] font-black uppercase tracking-[0.25em] text-brand-black leading-none">
                NC RADIO // ARCHIVO MULTI-MODAL
              </span>
            </div>
          </div>
          <div className="flex gap-3 relative z-10">
            {(isFloating || !isMediateca) ? (
              <button 
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setIsMinimized(true);
                }} 
                className="text-brand-black hover:scale-110 transition-transform"
                title="Minimizar a Badge"
              >
                <Minimize2 size={18} strokeWidth={3} />
              </button>
            ) : (
              <button 
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  setIsFloating(true);
                }} 
                className="text-brand-black hover:scale-110 transition-transform"
                title="Hacer Flotante"
              >
                <ExternalLink size={18} strokeWidth={3} />
              </button>
            )}
            <button 
              onMouseEnter={playHover}
              onClick={handleClose} 
              className="text-brand-black hover:text-brand-red transition-all"
            >
              <X size={18} strokeWidth={3} />
            </button>
          </div>
        </div>

        <div className="p-8 space-y-8 bg-gradient-to-b from-[#12121a] to-[#0a0a0f]">
          <div className="grid grid-cols-1 gap-4">
            <div className="bg-brand-gold/5 border-2 border-brand-gold/20 p-0 relative group overflow-hidden">
              <div className="absolute inset-0 z-0">
                <MeshVisualizer active={isPlaying && !isLoading} />
              </div>
              
              <div className="relative z-10 p-6 space-y-4 bg-gradient-to-t from-[#0a0a0f] to-transparent">
                <div className="flex justify-between items-start">
                  <div className="space-y-1 overflow-hidden">
                    <span className="text-[8px] font-black uppercase text-brand-gold tracking-[0.3em]">SIGNAL_SOURCE</span>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white leading-tight truncate">
                      {currentStation.name}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={cn("w-2 h-2 rounded-full", isPlaying ? "bg-brand-red shadow-[0_0_10px_rgba(196,61,76,0.8)] animate-pulse" : "bg-white/10")} />
                    <span className="text-[8px] font-black text-brand-gold tracking-widest uppercase">LIVE_NET</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-brand-gold/10">
                  <div className="flex items-center gap-2 text-brand-gold/60 text-[9px] font-bold uppercase tracking-[0.2em]">
                    <MapPin size={12} className="text-brand-gold" />
                    <span className="truncate">{currentStation.location}</span>
                  </div>
                  <div className="h-3 w-px bg-brand-gold/10" />
                  <div className="flex items-center gap-2 text-brand-gold/60 text-[9px] font-bold uppercase tracking-[0.2em]">
                    <Signal size={12} className="text-brand-gold" />
                    <span>{currentStation.format}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between gap-6">
              <button 
                onMouseEnter={playHover}
                onClick={prevStation} 
                className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 hover:border-brand-gold text-white/40 hover:text-brand-gold transition-all shadow-lg active:scale-95"
              >
                <SkipBack size={20} />
              </button>
              
              <div className="relative group">
                <div className="absolute inset-0 bg-brand-gold blur-2xl opacity-0 group-hover:opacity-20 transition-opacity" />
                <button 
                  onMouseEnter={playHover}
                  onClick={togglePlay}
                  disabled={isLoading}
                  className={cn(
                    "w-20 h-20 flex items-center justify-center rounded-none shadow-2xl transition-all active:scale-95 relative z-10",
                    isPlaying ? "bg-white text-brand-black" : "bg-brand-gold text-brand-black"
                  )}
                >
                  {isLoading ? (
                    <RefreshCw size={32} className="animate-spin" />
                  ) : isPlaying ? (
                    <Pause size={32} fill="currentColor" />
                  ) : (
                    <Play size={32} fill="currentColor" className="ml-1.5" />
                  )}
                </button>
              </div>

              <button 
                onMouseEnter={playHover}
                onClick={nextStation} 
                className="w-12 h-12 flex items-center justify-center bg-white/5 border border-white/10 hover:border-brand-gold text-white/40 hover:text-brand-gold transition-all shadow-lg active:scale-95"
              >
                <SkipForward size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2">
                    <Volume2 size={12} className="text-brand-gold" />
                    <span className="text-[9px] font-black text-white/30 tracking-[0.2em] uppercase font-mono">GAIN_MASTER</span>
                  </div>
                  <span className="text-[11px] font-mono text-brand-gold font-bold">{isMuted ? 'OFF' : volume.toString().padStart(2, '0')}dB</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-grow bg-white/5 h-8 p-1 border border-white/10 relative">
                    <input 
                      type="range" min="0" max="100" value={isMuted ? 0 : volume}
                      onMouseEnter={playHover}
                      onChange={(e) => { setVolume(parseInt(e.target.value)); setIsMuted(false); }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                    />
                    <div className="h-full bg-brand-gold/20 border-r-2 border-brand-gold transition-all" style={{ width: `${isMuted ? 0 : volume}%` }} />
                  </div>
                  <button 
                    onMouseEnter={playHover}
                    onClick={() => {
                      playClick();
                      setIsMuted(!isMuted);
                    }} 
                    className={cn(
                      "w-8 h-8 flex items-center justify-center border transition-all", 
                      isMuted ? "border-brand-red bg-brand-red/10 text-brand-red" : "border-white/10 text-white/40 hover:text-brand-gold hover:border-brand-gold"
                    )}
                  >
                    {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2">
                    <Activity size={12} className="text-brand-gold" />
                    <span className="text-[9px] font-black text-white/30 tracking-[0.2em] uppercase font-mono">CHANNEL_SCAN</span>
                  </div>
                  <button 
                    onMouseEnter={playHover}
                    onClick={() => {
                      playClick();
                      setIsShuffle(!isShuffle);
                    }}
                    className={cn(
                      "flex items-center gap-1.5 text-[9px] font-black uppercase transition-all px-2 py-0.5 border", 
                      isShuffle ? "bg-brand-gold border-brand-gold text-brand-black shadow-[0_0_10px_rgba(217,160,47,0.3)]" : "text-white/30 border-white/10 hover:text-white"
                    )}
                  >
                    RND <Shuffle size={10} />
                  </button>
                </div>
                <div className="relative group">
                  <select 
                    value={currentIndex}
                    onMouseEnter={playHover}
                    onChange={(e) => loadAndPlay(parseInt(e.target.value))}
                    className="bg-white/5 border border-white/10 text-brand-gold text-[11px] font-black uppercase tracking-[0.1em] p-2.5 w-full appearance-none hover:bg-white/10 transition-colors focus:outline-none font-mono"
                  >
                    {STATIONS.map((st, idx) => (
                      <option key={idx} value={idx} className="bg-[#0d0d12] text-white">[{idx.toString().padStart(2, '0')}] {st.name}</option>
                    ))}
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-brand-gold/40">
                    <Signal size={14} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-end pt-6 border-t border-white/5">
            <div className="flex flex-col gap-3">
              {hasError ? (
                <div className="flex items-center gap-2 text-brand-red animate-pulse">
                  <AlertTriangle size={12} />
                  <span className="text-[9px] font-black uppercase tracking-[0.15em] font-mono">LINK_ERROR</span>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <div className={cn("w-2 h-2 rounded-full", isPlaying && !isLoading ? "bg-brand-green shadow-[0_0_8px_rgba(138,162,117,0.6)]" : "bg-white/10")} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-white/30 font-mono truncate max-w-[180px]">
                    {status}
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-[7px] font-black text-white/20 uppercase tracking-[0.3em] leading-none mb-1">DEVELOPED BY</span>
                <span className="text-[9px] font-black text-brand-gold uppercase tracking-[0.4em] leading-none">NÚCLEO COLECTIVO</span>
              </div>
              <div className="w-8 h-8 flex items-center justify-center bg-brand-gold/10 p-1.5 border border-brand-gold/20 grayscale hover:grayscale-0 transition-all duration-500 cursor-help" title="Desarrollado por Núcleo Colectivo">
                 <img src={LOGO_URL} alt="NC" className="w-full h-full object-contain brightness-0 invert opacity-60" />
              </div>
              {isLoading && <Wifi size={14} className="text-brand-gold animate-pulse" />}
            </div>
          </div>
        </div>
        
        <div className="flex h-2 w-full">
          <div className="flex-1 bg-brand-gold"></div>
          <div className="flex-1 bg-brand-teal"></div>
          <div className="flex-1 bg-brand-red"></div>
          <div className="flex-1 bg-brand-purple"></div>
          <div className="flex-1 bg-brand-olive"></div>
        </div>
      </div>
    </section>
  );
}
