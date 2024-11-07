import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { urlFor } from '@/sanity/lib/image';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import { fetchProjects } from '@/services/projects.sevices';
import { TypeProject } from '@/data/types';
gsap.registerPlugin(ScrollTrigger);

export default function Projects({ projects }: { projects: TypeProject[] }) {
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
        stagger: 0.2,
        duration: 1,
        ease: 'power1.out',
      },
      '-=0.5'
    );
    tl.from(
      '.project-title-anim',
      {
        xPercent: -100,
        stagger: 0.2,
        duration: 1,
        ease: 'power2.out',
      },
      '-=3'
    );
    tl.from(
      '.project-img-anim',
      {
        yPercent: 100,
        duration: 1,
        ease: 'power1.out',
      },
      '-=3'
    );
  };

  const animateHoverShow = (index: number) => {
    gsap.to(`.project-img-anim-${index}`, {
      scale: 1.1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const animateHoverHide = (index: number) => {
    gsap.to(`.project-img-anim-${index}`, {
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const scrollTriggerAnimation = () => {
    gsap.set('.projet-text-scroll', { yPercent: 100 });

    (gsap.utils.toArray('.projet-text-scroll') as HTMLElement[]).forEach(
      (el) => {
        ScrollTrigger.create({
          trigger: el,
          start: 'top 80%',
          onEnter: () => {
            gsap.to(el, {
              yPercent: 0,
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
        {projects.map((project: TypeProject, index: number) => (
          <Link
            key={index}
            href={`/projets/` + project.slug.current}
            className='project-container'
            onMouseEnter={() => animateHoverShow(index)}
            onMouseLeave={() => animateHoverHide(index)}
          >
            <div className='line-top-anim h-[3px] bg-black dark:bg-white rounded-full'></div>
            <div className='flex items-start md:items-center justify-between px-2 pt-8 gap-8'>
              <div className='flex flex-col md:flex-row gap-4 items-start md:items-center justify-center'>
                <div className='overflow-hidden rounded-xl w-full md:w-fit min-w-fit'>
                  <div
                    className={`project-img-anim project-img-anim-${index} w-full min-w-fit overflow-hidden rounded-xl border border-black/20 dark:border-white/20`}
                  >
                    <motion.figure layoutId='image'>
                      <Image
                        src={urlFor(project.mainImage).toString()}
                        alt='project'
                        layout="responsive"
                        width={1920}
                        height={1080}
                        className='md:max-w-72 select-none'
                      />
                    </motion.figure>
                  </div>
                </div>
                <div className='w-full'>
                  <div className='overflow-hidden py-1 flex justify-between w-full md:w-fit'>
                    <h4 className='font-bold text-4xl project-title-anim'>
                      {project.title}
                    </h4>
                    <p className='w-10 md:hidden'>
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </p>
                  </div>
                  <div className='overflow-hidden'>
                    <p className='font-medium projet-text-scroll'>
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className='overflow-hidden hidden md:block w-fit'>
                <p className='w-10'>
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}

export async function getStaticProps() {
  const projects = await fetchProjects();

  return {
    props: {
      projects,
    },
  };
}
