type BackgroundProps = {
  className?: string;
  imageUrl?: string;
};

const Background = ({ className, imageUrl }: BackgroundProps) => {
  const hasImage = Boolean(imageUrl);

  return (
    <svg
      className={className}
      viewBox="0 0 306 212"
      xmlns="http://www.w3.org/2000/svg"
    >
      {hasImage && (
        <defs>
          <pattern
            id="bg-image"
            patternUnits="userSpaceOnUse"
            width="306"
            height="212"
          >
            <image
              href={imageUrl}
              width="306"
              height="212"
              preserveAspectRatio="xMidYMid slice"
            />
          </pattern>
        </defs>
      )}
      <rect
        width="306"
        height="212"
        rx="12"
        fill={hasImage ? "url(#bg-image)" : "currentColor"}
      />
    </svg>
  );
};

export default Background;
