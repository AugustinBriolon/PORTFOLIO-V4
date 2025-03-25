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
      <Section className="progress-container gap-20 pb-16 px-4 md:px-0">
        <div className="fixed z-30 right-2 top-1/2 h-32 w-[5px] rounded-full bg-white dark:bg-black border border-black dark:border-white overflow-hidden fill-anim">
          <div className="w-full bg-black dark:bg-white fill-bar"></div>
        </div>

        <div className="w-full">
          <div className="project-info-container h-[35vh] min-h-96 w-full flex justify-between items-end gap-2 md:gap-8 bg-white dark:bg-black">
            <div className="overflow-hidden w-4/5">
              <h2 className="text-4xl md:text-6xl font-bold uppercase text-left dark:text-white">
                {words.map((word, wordIndex) => (
                  <span
                    key={wordIndex}
                    className="inline-block overflow-hidden"
                  >
                    {Array.from(word).map((letter, letterIndex) => (
                      <span
                        key={letterIndex}
                        className="anim-text inline-block"
                      >
                        {letter}
                      </span>
                    ))}
                    {wordIndex !== words.length - 1 && <span>&nbsp;</span>}
                  </span>
                ))}
              </h2>
            </div>
            <div className="overflow-hidden mb-2">
              <a
                className="project-url-anim group justify-self-end w-fit flex h-12 select-none items-center justify-center gap-2 rounded-full bg-black aspect-square md:aspect-auto md:px-7 font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                href={project.websiteUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="hidden md:block uppercase text-sm">
                  VISITER
                </span>
                <Image
                  alt="arrow"
                  className="light-fill transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-105 grow-0 shrink-0"
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
            height={4320}
            src={urlFor(project.mainImage).toString()}
            width={5760}
            priority
          />
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-start px-4 md:px-8 gap-8">
          <div
            className={`${project.story ? "block" : "hidden"} overflow-hidden w-full`}
          >
            <RichText
              className="w-full text-black dark:text-white project-description-anim"
              value={project.story}
            />
          </div>
          <div ref={infoRef} className="w-full flex flex-col gap-8">
            <div className="grid grid-cols-project-info items-center gap-12 border-b border-black dark:border-white overflow-hidden">
              <p className="self-end">Date</p>
              <p className="font-bold capitalize text-lg justify-self-end project-info-anim">
                {formatDate(project.publishedAt)}
              </p>
            </div>
            <div className="grid grid-cols-project-info items-center gap-12 border-b border-black dark:border-white overflow-hidden">
              <p className="self-end">Langages</p>
              <div className="flex flex-wrap justify-end gap-1 justify-self-end">
                {project.language.map((language, index) => (
                  <a
                    key={index}
                    className="font-bold capitalize text-lg relative group project-info-anim"
                    href={language.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="relative z-10 group-hover:text-white">
                      {language.title}
                      {index < project.language.length - 1 && ","}
                    </span>
                    <span className="absolute left-0 bottom-0 w-full h-0 bg-black dark:bg-white -z-10 transition-all duration-200 group-hover:h-full"></span>
                  </a>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-project-info items-center gap-12 border-b border-black dark:border-white overflow-hidden">
              <p className="self-end">Contribution</p>
              <div className="flex flex-wrap justify-end gap-1 justify-self-end">
                {project.types.map((type, index) => (
                  <p
                    key={index}
                    className="font-bold capitalize text-lg justify-self-end project-info-anim"
                  >
                    {type.title}
                    {index < project.types.length - 1 && ","}
                  </p>
                ))}
              </div>
            </div>

            {project.authors && project.authors.length > 1 && (
              <div className="grid grid-cols-project-info items-end md:items-center gap-12 border-b border-black dark:border-white overflow-hidden">
                <p className="self-end">Réalisé par</p>
                <div className="flex flex-wrap gap-1 justify-end justify-self-end">
                  {project.authors.map((author, index) => (
                    <a
                      key={index}
                      className="font-bold capitalize text-lg relative group project-info-anim"
                      href={author.websiteUrl}
                      rel="noopener"
                      target="_blank"
                    >
                      <span className="relative z-10 group-hover:text-white">
                        {author.name}
                        {index < project.authors.length - 1 && ","}
                      </span>
                      <span className="absolute left-0 bottom-0 w-full h-0 bg-black dark:bg-white -z-10 transition-all duration-200 group-hover:h-full"></span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {project.testimonial && (
              <div className="grid grid-cols-project-info items-center gap-12 border-b border-black dark:border-white overflow-hidden">
                <p className="self-end">Client</p>
                <p className="font-bold text-lg text-right justify-self-end project-info-anim">
                  {project.title}
                </p>
              </div>
            )}

            <div className="flex items-center justify-end overflow-hidden">
              <a
                className="project-url-anim group justify-self-end w-fit flex h-12 select-none items-center justify-center gap-2 rounded-full bg-black aspect-square md:aspect-auto md:px-7 font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                href={project.websiteUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="hidden md:block uppercase text-sm">
                  VISITER
                </span>
                <Image
                  alt="arrow"
                  className="light-fill transition-all group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-105 grow-0 shrink-0"
                  height={20}
                  src="/icons/arrow-up-right.svg"
                  width={20}
                />
              </a>
            </div>
          </div>
        </div>

        {project.video && (
          <div className="w-full select-none relative px-4 md:px-8">
            <Image
              alt="macbook mockup"
              className="abs-center h-full w-full px-4 md:px-8 z-40"
              height={1080}
              layout="responsive"
              src="/macbook-mockup.png"
              width={1920}
            />
            <div className="px-[8.5%]">
              <div className="bg-[#000] pb-[8%] pt-[4%]">
                <video
                  className="w-full h-auto z-10 relative min-h-[150px] sm:min-h-[300px] md:min-h-[300px] lg:min-h-[500px]"
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
          <div className="w-full flex flex-col gap-8">
            <h3 className="text-2xl font-bold uppercase dark:text-white">
              Témoignage
            </h3>
            <div className="md:w-3/4 flex flex-col gap-4">
              {project.testimonial.map((testimonial, index) => (
                <div key={index} className="">
                  <Image
                    alt="quote"
                    className="dark-fill float-left w-10 h-10 mr-4 select-none"
                    height={64}
                    src="/icons/quote.svg"
                    width={64}
                  />
                  <p className="text-lg text-balance">{testimonial.quote}</p>
                  <div className="pt-4 flex items-center justify-start gap-2">
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

        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-2">
          {projects.map((filteredProject, index) => (
            <Link
              key={index}
              className="group flex flex-col group w-fit border border-black/20 dark:border-white/20"
              href={`/projets/` + filteredProject.slug.current}
            >
              <div className="overflow-hidden">
                <Image
                  alt={`Image du projet ${filteredProject.title}`}
                  className="group-hover:scale-105 transition-transform ease-out duration-300"
                  height={4320}
                  src={urlFor(filteredProject.mainImage).toString()}
                  width={5760}
                  priority
                />
              </div>
              <div className="flex flex-col justify-between">
                <div className="flex justify-between items-center gap-2 p-2">
                  <p className="text-xl font-bold truncate">
                    {filteredProject.title}
                  </p>
                  <Image
                    alt="arrow"
                    className="dark-fill group-hover:-translate-y-1 group-hover:translate-x-1 transition-all"
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
