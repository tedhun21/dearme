"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState } from "recoil";

import dayjs, { Dayjs } from "dayjs";
import { useCountUp } from "use-count-up";

import {
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Badge, Switch } from "@mui/material";

import { CircularProgress } from "@mui/joy";
import Header from "./ui/header";
import MeGoal from "./ui/me/MeGoal";
import Footer from "./ui/footer";
import { getToday, getWeeksInMonth } from "@/util/date";
import { getDiariesForMonth, getMe, getMyTodosWithDate } from "@/store/api";
import {
  IDiary,
  diaryListState,
  meState,
  settingState,
  todoListState,
} from "@/store/atoms";

import WeatherIcons from "./ui/diary/WeatherIcons";
import RememberIcon from "@/public/me/RememberIcon";
import ImageIcon from "@/public/home/ImageIcon";

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
  const [{ isDiary }, setSetting] = useRecoilState(settingState);
  const [date, setDate] = useState<Dayjs | null>(dayjs(getToday()));
  const [month, setMonth] = useState(dayjs(getToday()).format("YYYY-MM"));
  const [weekOfMonth, setWeekOfMonth] = useState<number | null>(
    getWeeksInMonth(dayjs()),
  );
  const [is100, setIs100] = useState(false);

  const [me, setMe] = useRecoilState(meState);
  const [todos, setTodos] = useRecoilState(todoListState);
  const [diaries, setDiaries] = useRecoilState(diaryListState);

  const checkedTodos =
    todos.length > 0 ? todos.filter((todo) => todo.done === true) : [];

  const filteredDiaries = diaries.filter(
    (diary: IDiary) => diary.date === dayjs(date).format("YYYY-MM-DD"),
  );

  const diaryOfDay = (
    filteredDiaries.length > 0 ? filteredDiaries[0] : null
  ) as IDiary | null;

  const { value, reset } = useCountUp({
    isCounting: true,
    duration: 3,
    start: 0,
    end:
      todos.length !== 0
        ? Math.round((checkedTodos.length / todos.length) * 100)
        : 0,

    onUpdate: (data) => {
      if (data === "100") {
        setIs100(true);
      }
    },
  });

  // 내 정보 가져오기
  const { isSuccess: isSuccessForMe, data: meData } = useQuery({
    queryKey: ["getMe"],
    queryFn: () => getMe(),
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

  // 월별 Diary 불러오기
  const {
    isSuccess: isSuccessForMonthDiaries,
    data: diariesForMonth,
    refetch: refectchDiariesForMonth,
    isRefetching: isDiariesForMonthRefetching,
  } = useQuery({
    queryKey: ["getDiariesForMonth"],
    queryFn: () => getDiariesForMonth({ date: getToday() }),
  });

  // 기록된 데이터가 있는 날짜 표시
  const [highlightedDays, setHighlightedDays] = useState([]);

  // Todo or Diary
  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSetting((prev) => ({ ...prev, isDiary: e.target.checked }));
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
  }, [isSuccessForMe]);

  // 데이터가 성공적으로 불러와지면 todos를 업데이트
  useEffect(() => {
    if (isSuccessForMonthTodos) {
      setTodos(
        todosForMonth.filter(
          (todo: any) => todo.date === dayjs(date).format("YYYY-MM-DD"),
        ),
      );
      reset();
      setIs100(false);
    }
  }, [date, isSuccessForMonthTodos]);

  // 월별 todos
  useEffect(() => {
    if (isSuccessForMonthTodos && !isTodosForMonthRefetching && !isDiary) {
      const highlighted = todosForMonth.map(
        (todo: any) => +todo.date.slice(8, 10),
      );

      setHighlightedDays(highlighted);
    } else if (!isDiary) {
      setHighlightedDays([]);
    }
  }, [isDiary, isSuccessForMonthTodos, isTodosForMonthRefetching]);

  // 월별 diaries
  useEffect(() => {
    if (isSuccessForMonthDiaries && isDiary && diariesForMonth) {
      const highlighted = diariesForMonth.map(
        (diary: any) => +diary.date.slice(8, 10),
      );
      setHighlightedDays(highlighted);
      setDiaries(diariesForMonth);
    } else if (isDiary) {
      setHighlightedDays([]);
    }
  }, [isDiary, isSuccessForMonthDiaries, isDiariesForMonthRefetching]);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <article className="mx-5 pb-24">
          <section className="overflow-hidden rounded-xl bg-default-300 shadow-md">
            <div className="mr-3 mt-3 flex items-center justify-end gap-2">
              <span className="text-sm font-semibold">TODO</span>
              <Switch
                checked={isDiary}
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
                        backgroundColor: "#EDA323",
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
                    backgroundColor: "#143422",
                    opacity: 1,
                  },
                }}
              />
              <span className="text-sm font-semibold">DIARY</span>
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
            <MeGoal />
          </section>
          {!isDiary ? (
            <section className="mt-4">
              <Link href={`/${dayjs(date).format("YYYY-MM-DD")}/todogoal`}>
                <div className="group flex flex-col rounded-xl border-2 border-default-300 bg-default-100 p-3 text-xl text-default-800 shadow-xl transition-colors duration-150 hover:border-default-400 hover:bg-default-800">
                  <span className="text-3xl font-semibold group-hover:text-default-100">
                    Todo & Goal
                  </span>
                  <div className="flex justify-center p-6">
                    {todos.length !== 0 ? (
                      <CircularProgress
                        size="lg"
                        determinate
                        variant="soft"
                        value={parseInt(value as string)}
                        color={is100 ? "success" : "primary"}
                        sx={{
                          "--CircularProgress-size": "200px",
                          "--CircularProgress-trackThickness": "20px",
                          "--CircularProgress-progressThickness": "20px",
                        }}
                      >
                        <div>{value}%</div>
                      </CircularProgress>
                    ) : (
                      <div className="flex flex-col items-center text-default-800 group-hover:text-default-100">
                        <span>No Registerd Todo.</span>
                        <span>Click to register Todo & Goal.</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </section>
          ) : (
            isDiary && (
              <section className="mt-4">
                <Link
                  href={
                    diaryOfDay
                      ? `/${dayjs(date).format("YYYY-MM-DD")}/diary`
                      : `/${dayjs(date).format("YYYY-MM-DD")}/diary/create`
                  }
                >
                  <div className="group flex flex-col rounded-xl border-2 border-default-300 bg-default-100 p-3 text-xl shadow-xl transition-colors duration-150 hover:border-default-400 hover:bg-default-900">
                    {diaryOfDay ? (
                      <div className="flex flex-col">
                        <div className="flex justify-between">
                          <span className="text-3xl font-semibold text-default-900 group-hover:text-default-100">
                            Diary
                          </span>
                          <div className="flex gap-1">
                            {diaryOfDay.remember && (
                              <RememberIcon className="h-5 w-5 fill-current" />
                            )}
                            {diaryOfDay.photos?.length > 0 && (
                              <ImageIcon className="h-5 w-5" />
                            )}
                          </div>
                        </div>
                        <div className="flex w-full flex-col justify-center p-5">
                          <div className="flex items-center justify-between gap-5 font-semibold">
                            <div className="flex items-center gap-3">
                              <div className="flex gap-1 text-2xl">
                                <span>{dayjs(date).format("MMMM")}</span>
                                <span>{dayjs(date).format("DD")},</span>
                              </div>
                              <span>{dayjs(date).format("YYYY")}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <WeatherIcons weatherId={diaryOfDay.weatherId} />
                              <span>{diaryOfDay.weather}</span>
                            </div>
                          </div>
                          <div className="flex">
                            <span className="flex justify-center">
                              {diaryOfDay.title}
                            </span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="group flex flex-col">
                        <div>
                          <span className="text-3xl font-semibold text-default-900 group-hover:text-default-100">
                            Diary
                          </span>
                          <div className="flex justify-center">
                            <span className="text-xl">
                              Click to write Diary
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              </section>
            )
          )}
        </article>
        <Footer />
      </div>
    </main>
  );
}
