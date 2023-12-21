import React, { useState } from "react";

export default function Companions({ text }) {
  // isSelected 상태를 사용하여 태그의 선택 여부를 관리합니다.
  const [isSelected, setIsSelected] = useState(false);

  // 태그 클릭 핸들러
  const handleTagClick = () => {
    setIsSelected(!isSelected);
  };

  // 조건부 클래스 적용
  const tagClasses = isSelected
    ? "mt-1 rounded-lg border-2 border-default-800 bg-default-800 px-3 py-1 text-base font-semibold text-default-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    : "mt-1 rounded-lg border-2 border-default-400 bg-default-100 px-3 py-1 text-base font-semibold text-default-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2";

  return (
    <button onClick={handleTagClick} className={tagClasses}>
      {text}
    </button>
  );
}
