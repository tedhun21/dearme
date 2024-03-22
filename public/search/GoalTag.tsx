type IconProps = {
  className?: string;
};

export default function GoalTag({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="20" cy="20" r="20" fill="#fff" />
      <path
        fill="#DED0B6"
        d="m15.246 27 2.54-14.219h1.689L16.925 27h-1.679Zm3.73 0 2.55-14.219h1.689L20.666 27h-1.69Zm5.635-8.574H14.445v-1.582h10.166v1.582Zm-.742 4.57H13.713v-1.582h10.156v1.582Z"
      />{" "}
    </svg>
  );
}
