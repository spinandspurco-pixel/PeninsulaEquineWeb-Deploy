import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, ArrowRight, Bell } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { toast } from 'sonner';
import { LaserSignIcon, ExcellenceIcon, PrecisionIcon } from '../components/icons/ServiceIcons';

interface ShopPageProps {
  onNavigate: (page: string) => void;
}

export function ShopPage({ onNavigate }: ShopPageProps) {
  const [email, setEmail] = useState('');

  const handleNotify = () => {
    if (email) {
      toast.success('You\'re on the list! We\'ll notify you when the shop launches.');
      setEmail('');
    }
  };

  const comingSoonFeatures = [
    {
      Icon: PrecisionIcon,
      title: 'Custom Designs',
      description: 'Unique laser-cut pieces tailored to your vision',
    },
    {
      Icon: LaserSignIcon,
      title: 'Ready-Made Items',
      description: 'Curated collection of artistic laser-cut pieces',
    },
    {
      Icon: ExcellenceIcon,
      title: 'Limited Editions',
      description: 'Exclusive pieces from master craftsmen',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <HorseshoeCursor />
      <Navigation onNavigate={onNavigate} currentPage="shop" />
      
      {/* Hero Section - Coming Soon */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              background: 'linear-gradient(135deg, #0F0F0F 0%, #1a1a1a 50%, #0F0F0F 100%),';
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.3) saturate(1.2)',
            }}
          />
          {/* Golden overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/70 via-[#C9A24E]/10 to-[#0F0F0F]" />

          {/* Animated sparks effect - reduced for performance */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                width: Math.random() * 5 + 2,
                height: Math.random() * 5 + 2,
                backgroundImage: 'radial-gradient(circle, rgba(201, 162, 78, 1) 0%, rgba(168, 139, 99, 0.6) 100%)',
              }}
              animate={{
                y: [0, -120 - Math.random() * 60],
                x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
                opacity: [0, 1, 0],
                scale: [0, 1.8, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 3,
                repeat: Infinity,
                delay: Math.random() * 5,
                ease: [0.22, 1, 0.36, 1],
              }}
            />
          ))}
          
          {/* Additional floating icons */}
          {[PrecisionIcon, LaserSignIcon, ExcellenceIcon].map((Icon, i) => (
            <motion.div
              key={`icon-${i}`}
              className="absolute"
              style={{
                left: `${15 + i * 30}%`,
                top: `${20 + (i % 2) * 40}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, (i % 2 === 0 ? 20 : -20), 0],
                rotate: [0, 360],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                delay: i * 1.5,
                ease: 'easeInOut',
              }}
            >
              <Icon 
                size={24 + i * 8}
                color="#C9A24E"
              />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          {/* Animated Rocket with Trail */}
          <motion.div className="mb-8 flex justify-center relative">
            <motion.div
              className="absolute inset-0 -inset-8"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background: 'radial-gradient(circle, rgba(201, 162, 78, 0.4) 0%, transparent 70%)',
                filter: 'blur(20px)',
              }}
            />
            <motion.div 
              animate={{
                y: [0, -15, 0],
                rotate: [0, -5, 5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Rocket 
                className="text-[#C9A24E] relative z-10" 
                size={80}
                style={{
                  filter: 'drop-shadow(0 0 25px rgba(201, 162, 78, 0.8))',
                }}
              />
            </motion.div>
            
            {/* Sparkle Trail */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute left-1/2 top-1/2"
                animate={{
                  y: [0, 30 + i * 15],
                  x: [0, (Math.random() - 0.5) * 20],
                  opacity: [0.8, 0],
                  scale: [1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: 'easeOut',
                }}
              >
                <Sparkles 
                  className="text-[#C9A24E]" 
                  size={16}
                  style={{
                    filter: 'drop-shadow(0 0 4px rgba(201, 162, 78, 0.8))',
                  }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Animated Title with Shimmer */}
          <div className="relative mb-6">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-display relative z-10"
              style={{
                backgroundImage: 'linear-gradient(135deg, #C9A24E 0%, #f59e0b 50%, #C9A24E 100%)',
                backgroundSize: '200% auto',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% center', '200% center'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              COMING SOON
            </motion.h1>
            
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 -inset-4 blur-3xl"
              animate={{
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background: 'radial-gradient(ellipse at center, rgba(201, 162, 78, 0.6) 0%, transparent 70%)',
              }}
            />
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-[#F5F4F1]/80 mb-12 font-heading"
          >
            The Creative Shop – Where artistry meets craftsmanship
          </motion.p>

          {/* Animated Button with Pulse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="relative inline-block"
          >
            <motion.div
              className="absolute inset-0 -inset-2 rounded-lg"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.98, 1.02, 0.98],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background: 'linear-gradient(135deg, rgba(201, 162, 78, 0.3), rgba(245, 158, 11, 0.3))',
                filter: 'blur(10px)',
              }}
            />
            <Button 
              onClick={() => onNavigate('laser')}
              className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] px-8 py-6 text-lg font-heading relative z-10 transition-all duration-300"
              style={{
                boxShadow: '0 0 30px rgba(201, 162, 78, 0.4)',
              }}
            >
              Explore Laser Cutting Services
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Coming Soon Features Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#0F0F0F] to-[#1a1a1a]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display text-[#C9A24E] mb-4">
              What's in Store
            </h2>
            <div className="w-24 h-1 bg-[#C9A24E] mx-auto mb-8" />
            <p className="text-lg text-[#F5F4F1]/70 font-body max-w-3xl mx-auto">
              Discover exclusive laser-cut creations and custom pieces (coming 2026)
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {comingSoonFeatures.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -12, scale: 1.02 }}
                className="bg-[#1a1a1a] border border-[#C9A24E]/20 rounded-lg p-8 hover:border-[#C9A24E]/60 transition-all duration-500 relative group overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(201, 162, 78, 0.1) 0%, transparent 70%)',
                  }}
                />
                
                {/* Icon with Animation */}
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 inline-block"
                >
                  <item.Icon 
                    size={56}
                    color="#C9A24E"
                  />
                </motion.div>
                
                <h3 className="text-2xl font-heading text-[#F5F4F1] mb-3 relative z-10">
                  {item.title}
                </h3>
                <p className="text-[#F5F4F1]/70 font-body leading-relaxed relative z-10">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Launch Timeline Section */}
      <section className="py-24 px-4 bg-[#0F0F0F]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center"
          >
            {/* Animated Sparkles Icon */}
            <motion.div
              className="mb-6 mx-auto inline-block relative"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <motion.div
                className="absolute inset-0 -inset-4"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(201, 162, 78, 0.5) 0%, transparent 70%)',
                  filter: 'blur(15px)',
                }}
              />
              <Sparkles 
                className="text-[#C9A24E] relative z-10" 
                size={64}
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(201, 162, 78, 0.8))',
                }}
              />
            </motion.div>
            
            <h2 className="text-4xl md:text-5xl font-display text-[#C9A24E] mb-6">
              Launching 2026
            </h2>
            <p className="text-xl text-[#F5F4F1]/70 mb-10 font-heading">
              We're crafting something special for you
            </p>
            
            {/* Enhanced Progress Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="max-w-md mx-auto mb-12"
            >
              <div className="relative w-full h-4 bg-[#1a1a1a] rounded-full overflow-hidden border border-[#C9A24E]/30">
                {/* Animated shimmer in background */}
                <motion.div
                  className="absolute inset-0 opacity-30"
                  animate={{
                    x: ['-100%', '200%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(201, 162, 78, 0.5) 50%, transparent 100%)',
                    width: '50%',
                  }}
                />
                
                {/* Progress fill */}
                <motion.div
                  className="h-full bg-gradient-to-r from-[#C9A24E] to-[#f59e0b] rounded-full relative overflow-hidden"
                  initial={{ width: '0%' }}
                  whileInView={{ width: '45%' }}
                  transition={{ delay: 0.5, duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  style={{
                    boxShadow: '0 0 25px rgba(201, 162, 78, 0.7), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
                  }}
                >
                  {/* Moving shine effect */}
                  <motion.div
                    className="absolute inset-0 h-full"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: 'easeInOut',
                    }}
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.4) 50%, transparent 100%)',
                      width: '30%',
                    }}
                  />
                </motion.div>
              </div>
              <motion.p 
                className="text-[#F5F4F1]/60 font-body mt-4 text-sm"
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                45% Complete
              </motion.p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Notify Me Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#0F0F0F] to-[#1a1a1a]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-[#1a1a1a] border border-[#C9A24E]/20 rounded-2xl p-8 md:p-12 relative overflow-hidden group">
            {/* Animated background glow */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: 'radial-gradient(circle at center, rgba(201, 162, 78, 0.05) 0%, transparent 70%)',
              }}
            />
            
            {/* Bell with Ring Animation */}
            <motion.div
              className="mb-6 mx-auto inline-block relative"
              whileHover={{
                rotate: [0, -15, 15, -15, 15, 0],
              }}
              transition={{
                duration: 0.5,
              }}
            >
              <motion.div
                className="absolute inset-0 -inset-3"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                style={{
                  background: 'radial-gradient(circle, rgba(201, 162, 78, 0.4) 0%, transparent 70%)',
                  filter: 'blur(12px)',
                }}
              />
              <Bell 
                className="text-[#C9A24E] relative z-10" 
                size={56}
                style={{
                  filter: 'drop-shadow(0 0 18px rgba(201, 162, 78, 0.7))',
                }}
              />
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-display text-[#C9A24E] mb-4 text-center relative z-10">
              Be the First to Know
            </h3>
            <p className="text-lg text-[#F5F4F1]/80 font-body mb-8 text-center relative z-10">
              Join our exclusive list and get notified when the shop launches
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto relative z-10">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#0F0F0F] border-[#C9A24E]/30 text-[#F5F4F1] placeholder:text-[#F5F4F1]/40 focus:border-[#C9A24E] font-body text-lg py-6 transition-all duration-300 focus:shadow-[0_0_20px_rgba(201,162,78,0.2)]"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={handleNotify}
                  disabled={!email}
                  className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] font-heading whitespace-nowrap px-8 py-6 text-lg transition-all duration-300"
                  style={{
                    boxShadow: '0 0 20px rgba(201, 162, 78, 0.3)',
                  }}
                >
                  Notify Me
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-[#0F0F0F]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display text-[#C9A24E] mb-6">
            Ready for Custom Work?
          </h2>
          <p className="text-xl text-[#F5F4F1]/70 mb-10 font-heading">
            Explore our laser cutting services while you wait
          </p>
          <Button
            onClick={() => onNavigate('laser')}
            className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] px-12 py-6 text-lg font-heading"
          >
            View Laser Cutting Services
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </motion.div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}