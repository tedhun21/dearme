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
import { LinearProgress } from "@mui/material";

export default function Me() {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex min-w-[360px] flex-col bg-default-200 shadow-lg sm:w-[360px] md:w-[480px] lg:w-[600px]">
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
              value={(5 / 5) * 100}
              color="inherit"
            />

            <span className="mx-1 whitespace-nowrap text-xs font-semibold text-default-600">
              3 / 5
            </span>
          </div>
          <div className="relative flex flex-col gap-4">
            <div className="flex justify-between rounded-xl bg-default-100 px-3 py-2">
              <div className="flex gap-3">
                <CheckActiveIcon className="h-5 w-5 fill-current text-default-600" />
                <span className="text-semibold text-sm text-default-700">
                  스터디
                </span>
              </div>
              <ThreeDots className="h-5 w-5 fill-current text-default-600" />
            </div>
            <div className="absolute mx-5 my-9 h-4 w-1 bg-default-400"></div>
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
          <div>
            <div className="font-semibold text-default-700">목표</div>
            <div className="flex flex-col gap-3 rounded-xl bg-default-100 px-4 py-3">
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <span className="text-2xs font-bold text-red-600 dark:bg-red-300">
                    New
                  </span>
                  <div className="font-bold">
                    &quot;새로운 시작, 일기 앱 개발의 완료&quot;
                  </div>
                  <div className="text-2xs">
                    목표 날짜: 12월 25일, 2023 (월)
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <span className="rounded-lg border-2 border-default-700 px-2 font-semibold">
                    -21
                  </span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <div className="font-bold">&quot;취업하자&quot;</div>
                  <div className="text-2xs">목표 날짜: 1월 1일, 2024 (월)</div>
                </div>
                <div className="flex items-center justify-center">
                  <span className="rounded-lg border-2 border-default-700 px-2 font-semibold">
                    -28
                  </span>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
