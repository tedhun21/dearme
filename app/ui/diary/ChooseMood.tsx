import { useEffect, useState } from "react";

import HappyEmoji from "@/public/diary/HappyEmoji";
import JoyfulEmoji from "@/public/diary/JoyfulEmoji";
import NeutralEmoji from "@/public/diary/NeutralEmoji";
import SadEmoji from "@/public/diary/SadEmoji";
import UnhappyEmoji from "@/public/diary/UnhappyEmoji";

export default function ChooseMood({
  onMoodSelect,
  selectedMood,
  setSelectedMood,
}: any) {
  const handleMoodClick = (mood: string) => {
    // 이미 선택된 기분을 다시 클릭했는지 확인
    if (mood === selectedMood) {
      // 선택을 취소하고 상위 컴포넌트에도 알림
      setSelectedMood(null);
      onMoodSelect(null);
    } else {
      // 새로운 기분을 선택하고 상위 컴포넌트에 알림
      setSelectedMood(mood);
      onMoodSelect(mood);
    }
  };

  return (
    <div className="transition duration-300 ease-in-out group-hover:bg-blue-500">
      <span className="flex items-center justify-between px-20">
        <JoyfulEmoji
          onClick={() => handleMoodClick("JOYFUL")}
          selected={selectedMood === "JOYFUL"}
        />
        <HappyEmoji
          onClick={() => handleMoodClick("HAPPY")}
          selected={selectedMood === "HAPPY"}
        />
        <NeutralEmoji
          onClick={() => handleMoodClick("NEUTRAL")}
          selected={selectedMood === "NEUTRAL"}
        />
        <UnhappyEmoji
          onClick={() => handleMoodClick("UNHAPPY")}
          selected={selectedMood === "UNHAPPY"}
        />
        <SadEmoji
          onClick={() => handleMoodClick("SAD")}
          selected={selectedMood === "SAD"}
        />
      </span>
    </div>
  );
}
