import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WindowFrameProps {
  children: React.ReactNode;
  isOpen: boolean;
  isFullScreen?: boolean;
}

const WindowFrame: React.FC<WindowFrameProps> = ({ children, isOpen, isFullScreen }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className={`absolute z-50 overflow-hidden shadow-2xl ${
            isFullScreen 
              ? 'inset-0 bg-black' 
              : 'inset-4 md:inset-10 rounded-2xl glass-panel bg-white/80'
          }`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WindowFrame;
