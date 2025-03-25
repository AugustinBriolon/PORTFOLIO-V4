import ProjectCard from "@/components/ProjectCard";
import Section from "@/components/Section";
import SEO from "@/components/SEO";
import { TypeProject } from "@/data/types";
import { fetchProjects } from "@/services/projects.sevices";
import { useGSAP } from "@gsap/react";
import NumberFlow from "@number-flow/react";
import gsap from "gsap";
import { useEffect, useState } from "react";

export default function Projects({ projects }: { projects: TypeProject[] }) {
  const [length, setLength] = useState(0);

  const timelineAnimation = () => {
    const tl = gsap.timeline();
    tl.from(".title-anim", {
      y: 100,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });
    tl.from(
      ".project-lenght",
      {
        y: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
      },
      "<",
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
      <SEO
        title="Projets • Augustin Briolon • Portfolio Développeur Web Front-End 🚀"
        url="https://august1.dev/projets"
      />
      <Section className="min-h-[50vh]! flex-row! items-center justify-between md:gap-12">
        <div className="w-full overflow-hidden">
          <h1 className="title-anim h1 text-start font-extrabold uppercase dark:text-white">
            MES PROJETS
          </h1>
        </div>
        <div className="flex w-fit items-center justify-end">
          <div>
            <div className="overflow-hidden">
              <NumberFlow
                className="project-lenght text-end text-5xl font-bold"
                format={{ notation: "compact" }}
                locales="fr-FR"
                value={length}
                transformTiming={{
                  duration: 700,
                  easing: "cubic-bezier(.17,.67,.14,.98)",
                }}
              />
            </div>
            <div className="hidden overflow-hidden md:block">
              <p className="title-anim">Projects</p>
            </div>
          </div>
        </div>
      </Section>
      <Section className="gap-8">
        <div className="flex w-full flex-col gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} index={index} project={project} />
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
