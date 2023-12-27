type IconProps = {
  className?: string;
};

export default function LeftButton({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" transform="rotate(-180 10 10)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.5 15L6.5 10L11.5 5L12.75 6.25L9 10L12.75 13.75L11.5 15Z"
        fill="#FBFAF2"
      />
    </svg>
  );
}
