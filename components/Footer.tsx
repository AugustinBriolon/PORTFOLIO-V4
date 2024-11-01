import Link from "next/link";
import Section from "./Section";

export default function Footer() {
  const playHoverSound = () => {
    const audio = new Audio('/sounds/hover.mp3');
    audio.play();
  };

  return (
    <Section className="!min-h-24 justify-end border-t border-black/20 dark:border-white/20 pt-2">
      <footer className="w-full flex flex-col items-center justify-center gap-2">
        <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-2">
          <div>
            <p className="text-black/50 dark:text-white/50">Sitemap</p>
            <ul className="flex flex-wrap gap-1">
              <li>
                <Link href="/" className="uppercase hover:underline" onMouseEnter={playHoverSound}>Index,</Link>
              </li>
              <li>
                <Link href="/projets" className="uppercase hover:underline" onMouseEnter={playHoverSound}>Projets,</Link>
              </li>
              <li>
                <Link href="/contact" className="uppercase hover:underline" onMouseEnter={playHoverSound}>Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-black/50 dark:text-white/50">Connexion</p>
            <ul className="flex flex-wrap gap-1">
              <li>
                <a href="https://www.linkedin.com/in/augustin-briolon/" target="_blank" className="uppercase hover:underline" onMouseEnter={playHoverSound}>Linkedin,</a>
              </li>
              <li>
                <a href="https://www.github.com/AugustinBriolon/" target="_blank" className="uppercase hover:underline" onMouseEnter={playHoverSound}>Github,</a>
              </li>
              <li>
                <a href="https://www.twitter.com/AugustinBriolon/" target="_blank" className="uppercase hover:underline" onMouseEnter={playHoverSound}>Twitter,</a>
              </li>
              <li>
                <a href="mailto:augustin.briolon@gmail.com" className="uppercase hover:underline" onMouseEnter={playHoverSound}>Email,</a>
              </li>
              <li>
                <a href="" className="uppercase hover:underline">Cv</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-gray-400">©2024 - All rights reserved</p>
      </footer>
    </Section>
  )
}