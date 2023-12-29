import PhotoIcon from "@/public/diary/PhotoIcon";

export default function UploadPhoto() {
  return (
    <span className="mb-8 mt-2 flex justify-center gap-2 px-6">
      <button className="w-full rounded-lg bg-default-100 py-16 py-6 text-base font-semibold text-gray-400 hover:bg-gray-300">
        <span className="mb-2 flex justify-center">
          <PhotoIcon />
        </span>
        사진을 등록해주세요
        <h3 className="flex justify-center text-xs font-medium text-gray-400">
          (최대 3장)
        </h3>
      </button>
    </span>
  );
}
