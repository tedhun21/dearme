interface IconProps {
  className?: string;
  color?: string;
}

export default function ImageIcon({ className, color }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13 6H13.01M1 4C1 3.20435 1.31607 2.44129 1.87868 1.87868C2.44129 1.31607 3.20435 1 4 1H16C16.7956 1 17.5587 1.31607 18.1213 1.87868C18.6839 2.44129 19 3.20435 19 4V16C19 16.7956 18.6839 17.5587 18.1213 18.1213C17.5587 18.6839 16.7956 19 16 19H4C3.20435 19 2.44129 18.6839 1.87868 18.1213C1.31607 17.5587 1 16.7956 1 16V4Z"
        stroke={color || "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 13.9998L6 8.99983C6.928 8.10683 8.072 8.10683 9 8.99983L14 13.9998"
        stroke={color || "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 11.9998L13 10.9998C13.928 10.1068 15.072 10.1068 16 10.9998L19 13.9998"
        stroke={color || "black"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
