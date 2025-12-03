import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { CleanNavigation } from '../components/CleanNavigation';
import { Footer } from '../components/Footer';
import { ConstructionVideoShowcase } from '../components/ConstructionVideoShowcase';
import { ArenaIcon, StableIcon, ShelterIcon, FencingIcon, RoundYardIcon, ExcellenceIcon } from '../components/icons/ServiceIcons';

interface ConstructionsPageProps {
  onNavigate: (page: string) => void;
}

export function CleanConstructionsPage({ onNavigate }: ConstructionsPageProps) {
  const services = [
    {
      Icon: ArenaIcon,
      title: 'Arenas & Riding Surfaces',
      description: 'Custom-engineered riding arenas with premium footing systems for all disciplines.',
    },
    {
      Icon: StableIcon,
      title: 'Barn Homes & Living Quarters', 
      description: 'Luxury barn homes where you live alongside your horses with modern amenities.',
    },
    {
      Icon: ExcellenceIcon,
      title: 'Bespoke Stable Complexes',
      description: 'Complete horse facilities with wash bays, grooming areas, and climate control.',
    },
    {
      Icon: ShelterIcon,
      title: 'Shelters & Run-ins',
      description: 'Weather-proof shelters and secure paddocks designed for horse safety.',
    },
    {
      Icon: FencingIcon,
      title: 'Premium Fencing',
      description: 'Professional fencing solutions that look stunning and keep horses secure.',
    },
    {
      Icon: RoundYardIcon,
      title: 'Training Facilities',
      description: 'Round yards and training pens for breaking, training, and rehabilitation.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-steel-950 to-steel-900">
      <CleanNavigation onNavigate={onNavigate} currentPage="constructions" />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-gold-400 mb-6"
          >
            Construction Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-steel-200 max-w-3xl mx-auto mb-8"
          >
            Professional equestrian construction services from ground preparation to complete facilities
          </motion.p>
        </div>
      </section>

      {/* Video Showcase */}
      <section className="mb-20">
        <ConstructionVideoShowcase />
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:bg-gold-500/10 transition-all duration-300 group cursor-pointer"
                onClick={() => onNavigate('projects')}
              >
                <div className="w-16 h-16 bg-gold-400/20 rounded-full flex items-center justify-center mb-4 group-hover:bg-gold-400/30 transition-colors">
                  <service.Icon className="w-8 h-8 text-gold-400" />
                </div>
                <h3 className="text-xl font-semibold text-gold-400 mb-3 group-hover:text-gold-300 transition-colors">
                  {service.title}
                </h3>
                <p className="text-steel-300 leading-relaxed">
                  {service.description}
                </p>
                <ArrowRight className="w-5 h-5 text-gold-400 mt-4 transform translate-x-0 group-hover:translate-x-2 transition-transform" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="glass-card p-8"
          >
            <h2 className="text-3xl font-bold text-gold-400 mb-4">
              Ready to Build Your Dream Facility?
            </h2>
            <p className="text-xl text-steel-300 mb-8">
              Get a free consultation and quote for your equestrian construction project
            </p>
            <Button
              onClick={() => onNavigate('contact')}
              className="btn-premium text-lg px-8 py-3"
            >
              Get Free Quote
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}