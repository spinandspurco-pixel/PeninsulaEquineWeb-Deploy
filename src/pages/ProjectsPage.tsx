import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
// Placeholder images - will be replaced with real hosted images
const img1 = 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800';
const img2 = 'https://images.unsplash.com/photo-1534682988865-f6a2f7d9f31c?w=800';
const img3 = 'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=800';
const img4 = 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800';
const img5 = 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800';
const img6 = 'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800';
const img7 = 'https://images.unsplash.com/photo-1544690244-b72983293ab3?w=800';
const img8 = 'https://images.unsplash.com/photo-1580914743203-a487c4c9b5d2?w=800';
const img9 = 'https://images.unsplash.com/photo-1590159461194-b48b0f4c5520?w=800';
const horseImg = 'https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800';

interface ProjectsPageProps {
  onNavigate: (page: string) => void;
}

type ProjectCategory = 'All' | 'Arenas' | 'Barn Homes' | 'Stables' | 'Sheds & Storage' | 'Custom Builds';

interface Project {
  id: number;
  name: string;
  category: ProjectCategory;
  location: string;
  image: string;
  description: string;
}

export function ProjectsPage({ onNavigate }: ProjectsPageProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('All');

  const projects: Project[] = [
    {
      id: 1,
      name: 'Luxury Barn Home Estate',
      category: 'Barn Homes',
      location: 'Mornington Peninsula',
      image: img1,
      description: 'Complete barn home with living quarters above a 6-stall stable complex',
    },
    {
      id: 2,
      name: 'Olympic Dressage Arena',
      category: 'Arenas',
      location: 'Peninsula Region',
      image: img2,
      description: 'Competition-grade 60x20m arena with premium sand and fiber footing',
    },
    {
      id: 3,
      name: 'Western Training Arena',
      category: 'Arenas',
      location: 'Gippsland',
      image: img3,
      description: 'Custom arena with specialized footing for reining and cutting',
    },
    {
      id: 4,
      name: '12-Stall Stable Complex',
      category: 'Stables',
      location: 'Macedon Ranges',
      image: img4,
      description: 'Luxury stable with wash bay, tack room, and climate control',
    },
    {
      id: 5,
      name: 'Barn Home with Loft Living',
      category: 'Barn Homes',
      location: 'Yarra Valley',
      image: img5,
      description: 'Stunning 2-bedroom loft apartment above 4 stalls with indoor connection',
    },
    {
      id: 6,
      name: 'Premium Hay Barn & Storage',
      category: 'Sheds & Storage',
      location: 'Werribee',
      image: img6,
      description: 'Large-scale hay storage with equipment shed and workshop',
    },
    {
      id: 7,
      name: 'Creative Round Yard Complex',
      category: 'Custom Builds',
      location: 'Gippsland',
      image: img7,
      description: 'Unique design with covered round yard connected to day yards',
    },
    {
      id: 8,
      name: 'Heritage Style Stable',
      category: 'Stables',
      location: 'Peninsula',
      image: img8,
      description: 'Bespoke stable construction with premium timber features',
    },
    {
      id: 9,
      name: 'Machinery & Feed Shed',
      category: 'Sheds & Storage',
      location: 'Victoria',
      image: horseImg,
      description: 'Large machinery shed with integrated feed room and storage',
    },
  ];

  const categories: ProjectCategory[] = ['All', 'Arenas', 'Barn Homes', 'Stables', 'Sheds & Storage', 'Custom Builds'];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <HorseshoeCursor />
      <Navigation onNavigate={onNavigate} currentPage="projects" />
      
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#0F0F0F]" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-display text-[#C9A24E] mb-6">
            Our Projects
          </h1>
          <div className="w-24 h-1 bg-[#C9A24E] mx-auto mb-8" />
          <p className="text-xl text-[#F5F4F1]/70 font-heading">
            Barn homes, arenas, stables, sheds & creative builds across Victoria
          </p>
        </motion.div>
      </section>

      {/* Filter Section */}
      <section className="px-4 pb-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center gap-3 flex-wrap"
          >
            <Filter className="text-[#C9A24E]" size={20} />
            {categories.map((category) => (
              <Button
                key={category}
                onClick={() => setActiveFilter(category)}
                variant={activeFilter === category ? 'default' : 'outline'}
                className={
                  activeFilter === category
                    ? 'bg-[#C9A24E] text-[#0F0F0F] hover:bg-[#A88B63] font-heading'
                    : 'border-[#C9A24E]/30 text-[#F5F4F1] hover:border-[#C9A24E] hover:bg-[#C9A24E]/10 font-heading'
                }
              >
                {category}
              </Button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  whileHover={{ y: -12 }}
                  className="group relative overflow-hidden rounded-lg cursor-pointer"
                >
                  {/* Project Image */}
                  <div className="aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.8 }}
                      className="w-full h-full"
                    >
                      {typeof project.image === 'string' ? (
                        <img
                          src={project.image}
                          alt={project.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <img
                          src={project.image}
                          alt={project.name}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </motion.div>
                  </div>

                  {/* Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
                  >
                    <span className="text-[#C9A24E] text-sm font-heading mb-2">
                      {project.category}
                    </span>
                    <h3 className="text-2xl font-display text-[#F5F4F1] mb-2">
                      {project.name}
                    </h3>
                    <p className="text-[#A88B63] font-body text-sm mb-2">
                      {project.location}
                    </p>
                    <p className="text-[#F5F4F1]/70 font-body text-sm">
                      {project.description}
                    </p>
                  </motion.div>

                  {/* Bottom Info Bar - Always Visible */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0F0F0F]/90 to-transparent p-4 group-hover:opacity-0 transition-opacity duration-500">
                    <h3 className="text-lg font-display text-[#C9A24E]">
                      {project.name}
                    </h3>
                    <p className="text-[#F5F4F1]/60 text-sm font-body">
                      {project.location}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-[#F5F4F1]/50 text-xl font-heading">
                No projects found in this category
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-to-t from-[#1a1a1a] to-[#0F0F0F]">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-display text-[#C9A24E] mb-6">
            Start Your Project
          </h2>
          <p className="text-xl text-[#F5F4F1]/70 mb-10 font-heading">
            Ready to create something exceptional? Let's talk about your vision
          </p>
          <Button
            onClick={() => onNavigate('contact')}
            className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] px-12 py-6 text-lg font-heading"
          >
            Get in Touch
          </Button>
        </motion.div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}