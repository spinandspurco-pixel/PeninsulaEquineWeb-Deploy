import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ConstructionVideoShowcase } from '../components/ConstructionVideoShowcase';
import { ArenaIcon, StableIcon, ShelterIcon, FencingIcon, RoundYardIcon, ExcellenceIcon, ProjectsIcon, LaserSignIcon } from '../components/icons/ServiceIcons';

interface ConstructionsPageProps {
  onNavigate: (page: string) => void;
}

export function ConstructionsPage({ onNavigate }: ConstructionsPageProps) {
  const expertise = [
    {
      Icon: ArenaIcon,
      title: 'Arenas & Riding Surfaces',
      description: 'Custom-engineered riding arenas for dressage, jumping, western, and all disciplines with premium footing systems.',
    },
    {
      Icon: StableIcon,
      title: 'Barn Homes & Living Quarters',
      description: 'Luxury barn homes where you live alongside your horses. Complete with loft apartments, tack rooms, and modern amenities.',
    },
    {
      Icon: ExcellenceIcon,
      title: 'Bespoke Stable Complexes',
      description: 'From single stalls to multi-horse facilities with wash bays, grooming areas, and climate-controlled environments.',
    },
    {
      Icon: ShelterIcon,
      title: 'Day Yards & Shelters',
      description: 'Weather-proof shelters, run-in sheds, and secure day paddocks designed for horse safety and comfort.',
    },
    {
      Icon: FencingIcon,
      title: 'Premium Fencing Systems',
      description: 'Post and rail, PVC, electric, and custom fencing solutions that look stunning and keep horses safe.',
    },
    {
      Icon: RoundYardIcon,
      title: 'Round Yards & Training Pens',
      description: 'Professional round yards and lunging pens for breaking, training, and rehabilitation.',
    },
    {
      Icon: ProjectsIcon,
      title: 'Sheds & Storage Buildings',
      description: 'Feed sheds, hay barns, machinery storage, and workshop buildings built to last.',
    },
    {
      Icon: LaserSignIcon,
      title: 'Creative Custom Builds',
      description: 'If you can dream it, we can build it. Unique designs, upmarket finishes, and outside-the-box solutions.',
    },
  ];

  const projects = [
    {
      name: 'Willowbrook Estate',
      type: 'Barn Home & Arena Complex',
      location: 'Mornington Peninsula',
      image: 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800',
    },
    {
      name: 'Heritage Stables',
      type: 'Luxury 12-Stall Facility',
      location: 'Yarra Valley',
      image: 'https://images.unsplash.com/photo-1534682988865-f6a2f7d9f31c?w=800',
    },
    {
      name: 'Sunset Ridge Ranch',
      type: 'Complete Equestrian Estate',
      location: 'Gippsland',
      image: 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <HorseshoeCursor />
      <Navigation onNavigate={onNavigate} currentPage="constructions" />
      
      {/* Hero Section - Daylight Construction Video */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background Placeholder */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'brightness(0.4)',
            }}
          />
          {/* Warm overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/60 via-transparent to-[#0F0F0F]" />
        </div>

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 text-center px-4 max-w-5xl mx-auto"
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-display mb-6"
            style={{
              color: '#C9A24E',
              textShadow: '0 0 40px rgba(201, 162, 78, 0.4)',
            }}
          >
            FROM DIRT TO DYNASTY
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-[#F5F4F1]/80 mb-12 font-heading"
          >
            Barn homes, luxury stables, arenas & creative builds — if it's equine, we build it
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Button 
              onClick={() => onNavigate('contact')}
              className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] px-8 py-6 text-lg font-heading"
            >
              Discuss Your Build
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 border-2 border-[#C9A24E]/50 rounded-full flex justify-center pt-2">
            <motion.div 
              className="w-1.5 h-1.5 bg-[#C9A24E] rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>

      {/* Our Expertise Section */}
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
              Our Expertise
            </h2>
            <div className="w-24 h-1 bg-[#C9A24E] mx-auto" />
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {expertise.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="bg-[#1a1a1a] border border-[#C9A24E]/20 rounded-lg p-6 hover:border-[#C9A24E]/50 transition-all duration-500"
              >
                <item.Icon size={48} color="#C9A24E" className="mb-3" />
                <h3 className="text-lg font-heading text-[#F5F4F1] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#F5F4F1]/70 font-body leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature Projects Section */}
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
              Signature Projects
            </h2>
            <div className="w-24 h-1 bg-[#C9A24E] mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -12 }}
                className="group relative overflow-hidden rounded-lg cursor-pointer"
                onClick={() => onNavigate('projects')}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.8 }}
                  />
                </div>
                
                {/* Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
                >
                  <h3 className="text-2xl font-display text-[#C9A24E] mb-2">
                    {project.name}
                  </h3>
                  <p className="text-[#F5F4F1]/80 font-heading text-sm mb-1">
                    {project.type}
                  </p>
                  <p className="text-[#A88B63] font-body text-sm">
                    {project.location}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => onNavigate('projects')}
              variant="outline"
              className="border-[#C9A24E] text-[#C9A24E] hover:bg-[#C9A24E] hover:text-[#0F0F0F] font-heading"
            >
              View All Projects
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Construction Video Showcase */}
      <ConstructionVideoShowcase />

      {/* Philosophy Section */}
      <section className="py-24 px-4 bg-gradient-to-b from-[#0F0F0F] to-[#1a1a1a]">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-display text-[#C9A24E] mb-8">
              Our Philosophy
            </h2>
            <div className="w-24 h-1 bg-[#C9A24E] mx-auto mb-12" />
            
            <p className="text-xl text-[#F5F4F1]/80 leading-relaxed mb-6 font-body">
              At Peninsula Equine, we don't just build structures — we create bespoke equine environments where horses and their people thrive together. From barn homes where you live alongside your horses, to luxury stables with every amenity imaginable.
            </p>
            <p className="text-lg text-[#F5F4F1]/70 leading-relaxed font-body">
              Ciro brings 20+ years of hands-on expertise and an outside-the-box creative approach. If you can dream it, we can build it. No project is too unique, no vision too ambitious.
            </p>
          </motion.div>
        </div>
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
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-[#F5F4F1]/70 mb-10 font-heading">
            Barn homes, stables, arenas, sheds — let's bring your equine vision to life
          </p>
          <Button
            onClick={() => onNavigate('contact')}
            className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] px-12 py-6 text-lg font-heading"
          >
            Discuss Your Build
            <ArrowRight className="ml-2" size={20} />
          </Button>
        </motion.div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}