import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";

interface ConfettiProps {
  duration?: number;
  particleCount?: number;
}

export const Confetti = ({ duration = 3000, particleCount = 150 }: ConfettiProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const myConfetti = confetti.create(canvas, {
      resize: true,
      useWorker: true,
    });

    const end = Date.now() + duration;

    const runAnimation = () => {
      const now = Date.now();
      const timeLeft = end - now;

      if (timeLeft <= 0) return;

      // Launch confetti
      myConfetti({
        particleCount: particleCount / 3,
        spread: 70,
        origin: { y: 0.6, x: Math.random() },
        colors: ["#8A2BE2", "#40E0D0", "#FF69B4", "#FFD700"],
      });

      // Schedule next animation frame
      requestAnimationFrame(runAnimation);
    };

    runAnimation();

    return () => {
      myConfetti.reset();
    };
  }, [duration, particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-x-0 bottom-0 -translate-y-1/2 w-full h-full z-0"
    />
  );
};
