import Link from "next/link";
import Section from "./Section";

export default function Footer() {
  return (
    <Section className="mt-12 min-h-24! justify-end">
      <footer className="flex w-full flex-col items-center justify-center gap-2" role="contentinfo">
        <div className="flex w-full flex-col justify-between gap-2 md:flex-row md:items-center">
          <div>
            <p className="text-black/80 dark:text-white/80">Sitemap</p>
            <ul className="flex flex-wrap gap-1">
              <li>
                <Link className="font-semibold uppercase hover:underline" href="/">
                  Index,
                </Link>
              </li>
              <li>
                <Link className="font-semibold uppercase hover:underline" href="/projets">
                  Projets
                </Link>
              </li>
              <li>
                <Link className="font-semibold uppercase hover:underline" href="/playgrounds">
                  Playgrounds
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-black/80 dark:text-white/80">Social</p>
            <ul className="flex flex-wrap gap-1">
              <li>
                <a
                  className="font-semibold uppercase hover:underline"
                  href="https://cal.com/augustin-briolon/30min"
                  target="_blank"
                >
                  RDV,
                </a>
              </li>
              <li>
                <a
                  className="font-semibold uppercase hover:underline"
                  href="mailto:augustin.briolon@gmail.com"
                >
                  Email,
                </a>
              </li>
              <li>
                <a className="font-semibold uppercase hover:underline" href="/CV.pdf">
                  Cv
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="text-sm text-black/80 dark:text-white/80">©2024 - All rights reserved</p>
      </footer>
    </Section>
  );
}
