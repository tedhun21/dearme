import React, { useState } from "react";

export default function SadEmoji({ selected, onClick }) {
  // Selected 상태일 때의 SVG path
  const selectedPath = (
    <svg>
      <mask id="mask0_611_1424" maskUnits="userSpaceOnUse">
        <path
          d="M14.5 28C21.9561 28 28 21.9561 28 14.5C28 7.04395 21.9561 1 14.5 1C7.04395 1 1 7.04395 1 14.5C1 21.9561 7.04395 28 14.5 28Z"
          fill="white"
          stroke="white"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M19.2242 21.9234C19.2242 21.9234 17.8742 19.2234 14.4992 19.2234C11.1242 19.2234 9.77422 21.9234 9.77422 21.9234M21.9242 10.4484L17.1992 9.77344M20.5742 10.4484V16.5234M11.7992 9.77344L7.07422 10.4484M8.42422 10.4484V16.5234"
          stroke="black"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </mask>
      <g mask="url(#mask0_611_1424)">
        <path
          d="M-1.69922 -1.69922H30.7008V30.7008H-1.69922V-1.69922Z"
          fill="black"
        />
      </g>
    </svg>
  );

  // 기본 상태의 SVG path
  const defaultPath = (
    <svg>
      <path
        d="M15 28C22.1799 28 28 22.1799 28 15C28 7.8201 22.1799 2 15 2C7.8201 2 2 7.8201 2 15C2 22.1799 7.8201 28 15 28Z"
        stroke="black"
        strokeWidth="2.4"
        strokeLinejoin="round"
      />
      <path
        d="M19.5506 22.1512C19.5506 22.1512 18.2506 19.5512 15.0006 19.5512C11.7506 19.5512 10.4506 22.1512 10.4506 22.1512M22.1506 11.1012L17.6006 10.4512M20.8506 11.1012V16.9512M12.4006 10.4512L7.85059 11.1012M9.15059 11.1012V16.9512"
        stroke="black"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <svg
      onClick={onClick}
      width="28"
      height="28"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="sad-emoji"
    >
      <style jsx>{`
            .sad-emoji {
              transition:
                fill 0.2s ease,
                box-shadow: none;
            }
            .sad-emoji:hover {
              fill: #EDA323; /* 호버 시 색상 변경 */
              box-shadow: 0 0 14px rgba(0, 0, 0, 0.25); /* 그림자 추가 */
              border-radius: 50%; /* 모서리를 둥글게 */
            }
          `}</style>

      {selected ? selectedPath : defaultPath}
    </svg>
  );
}
