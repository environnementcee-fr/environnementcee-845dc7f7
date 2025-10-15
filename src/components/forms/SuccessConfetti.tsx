import { useEffect } from "react";
import confetti from "canvas-confetti";

interface SuccessConfettiProps {
  trigger: boolean;
}

export const SuccessConfetti = ({ trigger }: SuccessConfettiProps) => {
  useEffect(() => {
    if (trigger) {
      const duration = 2000;
      const end = Date.now() + duration;

      const colors = ['#10b981', '#059669', '#047857'];

      const frame = () => {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: { x: 0, y: 0.6 },
          colors: colors,
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: { x: 1, y: 0.6 },
          colors: colors,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };

      frame();
    }
  }, [trigger]);

  return null;
};
