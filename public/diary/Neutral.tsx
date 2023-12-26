type IconProps = {
  className?: string;
};

export default function Neutral({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#000"
        stroke="#000"
        stroke-width=".2"
        d="M9 .9A8.1 8.1 0 1 0 17.1 9 8.109 8.109 0 0 0 9 .9Zm0 14.77A6.669 6.669 0 1 1 15.67 9 6.677 6.677 0 0 1 9 15.67Zm3.583-3.703a.716.716 0 0 0-.506-1.22H5.923a.715.715 0 1 0 0 1.43h6.154c.19 0 .372-.075.506-.21ZM5.38 6.893A1.023 1.023 0 1 0 7.081 8.03a1.023 1.023 0 0 0-1.7-1.137Zm7.24 1.137a1.023 1.023 0 1 0-1.702-1.137A1.023 1.023 0 0 0 12.62 8.03Z"
      />
    </svg>
  );
}
