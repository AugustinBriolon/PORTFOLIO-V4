import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Image from 'next/image';
import Link from 'next/link';

import { useAppContext } from '@/utils/contexts';
import { useState } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

export default function Header() {
  const path = usePathname();
  const { isDarkMode, setIsDarkMode } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleDarkMode = () => {
    const htmlElement = document.querySelector('html');
    htmlElement?.classList.toggle('dark');

    localStorage.setItem(
      'darkMode',
      htmlElement?.classList.contains('dark') ? 'true' : 'false'
    );
    setIsDarkMode(htmlElement?.classList.contains('dark') ? true : false);
  };

  const tl = gsap.timeline();

  const handleMenuBurger = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      tl.to('.menu-burger', {
        top: '0',
        duration: 0.5,
        ease: 'power2.out',
      });
    } else {
      tl.to('.menu-burger', {
        top: '-1000%',
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
    <header className='h-[10vh] relative w-full max-w-screen-4xl mx-auto flex sm:grid sm:grid-cols-header justify-between items-center gap-4 px-2 md:px-4 text-black dark:text-white'>
      <Link href='/' className='overflow-hidden'>
        <h1 className='text-header-anim text-xl font-bold'>AUGUSTIN BRIOLON</h1>
      </Link>
      <div className='hidden sm:flex gap-4'>
        <Link
          href='/projets'
          scroll={false}
          className='overflow-hidden group relative'
        >
          <p className='text-header-anim text-center font-medium'>
            PROJETS
            <span className='ml-1 text-[8px]'>4</span>
            </p>
          <div
            className={clsx(
              path?.split('/').pop() === 'projets' && '!w-5',
              'abs-center h-[4px] w-0 bg-black dark:bg-white group-hover:w-5 transition-all ease-out duration-500'
            )}
          ></div>
        </Link>
        <Link
          href='/blog'
          scroll={false}
          className='overflow-hidden group relative'
        >
          <p className='text-header-anim text-center font-medium'>BLOG</p>
          <div
            className={clsx(
              path?.split('/').pop() === 'blog' && '!w-5',
              'abs-center h-[4px] w-0 bg-black dark:bg-white group-hover:w-5 transition-all ease-out duration-500'
            )}
          ></div>
        </Link>
      </div>
      <div className='flex items-center justify-evenly gap-2'>
        <div
          className='cursor-pointer block p-4 hover:bg-black/5 dark:hover:bg-white/20 sm:bg-transparent rounded-full aspect-square'
          onClick={handleDarkMode}
        >
          <Image
            src={isDarkMode ? '/icons/sun.svg' : '/icons/moon.svg'}
            alt='Icone de changement de mode'
            className='dark-fill w-5 h-5 select-none text-header-anim'
            width={20}
            height={20}
          />
        </div>
        <div
          className='text-header-anim z-30 cursor-pointer sm:hidden p-4 hover:bg-black/5  dark:hover:bg-white/20 sm:bg-transparent rounded-full aspect-square flex flex-col items-center justify-center gap-1'
          onClick={handleMenuBurger}
        >
          <div className='h-px w-5 bg-black dark:bg-white'></div>
          <div className='h-px w-5 bg-black dark:bg-white'></div>
        </div>
        <a
          href='https://www.linkedin.com/in/augustin-briolon/'
          target='_blank'
          title="Lien vers Linkedin d'Augustin Briolon"
          className='hidden sm:block p-4 hover:bg-black/5 dark:hover:bg-white/20 sm:bg-transparent rounded-full aspect-square cursor-arrow'
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
          className='hidden sm:block p-4 hover:bg-black/5 dark:hover:bg-white/20 sm:bg-transparent rounded-full  aspect-square cursor-arrow'
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
          className='hidden sm:block p-4 hover:bg-black/5 dark:hover:bg-white/20 sm:bg-transparent rounded-full  aspect-square cursor-arrow'
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

      <div className='menu-burger absolute w-full h-screen top-[-1000%] right-0 z-20 bg-white dark:bg-black flex flex-col items-center justify-center gap-8'>
        <div className='flex flex-col items-center justify-center gap-4 h-full'>
          <Link
            href='/projets'
            onClick={handleMenuBurger}
            scroll={false}
            className='overflow-hidden group relative'
          >
            <p className='text-header-anim text-center font-bold text-4xl'>
              PROJETS
            </p>
          </Link>
          <Link
            href='/blog'
            onClick={handleMenuBurger}
            scroll={false}
            className='overflow-hidden group relative'
          >
            <p className='text-header-anim text-center font-bold text-4xl'>
              BLOG
            </p>
          </Link>
        </div>
        <div className='flex overflow-hidden'>
          <a
            href='https://www.linkedin.com/in/augustin-briolon/'
            target='_blank'
            title="Lien vers Linkedin d'Augustin Briolon"
            className='p-4 hover:bg-black/5 dark:hover:bg-white/20 sm:bg-transparent rounded-full aspect-square cursor-arrow'
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
            className='p-4 hover:bg-black/5 dark:hover:bg-white/20 sm:bg-transparent rounded-full  aspect-square cursor-arrow'
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
            className='p-4 hover:bg-black/5 dark:hover:bg-white/20 sm:bg-transparent rounded-full  aspect-square cursor-arrow'
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
