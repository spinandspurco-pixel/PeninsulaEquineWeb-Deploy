import React from 'react';
import { Facebook, Instagram, Linkedin, Mail } from 'lucide-react';

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
            <div className="mb-4">
              <div className="font-display text-xl text-[#C9A24E]">Peninsula Equine</div>
              <div className="text-[#F5F4F1]/60 text-xs tracking-[0.2em] font-heading">FROM DIRT TO DYNASTY</div>
            </div>
            <p className="text-[#F5F4F1]/60 mb-6 max-w-md font-body">
              Building exceptional equestrian facilities across Victoria for over 20 years. 
              From arenas to stables, we transform visions into reality with precision and expertise.
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

          {/* Contact Info */}
          <div>
            <h4 className="font-display text-[#C9A24E] mb-4">Contact</h4>
            <ul className="space-y-3 text-[#F5F4F1]/60 font-body">
              <li>Mornington Peninsula, VIC</li>
              <li>
                <a href="mailto:info@peninsulaequine.com.au" className="hover:text-[#C9A24E] transition-colors">
                  info@peninsulaequine.com.au
                </a>
              </li>
              <li>
                <a href="tel:+61400000000" className="hover:text-[#C9A24E] transition-colors">
                  Call Us
                </a>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-[#C9A24E] transition-colors">
                  Get a Quote →
                </button>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4 className="font-display text-[#C9A24E] mb-4">Our Services</h4>
            <ul className="space-y-3 text-[#F5F4F1]/60 font-body">
              <li>Arena Construction</li>
              <li>Stable & Barn Design</li>
              <li>Round Yards</li>
              <li>Day Yards & Shelters</li>
              <li>Fencing Solutions</li>
              <li className="text-[#C9A24E]/70 italic">Laser Cutting (2026)</li>
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
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}