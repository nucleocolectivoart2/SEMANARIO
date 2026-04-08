
"use client";

import { Navbar } from '@/components/Navbar';
import { MemoryMap } from '@/components/sections/MemoryMap';
import { HistoryTimeline } from '@/components/sections/HistoryTimeline';
import { BrandStrip } from '@/components/BrandStrip';

export default function MapaPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <MemoryMap />
        <HistoryTimeline />
      </div>
      <BrandStrip />
    </main>
  );
}
