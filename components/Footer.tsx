import Link from "next/link";
import Section from "./Section";

export default function Footer() {
  const playHoverSound = () => {
    const audio = new Audio('/sounds/hover.mp3');
    audio.play();
  };

  return (
    <Section className="!min-h-24 justify-end mt-12">
      <footer className="w-full flex flex-col items-center justify-center gap-2">
        <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-2">
          <div>
            <p className="text-black/50 dark:text-white/50">Sitemap</p>
            <ul className="flex flex-wrap gap-1">
              <li>
                <Link href="/" className="uppercase font-semibold hover:underline" onMouseEnter={playHoverSound}>Index,</Link>
              </li>
              <li>
                <Link href="/projets" className="uppercase font-semibold hover:underline" onMouseEnter={playHoverSound}>Projets,</Link>
              </li>
              <li>
                <Link href="/blog" className="uppercase font-semibold hover:underline" onMouseEnter={playHoverSound}>Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-black/50 dark:text-white/50">Social</p>
            <ul className="flex flex-wrap gap-1">
              <li>
                <a href="https://www.linkedin.com/in/augustin-briolon/" target="_blank" className="uppercase font-semibold hover:underline" onMouseEnter={playHoverSound}>Linkedin,</a>
              </li>
              <li>
                <a href="https://www.github.com/AugustinBriolon/" target="_blank" className="uppercase font-semibold hover:underline" onMouseEnter={playHoverSound}>Github,</a>
              </li>
              <li>
                <a href="https://www.twitter.com/AugustinBriolon/" target="_blank" className="uppercase font-semibold hover:underline" onMouseEnter={playHoverSound}>Twitter,</a>
              </li>
              <li>
                <a href="mailto:augustin.briolon@gmail.com" className="uppercase font-semibold hover:underline" onMouseEnter={playHoverSound}>Email,</a>
              </li>
              <li>
                <a href="" className="uppercase font-semibold hover:underline">Cv</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-black/50">©2024 - All rights reserved</p>
      </footer>
    </Section>
  )
}