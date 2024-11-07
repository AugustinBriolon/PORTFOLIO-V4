import ProjectCard from '@/components/ProjectCard';
import Section from '@/components/Section';
import { TypeProject } from '@/data/types';
import { fetchProjects } from '@/services/projects.sevices';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Projects({ projects }: { projects: TypeProject[] }) {
  const timelineAnimation = () => {
    const tl = gsap.timeline();
    tl.from('.title-anim', {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
  };

  useGSAP(() => {
    timelineAnimation();
  }, []);

  return (
    <>
      <Section className='!min-h-[50vh] gap-12 !flex-row items-center justify-between'>
        <div className='overflow-hidden w-1/2'>
          <h1 className='title-anim uppercase text-start font-extrabold dark:text-white'>
            MES PROJETS
          </h1>
        </div>
        <div className='w-1/2 flex items-center justify-end'>
          <div>
            <p className='font-bold text-5xl text-end'>{projects.length}</p>
            <p>Projects</p>
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
    </>
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
