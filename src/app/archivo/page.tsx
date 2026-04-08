
"use client";

import { Navbar } from '@/components/Navbar';
import { Timeline } from '@/components/sections/Timeline';
import { RevealSection } from '@/components/RevealSection';

export default function ArchivoPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20">
        <RevealSection threshold={0.01}>
          <Timeline />
        </RevealSection>
      </div>
    </main>
  );
}
