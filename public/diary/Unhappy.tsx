type IconProps = {
  className?: string;
};

export default function Unhappy({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 16 16"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#000"
        d="M8 0a8 8 0 1 0 8 8 8.01 8.01 0 0 0-8-8Zm0 14.222A6.222 6.222 0 1 1 14.222 8 6.229 6.229 0 0 1 8 14.222ZM4.148 6.52a1.185 1.185 0 1 1 2.37 0 1.185 1.185 0 0 1-2.37 0Zm7.704 0a1.185 1.185 0 1 1-2.371 0 1.185 1.185 0 0 1 2.37 0Zm-.242 4.222a.889.889 0 0 1-1.443 1.037 2.667 2.667 0 0 0-4.334 0A.89.89 0 0 1 4.39 10.74a4.444 4.444 0 0 1 7.22 0Z"
      />
    </svg>
  );
}
