import { useState, useEffect, ChangeEvent } from "react";

import PhotoIcon from "@/public/diary/PhotoIcon";

interface UploadPhotoProps {
  onPhotosChange: (photos: File[]) => void;
  updatedPhotos: any;
}

export default function UploadPhoto({
  onPhotosChange,
  updatedPhotos,
}: UploadPhotoProps) {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    if (
      updatedPhotos &&
      updatedPhotos.every((photo) => typeof photo === "string")
    ) {
      // updatedPhotos가 모두 URL 형식의 문자열인 경우, previewUrls에 직접 할당
      setPreviewUrls(updatedPhotos);
    } else if (
      updatedPhotos &&
      updatedPhotos.every((photo) => photo instanceof File)
    ) {
      // updatedPhotos가 모두 File 객체인 경우, createObjectURL을 사용하여 URL 생성
      const newPreviewUrls = updatedPhotos.map((file) =>
        URL.createObjectURL(file),
      );
      setPreviewUrls(newPreviewUrls);

      // 컴포넌트 언마운트 시 생성된 URL 해제
      return () => newPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
    }
  }, [updatedPhotos]);

  useEffect(() => {
    // 선택된 파일이 변경될 때 미리보기 URL 생성
    const newPreviewUrls = selectedFiles.map((file) =>
      URL.createObjectURL(file),
    );
    setPreviewUrls(newPreviewUrls);

    // 컴포넌트 언마운트 시 생성된 URL 해제
    return () => newPreviewUrls.forEach((url) => URL.revokeObjectURL(url));
  }, [selectedFiles]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // 기존 선택된 파일에 새 파일 추가
      const updatedFiles = [...selectedFiles, ...Array.from(files)].slice(0, 3);
      setSelectedFiles(updatedFiles);
      onPhotosChange(updatedFiles);
    }
  };

  const handleDeleteImage = (index: number) => {
    // 특정 인덱스의 이미지 삭제
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updatedFiles);
    onPhotosChange(updatedFiles);
  };

  return (
    <div className="mb-8 mt-2 flex justify-center gap-2 px-6">
      {previewUrls.length > 0 ? (
        <div className="flex w-full flex-wrap justify-center gap-2">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Preview ${index}`}
                className="h-32 w-32 rounded-md object-cover"
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 pb-[1.8px] text-white hover:bg-red-600"
                style={{ cursor: "pointer" }}
              >
                &times; {/* 이 부분은 삭제 아이콘을 나타냅니다. */}
              </button>
            </div>
          ))}
        </div>
      ) : (
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
          <h3 className="text-xs font-medium text-gray-400">(최대 3장)</h3>
        </label>
      )}
    </div>
  );
}
