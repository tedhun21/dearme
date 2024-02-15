type IconProps = {
  className?: string;
};

export default function Delete({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="none"
      viewBox="0 0 14 14"
    >
      <path
        fill="#143422"
        d="M7 0a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7Zm2.535 8.773a.539.539 0 0 1-.762.762L7 7.76 5.227 9.535a.539.539 0 0 1-.762-.762L6.24 7 4.465 5.227a.539.539 0 0 1 .762-.762L7 6.24l1.773-1.774a.539.539 0 1 1 .762.762L7.76 7l1.774 1.773Z"
      />
    </svg>
  );
}
