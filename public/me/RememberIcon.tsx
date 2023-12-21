type IconProps = {
  className?: string;
  onClick?: () => void;
};

export default function RememberIcon({ className, onClick }: IconProps) {
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
        d="M0 3.5v6.417c0 1.284 1.046 1.75 1.75 1.75h8.75V10.5H1.757c-.27-.007-.59-.113-.59-.583s.32-.577.59-.584H10.5V1.167C10.5.523 9.977 0 9.333 0H1.75C1.046 0 0 .466 0 1.75V3.5Zm1.75-2.333h7.583v7H1.167V1.75c0-.47.32-.576.583-.583Z"
      />
      <path
        fill="#000"
        d="m5.249 7.002 1.954-1.92a1.242 1.242 0 0 0 0-1.79 1.298 1.298 0 0 0-1.824 0l-.13.128-.131-.128a1.297 1.297 0 0 0-2.105.409 1.242 1.242 0 0 0 .282 1.381l1.954 1.92Z"
      />{" "}
    </svg>
  );
}
