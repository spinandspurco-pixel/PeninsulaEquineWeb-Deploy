
import React, { useState } from 'react';

// Import images from src/assets
import img3850 from '../assets/media/best/IMG_3850.jpeg';
import img3853 from '../assets/media/best/IMG_3853.jpeg';
import img3854 from '../assets/media/best/IMG_3854.jpeg';

// Import videos from src/assets
import vid1351 from '../assets/media/converted/IMG_1351.mp4';
import vid1354 from '../assets/media/converted/IMG_1354.mp4';
import vid2975 from '../assets/media/converted/IMG_2975.mp4';

const media = [
  { type: 'image', src: img3850, category: 'Arena Construction', caption: 'Arena Construction' },
  { type: 'image', src: img3853, category: 'Laser Cutting', caption: 'Laser Cutting' },
  { type: 'image', src: img3854, category: 'Custom Facilities', caption: 'Custom Facilities' },
  { type: 'video', src: vid1351, category: 'Arena Construction', caption: 'Arena Construction Video' },
  { type: 'video', src: vid1354, category: 'Laser Cutting', caption: 'Laser Cutting Video' },
  { type: 'video', src: vid2975, category: 'Custom Facilities', caption: 'Custom Facilities Video' },
];

const categories = Array.from(new Set(media.map(m => m.category)));

export function MediaGallery() {
  const [selected, setSelected] = useState(categories[0]);
  const [lightbox, setLightbox] = useState<{ type: string; src: string; caption: string } | null>(null);
  const filtered = media.filter(m => m.category === selected);

  return (
    <div className="w-full py-8 bg-[#181818]">
      <div className="flex gap-4 justify-center mb-6">
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelected(cat)} className={`px-4 py-2 rounded ${selected === cat ? 'bg-[#C9A24E] text-black' : 'bg-[#333] text-white'}`}>{cat}</button>
        ))}
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {filtered.map((m, i) => (
          <div key={i} className="relative group cursor-pointer" onClick={() => setLightbox(m)}>
            {m.type === 'image' ? (
              <img src={m.src} alt={m.caption} className="w-64 h-40 object-cover rounded shadow transition-transform duration-300 group-hover:scale-105" />
            ) : (
              <video src={m.src} autoPlay muted loop className="w-64 h-40 object-cover rounded shadow transition-transform duration-300 group-hover:scale-105" />
            )}
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent text-white text-center py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b">
              {m.caption}
            </div>
            <div className="absolute inset-0 rounded group-hover:ring-4 group-hover:ring-[#C9A24E]/60 transition-all duration-300" />
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center animate-fade-in" onClick={() => setLightbox(null)}>
          <div className="relative max-w-3xl w-full flex flex-col items-center">
            <button className="absolute top-4 right-4 text-white text-2xl bg-[#C9A24E] rounded-full px-3 py-1 shadow-lg" onClick={() => setLightbox(null)}>&times;</button>
            {lightbox.type === 'image' ? (
              <img src={lightbox.src} alt={lightbox.caption} className="max-w-full max-h-[80vh] rounded-lg shadow-2xl" />
            ) : (
              <video src={lightbox.src} controls autoPlay loop className="max-w-full max-h-[80vh] rounded-lg shadow-2xl" />
            )}
            <div className="mt-4 text-white text-lg font-bold text-center">{lightbox.caption}</div>
          </div>
        </div>
      )}
    </div>
  );
}
