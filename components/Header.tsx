import { TypeProject } from '@/data/types';
import { useAppContext } from '@/utils/contexts';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import gsap from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import HeaderButton from './HeaderButton';

export default function Header({ projects }: { projects: TypeProject[] }) {
  const path = usePathname();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleDarkMode } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const isProjectPage = path?.split('/').pop() === 'projets';
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMenuBurger = () => {
    const menuTl = gsap.timeline();
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      menuTl.to('.menu-burger', {
        right: '0',
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      menuTl.to('.menu-burger', {
        right: '-100%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  useGSAP(() => {
    gsap.from('.text-header-anim', {
      y: 25,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power1.out',
    });
  }, []);

  useGSAP(() => {
    if (isFirstLoad && !isProjectPage) {
      setIsFirstLoad(false);
      return;
    }

    if (indicatorRef.current) {
      if (isProjectPage) {
        gsap.fromTo(
          indicatorRef.current,
          {
            width: '0',
            opacity: 0,
          },
          {
            width: '1.25rem',
            opacity: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.5)',
          }
        );
      } else {
        gsap.to(indicatorRef.current, {
          width: '0',
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });
      }
    }

    setIsFirstLoad(false);
  }, [isProjectPage, isFirstLoad]);

  const handleMouseEnter = () => {
    if (!isProjectPage && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        width: '1.25rem',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isProjectPage && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        width: '0',
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
      });
    }
  };

  return (
    <header
      role='banner'
      className='h-[10dvh] relative w-full md:w-11/12 mx-auto flex md:grid md:grid-cols-header justify-between items-center gap-4 px-2 md:px-0 text-black dark:text-white'
    >
      <Link href='/' className='overflow-hidden z-20'>
        <h1 className='text-header-anim text-xl font-bold'>AUGUSTIN BRIOLON</h1>
      </Link>

      <div className='hidden md:flex gap-8 z-20'>
        <Link 
          href='/projets' 
          ref={linkRef}
          className='overflow-hidden relative'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className='text-header-anim text-center font-medium'>
            PROJETS <sup>{projects.length}</sup>
          </p>
          <div
            ref={indicatorRef}
            className='left-center h-[3px] bg-black dark:bg-white'
          ></div>
        </Link>
      </div>

      <div className='flex items-center justify-evenly gap-2'>
        <HeaderButton
          icon={isDarkMode ? '/icons/sun.svg' : '/icons/moon.svg'}
          alt='Icone de changement de mode'
          title='Changer de mode'
          onClick={toggleDarkMode}
        />
        <div
          className='text-header-anim relative z-50 cursor-pointer md:hidden p-4 bg-black/5 dark:bg-white/20 md:bg-transparent rounded-full aspect-square grid justify-items-center items-center'
          onClick={handleMenuBurger}
        >
          <span
            className={clsx(
              isMenuOpen && 'rotate-45 translate-y-[0.45rem]',
              'h-[2px] w-5 rounded-full bg-black dark:bg-white transition '
            )}
          ></span>
          <span
            className={clsx(
              isMenuOpen && 'scale-0 opacity-0',
              'h-[2px] w-5 rounded-full bg-black dark:bg-white transition'
            )}
          ></span>
          <span
            className={clsx(
              isMenuOpen && '-rotate-45 -translate-y-[0.4rem]',
              'h-[2px] w-5 rounded-full bg-black dark:bg-white transition'
            )}
          ></span>
        </div>
        <HeaderButton
          href='https://www.linkedin.com/in/augustin-briolon/'
          icon='/icons/linkedin.svg'
          alt='Logo Linkedin'
          title='Linkedin'
          showOnMobile={false}
        />
        <HeaderButton
          href='https://github.com/AugustinBriolon'
          icon='/icons/github.svg'
          alt='Logo Github'
          title='Github'
          showOnMobile={false}
        />
        <HeaderButton
          href='https://twitter.com/AugustinBriolon'
          icon='/icons/twitter.svg'
          alt='Logo Twitter'
          title='Twitter'
          showOnMobile={false}
        />
      </div>

      <div className='menu-burger md:hidden absolute w-screen h-[100dvh] -right-full top-0 z-40 bg-white dark:bg-black flex flex-col items-center justify-center gap-8'>
        <div className='flex flex-col items-center justify-center gap-4 h-full'>
          <Link
            href='/'
            onClick={handleMenuBurger}
            className='overflow-hidden group relative'
          >
            <p className='text-header-anim text-center font-bold text-4xl'>
              HOME
            </p>
          </Link>
          <Link
            href='/projets'
            onClick={handleMenuBurger}
            className='overflow-hidden group relative'
          >
            <p className='text-header-anim text-center font-bold text-4xl'>
              PROJETS
              <sup className='font-light text-sm -top-6'>{projects.length}</sup>
            </p>
          </Link>
          {/* <Link
            href='/playgrounds'
            onClick={handleMenuBurger}
            scroll={false}
            className='overflow-hidden group relative'
          >
            <p className='text-header-anim text-center font-bold text-4xl'>
              PLAYGROUNDS
            </p>
          </Link> */}
        </div>
        <div className='flex overflow-hidden min-h-20'>
          <HeaderButton
            href='https://www.linkedin.com/in/augustin-briolon/'
            icon='/icons/linkedin.svg'
            alt='Logo Linkedin'
            title='Linkedin'
          />
          <HeaderButton
            href='https://github.com/AugustinBriolon'
            icon='/icons/github.svg'
            alt='Logo Github'
            title='Github'
          />
          <HeaderButton
            href='https://twitter.com/AugustinBriolon'
            icon='/icons/twitter.svg'
            alt='Logo Twitter'
            title='Twitter'
          />
        </div>
      </div>
    </header>
  );
}