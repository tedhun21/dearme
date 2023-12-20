"use client";

import BackArrowIcon from "@/public/me/BackArrowIcon";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-gray-300 active:bg-gray-400"
      type="button"
      onClick={() => router.back()}
    >
      <BackArrowIcon className="h-3 w-3 fill-current text-default-500 hover:text-default-700" />
    </button>
  );
}
