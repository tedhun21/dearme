import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import CirclePlus from "@/public/diary/CirclePlus";

export default function CreateDiaryButton({ currentPage }: any) {
  const params = useParams();
  const [formattedDate, setFormattedDate] = useState("");

  // 생성 페이지로 넘어가기 전 params.date 계산
  useEffect(() => {
    if (params.date) {
      const [year, month, day] = params.date
        .split("-")
        .map((num) => parseInt(num, 10));
      const formattedDate = `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")}`;
      setFormattedDate(formattedDate);
    }
  }, [params]);

  const handleClick = () => {
    if (currentPage === "Diary" && params.date) {
      // 이동할 URL 생성
      const newPath = `/${params.date}/diary/create`;
      // 페이지 이동
      window.location.href = newPath;
    }
  };
  return (
    <button
      onClick={() => handleClick()}
      className="relative mx-4 my-4 flex flex-col items-center gap-1 rounded bg-default-100 py-24 shadow-xl hover:bg-gray-300"
    >
      <CirclePlus />
      당신의 소중한 이야기를 기록해주세요:)
    </button>
  );
}
