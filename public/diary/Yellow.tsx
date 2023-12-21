type IconProps = {
  className?: string;
  text?: string;
};

export default function Yellow({ className, text }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="40" height="40" fill="#EDA323" rx="12" />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="14"
        fontWeight={500}
        fill="black"
      >
        {text}
      </text>
    </svg>
  );
}
