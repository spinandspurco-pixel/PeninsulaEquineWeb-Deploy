import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { HorseshoeCursor } from '../components/HorseshoeCursor';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { toast } from 'sonner';

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

export function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent! We\'ll be in touch soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        message: '',
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F]">
      <HorseshoeCursor />
      <Navigation onNavigate={onNavigate} currentPage="contact" />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1a1a] to-[#0F0F0F]" />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-display text-[#C9A24E] mb-6">
            Get in Touch
          </h1>
          <div className="w-24 h-1 bg-[#C9A24E] mx-auto mb-8" />
          <p className="text-xl text-[#F5F4F1]/70 font-heading">
            Let's discuss your equestrian facility or custom fabrication project
          </p>
        </motion.div>
      </section>

      {/* Split View: Form + Map */}
      <section className="px-4 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-[#0F0F0F] border border-[#C9A24E]/20 rounded-lg p-8"
            >
              <h2 className="text-3xl font-display text-[#C9A24E] mb-6">
                Send Us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="text-[#F5F4F1] font-heading mb-2 block">
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-[#0F0F0F] border-[#C9A24E]/30 text-[#F5F4F1] focus:border-[#C9A24E] font-body"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#F5F4F1] font-heading mb-2 block">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-[#0F0F0F] border-[#C9A24E]/30 text-[#F5F4F1] focus:border-[#C9A24E] font-body"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[#F5F4F1] font-heading mb-2 block">
                    Phone
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="bg-[#0F0F0F] border-[#C9A24E]/30 text-[#F5F4F1] focus:border-[#C9A24E] font-body"
                    placeholder="(04XX) XXX XXX"
                  />
                </div>

                <div>
                  <Label htmlFor="projectType" className="text-[#F5F4F1] font-heading mb-2 block">
                    Project Type
                  </Label>
                  <Input
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="bg-[#0F0F0F] border-[#C9A24E]/30 text-[#F5F4F1] focus:border-[#C9A24E] font-body"
                    placeholder="e.g., Arena, Stable, Laser Cutting"
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-[#F5F4F1] font-heading mb-2 block">
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="bg-[#0F0F0F] border-[#C9A24E]/30 text-[#F5F4F1] focus:border-[#C9A24E] font-body resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] py-6 text-lg font-heading"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2" size={20} />
                </Button>
              </form>
            </motion.div>

            {/* Map + Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8"
            >
              {/* Map */}
              <div className="bg-[#1a1a1a] border border-[#C9A24E]/20 rounded-lg overflow-hidden h-[400px] relative">
                {/* Map Placeholder with subtle styling */}
                <div 
                  className="w-full h-full"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'grayscale(100%) brightness(0.3)',
                  }}
                />
                {/* Overlay with gold accent */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F]/80 via-transparent to-[#0F0F0F]/60" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6 bg-[#0F0F0F]/90 border border-[#C9A24E]/30 rounded-lg">
                    <MapPin className="text-[#C9A24E] mx-auto mb-3" size={32} />
                    <p className="text-[#F5F4F1] font-heading">
                      Servicing Mornington Peninsula<br />& Greater Victoria
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-[#0F0F0F] border border-[#C9A24E]/20 rounded-lg p-8 space-y-6">
                <h3 className="text-2xl font-display text-[#C9A24E] mb-6">
                  Contact Information
                </h3>

                <div className="flex items-start gap-4">
                  <div className="bg-[#C9A24E]/10 p-3 rounded-lg">
                    <Mail className="text-[#C9A24E]" size={24} />
                  </div>
                  <div>
                    <p className="text-[#F5F4F1]/60 text-sm font-heading mb-1">
                      Email
                    </p>
                    <a 
                      href="mailto:admin@peninsulaequine.com.au"
                      className="text-[#F5F4F1] font-body hover:text-[#C9A24E] transition-colors"
                    >
                      admin@peninsulaequine.com.au
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#C9A24E]/10 p-3 rounded-lg">
                    <Phone className="text-[#C9A24E]" size={24} />
                  </div>
                  <div>
                    <p className="text-[#F5F4F1]/60 text-sm font-heading mb-1">
                      Phone
                    </p>
                    <a 
                      href="tel:+61418585489"
                      className="text-[#F5F4F1] font-body hover:text-[#C9A24E] transition-colors"
                    >
                      0418 585 489
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-[#C9A24E]/10 p-3 rounded-lg">
                    <MapPin className="text-[#C9A24E]" size={24} />
                  </div>
                  <div>
                    <p className="text-[#F5F4F1]/60 text-sm font-heading mb-1">
                      Service Area
                    </p>
                    <p className="text-[#F5F4F1] font-body">
                      Mornington Peninsula &<br />Greater Victoria
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-[#0F0F0F] border border-[#C9A24E]/20 rounded-lg p-8">
                <h3 className="text-xl font-display text-[#C9A24E] mb-4">
                  Business Hours
                </h3>
                <div className="space-y-2 font-body text-[#F5F4F1]/70">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>7:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>8:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Closed</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}