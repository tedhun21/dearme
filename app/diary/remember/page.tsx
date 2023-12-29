/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

// TODO: 요일 넣기
// TODO: select 태그 위치 수정
// TODO: 이미지 코너

import "../../globals.css";
import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import MoodCards from "@/app/ui/remember/MoodCards";
import RememberModal from "@/app/ui/remember/RememberModal";

import Select from "@mui/material/Select";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import MenuItem from "@mui/material/MenuItem";

export interface RememberItem {
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
  const remembers: RememberItem[] = [
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

  //   Select
  const [selectedMonth, setSelectedMonth] = useState("ALL");
  const handleMonthChange = (e: any) => {
    setSelectedMonth(e.target.value);
  };

  // modal
  const [selectedItem, setSelectedItem] = useState<RememberItem | null>(null);

  const [open, setOpen] = useState(false);

  const handleOpen = (item: RememberItem): void => {
    setSelectedItem(item);
    console.log(selectedItem);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

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

        {/* Moods 카드 */}
        <section className="ml-5 mr-5">
          <MoodCards remembers={remembers} handleOpen={handleOpen} />
        </section>

        {/* 모달*/}
        <RememberModal
          selectedItem={selectedItem}
          open={open}
          handleClose={handleClose}
        />
      </div>
    </main>
  );
}
