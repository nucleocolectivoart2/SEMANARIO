
"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Youtube, Facebook, Instagram, ShieldCheck } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';

export function Footer() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevenir desajustes de hidratación al depender de la ruta en el renderizado inicial
  if (!mounted) return null;
  if (pathname?.startsWith('/admin')) return null;

  return (
    <footer className="bg-brand-black text-white py-12 px-4 border-t-4 border-brand-gold">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-start mb-10">
          {/* Marca y Descripción */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="w-10 h-10 bg-brand-gold flex items-center justify-center text-brand-black shadow-lg p-2">
                <Logo />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black leading-none text-xl tracking-tighter uppercase">
                  EL SEMANARIO <span className="text-brand-gold">HOY</span>
                </span>
                <span className="text-brand-gold font-bold text-[8px] uppercase tracking-[0.2em] mt-0.5">
                  MEDELLÍN • ANTIOQUIA
                </span>
              </div>
            </div>
            
            <p className="text-gray-400 max-w-md leading-relaxed font-medium text-xs md:text-sm">
              El Semanario HOY es el dispositivo de memoria cultural que revitaliza el corazón de la ciudad. Un puente entre generaciones, <span className="text-brand-gold font-black">un archivo vivo.</span>
            </p>

            <div className="flex gap-3">
              {[
                { icon: Youtube, href: "https://www.youtube.com/@ElSemanarioHOY", color: "hover:bg-brand-red" },
                { icon: Facebook, href: "https://www.facebook.com/ElSemanarioHOY/", color: "hover:bg-brand-gold hover:text-black" },
                { icon: Instagram, href: "https://instagram.com/elsemanariohoy", color: "hover:bg-brand-teal" }
              ].map((social, i) => (
                <a 
                  key={i}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`w-10 h-10 bg-white/5 flex items-center justify-center text-white/70 ${social.color} hover:text-white transition-all shadow-md`}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div className="md:col-span-3">
            <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-6 text-brand-gold border-b border-white/10 pb-2 w-fit">Navegación</h4>
            <ul className="grid grid-cols-1 gap-3 text-gray-400 font-bold uppercase text-[9px] tracking-widest">
              <li><Link href="/historia" className="hover:text-brand-gold transition-colors">Historia</Link></li>
              <li><Link href="/mediateca" className="hover:text-brand-gold transition-colors">Mediateca</Link></li>
              <li><Link href="/archivo" className="hover:text-brand-gold transition-colors">Archivo Vivo</Link></li>
              <li><Link href="/mapa" className="hover:text-brand-gold transition-colors">Mapa de Memoria</Link></li>
            </ul>
          </div>

          {/* Administración y Soporte */}
          <div className="md:col-span-4 flex flex-col justify-between h-full gap-8">
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-[0.3em] mb-6 text-brand-gold border-b border-white/10 pb-2 w-fit">Gestión</h4>
              <Button asChild className="bg-brand-gold hover:bg-white text-brand-black font-black rounded-none px-5 h-9 transition-all uppercase tracking-[0.2em] text-[8px] border-none shadow-xl">
                <Link href="/admin" className="flex items-center gap-2">
                  <ShieldCheck size={12} /> PANEL CMS
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col items-center">
          <p className="text-gray-600 text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-center">
            © 2026 El Semanario HOY. Todos los derechos reservados. Desarrollado por{' '}
            <a href="https://nucleocolectivo.com/" target="_blank" rel="noopener noreferrer" className="text-brand-gold hover:underline">
              Núcleo Colectivo
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
