/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React from "react";

interface ImageTagProps {
  imageUrl: string;
  tagText: string;
}
export default function ImageTag({ imageUrl, tagText }: ImageTagProps) {
  return (
    <div className="flex  items-center gap-2 rounded-2xl border border-default-400 bg-default-100 px-2 py-1">
      <img src={imageUrl} alt="Tag image" className="h-5 w-5 rounded-full" />
      <span className="text-xs text-default-700">{tagText}</span>
    </div>
  );
}
