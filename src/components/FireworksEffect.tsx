import { useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

export const FireworksEffect = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    // Create a fireworks effect
    const launchFirework = (x: number) => {
      // Base explosion
      myConfetti({
        particleCount: 50,
        startVelocity: 30,
        spread: 360,
        origin: { x, y: 0.9 },
        colors: ['#8A2BE2', '#40E0D0', '#FF69B4', '#FFD700'],
      });
      
      // Follow-up smaller bursts
      setTimeout(() => {
        myConfetti({
          particleCount: 20,
          startVelocity: 20,
          spread: 180,
          origin: { x: x - 0.05, y: 0.85 },
        });
      }, 200);
      
      setTimeout(() => {
        myConfetti({
          particleCount: 20,
          startVelocity: 20,
          spread: 180,
          origin: { x: x + 0.05, y: 0.85 },
        });
      }, 300);
    };

    // Launch multiple fireworks with delays
    const launchFireworks = () => {
      launchFirework(0.3);
      setTimeout(() => launchFirework(0.5), 300);
      setTimeout(() => launchFirework(0.7), 600);
      setTimeout(() => launchFirework(0.4), 900);
      setTimeout(() => launchFirework(0.6), 1200);
    };

    // Initial launch
    launchFireworks();
    
    // Relaunch periodically
    const interval = setInterval(launchFireworks, 4000);
    
    return () => {
      clearInterval(interval);
      myConfetti.reset();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed pointer-events-none w-full h-full top-0 left-0 z-40"
    />
  );
};
