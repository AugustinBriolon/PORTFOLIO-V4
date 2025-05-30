import { TypeProject } from "@/data/types";
import { useAppContext } from "@/utils/contexts";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import HeaderButton from "./HeaderButton";

export default function Header({ projects, playgrounds }: { projects: TypeProject[]; playgrounds: TypeProject[] }) {
  const path = usePathname();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const indicatorPlaygroundRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleDarkMode } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const isProjectPage = path?.split("/").pop() === "projets";
  const isPlaygroundPage = path?.split("/").pop() === "playgrounds";
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleMenuBurger = () => {
    const menuTl = gsap.timeline();
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      menuTl.to(".menu-burger", {
        right: "0",
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      menuTl.to(".menu-burger", {
        right: "-100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  };

  useGSAP(() => {
    gsap.from(".text-header-anim", {
      y: 25,
      opacity: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power1.out",
    });
  }, []);

  useGSAP(() => {
    if (isFirstLoad && !isProjectPage && !isPlaygroundPage) {
      setIsFirstLoad(false);
      return;
    }

    if (indicatorRef.current) {
      if (isProjectPage) {
        gsap.fromTo(
          indicatorRef.current,
          {
            width: "0",
            opacity: 0,
          },
          {
            width: "1.25rem",
            opacity: 1,
            duration: 0.5,
            ease: "elastic.out(1, 0.5)",
          },
        );
      } else {
        gsap.to(indicatorRef.current, {
          width: "0",
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }

    if (indicatorPlaygroundRef.current) {
      if (isPlaygroundPage) { 
        gsap.to(indicatorPlaygroundRef.current, {
          width: "1.25rem",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(indicatorPlaygroundRef.current, {
          width: "0",
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        });
      }
    }

    setIsFirstLoad(false);
  }, [isProjectPage, isPlaygroundPage, isFirstLoad]);

  const handleMouseEnter = (isPlayground: boolean) => {
    const currentRef = isPlayground ? indicatorPlaygroundRef : indicatorRef;
    const isCurrentPage = isPlayground ? isPlaygroundPage : isProjectPage;
  
    if (!isCurrentPage && currentRef.current) {
      gsap.to(currentRef.current, {
        width: "1.25rem",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };
  
  const handleMouseLeave = (isPlayground: boolean) => {
    const currentRef = isPlayground ? indicatorPlaygroundRef : indicatorRef;
    const isCurrentPage = isPlayground ? isPlaygroundPage : isProjectPage;
  
    if (!isCurrentPage && currentRef.current) {
      gsap.to(currentRef.current, {
        width: "0",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <header
      className="md:grid-cols-header relative mx-auto flex h-[10dvh] w-full items-center justify-between gap-4 px-2 text-black md:grid md:w-11/12 md:px-0 dark:text-white"
      role="banner"
    >
      <Link className="z-20 overflow-hidden" href="/">
        <h1 className="text-header-anim text-xl font-bold">AUGUSTIN BRIOLON</h1>
      </Link>

      <div className="z-20 hidden gap-8 md:flex">
        <Link
          ref={linkRef}
          className="relative overflow-hidden"
          href="/projets"
          onMouseEnter={() => handleMouseEnter(false)}
          onMouseLeave={() => handleMouseLeave(false)}
        >
          <p className="text-header-anim text-center font-medium">
            PROJETS <sup>{projects.length}</sup>
          </p>
          <div ref={indicatorRef} className="left-center h-[3px] bg-black dark:bg-white"></div>
        </Link>
        <Link
          ref={linkRef}
          className="relative overflow-hidden"
          href="/playgrounds"
          onMouseEnter={() => handleMouseEnter(true)}
          onMouseLeave={() => handleMouseLeave(true)}
        >
          <p className="text-header-anim text-center font-medium">
            PLAYGROUNDS <sup>{playgrounds.length}</sup>
          </p>
          <div ref={indicatorPlaygroundRef} className="left-center h-[3px] bg-black dark:bg-white"></div>
        </Link>
      </div>

      <div className="flex items-center justify-evenly gap-2">
        <HeaderButton
          alt="Icone de changement de mode"
          icon={isDarkMode ? "/icons/sun.svg" : "/icons/moon.svg"}
          title="Changer de mode"
          onClick={toggleDarkMode}
        />
        <div
          className="text-header-anim relative z-50 grid aspect-square cursor-pointer items-center justify-items-center rounded-full bg-black/5 p-4 md:hidden md:bg-transparent dark:bg-white/20"
          onClick={handleMenuBurger}
        >
          <span
            className={clsx(
              isMenuOpen && "translate-y-[0.45rem] rotate-45",
              "h-[2px] w-5 rounded-full bg-black transition dark:bg-white",
            )}
          ></span>
          <span
            className={clsx(
              isMenuOpen && "scale-0 opacity-0",
              "h-[2px] w-5 rounded-full bg-black transition dark:bg-white",
            )}
          ></span>
          <span
            className={clsx(
              isMenuOpen && "-translate-y-[0.4rem] -rotate-45",
              "h-[2px] w-5 rounded-full bg-black transition dark:bg-white",
            )}
          ></span>
        </div>
        <HeaderButton
          alt="Logo Linkedin"
          href="https://www.linkedin.com/in/augustin-briolon/"
          icon="/icons/linkedin.svg"
          showOnMobile={false}
          title="Linkedin"
        />
        <HeaderButton
          alt="Logo Github"
          href="https://github.com/AugustinBriolon"
          icon="/icons/github.svg"
          showOnMobile={false}
          title="Github"
        />
        <HeaderButton
          alt="Logo Twitter"
          href="https://twitter.com/AugustinBriolon"
          icon="/icons/twitter.svg"
          showOnMobile={false}
          title="Twitter"
        />
      </div>

      <div className="menu-burger absolute top-0 -right-full z-40 flex h-[100dvh] w-screen flex-col items-center justify-center gap-8 bg-white md:hidden dark:bg-black">
        <div className="flex h-full flex-col items-center justify-center gap-4">
          <Link className="group relative overflow-hidden" href="/" onClick={handleMenuBurger}>
            <p className="text-header-anim text-center text-4xl font-bold">HOME</p>
          </Link>
          <Link
            className="group relative overflow-hidden"
            href="/projets"
            onClick={handleMenuBurger}
          >
            <p className="text-header-anim text-center text-4xl font-bold">
              PROJETS
              <sup className="-top-6 text-sm font-light">{projects.length}</sup>
            </p>
          </Link>
          <Link
            href='/playgrounds'
            onClick={handleMenuBurger}
            scroll={false}
            className='overflow-hidden group relative'
          >
            <p className='text-header-anim text-center font-bold text-4xl'>
              PLAYGROUNDS
            </p>
          </Link>
        </div>
        <div className="flex min-h-20 overflow-hidden">
          <HeaderButton
            alt="Logo Linkedin"
            href="https://www.linkedin.com/in/augustin-briolon/"
            icon="/icons/linkedin.svg"
            title="Linkedin"
          />
          <HeaderButton
            alt="Logo Github"
            href="https://github.com/AugustinBriolon"
            icon="/icons/github.svg"
            title="Github"
          />
          <HeaderButton
            alt="Logo Twitter"
            href="https://twitter.com/AugustinBriolon"
            icon="/icons/twitter.svg"
            title="Twitter"
          />
        </div>
      </div>
    </header>
  );
}
