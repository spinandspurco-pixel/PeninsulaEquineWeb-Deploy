import React, { useState, useEffect } from 'react';
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
    { label: 'Home', value: 'home' },
    { label: 'Constructions', value: 'constructions' },
    { label: 'Laser Cutting', value: 'laser' },
    { label: 'Shop', value: 'shop' },
    { label: 'Projects', value: 'projects' },
    { label: 'Contact', value: 'contact' },
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
                className={`relative py-2 font-heading transition-colors ${
                  currentPage === item.value
                    ? 'text-[#C9A24E]'
                    : 'text-[#F5F4F1] hover:text-[#C9A24E]'
                }`}
              >
                {item.label}
                {currentPage === item.value && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C9A24E]" />
                )}
              </button>
            ))}
            <Button
              onClick={() => handleNavClick('portal')}
              className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] font-heading ml-2"
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
          <div className="md:hidden mt-4 pb-4 border-t border-[#C9A24E]/20 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-3 mt-4">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`text-left py-2 font-heading transition-colors ${
                    currentPage === item.value
                      ? 'text-[#C9A24E]'
                      : 'text-[#F5F4F1] hover:text-[#C9A24E]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <Button
                onClick={() => handleNavClick('portal')}
                className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] font-heading w-full"
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