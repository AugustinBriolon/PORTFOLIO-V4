import Section from '@/components/Section';
import SEO from '@/components/SEO';
import { TypePaths } from '@/data/types';
import { fetchPaths } from '@/services/path.services';
import NumberFlow from '@number-flow/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

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
      router.push('/');
    }

    return () => clearInterval(interval);
  }, [countdown, router]);

  const getRandomPath = () => {
    const randomPath =
      path.paths[Math.floor(Math.random() * path.paths.length)];
    return randomPath.slug;
  };

  return (
    <main>
      <SEO title='404 • Augustin Briolon • Portfolio Développeur Web Front-End 🚀' />
      <Section className='gap-12'>
        <h1 className='text-pretty text-center'>
          Cette page n&apos;existe pas
        </h1>
        <div className='w-full flex flex-col md:flex-row justify-between items-center gap-16'>
          <div className='w-full flex items-center justify-center flex-col gap-4'>
            <p className='font-bold text-xl text-center'>
              Redirection vers la HOME dans
            </p>
            <NumberFlow
              value={countdown}
              format={{ notation: 'compact' }}
              locales='fr-FR'
              transformTiming={{
                duration: 700,
                easing: 'cubic-bezier(.17,.67,.14,.98)',
              }}
              className='font-bold text-5xl text-end project-lenght'
            />
            <p className='font-bold text-xl'>
              {`seconde${countdown > 1 ? 's' : ''}`}
            </p>
          </div>
          <div className='flex md:flex-col items-center justify-center gap-2 w-full'>
            <div className='h-[2px] w-1/2 md:h-40 md:w-[2px] bg-black dark:bg-white'></div>
            <p>ou</p>
            <div className='h-[2px] w-1/2 md:h-40 md:w-[2px] bg-black dark:bg-white'></div>
          </div>

          <div className='w-full flex items-center justify-center flex-col gap-8'>
            <p className='font-bold text-xl'>Consulter un projet aléatoire</p>
            <Link
              href={`/projets/${getRandomPath()}`}
              className='justify-self-end w-fit flex h-12 select-none items-center justify-center gap-2 rounded-full bg-black px-7 font-medium text-white transition hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200'
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
