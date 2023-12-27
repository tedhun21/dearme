type IconProps = {
  className?: string;
};

export default function RightButton({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 5L13.5 10L8.5 15L7.25 13.75L11 10L7.25 6.25L8.5 5Z"
        fill="#FBFAF2"
      />
    </svg>
  );
}
