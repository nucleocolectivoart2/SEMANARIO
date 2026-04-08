
"use client";

import { Navbar } from '@/components/Navbar';
import { Agenda } from '@/components/sections/Agenda';
import { BrandStrip } from '@/components/BrandStrip';
import { RevealSection } from '@/components/RevealSection';

export default function AgendaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <RevealSection threshold={0.01}>
          <Agenda />
        </RevealSection>
      </div>
      <BrandStrip />
    </main>
  );
}
