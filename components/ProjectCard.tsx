import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { urlFor } from '@/sanity/lib/image';
import { TypeProject } from '@/data/types';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface ProjectCardProps {
  project: TypeProject;
  index: number;
}

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const desciprionWords = project.description.split(' ');

  useGSAP(() => {
    if (!targetRef.current || !triggerRef.current) return;
    const lineAnim = triggerRef.current.querySelectorAll('.line-bottom-anim');
    const imageAnim = triggerRef.current.querySelectorAll('.project-img-anim');
    const titleAnim = triggerRef.current.querySelectorAll(
      '.project-title-anim'
    );
    const indexAnim = triggerRef.current.querySelectorAll(
      '.project-index-anim'
    );
    const textAnim = targetRef.current.querySelectorAll('.project-text-anim');
    const tagsAnim = triggerRef.current.querySelectorAll('.project-tags-anim');

    gsap
      .timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
      .fromTo(
        titleAnim,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: 0.8,
          ease: 'power2.out',
        }
      )
      .fromTo(
        indexAnim,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '<'
      )
      .fromTo(
        textAnim,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          stagger: 0.02,
          duration: 1.2,
          ease: 'power2.out',
        },
        '-=0.6'
      )
      .fromTo(
        tagsAnim,
        {
          y: 100,
        },
        {
          y: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power2.out',
        },
        '<'
      )
      .fromTo(
        imageAnim,
        {
          scaleY: 1,
        },
        {
          scaleY: 0,
          duration: 0.8,
          ease: 'power2.out',
        },
        '<'
      );

    gsap.fromTo(
      lineAnim,
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        duration: 1.2,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top 85%',
          end: 'bottom 85%',
          scrub: 1,
        },
      }
    );
  }, []);

  return (
    <div
      key={project.slug.current}
      ref={triggerRef}
    >
      <Link href={`/projets/${project.slug.current}`} className='group'>
        <div className='w-full h-fit flex flex-col md:flex-row gap-4 items-start md:items-center justify-center px-2 pb-4 md:pb-8'>
          <div className='w-full md:w-fit min-w-fit overflow-hidden'>
            <div className='w-full min-w-fit relative'>
              <Image
                src={urlFor(project.mainImage).toString()}
                priority
                alt='project'
                width={5760}
                height={4320}
                className='md:max-w-72 select-none group-hover:scale-105 transition-transform ease-out duration-300'
              />
              <div className='project-img-anim origin-top absolute w-full h-full inset-0 bg-white' ref={imageRef}></div>
            </div>
          </div>
          <div className='w-full h-full flex flex-col gap-4'>
            <div className='flex items-center justify-between w-full'>
              <div className='overflow-hidden py-1 flex justify-between w-3/4 md:w-fit'>
                <h2 className='font-bold text-4xl project-title-anim'>
                  {project.title}
                </h2>
              </div>
              <div className='overflow-hidden'>
                <p className='font-bold project-index-anim'>
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}/
                </p>
              </div>
            </div>
            <div className='w-3/4' ref={targetRef}>
              {desciprionWords.map((word: string, index: number) => (
                <span key={index} className='inline-block overflow-hidden'>
                  <span className='project-text-anim inline-block text-black/80 dark:text-white/80'>
                    {word}
                    {index !== desciprionWords.length - 1 && '\u00A0'}
                  </span>
                </span>
              ))}
            </div>
            <div className='overflow-hidden py-1'>
              {project.types.map((type, index) => (
                <span
                  key={index}
                  className='project-tags-anim inline-block mr-2 dark:text-white text-lg font-medium uppercase border border-black/20 dark:border-white/20 rounded-full px-4 py-1'
                >
                  {type.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className='line-bottom-anim h-[2px] w-full bg-black dark:bg-white rounded-full origin-left'></div>
      </Link>
    </div>
  );
}
