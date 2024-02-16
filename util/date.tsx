import dayjs, { Dayjs } from "dayjs";

// 오늘 날짜 구하기 ("YYYY-MM-DD")
export const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const today = `${year}-${month}-${day}`;

  return today;
};

// 5일까지만 new표현
// difference가 4보다 클시 false, 4이하 일 시 true

export const isNew = ({ date, createdAt }: any) => {
  const today = dayjs();
  const baseDate = date ? dayjs(date) : today;

  return baseDate.diff(dayjs(createdAt), "day") <= 4;
};

// 5일 남았을때 임박(imminent) 표현
export const isImminent = ({ date, endDate }: any) => {
  const baseDate = date ? dayjs(date) : dayjs();
  const daysUntilEndDate = dayjs(endDate).diff(baseDate, "day");

  return daysUntilEndDate >= 0 && daysUntilEndDate <= 5;
};

// 목표 디데이 구하는 함수
export const goalDday = ({ date, endDate }: any): number | string => {
  const today = date ? dayjs(date).startOf("day") : dayjs().startOf("day");
  const targetDate = dayjs(endDate).startOf("day");

  if (targetDate.isAfter(today)) {
    const diff = targetDate.diff(today, "day");
    return `-${diff}`;
  } else if (targetDate.isSame(today, "day")) {
    return "D-Day";
  } else {
    const diff = today.diff(targetDate, "day");
    return `+${diff}`;
  }
};

// 날짜에 해당하는 달이 몇주인지
export const getWeeksInMonth = (date: Dayjs) => {
  const firstDayOfMonth = date.startOf("month");
  const lastDayOfMonth = date.endOf("month");
  const firstDayOfWeek = firstDayOfMonth.startOf("week");
  const lastDayOfWeek = lastDayOfMonth.endOf("week");
  return lastDayOfWeek.diff(firstDayOfWeek, "week") + 1;
};

// month/day, year
export const formatDate = (dateString: any): any => {
  if (!dateString) return "";
  const dateObj = new Date(dateString);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();

  return `${month}/${day}, ${year}`;
};
