type IconProps = {
  className?: string;
};

export default function Report({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        stroke="#EE3030"
        stroke-linejoin="round"
        stroke-width="2"
        fill="none"
        d="M15.222 14.053H4.556V8.158c0-2.79 2.388-5.053 5.333-5.053 2.945 0 5.333 2.263 5.333 5.053v5.895Z"
      />
      <path
        stroke="#EE3030"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M2.778 17H17M1 4.79l1.333.42M5 1l.444 1.263M3.667 3.526 2.333 2.263"
      />
    </svg>
  );
}
