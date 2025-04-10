import { useEffect } from 'react';
import { TweenMax } from 'gsap';

const MotionAnimation = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const wraps = document.querySelectorAll('.tg-motion-effects');
      wraps.forEach((wrap) => {
        const parallaxIt = (targetClass: string, movement: number) => {
          const target = wrap.querySelector(targetClass) as HTMLElement;
          if (!target) return;

          const relX = e.pageX - wrap.getBoundingClientRect().left;
          const relY = e.pageY - wrap.getBoundingClientRect().top;

          TweenMax.to(target, 1, {
            x: ((relX - wrap.clientWidth / 2) / wrap.clientWidth) * movement,
            y: ((relY - wrap.clientHeight / 2) / wrap.clientHeight) * movement,
          });
        };

        parallaxIt('.tg-motion-effects1', 20);
        parallaxIt('.tg-motion-effects2', 5);
        parallaxIt('.tg-motion-effects3', -10);
        parallaxIt('.tg-motion-effects4', 30);
        parallaxIt('.tg-motion-effects5', -50);
        parallaxIt('.tg-motion-effects6', -20);
        parallaxIt('.tg-motion-effects7', 40);
      });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
};

export default MotionAnimation;
