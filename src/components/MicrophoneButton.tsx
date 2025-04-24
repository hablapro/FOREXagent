import React from 'react';
import { Phone } from 'lucide-react';
import { motion } from 'framer-motion';

interface MicrophoneButtonProps {
  isListening: boolean;
  onClick: () => void;
  isDarkMode: boolean;
}

export const MicrophoneButton: React.FC<MicrophoneButtonProps> = ({
  isListening,
  onClick,
  isDarkMode,
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`vapi-btn vapi-btn-round relative group opacity-0 ${
        isListening ? 'vapi-btn-is-active vapi-btn-is-speaking' : 'vapi-btn-is-idle'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer glow */}
     

      {/* Button background */}
      <div
        className={`relative p-6 rounded-full backdrop-blur-sm transition-colors duration-300 ${
          isListening
            ? 'bg-[#4CAF50]/20 ring-2 ring-[#4CAF50]/50'
            : 'bg-[#4CAF50]/10 ring-2 ring-[#4CAF50]/50'
        }`}
      >
        {/* Icon container */}
        <div
          className={`w-12 h-12 flex items-center justify-center transition-colors ${
            isListening ? 'text-[#1A237E]' : 'text-[#1A237E]'
          }`}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ 
              scale: 1,
              rotate: isListening ? [0, 5, -5, 0] : 0
            }}
            transition={{
              rotate: {
                repeat: Infinity,
                duration: 0.5,
                ease: "easeInOut"
              }
            }}
          >
            <Phone className="w-8 h-8" />
          </motion.div>
        </div>
      </div>
    </motion.button>
  );
};