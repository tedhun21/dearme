/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";

import SelectPhotos from "@/public/social/SelectPhotos";

export default function UploadPostImg({ setImageFile, currentImageUrl }: any) {
  // 이미지 미리보기 (게시물 수정)
  const [previewImage, setPreviewImage] = useState<string | null>(
    currentImageUrl ?? null,
  );

  const [isImageOnServer, setImageOnServer] = useState<boolean>(false);

  const fileInputRef = React.createRef<HTMLInputElement>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleClickUploadArea = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // api
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;

  useEffect(() => {
    if (currentImageUrl) {
      const imageUrl = `${BUCKET_URL}${currentImageUrl}`;
      setPreviewImage(imageUrl);
      setImageOnServer(true);
    } else {
      // TODO default image
      //   setPreviewImage();
      setImageOnServer(false);
    }
  }, [currentImageUrl]);

  return (
    <div
      className="h-100 flex items-center justify-center"
      onClick={handleClickUploadArea}
    >
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={fileInputRef}
        style={{ display: "none" }}
      />

      {previewImage ? (
        <img
          src={previewImage}
          alt="Image selected by the user"
          className="max-h-full max-w-full object-cover"
        />
      ) : (
        <SelectPhotos className="m-10 h-7 w-7 cursor-pointer" />
      )}
    </div>
  );
}
