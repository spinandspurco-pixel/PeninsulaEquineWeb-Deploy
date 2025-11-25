import React from 'react';
import { motion } from 'motion/react';

// Import ALL converted videos
import vid1 from '../assets/media/converted/IMG_0014.mp4';
import vid2 from '../assets/media/converted/IMG_0015.mp4';
import vid3 from '../assets/media/converted/IMG_0464.mp4';
import vid4 from '../assets/media/converted/IMG_1021.mp4';
import vid5 from '../assets/media/converted/IMG_1204.mp4';
import vid6 from '../assets/media/converted/IMG_1205.mp4';
import vid7 from '../assets/media/converted/IMG_1351.mp4';
import vid8 from '../assets/media/converted/IMG_1354.mp4';
import vid9 from '../assets/media/converted/IMG_1906.mp4';
import vid10 from '../assets/media/converted/IMG_1920.mp4';
import vid11 from '../assets/media/converted/IMG_1921.mp4';
import vid12 from '../assets/media/converted/IMG_1922.mp4';
import vid13 from '../assets/media/converted/IMG_2461.mp4';
import vid14 from '../assets/media/converted/IMG_2468.mp4';
import vid15 from '../assets/media/converted/IMG_2975.mp4';
import vid16 from '../assets/media/converted/IMG_3789.mp4';
import vid17 from '../assets/media/converted/IMG_3790.mp4';
import vid18 from '../assets/media/converted/IMG_3791.mp4';

interface VideoPreviewPageProps {
  onNavigate: (page: string) => void;
}

export function VideoPreviewPage({ onNavigate }: VideoPreviewPageProps) {
  const videos = [
    { src: vid1, name: 'IMG_0014.mp4', currentUse: '🎬 ConstructionsPage' },
    { src: vid2, name: 'IMG_0015.mp4', currentUse: '🎬 ConstructionsPage' },
    { src: vid3, name: 'IMG_0464.mp4', currentUse: '⚪ Not Used' },
    { src: vid4, name: 'IMG_1021.mp4', currentUse: '🎬 ConstructionsPage' },
    { src: vid5, name: 'IMG_1204.mp4', currentUse: '⚪ Not Used' },
    { src: vid6, name: 'IMG_1205.mp4', currentUse: '⚪ Not Used' },
    { src: vid7, name: 'IMG_1351.mp4', currentUse: '🏠 HomePage Hero' },
    { src: vid8, name: 'IMG_1354.mp4', currentUse: '🏠 HomePage Hero' },
    { src: vid9, name: 'IMG_1906.mp4', currentUse: '⚪ Not Used' },
    { src: vid10, name: 'IMG_1920.mp4', currentUse: '⚪ Not Used' },
    { src: vid11, name: 'IMG_1921.mp4', currentUse: '⚪ Not Used' },
    { src: vid12, name: 'IMG_1922.mp4', currentUse: '⚪ Not Used' },
    { src: vid13, name: 'IMG_2461.mp4', currentUse: '🎬 ConstructionsPage' },
    { src: vid14, name: 'IMG_2468.mp4', currentUse: '⚪ Not Used' },
    { src: vid15, name: 'IMG_2975.mp4', currentUse: '🏠 HomePage Hero' },
    { src: vid16, name: 'IMG_3789.mp4', currentUse: '⚪ Not Used' },
    { src: vid17, name: 'IMG_3790.mp4', currentUse: '⚪ Not Used' },
    { src: vid18, name: 'IMG_3791.mp4', currentUse: '⚪ Not Used' },
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-display text-[#C9A24E] mb-4">
            Video Preview & Assignment
          </h1>
          <p className="text-xl text-[#F5F4F1]/70 font-body mb-6">
            Review all videos and their current page assignments
          </p>
          <button
            onClick={() => onNavigate('home')}
            className="bg-[#C9A24E] hover:bg-[#A88B63] text-[#0F0F0F] px-6 py-3 rounded-lg font-heading transition-colors"
          >
            ← Back to Home
          </button>
        </div>

        {/* Legend */}
        <div className="bg-[#1a1a1a] border border-[#C9A24E]/20 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-display text-[#C9A24E] mb-4">Current Assignments:</h3>
          <div className="grid md:grid-cols-2 gap-4 text-[#F5F4F1]/80 font-body">
            <div>
              <span className="font-bold">🏠 HomePage Hero:</span> IMG_1351, IMG_1354, IMG_2975
            </div>
            <div>
              <span className="font-bold">🎬 ConstructionsPage:</span> IMG_0014, IMG_0015, IMG_1021, IMG_2461
            </div>
            <div>
              <span className="font-bold">⚪ Not Used:</span> 11 videos available for reassignment
            </div>
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <motion.div
              key={video.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="bg-[#1a1a1a] border border-[#C9A24E]/20 rounded-lg overflow-hidden hover:border-[#C9A24E]/60 transition-all"
            >
              {/* Video */}
              <div className="aspect-video bg-black relative group">
                <video
                  src={video.src}
                  className="w-full h-full object-cover"
                  controls
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
                {/* Overlay hint */}
                <div className="absolute top-2 right-2 bg-[#0F0F0F]/80 px-2 py-1 rounded text-xs text-[#C9A24E] font-mono">
                  Click to play
                </div>
              </div>
              
              {/* Info */}
              <div className="p-4">
                <h3 className="text-lg font-heading text-[#C9A24E] mb-2">
                  {video.name}
                </h3>
                <p className={`text-sm font-body ${
                  video.currentUse.includes('Not Used') 
                    ? 'text-[#F5F4F1]/40' 
                    : 'text-[#F5F4F1]/80 font-semibold'
                }`}>
                  {video.currentUse}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Instructions */}
        <div className="mt-12 bg-[#1a1a1a] border border-[#C9A24E]/20 rounded-lg p-8 text-center">
          <h3 className="text-2xl font-display text-[#C9A24E] mb-4">
            Ready to Reassign Videos?
          </h3>
          <p className="text-[#F5F4F1]/70 font-body mb-6 max-w-2xl mx-auto">
            Watch each video above and let me know which ones should be swapped. 
            For example: "Use IMG_1920, IMG_1921, IMG_1922 for HomePage Hero instead"
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-body text-[#F5F4F1]/60">
            <div>💡 Look for dramatic/cinematic shots for Hero</div>
            <div>🔨 Construction progress for ConstructionsPage</div>
            <div>🐴 Horse action for future sections</div>
          </div>
        </div>
      </div>
    </div>
  );
}
