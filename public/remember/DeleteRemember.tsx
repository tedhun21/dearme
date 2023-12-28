type IconProps = {
  className?: string;
};

export default function DeleteRemember({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="#000"
        d="M7 0c3.871 0 7 3.129 7 7s-3.129 7-7 7-7-3.129-7-7 3.129-7 7-7Zm3.5 3.5H8.75l-.7-.7h-2.1l-.7.7H3.5v1.4h7V3.5Zm-5.6 7.7h4.2a.7.7 0 0 0 .7-.7V5.6H4.2v4.9a.7.7 0 0 0 .7.7Z"
      />
    </svg>
  );
}
