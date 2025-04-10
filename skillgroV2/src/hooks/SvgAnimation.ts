import { useEffect, useRef } from 'react';
import Vivus from 'vivus';

const SvgAnimation = (svgIconFile: string) => {
  const svgIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let vivusInstance: Vivus | null = null;

    if (svgIconRef.current) {
      const svgElement = svgIconRef.current.querySelector('.svg-icon');
      if (svgElement) {
        // Generate a unique ID if it doesn't exist
        if (!svgElement.id) {
          svgElement.id = `vivus-${Math.random().toString(36).substr(2, 9)}`;
        }
        const svgId = svgElement.id;
        const svgIcon = svgElement.getAttribute('data-svg-icon') || svgIconFile;

        if (svgId && svgIcon) {
          vivusInstance = new Vivus(svgId, {
            duration: 80,
            file: svgIcon,
            onReady: (myVivus) => {
              const duplicateSvg = myVivus.el.parentElement?.querySelectorAll('svg');
              if (duplicateSvg && duplicateSvg.length > 1) {
                duplicateSvg[0].remove();
              }
            }
          });

          const handleMouseEnter = () => {
            vivusInstance?.reset().play();
          };

          svgIconRef.current.addEventListener('mouseenter', handleMouseEnter);

          return () => {
            svgIconRef.current?.removeEventListener('mouseenter', handleMouseEnter);
            vivusInstance?.stop().destroy();
          };
        }
      }
    }
  }, [svgIconFile]);

  return svgIconRef;
};

export default SvgAnimation;