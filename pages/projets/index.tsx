import Image from 'next/image';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Projets() {
  const data = [
    {
      title: 'Ceci est un test',
      description: 'Description assrez longue pour voir si ça fonctionne',
      image: '/images/img.png',
      url: '/projets/ceci-est-un-test',
      tags: ["Nuxt.js", "TypeScript", "Tailwind CSS", "GSAP"],
    },
    {
      title: 'Ceci est un test',
      description: 'Description assrez longue pour voir si ça fonctionne',
      image: '/images/img.png',
      url: '/projets/ceci-est-un-test',
      tags: ["Nuxt.js", "TypeScript", "Tailwind CSS", "GSAP"],
    },
    {
      title: 'Ceci est un test',
      description: 'Description assrez longue pour voir si ça fonctionne',
      image: '/images/img.png',
      url: '/projets/ceci-est-un-test',
      tags: ["Nuxt.js", "TypeScript", "Tailwind CSS", "GSAP"],
    },
  ];

  const animateIn = () => {
    const tl = gsap.timeline();
    tl.from('.title-anim', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
    tl.from(
      '.project-img-anim',
      {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.5'
    );
    tl.from(
      '.project-title-anim',
      {
        y: -100,
        stagger: 0.1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=1'
    );
    tl.from(
      '.project-describ-anim',
      {
        y: -100,
        stagger: 0.1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=1'
    );
  };

  useGSAP(() => {
    animateIn();
  }, []);

  return (
    <section className='min-h-[90vh] max-h-fit max-w-screen-4xl mx-auto w-full flex flex-col items-center px-2 pb-4 gap-8'>
      <div className='overflow-hidden'>
        <h1 className='title-anim uppercase text-center font-extrabold dark:text-white'>
          MES PROJETS
        </h1>
      </div>

      <div className='w-full grid md:grid-cols-2 gap-4 p-4 overflow-hidden border border-black/20 dark:border-white/20 rounded-xl'>
        {data.map((project, index) => (
          <div key={index} className='overflow-hidden'>
            <Link href={project.url}>
              <div className='relative group rounded-md overflow-hidden'>
                <Image
                  src={project.image}
                  alt={project.title}
                  className='object-contain w-full group-hover:scale-105 project-img-anim'
                  width={1920}
                  height={1440}
                />
                <div className='absolute w-full bottom-0 right-0 flex items-center justify-end gap-2 p-2 opacity-0 group-hover:opacity-100 '>
                  {project.tags.map((tag, index) => (
                    <div
                      key={index}
                      className='backdrop-blur-md bg-white/80 p-1 px-2 rounded-md'
                    >
                      <p className='dark:text-black'>{tag}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className='overflow-hidden'>
                <p className='text-xl dark:text-white project-title-anim'>
                  {project.title}
                </p>
              </div>
              <div className='overflow-hidden'>
                <p className='text-md text-black/50 dark:text-white/50 project-describ-anim'>
                  {project.description}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
