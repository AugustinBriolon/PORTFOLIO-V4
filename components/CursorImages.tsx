import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

interface CursorImagesProps {
  images: object[];
}

const CursorImages = ({ images }: CursorImagesProps) => {
  console.log(images);
  
  const cardRef = useRef<HTMLDivElement>(null);
  const mediasRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useGSAP(() => {
    if (!cardRef.current || !mediasRef.current) return;

    const card = cardRef.current;
    const medias = mediasRef.current;

    gsap.fromTo(card, 
      { 
        scale: 0.2,
        opacity: 0
      }, 
      {
        delay: 1,
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "power3.out"
      }
    );

    const xTo = gsap.quickTo(card, 'x', { duration: 1, ease: 'power4' });
    const yTo = gsap.quickTo(card, 'y', { duration: 1, ease: 'power4' });
    const rotationTo = gsap.quickTo(card, 'rotation', {
      duration: 1,
      ease: 'power4',
    });
    const xToMedias = gsap.quickTo(medias, 'xPercent', {
      duration: 0.6,
      ease: 'power2',
    });
    const yToMedias = gsap.quickTo(medias, 'yPercent', {
      duration: 0.7,
      ease: 'power2',
    });

    let isMoving: NodeJS.Timeout;
    let oldPosX = 0;
    let oldPosY = 0;
    let incr = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      const posX = e.clientX;
      const posY = e.clientY;
      const valueX = (posX - oldPosX) / 2;
      const valueY = (posY - oldPosY) / 2;
      const clampValueX = gsap.utils.clamp(-8, 8, valueX);
      const clampValueY = gsap.utils.clamp(-8, 8, valueY);

      rotationTo((posX - oldPosX) / 4);
      xTo(posX - W / 2);
      yTo(posY - H / 2 + window.scrollY);
      xToMedias(-clampValueX);
      yToMedias(-clampValueY);

      oldPosX = posX;
      oldPosY = posY;

      incr += Math.abs(valueX) + Math.abs(valueY);
      if (incr > 300) {
        incr = 0;
        setActiveIndex(prev => (prev + 1) % images.length);
      }

      clearTimeout(isMoving);
      isMoving = setTimeout(() => {
        rotationTo(0);
        xToMedias(0);
        yToMedias(0);
      }, 66);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(isMoving);
    };
  }, [images.length]);

  return (
    <div
      ref={cardRef}
      className='w-[200px] h-[150px] rounded-[2%] overflow-hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 opacity-0'
    >
      <div ref={mediasRef} className='w-full h-full'>
        {images.map((src, index) => (
          <div
            key={index}
            className={`w-full h-full absolute top-0 left-0 ${
              index === activeIndex ? 'visible' : 'invisible'
            }`}
          >
            <Image
              src={urlFor(src).toString()}
              alt={`Image ${index + 1}`}
              className='object-cover'
              priority={index === 0}
              width={5760}
              height={4320}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CursorImages;