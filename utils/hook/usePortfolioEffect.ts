import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const usePortfolioEffect = () => {
  const [isHovered, setIsHovered] = useState(false);
  const mediaContainerRef = useRef<HTMLDivElement>(null);
  const yToRef = useRef<((value: number) => void) | null>(null);

  useGSAP(() => {
    if (!mediaContainerRef.current) return;

    gsap.set(mediaContainerRef.current, { yPercent: 0 });

    yToRef.current = gsap.quickTo(mediaContainerRef.current, "y", {
      duration: 0.5,
      ease: "power4",
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (yToRef.current) {
      const y = e.clientY - window.scrollY;
      const percent = Math.max(0, Math.min(100, (y / window.innerHeight) * 100));
      yToRef.current(percent);
    }
  };

  const createMediaElement = (imageSrc: string) => {
    if (!mediaContainerRef.current) return;

    const mediaWrapper = document.createElement("div");
    const image = document.createElement("img");

    mediaWrapper.className = "absolute inset-0 overflow-hidden";
    mediaWrapper.style.transform = "translate(0, -100%)";

    image.src = imageSrc;
    image.className = "w-full h-full object-cover absolute inset-0";
    image.style.transform = "translate(0, 90%)";

    mediaWrapper.appendChild(image);
    mediaContainerRef.current.appendChild(mediaWrapper);

    gsap.to([mediaWrapper, image], {
      y: 0,
      duration: 0.6,
      ease: "expo.inOut",
    });

    // Cleanup old elements
    if (mediaContainerRef.current.children.length > 20) {
      mediaContainerRef.current.children[0].remove();
    }
  };

  const clearMedia = () => {
    if (!mediaContainerRef.current) return;
    Array.from(mediaContainerRef.current.children).forEach((el) => el.remove());
  };

  return {
    isHovered,
    setIsHovered,
    mediaContainerRef,
    handleMouseMove,
    createMediaElement,
    clearMedia,
  };
};
