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
import { IDiary, diaryListState, meState, todoListState } from "@/store/atoms";

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
  const [isDiary, setIsDiary] = useState<boolean>(false);
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

  const dayOfDiary = (
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
    setIsDiary(e.target.checked);
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

  // month & isDiary가 변할때마다 월별 todos &refetch
  useEffect(() => {
    if (!isDiary) {
      refetchTodosForMonth();
    }
  }, [month]);

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
  }, [isDiary, isTodosForMonthRefetching]);

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
  }, [isDiary, isDiariesForMonthRefetching]);

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
                <div className="flex flex-col rounded-xl border-2 border-default-300 bg-default-100 p-3 text-xl shadow-xl transition-colors duration-150 hover:border-default-400 hover:bg-default-200">
                  <span className="text-3xl font-semibold text-default-800">
                    Todo & Goal
                  </span>
                  <div className="flex justify-center p-6">
                    {todos.length !== 0 ? (
                      <CircularProgress
                        size="lg"
                        determinate
                        variant="soft"
                        value={value as number}
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
                      <div className="flex flex-col items-center">
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
                    dayOfDiary
                      ? `/${dayjs(date).format("YYYY-MM-DD")}/diary`
                      : `/${dayjs(date).format("YYYY-MM-DD")}/diary/create`
                  }
                >
                  <div className="flex flex-col rounded-xl border-2 border-default-300 bg-default-100 p-3 text-xl shadow-xl transition-colors duration-150 hover:border-default-400 hover:bg-default-200">
                    {dayOfDiary ? (
                      <div className="flex flex-col">
                        <span className="text-3xl font-semibold text-default-800">
                          Diary for {dayjs(date).format("YYYY-MM-DD")}
                        </span>
                        <span>Title: {dayOfDiary.title}</span>
                      </div>
                    ) : (
                      <div>
                        <span className="text-3xl font-semibold text-default-800">
                          Diary
                        </span>
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
