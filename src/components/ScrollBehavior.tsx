import { useEffect } from 'react';

interface ScrollBehaviorProps {
  threshold?: number;
}

export const ScrollBehavior: React.FC<ScrollBehaviorProps> = ({ threshold = 50 }) => {
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      const diff = touchStartY - touchEndY;
      
      // If the swipe distance is less than the threshold, ignore it
      if (Math.abs(diff) < threshold) return;
      
      // Get all sections
      const sections = Array.from(document.querySelectorAll('section'));
      
      // Find which section is currently in view
      const viewportHeight = window.innerHeight;
      const scrollTop = window.scrollY;
      const currentIndex = Math.round(scrollTop / viewportHeight);
      
      // Calculate target section index
      let targetIndex;
      if (diff > 0) { // Swipe up - go to next section
        targetIndex = Math.min(currentIndex + 1, sections.length - 1);
      } else { // Swipe down - go to previous section
        targetIndex = Math.max(currentIndex - 1, 0);
      }
      
      // Scroll to target section
      if (targetIndex !== currentIndex) {
        window.scrollTo({
          top: targetIndex * viewportHeight,
          behavior: 'smooth'
        });
      }
    };
    
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [threshold]);

  return null;
};
