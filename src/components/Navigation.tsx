import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// Professional brand logo component
function BrandLogo() {
  return (
    <div className="flex items-center gap-3">
      <motion.div
        className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#C9A24E] to-[#8B7355] flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <HorseshoeIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
      </motion.div>
      <div className="hidden sm:block">
        <h1 className="text-lg md:text-xl font-bold text-[#C9A24E] font-display tracking-tight">
          Peninsula Equine
        </h1>
        <p className="text-xs text-gray-400 font-light tracking-wide">
          Constructions
        </p>
      </div>
    </div>
  );
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
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-[#0F0F0F]/98 backdrop-blur-xl shadow-2xl' 
            : 'bg-[#0F0F0F]/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Brand Logo */}
            <motion.button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <BrandLogo />
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const isActive = currentPage === item.value;
              
                return (
                  <motion.button
                    key={item.value}
                    onClick={() => handleNavClick(item.value)}
                    className={`relative py-3 px-5 flex items-center gap-2 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? 'text-[#0F0F0F] bg-[#C9A24E] shadow-lg'
                        : 'text-[#F5F4F1] hover:text-[#C9A24E] hover:bg-[#C9A24E]/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <item.Icon 
                      size={18} 
                      color={isActive ? '#0F0F0F' : 'currentColor'} 
                    />
                    <span className="text-sm font-medium tracking-wide">
                      {item.label}
                    </span>
                  </motion.button>
              );
            })}
            
              
              {/* Portal Button */}
              <motion.button
                onClick={() => handleNavClick('portal')}
                className="ml-4 bg-gradient-to-r from-[#C9A24E] to-[#A88B63] hover:from-[#A88B63] hover:to-[#C9A24E] text-[#0F0F0F] font-semibold px-6 py-3 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Shield size={18} />
                <span className="text-sm">Portal</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-xl bg-[#C9A24E]/10 text-[#C9A24E] z-10"
              whileTap={{ scale: 0.95 }}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-20 left-0 right-0 z-40 bg-[#0F0F0F]/98 backdrop-blur-xl lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                {navItems.map((item) => {
                  const isActive = currentPage === item.value;
                  
                  return (
                    <motion.button
                      key={item.value}
                      onClick={() => handleNavClick(item.value)}
                      className={`p-6 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 ${
                        isActive
                          ? 'bg-[#C9A24E] text-[#0F0F0F] shadow-xl'
                          : 'bg-[#1a1a1a] text-[#F5F4F1] hover:bg-[#C9A24E]/10 hover:text-[#C9A24E]'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <item.Icon 
                        size={32} 
                        color={isActive ? '#0F0F0F' : 'currentColor'} 
                      />
                      <span className="text-sm font-medium text-center">
                        {item.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
              
              {/* Mobile Portal Button */}
              <motion.button
                onClick={() => handleNavClick('portal')}
                className="w-full bg-gradient-to-r from-[#C9A24E] to-[#A88B63] text-[#0F0F0F] font-semibold py-4 px-6 rounded-2xl flex items-center justify-center gap-3 shadow-xl"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Shield size={20} />
                <span>Access Portal</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
