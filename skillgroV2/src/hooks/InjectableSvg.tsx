import React, { useEffect, useRef } from 'react';
import Vivus from 'vivus';

interface InjectableSvgProps {
   src: string;
   alt?: string;
   className?: string;
}

const InjectableSvg: React.FC<InjectableSvgProps> = ({ src, alt = '', className = '' }) => {
   const imgRef = useRef<HTMLImageElement>(null);

   useEffect(() => {
      const fetchAndInjectSvg = async () => {
         if (imgRef.current) {
            try {
               const response = await fetch(src);
               const svgText = await response.text();
               const div = document.createElement('div');
               div.innerHTML = svgText;
               const svgElement = div.querySelector('svg');

               if (svgElement) {
                  svgElement.setAttribute('class', imgRef.current?.getAttribute('class') || '');
                  imgRef.current?.replaceWith(svgElement);

                  const vivusInstance = new Vivus(svgElement as unknown as HTMLElement, {
                     duration: 80,
                     file: src,
                  });

                  vivusInstance.finish(); 

                  svgElement.addEventListener('mouseenter', () => {
                     if (vivusInstance) {
                        vivusInstance.reset().play();
                     } else {
                        console.error('Vivus instance is not initialized.');
                     }
                  });
               }
            } catch (error) {
               console.error('Error fetching and injecting SVG:', error);
            }
         }
      };

      fetchAndInjectSvg();
   }, [src]);

   return <img ref={imgRef} src={src} alt={alt} className={`injectable ${className}`} />;
};

export default InjectableSvg;



