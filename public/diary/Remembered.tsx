type IconProps = {
  className?: string;
  onClick?: () => void;
};

export default function Remembered({ className, onClick }: IconProps) {
  return (
    <svg
      className={className}
      onClick={onClick}
      viewBox="0 0 11 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#000"
        d="M1.757 9.333H10.5V1.167C10.5.523 9.977 0 9.333 0H1.75C1.046 0 0 .466 0 1.75v8.167c0 1.284 1.046 1.75 1.75 1.75h8.75V10.5H1.757c-.27-.007-.59-.113-.59-.583a.88.88 0 0 1 .014-.16c.065-.336.34-.418.576-.424Zm1.538-6.042a1.297 1.297 0 0 1 1.823 0l.13.128.13-.128a1.298 1.298 0 0 1 2.106.409 1.242 1.242 0 0 1-.282 1.381L5.249 7 3.295 5.081a1.241 1.241 0 0 1 0-1.79Z"
      />
    </svg>
  );
}
