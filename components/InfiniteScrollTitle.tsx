import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface InfiniteScrollTitleProps {
  title: string;
}

const InfiniteScrollTitle = ({ title }: InfiniteScrollTitleProps) => {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    let wheel = 0;
    let total = 0;
    let xTo: ReturnType<typeof gsap.quickTo>;

    const initScroll = () => {
      if (!contentRef.current) return;

      const titleElement = contentRef.current.querySelector(
        ".title-container-anim",
      );
      if (!titleElement) return;

      const half = titleElement.clientWidth;

      const container = contentRef.current;
      const textElements = container.querySelectorAll(".title-container-anim");

      if (textElements.length < 4) {
        for (let i = 0; i < 2; i++) {
          const clone1 = textElements[0].cloneNode(true);
          const clone2 = textElements[1].cloneNode(true);
          container.appendChild(clone1);
          container.appendChild(clone2);
        }
      }

      const wrap = gsap.utils.wrap(-half, 0);

      xTo = gsap.quickTo(contentRef.current, "x", {
        duration: 0.7,
        ease: "none",
        modifiers: {
          x: gsap.utils.unitize(wrap),
        },
      });

      const tick = (_time: number, deltaTime: number) => {
        total -= wheel + deltaTime / 10;
        xTo(total);
      };

      gsap.ticker.add(tick);

      let isWheeling: NodeJS.Timeout;
      const handleWheel = (e: WheelEvent) => {
        wheel = e.deltaY * 0.5;
        clearTimeout(isWheeling);
        isWheeling = setTimeout(() => {
          wheel = 0;
        }, 100);
      };

      window.addEventListener("wheel", handleWheel, { passive: true });
      total = 0.1;

      return () => {
        gsap.ticker.remove(tick);
        window.removeEventListener("wheel", handleWheel);
      };
    };
    document.fonts.ready.then(initScroll);
  }, []);

  return (
    <section className="h-28 w-full relative">
      <div className="bg-black dark:bg-white w-screen h-20 md:h-28 overflow-hidden flex items-center abs-center before:absolute before:top-0 before:left-0 before:h-full before:w-10 before:bg-linear-to-r before:from-black dark:before:from-white before:to-transparent before:content-[''] before:z-10 after:absolute after:top-0 after:right-0 after:h-full after:w-10 after:bg-linear-to-l after:from-black dark:after:from-white after:to-transparent after:content-[''] after:z-10">
        <div
          ref={contentRef}
          className="flex gap-2 whitespace-nowrap will-change-transform"
        >
          <h2 className="title-container-anim text-white dark:text-black text-3xl md:text-5xl text-nowrap uppercase font-bold align-middle">
            <span className="mr-2">{title}</span>
            <span className="italic mr-2">{title}</span>
          </h2>
          <h2 className="title-container-anim text-white dark:text-black text-3xl md:text-5xl text-nowrap uppercase font-bold align-middle">
            <span className="mr-2">{title}</span>
            <span className="italic mr-2">{title}</span>
          </h2>
        </div>
      </div>
    </section>
  );
};

export default InfiniteScrollTitle;
