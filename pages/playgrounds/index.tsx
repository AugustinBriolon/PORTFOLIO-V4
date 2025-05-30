import { MediaContainer } from "@/components/Playgrounds/MediaContainer";
import PlaygroundCard from "@/components/Playgrounds/PlaygroundCard";
import { PreloadImages } from "@/components/Playgrounds/PreloadImages";
import Section from "@/components/Section";
import SEO from "@/components/SEO";
import { TypeProject } from "@/data/types";
import { urlFor } from "@/sanity/lib/image";
import { fetchPlaygrounds } from "@/services/playgrounds.sevices";
import { usePortfolioEffect } from "@/utils/hook/usePortfolioEffect";
import NumberFlow from "@number-flow/react";

export default function Playgrounds({ playgrounds }: { playgrounds: TypeProject[] }) {
  const {
    isHovered,
    setIsHovered,
    mediaContainerRef,
    handleMouseMove,
    createMediaElement,
    clearMedia,
  } = usePortfolioEffect();

  const handleListMouseEnter = () => setIsHovered(true);

  const handleListMouseLeave = () => {
    setIsHovered(false);
    clearMedia();
  };
  const handleProjectHover = (playground: TypeProject) => {
    const imageSrc = urlFor(playground.mainImage).toString();
    if (imageSrc) {
      createMediaElement(imageSrc);
    }
  };

  return (
    <main>
      <SEO
        title="Playgrounds • Augustin Briolon • Portfolio Développeur Web Front-End 🚀"
        url="https://august1.dev/playgrounds"
      />
      <Section className="min-h-[50vh]! flex-row! items-center justify-between md:gap-12">
        <div className="w-full overflow-hidden">
          <h1 className="title-anim h1 text-start font-extrabold uppercase dark:text-white">
            PLAYGROUNDS
          </h1>
        </div>
        <div className="flex w-fit items-center justify-end">
          <div>
            <div className="overflow-hidden">
              <NumberFlow
                className="project-lenght text-end text-5xl font-bold"
                format={{ notation: "compact" }}
                locales="fr-FR"
                value={playgrounds.length}
                transformTiming={{
                  duration: 700,
                  easing: "cubic-bezier(.17,.67,.14,.98)",
                }}
              />
            </div>
          </div>
        </div>
      </Section>
      <Section className="h-fit min-h-[25vh]!">
        <ul
          className="relative w-full border-b border-white/30"
          onMouseEnter={handleListMouseEnter}
          onMouseLeave={handleListMouseLeave}
          onMouseMove={handleMouseMove}
        >
          {playgrounds.map((playground, index) => (
            <PlaygroundCard
              key={index}
              index={index}
              playground={playground}
              onMouseEnter={() => handleProjectHover(playground)}
            />
          ))}
          <MediaContainer containerRef={mediaContainerRef} isVisible={isHovered} />
        </ul>

        <PreloadImages playgrounds={playgrounds} />
      </Section>
    </main>
  );
}

export async function getStaticProps() {
  const playgrounds = await fetchPlaygrounds();

  return {
    props: {
      playgrounds,
    },
  };
}
