import { useEffect, useState } from "react";

import Companions from "@/public/diary/Companions";

export default function ChooseCompanions({
  selectedCompanions,
  setSelectedCompanions,
  onSelectCompanion,
}: any) {
  const companions = ["FAMILY", "LOVER", "FRIEND", "ACQUAINTANCE", "ALONE"];

  const handleCompanionClick = (companion: string) => {
    // 이미 선택된 동반자를 클릭한 경우 선택 해제, 그렇지 않으면 선택
    const newSelectedCompanion =
      selectedCompanions === companion ? null : companion;
    setSelectedCompanions(newSelectedCompanion);
    onSelectCompanion(newSelectedCompanion);
  };

  return (
    <span className="flex flex-wrap gap-2">
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
