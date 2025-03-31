import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import gsap from "gsap";
import { urlFor } from "@/sanity/lib/image";
import { TypeProject } from "@/data/types";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

interface ProjectCardProps {
  project: TypeProject;
  index: number;
}

gsap.registerPlugin(ScrollTrigger);

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const desciprionWords = project.description.split(" ");

  useGSAP(() => {
    if (!targetRef.current || !triggerRef.current) return;
    const lineAnim = triggerRef.current.querySelectorAll(".line-bottom-anim");
    const imageAnim = triggerRef.current.querySelectorAll(".project-img-anim");
    const titleAnim = triggerRef.current.querySelectorAll(".project-title-anim");
    const indexAnim = triggerRef.current.querySelectorAll(".project-index-anim");
    const textAnim = targetRef.current.querySelectorAll(".project-text-anim");
    const tagsAnim = triggerRef.current.querySelectorAll(".project-tags-anim");

    gsap
      .timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
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
          ease: "power2.out",
        },
      )
      .fromTo(
        indexAnim,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "<",
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
          ease: "power2.out",
        },
        "-=0.6",
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
          ease: "power2.out",
        },
        "<",
      )
      .fromTo(
        imageAnim,
        {
          scaleY: 1,
        },
        {
          scaleY: 0,
          duration: 0.8,
          ease: "power2.out",
        },
        "<",
      );

    gsap.fromTo(
      lineAnim,
      {
        scaleX: 0,
      },
      {
        scaleX: 1,
        duration: 1.2,
        ease: "power1.out",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 85%",
          end: "bottom 85%",
          scrub: 1,
        },
      },
    );
  }, []);

  return (
    <div key={project.slug.current} ref={triggerRef}>
      <Link className="group" href={`/projets/${project.slug.current}`} scroll={true}>
        <div className="flex h-fit w-full flex-col items-start justify-center gap-4 px-2 pb-4 md:flex-row md:items-center md:pb-8">
          <div className="w-full min-w-fit overflow-hidden md:w-fit">
            <div className="relative w-full min-w-fit">
              <Image
                alt="project"
                className="transition-transform duration-300 ease-out select-none group-hover:scale-105 md:max-w-72"
                height={150}
                quality={50}
                src={urlFor(project.mainImage).toString()}
                width={200}
                priority
              />
              <div
                ref={imageRef}
                className="project-img-anim absolute inset-0 h-full w-full origin-top bg-white dark:bg-black"
              ></div>
            </div>
          </div>
          <div className="flex h-full w-full flex-col gap-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex w-3/4 justify-between overflow-hidden py-1 md:w-fit">
                <h2 className="project-title-anim text-4xl font-bold">{project.title}</h2>
              </div>
              <div className="overflow-hidden">
                <p className="project-index-anim font-bold">
                  {index + 1 < 10 ? `0${index + 1}` : index + 1}/
                </p>
              </div>
            </div>
            <div ref={targetRef} className="w-3/4">
              {desciprionWords.map((word: string, index: number) => (
                <span key={index} className="inline-block overflow-hidden">
                  <span className="project-text-anim inline-block text-black/80 dark:text-white/80">
                    {word}
                    {index !== desciprionWords.length - 1 && "\u00A0"}
                  </span>
                </span>
              ))}
            </div>
            <div className="overflow-hidden py-1">
              {project.types.map((type, index) => (
                <span
                  key={index}
                  className="project-tags-anim mr-2 inline-block rounded-full border border-black/20 px-4 py-1 text-lg font-medium uppercase dark:border-white/20 dark:text-white"
                >
                  {type.title}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="line-bottom-anim h-[2px] w-full origin-left rounded-full bg-black dark:bg-white"></div>
      </Link>
    </div>
  );
}
