import React, { useState, useEffect } from 'react';
import { HorseshoeIcon } from './icons/HorseshoeIcon';
import { LaserCutIcon } from './icons/LaserCutIcon';
import { FenceIcon } from './icons/FenceIcon';
import { ShopIcon } from './icons/ShopIcon';
import { GalleryIcon } from './icons/GalleryIcon';
import { ContactIcon } from './icons/ContactIcon';
import { Menu, X, Shield } from 'lucide-react';
import { Button } from './ui/button';

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
    { label: 'Home', value: 'home', icon: <HorseshoeIcon size={24} color="#C9A24E" className="transition-transform duration-200" /> },
    { label: 'Constructions', value: 'constructions', icon: <FenceIcon size={24} color="#A88B63" className="transition-transform duration-200" /> },
    { label: 'Laser Cutting', value: 'laser', icon: <LaserCutIcon size={24} color="#C9A24E" className="transition-transform duration-200" /> },
    { label: 'Shop', value: 'shop', icon: <ShopIcon size={24} color="#A88B63" className="transition-transform duration-200" /> },
    { label: 'Projects', value: 'projects', icon: <GalleryIcon size={24} color="#A88B63" className="transition-transform duration-200" /> },
    { label: 'Contact', value: 'contact', icon: <ContactIcon size={24} color="#C9A24E" className="transition-transform duration-200" /> },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#0F0F0F]/95 backdrop-blur-md shadow-xl shadow-[#C9A24E]/10' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between md:justify-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`relative py-2 px-3 font-heading transition-colors flex items-center gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24E]/60 ${
                  currentPage === item.value
                    ? 'text-[#C9A24E] bg-[#F5F4F1]/5 shadow-md shadow-[#C9A24E]/10'
                    : 'text-[#F5F4F1] hover:text-[#C9A24E] hover:bg-[#C9A24E]/10'
                }`}
                style={{
                  boxShadow: currentPage === item.value ? '0 2px 8px rgba(201,162,78,0.08)' : undefined,
                  transition: 'box-shadow 0.2s',
                }}
              >
                <span className={`transition-transform duration-200 ${currentPage === item.value ? 'scale-110' : 'scale-100'}`}>{item.icon}</span>
                <span className="tracking-wide">{item.label}</span>
                {currentPage === item.value && (
                  <div className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-[#C9A24E] via-[#F5F4F1] to-[#C9A24E] rounded-full animate-pulse" />
                )}
              </button>
            ))}
            <Button
              onClick={() => handleNavClick('portal')}
              className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] font-heading ml-2 shadow-lg shadow-[#C9A24E]/20 border border-[#C9A24E]/40 px-4 py-2 rounded-lg transition-all duration-200"
              style={{ fontWeight: 600, letterSpacing: '0.04em' }}
            >
              <Shield className="mr-2" size={18} />
              Portal
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#F5F4F1] p-2 hover:bg-[#C9A24E]/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#C9A24E]/20 animate-in slide-in-from-top duration-300 bg-[#0F0F0F]/95 rounded-xl shadow-lg shadow-[#C9A24E]/10">
            <div className="flex flex-col gap-3 mt-4">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`text-left py-2 px-3 font-heading transition-colors flex items-center gap-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A24E]/60 ${
                    currentPage === item.value
                      ? 'text-[#C9A24E] bg-[#F5F4F1]/5 shadow-md shadow-[#C9A24E]/10'
                      : 'text-[#F5F4F1] hover:text-[#C9A24E] hover:bg-[#C9A24E]/10'
                  }`}
                  style={{
                    boxShadow: currentPage === item.value ? '0 2px 8px rgba(201,162,78,0.08)' : undefined,
                    transition: 'box-shadow 0.2s',
                  }}
                >
                  <span className={`transition-transform duration-200 ${currentPage === item.value ? 'scale-110' : 'scale-100'}`}>{item.icon}</span>
                  <span className="tracking-wide">{item.label}</span>
                </button>
              ))}
              <Button
                onClick={() => handleNavClick('portal')}
                className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] font-heading w-full shadow-lg shadow-[#C9A24E]/20 border border-[#C9A24E]/40 px-4 py-2 rounded-lg transition-all duration-200"
                style={{ fontWeight: 600, letterSpacing: '0.04em' }}
              >
                <Shield className="mr-2" size={18} />
                Portal
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}