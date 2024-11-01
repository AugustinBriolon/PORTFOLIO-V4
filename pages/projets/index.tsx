import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Section from '@/components/Section';
import data from '@/data/data.json';
import { Project } from '@/data/types';
gsap.registerPlugin(ScrollTrigger);

export default function Projets() {
  const projects = data.projects;

  const timelineAnimation = () => {
    const tl = gsap.timeline();
    tl.from('.title-anim', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
    tl.from(
      '.line-top-anim',
      {
        width: 0,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.5'
    );
    tl.from(
      '.project-title-anim',
      {
        xPercent: -100,
        stagger: 0.1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=1'
    );
  };

  const scrollTriggerAnimation = () => {
    gsap.set('.projet-text-scroll', { y: -100, opacity: 0 });

    (gsap.utils.toArray('.projet-text-scroll') as HTMLElement[]).forEach(
      (el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 50%',
          onEnter: () => {
            gsap.to(el, {
              y: 0,
              delay: 0.5,
              markers: true,
              opacity: 1,
              duration: 1,
              ease: 'power2.out',
            });
          },
        });
      }
    );
  };

  useGSAP(() => {
    timelineAnimation();
    scrollTriggerAnimation();
  }, []);

  return (
    <Section className='gap-8'>
      <div className='overflow-hidden'>
        <h1 className='title-anim uppercase text-center font-extrabold dark:text-white'>
          MES PROJETS
        </h1>
      </div>

      <div className='w-full flex flex-col gap-8'>
        {projects.map((project: Project, index: number) => (
          <Link
            key={index}
            href={`/projets/` + project.slug}
            className='group'
          >
            <div className='line-top-anim h-[3px] bg-black dark:bg-white rounded-full'></div>
            <div className='flex items-start md:items-center justify-between pt-8'>
              <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-center'>
                <div className='overflow-hidden rounded-xl border border-black/20 dark:border-white/20'>
                  <Image
                    src={project.img}
                    alt='project'
                    width={1920}
                    height={1080}
                    className='max-w-72 select-none group-hover:scale-105 transition-transform duration-500'
                  />
                </div>
                <div>
                  <div className='overflow-hidden py-1'>
                    <h4 className='font-bold text-4xl project-title-anim'>
                      {project.title}
                    </h4>
                  </div>
                  <div className='overflow-hidden'>
                    <p className='font-medium projet-text-scroll'>
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className='overflow-hidden w-fit'>
                <p className='projet-text-scroll w-10'>
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className='h-96'></div>
    </Section>
  );
}
