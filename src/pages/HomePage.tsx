import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Shield, Award, Users, Zap, CheckCircle, Star } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { VideoHero } from '../components/VideoHero';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0.8]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    {
      icon: Shield,
      title: "Premium Construction",
      description: "Elite equine facilities built with precision and care using the finest materials and craftmanship.",
      color: "from-gold-400 to-gold-600"
    },
    {
      icon: Zap,
      title: "Advanced Laser Cutting",
      description: "State-of-the-art laser precision for custom metalwork, gates, and specialized equine equipment.",
      color: "from-leather-500 to-leather-700"
    },
    {
      icon: Award,
      title: "Expert Craftsmanship",
      description: "Decades of experience creating world-class facilities for thoroughbred racing and equine care.",
      color: "from-steel-600 to-steel-800"
    },
    {
      icon: Users,
      title: "Professional Team",
      description: "Skilled craftsmen and safety-certified workers dedicated to excellence in every project.",
      color: "from-gold-500 to-leather-600"
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed", icon: CheckCircle },
    { number: "25+", label: "Years Experience", icon: Award },
    { number: "100%", label: "Safety Record", icon: Shield },
    { number: "5★", label: "Client Rating", icon: Star }
  ];

  const testimonials = [
    {
      name: "Sarah Wellington",
      role: "Thoroughbred Trainer",
      content: "Peninsula Equine transformed our facility into a world-class training center. Their attention to detail and understanding of equine needs is unmatched.",
      rating: 5
    },
    {
      name: "Michael Richardson", 
      role: "Racing Stable Owner",
      content: "The quality of workmanship and professionalism exceeded all expectations. Our horses have never been in better facilities.",
      rating: 5
    },
    {
      name: "Jennifer Hayes",
      role: "Veterinarian",
      content: "Their innovative designs and premium materials create the perfect environment for equine health and performance.",
      rating: 5
    }
  ];

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navigation onNavigate={onNavigate} currentPage="home" />
      
      {/* Enhanced Hero Section */}
      <motion.section 
        className="relative overflow-hidden"
        style={{ opacity }}
      >
        <VideoHero onNavigate={onNavigate} />
        
        {/* Parallax Background Elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: y1 }}
        >
          <div className="absolute top-20 right-20 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        </motion.div>
        
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ y: y2 }}
        >
          <div className="absolute bottom-20 left-20 w-80 h-80 bg-leather-600/10 rounded-full blur-3xl" />
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-background to-background-secondary">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-gradient-gold mb-6">
              Exceptional Craftsmanship
            </h2>
            <p className="text-xl text-foreground-muted max-w-3xl mx-auto">
              We create world-class equine facilities that combine traditional craftsmanship 
              with cutting-edge technology and materials.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="glass-card p-8 hover-glow cursor-pointer group"
                >
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <h3 className="text-xl font-display font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  
                  <p className="text-foreground-muted leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background-tertiary">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-gold mb-4 group-hover:shadow-gold transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-background" />
                  </motion.div>
                  
                  <motion.div
                    className="text-4xl md:text-5xl font-display font-bold text-gradient-gold mb-2"
                    whileInView={{ 
                      backgroundPosition: ["0%", "100%"],
                    }}
                    transition={{ duration: 2, delay: index * 0.2 }}
                  >
                    {stat.number}
                  </motion.div>
                  
                  <p className="text-foreground-muted font-medium">{stat.label}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-6">
              Client Excellence
            </h2>
            <p className="text-xl text-foreground-muted max-w-2xl mx-auto">
              Hear from industry leaders who trust Peninsula Equine with their most important projects.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card-strong p-8 group"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                  ))}
                </div>
                
                <blockquote className="text-foreground-secondary leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </blockquote>
                
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-foreground-muted text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-background-secondary via-background-tertiary to-background-secondary">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-6">
              Ready to Build Excellence?
            </h2>
            <p className="text-xl text-foreground-muted mb-8">
              Let's create something extraordinary together. Contact our team to discuss your vision.
            </p>
            
            <motion.button
              onClick={() => onNavigate('contact')}
              className="btn-premium text-lg px-8 py-4 inline-flex items-center gap-3 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Your Project
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}