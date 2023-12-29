/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { RememberItem } from "@/app/diary/remember/page";

import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import IconButton from "@mui/material/IconButton";
import { Divider } from "@mui/material";

interface MoodCardsProps {
  remembers: RememberItem[];
  handleOpen: (item: RememberItem) => void;
}
export default function MoodCards({ remembers, handleOpen }: MoodCardsProps) {
  const getDate = (date: any) => {
    const monthEng = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const [year, month, day] = date.split(".");
    const monthIndex = parseInt(month, 10) - 1;
    return {
      year: year,
      month: monthEng[monthIndex],
      day: day,
    };
  };

  const moods = Array.from(new Set(remembers.map((remember) => remember.mood)));

  return moods.map((mood, index) => (
    <div key={index} className="mb-10">
      <h2 className="mb-4 text-base font-semibold text-white">
        {mood.charAt(0).toUpperCase() + mood.slice(1)} __
      </h2>
      {/* 리멤버 카드 컨테이너 */}
      <div className="flex overflow-x-scroll whitespace-nowrap scrollbar-hide">
        {remembers
          .filter((remember) => remember.mood === mood)
          .map((remember, subIndex) => (
            // 리멤버 카드
            <div
              key={subIndex}
              className="group relative mr-5 flex flex-shrink-0"
            >
              <div
                className=" relative h-[300px] w-[240px]  cursor-pointer overflow-hidden rounded-2xl bg-white"
                onClick={() => handleOpen(remember)}
              >
                {remember.imageUrl.length !== 0 ? (
                  <img
                    src={remember.imageUrl[0]}
                    className="h-[300px] w-[240px]  rounded-2xl object-cover group-hover:opacity-50"
                  />
                ) : (
                  <div className="h-[300px] w-[240px] rounded-2xl bg-default-800 group-hover:opacity-95"></div>
                )}
                {/* 호버링 컨테이너 */}
                <div className=" absolute inset-0 z-10 hidden flex-col items-center  justify-center group-hover:flex">
                  {/* date */}
                  <div className="absolute left-0 top-0 m-2 flex items-center">
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-2xl font-semibold text-white">
                        {getDate(remember.date).day}
                      </span>
                      <span className="font-base text-xl text-white">
                        {getDate(remember.date).month}
                      </span>
                    </div>
                  </div>
                  {/* 일기 타이틀 */}
                  <div className="absolute max-w-[240px] whitespace-pre-wrap break-words px-2 text-center text-base font-semibold text-white">
                    {'"' + remember.title + '"'}
                  </div>
                  {/* 연도 & more */}
                  <div className="absolute bottom-5 flex w-[180px] ">
                    <div>
                      <span className=" font-base text-lg font-light text-white">
                        {getDate(remember.date).year}
                      </span>
                      <Divider className=" w-[160px] border-white px-2" />
                    </div>
                    <IconButton aria-label="more" id="long-button">
                      <MoreVertRoundedIcon sx={{ color: "#ffffff" }} />
                    </IconButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  ));
}
