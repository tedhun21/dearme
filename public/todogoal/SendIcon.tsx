type IconProps = {
  className?: string;
};

export default function SendIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 10 10"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.2666 4.99896L4.99994 1.26562M4.99994 1.26562L8.73327 4.99896M4.99994 1.26562V8.73229"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
