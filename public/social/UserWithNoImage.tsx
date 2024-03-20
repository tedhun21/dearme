type IconProps = {
  className?: string;
};

export default function UserWithNoImage({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      fill="none"
      viewBox="0 0 40 40"
      className={className}
    >
      <g clipPath="url(#a)">
        <rect width="40" height="40" fill="#D6D2C4" rx="20" />
        <circle cx="20" cy="16" r="7" fill="url(#b)" fillOpacity=".5" />
        <circle cx="20" cy="16" r="7" fill="#F5F3EB" />
        <ellipse
          cx="20"
          cy="35.5"
          fill="url(#c)"
          fillOpacity="0.5"
          rx="13"
          ry="9.5"
        />
        <ellipse cx="20" cy="35.5" fill="#F5F3EB" rx="13" ry="9.5" />
      </g>
      <rect
        width="36"
        height="36"
        x="2"
        y="2"
        stroke="#D6D2C4"
        strokeWidth="4"
        rx="18"
      />
      <defs>
        <pattern
          id="b"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use href="#d" transform="translate(-.167) scale(.00278)" />
        </pattern>
        <pattern
          id="c"
          width="1"
          height="1"
          patternContentUnits="objectBoundingBox"
        >
          <use href="#d" transform="matrix(.00208 0 0 .00285 0 -.013)" />
        </pattern>
        <clipPath id="a">
          <rect width="40" height="40" fill="#fff" rx="20" />
        </clipPath>
      </defs>
    </svg>
  );
}
