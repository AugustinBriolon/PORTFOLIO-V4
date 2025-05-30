import { TypeProject } from "@/data/types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";

interface PreloadImagesProps {
  playgrounds: TypeProject[];
}

export const PreloadImages: React.FC<PreloadImagesProps> = ({ playgrounds }) => {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0">
      {playgrounds.map((playground, index) => (
        <Image
          key={`preload-${index}`}
          alt="preload"
          className="invisible absolute top-0 left-0 h-px w-px"
          height={200}
          quality={50}
          src={urlFor(playground.mainImage).toString()}
          width={200}
        />
      ))}
    </div>
  );
};
