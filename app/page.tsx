"use client";

import { use, useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import dayjs, { Dayjs } from "dayjs";

import {
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Badge, LinearProgress, Switch } from "@mui/material";

import Header from "./ui/header";
import MeGoal from "./ui/me/MeGoal";
import Footer from "./ui/footer";
import { getToday, getWeeksInMonth } from "@/util/date";
import { getMe, getMyTodosWithDate } from "@/store/api";
import { meState, todoListState } from "@/store/atoms";
import Link from "next/link";

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] },
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🤬" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function Home() {
  const [date, setDate] = useState<Dayjs | null>(dayjs(getToday()));
  const [month, setMonth] = useState(dayjs(getToday()).format("YYYY-MM"));
  const [weekOfMonth, setWeekOfMonth] = useState<number | null>(
    getWeeksInMonth(dayjs()),
  );

  const [me, setMe] = useRecoilState(meState);
  const [todos, setTodos] = useRecoilState(todoListState);

  const checkedTodos = todos.filter((todo) => todo.done === true);

  console.log(checkedTodos);

  // 내 정보 가져오기
  const { isSuccess: isSuccessForMe, data: meData } = useQuery({
    queryKey: ["getMe"],
    queryFn: () => getMe(),
  });

  // 일별 todo 불러오기
  const {
    isSuccess: isSuccessForTodayTodos,
    data: todosForToday,
    refetch: refetchTodosForToday,
    isRefetching: isTodosForTodayRefetching,
  } = useQuery({
    queryKey: ["getMyTodosWithDateForToday"],
    queryFn: () =>
      getMyTodosWithDate({ date: dayjs(date).format("YYYY-MM-DD") }),
  });

  // 월별 todo 불러오기 (불러와서 달력에 표시)
  const {
    isSuccess: isSuccessForMonthTodos,
    data: todosForMonth,
    refetch: refetchTodosForMonth,
    isRefetching: isTodosForMonthRefetching,
  } = useQuery({
    queryKey: ["getMyTodosWithDateForMonth"],
    queryFn: () => getMyTodosWithDate({ date: month }),
  });

  const [isTodo, setIsTodo] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  // 기록된 데이터가 있는 날짜 표시
  const [highlightedDays, setHighlightedDays] = useState([]);

  // Todo or Diary
  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTodo(e.target.checked);
  };

  // 캘린더 버튼 누를때 마다
  const handleMonthChange = (date: Dayjs) => {
    const weeksInMonth = getWeeksInMonth(date);

    // 그 달 몇주인지 업데이트
    setWeekOfMonth(weeksInMonth);

    setDate(date);
    setMonth(dayjs(date).format("YYYY-MM"));
  };

  useEffect(() => {
    if (isSuccessForMe) {
      setMe(meData);
    }
  }, []);

  useEffect(() => {
    // 데이터가 성공적으로 불러와지면 todos를 업데이트
    if (todosForToday) {
      setTodos(todosForToday);
    }
  }, [date]);

  useEffect(() => {
    // 날짜가 바뀌면 일일 todos refetch
    if (!isTodosForTodayRefetching && date) {
      refetchTodosForToday();
    }
  }, [date]);

  // 월별 todos
  useEffect(() => {
    if (!isTodosForMonthRefetching && isSuccessForMonthTodos) {
      const highlighted = todosForMonth.map(
        (todo: any) => +todo.date.slice(8, 10),
      );
      setHighlightedDays(highlighted);
    }
  }, [isSuccessForMonthTodos, todosForMonth]);

  // month가 변할때마다 월별 todos refetch
  useEffect(() => {
    refetchTodosForMonth();
  }, [month]);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <article className="mx-5">
          <section className="overflow-hidden rounded-xl bg-default-300 shadow-md">
            <div className="mr-3 mt-3 flex items-center justify-end gap-2">
              <span className="text-sm font-semibold">
                {isTodo ? "TODO" : "DIARY"}
              </span>
              <Switch
                checked={isTodo}
                onChange={handleTodoChange}
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

            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
              <DateCalendar
                sx={{
                  "&.MuiDateCalendar-root": {
                    width: "100%",
                    maxHeight: "480px", // 6줄일때 480 5줄일때 420
                    height: `${
                      weekOfMonth === 6
                        ? "480px"
                        : weekOfMonth === 5
                          ? "420px"
                          : "360px"
                    }`,
                    "& .MuiPickersCalendarHeader-labelContainer": {
                      fontFamily: "inherit",
                      fontSize: "24px",
                    },
                  },
                  "& .MuiDateCalendar-viewTransitionContainer": {
                    "& .MuiDayCalendar-header": {
                      paddingX: "20px",
                      justifyContent: "space-between",
                    },
                    "& .MuiPickersSlideTransition-root": {
                      overflowX: "unset",
                      "& .MuiDayCalendar-monthContainer": {
                        display: "flex",
                        flexDirection: "column",
                        gap: "26px",
                        "& .MuiDayCalendar-weekContainer": {
                          paddingX: "20px",
                          justifyContent: "space-between",
                        },
                      },
                    },
                    "& .MuiButtonBase-root": {
                      fontFamily: "inherit",
                      fontSize: "20px",
                      "&:hover": {
                        backgroundColor: "#DED0B6",
                      },
                      "&:focus": {
                        backgroundColor: "#505050",
                      },
                    },
                    "& .Mui-selected": {
                      backgroundColor: "#143422",
                    },
                    "& .MuiMonthCalendar-root": {
                      width: "100%",
                    },
                  },
                }}
                views={["month", "day"]}
                loading={isLoading}
                referenceDate={dayjs(getToday())}
                value={date}
                onChange={(newValue) => setDate(newValue)}
                onMonthChange={handleMonthChange}
                renderLoading={() => <DayCalendarSkeleton />}
                dayOfWeekFormatter={(_day, weekday) =>
                  `${weekday.format("ddd")}`
                }
                slots={{ day: ServerDay }}
                slotProps={{ day: { highlightedDays } as any }}
              />
            </LocalizationProvider>
            <MeGoal route="home" />
          </section>
          <section className="mt-4">
            <Link href={`/${dayjs(date).format("YYYY-MM-DD")}/todo`}>
              <div className="flex flex-col gap-4 rounded-xl border-2 border-default-300 bg-default-100 p-3 text-xl transition-colors duration-150 hover:bg-default-400">
                <span className="text-3xl font-semibold">Todo & Goal</span>

                <div>
                  <LinearProgress
                    sx={{
                      height: "6px",
                      borderRadius: "12px",
                      width: "100%",
                      color: "#143422",
                    }}
                    variant="determinate"
                    value={
                      todos && todos.length !== 0
                        ? (checkedTodos?.length / todos.length) * 100
                        : 0
                    }
                    color="inherit"
                  />
                </div>
              </div>
            </Link>
          </section>
        </article>
        <Footer />
      </div>
    </main>
  );
}
