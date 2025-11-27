import React from 'react';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { HeroAnimation } from '../components/HeroAnimation';
import { MediaGallery } from '../components/MediaGallery';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0F0F0F] via-[#181818] to-[#232323]">
      <HorseshoeCursor />
      <Navigation onNavigate={onNavigate} currentPage="home" />
      <section className="relative z-10">
        <HeroAnimation />
      </section>
      <section className="relative z-20">
        <MediaGallery />
      </section>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}