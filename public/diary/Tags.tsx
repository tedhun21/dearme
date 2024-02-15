import React, { useState } from "react";

interface TagsProps {
  text: string;
  selected: boolean;
  onClick: () => void;
}

export default function Tag({ text, selected, onClick }: TagsProps) {
  // 조건부 클래스 적용
  const tagClasses = selected
    ? "mt-1 rounded-full border-2 border-default-800 bg-default-800 px-2 py-0.5 text-base font-semibold text-default-100 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
    : "mt-1 rounded-full border-2 border-default-400 bg-default-300 px-2 py-0.5 text-base font-semibold text-default-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2";

  return (
    <button onClick={onClick} className={tagClasses}>
      {text}
    </button>
  );
}
