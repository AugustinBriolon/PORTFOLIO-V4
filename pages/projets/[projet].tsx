import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Section from '@/components/Section';
import data from '@/data/data.json';
import Link from 'next/link';
import { GetStaticPaths, GetStaticProps } from 'next';
import { Project } from '@/data/types';
import { ParsedUrlQuery } from 'querystring';

gsap.registerPlugin(ScrollTrigger);

interface ProjectPageProps {
  project: Project;
}

export default function Page({ project }: ProjectPageProps) {
  const pathname = usePathname();

  useGSAP(() => {
    timelineProjectAnim();
    scrollTriggerAnimation();
  }, []);

  if (!pathname) {
    return <div>Chargement...</div>;
  }

  // const project = data.projects.filter(
  //   (project) => project.slug === pathname.split('/')[2]
  // )[0];
  const projects = data.projects as Project[];
  const words = project.title.split(' ');

  const timelineProjectAnim = () => {
    const tl = gsap.timeline();
    tl.from('.project-info-container', {
      // height: "90vh",
      yPercent: 100,
      duration: 1,
      ease: 'power2.out',
    });
    tl.from(
      '.anim-text',
      {
        yPercent: 100,
        stagger: 0.05,
        duration: 1,
        ease: 'power2.out',
      },
      '-=1'
    );
    tl.from(
      '.project-tags-anim',
      {
        yPercent: 400,
        stagger: 0.05,
        duration: 1,
        ease: 'power2.out',
      },
      '-=1'
    );
    tl.from(
      '.fill-anim',
      {
        x: 100,
        duration: 1,
        ease: 'power2.out',
      },
      '-=1.5'
    );
  };

  const scrollTriggerAnimation = () => {
    ScrollTrigger.create({
      trigger: document.documentElement,
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
    ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress * 2;
        gsap.to('.title-container-anim', {
          x: `${progress}%`,
          ease: 'linear',
        });
      },
    });
  };

  const formatStory = (story: string) => {
    return story.split(/(?<=[.!?])\s+/).map((sentence, index) => {
      return (
        <span key={index} className='dark:text-white'>
          {sentence}
        </span>
      );
    });
  };

  return (
    <Section className='progress-container gap-20 pb-16'>
      <div className='fixed z-30 right-2 top-1/2 h-32 w-[5px] rounded-full bg-white dark:bg-black border border-black dark:border-white overflow-hidden fill-anim'>
        <div className='w-full bg-black dark:bg-white fill-bar'></div>
      </div>

      <div className='w-full '>
        <div className='project-info-container h-[35vh] min-h-96 w-full flex flex-col md:flex-row justify-end md:justify-between items-end px-2 z-10 bg-white dark:bg-black'>
          <div className='overflow-hidden md:w-1/2'>
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
          <div className='overflow-hidden md:w-1/2'>
            <div className='flex flex-wrap gap-3 items-center justify-end pb-3'>
              {project.tags.map((tag, index) => (
                <span
                  key={index}
                  className='project-tags-anim dark:text-white text-lg font-medium uppercase border border-black/20 dark:border-white/20 rounded-full px-4 py-1'
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Image
          src={project.img}
          alt={project.title}
          width={1920}
          height={1080}
        />
      </div>

      <div className='w-full h-1/2 flex flex-col items-start justify-center gap-4 px-2'>
        <h3 className='text-2xl font-bold uppercase dark:text-white'>
          Description
        </h3>
        <p className='dark:text-white flex flex-col gap-2'>
          {formatStory(project.story)}
        </p>
      </div>

      <div className='relative h-28 w-full'>
        <div className='bg-black dark:bg-white w-screen h-28 overflow-hidden flex items-center absolute abs-center top-1/2 before:absolute before:top-0 before:left-0 before:h-full before:w-10 before:bg-gradient-to-r before:from-black before:to-transparent before:content-[""] before:z-10 after:absolute after:top-0 after:right-0 after:h-full after:w-10 after:bg-gradient-to-l after:from-black after:to-transparent after:content-[""] after:z-10'>
          <div className='title-container-anim absolute right-0 flex gap-8'>
            {Array.from({ length: 20 }).map((_, index) => (
              <h2
                key={index}
                className='text-white dark:text-black text-5xl text-nowrap uppercase font-bold antonio'
              >
                {project.title}
              </h2>
            ))}
          </div>
        </div>
      </div>

      <div className='w-full flex flex-col gap-4 px-2'>
        <h3 className='text-2xl font-bold uppercase dark:text-white'>
          À voir aussi
        </h3>
        <div className='grid md:grid-cols-2 justify-start items-center gap-2'>
          {projects
            .filter((p) => p.slug !== project.slug)
            .map((filteredProject, index) => (
              <Link
                key={index}
                href={filteredProject.slug}
                scroll={true}
                className='flex flex-col border border-black/20 dark:border-white/20 group'
              >
                <div className='overflow-hidden'>
                  <Image
                    src={filteredProject.img}
                    alt={filteredProject.title}
                    className='group-hover:scale-105 transition-transform duration-500'
                    width={1920}
                    height={1080}
                  />
                </div>
                <div className='flex justify-between items-center'>
                  <h4 className='text-xl p-2'>{filteredProject.title}</h4>
                  <Image
                    src='/icons/arrow-up-right.svg'
                    className='dark-fill'
                    alt='arrow'
                    width={24}
                    height={24}
                  />
                </div>
              </Link>
            ))}
        </div>
      </div>
    </Section>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const projects = data.projects as Project[];
  const paths = projects.map((project) => ({
    params: { projet: project.slug },
  }));
  return { paths, fallback: false };
};

interface Params extends ParsedUrlQuery {
  slug: string;
}

export const getStaticProps: GetStaticProps<ProjectPageProps, Params> = async ({
  params,
}) => {
  const projects = data.projects as Project[];
  const project = projects.find((p) => p.slug === params?.projet);

  if (!project) {
    return { notFound: true };
  }

  return { props: { project } };
};
