"use client";

import { useEffect, useState } from "react";
import Header from "./ui/header";
import dayjs, { Dayjs } from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import {
  LocalizationProvider,
  PickersDay,
  PickersDayProps,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";
import { Badge, Switch } from "@mui/material";
import MeGoal from "./ui/me/MeGoal";
import Footer from "./ui/footer";
import { getToday, getWeeksInMonth } from "@/util/date";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "@/store/api";
import { getCookie } from "@/util/tokenCookie";
import { useRecoilState } from "recoil";
import { meState } from "@/store/atoms";

const access_token = getCookie("access_token");

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
  const [weekOfMonth, setWeekOfMonth] = useState<number | null>();

  const [me, setMe] = useRecoilState(meState);

  const { isSuccess, data: meData } = useQuery({
    queryKey: ["getMe"],
    queryFn: () => getMe({ access_token }),
  });

  const [isTodo, setIsTodo] = useState(true);

  const [isLoading, setIsLoading] = useState(false);
  // 기록된 데이터가 있는 날짜 표시
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15, 25]);

  // Todo or Diary
  const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTodo(e.target.checked);
  };

  // 캘린더 버튼 누를때 마다
  const handleMonthChange = (date: Dayjs) => {
    const weeksInMonth = getWeeksInMonth(date);

    // 그 달 몇주인지 업데이트
    setWeekOfMonth(weeksInMonth);

    // setIsLoading(true);
    setHighlightedDays([]);
    // fetchHighlightDays(date)
  };

  // 첫 마운트될 때 그 달의 몇주인지
  useEffect(() => {
    const weeksInMonth = getWeeksInMonth(dayjs());

    setWeekOfMonth(weeksInMonth);
  }, []);

  useEffect(() => {
    if (isSuccess && meData) {
      setMe(meData);
    }
  }, []);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />
        <div className=" relative mx-5 overflow-hidden rounded-xl bg-default-300 shadow-md">
          <div className="mr-3 mt-3 flex items-center justify-end gap-2">
            <span className="text-sm font-semibold">
              {isTodo ? "할 일" : "일기"}
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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
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
                },
              }}
              views={["month", "day"]}
              loading={isLoading}
              referenceDate={dayjs(getToday())}
              value={date}
              onChange={(newValue) => setDate(newValue)}
              onMonthChange={handleMonthChange}
              renderLoading={() => <DayCalendarSkeleton />}
              dayOfWeekFormatter={(_day, weekday) => `${weekday.format("ddd")}`}
              slots={{ day: ServerDay }}
              slotProps={{ day: { highlightedDays } as any }}
            />
          </LocalizationProvider>
          <MeGoal route="home" />
        </div>
        <Footer />
      </div>
    </main>
  );
}
