import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bell, Zap, Star } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { CleanNavigation } from '../components/CleanNavigation';
import { Footer } from '../components/Footer';
import { toast } from 'sonner';
import { LaserSignIcon, PrecisionIcon, ExcellenceIcon } from '../components/icons/ServiceIcons';

interface LaserCuttingPageProps {
  onNavigate: (page: string) => void;
}

export function CleanLaserCuttingPage({ onNavigate }: LaserCuttingPageProps) {
  const [email, setEmail] = useState('');

  const handleNotify = () => {
    if (email) {
      toast.success('You\'re on the list! We\'ll notify you when laser cutting services launch.');
      setEmail('');
    }
  };

  const capabilities = [
    {
      Icon: PrecisionIcon,
      title: 'Precision Cutting',
      description: 'State-of-the-art laser technology for intricate designs and complex patterns.',
    },
    {
      Icon: LaserSignIcon,
      title: 'Custom Fabrication',
      description: 'From architectural elements to decorative panels—bringing visions to life.',
    },
    {
      Icon: ExcellenceIcon,
      title: 'Design Excellence',
      description: 'Collaborative process from concept to completion with expert consultation.',
    },
  ];

  const projects = [
    'Ornamental Gates & Entrances',
    'Architectural Screens',
    'Bespoke Metal Signage',
    'Garden Art & Sculptures',
    'Decorative Panels',
    'Custom Hardware',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-steel-950 to-steel-900">
      <CleanNavigation onNavigate={onNavigate} currentPage="laser-cutting" />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block bg-gold-400/20 px-4 py-2 rounded-full mb-6"
          >
            <span className="text-gold-400 font-medium">Coming Soon</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold text-gold-400 mb-6"
          >
            Laser Cutting Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-steel-200 max-w-3xl mx-auto mb-8"
          >
            Precision laser cutting and custom fabrication services launching soon
          </motion.p>
        </div>
      </section>

      {/* Coming Soon Features */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 text-center"
              >
                <div className="w-16 h-16 bg-gold-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <capability.Icon className="w-8 h-8 text-gold-400" />
                </div>
                <h3 className="text-xl font-semibold text-gold-400 mb-3">
                  {capability.title}
                </h3>
                <p className="text-steel-300">
                  {capability.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Types */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gold-400 mb-12">
            What We'll Create
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-4 hover:bg-gold-500/10 transition-colors"
              >
                <Star className="w-5 h-5 text-gold-400 mb-2" />
                <span className="text-steel-200">{project}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Notification Signup */}
      <section className="py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card p-8"
          >
            <Bell className="w-12 h-12 text-gold-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gold-400 mb-4">
              Be the First to Know
            </h2>
            <p className="text-steel-300 mb-8">
              Get notified when our laser cutting services launch and be among the first to experience precision craftsmanship.
            </p>
            <div className="flex gap-4 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-steel-800/50 border-steel-600 text-steel-100 placeholder:text-steel-400"
              />
              <Button
                onClick={handleNotify}
                className="btn-premium"
              >
                Notify Me
                <Bell className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card p-8"
          >
            <Zap className="w-12 h-12 text-gold-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gold-400 mb-4">
              Have a Project in Mind?
            </h2>
            <p className="text-xl text-steel-300 mb-8">
              Contact us now to discuss your custom fabrication needs
            </p>
            <Button
              onClick={() => onNavigate('contact')}
              className="btn-premium text-lg px-8 py-3"
            >
              Get in Touch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}