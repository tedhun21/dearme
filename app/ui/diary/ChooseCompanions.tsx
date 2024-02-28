import { useEffect, useState } from "react";

import Companions from "@/public/diary/Companions";

export default function ChooseCompanions({
  updatedCompanions,
  onSelectCompanion,
}: {
  onSelectCompanion: (companion: string[]) => void;
  updatedCompanions: string;
}) {
  const [selectedCompanions, setSelectedCompanions] = useState<string | null>(
    null,
  );
  const companions = ["가족", "연인", "친구", "지인", "안만남"];

  // 업데이트된(수정) 동반자가 있을 때
  useEffect(() => {
    if (
      typeof updatedCompanions === "string" &&
      updatedCompanions.trim().length > 0
    ) {
      setSelectedCompanions(updatedCompanions);
    } else {
      setSelectedCompanions(null);
    }
  }, [updatedCompanions]);

  const handleCompanionClick = (companion: string) => {
    // 이미 선택된 동반자를 클릭한 경우 선택 해제, 아니면 선택
    const newSelectedCompanion =
      selectedCompanions === companion ? null : companion;
    setSelectedCompanions(newSelectedCompanion);
    onSelectCompanion(newSelectedCompanion ? [newSelectedCompanion] : []);
  };

  return (
    <span className="mb-8 mt-2 flex flex-wrap gap-2 px-6">
      {companions.map((companion) => (
        <Companions
          key={companion}
          text={companion}
          selected={selectedCompanions === companion}
          onClick={() => handleCompanionClick(companion)}
        />
      ))}
    </span>
  );
}
