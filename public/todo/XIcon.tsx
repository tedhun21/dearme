type IconProps = {
  className?: string;
};

export default function XIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 1L9 9M1 9L9 1" stroke="black" />
    </svg>
  );
}
