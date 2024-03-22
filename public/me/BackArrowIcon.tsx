type IconProps = {
  className?: string;
};

export default function BackArrowIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 39 22"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#EDA323" />
      <path
        d="M10 11L19 2M10 11L19 20M10 11H38.125"
        stroke="black"
        strokeWidth="3"
      />
    </svg>
  );
}
