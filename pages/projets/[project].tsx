import { GetStaticPropsContext } from "next";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { urlFor } from "@/sanity/lib/image";
import Section from "@/components/Section";
import { TypeProject, TypePaths } from "@/data/types";
import { fetchPaths } from "@/services/path.services";
import { fetchProject } from "@/services/project.sevices";
import RichText from "@/components/RichText";
import { fetchProjects } from "@/services/projects.sevices";
import SEO from "@/components/SEO";
import { useRef } from "react";
import InfiniteScrollTitle from "@/components/InfiniteScrollTitle";

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
  const words = project.title.split(" ");

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("fr-FR", {
      month: "short",
      year: "numeric",
    }).format(date);
  };

  const timelineProjectAnim = () => {
    const tl = gsap.timeline();
    tl.from(".project-info-container", {
      yPercent: 100,
      duration: 1,
      ease: "power2.out",
    });
    tl.from(
      ".anim-text",
      {
        yPercent: 100,
        stagger: 0.05,
        duration: 1,
        ease: "power2.out",
      },
      "-=1",
    );

    tl.from(
      ".fill-anim",
      {
        x: 100,
        duration: 1,
        ease: "power2.out",
      },
      "-=1.5",
    );
  };

  const scrollTriggerAnimation = () => {
    if (!infoRef.current) return;
    const projectAnim = infoRef.current.querySelectorAll(".project-info-anim");

    gsap.fromTo(
      projectAnim,
      {
        yPercent: 100,
      },
      {
        yPercent: 0,
        duration: 1,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 85%",
        },
      },
    );

    ScrollTrigger.create({
      trigger: document.documentElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        const progress = self.progress * 100;
        gsap.to(".fill-bar", {
          height: `${progress}%`,
          duration: 0.5,
          ease: "power2.out",
        });
      },
    });

    if (project.story) {
      gsap.set(".project-description-anim p", { yPercent: 25, opacity: 0 });
      ScrollTrigger.create({
        trigger: ".project-description-anim",
        start: "top 90%",
        onEnter: () => {
          gsap.to(".project-description-anim p", {
            yPercent: 0,
            opacity: 1,
            duration: 1.5,
            ease: "power2.out",
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
        description={project.description}
        title={`${project.title} • Augustin Briolon • Portfolio Développeur Web Front-End 🚀`}
        url={`https://august1.dev/projets/${project.slug}`}
      />
      <Section className="progress-container gap-20 px-4 pb-16 md:px-0">
        <div className="fill-anim fixed top-1/2 right-2 z-30 h-32 w-[5px] overflow-hidden rounded-full border border-black bg-white dark:border-white dark:bg-black">
          <div className="fill-bar w-full bg-black dark:bg-white"></div>
        </div>

        <div className="w-full">
          <div className="project-info-container flex h-[35vh] min-h-96 w-full items-end justify-between gap-2 bg-white md:gap-8 dark:bg-black">
            <div className="w-4/5 overflow-hidden">
              <h2 className="text-left text-4xl font-bold uppercase md:text-6xl dark:text-white">
                {words.map((word, wordIndex) => (
                  <span key={wordIndex} className="inline-block overflow-hidden py-1">
                    {Array.from(word).map((letter, letterIndex) => (
                      <span key={letterIndex} className="anim-text inline-block">
                        {letter}
                      </span>
                    ))}
                    {wordIndex !== words.length - 1 && <span>&nbsp;</span>}
                  </span>
                ))}
              </h2>
            </div>
            <div className="mb-4 overflow-hidden">
              <a
                className="project-url-anim group flex aspect-square h-12 w-fit items-center justify-center gap-2 justify-self-end rounded-full bg-black font-medium text-white transition select-none hover:bg-neutral-800 md:aspect-auto md:px-7 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                href={project.websiteUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="hidden text-sm uppercase md:block">VISITER</span>
                <Image
                  alt="arrow"
                  className="light-fill shrink-0 grow-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-105"
                  height={20}
                  src="/icons/arrow-up-right.svg"
                  width={20}
                />
              </a>
            </div>
          </div>

          <Image
            alt={`Image principale du projet ${project.title}`}
            className="w-full"
            height={1080}
            src={urlFor(project.mainImage).toString()}
            width={1920}
            priority
          />
        </div>

        <div className="flex w-full flex-col items-start justify-between gap-8 px-4 md:flex-row md:px-8">
          <div className={`${project.story ? "block" : "hidden"} w-full overflow-hidden`}>
            <RichText
              className="project-description-anim w-full text-black dark:text-white"
              value={project.story}
            />
          </div>
          <div ref={infoRef} className="flex w-full flex-col gap-8">
            <div className="grid-cols-project-info grid items-center gap-12 overflow-hidden border-b border-black dark:border-white">
              <p className="self-end">Date</p>
              <p className="project-info-anim justify-self-end text-lg font-bold capitalize">
                {formatDate(project.publishedAt)}
              </p>
            </div>
            <div className="grid-cols-project-info grid items-center gap-12 overflow-hidden border-b border-black dark:border-white">
              <p className="self-end">Langages</p>
              <div className="flex flex-wrap justify-end gap-1 justify-self-end">
                {project.language.map((language, index) => (
                  <a
                    key={index}
                    className="group project-info-anim relative text-lg font-bold capitalize"
                    href={language.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="relative z-10 group-hover:text-white">
                      {language.title}
                      {index < project.language.length - 1 && ","}
                    </span>
                    <span className="absolute bottom-0 left-0 -z-10 h-0 w-full bg-black transition-all duration-200 group-hover:h-full dark:bg-white"></span>
                  </a>
                ))}
              </div>
            </div>

            <div className="grid-cols-project-info grid items-center gap-12 overflow-hidden border-b border-black dark:border-white">
              <p className="self-end">Contribution</p>
              <div className="flex flex-wrap justify-end gap-1 justify-self-end">
                {project.types.map((type, index) => (
                  <p
                    key={index}
                    className="project-info-anim justify-self-end text-lg font-bold capitalize"
                  >
                    {type.title}
                    {index < project.types.length - 1 && ","}
                  </p>
                ))}
              </div>
            </div>

            {project.authors && project.authors.length > 1 && (
              <div className="grid-cols-project-info grid items-end gap-12 overflow-hidden border-b border-black md:items-center dark:border-white">
                <p className="self-end">Réalisé par</p>
                <div className="flex flex-wrap justify-end gap-1 justify-self-end">
                  {project.authors.map((author, index) => (
                    <a
                      key={index}
                      className="group project-info-anim relative text-lg font-bold capitalize"
                      href={author.websiteUrl}
                      rel="noopener"
                      target="_blank"
                    >
                      <span className="relative z-10 group-hover:text-white">
                        {author.name}
                        {index < project.authors.length - 1 && ","}
                      </span>
                      <span className="absolute bottom-0 left-0 -z-10 h-0 w-full bg-black transition-all duration-200 group-hover:h-full dark:bg-white"></span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {project.testimonial && (
              <div className="grid-cols-project-info grid items-center gap-12 overflow-hidden border-b border-black dark:border-white">
                <p className="self-end">Client</p>
                <p className="project-info-anim justify-self-end text-right text-lg font-bold">
                  {project.title}
                </p>
              </div>
            )}

            <div className="flex items-center justify-end overflow-hidden">
              <a
                className="project-url-anim group flex aspect-square h-12 w-fit items-center justify-center gap-2 justify-self-end rounded-full bg-black font-medium text-white transition select-none hover:bg-neutral-800 md:aspect-auto md:px-7 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                href={project.websiteUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="hidden text-sm uppercase md:block">VISITER</span>
                <Image
                  alt="arrow"
                  className="light-fill shrink-0 grow-0 transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:scale-105"
                  height={20}
                  src="/icons/arrow-up-right.svg"
                  width={20}
                />
              </a>
            </div>
          </div>
        </div>

        {project.video && (
          <div className="relative w-full overflow-hidden px-4 select-none md:px-8">
            <Image
              alt="macbook mockup"
              className="abs-center z-40 h-full w-full px-4 md:px-8"
              height={1080}
              layout="responsive"
              src="/macbook-mockup.png"
              width={1920}
            />
            <div className="px-[8.9%]">
              <div className="bg-[#000] pt-[3%] pb-[8%]">
                <video
                  className="relative z-10 h-auto min-h-[150px] w-full sm:min-h-[300px] md:min-h-[300px] lg:min-h-[500px]"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src={project.video.webmUrl} type="video/webm" />
                  <source src={project.video.mp4Url} type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        )}

        {project.testimonial && (
          <div className="flex w-full flex-col gap-8">
            <h3 className="text-2xl font-bold uppercase dark:text-white">Témoignage</h3>
            <div className="flex flex-col gap-4 md:w-3/4">
              {project.testimonial.map((testimonial, index) => (
                <div key={index} className="">
                  <Image
                    alt="quote"
                    className="dark-fill float-left mr-4 h-10 w-10 select-none"
                    height={64}
                    src="/icons/quote.svg"
                    width={64}
                  />
                  <p className="text-lg text-balance">{testimonial.quote}</p>
                  <div className="flex items-center justify-start gap-2 pt-4">
                    <div className="h-px w-20 bg-black dark:bg-white"></div>
                    <p>
                      <strong>{testimonial.author}</strong>, {testimonial.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <InfiniteScrollTitle title={project.title} />

        <div className="flex w-full flex-col items-center justify-between gap-2 md:flex-row">
          {projects.map((filteredProject, index) => (
            <Link
              key={index}
              className="group group flex w-fit flex-col border border-black/20 dark:border-white/20"
              href={`/projets/` + filteredProject.slug.current}
            >
              <div className="overflow-hidden">
                <Image
                  alt={`Image du projet ${filteredProject.title}`}
                  className="transition-transform duration-300 ease-out group-hover:scale-105"
                  height={1080}
                  src={urlFor(filteredProject.mainImage).toString()}
                  width={1920}
                  priority
                />
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex items-center justify-between gap-2 p-2">
                  <p className="truncate text-xl font-bold">{filteredProject.title}</p>
                  <Image
                    alt="arrow"
                    className="dark-fill transition-all group-hover:translate-x-1 group-hover:-translate-y-1"
                    height={24}
                    src="/icons/arrow-up-right.svg"
                    width={24}
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
    (p: TypeProject) => p.slug.current === project.slug.current,
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
