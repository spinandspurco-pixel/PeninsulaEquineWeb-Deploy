import { useState, useEffect } from 'react';
import { HorseshoeIcon } from './icons/HorseshoeIcon';
import { LaserCutIcon } from './icons/LaserCutIcon';
import { FenceIcon } from './icons/FenceIcon';
import { ShopIcon } from './icons/ShopIcon';
import { GalleryIcon } from './icons/GalleryIcon';
import { ContactIcon } from './icons/ContactIcon';
import { Menu, X, Shield } from 'lucide-react';

interface NavigationProps {
  onNavigate: (page: string) => void;
  currentPage?: string;
}

export function Navigation({ onNavigate, currentPage = 'home' }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
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
          {/* Logo/Brand - Mobile */}
          <div className="md:hidden">
            <span className="text-[#C9A24E] font-display text-lg">PE</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-center flex-1 gap-1 lg:gap-2">
            {navItems.map((item) => {
              const isActive = currentPage === item.value;
              
              return (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`relative py-2 px-3 lg:px-4 flex items-center gap-2 rounded-lg transition-all duration-200 ${
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
                    className="text-sm tracking-wide"
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
              className="ml-2 lg:ml-4 bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] font-medium px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200"
              style={{ fontFamily: 'Raleway, sans-serif' }}
            >
              <Shield size={16} />
              <span className="text-sm">Portal</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#F5F4F1] p-2 hover:bg-[#C9A24E]/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 border-t border-[#C9A24E]/20">
            <div className="flex flex-col gap-1 pt-4">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`text-left py-3 px-4 flex items-center gap-3 rounded-lg transition-colors ${
                    currentPage === item.value
                      ? 'text-[#C9A24E] bg-[#C9A24E]/10'
                      : 'text-[#F5F4F1] hover:bg-[#C9A24E]/5'
                  }`}
                >
                  <item.Icon size={22} color={currentPage === item.value ? '#C9A24E' : '#A88B63'} />
                  <span style={{ fontFamily: 'Raleway, sans-serif' }}>{item.label}</span>
                </button>
              ))}
              <button
                onClick={() => handleNavClick('portal')}
                className="mt-2 bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] font-medium w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
                style={{ fontFamily: 'Raleway, sans-serif' }}
              >
                <Shield size={18} />
                <span>Portal</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
