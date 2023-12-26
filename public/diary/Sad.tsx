type IconProps = {
  className?: string;
};

export default function Sad({ className }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* <path
        stroke="#000"
        stroke-linejoin="round"
        stroke-width="2.4"
        d="M15 28c7.18 0 13-5.82 13-13S22.18 2 15 2 2 7.82 2 15s5.82 13 13 13Z"
      />
      <path
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2.4"
        d="M19.55 22.151s-1.3-2.6-4.55-2.6-4.55 2.6-4.55 2.6m11.7-11.05-4.55-.65m3.25.65v5.85m-8.45-6.5-4.55.65m1.3 0v5.85"
      /> */}
      <path
        stroke="#000"
        // stroke-linejoin="round"
        stroke-width="2"
        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"
      />
      <path
        stroke="#000"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2.4"
        d="M12.8 14.401s-.8-1.6-2.8-1.6c-2 0-2.8 1.6-2.8 1.6m7.2-6.8-2.8-.4m2 .4v3.6m-5.2-4-2.8.4m.8 0v3.6"
      />
    </svg>
  );
}
