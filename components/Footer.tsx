import Link from "next/link";
import Section from "./Section";

export default function Footer() {
  return (
    <Section className="!min-h-24 justify-end border-t border-black/20 dark:border-white/20 pt-2">
      <footer className="w-full flex flex-col items-center justify-center gap-2">
        <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-2">
          <div>
            <p className="text-black/50 dark:text-white/50">Sitemap</p>
            <ul className="flex flex-wrap gap-1">
              <li>
                <Link href="/" className="uppercase">Index,</Link>
              </li>
              <li>
                <Link href="/projets" className="uppercase ">Projets,</Link>
              </li>
              <li>
                <Link href="/contact" className="uppercase ">Blog</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-black/50 dark:text-white/50">Connexion</p>
            <ul className="flex flex-wrap gap-1">
              <li>
                <a href="https://www.linkedin.com/in/augustin-briolon/" target="_blank" className="uppercase hover:underline">Linkedin,</a>
              </li>
              <li>
                <a href="https://www.github.com/AugustinBriolon/" target="_blank" className="uppercase hover:underline">Github,</a>
              </li>
              <li>
                <a href="https://www.twitter.com/AugustinBriolon/" target="_blank" className="uppercase hover:underline">Twitter,</a>
              </li>
              <li>
                <a href="mailto:augustin.briolon@gmail.com" className="uppercase hover:underline">Email,</a>
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