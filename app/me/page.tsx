import Header from "../ui/header";
import DownDropdownIcon from "@/public/me/DownDropdownIcon";
import CheckActiveIcon from "@/public/me/CheckActiveIcon";
import ThreeDots from "@/public/me/ThreeDots";
import CheckInactiveIcon from "@/public/me/CheckInactiveIcon";
import { LinearProgress } from "@mui/material";
import BackButton from "../ui/backbutton";
import MeNav from "../ui/me/MeNav";

export default function Me() {
  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <div className="flex items-center px-6">
          <BackButton />
        </div>
        <MeNav />
        <article className="px-5 py-3">
          <section className="flex items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <DownDropdownIcon className="h-4 w-4 fill-current text-default-500 hover:text-default-700" />
              <h1 className="text-base font-semibold text-default-700">
                Daily
              </h1>
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
              value={(3 / 5) * 100}
              color="inherit"
            />

            <span className="mx-1 whitespace-nowrap text-xs font-semibold text-default-600">
              3 / 5
            </span>
          </section>
          <section className="relative flex flex-col gap-4 pb-3">
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
          </section>
          <section>
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
          </section>
        </article>
      </div>
    </main>
  );
}
