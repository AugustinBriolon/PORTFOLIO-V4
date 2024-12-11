// composant Section un children

import { ReactNode } from 'react';

const Section = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <section
      className={
        className + ' ' +
        'min-h-[90dvh] max-h-fit mx-auto w-full md:w-11/12 flex flex-col items-center px-2 md:px-0 pb-4 text-black dark:text-white'
      }
    >
      {children}
    </section>
  );
};

export default Section;
