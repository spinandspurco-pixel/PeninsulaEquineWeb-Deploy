import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Award, Users } from 'lucide-react';
import { CleanNavigation } from '../components/CleanNavigation';
import { Footer } from '../components/Footer';
import { VideoHero } from '../components/VideoHero';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {

  return (
    <div className="min-h-screen bg-background">
      <CleanNavigation onNavigate={onNavigate} currentPage="home" />
      
      {/* Clean Hero Section */}
      <section className="relative">
        <VideoHero onNavigate={onNavigate} />
      </section>

      {/* Services Overview - Clean & Simple */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-6">
              Our Services
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              Peninsula Equine delivers world-class construction and fabrication services for the equine industry.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              onClick={() => onNavigate('constructions')}
              className="glass-card p-8 hover-glow cursor-pointer group"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <Shield className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                Constructions
              </h3>
              
              <p className="text-foreground-muted leading-relaxed mb-4">
                Premium equine facilities, stables, and infrastructure built to the highest standards.
              </p>

              <div className="flex items-center text-gold-400 font-medium">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onClick={() => onNavigate('laser')}
              className="glass-card p-8 hover-glow cursor-pointer group"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-leather-500 to-leather-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <Zap className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                Laser Cutting
              </h3>
              
              <p className="text-foreground-muted leading-relaxed mb-4">
                Precision laser cutting services for custom metalwork, gates, and specialized equipment.
              </p>

              <div className="flex items-center text-gold-400 font-medium">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              onClick={() => onNavigate('shop')}
              className="glass-card p-8 hover-glow cursor-pointer group"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-steel-600 to-steel-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <Award className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                Shop Services
              </h3>
              
              <p className="text-foreground-muted leading-relaxed mb-4">
                Professional fabrication and custom metalwork solutions for all your equine needs.
              </p>

              <div className="flex items-center text-gold-400 font-medium">
                Learn More <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={() => onNavigate('projects')}
              className="glass-card p-8 hover-glow cursor-pointer group"
            >
              <motion.div
                className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold-500 to-leather-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
              >
                <Users className="w-8 h-8 text-white" />
              </motion.div>
              
              <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                Our Projects
              </h3>
              
              <p className="text-foreground-muted leading-relaxed mb-4">
                Explore our portfolio of completed projects and see the quality of our work.
              </p>

              <div className="flex items-center text-gold-400 font-medium">
                View Gallery <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Simple CTA Section */}
      <section className="py-20 bg-background-secondary">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-foreground-muted mb-8 max-w-2xl mx-auto">
              Get in touch with our team to discuss your equine construction and fabrication needs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                onClick={() => onNavigate('contact')}
                className="btn-premium text-lg px-8 py-4 inline-flex items-center gap-3 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Quote
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <motion.button
                onClick={() => onNavigate('portal')}
                className="glass-card px-8 py-4 text-foreground hover:text-gold-400 transition-colors cursor-pointer inline-flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Worker Portal
                <Shield className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}