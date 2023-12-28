"use client";

import Footer from "@/app/ui/footer";
import Header from "@/app/ui/header";
import Todo from "@/app/ui/me/Todo";
import UserIcon from "@/public/me/UserIcon";
import PlusIcon from "@/public/todo/PlusIcon";
import XIcon from "@/public/todo/XIcon";
import { Modal } from "@mui/joy";
import { LinearProgress, Switch } from "@mui/material";
import {
  DateCalendar,
  DatePicker,
  LocalizationProvider,
  PickersDay,
  StaticDatePicker,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useParams } from "next/navigation";
import { useState } from "react";

const todos = [
  { id: 1, body: "스터디", checked: true },
  { id: 2, body: "퇴근", checked: false },
  { id: 3, body: "잠자기", checked: true },
  { id: 4, body: "잠자기", checked: true },
  { id: 5, body: "잠자기", checked: true },
  { id: 6, body: "잠자기", checked: true },
  { id: 7, body: "잠자기", checked: true },
];

export default function DailyTodo() {
  const { date: defaultDate } = useParams<{ date: string }>();

  const [selectDate, setSelectDate] = useState<Dayjs | null>(
    dayjs(defaultDate),
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [isPublicTodo, setPublicTodo] = useState(false);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <article className="flex flex-col py-3">
          <section>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-300">
                <UserIcon />
              </div>
              <span className="font-bold">4 Tasks</span>
              <div className="flex w-40 items-center">
                <LinearProgress
                  sx={{
                    height: "18px",
                    width: "100%",
                    borderRadius: "12px",
                  }}
                  value={80}
                  variant="determinate"
                />
              </div>
            </div>
          </section>
          <section>
            <div className="flex justify-center bg-default-300">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  views={["month", "day"]}
                  value={dayjs(selectDate)}
                  onChange={(newValue) => setSelectDate(newValue)}
                  showDaysOutsideCurrentMonth={true}
                  dayOfWeekFormatter={(_day, weekday) =>
                    `${weekday.format("ddd")}`
                  }
                />
              </LocalizationProvider>
            </div>
          </section>
          <section className="relative flex flex-col gap-4 px-5 pb-3">
            {todos.map((todo) => (
              <Todo key={todo.id} todo={todo} />
            ))}
            <div className="absolute mx-5 my-9 h-4 w-1 bg-default-400"></div>
          </section>
        </article>

        <div className="fixed bottom-0 w-full max-w-[600px] cursor-pointer">
          <button
            onClick={() => setModalOpen(true)}
            className="absolute bottom-28 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-default-600 shadow-lg hover:bg-default-800"
          >
            <PlusIcon />
          </button>
        </div>

        <Modal
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
        </Modal>
        <Footer />
      </div>
    </main>
  );
}
