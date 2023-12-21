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
import { Badge } from "@mui/material";

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
  // 현재 날짜 .e.g) "2023-12-20"
  const dateString = dayjs().format("YYYY-MM-DD");
  const referenceDate = dayjs(dateString);
  // 클릭된 Date
  const [date, setDate] = useState<Dayjs | null>(referenceDate);
  const [weekOfMonth, setWeekOfMonth] = useState<number | null>();

  const [isLoading, setIsLoading] = useState(false);
  // 기록된 데이터가 있는 날짜 표시
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15, 25]);

  const handleMonthChange = (date: Dayjs) => {
    const firstDayOfMonth = date.startOf("month");
    const lastDayOfMonth = date.endOf("month");
    const firstDayOfWeek = firstDayOfMonth.startOf("week");
    const lastDayOfWeek = lastDayOfMonth.endOf("week");
    const weeksInMonth = lastDayOfWeek.diff(firstDayOfWeek, "week") + 1;
    setWeekOfMonth(weeksInMonth);

    // setIsLoading(true);
    setHighlightedDays([]);
    // fetchHighlightDays(date)
  };

  useEffect(() => {
    const firstDayOfMonth = dayjs().startOf("month");
    const lastDayOfMonth = dayjs().endOf("month");
    const firstDayOfWeek = firstDayOfMonth.startOf("week");
    const lastDayOfWeek = lastDayOfMonth.endOf("week");
    const weeksInMonth = lastDayOfWeek.diff(firstDayOfWeek, "week") + 1;

    setWeekOfMonth(weeksInMonth);

    // console.log(dayjs(lastDayOfMonth).week());
    // console.log(
    //   dayjs(lastDayOfMonth).week() - dayjs(firstDayOfMonth).week() + 1,
    // );
    // setWeekOfMonth(
    //   dayjs(lastDayOfMonth).week() - dayjs(firstDayOfMonth).week() + 1,
    // );
  }, []);

  return (
    <main className="flex min-h-screen justify-center">
      <div className="flex w-full min-w-[360px] max-w-[600px] flex-col bg-default-200 shadow-lg">
        <Header />

        <div className=" relative mx-5 rounded-lg bg-default-300">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              sx={{
                "&.MuiDateCalendar-root": {
                  width: "100%",
                  maxHeight: `${
                    weekOfMonth === 6
                      ? "480px"
                      : weekOfMonth === 5
                        ? "420px"
                        : "360px"
                  }`, // 6줄일때 480 5줄일때 420
                  height: "480px",
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
              referenceDate={dayjs(referenceDate)}
              value={date}
              onChange={(newValue) => setDate(newValue)}
              onMonthChange={handleMonthChange}
              renderLoading={() => <DayCalendarSkeleton />}
              slots={{ day: ServerDay }}
              slotProps={{ day: { highlightedDays } as any }}
            />
          </LocalizationProvider>
        </div>

        <div>안녕하세요</div>
        <div>안녕하세요</div>
        <div>안녕하세요</div>
        <div>안녕하세요</div>
        <div>안녕하세요</div>
        <div>안녕하세요</div>
        <div>안녕하세요</div>
        <div></div>
      </div>
    </main>
  );
}
