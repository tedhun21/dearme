import CirclePlus from "@/public/diary/CirclePlus";

export default function CreateDiaryButton() {
  return (
    <div className="relative mx-4 my-4 flex flex-col items-center gap-1 rounded bg-default-100 py-24 shadow-xl hover:bg-gray-300">
      <CirclePlus />
      당신의 소중한 이야기를 기록해주세요:)
    </div>
  );
}
