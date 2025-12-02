import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-[#0F0F0F]/95 backdrop-blur-md shadow-xl shadow-[#C9A24E]/10' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between md:justify-center">
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {navItems.map((item) => {
              const isActive = currentPage === item.value;
              const isHovered = hoveredItem === item.value;
              
              return (
                <motion.button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  onMouseEnter={() => setHoveredItem(item.value)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`relative py-2 px-4 font-heading flex items-center gap-2 rounded-lg focus:outline-none ${
                    isActive
                      ? 'text-[#C9A24E] bg-[#C9A24E]/10'
                      : 'text-[#F5F4F1] hover:text-[#C9A24E]'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {/* Icon with animation */}
                  <motion.span
                    animate={{
                      scale: isHovered || isActive ? 1.2 : 1,
                      rotate: isHovered ? [0, -10, 10, -5, 5, 0] : 0,
                    }}
                    transition={{
                      scale: { duration: 0.2 },
                      rotate: { duration: 0.5 },
                    }}
                  >
                    <item.Icon 
                      size={22} 
                      color={isActive || isHovered ? '#C9A24E' : '#A88B63'} 
                    />
                  </motion.span>
                  
                  {/* Label */}
                  <span className="tracking-wide text-sm">{item.label}</span>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div 
                      className="absolute -bottom-1 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-[#C9A24E] to-transparent"
                      layoutId="activeTab"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    />
                  )}
                  
                  {/* Hover glow */}
                  {isHovered && !isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-[#C9A24E]/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}
                </motion.button>
              );
            })}
            
            {/* Portal Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={() => handleNavClick('portal')}
                className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] font-heading ml-2 shadow-lg shadow-[#C9A24E]/30 px-4 py-2 rounded-lg"
              >
                <Shield className="mr-2" size={18} />
                Portal
              </Button>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-[#F5F4F1] p-2 hover:bg-[#C9A24E]/10 rounded-lg"
            whileTap={{ scale: 0.9 }}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 pb-4 border-t border-[#C9A24E]/20 bg-[#0F0F0F]/95 rounded-xl"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-col gap-2 mt-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.value}
                  onClick={() => handleNavClick(item.value)}
                  className={`text-left py-3 px-4 font-heading flex items-center gap-3 rounded-lg ${
                    currentPage === item.value
                      ? 'text-[#C9A24E] bg-[#C9A24E]/10'
                      : 'text-[#F5F4F1]'
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <item.Icon size={24} color={currentPage === item.value ? '#C9A24E' : '#A88B63'} />
                  <span>{item.label}</span>
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                <Button
                  onClick={() => handleNavClick('portal')}
                  className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] font-heading w-full mt-2 py-3"
                >
                  <Shield className="mr-2" size={18} />
                  Portal
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
