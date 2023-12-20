type IconProps = {
  className?: string;
};

export default function EditPost({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill="none"
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M5.112 2.19H2.175A1.175 1.175 0 0 0 1 3.363v6.461A1.175 1.175 0 0 0 2.175 11h6.461a1.175 1.175 0 0 0 1.175-1.175V6.888m-.83-5.53a1.175 1.175 0 1 1 1.66 1.662L5.598 8.063H3.937V6.402L8.98 1.359Z"
      />
    </svg>
  );
}
