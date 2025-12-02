import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LogoWithBackgroundRemoval } from './LogoWithBackgroundRemoval';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { ArenaIcon, StableIcon, LaserSignIcon, ExperienceIcon, ProjectsIcon, SatisfactionIcon, CoverageIcon } from './icons/ServiceIcons';

interface VideoHeroProps {
  onComplete?: () => void;
  autoLoop?: boolean;
  duration?: number;
  onNavigate?: (page: string) => void;
}

export function VideoHero({ onNavigate }: VideoHeroProps) {
  const [ready, setReady] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  useEffect(() => {
    const timer = setTimeout(() => setReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Track mouse for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    { title: 'Arena Construction', desc: 'Professional arenas for every discipline', Icon: ArenaIcon },
    { title: 'Barn Homes & Stables', desc: 'Luxury living with your horses', Icon: StableIcon },
    { title: 'Custom Creations', desc: 'If you can dream it, we build it', Icon: LaserSignIcon },
  ];

  return (
    <>
      <section
        ref={sectionRef}
        className="relative w-full min-h-screen flex items-center justify-center bg-[#0F0F0F] overflow-hidden pt-20"
      >
        {/* Animated background layers */}
        <motion.div 
          style={{ 
            position: 'absolute',
            inset: 0,
            y: backgroundY,
            scale,
          }}
        >
          {/* Primary gradient */}
          <div 
            style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,162,78,0.15) 0%, transparent 60%)',
              transform: `translate(${(mousePosition.x - 0.5) * 20}px, ${(mousePosition.y - 0.5) * 20}px)`,
              transition: 'transform 0.3s ease-out',
            }}
          />
          
          {/* Animated floating particles */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                borderRadius: '50%',
                background: 'rgba(201,162,78,0.3)',
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut',
              }}
            />
          ))}
          
          {/* Decorative lines */}
          <svg 
            style={{ 
              position: 'absolute', 
              inset: 0, 
              width: '100%', 
              height: '100%',
              opacity: 0.1,
            }}
          >
            <motion.line 
              x1="20%" y1="0" x2="80%" y2="100%" 
              stroke="#C9A24E" 
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, ease: 'easeInOut' }}
            />
            <motion.line 
              x1="80%" y1="0" x2="20%" y2="100%" 
              stroke="#C9A24E" 
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, delay: 0.5, ease: 'easeInOut' }}
            />
          </svg>
        </motion.div>

        {/* Main content */}
        <motion.div 
          style={{ 
            position: 'relative',
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            maxWidth: '1200px',
            width: '100%',
            margin: '0 auto',
            padding: '120px 24px 60px',
            opacity: ready ? 1 : 0,
            transition: 'opacity 0.8s ease',
          }}
        >
          {/* Logo with glow effect */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ 
              marginBottom: '40px', 
              maxWidth: '280px', 
              width: '100%',
              position: 'relative',
            }}
          >
            {/* Logo glow */}
            <motion.div
              style={{
                position: 'absolute',
                inset: '-20%',
                background: 'radial-gradient(circle, rgba(201,162,78,0.4) 0%, transparent 70%)',
                filter: 'blur(30px)',
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <LogoWithBackgroundRemoval 
              filterStyle="drop-shadow(0 0 30px rgba(201,162,78,0.5))"
            />
          </motion.div>

          {/* Main headline with staggered animation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <motion.h1 
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 5rem)',
                color: '#C9A24E',
                marginBottom: '20px',
                lineHeight: 1.1,
                fontFamily: 'Cinzel, serif',
                fontWeight: 700,
                letterSpacing: '0.02em',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <motion.span
                style={{ display: 'inline-block' }}
                animate={{ 
                  textShadow: [
                    '0 0 40px rgba(201, 162, 78, 0.3)',
                    '0 0 80px rgba(201, 162, 78, 0.6)',
                    '0 0 40px rgba(201, 162, 78, 0.3)',
                  ]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                FROM DIRT TO DYNASTY
              </motion.span>
            </motion.h1>
          </motion.div>

          {/* Animated underline */}
          <motion.div 
            style={{
              width: '200px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #C9A24E, transparent)',
              marginBottom: '30px',
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
          />

          {/* Subtitle */}
          <motion.p 
            style={{
              fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
              color: 'rgba(245,244,241,0.9)',
              maxWidth: '700px',
              margin: '0 auto 50px',
              lineHeight: 1.7,
              fontFamily: 'Raleway, sans-serif',
              fontWeight: 300,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            From barn homes to bespoke stables — if it's equine, we build it.
            <br />
            <span style={{ color: '#C9A24E', fontWeight: 400 }}>Creative. Custom. Complete.</span>
          </motion.p>

          {/* Service cards - Desktop */}
          <motion.div
            style={{
              display: 'flex',
              gap: '24px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '60px',
              width: '100%',
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                style={{
                  background: 'linear-gradient(135deg, rgba(201,162,78,0.1) 0%, rgba(201,162,78,0.05) 100%)',
                  border: '1px solid rgba(201,162,78,0.2)',
                  borderRadius: '16px',
                  padding: '28px 32px',
                  minWidth: '280px',
                  maxWidth: '320px',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                whileHover={{ 
                  scale: 1.05,
                  borderColor: 'rgba(201,162,78,0.5)',
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                onClick={() => onNavigate?.(index === 2 ? 'laser' : 'constructions')}
              >
                {/* Hover glow effect */}
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at center, rgba(201,162,78,0.15) 0%, transparent 70%)',
                    opacity: 0,
                  }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Icon */}
                <div style={{ marginBottom: '16px', position: 'relative' }}>
                  <service.Icon size={48} color="#C9A24E" />
                </div>
                <h3 style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '1.1rem',
                  color: '#C9A24E',
                  marginBottom: '8px',
                  position: 'relative',
                }}>
                  {service.title}
                </h3>
                <p style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '0.9rem',
                  color: 'rgba(245,244,241,0.7)',
                  position: 'relative',
                }}>
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            style={{
              display: 'flex',
              gap: '20px',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <motion.button
              onClick={() => onNavigate?.('projects')}
              style={{
                background: 'linear-gradient(135deg, #C9A24E 0%, #A88B63 100%)',
                color: '#0F0F0F',
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '16px 36px',
                borderRadius: '50px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 0 30px rgba(201,162,78,0.5)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              View Our Work
              <ArrowRight size={18} />
            </motion.button>
            
            <motion.button
              onClick={() => onNavigate?.('contact')}
              style={{
                background: 'transparent',
                color: '#C9A24E',
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 500,
                fontSize: '1rem',
                padding: '16px 36px',
                borderRadius: '50px',
                border: '2px solid rgba(201,162,78,0.5)',
                cursor: 'pointer',
              }}
              whileHover={{ 
                scale: 1.05,
                borderColor: '#C9A24E',
                backgroundColor: 'rgba(201,162,78,0.1)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              Get a Quote
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        >
          <motion.span 
            style={{ 
              fontSize: '11px', 
              letterSpacing: '0.3em', 
              marginBottom: '12px',
              fontFamily: 'Raleway, sans-serif',
              color: 'rgba(201,162,78,0.8)',
              textTransform: 'uppercase',
            }}
          >
            Explore
          </motion.span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={24} color="rgba(201,162,78,0.6)" />
          </motion.div>
        </motion.div>

        {/* Corner decorations */}
        <motion.div
          style={{
            position: 'absolute',
            top: '80px',
            left: '40px',
            width: '100px',
            height: '100px',
            borderLeft: '1px solid rgba(201,162,78,0.2)',
            borderTop: '1px solid rgba(201,162,78,0.2)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        />
        <motion.div
          style={{
            position: 'absolute',
            top: '80px',
            right: '40px',
            width: '100px',
            height: '100px',
            borderRight: '1px solid rgba(201,162,78,0.2)',
            borderTop: '1px solid rgba(201,162,78,0.2)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.9, duration: 0.8 }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '80px',
            left: '40px',
            width: '100px',
            height: '100px',
            borderLeft: '1px solid rgba(201,162,78,0.2)',
            borderBottom: '1px solid rgba(201,162,78,0.2)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
        />
        <motion.div
          style={{
            position: 'absolute',
            bottom: '80px',
            right: '40px',
            width: '100px',
            height: '100px',
            borderRight: '1px solid rgba(201,162,78,0.2)',
            borderBottom: '1px solid rgba(201,162,78,0.2)',
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.1, duration: 0.8 }}
        />
      </section>

      {/* Stats Section */}
      <section 
        style={{
          background: 'linear-gradient(180deg, #0F0F0F 0%, #141414 100%)',
          padding: '100px 24px',
          position: 'relative',
        }}
      >
        <motion.div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '40px',
            textAlign: 'center',
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          {[
            { number: '20+', label: 'Years Experience', Icon: ExperienceIcon },
            { number: '500+', label: 'Projects Completed', Icon: ProjectsIcon },
            { number: '100%', label: 'Client Satisfaction', Icon: SatisfactionIcon },
            { number: 'VIC', label: 'Wide Coverage', Icon: CoverageIcon },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              {/* Icon */}
              <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'center' }}>
                <stat.Icon size={48} color="#C9A24E" />
              </div>
              <motion.div 
                style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  color: '#C9A24E',
                  fontWeight: 700,
                  marginBottom: '8px',
                }}
                whileInView={{
                  textShadow: [
                    '0 0 0px rgba(201,162,78,0)',
                    '0 0 20px rgba(201,162,78,0.5)',
                    '0 0 0px rgba(201,162,78,0)',
                  ],
                }}
                viewport={{ once: true }}
                transition={{ duration: 2, delay: index * 0.2 }}
              >
                {stat.number}
              </motion.div>
              <div style={{
                fontFamily: 'Raleway, sans-serif',
                fontSize: '1rem',
                color: 'rgba(245,244,241,0.7)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* What We Build - Comprehensive Services */}
      <section
        style={{
          background: '#0F0F0F',
          padding: '100px 24px',
          position: 'relative',
        }}
      >
        <motion.div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          <motion.div
            style={{ textAlign: 'center', marginBottom: '60px' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(2rem, 5vw, 3rem)',
              color: '#F5F4F1',
              marginBottom: '16px',
            }}>
              If It's <span style={{ color: '#C9A24E' }}>Equine</span>, We Build It
            </h2>
            <p style={{
              fontFamily: 'Raleway, sans-serif',
              fontSize: '1.1rem',
              color: 'rgba(245,244,241,0.6)',
              maxWidth: '700px',
              margin: '0 auto',
            }}>
              From barn homes where you live with your horses, to creative custom builds — no vision is too ambitious
            </p>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {[
              { title: 'Barn Homes & Lofts', desc: 'Live alongside your horses with luxury barn home living quarters' },
              { title: 'Stable Complexes', desc: 'Multi-stall facilities with wash bays, tack rooms & amenities' },
              { title: 'Riding Arenas', desc: 'Dressage, jumping, western — any discipline, any size' },
              { title: 'Round Yards', desc: 'Professional training and breaking yards built to last' },
              { title: 'Day Yards & Shelters', desc: 'Weather-proof shelters and secure turnout paddocks' },
              { title: 'Sheds & Storage', desc: 'Hay barns, feed rooms, machinery and equipment storage' },
              { title: 'Post & Rail Fencing', desc: 'Premium timber, PVC and custom fencing solutions' },
              { title: 'Creative Custom Builds', desc: 'Unique designs, upmarket finishes — if you dream it, we build it' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                style={{
                  background: 'linear-gradient(145deg, rgba(20,20,20,1) 0%, rgba(15,15,15,1) 100%)',
                  border: '1px solid rgba(201,162,78,0.15)',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  cursor: 'pointer',
                }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                whileHover={{ 
                  y: -8,
                  borderColor: 'rgba(201,162,78,0.4)',
                }}
                onClick={() => onNavigate?.('constructions')}
              >
                <h3 style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '1.15rem',
                  color: '#C9A24E',
                  marginBottom: '10px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '0.9rem',
                  color: 'rgba(245,244,241,0.6)',
                  lineHeight: 1.5,
                }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Western Arena Expertise Section */}
      <section
        style={{
          background: 'linear-gradient(180deg, #0F0F0F 0%, #121212 100%)',
          padding: '100px 24px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 60% 40% at 80% 50%, rgba(201,162,78,0.08) 0%, transparent 50%)',
        }} />
        
        <motion.div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '60px',
            alignItems: 'center',
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-100px' }}
        >
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span style={{
              fontFamily: 'Raleway, sans-serif',
              fontSize: '0.85rem',
              color: '#C9A24E',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              marginBottom: '16px',
              display: 'block',
            }}>
              Specialist Expertise
            </span>
            <h2 style={{
              fontFamily: 'Cinzel, serif',
              fontSize: 'clamp(2rem, 5vw, 2.8rem)',
              color: '#F5F4F1',
              marginBottom: '24px',
              lineHeight: 1.2,
            }}>
              Western Rider <span style={{ color: '#C9A24E' }}>Arena Specialists</span>
            </h2>
            <p style={{
              fontFamily: 'Raleway, sans-serif',
              fontSize: '1.1rem',
              color: 'rgba(245,244,241,0.8)',
              lineHeight: 1.8,
              marginBottom: '24px',
            }}>
              With extensive knowledge in arena construction for western disciplines, Ciro brings unmatched expertise in creating the perfect riding surface for reining, cutting, barrel racing, and more.
            </p>
            <p style={{
              fontFamily: 'Raleway, sans-serif',
              fontSize: '1rem',
              color: 'rgba(245,244,241,0.6)',
              lineHeight: 1.7,
              marginBottom: '32px',
            }}>
              Understanding the critical importance of footing for western performance, we carefully select and blend the right sand types and materials to achieve optimal consistency, grip, and cushioning that both horse and rider need.
            </p>
            
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
              {['Sand Selection', 'Footing Blends', 'Drainage Systems', 'Base Preparation'].map((item) => (
                <span 
                  key={item}
                  style={{
                    background: 'rgba(201,162,78,0.1)',
                    border: '1px solid rgba(201,162,78,0.3)',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontFamily: 'Raleway, sans-serif',
                    fontSize: '0.9rem',
                    color: '#C9A24E',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
            }}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {[
              {
                title: 'Premium Sand Selection',
                desc: 'We source and test various sand types to match your discipline - from angular sand for grip to round sand for slide stops.',
              },
              {
                title: 'Custom Footing Blends',
                desc: 'Expert mixing of sand with fiber, rubber, or textile additives for the perfect consistency and dust control.',
              },
              {
                title: 'Proper Compaction & Drainage',
                desc: 'Engineered sub-base and drainage systems ensure your arena performs in all weather conditions.',
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                style={{
                  background: 'linear-gradient(135deg, rgba(20,20,20,0.9) 0%, rgba(15,15,15,0.9) 100%)',
                  border: '1px solid rgba(201,162,78,0.2)',
                  borderRadius: '16px',
                  padding: '28px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                whileHover={{ borderColor: 'rgba(201,162,78,0.4)' }}
              >
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '4px',
                  background: 'linear-gradient(180deg, #C9A24E 0%, #A88B63 100%)',
                }} />
                <h4 style={{
                  fontFamily: 'Cinzel, serif',
                  fontSize: '1.1rem',
                  color: '#C9A24E',
                  marginBottom: '10px',
                }}>
                  {feature.title}
                </h4>
                <p style={{
                  fontFamily: 'Raleway, sans-serif',
                  fontSize: '0.95rem',
                  color: 'rgba(245,244,241,0.7)',
                  lineHeight: 1.6,
                }}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>


    </>
  );
}

export default VideoHero;
