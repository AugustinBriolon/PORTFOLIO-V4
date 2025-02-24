import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import clsx from 'clsx';
import { useAppContext } from '@/utils/contexts';
import HeaderButton from './HeaderButton';

export default function Header() {
  const path = usePathname();

  const { isDarkMode, toggleDarkMode } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tl = gsap.timeline();

  const handleMenuBurger = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      tl.to('.menu-burger', {
        right: '0',
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      tl.to('.menu-burger', {
        right: '-100%',
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  };

  const animateIn = () => {
    gsap.from('.text-header-anim', {
      y: 25,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: 'power1.out',
    });
  };

  useGSAP(() => {
    animateIn();
  }, []);

  return (
    <header
      role='banner'
      className='h-[10dvh] relative w-full md:w-11/12 mx-auto flex md:grid md:grid-cols-header justify-between items-center gap-4 px-2 md:px-0 text-black dark:text-white z-20'
    >
      <Link href='/' className='overflow-hidden'>
        <h1 className='text-header-anim text-xl font-bold'>AUGUSTIN BRIOLON</h1>
      </Link>

      <div className='hidden md:flex gap-8'>
        <Link href='/projets' className='overflow-hidden group relative'>
          <p className='text-header-anim text-center font-medium'>PROJETS</p>
          <div
            className={clsx(
              path?.split('/').pop() === 'projets' && '!w-5',
              'abs-center h-[3px] w-0 bg-black dark:bg-white group-hover:w-5 transition-all ease-out duration-500'
            )}
          ></div>
        </Link>
        {/* <Link
          href='/playgrounds'
          scroll={false}
          className='overflow-hidden group relative'
        >
          <p className='text-header-anim text-center font-medium'>
            PLAYGROUNDS
          </p>
          <div
            className={clsx(
              path?.split('/').pop() === 'playgrounds' && '!w-5',
              'abs-center h-[3px] w-0 bg-black dark:bg-white group-hover:w-5 transition-all ease-out duration-500'
            )}
          ></div>
        </Link> */}
      </div>

      <div className='flex items-center justify-evenly gap-2'>
        <HeaderButton
          icon={isDarkMode ? '/icons/sun.svg' : '/icons/moon.svg'}
          alt='Icone de changement de mode'
          title='Changer de mode'
          onClick={toggleDarkMode}
        />
        <div
          className='text-header-anim relative z-30 cursor-pointer md:hidden p-4 bg-black/5  dark:bg-white/20 md:bg-transparent rounded-full aspect-square flex flex-col items-center justify-center gap-1'
          onClick={handleMenuBurger}
        >
          <div
            className={clsx(
              isMenuOpen ? 'translate-y-1 opacity-0' : '',
              'h-px w-5 bg-black dark:bg-white transition-all'
            )}
          ></div>
          <div className='h-px w-5 bg-black dark:bg-white'></div>
          <div
            className={clsx(
              isMenuOpen ? 'w-px h-4' : 'h-0',
              'abs-center top-1/2 bg-black dark:bg-white transition-all'
            )}
          ></div>
          <div
            className={clsx(
              isMenuOpen ? '-translate-y-1 opacity-0' : '',
              'h-px w-5 bg-black dark:bg-white transition-all'
            )}
          ></div>
        </div>
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

      <div className='menu-burger md:hidden absolute w-screen h-[100dvh] -right-full top-0 z-20 bg-white dark:bg-black flex flex-col items-center justify-center gap-8'>
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
          <a
            href='https://www.linkedin.com/in/augustin-briolon/'
            target='_blank'
            title="Lien vers Linkedin d'Augustin Briolon"
            className='p-4 hover:bg-black/5 dark:hover:bg-white/20 md:bg-transparent rounded-full aspect-square cursor-arrow'
          >
            <Image
              src='/icons/linkedin.svg'
              alt='Logo Linkedin'
              className=' dark-fill w-5 h-5 select-none text-header-anim'
              width={20}
              height={20}
            />
          </a>
          <a
            href='https://github.com/AugustinBriolon'
            target='_blank'
            title="Lien vers Github d'Augustin Briolon"
            className='p-4 hover:bg-black/5 dark:hover:bg-white/20 md:bg-transparent rounded-full  aspect-square cursor-arrow'
          >
            <Image
              src='/icons/github.svg'
              alt='Logo Github'
              className='dark-fill w-5 h-5 select-none text-header-anim'
              width={20}
              height={20}
            />
          </a>
          <a
            href='https://twitter.com/AugustinBriolon'
            target='_blank'
            title="Lien vers Twitter d'Augustin Briolon"
            className='p-4 hover:bg-black/5 dark:hover:bg-white/20 md:bg-transparent rounded-full  aspect-square cursor-arrow'
          >
            <Image
              src='/icons/twitter.svg'
              alt='Logo Twitter'
              className='dark-fill w-5 h-5 select-none text-header-anim'
              width={20}
              height={20}
            />
          </a>
        </div>
      </div>
    </header>
  );
}
