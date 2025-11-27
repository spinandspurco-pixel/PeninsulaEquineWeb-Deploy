import React from 'react';
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';
import logoImage from '../assets/b9178ba3036a87efeb1339130ac7e759231a49b3.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0F0F0F] text-[#F5F4F1] pt-16 pb-8 border-t border-[#C9A24E]/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <div 
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #C9A24E 0%, #A88B63 100%)',
                  }}
                />
                <img
                  src={logoImage}
                  alt="Peninsula Equine"
                  className="w-full h-full relative"
                  style={{
                    mixBlendMode: 'darken',
                    filter: 'invert(1) grayscale(1) brightness(2.1) contrast(2)',
                  }}
                />
              </div>
              <div>
                <div className="font-display">Peninsula Equine</div>
                <div className="text-[#C9A24E] text-xs tracking-[0.2em] font-heading">FROM DIRT TO DYNASTY</div>
              </div>
            </div>
            <p className="text-[#F5F4F1]/60 mb-6 max-w-md font-body">
              Building exceptional equestrian facilities and custom metalwork for over 20 years. 
              We transform visions into reality with precision, passion, and expertise.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/PeninsulaEquineConstructions/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#C9A24E]/10 hover:bg-[#C9A24E] rounded-full flex items-center justify-center transition-colors group"
              >
                <Facebook size={18} className="text-[#C9A24E] group-hover:text-[#0F0F0F]" />
              </a>
              <a
                href="https://www.instagram.com/peninsulaequine/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#C9A24E]/10 hover:bg-[#C9A24E] rounded-full flex items-center justify-center transition-colors group"
              >
                <Instagram size={18} className="text-[#C9A24E] group-hover:text-[#0F0F0F]" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-[#C9A24E]/10 hover:bg-[#C9A24E] rounded-full flex items-center justify-center transition-colors group"
              >
                <Linkedin size={18} className="text-[#C9A24E] group-hover:text-[#0F0F0F]" />
              </a>
              <a
                href="mailto:info@peninsulaequine.com.au"
                className="w-10 h-10 bg-[#C9A24E]/10 hover:bg-[#C9A24E] rounded-full flex items-center justify-center transition-colors group"
              >
                <Mail size={18} className="text-[#C9A24E] group-hover:text-[#0F0F0F]" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-[#C9A24E] mb-4">Quick Links</h4>
            <ul className="space-y-3 text-[#F5F4F1]/60 font-body">
              <li>
                <button onClick={() => onNavigate('home')} className="hover:text-[#C9A24E] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('constructions')} className="hover:text-[#C9A24E] transition-colors">
                  Constructions
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('laser')} className="hover:text-[#C9A24E] transition-colors">
                  Laser Cutting
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('projects')} className="hover:text-[#C9A24E] transition-colors">
                  Projects
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#C9A24E] transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display text-[#C9A24E] mb-4">Services</h4>
            <ul className="space-y-3 text-[#F5F4F1]/60 font-body">
              <li>Arena Construction</li>
              <li>Stable Design</li>
              <li>Barn Lofts</li>
              <li>Laser Cutting</li>
              <li>Custom Fabrication</li>
              <li>Metal Signage</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#C9A24E]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-[#F5F4F1]/50 text-sm font-body">
            <div>
              © {currentYear} Peninsula Equine. All rights reserved.
            </div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-[#C9A24E] transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-[#C9A24E] transition-colors">
                Terms of Service
              </a>
              <button onClick={() => onNavigate('portal')} className="hover:text-[#C9A24E] transition-colors">
                Crew Portal
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}