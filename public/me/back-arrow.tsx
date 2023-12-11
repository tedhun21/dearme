type IconProps = {
  className?: string;
};

export default function BackArrowIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 8 12"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0.287964 6.00023L6.29796 12.0102L7.71196 10.5962L3.11196 5.99623L7.71196 1.39623L6.29796 -0.00976562L0.287964 6.00023Z" />
    </svg>
  );
}
