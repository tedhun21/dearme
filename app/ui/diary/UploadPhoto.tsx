import { useState, ChangeEvent } from "react";

import PhotoIcon from "@/public/diary/PhotoIcon";

interface UploadPhotoProps {
  onPhotosChange: (photos: File[]) => void;
}

export default function UploadPhoto({ onPhotosChange }) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const updatedFiles = Array.from(files).slice(0, 3); // 최대 3개 파일만 선택 가능
      setSelectedFiles(updatedFiles);
      onPhotosChange(updatedFiles);
    }
  };

  return (
    // <span className="mb-8 mt-2 flex justify-center gap-2 px-6">
    //   <button className="w-full rounded-lg bg-default-100 py-16 py-6 text-base font-semibold text-gray-400 hover:bg-gray-300">
    //     <span className="mb-2 flex justify-center">
    //       <PhotoIcon />
    //     </span>
    //     사진을 등록해주세요
    //     <h3 className="flex justify-center text-xs font-medium text-gray-400">
    //       (최대 3장)
    //     </h3>
    //   </button>
    // </span>
    <div className="mb-8 mt-2 flex justify-center gap-2 px-6">
      <label className="flex w-full cursor-pointer flex-col items-center rounded-lg bg-default-100 py-16 py-6 text-base font-semibold text-gray-400 hover:bg-gray-300">
        <input
          type="file"
          multiple
          accept="image/jpeg, image/png"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <span className="mb-2 flex justify-center">
          <PhotoIcon />
        </span>
        사진을 등록해주세요
        <h3 className="flex justify-center text-xs font-medium text-gray-400">
          (최대 3장)
        </h3>
      </label>
    </div>
  );
}
