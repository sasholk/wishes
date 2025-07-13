import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  type?: 'word' | 'letter';
  delay?: number;
}

export const AnimatedText = ({
  text,
  className = '',
  type = 'word',
  delay = 0.3
}: AnimatedTextProps) => {
  // Split text into words or letters
  const items = type === 'word' ? text.split(' ') : text.split('');
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: delay, delayChildren: 0.04 * i }
    })
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(5px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100
      }
    }
  };

  return (
    <motion.div
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          variants={child}
          className={`inline-block ${type === 'word' ? 'mr-2' : ''}`}
        >
          {item === ' ' ? '\u00A0' : item}
        </motion.span>
      ))}
    </motion.div>
  );
};
