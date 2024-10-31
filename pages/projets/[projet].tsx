import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const data = {
    title: 'Ceci est un test',
    description: 'Description assrez longue pour voir si ça fonctionne',
    image: '/images/img.png',
    url: '/projets/ceci-est-un-test',
    tags: ['Nuxt.js', 'TypeScript', 'Tailwind CSS', 'GSAP'],
  };

  const words = data.title.split(' ');

  const timelineProjectAnim = () => {
    const tl = gsap.timeline();
    tl.from('.anim-text', {
      yPercent: 100,
      stagger: 0.05,
      duration: 1,
      ease: 'power2.out',
    });
    tl.from('.project-tags-anim', {
      yPercent: 100,
      stagger: 0.05,
      duration: 1,
      ease: 'power2.out',
    }, '-=1');
    tl.from('.fill-anim', {
      x: 100,
      duration: 1,
      ease: 'power2.out',
    }, '-=1.5');
  };

  const scrollTriggerAnimation = () => {
    ScrollTrigger.create({
      trigger: '.progress-container',
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const progress = self.progress * 100;
        gsap.to('.fill-bar', {
          height: `${progress}%`,
          duration: 0.5,
          ease: 'power2.out',
        });
      },
    });
  }


  useGSAP(() => {
    timelineProjectAnim();
    scrollTriggerAnimation();
  }, []);

  return (
    <section className='min-h-[90vh] max-h-fit max-w-screen-4xl mx-auto w-full flex flex-col items-center gap-2 progress-container'>
      <div className='h-[35vh] min-h-96 w-full flex justify-between items-end px-2'>
        <div className='overflow-hidden w-1/2'>
          <h2 className='text-6xl font-bold uppercase text-left dark:text-white'>
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className='inline-block overflow-hidden'>
                {Array.from(word).map((letter, letterIndex) => (
                  <span key={letterIndex} className='anim-text inline-block'>
                    {letter}
                  </span>
                ))}
                {wordIndex !== words.length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </h2>
        </div>
        <div className='overflow-hidden w-1/2'>
          <div className='flex flex-wrap gap-3 items-center justify-end'>
            {data.tags.map((tag, index) => (
              <span key={index} className='project-tags-anim dark:text-white text-lg font-medium uppercase border border-black/20 dark:border-white/20 rounded-full px-4 py-1'>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className='w-full'>
        <Image src={data.image} alt={data.title} width={1920} height={1080} />
      </div>

      <div className='fixed right-2 top-1/2 h-32 w-1 rounded-full bg-white dark:bg-black overflow-hidden fill-anim'>
        <div className='w-1 bg-black dark:bg-white fill-bar'></div>
      </div>
    </section>
  );
}
