import React from 'react';
import { VideoHero } from '../components/VideoHero';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <HorseshoeCursor />
      <Navigation onNavigate={onNavigate} currentPage="home" />
      <HeroAnimation />
      <MediaGallery />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}