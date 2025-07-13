import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export const ScrollReveal = ({
  children,
  className = '',
  delay = 0.2,
  direction = 'up'
}: ScrollRevealProps) => {
  
  // Define animation variants based on direction
  const getInitialPosition = () => {
    switch(direction) {
      case 'up': return { opacity: 0, y: 50 };
      case 'down': return { opacity: 0, y: -50 };
      case 'left': return { opacity: 0, x: 50 };
      case 'right': return { opacity: 0, x: -50 };
      default: return { opacity: 0, y: 50 };
    }
  };
  
  const getFinalPosition = () => {
    return { opacity: 1, y: 0, x: 0 };
  };

  return (
    <motion.div
      className={className}
      initial={getInitialPosition()}
      whileInView={getFinalPosition()}
      viewport={{ once: false, amount: 0.2 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
    >
      {children}
    </motion.div>
  );
};
