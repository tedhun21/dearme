type IconProps = {
  className?: string;
};

export default function Sad({ className }: IconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      fill="none"
      viewBox="0 0 12 12"
    >
      <path
        stroke="#000"
        stroke-linejoin="round"
        d="M6 11A5 5 0 1 0 6 1a5 5 0 0 0 0 10Z"
      />
      <path
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M7.75 8.75s-.5-1-1.75-1-1.75 1-1.75 1m4.5-4.25L7 4.25m1.25.25v2.25M5 4.25l-1.75.25m.5 0v2.25"
      />
    </svg>
  );
}
