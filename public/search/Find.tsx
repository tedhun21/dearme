type IconProps = {
  className?: string;
};

export default function Search({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m15.755 14.394-3.627-3.627a6.7 6.7 0 0 0 1.343-4.032A6.743 6.743 0 0 0 6.735 0 6.743 6.743 0 0 0 0 6.735a6.743 6.743 0 0 0 6.735 6.736 6.7 6.7 0 0 0 4.032-1.343l3.627 3.627a.964.964 0 0 0 1.36-1.361ZM1.925 6.735a4.811 4.811 0 1 1 9.621 0 4.811 4.811 0 0 1-9.622 0Z" />
    </svg>
  );
}
