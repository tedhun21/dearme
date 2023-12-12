import Image from "next/image";
import Header from "../ui/header";
import BackArrowIcon from "@/public/me/BackArrowIcon";
import RememberIcon from "@/public/me/RememberIcon";
import PostIcon from "@/public/me/PostIcon";
import FriendIcon from "@/public/me/FriendIcon";
import DownDropdownIcon from "@/public/me/DownDropdownIcon";
import CheckActiveIcon from "@/public/me/CheckActiveIcon";
import ThreeDots from "@/public/me/ThreeDots";
import CheckInactiveIcon from "@/public/me/CheckInactiveIcon";
import LockIcon from "@/public/me/LockIcon";
import { LinearProgress, Stack } from "@mui/material";
import { useState } from "react";

export default function Me() {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex min-w-[360px] max-w-[600px] flex-col bg-default-200">
        <Header />
        <div className="px-6">
          <BackArrowIcon className="h-3 w-3 fill-current text-default-500 hover:text-default-700" />
        </div>
        <section className="px-5 py-3">
          <div className="pb-10">
            <div className="flex items-center gap-1 pb-3">
              <LockIcon className="h-4 w-4" />
              <span className="text-base font-semibold">doe</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex h-12 w-12 justify-center rounded-full bg-gray-300">
                <Image src="/me/user.svg" width={18} height={20} alt="user" />
              </div>
              <div className="group flex flex-col items-center gap-1 text-default-500 hover:text-default-700">
                <RememberIcon className="h-5 w-5 fill-current" />
                <span className="text-xs font-semibold">3 Remember</span>
              </div>
              <div className="group flex flex-col items-center gap-1 text-default-500 hover:text-default-700">
                <PostIcon className="h-5 w-5 fill-current" />
                <span className="text-xs font-semibold">3 Posts</span>
              </div>
              <div className="group flex flex-col items-center gap-1 text-default-500 hover:text-default-700">
                <FriendIcon className="h-5 w-5 fill-current" />
                <span className="text-xs font-semibold">4 Friends</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <DownDropdownIcon className="h-4 w-4 fill-current text-default-500 hover:text-default-700" />
              <span className="text-base font-semibold text-default-700">
                Daily
              </span>
            </div>

            <LinearProgress
              sx={{
                height: "12px",
                borderRadius: "12px",
                width: "100%",
                color: "#143422",
                mx: 2,
              }}
              variant="determinate"
              value={(2 / 5) * 100}
              color="inherit"
            />

            <span className="text-xs font-semibold text-default-600">3/5</span>
          </div>
          <div>
            <div className="flex justify-between rounded-xl bg-default-100 px-3 py-2">
              <div className="flex gap-3">
                <CheckActiveIcon className="h-5 w-5 fill-current text-default-600" />
                <span className="text-semibold text-sm text-default-700">
                  스터디
                </span>
              </div>
              <ThreeDots className="h-5 w-5 fill-current text-default-600" />
            </div>
            <div className="flex justify-between rounded-xl bg-default-100 px-3 py-2">
              <div className="flex gap-3">
                <CheckInactiveIcon className="h-5 w-5" />
                <span className="text-semibold text-sm text-default-600">
                  스터디
                </span>
              </div>
              <ThreeDots className="h-5 w-5 fill-current text-default-600" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
