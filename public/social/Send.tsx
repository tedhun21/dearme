type IconProps = {
  className?: string;
};

export default function Send({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="10" cy="10" r="10" fill="#143422" />
      <circle cx="10" cy="10" r="10" fill="#143422" />
      <path
        d="M5.33337 10.0007L10 5.33398M10 5.33398L14.6667 10.0007M10 5.33398V14.6673"
        stroke="white"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
