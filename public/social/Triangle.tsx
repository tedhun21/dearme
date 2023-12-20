type IconProps = {
  className?: string;
};

export default function Triangle({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M4.43301 5.25C4.24056 5.58333 3.75944 5.58333 3.56699 5.25L0.968911 0.75C0.776461 0.416667 1.01702 0 1.40192 0L6.59808 0C6.98298 0 7.22354 0.416667 7.03109 0.75L4.43301 5.25Z" />
    </svg>
  );
}
