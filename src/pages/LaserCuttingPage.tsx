import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Sparkles, Handshake, ArrowRight, Bell, Rocket, Users, Layers } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { toast } from 'sonner';

interface LaserCuttingPageProps {
  onNavigate: (page: string) => void;
}

export function LaserCuttingPage({ onNavigate }: LaserCuttingPageProps) {
  const [email, setEmail] = useState('');

  const handleNotify = () => {
    if (email) {
      toast.success('You\'re on the list! We\'ll keep you updated on our laser cutting journey.');
      setEmail('');
    }
  };

  const upcomingCapabilities = [
    {
      icon: Zap,
      title: 'Precision Cutting',
      description: 'State-of-the-art laser technology for intricate designs and complex patterns in premium metals.',
    },
    {
      icon: Layers,
      title: 'Custom Fabrication',
      description: 'From architectural elements to decorative panels—bringing creative visions to life.',
    },
    {
      icon: Sparkles,
      title: 'Design Excellence',
      description: 'Collaborative process from concept to completion with expert design consultation.',
    },
  ];

  const potentialProjects = [
    'Ornamental Gates & Entrances',
    'Architectural Screens',
    'Bespoke Metal Signage',
    'Garden Art & Sculptures',
    'Decorative Panels',
    'Custom Hardware',
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <HorseshoeCursor />
      <Navigation onNavigate={onNavigate} currentPage="laser" />
      
      {/* Hero Section - Exciting Collaboration Coming */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?w=1920)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.3) saturate(1.2)',
            }}
          />
          {/* Golden overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/70 via-[#C9A24E]/10 to-[#0F0F0F]" />

          {/* Animated laser sparks effect - reduced for performance */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${10 + Math.random() * 80}%`,
                top: `${10 + Math.random() * 80}%`,
                width: Math.random() * 5 + 2,
                height: Math.random() * 5 + 2,
                backgroundImage: 'radial-gradient(circle, rgba(201, 162, 78, 1) 0%, rgba(120, 161, 187, 0.6) 100%)',
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
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          {/* Animated Handshake Icon */}
          <motion.div className="mb-8 flex justify-center relative">
            <motion.div
              className="absolute inset-0 -inset-12"
              animate={{
                scale: [1, 1.4, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{
                background: 'radial-gradient(circle, rgba(201, 162, 78, 0.5) 0%, transparent 70%)',
                filter: 'blur(25px)',
              }}
            />
            <motion.div 
              animate={{
                y: [0, -15, 0],
                rotate: [0, -8, 8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <Handshake 
                className="text-[#C9A24E] relative z-10" 
                size={90}
                style={{
                  filter: 'drop-shadow(0 0 30px rgba(201, 162, 78, 0.9))',
                }}
              />
            </motion.div>
          </motion.div>

          {/* Animated Title with Shimmer */}
          <div className="relative mb-6">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-display relative z-10"
              style={{
                backgroundImage: 'linear-gradient(135deg, #C9A24E 0%, #78A1BB 50%, #C9A24E 100%)',
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
              EXCITING COLLABORATION AHEAD
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
            className="text-xl md:text-2xl text-[#F5F4F1]/80 mb-6 font-heading"
          >
            We're in discussions with leading laser cutting specialists
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-lg text-[#F5F4F1]/70 mb-12 font-body max-w-3xl mx-auto"
          >
            Peninsula Equine is expanding into precision laser cutting and custom metal fabrication. 
            We're working to partner with industry experts to bring you exceptional craftsmanship—launching in 2026.
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
                background: 'linear-gradient(135deg, rgba(201, 162, 78, 0.3), rgba(120, 161, 187, 0.3))',
                filter: 'blur(10px)',
              }}
            />
            <Button 
              onClick={() => onNavigate('contact')}
              className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] px-8 py-6 text-lg font-heading relative z-10 transition-all duration-300"
              style={{
                boxShadow: '0 0 30px rgba(201, 162, 78, 0.4)',
              }}
            >
              Express Your Interest
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* Journey Timeline Section */}
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
              Our Journey to Precision
            </h2>
            <div className="w-24 h-1 bg-[#C9A24E] mx-auto mb-8" />
            <p className="text-lg text-[#F5F4F1]/70 font-body max-w-3xl mx-auto">
              Building on our equestrian construction expertise, we're expanding into laser cutting and custom metal fabrication
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* Timeline Steps */}
            <div className="space-y-12">
              {[
                {
                  icon: Users,
                  status: 'In Progress',
                  title: 'Partnership Discussions',
                  description: 'Currently in talks with leading laser cutting specialists who share our commitment to excellence and craftsmanship.',
                  color: '#C9A24E',
                },
                {
                  icon: Rocket,
                  status: 'Coming 2026',
                  title: 'Launch & Collaboration',
                  description: 'Finalizing the partnership and establishing state-of-the-art facilities to deliver premium laser cutting services.',
                  color: '#78A1BB',
                },
                {
                  icon: Sparkles,
                  status: 'Future',
                  title: 'Full Service Portfolio',
                  description: 'Offering comprehensive custom fabrication from architectural elements to artistic metalwork—all with Peninsula Equine quality.',
                  color: '#C9A24E',
                },
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true }}
                  className="flex gap-6 items-start group"
                >
                  {/* Icon with glow */}
                  <div className="relative flex-shrink-0">
                    <motion.div
                      className="absolute inset-0 -inset-3"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: index * 0.3,
                      }}
                      style={{
                        background: `radial-gradient(circle, ${step.color}40 0%, transparent 70%)`,
                        filter: 'blur(12px)',
                      }}
                    />
                    <div 
                      className="relative z-10 p-4 rounded-lg border"
                      style={{
                        backgroundColor: '#1a1a1a',
                        borderColor: `${step.color}40`,
                      }}
                    >
                      <step.icon 
                        size={32}
                        style={{ color: step.color }}
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div 
                      className="inline-block px-3 py-1 rounded-full text-sm font-heading mb-3"
                      style={{
                        backgroundColor: `${step.color}20`,
                        color: step.color,
                      }}
                    >
                      {step.status}
                    </div>
                    <h3 className="text-2xl font-display text-[#F5F4F1] mb-3">
                      {step.title}
                    </h3>
                    <p className="text-[#F5F4F1]/70 font-body leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Capabilities Section */}
      <section className="py-24 px-4 bg-[#0F0F0F]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display text-[#C9A24E] mb-4">
              What We're Planning
            </h2>
            <div className="w-24 h-1 bg-[#C9A24E] mx-auto mb-8" />
            <p className="text-lg text-[#F5F4F1]/70 font-body max-w-3xl mx-auto">
              Premium laser cutting capabilities coming to Peninsula Equine
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingCapabilities.map((item, index) => (
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
                  whileHover={{ rotate: [0, -10, 10, 0], scale: 1.15 }}
                  transition={{ duration: 0.5 }}
                  className="mb-4 inline-block"
                >
                  <item.icon 
                    className="text-[#C9A24E]" 
                    size={48}
                    style={{
                      filter: 'drop-shadow(0 0 12px rgba(201, 162, 78, 0.6))',
                    }}
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

      {/* Potential Projects Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#0F0F0F] to-[#1a1a1a]">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display text-[#C9A24E] mb-4">
              Envisioned Projects
            </h2>
            <div className="w-24 h-1 bg-[#C9A24E] mx-auto mb-8" />
            <p className="text-lg text-[#F5F4F1]/70 font-body">
              The types of custom work we're preparing to deliver
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {potentialProjects.map((project, index) => (
              <motion.div
                key={project}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-[#1a1a1a] border border-[#78A1BB]/20 rounded-lg p-6 text-center hover:border-[#78A1BB]/50 transition-all duration-500 relative group overflow-hidden"
              >
                {/* Subtle shine effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at center, rgba(120, 161, 187, 0.08) 0%, transparent 70%)',
                  }}
                />
                <p className="text-[#F5F4F1] font-heading relative z-10">
                  {project}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stay Updated Section */}
      <section className="py-24 px-4 bg-[#0F0F0F]">
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
                duration: 0.6,
              }}
            >
              <motion.div
                className="absolute inset-0 -inset-3"
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
                  background: 'radial-gradient(circle, rgba(201, 162, 78, 0.5) 0%, transparent 70%)',
                  filter: 'blur(15px)',
                }}
              />
              <Bell 
                className="text-[#C9A24E] relative z-10" 
                size={56}
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(201, 162, 78, 0.8))',
                }}
              />
            </motion.div>
            
            <h3 className="text-3xl md:text-4xl font-display text-[#C9A24E] mb-4 text-center relative z-10">
              Stay in the Loop
            </h3>
            <p className="text-lg text-[#F5F4F1]/80 font-body mb-8 text-center relative z-10">
              Get notified about our laser cutting journey and be first to know when we launch in 2026
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
      <section className="py-24 px-4 bg-gradient-to-b from-[#0F0F0F] to-[#1a1a1a]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display text-[#C9A24E] mb-6">
            Let's Talk About Your Vision
          </h2>
          <p className="text-xl text-[#F5F4F1]/70 mb-10 font-heading">
            Express your interest and we'll keep you updated on our laser cutting capabilities
          </p>
          <Button
            onClick={() => onNavigate('contact')}
            className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] px-12 py-6 text-lg font-heading"
          >
            Get in Touch
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </motion.div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}