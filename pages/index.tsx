import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Home() {
  const curretDateYear = new Date().getFullYear();
  const animateIn = () => {
    gsap.from('.title-anim', {
      y: 100,
      stagger: 0.1,
      duration: 1,
      ease: 'power2.out',
    });
  };
  const animateOpacity = () => {
    gsap.from('.anim-opacity', {
      opacity: 0,
      delay: 1,
      duration: 0.75,
      ease: 'power2.out',
    });
  }

  useGSAP(() => {
    animateIn();
    animateOpacity();
  }, []);

  return (
    <section className='min-h-[90vh] max-h-fit max-w-screen-xl mx-auto w-full flex items-start px-2 md:px-4 text-black dark:text-white'>
      <div className='w-full flex flex-col items-center justify-center'>
        <div className='overflow-hidden'>
          <h1 className='title-anim uppercase text-center font-extrabold'>
            DÉVELOPPEUR WEB
          </h1>
        </div>
        <div className='overflow-hidden'>
          <h1 className='title-anim uppercase text-center font-extrabold'>
            FRONT-END©
          </h1>
        </div>
        <p className='anim-opacity font-semibold'>(2019 - {curretDateYear})</p>
      </div>

      
    </section>
  );
}
