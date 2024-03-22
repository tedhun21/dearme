type IconProps = {
  className?: string;
};

export default function PlusIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 22 22" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 11H1M11 1V21"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
