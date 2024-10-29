import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

export default function Projets() {
  const data = [
    {
      title: 'Ceci est un test',
      description: 'Description assrez longue pour voir si ça fonctionne',
      image: '/images/img.png',
      url: '/projets/ceci-est-un-test',
    },
    {
      title: 'Ceci est un test',
      description: 'Description assrez longue pour voir si ça fonctionne',
      image: '/images/img.png',
      url: '/projets/ceci-est-un-test',
    },
    {
      title: 'Ceci est un test',
      description: 'Description assrez longue pour voir si ça fonctionne',
      image: '/images/img.png',
      url: '/projets/ceci-est-un-test',
    },
  ];
  const animateIn = () => {
    gsap.from('.el-anim', {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power2.out',
    });
  };


  useGSAP(() => {
    animateIn();
  }, []);

  return (
    <section className='min-h-[90vh] max-h-fit max-w-screen-xl mx-auto w-full flex flex-col items-center px-2 gap-8'>
      <div className='overflow-hidden'>
        <h1 className='el-anim uppercase text-center font-extrabold'>
          MES PROJETS
        </h1>
      </div>

      <div className='w-full grid grid-cols-2 gap-4 overflow-hidden'>
        {data.map((project, index) => (
          <Link
            key={index}
            href={project.url}
            className='el-anim'
          >
            <Image
              src={project.image}
              alt={project.title}
              className='object-contain w-full rounded-md'
              width={1920}
              height={1440}
            />
            <p className='font-bold text-xl'>{project.title}</p>
          </Link>
        ))}
      </div>

    </section>
  );
}
