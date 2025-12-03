import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HorseshoeIcon } from './icons/HorseshoeIcon';
import { LaserCutIcon } from './icons/LaserCutIcon';
import { FenceIcon } from './icons/FenceIcon';
import { ShopIcon } from './icons/ShopIcon';
import { GalleryIcon } from './icons/GalleryIcon';
import { ContactIcon } from './icons/ContactIcon';
import { Menu, X, Shield } from 'lucide-react';

interface CleanNavigationProps {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export function CleanNavigation({ onNavigate, currentPage }: CleanNavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
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
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/95 backdrop-blur-md border-b border-gold-500/20' 
            : 'bg-background/80 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <motion.button 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3"
              whileHover={{ scale: 1.02 }}
            >
              <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-gold flex items-center justify-center">
                <HorseshoeIcon className="w-5 h-5 lg:w-6 lg:h-6 text-background" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg lg:text-xl font-display font-bold text-gradient-gold">
                  Peninsula Equine
                </h1>
                <p className="text-xs text-foreground-muted">Constructions</p>
              </div>
            </motion.button>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.Icon;
                const isActive = currentPage === item.value;
                
                return (
                  <motion.button
                    key={item.value}
                    onClick={() => handleNavClick(item.value)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                      isActive
                        ? 'bg-gradient-gold text-background shadow-lg'
                        : 'text-foreground hover:text-gold-400 hover:bg-gold-500/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
              
              {/* Portal Button */}
              <motion.button
                onClick={() => handleNavClick('portal')}
                className="ml-4 btn-premium px-6 py-2 flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Shield size={18} />
                <span className="text-sm font-bold">Portal</span>
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-gold-500/10 text-gold-400"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background-secondary border-t border-gold-500/20"
            >
              <div className="p-4 space-y-2">
                {navItems.map((item) => {
                  const Icon = item.Icon;
                  const isActive = currentPage === item.value;
                  
                  return (
                    <button
                      key={item.value}
                      onClick={() => handleNavClick(item.value)}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all ${
                        isActive
                          ? 'bg-gradient-gold text-background'
                          : 'text-foreground hover:bg-gold-500/10'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </button>
                  );
                })}
                
                <button
                  onClick={() => handleNavClick('portal')}
                  className="w-full btn-premium p-3 flex items-center gap-3 justify-center mt-4"
                >
                  <Shield size={20} />
                  <span className="font-bold">Worker Portal</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}