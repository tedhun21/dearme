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
// 이러면 만든지 5일까지만 new
export const isNew = (date: Dayjs) => {
  const today = dayjs();
  const createdDate = dayjs(date);

  return today.diff(createdDate, "day") <= 4;
};

// 5일 남았을때 임박(imminent) 표현
// endDate를 넣으면 디데이까지 5일 남았을때 표시
export const isImminent = (date: Dayjs) => {
  const today = dayjs();
  const endDate = dayjs(date);

  return today.diff(endDate, "day") >= -4;
};

// 목표 디데이 구하는 함수
export const goalDday = (date: any): number | string => {
  const today = dayjs();
  const targetDate = dayjs(date);

  if (targetDate.isAfter(today)) {
    const diff = targetDate.diff(today, "day");
    return `-${diff + 1}`;
  } else if (targetDate.isSame(today, "day")) {
    return "D-day";
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
