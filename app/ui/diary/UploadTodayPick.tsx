import BlackPlus from "@/public/diary/BlackPlus";

export default function UploadTodayPick() {
  return (
    <span className="mb-8 mt-2 flex justify-center gap-2 px-6">
      <button className="w-full rounded-lg border-2 border-dashed border-black bg-default-800 py-24 text-base font-medium text-gray-400 hover:bg-gray-300">
        <span className="mb-2 flex justify-center">
          <BlackPlus />
        </span>
        오늘의 문화생활을
        <h3 className="flex justify-center text-base font-medium text-gray-400">
          기록해봐요!
        </h3>
      </button>
    </span>
  );
}
