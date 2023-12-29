type IconProps = {
  className?: string;
};

export default function EditRemember({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M7 0C3.129 0 0 3.129 0 7s3.129 7 7 7 7-3.129 7-7-3.129-7-7-7Zm2.17 3.549a.41.41 0 0 1 .28.112l.889.889a.369.369 0 0 1 0 .546l-.7.7-1.435-1.435.7-.7a.355.355 0 0 1 .266-.112ZM7.791 4.767l1.442 1.442-4.242 4.242H3.549V9.009l4.242-4.242Z" />{" "}
    </svg>
  );
}
