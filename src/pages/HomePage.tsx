import React, { Suspense } from 'react';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

// Lazy load VideoHero to prevent blocking
const VideoHero = React.lazy(() => import('../components/VideoHero').then(module => ({ default: module.VideoHero })));

interface HomePageProps {
  onNavigate: (page: string) => void;
}

// Simple fallback while video component loads
function HeroFallback() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#0F0F0F] flex items-center justify-center">
      <div className="text-center z-10">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display text-[#C9A24E] mb-4"
            style={{ textShadow: '0 0 40px rgba(201, 162, 78, 0.6)' }}>
          FROM DIRT TO DYNASTY
        </h1>
        <p className="text-xl md:text-2xl text-[#F5F4F1]/90 font-heading">
          Building world-class equestrian facilities across Victoria
        </p>
      </div>
    </div>
  );
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <HorseshoeCursor />
      <Navigation onNavigate={onNavigate} currentPage="home" />
      <Suspense fallback={<HeroFallback />}>
        <VideoHero autoLoop={true} showLogo={true} />
      </Suspense>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}