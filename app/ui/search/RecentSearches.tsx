/* eslint-disable @next/next/no-img-element */
import CloseIcon from "@mui/icons-material/Close";
import GoalTag from "@/public/search/GoalTag";
export default function RecentSearches() {
  return (
    <section className="mt-5 flex w-full  flex-col  rounded-lg border-default-400 bg-default-100 p-5">
      {/* Recent & Clear All */}
      <div className="mb-3 flex w-full justify-between">
        <span className="text-base font-medium">Recent</span>
        {/* TODO 검색 기록 없을 때 -> 버튼 x */}
        <button className="border-none text-base font-medium text-default-400">
          Clear All
        </button>
      </div>

      {/* Recents */}
      {/* 검색 기록 없을 때 */}
      <div className="flex w-full justify-center text-base font-medium text-default-400">
        No recent searches
      </div>

      {/* 유저 검색 */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="https://i.pinimg.com/736x/50/e8/35/50e83569784ddd44fc7c277fa7b2f409.jpg"
            alt="User Image"
            className="h-12  w-12 rounded-full"
          />
          <span className="ml-5 text-base font-semibold text-default-700">
            jack
          </span>
        </div>
        <CloseIcon className="h-5 w-5 text-default-700" />
      </div>
      {/* 목표 검색 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <GoalTag className="h-12 w-12" />
          <span className="ml-5 text-base font-semibold text-default-700">
            #Reading
          </span>
        </div>
        <CloseIcon className="h-5 w-5 text-default-700" />
      </div>
    </section>
  );
}
