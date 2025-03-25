import { ReactNode } from "react";

const Section = ({ children, className }: { children: ReactNode; className?: string }) => {
  return (
    <section
      className={
        className +
        " " +
        "mx-auto flex max-h-fit min-h-[90dvh] w-full flex-col items-center px-2 pb-4 text-black md:w-11/12 md:px-0 dark:text-white"
      }
    >
      {children}
    </section>
  );
};

export default Section;
