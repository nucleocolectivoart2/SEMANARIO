
"use client";

import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Badge } from '@/components/ui/badge';

export function Hero() {
  const collageImage = PlaceHolderImages.find(img => img.id === 'nosotros-main');

  return (
    <section className="relative min-h-screen w-full bg-white overflow-hidden pt-32 pb-20">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Columna de Texto */}
          <div className="lg:col-span-7 space-y-8 z-10">
            <div className="animate-reveal">
              <Badge className="bg-brand-gold text-brand-black px-4 py-1.5 rounded-none text-[10px] font-black uppercase tracking-[0.3em] mb-8 border-none shadow-lg">
                ARCHIVO DE RESISTENCIA • SEMANARIO HOY
              </Badge>
              
              <div className="space-y-0">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.8] text-brand-black tracking-tighter uppercase">
                  MÁS QUE
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.8] text-brand-gold tracking-tighter uppercase">
                  UNA
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.8] text-brand-gold tracking-tighter uppercase">
                  AGENDA,
                </h1>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black leading-[0.8] text-brand-black tracking-tighter uppercase">
                  UN PUENTE
                </h1>
              </div>
            </div>

            <div className="pt-12 animate-reveal" style={{ animationDelay: '0.3s' }}>
              <div className="flex gap-4 items-start">
                <div className="w-2 h-16 bg-brand-teal shrink-0 mt-2" />
                <p className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-brand-black leading-tight max-w-xl">
                  El Semanario HOY vuelve para <br />
                  <span className="text-brand-teal">conectarle a usted con la escena cultural actual.</span>
                </p>
              </div>
            </div>
          </div>

          {/* Columna de Imagen / Collage */}
          <div className="lg:col-span-5 relative group animate-reveal" style={{ animationDelay: '0.5s' }}>
            <div className="relative aspect-[4/5] w-full bg-muted shadow-2xl overflow-hidden">
              {collageImage && (
                <Image 
                  src={collageImage.imageUrl} 
                  alt="Archivo Vivo Medellín Collage" 
                  fill 
                  className="object-cover transition-transform duration-[20s] group-hover:scale-110"
                  priority
                />
              )}
              {/* Overlay de textura de papel */}
              <div className="absolute inset-0 bg-brand-black/5 mix-blend-multiply pointer-events-none" />
            </div>
            
            {/* Cuadro Flotante de Archivo Vivo */}
            <div className="absolute -bottom-10 -right-6 md:-right-10 w-40 h-40 bg-brand-gold flex items-center justify-center p-8 text-brand-black font-black text-sm uppercase tracking-widest text-center leading-none z-20 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] transition-transform group-hover:scale-105">
              ARCHIVO <br /> VIVO <br /> MEDELLÍN
            </div>
          </div>

        </div>
      </div>

      {/* Decoración de marca inferior */}
      <div className="absolute bottom-0 left-0 w-full h-3 bg-brand-gold"></div>
    </section>
  );
}
