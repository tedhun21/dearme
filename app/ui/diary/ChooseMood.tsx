import { useState } from "react";

import HappyEmoji from "@/public/diary/HappyEmoji";
import JoyfulEmoji from "@/public/diary/JoyfulEmoji";
import NeutralEmoji from "@/public/diary/NeutralEmoji";
import SadEmoji from "@/public/diary/SadEmoji";
import UnhappyEmoji from "@/public/diary/UnhappyEmoji";

export default function ChooseMood() {
  const [selectedMood, setSelectedMood] = useState(null);

  const handleMoodClick = (mood) => {
    setSelectedMood(mood);
  };

  return (
    <span className="flex items-center justify-between px-20">
      <JoyfulEmoji
        onClick={() => handleMoodClick("joyful")}
        selected={selectedMood === "joyful"}
      />
      <HappyEmoji
        onClick={() => handleMoodClick("happy")}
        selected={selectedMood === "happy"}
      />
      <NeutralEmoji
        onClick={() => handleMoodClick("neutral")}
        selected={selectedMood === "neutral"}
      />
      <UnhappyEmoji
        onClick={() => handleMoodClick("unhappy")}
        selected={selectedMood === "unhappy"}
      />
      <SadEmoji
        onClick={() => handleMoodClick("sad")}
        selected={selectedMood === "sad"}
      />
    </span>
  );
}
