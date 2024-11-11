import ProjectCard from '@/components/ProjectCard';
import Section from '@/components/Section';
import SEO from '@/components/SEO';
import { TypeProject } from '@/data/types';
import { fetchProjects } from '@/services/projects.sevices';
import { useGSAP } from '@gsap/react';
import NumberFlow from '@number-flow/react';
import gsap from 'gsap';
import { useEffect, useState } from 'react';

export default function Projects({ projects }: { projects: TypeProject[] }) {
  const [length, setLength] = useState(0);

  const timelineAnimation = () => {
    const tl = gsap.timeline();
    tl.from('.title-anim', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
    tl.from(
      '.project-lenght',
      {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      },
      '<'
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLength(projects.length);
    }, 300);

    return () => clearTimeout(timer);
  }, [projects.length]);

  useGSAP(() => {
    timelineAnimation();
  }, []);

  return (
    <main>
      <SEO title="Projets • Augustin Briolon • Portfolio Développeur Web Front-End 🚀" url='https://august1.dev/projets' />
      <Section className='!min-h-[50vh] md:gap-12 !flex-row items-center justify-between'>
        <div className='overflow-hidden w-full'>
          <h1 className='title-anim uppercase text-start font-extrabold dark:text-white'>
            MES PROJETS
          </h1>
        </div>
        <div className='w-fit flex items-center justify-end'>
          <div>
            <div className='overflow-hidden'>
              <NumberFlow
                value={length}
                format={{ notation: 'compact' }}
                locales='fr-FR'
                transformTiming={{
                  duration: 700,
                  easing: 'cubic-bezier(.17,.67,.14,.98)',
                }}
                className='font-bold text-5xl text-end project-lenght'
              />
            </div>
            <div className='overflow-hidden hidden md:block'>
              <p className='title-anim'>Projects</p>
            </div>
          </div>
        </div>
      </Section>
      <Section className='gap-8'>
        <div className='w-full flex flex-col gap-8'>
          {projects.map((project, index) => (
            <ProjectCard project={project} index={index} key={index} />
          ))}
        </div>
      </Section>
    </main>
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
