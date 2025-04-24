import { motion } from 'framer-motion';
import React from 'react';

interface WaveformProps {
  isActive: boolean;
}

export const VoiceWaveform: React.FC<WaveformProps> = ({ isActive }) => {
  return (
    <div className="flex items-center justify-center gap-1.5 h-16">
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1.5 bg-white/80 rounded-full"
          animate={isActive ? {
            height: ['24px', '48px', '24px'],
            opacity: [0.6, 1, 0.6],
          } : {
            height: '24px',
            opacity: 0.6,
          }}
          transition={{
            height: {
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.1,
            },
            opacity: {
              duration: 0.5,
              repeat: Infinity,
              delay: i * 0.1,
            }
          }}
        />
      ))}
    </div>
  );
};