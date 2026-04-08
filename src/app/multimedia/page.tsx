
"use client";

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Multimedia } from '@/components/sections/Multimedia';
import { RevealSection } from '@/components/RevealSection';

export default function MultimediaPage() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <div className="pt-20">
        <RevealSection threshold={0.01}>
          <Multimedia />
        </RevealSection>
      </div>
    </main>
  );
}
