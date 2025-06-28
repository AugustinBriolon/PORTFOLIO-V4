import { TypeProject } from "@/data/types";
import Link from "next/link";

export default function PlaygroundCard({
  playground,
  onMouseEnter,
  index,
}: {
  playground: TypeProject;
  onMouseEnter: () => void;
  index: number;
}) {
  return (
    <Link
      key={index}
      className="group flex w-full cursor-pointer gap-4 border-t border-black/30 px-6 py-5 transition-colors hover:bg-black/5 dark:border-white/30 dark:hover:bg-white/5"
      href={playground.websiteUrl}
      target="_blank"
      onMouseEnter={onMouseEnter}
    >
      <h2 className="w-full text-xl font-bold md:w-1/4 md:text-2xl">{playground.title}</h2>
      <span className="hidden flex-1 truncate text-black/70 md:block dark:text-white/70">
        {playground.description}
      </span>
      <span className="flex-1 text-right whitespace-nowrap text-black/90 transition-all duration-300 group-hover:visible md:invisible dark:text-white/90">
        See project
      </span>
    </Link>
  );
}
