import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { VideoHero } from '../components/VideoHero';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  return (
    <div className="page-container">
      <Navigation onNavigate={onNavigate} currentPage="home" />
      <VideoHero onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
}