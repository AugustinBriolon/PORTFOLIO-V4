import Link from "next/link";
import Section from "./Section";

export default function Footer() {
  return (
    <Section className="!min-h-24 justify-end mt-12">
      <footer role="contentinfo" className="w-full flex flex-col items-center justify-center gap-2">
        <div className="w-full flex flex-col md:flex-row justify-between md:items-center gap-2">
          <div>
            <p className="text-black/80 dark:text-white/80">Sitemap</p>
            <ul className="flex flex-wrap gap-1">
              <li>
                <Link href="/" className="uppercase font-semibold hover:underline">Index,</Link>
              </li>
              <li>
                <Link href="/projets" className="uppercase font-semibold hover:underline">Projets</Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-black/80 dark:text-white/80">Social</p>
            <ul className="flex flex-wrap gap-1">
              <li>
                <a href="https://www.linkedin.com/in/augustin-briolon/" target="_blank" className="uppercase font-semibold hover:underline">Linkedin,</a>
              </li>
              <li>
                <a href="https://www.github.com/AugustinBriolon/" target="_blank" className="uppercase font-semibold hover:underline">Github,</a>
              </li>
              <li>
                <a href="https://www.twitter.com/AugustinBriolon/" target="_blank" className="uppercase font-semibold hover:underline">Twitter,</a>
              </li>
              <li>
                <a href="mailto:augustin.briolon@gmail.com" className="uppercase font-semibold hover:underline">Email,</a>
              </li>
              <li>
                <a href="/CV.pdf" className="uppercase font-semibold hover:underline">Cv</a>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-black/80 dark:text-white/80">©2024 - All rights reserved</p>
      </footer>
    </Section>
  )
}