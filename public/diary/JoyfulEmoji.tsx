import React, { useState } from "react";

export default function JoyfulEmoji() {
  const [isCheck, setIsCheck] = useState(false);

  const checkHandler = () => {
    setIsCheck(!isCheck);
  };

  return (
    <svg
      onClick={checkHandler}
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="joyful-emoji"
    >
      <style jsx>{`
          .joyful-emoji {
            transition:
              fill 0.2s ease,
              box-shadow: none;
          }
          .joyful-emoji:hover {
            fill: #EDA323; /* 호버 시 색상 변경 */
            box-shadow: 0 0 14px rgba(0, 0, 0, 0.25); /* 그림자 추가 */
            border-radius: 50%; /* 모서리를 둥글게 */
          }
        `}</style>

      <path
        d="M14 21.7996C19.2 21.7996 20.5 16.5996 20.5 16.5996H7.5C7.5 16.5996 8.8 21.7996 14 21.7996Z"
        fill="black"
      />
      <path
        d="M14 0.5C6.55566 0.5 0.5 6.55566 0.5 14C0.5 21.4443 6.55566 27.5 14 27.5C21.4443 27.5 27.5 21.4443 27.5 14C27.5 6.55566 21.4443 0.5 14 0.5ZM14 23.9C8.54184 23.9 4.1 19.4582 4.1 14C4.1 8.54184 8.54184 4.1 14 4.1C19.4582 4.1 23.9 8.54184 23.9 14C23.9 19.4582 19.4582 23.9 14 23.9Z"
        fill="black"
        stroke="white"
      />
      <path
        d="M15.2994 13.9996L17.8994 14.0152C17.915 13.4146 18.1516 12.6996 19.1994 12.6996C20.2472 12.6996 20.4838 13.4146 20.4994 13.9996H23.0994C23.0994 12.4318 22.0607 10.0996 19.1994 10.0996C16.3381 10.0996 15.2994 12.4318 15.2994 13.9996ZM8.79941 12.6996C9.84721 12.6996 10.0838 13.4146 10.0994 13.9996H12.6994C12.6994 12.4318 11.6607 10.0996 8.79941 10.0996C5.93811 10.0996 4.89941 12.4318 4.89941 13.9996L7.49941 14.0152C7.51501 13.4146 7.75161 12.6996 8.79941 12.6996Z"
        fill="black"
      />
    </svg>
  );
}
