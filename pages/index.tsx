import CursorImages from "@/components/CursorImages";
import Section from "@/components/Section";
import SEO from "@/components/SEO";
import { TypeProject } from "@/data/types";
import { fetchProjects } from "@/services/projects.sevices";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Home({ projects }: { projects: TypeProject[] }) {
  const aboutText =
    "Portfolio d'Augustin Briolon. Développeur web spécialisé en front-end. Je transforme vos projets en sites créatifs et performants.".split(
      " ",
    );

  const imagesArray = projects.map((project) => project.mainImage);

  const timelineProjectAnim = () => {
    const tl = gsap.timeline();
    tl.from(".title-anim", {
      yPercent: 100,
      stagger: 0.1,
      duration: 1,
      ease: "power2.out",
    });
    tl.from(
      ".anim-text",
      {
        y: 100,
        stagger: 0.01,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=1",
    );
    tl.from(
      ".bottom-anim",
      {
        opacity: 0,
        yPercent: 100,
        duration: 1,
        ease: "power2.out",
      },
      "-=.5",
    );
    tl.from(
      ".ping-point",
      {
        opacity: 0,
        scale: 0,
        duration: 1,
        ease: "power2.out",
      },
      "+=1",
    );
    tl.from(
      ".anim-opacity",
      {
        opacity: 0,
        delay: 1,
        duration: 0.75,
        ease: "power2.out",
      },
      "-=3",
    );
  };

  useGSAP(() => {
    timelineProjectAnim();
  }, []);

  return (
    <main>
      <SEO />
      <Section className="h-[90dvh] justify-between">
        <div className="z-20 flex w-full flex-col items-center justify-start md:h-1/2">
          <div className="overflow-hidden">
            <h1 className="title-anim h1 text-center font-extrabold uppercase">DÉVELOPPEUR</h1>
          </div>
          <div className="overflow-hidden">
            <h1 className="title-anim h1 text-center font-extrabold uppercase">CRÉATIF©</h1>
          </div>
          <div className="overflow-hidden">
            <p className="anim-opacity font-semibold">Depuis 2019</p>
          </div>
        </div>

        <div className="z-20 flex w-full flex-col justify-between gap-8">
          <p className="about-text overflow-hidden">
            {aboutText.map((word, index) => (
              <span key={index} className="inline-block overflow-hidden">
                <span className="anim-text inline-block">
                  {word}
                  {index !== aboutText.length - 1 && "\u00A0"}
                </span>
              </span>
            ))}
          </p>
          <div className="flex w-full items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 overflow-hidden">
                <p className="bottom-anim text-sm">Status</p>
                <span className="ping-point relative flex h-2 w-2">
                  <span className="bg-green-pulse absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"></span>
                  <span className="bg-green-pulse relative inline-flex h-2 w-2 rounded-full"></span>
                </span>
              </div>
              <div className="overflow-hidden">
                <p className="bottom-anim flex items-center gap-2 font-medium uppercase">
                  Disponible
                </p>
              </div>
            </div>
            <div>
              <div className="overflow-hidden">
                <p className="about- bottom-anim text-sm">Contact</p>
              </div>
              <div className="flex gap-2 overflow-hidden">
                <p className="bottom-anim font-medium uppercase">
                  Envoyez un{" "}
                  <a className="underline" href="mailto:augustin.briolon@gmail.com">
                    mail
                  </a>{" "}
                  ou prenez{" "}
                  <a
                    className="underline"
                    href="https://calendly.com/augustin-briolon/presentation-de-votre-projet"
                    target="_blank"
                  >
                    rendez-vous
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <CursorImages images={imagesArray} />
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
