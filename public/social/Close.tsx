type IconProps = {
  className?: string;
};

export default function Close({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path stroke="#000" d="m1 1 8 8M1 9l8-8" />
    </svg>
  );
}
