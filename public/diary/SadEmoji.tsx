export default function SadEmoji() {
  return (
    <svg
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
}
