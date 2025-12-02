import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { VideoHero } from '../components/VideoHero';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0F0F0F' }}>
      <HorseshoeCursor />
      <Navigation onNavigate={onNavigate} currentPage="home" />
      <VideoHero showLogo={true} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}