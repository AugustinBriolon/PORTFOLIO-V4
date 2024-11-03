import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import Section from '@/components/Section';
import { GetStaticPropsContext } from 'next';
import { TypeProject, TypePaths } from '@/data/types';
import { fetchPaths } from '@/services/path.services';
import { fetchProject } from '@/services/project.sevices';
import { useGSAP } from '@gsap/react';
import { urlFor } from '@/sanity/lib/image';
import RichText from '@/components/RichText';
import { fetchProjects } from '@/services/projects.sevices';
import Link from 'next/link';

gsap.registerPlugin(ScrollTrigger);

export default function Page({
  project,
  projects,
}: {
  project: TypeProject;
  projects: TypeProject[];
  paths: TypePaths[];
}) {
  console.log(project);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

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

  useGSAP(() => {
    timelineProjectAnim();
    scrollTriggerAnimation();
  }, []);

  return (
    <Section className='progress-container gap-20 pb-16 px-4 md:px-0'>
      <div className='fixed z-30 right-2 top-1/2 h-32 w-[5px] rounded-full bg-white dark:bg-black border border-black dark:border-white overflow-hidden fill-anim'>
        <div className='w-full bg-black dark:bg-white fill-bar'></div>
      </div>

      <div className='w-full'>
        <div className='project-info-container h-[35vh] min-h-96 w-full flex flex-col md:flex-row justify-end md:justify-between items-end z-10 bg-white dark:bg-black'>
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
              {project.types.map((type, index) => (
                <span
                  key={index}
                  className='project-tags-anim dark:text-white text-lg font-medium uppercase border border-black/20 dark:border-white/20 rounded-full px-4 py-1'
                >
                  {type.title}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Image
          src={urlFor(project.mainImage).toString()}
          className='w-full'
          alt={project.title}
          width={1920}
          height={1080}
        />
      </div>

      <div className='w-full flex justify-between items-start px-8 gap-8'>
        <RichText
          value={project.story}
          className='w-1/2 text-black dark:text-white text-pretty'
        />
        <div className='w-1/2 flex flex-col gap-8'>
          <div className='grid grid-cols-project-info items-center gap-12 border-b border-black dark:border-white'>
            <p>DATE</p>
            <p className='font-bold capitalize text-lg justify-self-end'>
              {formatDate(project.publishedAt)}
            </p>
          </div>

          <div className='grid grid-cols-project-info items-center gap-12 border-b border-black dark:border-white'>
            <p>Langages</p>
            <div className='flex gap-1 justify-self-end'>
              {project.language.map((language, index) => (
                <a
                  key={index}
                  className='font-bold capitalize text-lg'
                  href={language.url}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  {language.title}
                  {index < project.language.length - 1 && ','}
                </a>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-project-info items-center gap-12 border-b border-black dark:border-white'>
            <p>Réalisé par</p>
            <div className='flex gap-1 justify-self-end'>
              {project.authors.map((author, index) => (
                <a
                  key={index}
                  href={author.websiteUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='font-bold capitalize text-lg'
                >
                  {author.name}
                  {index < project.language.length - 1 && ','}
                </a>
              ))}
            </div>
          </div>

          <div className='grid grid-cols-project-info items-center gap-12  border-b border-black dark:border-white'>
            <p>Client</p>
            <p className='font-bold capitalize text-lg  justify-self-end'>
              {project.title}
            </p>
          </div>

          <div>
            <div className='grid grid-cols-project-info items-center gap-12'>
              <p>Website</p>
              <a
                href={project.websiteUrl}
                rel='noopener noreferrer'
                target='_blank'
                className='group justify-self-end w-fit flex h-12 select-none items-center justify-center gap-2 rounded-full bg-black px-7 font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200'
              >
                Visiter
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='rotate-[135deg] transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-105'
                >
                  <path d='m12 19-7-7 7-7' />
                  <path d='M19 12H5' />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {project.gallery && (
        <div className='w-full grid grid-cols-2 gap-2'>
          {project.gallery.map((image, index) => (
            <Image
              key={index}
              src={urlFor(image).toString()}
              alt={project.title}
              className={`${index === 0 || index === 5 ? 'col-span-2 ' : 'col-span-1 '} object-cover`}
              width={3418}
              height={2120}
            />
          ))}
        </div>
      )}

      <div className='relative h-28 w-full'>
        <div className='bg-black dark:bg-white w-screen h-28 overflow-hidden flex items-center absolute abs-center top-1/2 before:absolute before:top-0 before:left-0 before:h-full before:w-10 before:bg-gradient-to-r before:from-black dark:before:from-white before:to-transparent before:content-[""] before:z-10 after:absolute after:top-0 after:right-0 after:h-full after:w-10 after:bg-gradient-to-l after:from-black dark:after:from-white after:to-transparent after:content-[""] after:z-10'>
          <div className='title-container-anim absolute right-0 flex gap-8'>
            {Array.from({ length: 100 }).map((_, index) => (
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

      <div className='w-full flex flex-col gap-4'>
        <h3 className='text-2xl font-bold uppercase dark:text-white'>
          À voir aussi
        </h3>
        <div className='grid md:grid-cols-2 justify-start items-center gap-2'>
          {projects
            .filter((p) => p.slug.current !== project.slug.current)
            .slice(0, 2)
            .map((filteredProject, index) => (
              <Link
                key={index}
                href={`/projets/` + filteredProject.slug.current}
                scroll={true}
                className='flex flex-col border border-black/20 dark:border-white/20 group'
              >
                <div className='overflow-hidden'>
                  <Image
                    src={urlFor(filteredProject.mainImage).toString()}
                    alt={filteredProject.title}
                    className='group-hover:scale-105 transition-transform duration-500'
                    width={1920}
                    height={1080}
                  />
                </div>
                <div className='flex justify-between items-center'>
                  <h4 className='text-xl p-2 font-bold'>
                    {filteredProject.title}
                  </h4>
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

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  const paths = await fetchPaths();
  const project = await fetchProject(params);
  const projects = await fetchProjects();

  return {
    props: {
      paths,
      project: project || null,
      projects,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = (await fetchPaths()).map((project: TypeProject) => ({
    params: { project: project.slug.toString() },
  }));

  console.log('Paths générés par getStaticPaths :', paths);

  return {
    paths,
    fallback: false,
  };
};
