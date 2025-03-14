import Image from 'next/image';
import { FC } from 'react';

interface HeaderButtonProps {
  href?: string;
  onClick?: () => void;
  icon: string;
  alt: string;
  title?: string;
  className?: string;
  showOnMobile?: boolean;
}

const HeaderButton: FC<HeaderButtonProps> = ({
  href,
  onClick,
  icon,
  title,
  className = '',
  showOnMobile = true,
}) => {
  const baseClassName = `${
    showOnMobile ? 'block' : 'hidden md:block'
  } p-4 hover:backdrop-blur-sm hover:bg-black/5 dark:hover:bg-white/20 md:bg-transparent rounded-full aspect-square ${className}`;

  const imageProps = {
    src: icon,
    className: 'dark-fill w-5 h-5 select-none text-header-anim',
    width: 20,
    height: 20,
  };

  if (href) {
    return (
      <a
        href={href}
        target='_blank'
        rel='noopener noreferrer'
        title={title}
        className={baseClassName + ' cursor-arrow z-20'}
      >
        <Image alt={`Logo ${title}`} {...imageProps} />
      </a>
    );
  }

  return (
    <button className={baseClassName + 'cursor-pointer z-50'} onClick={onClick}>
      <Image alt={`Logo ${title}`} {...imageProps} />
    </button>
  );
};

export default HeaderButton;
