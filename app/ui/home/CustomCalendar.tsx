"use client";

import { getDiariesForMonth, getMyTodosWithDate } from "@/store/api";
import {
  diaryListState,
  processState,
  settingState,
  todoListState,
} from "@/store/atoms";
import { getToday, getWeeksInMonth } from "@/util/date";
import { Badge, Switch } from "@mui/material";
import {
  DateCalendar,
  DayCalendarSkeleton,
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";

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

export default function CustomCalendar() {
  const [{ isDiary, date }, setSetting] = useRecoilState(settingState);
  const [_, setProcess] = useRecoilState(processState);

  // const [date, setDate] = useState<Dayjs | null>(dayjs(getToday()));
  const [month, setMonth] = useState(dayjs(getToday()).format("YYYY-MM"));

  const [weekOfMonth, setWeekOfMonth] = useState<number | null>(
    getWeeksInMonth(dayjs()),
  );

  const setTodos = useSetRecoilState(todoListState);
  const setDiaries = useSetRecoilState(diaryListState);

  // 월별 todo 불러오기
  const {
    isSuccess: isSuccessForMonthTodos,
    data: todosForMonth,
    refetch: refetchTodosForMonth,
    isRefetching: isTodosForMonthRefetching,
  } = useQuery({
    queryKey: ["getMyTodosWithDateForMonth"],
    queryFn: () => getMyTodosWithDate({ date: month }),
  });

  // 캘린더 버튼 누를때 마다
  const handleMonthChange = (date: Dayjs) => {
    const weeksInMonth = getWeeksInMonth(date);

    // 그 달 몇주인지 업데이트
    setWeekOfMonth(weeksInMonth);

    setSetting((prev: any) => ({ ...prev, date: date }));
    setMonth(dayjs(date).format("YYYY-MM"));
  };

  // Todo or Diary
  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSetting((prev) => ({ ...prev, isDiary: e.target.checked }));
  };

  // 월별 Diary 불러오기
  const {
    isSuccess: isSuccessForMonthDiaries,
    data: diariesForMonth,
    refetch: refetchDiariesForMonth,
    isRefetching: isDiariesForMonthRefetching,
  } = useQuery({
    queryKey: ["getDiariesForMonth"],
    queryFn: () => getDiariesForMonth({ date: month }),
  });

  // 기록된 데이터가 있는 날짜 표시
  const [highlightedDays, setHighlightedDays] = useState([]);

  // 데이터가 성공적으로 불러와지면 todos를 업데이트
  useEffect(() => {
    if (isSuccessForMonthTodos) {
      setTodos(
        todosForMonth.filter(
          (todo: any) => todo.date === dayjs(date).format("YYYY-MM-DD"),
        ),
      );

      setProcess((prev) => ({ ...prev, doReset: true }));
      setProcess((prev) => ({ ...prev, is100: false }));
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
  }, [isSuccessForMonthTodos, isTodosForMonthRefetching]);

  // 월별 diaries
  useEffect(() => {
    if (isSuccessForMonthDiaries && !isDiariesForMonthRefetching && isDiary) {
      const highlighted = diariesForMonth.map(
        (diary: any) => +diary.date.slice(8, 10),
      );
      setHighlightedDays(highlighted);
      setDiaries(diariesForMonth);
    } else if (isDiary) {
      setHighlightedDays([]);
    }
  }, [isSuccessForMonthDiaries, isDiariesForMonthRefetching]);

  useEffect(() => {
    if (!isDiary) {
      refetchTodosForMonth();
    }
    if (isDiary) {
      refetchDiariesForMonth();
    }
  }, [isDiary, month]);

  return (
    <section className="overflow-hidden rounded-t-xl bg-default-300 shadow-md">
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
          onChange={(newValue) => {
            setSetting((prev: any) => ({ ...prev, date: newValue }));
          }}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          dayOfWeekFormatter={(_day, weekday) => `${weekday.format("ddd")}`}
          slots={{ day: ServerDay }}
          slotProps={{ day: { highlightedDays } as any }}
        />
      </LocalizationProvider>
    </section>
  );
}
