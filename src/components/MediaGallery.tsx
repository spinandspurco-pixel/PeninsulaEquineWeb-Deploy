import React, { useState } from 'react';

const media = [
  // Add your images/videos here
  { type: 'image', src: '/assets/media/best/IMG_3850.jpeg', category: 'Arena Construction' },
  { type: 'image', src: '/assets/media/best/IMG_3853.jpeg', category: 'Laser Cutting' },
  { type: 'image', src: '/assets/media/best/IMG_3854.jpeg', category: 'Custom Facilities' },
  { type: 'video', src: '/media/IMG_1351.mp4', category: 'Arena Construction' },
  { type: 'video', src: '/media/IMG_1354.mp4', category: 'Laser Cutting' },
  { type: 'video', src: '/media/IMG_2975.mp4', category: 'Custom Facilities' },
];

const categories = Array.from(new Set(media.map(m => m.category)));

export function MediaGallery() {
  const [selected, setSelected] = useState(categories[0]);
  const filtered = media.filter(m => m.category === selected);

  return (
    <div className="w-full py-8 bg-[#181818]">
      <div className="flex gap-4 justify-center mb-6">
        {categories.map(cat => (
          <button key={cat} onClick={() => setSelected(cat)} className={`px-4 py-2 rounded ${selected === cat ? 'bg-[#C9A24E] text-black' : 'bg-[#333] text-white'}`}>{cat}</button>
        ))}
      </div>
      <div className="flex flex-wrap gap-6 justify-center">
        {filtered.map((m, i) => m.type === 'image' ? (
          <img key={i} src={m.src} alt={m.category} className="w-64 h-40 object-cover rounded shadow" />
        ) : (
          <video key={i} src={m.src} controls loop className="w-64 h-40 object-cover rounded shadow" />
        ))}
      </div>
    </div>
  );
}
