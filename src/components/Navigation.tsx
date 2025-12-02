import { useState, useEffect } from 'react';
import { HorseshoeIcon } from './icons/HorseshoeIcon';
import { LaserCutIcon } from './icons/LaserCutIcon';
import { FenceIcon } from './icons/FenceIcon';
import { ShopIcon } from './icons/ShopIcon';
import { GalleryIcon } from './icons/GalleryIcon';
import { ContactIcon } from './icons/ContactIcon';
import { Shield } from 'lucide-react';

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage?: string;
}

export function Navigation({ onNavigate, currentPage = 'home' }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    onNavigate(page);
  };

  const handleNavClick = (page: string) => {
    onNavigate(page);
  };

  const navItems = [
    { label: 'Home', value: 'home', Icon: HorseshoeIcon },
    { label: 'Constructions', value: 'constructions', Icon: FenceIcon },
    { label: 'Laser Cutting', value: 'laser', Icon: LaserCutIcon },
    { label: 'Shop', value: 'shop', Icon: ShopIcon },
    { label: 'Projects', value: 'projects', Icon: GalleryIcon },
    { label: 'Contact', value: 'contact', Icon: ContactIcon },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled ? 'bg-[#0F0F0F]/95 backdrop-blur-md shadow-lg' : 'bg-[#0F0F0F]/80 backdrop-blur-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo/Brand - Phones only (below 640px) */}
          <button 
            onClick={() => handleNavClick('home')}
            className="sm:hidden flex items-center gap-2"
          >
            <span className="text-[#C9A24E] font-display text-base">Peninsula Equine</span>
          </button>

          {/* Navigation - responsive layout */}
          <div className="flex items-center justify-center flex-1 gap-1 md:gap-2 flex-wrap">
            {navItems.map((item) => {
              const isActive = currentPage === item.value;
              
              return (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`relative py-2 px-2 lg:px-4 flex items-center gap-1 lg:gap-2 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'text-[#C9A24E] bg-[#C9A24E]/10'
                      : 'text-[#F5F4F1] hover:text-[#C9A24E] hover:bg-[#C9A24E]/5'
                  }`}
                >
                  <item.Icon 
                    size={20} 
                    color={isActive ? '#C9A24E' : '#A88B63'} 
                  />
                  <span 
                    className="text-xs sm:text-sm tracking-wide hidden sm:inline"
                    style={{ fontFamily: 'Raleway, sans-serif' }}
                  >
                    {item.label}
                  </span>
                  
                  {isActive && (
                    <div className="absolute -bottom-0.5 left-3 right-3 h-0.5 bg-[#C9A24E] rounded-full" />
                  )}
                </button>
              );
            })}
            
            {/* Portal Button */}
            <button
              onClick={() => handleNavClick('portal')}
              className="ml-2 bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] font-medium px-2 sm:px-4 py-2 rounded-lg flex items-center gap-1 transition-colors duration-200"
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              <Shield size={16} />
              <span className="text-xs sm:text-sm">Portal</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}
