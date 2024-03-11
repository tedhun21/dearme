type IconProps = {
  className?: string;
};

export default function Film({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="8"
      fill="none"
      viewBox="0 0 12 8"
      className={className}
    >
      <path stroke="#616060" d="M.5 1.2 10.197 4 .5 6.8V1.2Z" />
    </svg>
  );
}
