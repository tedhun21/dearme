type IconProps = {
  className?: string;
};

export default function ShareIcon({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 18 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 2.2V12.4M12.4286 4.6L9 1L5.57143 4.6M1 10.6V16.6C1 17.2365 1.24082 17.847 1.66947 18.2971C2.09812 18.7471 2.67951 19 3.28571 19H14.7143C15.3205 19 15.9019 18.7471 16.3305 18.2971C16.7592 17.847 17 17.2365 17 16.6V10.6"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
