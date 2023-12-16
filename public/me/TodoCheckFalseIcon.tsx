type IconProps = {
  className?: string;
};

export default function TodoCheckFalseIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="10"
        cy="10"
        r="9"
        fill="white"
        stroke="#857762"
        strokeWidth="2"
      />
    </svg>
  );
}
