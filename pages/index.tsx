import Section from '@/components/Section';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export default function Home() {
  const curretDateYear = new Date().getFullYear();

  const animateIn = () => {
    gsap.from('.title-anim', {
      y: 100,
      stagger: 0.1,
      duration: 1,
      ease: 'power2.out',
    });
  };
  const animateOpacity = () => {
    gsap.from('.anim-opacity', {
      opacity: 0,
      delay: 1,
      duration: 0.75,
      ease: 'power2.out',
    });
  };

  const aboutText =
    "Portfolio d'Augustin Briolon. Développeur web de passion et spécialisé en front-end. Je transforme vos projets en sites performants.".split(
      ' '
    );

  const timelineProjectAnim = () => {
    const tl = gsap.timeline();
    tl.from('.subtitle-anim', {
      yPercent: 1000,
      duration: 1,
      ease: 'power2.out',
    });
    tl.from(
      '.project-line-anim',
      {
        scaleX: 0,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.5'
    );
    tl.from(
      '.anim-text',
      {
        y: 100,
        stagger: 0.01,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.5'
    );
    tl.from(
      '.project-title-anim',
      {
        y: 100,
        duration: 1,
        ease: 'power2.out',
      },
      '-=1'
    );
    tl.from(
      '.bottom-anim',
      {
        opacity: 0,
        yPercent: 100,
        duration: 1,
        ease: 'power2.out',
      },
      '-=.5'
    );
  };

  useGSAP(() => {
    animateIn();
    animateOpacity();
    timelineProjectAnim();
  }, []);

  return (
    <Section className='h-fit md:h-[90vh] justify-between'>
      <div className='w-full flex flex-col items-center justify-start h-[50vh] md:h-1/2'>
        <div className='overflow-hidden'>
          <h1 className='title-anim uppercase text-center font-extrabold'>
            DÉVELOPPEUR WEB
          </h1>
        </div>
        <div className='overflow-hidden'>
          <h1 className='title-anim uppercase text-center font-extrabold'>
            FRONT-END©
          </h1>
        </div>
        <p className='anim-opacity font-semibold'>(2019 - {curretDateYear})</p>
      </div>

      <div className='w-full flex flex-col gap-8 justify-between'>
        <div className='w-full h-1/2 flex flex-col gap-4'>
          <div className='overflow-hidden'>
            <h2 className='subtitle-anim uppercase font-bold text-2xl'>
              À propos
            </h2>
          </div>
          {/* <p className='about-text'></p> */}
          <p className='about-text overflow-hidden '>
            {aboutText.map((word, index) => (
              <span key={index} className='inline-block overflow-hidden'>
                <span className='anim-text inline-block'>
                  {word}
                  {index !== aboutText.length - 1 && '\u00A0'}
                </span>
              </span>
            ))}
          </p>
        </div>
        <div className='w-full h-1/2 flex items-end justify-between gap-4'>
          <div>
            <div className='overflow-hidden'>
              <p className='text-sm bottom-anim'>Status</p>
            </div>
            <div className='overflow-hidden'>
              <p className='uppercase font-medium bottom-anim'>
                Disponible pour un projet
              </p>
            </div>
          </div>
          <div>
            <div className='overflow-hidden'>
              <p className='about- text-sm bottom-anim'>Contact</p>
            </div>
            <div className='flex gap-2 overflow-hidden'>
              <p className='uppercase font-medium bottom-anim'>
                Envoyez un{' '}
                <a
                  href='mailto:augustin.briolon@gmail.com'
                  className='underline'
                >
                  mail
                </a>{' '}
                ou prenez{' '}
                <a
                  href='https://calendly.com/augustin-briolon/presentation-de-votre-projet'
                  target='_blank'
                  className='underline'
                >
                  rendez-vous
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
