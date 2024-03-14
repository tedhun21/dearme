import { useState, useEffect, ChangeEvent, useRef } from "react";

import PhotoIcon from "@/public/diary/PhotoIcon";
import Image from "next/image";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;
export default function UploadPhoto({
  selectedPhotos,
  setSelectedPhotos,
  previewUrls,
  setPreviewUrls,
}: any) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const openFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const filesArray = Array.from(files) as File[];

      setSelectedPhotos((prev: any) => [...prev, ...filesArray]);
      // onPhotosChange(updatedFiles);
    }
  };

  const handleDeleteSelectedImage = (index: number) => {
    const updatedFiles = selectedPhotos.filter(
      (_: any, i: number) => i !== index,
    );

    setSelectedPhotos(updatedFiles);
    // onPhotosChange(updatedFiles);
  };

  // const handleDeleteFetchedImage = (index: number) => {
  //   const updatedFiles = previewUrls.filter((_: any, i: number) => i !== index);
  //   setPreviewUrls(updatedFiles);
  // };

  return (
    <div className="mb-8 mt-2 flex justify-center gap-2 px-6">
      {selectedPhotos.length === 0 && previewUrls.length === 0 ? (
        <button
          type="button"
          onClick={openFileInput}
          className="flex w-full cursor-pointer flex-col items-center rounded-lg bg-default-100 py-16 text-base font-semibold text-gray-400 hover:bg-gray-300"
        >
          <span className="mb-2 flex justify-center">
            <PhotoIcon />
          </span>
          <label>Attach Pictures</label>
          <h3 className="text-xs font-medium text-gray-400">(Max 3pics)</h3>
          <input
            type="file"
            multiple
            accept="image/jpeg, image/png"
            onChange={handleFileChange}
            ref={fileInputRef}
            hidden
          />
        </button>
      ) : selectedPhotos.length > 0 || previewUrls.length > 0 ? (
        <div className="flex w-full flex-wrap justify-center gap-2">
          {selectedPhotos.map((file: File, index: number) => (
            <div key={index} className="relative h-[128px] w-[128px]">
              <Image
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="rounded-md object-cover"
                fill
              />
              <button
                onClick={() => handleDeleteSelectedImage(index)}
                className="absolute right-[-8px] top-[-8px] flex h-5 w-5 items-center justify-center rounded-full bg-red-500 pb-[1.8px] text-white hover:bg-red-600"
              >
                &times;
              </button>
            </div>
          ))}
          {/* {previewUrls.map((image: any) => (
            <div key={image.id}>
              <Image
                src={`${BUCKET_URL}${image.url}`}
                alt={`Preview ${image.id}`}
                className="rounded-md object-cover"
                fill
              />
              <button onClick={() => handleDeleteFetchedImage(image.id)}>
                &times;
              </button>
            </div>
          ))} */}
        </div>
      ) : null}
    </div>
  );
}

// {previewUrls.length > 0 ? (
//   <div className="flex w-full flex-wrap justify-center gap-2">
//     {previewUrls.map((url, index) => (
//       <div key={index} className="relative">
//         <Image
//           src={url}
//           alt={`Preview ${index}`}
//           className="h-32 w-32 rounded-md object-cover"
//         />
//         <button
//           onClick={() => handleDeleteImage(index)}
//           className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 pb-[1.8px] text-white hover:bg-red-600"
//           style={{ cursor: "pointer" }}
//         >
//           &times; {/* 이 부분은 삭제 아이콘을 나타냅니다. */}
//         </button>
//       </div>
//     ))}
//   </div>
// ) : (
//   <label className="flex w-full cursor-pointer flex-col items-center rounded-lg bg-default-100 py-16 py-6 text-base font-semibold text-gray-400 hover:bg-gray-300">
//     <input
//       type="file"
//       multiple
//       accept="image/jpeg, image/png"
//       onChange={handleFileChange}
//       style={{ display: "none" }}
//     />
//     <span className="mb-2 flex justify-center">
//       <PhotoIcon />
//     </span>
//     사진을 등록해주세요
//     <h3 className="text-xs font-medium text-gray-400">(최대 3장)</h3>
//   </label>
// )}
