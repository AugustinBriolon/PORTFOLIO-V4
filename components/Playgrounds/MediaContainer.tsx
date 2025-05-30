interface MediaContainerProps {
  isVisible: boolean;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const MediaContainer: React.FC<MediaContainerProps> = ({ isVisible, containerRef }) => {
  return (
    <div
      ref={containerRef}
      className={`pointer-events-none absolute top-0 right-[10%] h-[24vw] w-[24vw] overflow-hidden rounded-lg transition-opacity duration-300 ${isVisible ? "visible opacity-100" : "invisible opacity-0"} `}
    />
  );
};
