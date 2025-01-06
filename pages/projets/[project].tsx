import { GetStaticPropsContext } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { urlFor } from '@/sanity/lib/image';
import Section from '@/components/Section';
import { TypeProject, TypePaths } from '@/data/types';
import { fetchPaths } from '@/services/path.services';
import { fetchProject } from '@/services/project.sevices';
import RichText from '@/components/RichText';
import { fetchProjects } from '@/services/projects.sevices';
import SEO from '@/components/SEO';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function Page({
  project,
  projects,
  paths,
}: {
  project: TypeProject;
  projects: TypeProject[];
  paths: TypePaths[];
}) {
  const infoRef = useRef<HTMLDivElement>(null);
  const words = project.title.split(' ');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      month: 'short',
      year: 'numeric',
    }).format(date);
  };

  const timelineProjectAnim = () => {
    const tl = gsap.timeline();
    tl.from('.project-info-container', {
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
    if (!infoRef.current) return;
    const projectAnim = infoRef.current.querySelectorAll('.project-info-anim');

    gsap.fromTo(
      projectAnim,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top 85%',
        },
      }
    );

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
    if (project.story) {
      gsap.set('.project-description-anim p', { yPercent: 25, opacity: 0 });
      ScrollTrigger.create({
        trigger: '.project-description-anim',
        start: 'top 90%',
        onEnter: () => {
          gsap.to('.project-description-anim p', {
            yPercent: 0,
            opacity: 1,
            duration: 1.5,
            ease: 'power2.out',
          });
        },
      });
    }
  };

  useGSAP(() => {
    timelineProjectAnim();
    scrollTriggerAnimation();
  }, [paths]);

  return (
    <main>
      <SEO
        title={`${project.title} • Augustin Briolon • Portfolio Développeur Web Front-End 🚀`}
        description={project.description}
        url={`https://august1.dev/projets/${project.slug}`}
      />
      <Section className='progress-container gap-20 pb-16 px-4 md:px-0'>
        <div className='fixed z-30 right-2 top-1/2 h-32 w-[5px] rounded-full bg-white dark:bg-black border border-black dark:border-white overflow-hidden fill-anim'>
          <div className='w-full bg-black dark:bg-white fill-bar'></div>
        </div>

        <div className='w-full'>
          <div className='project-info-container h-[35vh] min-h-96 w-full flex flex-col md:flex-row justify-end md:justify-between items-end z-10 bg-white dark:bg-black'>
            <div className='overflow-hidden md:w-1/2'>
              <h2 className='text-4xl md:text-6xl font-bold uppercase text-right  md:text-left dark:text-white'>
                {words.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className='inline-block overflow-hidden'
                  >
                    {Array.from(word).map((letter, letterIndex) => (
                      <span
                        key={letterIndex}
                        className='anim-text inline-block'
                      >
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
            priority
            className='w-full'
            alt={`Image principale du projet ${project.title}`}
            width={5760}
            height={4320}
          />
        </div>

        <div className='w-full flex flex-col md:flex-row justify-between items-start px-4 md:px-8 gap-8'>
          <div
            className={`${project.story ? 'block' : 'hidden'} overflow-hidden w-full`}
          >
            <RichText
              value={project.story}
              className='w-full text-black dark:text-white project-description-anim'
            />
          </div>
          <div className='w-full flex flex-col gap-8' ref={infoRef}>
            <div className='grid grid-cols-project-info items-center gap-12 border-b border-black dark:border-white overflow-hidden'>
              <p className='self-end'>Date</p>
              <p className='font-bold capitalize text-lg justify-self-end project-info-anim'>
                {formatDate(project.publishedAt)}
              </p>
            </div>

            <div className='grid grid-cols-project-info items-center gap-12 border-b border-black dark:border-white overflow-hidden'>
              <p className='self-end'>Langages</p>
              <div className='flex flex-wrap justify-end gap-1 justify-self-end project-info-anim'>
                {project.language.map((language, index) => (
                  <a
                    key={index}
                    href={language.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='font-bold capitalize text-lg'
                  >
                    {language.title}
                    {index < project.language.length - 1 && ','}
                  </a>
                ))}
              </div>
            </div>

            <div className='grid grid-cols-project-info items-end md:items-center gap-12 border-b border-black dark:border-white overflow-hidden'>
              <p className='self-end'>Réalisé par</p>
              <div className='flex flex-wrap gap-1 justify-end justify-self-end project-info-anim'>
                {project.authors.map((author, index) => (
                  <a
                    key={index}
                    href={author.websiteUrl}
                    target='_blank'
                    rel='noopener'
                    className='font-bold capitalize text-lg'
                  >
                    {author.name}
                    {index < project.authors.length - 1 && ','}
                  </a>
                ))}
              </div>
            </div>

            {project.testimonial && (
              <div className='grid grid-cols-project-info items-center gap-12  border-b border-black dark:border-white overflow-hidden'>
                <p className='self-end'>Client</p>
                <p className='font-bold text-lg  justify-self-end project-info-anim'>
                  {project.title}
                </p>
              </div>
            )}

            <div>
              <div className='grid grid-cols-project-info items-center gap-12 '>
                <p>Website</p>
                <a
                  href={project.websiteUrl}
                  rel='noopener noreferrer'
                  target='_blank'
                  className='group justify-self-end w-fit flex h-12 select-none items-center justify-center gap-2 rounded-full bg-black px-7 font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200'
                >
                  Visiter
                  <Image
                    src='/icons/arrow-up-right.svg'
                    className='light-fill transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-105'
                    alt='arrow'
                    width={24}
                    height={24}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {project.video && (
          <a
            href={project.websiteUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='w-full select-none'
          >
            <video
              className='w-full h-auto z-10 relative min-h-[150px] sm:min-h-[300px] md:min-h-[300px] lg:min-h-[500px]'
              autoPlay
              playsInline
              loop
              muted
            >
              <source src={project.video.webmUrl} type='video/webm' />
              <source src={project.video.mp4Url} type='video/mp4' />
            </video>
          </a>
        )}

        {project.testimonial && (
          <div className='w-full flex flex-col gap-8'>
            <h3 className='text-2xl font-bold uppercase dark:text-white'>
              Témoignage
            </h3>
            <div className='md:w-3/4 flex flex-col gap-4'>
              {project.testimonial.map((testimonial, index) => (
                <div className='' key={index}>
                  <Image
                    src='/icons/quote.svg'
                    alt='quote'
                    width={64}
                    height={64}
                    className='dark-fill float-left w-10 h-10 mr-4'
                  />
                  <p className='text-lg text-balance'>{testimonial.quote}</p>
                  <div className='pt-4 flex items-center justify-start gap-2'>
                    <div className='h-px w-20 bg-black dark:bg-white'></div>
                    <p>
                      <strong>{testimonial.author}</strong>, {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className='relative h-28 w-full'>
          <div className='bg-black dark:bg-white w-screen h-20 md:h-28 overflow-hidden flex items-center absolute abs-center top-1/2 before:absolute before:top-0 before:left-0 before:h-full before:w-10 before:bg-gradient-to-r before:from-black dark:before:from-white before:to-transparent before:content-[""] before:z-10 after:absolute after:top-0 after:right-0 after:h-full after:w-10 after:bg-gradient-to-l after:from-black dark:after:from-white after:to-transparent after:content-[""] after:z-10'>
            <div className='title-container-anim absolute right-0 flex gap-4 md:gap-8'>
              {Array.from({ length: 100 }).map((_, index) => (
                <h2
                  key={index}
                  className='text-white dark:text-black text-xl md:text-5xl text-nowrap uppercase font-bold'
                >
                  {project.title}
                </h2>
              ))}
            </div>
          </div>
        </div>

        <div className='w-full flex flex-col md:flex-row justify-between items-center gap-2'>
          <h4 className='text-left w-full font-bold'>Voir aussi</h4>
          {projects.map((filteredProject, index) => (
            <Link
              key={index}
              href={`/projets/` + filteredProject.slug.current}
              scroll={false}
              className='flex flex-col group w-fit border border-black/20 dark:border-white/20'
            >
              <Image
                src={urlFor(filteredProject.mainImage).toString()}
                alt={`Image du projet ${filteredProject.title}`}
                priority
                width={5760}
                height={4320}
              />
              <div className='flex flex-col justify-between'>
                <div className='flex justify-between items-center gap-2 p-2'>
                  <p className='text-xl font-bold truncate'>
                    {filteredProject.title}
                  </p>
                  <Image
                    src='/icons/arrow-up-right.svg'
                    className='dark-fill group-hover:-translate-y-1 group-hover:translate-x-1 transition-all'
                    alt='arrow'
                    width={24}
                    height={24}
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  );
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const { params } = context;

  const paths = await fetchPaths();
  const project = await fetchProject(params);
  const projects = await fetchProjects();

  const projectIndex = projects.findIndex(
    (p: TypeProject) => p.slug.current === project.slug.current
  );
  const filteredProjects = [
    projects[(projectIndex + 1) % projects.length],
    projects[(projectIndex - 1 + projects.length) % projects.length],
  ];

  return {
    props: {
      paths,
      project: project || null,
      projects: filteredProjects,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = (await fetchPaths()).map((project: TypeProject) => ({
    params: { project: project.slug.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};
