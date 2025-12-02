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
            <div className="hidden lg:flex items-center gap-4">
              {navItems.map((item) => {
                const isActive = currentPage === item.value;
              
                return (
                  <motion.button
                    key={item.value}
                    onClick={() => handleNavClick(item.value)}
                    className={`nav-button relative py-3 px-6 flex items-center gap-3 rounded-xl transition-all duration-300 group font-medium ${
                      isActive
                        ? 'text-[#0F0F0F] bg-[#C9A24E] shadow-lg shadow-[#C9A24E]/25'
                        : 'text-[#F5F4F1] hover:text-[#C9A24E] hover:bg-[#C9A24E]/15 hover:shadow-md'
                    }`}
                    whileHover={{ scale: 1.05, y: -1 }}
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
            
              {/* Portal Button */}
              <motion.button
                onClick={() => handleNavClick('portal')}
                className="nav-button ml-6 bg-gradient-to-r from-[#C9A24E] to-[#A88B63] hover:from-[#D4B366] hover:to-[#C9A24E] text-[#0F0F0F] font-semibold px-8 py-3.5 rounded-xl flex items-center gap-3 transition-all duration-300 shadow-lg shadow-[#C9A24E]/20 hover:shadow-xl hover:shadow-[#C9A24E]/30"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Access Peninsula Equine Portal"
                type="button"
              >
                <Shield size={20} />
                <span className="text-sm font-bold">Portal</span>
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
