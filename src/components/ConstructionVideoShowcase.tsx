import React from 'react';
import { motion } from 'framer-motion';

// Custom construction videos - showing Peninsula Equine's actual work
import video1 from '../assets/media/converted/IMG_0014.mp4';
import video2 from '../assets/media/converted/IMG_0015.mp4';
import video3 from '../assets/media/converted/IMG_1021.mp4';
import video4 from '../assets/media/converted/IMG_2461.mp4';

interface ConstructionVideoShowcaseProps {
  title?: string;
  subtitle?: string;
}

export function ConstructionVideoShowcase({ 
  title = "See Our Process",
  subtitle = "From groundwork to completion, watch our craftsmanship in action"
}: ConstructionVideoShowcaseProps) {
  
  const 
videos = [
    { src: video1, title: "Foundation & Groundwork", description: "Precision preparation for lasting quality" },
    { src: video2, title: "Construction Process", description: "Expert building with premium materials" },
    { src: video3, title: "Detail Work", description: "Attention to every finishing touch" },
    { src: video4, title: "Project Completion", description: "Delivering excellence every time" },
  ];

  return (
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
            {title}
          </h2>
          <div className="w-24 h-1 bg-[#C9A24E] mx-auto mb-8" />
          <p className="text-lg text-[#F5F4F1]/70 font-body max-w-3xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-lg bg-[#1a1a1a] border border-[#C9A24E]/20 hover:border-[#C9A24E]/60 transition-all duration-500"
            >
              {/* Video Container */}
              <div className="aspect-video overflow-hidden relative">
                <video
                  src={video.src}
                  className="w-full h-full object-cover"
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => {
                    e.currentTarget.pause();
                    e.currentTarget.currentTime = 0;
                  }}
                  style={{
                    filter: 'brightness(0.9)',
                    willChange: 'auto',
                  }}
                />
                
                {/* Hover Overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6"
                >
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl font-display text-[#C9A24E] mb-2">
                      {video.title}
                    </h3>
                    <p className="text-[#F5F4F1]/80 font-body">
                      {video.description}
                    </p>
                  </div>
                </motion.div>

                {/* Play Icon Hint */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-[#C9A24E]/20 backdrop-blur-sm flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[16px] border-l-[#C9A24E] border-t-[10px] border-t-transparent border-b-[10px] border-b-transparent ml-1" />
                  </div>
                </div>
              </div>

              {/* Bottom Info Bar - Always Visible */}
              <div className="p-4 bg-[#1a1a1a]">
                <h4 className="text-lg font-heading text-[#C9A24E] group-hover:text-[#F5F4F1] transition-colors">
                  {video.title}
                </h4>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          viewport={{ once: true }}
          className="text-center text-[#F5F4F1]/50 text-sm font-body mt-8"
        >
          Hover over videos to see them in action
        </motion.p>
      </div>
    </section>
  );
}
