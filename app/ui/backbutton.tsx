"use client";

import BackArrowIcon from "@/public/me/BackArrowIcon";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();
  return (
    <button type="button" onClick={() => router.back()}>
      <BackArrowIcon className="h-3 w-3 fill-current text-default-500 hover:text-default-700" />
    </button>
  );
}
