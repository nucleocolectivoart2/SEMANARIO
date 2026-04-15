
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';
import { useSoundEffects } from '@/hooks/use-sound-effects';

const navItems = [
  { name: 'INICIO', href: '/' },
  { name: 'HISTORIA', href: '/historia' },
  { name: 'ARCHIVO VIVO', href: '/archivo' },
  { name: 'MEDIATECA', href: '/mediateca' },
  { name: '¿SABÍAS QUÉ...?', href: '/sabias-que' },
  { name: 'RUTA DE LA MEMORIA', href: '/mapa' },
  { name: 'EL PROYECTO', href: '/proyecto' },
];

export function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { playClick, playHover } = useSoundEffects();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  const darkPages = ['/', '/mediateca', '/multimedia'];
  const isDarkPage = darkPages.includes(pathname);
  const shouldShowDarkText = !scrolled && !isOpen && !isDarkPage;

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-[100] transition-all duration-700 px-6 sm:px-10',
          scrolled || isOpen
            ? 'bg-brand-black/90 backdrop-blur-md py-4 shadow-2xl' 
            : 'bg-transparent py-6'
        )}
      >
        <div className="max-w-[1800px] mx-auto flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center gap-4 group shrink-0"
            onMouseEnter={playHover}
            onClick={playClick}
          >
            <div className="w-12 h-12 bg-brand-gold flex items-center justify-center text-brand-black shadow-lg p-2 transition-transform group-hover:scale-105">
              <Logo />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-black text-base tracking-tighter uppercase leading-none transition-colors duration-500",
                shouldShowDarkText ? "text-brand-black" : "text-white"
              )}>
                EL SEMANARIO <span className="text-brand-gold">HOY</span>
              </span>
              <span className="font-bold text-[8px] uppercase tracking-[0.3em] text-brand-gold mt-1">ARCHIVO VIVO • MEDELLÍN</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center ml-auto mr-12">
            <div className="flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onMouseEnter={playHover}
                  onClick={playClick}
                  className={cn(
                    "font-black text-[11px] uppercase tracking-[0.3em] transition-all relative pb-1 whitespace-nowrap",
                    pathname === item.href 
                      ? cn("border-b-2 border-brand-gold", shouldShowDarkText ? "text-brand-black" : "text-white")
                      : cn(shouldShowDarkText ? "text-brand-black/60 hover:text-brand-black" : "text-white/60 hover:text-white")
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <button
            className={cn(
              "lg:hidden p-3 transition-all",
              shouldShowDarkText ? "bg-brand-black/5 text-brand-black hover:bg-brand-gold" : "bg-white/10 text-white hover:bg-brand-gold hover:text-brand-black"
            )}
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div 
        className={cn(
          "fixed inset-0 z-[90] bg-brand-black lg:hidden transition-all duration-700 pt-32 px-10 overflow-y-auto",
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
        )}
      >
        <div className="flex flex-col space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                setIsOpen(false);
              }}
              className={cn(
                "font-black flex items-center justify-between py-6 border-b border-white/10 transition-all",
                pathname === item.href ? "text-brand-gold" : "text-white"
              )}
            >
              <span className="text-xl tracking-tighter uppercase">{item.name}</span>
              <ChevronRight size={20} className="text-brand-gold" />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
