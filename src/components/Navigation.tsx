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

// Premium brand logo component
function BrandLogo() {
  return (
    <motion.div 
      className="flex items-center gap-4 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <motion.div
        className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-gold flex items-center justify-center shadow-gold group"
        whileHover={{ rotate: [0, -5, 5, 0] }}
        transition={{ duration: 0.6 }}
      >
        <HorseshoeIcon className="w-6 h-6 md:w-7 md:h-7 text-background transition-transform group-hover:scale-110" />
        
        {/* Subtle glow effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-gold opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
      </motion.div>
      
      <div className="hidden sm:block">
        <motion.h1 
          className="text-xl md:text-2xl font-display font-bold text-gradient-gold tracking-tight"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
        >
          Peninsula Equine
        </motion.h1>
        <motion.p 
          className="text-sm text-foreground-muted font-medium tracking-wider"
          initial={{ opacity: 0.6 }}
          animate={{ opacity: 0.8 }}
        >
          Premium Constructions
        </motion.p>
      </div>
    </motion.div>
  );
}

export function Navigation({ onNavigate, currentPage = 'home' }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };
    
    handleResize(); // Check initial size
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavClick = (page: string) => {
    console.log('🔄 Navigation clicked:', page, 'Current page:', currentPage);
    console.log('📍 onNavigate function:', typeof onNavigate);
    
    if (typeof onNavigate === 'function') {
      onNavigate(page);
      setIsMobileMenuOpen(false);
      console.log('✅ Navigation completed for:', page);
    } else {
      console.error('❌ onNavigate is not a function:', onNavigate);
    }
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
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass-card-strong shadow-2xl border-b border-border-light' 
            : 'bg-background/90 backdrop-blur-md'
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
            <div className="hidden lg:flex items-center gap-4">
              {navItems.map((item) => {
                const isActive = currentPage === item.value;
              
                return (
                  <motion.button
                    key={item.value}
                    onClick={() => handleNavClick(item.value)}
                    className={`relative py-3 px-6 flex items-center gap-3 rounded-2xl transition-all duration-300 group font-medium overflow-hidden ${
                      isActive
                        ? 'text-background bg-gradient-gold shadow-gold'
                        : 'text-foreground hover:text-gold-400 hover:bg-gold-500/10 glass-card'
                    }`}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -2,
                    }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Navigate to ${item.label} page`}
                    type="button"
                  >
                    <item.Icon 
                      size={20} 
                      color={isActive ? '#0F0F0F' : 'currentColor'} 
                    />
                    <span className="text-sm font-medium tracking-wide">
                      {item.label}
                    </span>
                  </motion.button>
              );
            })}
            
              {/* Premium Portal Button */}
              <motion.button
                onClick={() => handleNavClick('portal')}
                className="btn-premium ml-8 px-8 py-4 flex items-center gap-3 font-bold cursor-pointer"
                whileHover={{ 
                  scale: 1.05, 
                  y: -2,
                }}
                whileTap={{ scale: 0.95 }}
                aria-label="Access Peninsula Equine Portal"
                type="button"
              >
                <Shield size={20} />
                <span className="text-sm font-bold tracking-wide">Portal</span>
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
      </motion.nav>

      {/* Mobile Menu Overlay - Only show on mobile when menu is open */}
      <AnimatePresence>
        {isMobileMenuOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-20 left-0 right-0 z-40 bg-[#0F0F0F]/98 backdrop-blur-xl lg:hidden"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-10">
                {navItems.map((item) => {
                  const isActive = currentPage === item.value;
                  
                  return (
                    <motion.button
                      key={item.value}
                      onClick={() => handleNavClick(item.value)}
                      className={`nav-button p-8 rounded-2xl flex flex-col items-center gap-4 transition-all duration-300 ${
                        isActive
                          ? 'bg-[#C9A24E] text-[#0F0F0F] shadow-xl shadow-[#C9A24E]/25'
                          : 'bg-[#1a1a1a] text-[#F5F4F1] hover:bg-[#C9A24E]/15 hover:text-[#C9A24E] hover:shadow-lg'
                      }`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      aria-label={`Navigate to ${item.label} page`}
                      type="button"
                    >
                      <item.Icon 
                        size={36} 
                        color={isActive ? '#0F0F0F' : 'currentColor'} 
                      />
                      <span className="text-sm font-semibold text-center leading-tight">
                        {item.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>
              
              {/* Mobile Portal Button */}
              <motion.button
                onClick={() => handleNavClick('portal')}
                className="w-full bg-gradient-to-r from-[#C9A24E] to-[#A88B63] hover:from-[#D4B366] hover:to-[#C9A24E] text-[#0F0F0F] font-bold py-5 px-8 rounded-2xl flex items-center justify-center gap-4 shadow-xl shadow-[#C9A24E]/30 transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <Shield size={24} />
                <span className="text-lg">Access Portal</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
