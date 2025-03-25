import { TypeProject } from "@/data/types";
import { useAppContext } from "@/utils/contexts";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import gsap from "gsap";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import HeaderButton from "./HeaderButton";

export default function Header({ projects }: { projects: TypeProject[] }) {
  const path = usePathname();
  const indicatorRef = useRef<HTMLDivElement>(null);
  const { isDarkMode, toggleDarkMode } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const isProjectPage = path?.split("/").pop() === "projets";
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
    if (isFirstLoad && !isProjectPage) {
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

    setIsFirstLoad(false);
  }, [isProjectPage, isFirstLoad]);

  const handleMouseEnter = () => {
    if (!isProjectPage && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        width: "1.25rem",
        opacity: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (!isProjectPage && indicatorRef.current) {
      gsap.to(indicatorRef.current, {
        width: "0",
        opacity: 0,
        duration: 0.3,
        ease: "power2.in",
      });
    }
  };

  return (
    <header
      className="h-[10dvh] relative w-full md:w-11/12 mx-auto flex md:grid md:grid-cols-header justify-between items-center gap-4 px-2 md:px-0 text-black dark:text-white"
      role="banner"
    >
      <Link className="overflow-hidden z-20" href="/">
        <h1 className="text-header-anim text-xl font-bold">AUGUSTIN BRIOLON</h1>
      </Link>

      <div className="hidden md:flex gap-8 z-20">
        <Link
          ref={linkRef}
          className="overflow-hidden relative"
          href="/projets"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <p className="text-header-anim text-center font-medium">
            PROJETS <sup>{projects.length}</sup>
          </p>
          <div
            ref={indicatorRef}
            className="left-center h-[3px] bg-black dark:bg-white"
          ></div>
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
          className="text-header-anim relative z-50 cursor-pointer md:hidden p-4 bg-black/5 dark:bg-white/20 md:bg-transparent rounded-full aspect-square grid justify-items-center items-center"
          onClick={handleMenuBurger}
        >
          <span
            className={clsx(
              isMenuOpen && "rotate-45 translate-y-[0.45rem]",
              "h-[2px] w-5 rounded-full bg-black dark:bg-white transition ",
            )}
          ></span>
          <span
            className={clsx(
              isMenuOpen && "scale-0 opacity-0",
              "h-[2px] w-5 rounded-full bg-black dark:bg-white transition",
            )}
          ></span>
          <span
            className={clsx(
              isMenuOpen && "-rotate-45 -translate-y-[0.4rem]",
              "h-[2px] w-5 rounded-full bg-black dark:bg-white transition",
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

      <div className="menu-burger md:hidden absolute w-screen h-[100dvh] -right-full top-0 z-40 bg-white dark:bg-black flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center gap-4 h-full">
          <Link
            className="overflow-hidden group relative"
            href="/"
            onClick={handleMenuBurger}
          >
            <p className="text-header-anim text-center font-bold text-4xl">
              HOME
            </p>
          </Link>
          <Link
            className="overflow-hidden group relative"
            href="/projets"
            onClick={handleMenuBurger}
          >
            <p className="text-header-anim text-center font-bold text-4xl">
              PROJETS
              <sup className="font-light text-sm -top-6">{projects.length}</sup>
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
        <div className="flex overflow-hidden min-h-20">
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
