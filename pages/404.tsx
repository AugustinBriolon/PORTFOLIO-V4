import Section from "@/components/Section";
import SEO from "@/components/SEO";
import { TypePaths } from "@/data/types";
import { fetchPaths } from "@/services/path.services";
import NumberFlow from "@number-flow/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Custom404(path: { paths: TypePaths[] }) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    if (countdown <= 0) {
      clearInterval(interval);
      setCountdown(0);
      router.push("/");
    }

    return () => clearInterval(interval);
  }, [countdown, router]);

  const getRandomPath = () => {
    const randomPath = path.paths[Math.floor(Math.random() * path.paths.length)];
    return randomPath.slug;
  };

  return (
    <main>
      <SEO title="404 • Augustin Briolon • Portfolio Développeur Web Front-End 🚀" />
      <Section className="gap-12">
        <h1 className="text-center text-pretty">Cette page n&apos;existe pas</h1>
        <div className="flex w-full flex-col items-center justify-between gap-16 md:flex-row">
          <div className="flex w-full flex-col items-center justify-center gap-4">
            <p className="text-center text-xl font-bold">Redirection vers la HOME dans</p>
            <NumberFlow
              className="project-lenght text-end text-5xl font-bold"
              format={{ notation: "compact" }}
              locales="fr-FR"
              value={countdown}
              transformTiming={{
                duration: 700,
                easing: "cubic-bezier(.17,.67,.14,.98)",
              }}
            />
            <p className="text-xl font-bold">{`seconde${countdown > 1 ? "s" : ""}`}</p>
          </div>
          <div className="flex w-full items-center justify-center gap-2 md:flex-col">
            <div className="h-[2px] w-1/2 bg-black md:h-40 md:w-[2px] dark:bg-white"></div>
            <p>ou</p>
            <div className="h-[2px] w-1/2 bg-black md:h-40 md:w-[2px] dark:bg-white"></div>
          </div>

          <div className="flex w-full flex-col items-center justify-center gap-8">
            <p className="text-xl font-bold">Consulter un projet aléatoire</p>
            <Link
              className="flex h-12 w-fit items-center justify-center gap-2 justify-self-end rounded-full bg-black px-7 font-medium text-white transition select-none hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
              href={`/projets/${getRandomPath()}`}
            >
              Visiter
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}

export const getStaticProps = async () => {
  const paths = await fetchPaths();

  return {
    props: {
      paths,
    },
  };
};
