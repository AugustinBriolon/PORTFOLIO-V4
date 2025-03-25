import { PortableText } from "next-sanity";
import { TypedObject } from "sanity";

const RichText = ({
  value,
  className,
}: {
  value: TypedObject[];
  className?: string;
}) => {
  return (
    <div className={className}>
      <PortableText
        value={value}
        components={{
          block: {
            normal: ({ children }) => <p className="text-pretty">{children}</p>,
          },
        }}
      />
    </div>
  );
};

export default RichText;
