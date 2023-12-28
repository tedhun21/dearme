/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

// TODO: 요일 넣기
// TODO: select 태그 위치 수정
// TODO: 이미지 코너
// TODO: 버튼 넣기

import "../../globals.css";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { Divider } from "@mui/material";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import IconButton from "@mui/material/IconButton";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

import { EffectCards } from "swiper/modules";
import "swiper/css";
import "swiper/css/scrollbar";
import "swiper/css/effect-cards";

import Select from "@mui/material/Select";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuItem from "@mui/material/MenuItem";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import WeatherCloudy from "@/public/diary/WeatherCloudy";
import EditRemember from "@/public/remember/EditRemeber";
import DeleteRemember from "@/public/remember/DeleteRemember";
import CloseRemember from "@/public/remember/CloseRemember";

interface RememberItem {
  imageUrl: string[];
  date: string;
  mood: string;
  remember: boolean;
  title: string;
  contents: string;
  tags: string[];
}

export default function Remeber() {
  // 임시 Remember 데이터 (지우기)
  const remembers = [
    {
      imageUrl: [
        "https://i.pinimg.com/564x/67/1d/98/671d983412a9986a516c0a4fa6ce9a3a.jpg",
        "https://i.pinimg.com/564x/19/88/38/198838c26f50c35a234076135ecb5530.jpg",
      ],
      date: "2023.12.01",
      mood: "happy",
      remember: true,
      title: "새로운 시작, 일기 앱 개발의 설렘",
      contents:
        "오늘은 제 생애 첫 일기 앱 개발을 시작했습니다. 이 앱을 통해 사용자들이 자신만의 소중한 추억을 기록하고 공유하는 경험을 제공할 수 있기를 기대하며, 새로운 도전에 설레는 마음을 가지고 있습니다.아침부터 밤 늦게까지 코드를 작성하며, 제가 만든 앱에 첫 번째 일기를 작성하는 그 순간을 상상했습니다. 때로는 알 수 없는 오류에 힘들게 하였지만, 그럴 때마다 새로운 해결책을 찾아내는 것에 큰 즐거움을 느꼈습니다. 이런 과정들이 모여 제 생애 첫 앱을 완성하는 큰 발걸음이 될 것이라고 믿습니다.",
      tags: ["#신나는", "#설레는", "#행복한", "#기대되는", "#의욕적인"],
    },
    {
      imageUrl: [
        "https://i.pinimg.com/564x/05/60/92/056092da8e725ebaccbe27e82d97c90c.jpg",
        "https://i.pinimg.com/564x/16/0b/da/160bdacfa3ee778f336fe4eedc064be2.jpg",
      ],
      date: "2023.12.02",
      mood: "happy",
      remember: true,
      title: "솜방망이",
      contents: "꺄악",
      tags: ["#행복한"],
    },
    {
      imageUrl: [
        "https://i.pinimg.com/564x/50/e0/59/50e05954098ec3407e43465a77c624ba.jpg",
        "https://i.pinimg.com/564x/ef/a2/80/efa280f49c69113127d0feb0fc64ce21.jpg",
      ],
      date: "2023.12.03",
      mood: "happy",
      remember: true,
      title: "☃️",
      contents: "손 시려",
      tags: ["#신나는", "#설레는", "#행복한"],
    },
    {
      imageUrl: [
        "https://i.pinimg.com/564x/4f/cf/d2/4fcfd26c7f5369bf4cc3859a70575ae9.jpg",
      ],
      date: "2023.12.04",
      mood: "sad",
      remember: true,
      title: "오늘 헤어졌다.. 어디로 가야하나요 아저씨",
      contents: "우는 손님이 처음인가요?",
      tags: ["#슬픈", "#우울한", "#불안한"],
    },
    {
      imageUrl: [
        "https://i.pinimg.com/474x/92/84/73/928473e227a5ba121abedf76067ebf06.jpg",
        "https://i.pinimg.com/736x/86/e1/db/86e1db7b95c91ae12343eab37de07231.jpg",
      ],
      date: "2023.12.05",
      mood: "sad",
      remember: true,
      title: "무슨 생각하세요?",
      contents: "play a melancholy song",
      tags: ["#우울한"],
    },
    {
      imageUrl: [
        "https://i.pinimg.com/564x/fa/b8/4f/fab84f31b440c5cb13b41275ed246c61.jpg",
      ],
      date: "2023.12.06",
      mood: "sad",
      remember: true,
      title: "Another aeroplane Another sunny place",
      contents: "But I wanna go home",
      tags: ["#우울한"],
    },

    {
      imageUrl: [
        "https://i.pinimg.com/564x/80/7f/b6/807fb6032b16449d1169c8e7fe1cc1a8.jpg",
      ],
      date: "2023.12.08",
      mood: "joyful",
      remember: true,
      title: "여행을 떠나요",
      contents: "일어나",
      tags: ["#신나는"],
    },
    {
      imageUrl: [],
      date: "2023. 12. 09",
      mood: "joyful",
      remember: true,
      title: "멍",
      contents: "청이",
      tags: ["#신나는"],
    },
    {
      imageUrl: [
        "https://i.pinimg.com/564x/a3/f4/a8/a3f4a8e0e3a59843a60dfa1e94753eec.jpg",
      ],
      date: "2023. 12. 10",
      mood: "joyful",
      remember: true,
      title: "출발!",
      contents: "쏘리질러!",
      tags: ["#신나는"],
    },
  ];

  // 월 -> Month
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

  //   Select
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const handleMonthChange = (e: any) => {
    setSelectedMonth(e.target.value);
  };

  const moods = Array.from(new Set(remembers.map((remember) => remember.mood)));

  //   mood별 렌더링
  const renderMoodItems = moods.map((mood, index) => (
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

  // modal
  const [selectedItem, setSelectedItem] = useState<RememberItem | null>(null);

  const [open, setOpen] = useState(false);

  const handleOpen = (item: any) => {
    setSelectedItem(item);
    console.log(selectedItem);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  // tags
  const [showAllTags, setShowAllTags] = useState(false);

  const handleShowMoreTags = () => {
    setShowAllTags(true);
  };

  return (
    <main className="relative flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-black shadow-lg">
        <header className="flex w-full flex-row justify-between p-5">
          <Link href="/">
            <Image
              src="/remember/whitelogo.png"
              width={77}
              height={20}
              alt="logo"
              quality={80}
              priority
            />
          </Link>
          <div className="flex flex-row  gap-2 p-1">
            <Select
              sx={{
                "&.MuiOutlinedInput-root": {
                  width: "160px",
                  height: "20px",
                  fontSize: "14px",
                  color: "white",
                  fontWeight: "600",
                  paddingLeft: "16px",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  "& .MuiSvgIcon-root": {
                    right: "unset",
                    left: "0px",
                  },
                },
              }}
              IconComponent={({ ...rest }) => (
                <KeyboardArrowDownRoundedIcon
                  {...rest}
                  sx={{
                    width: "20px",
                    height: "24px",
                    fill: "#ffffff",
                    stroke: "white",
                    // strokeWidth: "0.5",
                  }}
                />
              )}
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {/* map */}
              <MenuItem sx={{ fontSize: "14px" }} value="ALL">
                ALL
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value="January">
                January 2023
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value="February">
                February 2023
              </MenuItem>
              <MenuItem sx={{ fontSize: "14px" }} value="March">
                March 2023
              </MenuItem>
            </Select>
          </div>
        </header>

        <div className="mb-5 ml-5 mr-5 mt-5 flex items-baseline">
          <h1 className="text-xl font-semibold text-white">Remember</h1>
          <h3 className="ml-0.5 text-xs font-semibold text-default-300">
            moments
          </h3>
        </div>

        <section className="ml-5 mr-5">{renderMoodItems}</section>

        {/* 일기 카드 선택 -> 모달 */}
        <Modal
          open={open}
          onClose={handleClose}
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
        >
          {/* <Box
            sx={{
              position: "relative",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 440,
              bgcolor: "#000000",
              borderRadius: "16px",
            }}
          > */}
          <Box className="relative left-1/2 top-1/2 w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-[16px] bg-black">
            <div className="absolute right-3 top-3 ">
              <IconButton onClick={handleClose}>
                <CloseRemember fill-current text-white />
              </IconButton>
            </div>

            {/* 일기 이미지 */}
            {selectedItem && (
              <article className="mb-5 mt-5 flex  w-full  flex-col rounded ">
                {/* 이미지 있을 경우에만 (images &&)*/}
                {selectedItem.imageUrl.length !== 0 && (
                  <Swiper
                    pagination={true}
                    modules={[Pagination]}
                    className=" mb-5 w-full object-cover"
                  >
                    {selectedItem.imageUrl.map((image: any, index: any) => (
                      <SwiperSlide
                        key={index}
                        className="flex items-center justify-center "
                      >
                        <img
                          src={image}
                          alt={`Diary Image ${index}`}
                          className="h-[400px] w-full cursor-pointer rounded-t-2xl object-cover"
                        />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                )}

                {/* 날짜 & 제목 & tags */}
                <section className="m-5 ">
                  <h1 className="mb-3  whitespace-pre-wrap text-base font-normal text-white">
                    {selectedItem.date}
                  </h1>
                  <h1 className="mb-3 text-lg font-semibold text-white">
                    {'"' + selectedItem.title + '"'}
                  </h1>
                  {selectedItem.tags
                    .slice(0, showAllTags ? selectedItem.tags.length : 3)
                    .map((tagItem, index) => (
                      <div
                        key={index}
                        className="border-1 mb-2 mr-3 inline-block rounded-full border-default-400 bg-default-300 px-2 py-0.5 text-base font-semibold text-default-800"
                      >
                        {tagItem}
                      </div>
                    ))}
                  {!showAllTags && selectedItem.tags.length > 3 && (
                    <div
                      className="mr-3 mt-1 inline-block cursor-pointer rounded-full border-2 border-default-400 bg-default-300 px-2 py-0.5 text-base font-semibold text-default-800 hover:bg-gray-300 focus:outline-none focus:ring-2"
                      onClick={handleShowMoreTags}
                    >
                      +{selectedItem.tags.length - 3}
                    </div>
                  )}
                </section>

                {/* 일기 내용 */}
                <section className="m-5">
                  <div className="mb-5 text-base font-light text-white">
                    {selectedItem.contents}
                  </div>
                  <div className="mb-5 flex w-full items-center justify-end">
                    <WeatherCloudy className="mr-2 h-5 w-5 fill-current text-white" />
                    <span className="text-sm font-medium text-white">
                      서울 마포구 , 9.2°C
                    </span>
                  </div>
                </section>
              </article>
            )}
          </Box>
        </Modal>
      </div>
    </main>
  );
}
