"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { Modal } from "@mui/joy";
import { Button, LinearProgress, Switch } from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";

import UserIcon from "@/public/me/UserIcon";
import PlusIcon from "@/public/todo/PlusIcon";
import XIcon from "@/public/todo/XIcon";
import { useRecoilState, useRecoilValue } from "recoil";
import { meState } from "@/store/atoms";
import Image from "next/image";
import CalendarIcon from "@/public/date/Calendar";
import Footer from "@/app/ui/footer";
import clsx from "clsx";

const BUCKET_URL = process.env.NEXT_PUBLIC_BUCKET_URL;
export default function DailyTodo() {
  const { date } = useParams<{ date: string }>();
  const me = useRecoilValue(meState);

  const [title, setTitle] = useState("Todo");

  const [modalOpen, setModalOpen] = useState(false);
  const [isPublicTodo, setPublicTodo] = useState(false);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-black text-white shadow-lg">
        <article className="flex flex-col gap-4 p-5">
          <section className="flex w-full items-center justify-between">
            <span className="text-xl font-semibold">Hi! {me.nickname}</span>
            <div className="flex">
              <div className="relative rounded-3xl bg-default-800">
                <div
                  className={clsx(
                    "absolute h-[40px] w-[100px] transform rounded-3xl bg-default-400 transition-transform",
                    title === "Todo" ? "translate-x-0" : "translate-x-[100px]",
                  )}
                />
                <Button
                  disableRipple
                  variant="text"
                  sx={{
                    width: "100px",
                    height: "40px",
                    fontWeight: "bold",
                    color: title === "Todo" ? "#143422" : "#ffffff",
                    transition: "all 0.2s 0.1s ease",
                  }}
                  onClick={() => setTitle("Todo")}
                >
                  Todo
                </Button>
                <Button
                  disableRipple
                  variant="text"
                  sx={{
                    width: "100px",
                    height: "40px",
                    fontWeight: "bold",
                    color: title === "Todo" ? "#ffffff" : "#143422",
                    transition: "all 0.2s 0.1s ease",
                  }}
                  onClick={() => setTitle("Goal")}
                >
                  Goal
                </Button>
              </div>
            </div>

            <div className="relative h-12 w-12 overflow-hidden rounded-full">
              <Image
                src={`${BUCKET_URL}${me?.photo.url}`}
                alt="user profile"
                fill
                className="object-cover object-center"
              />
            </div>
          </section>
          <section className="w-full rounded-xl bg-default-800 p-6">
            <div className="flex justify-between">
              <div className="flex gap-1">
                <CalendarIcon className="h-5 w-5 fill-current text-white" />
                <span>23 Thu</span>
              </div>
            </div>

            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
            <div>hi</div>
          </section>
          <section className="w-full rounded-xl bg-default-900 p-6">
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
            <div>hello</div>
          </section>
          <section className="w-full rounded-xl bg-default-400 p-6">
            <div>guten tag</div>
            <div>guten tag</div>
            <div>guten tag</div>
            <div>guten tag</div>
            <div>guten tag</div>
            <div>guten tag</div>
          </section>

          {/* create todo modal */}
          {/* <Modal
          className="flex items-center justify-center"
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <div className="flex h-[400px] w-[300px] flex-col justify-between rounded-2xl bg-default-200 p-6 sm:w-[500px]">
            <div className="flex flex-col gap-7">
              <div className="flex w-full items-center gap-4">
                <input
                  className="w-full rounded-lg border-2 border-default-400 bg-default-100 p-1 font-semibold outline-none focus:border-default-900"
                  placeholder="할 일 제목을 작성해주세요"
                />
                <button
                  onClick={() => setModalOpen(false)}
                  className="rounded-full p-2 hover:bg-default-400"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="h-full w-full">
                <div>{selectDate?.format("MMMM")}</div>
                <textarea
                  className="h-[150px] w-full rounded-lg border-2 border-default-400 bg-default-100 p-2 outline-none focus:border-default-900"
                  placeholder="내용을 적어주세요"
                />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div>공개 여부</div>
                <Switch
                  value={isPublicTodo}
                  onChange={() => setPublicTodo((prev) => !prev)}
                  sx={{
                    /// switch 기본 박스 크기
                    padding: 0,
                    width: "32px",
                    height: "20px",
                    "& .MuiSwitch-switchBase": {
                      padding: 0,
                      margin: "2px",
                      transitionDuration: "300ms",
                      /// 체크될때
                      "&.Mui-checked": {
                        transform: "translateX(12px)",
                        color: "#fff",
                        "& + .MuiSwitch-track": {
                          backgroundColor: "#143422",
                          opacity: 1,
                          border: 0,
                        },
                        "&.Mui-disabled + .MuiSwitch-track": {
                          opacity: 0.5,
                        },
                      },
                    },
                    "& .MuiSwitch-thumb": {
                      boxSizing: "border-box",
                      width: 16,
                      height: 16,
                    },
                    "& .MuiSwitch-track": {
                      borderRadius: 26 / 2,
                      backgroundColor: "#b6b6c0",
                      opacity: 1,
                    },
                  }}
                />
              </div>
              <button className="rounded-lg bg-default-800 px-3 py-2 font-semibold text-white hover:bg-default-900">
                Create Todo
              </button>
            </div>
          </div>
        </Modal> */}
        </article>
        <Footer />
      </div>
    </main>
  );
}
