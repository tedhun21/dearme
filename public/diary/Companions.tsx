import React from "react";

interface CompanionsProps {
  text: string;
  selected: boolean; // selected 속성 추가
  onClick: () => void; // onClick 타입 정의
}

export default function Companions({
  text,
  selected,
  onClick,
}: CompanionsProps) {
  // 조건부 클래스 적용
  const tagClasses = selected
    ? "mt-1 rounded-lg border-2 border-default-800 bg-default-800 px-3 py-1 text-base font-semibold text-default-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    : "mt-1 rounded-lg border-2 border-default-400 bg-default-100 px-3 py-1 text-base font-semibold text-default-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2";

  return (
    <button type="button" onClick={() => onClick()} className={tagClasses}>
      {text}
    </button>
  );
}
