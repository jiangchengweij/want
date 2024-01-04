import { nextTick } from 'vue';
import { isDef } from '../utils/validator';

export const currentYear = new Date().getFullYear();

export function isValidDate(date: number) {
  return isDef(date) && !isNaN(new Date(date).getTime());
}

export function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function padZero(num: number | string, targetLength = 2): string {
  let str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}

export function times(
  n: number,
  iteratee: (index: number) => string
): string[] {
  let index = -1;
  const result = Array(n < 0 ? 0 : n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

export function getTrueValue(formattedValue: string) {
  if (formattedValue === undefined) {
    formattedValue = '1';
  }
  while (isNaN(parseInt(formattedValue, 10))) {
    formattedValue = formattedValue.slice(1);
  }
  return parseInt(formattedValue, 10);
}

export function getMonthEndDay(year: number, month: number): number {
  return 32 - new Date(year, month - 1, 32).getDate();
}

export const defaultFormatter = (
  type: 'year' | 'month' | 'day' | 'hour' | 'minute',
  value: string
) => value;

export function setNext(fn: () => void) {
  fn();
  return new Promise((resolve) => nextTick(() => resolve(null)));
}

export const ROW_HEIGHT = 64;

export function formatMonthTitle(date: Date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}

export function compareMonth(date1: Date | number, date2: Date | number) {
  if (!(date1 instanceof Date)) {
    date1 = new Date(date1);
  }

  if (!(date2 instanceof Date)) {
    date2 = new Date(date2);
  }

  const year1 = date1.getFullYear();
  const year2 = date2.getFullYear();
  const month1 = date1.getMonth();
  const month2 = date2.getMonth();

  if (year1 === year2) {
    return month1 === month2 ? 0 : month1 > month2 ? 1 : -1;
  }

  return year1 > year2 ? 1 : -1;
}

export function compareDay(day1: Date | number, day2: Date | number) {
  if (!(day1 instanceof Date)) {
    day1 = new Date(day1);
  }

  if (!(day2 instanceof Date)) {
    day2 = new Date(day2);
  }

  const compareMonthResult = compareMonth(day1, day2);

  if (compareMonthResult === 0) {
    const date1 = day1.getDate();
    const date2 = day2.getDate();

    return date1 === date2 ? 0 : date1 > date2 ? 1 : -1;
  }

  return compareMonthResult;
}

export function getDayByOffset(date: Date, offset: number) {
  date = new Date(date);
  date.setDate(date.getDate() + offset);

  return date;
}

export function getPrevDay(date: Date) {
  return getDayByOffset(date, -1);
}

export function getNextDay(date: Date) {
  return getDayByOffset(date, 1);
}

export function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

export function calcDateNum(date: [Date, Date]) {
  const day1 = new Date(date[0]).getTime();
  const day2 = new Date(date[1]).getTime();
  return (day2 - day1) / (1000 * 60 * 60 * 24) + 1;
}

export function copyDates(dates: Date | Date[] | number[] | number) {
  if (Array.isArray(dates)) {
    return dates.map((date) => {
      if (date === null) {
        return date;
      }

      return new Date(date);
    });
  }

  return new Date(dates);
}

export function getMonths(minDate: number, maxDate: number) {
  const months: number[] = [];
  const cursor = new Date(minDate);

  cursor.setDate(1);

  do {
    months.push(cursor.getTime());
    cursor.setMonth(cursor.getMonth() + 1);
  } while (compareMonth(cursor, maxDate) !== 1);

  return months;
}

export const initialMinDate = getToday().getTime();

export const initialMaxDate = (() => {
  const now = getToday();
  return new Date(
    now.getFullYear(),
    now.getMonth() + 6,
    now.getDate()
  ).getTime();
})();

export const getTime = (date: Date | number) =>
  date instanceof Date ? date.getTime() : date;

export interface Day {
  date: Date;
  type: string;
  text: number;
  bottomInfo?: string;
  className?: string;
  topInfo?: string;
}

export type TimeData = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
};

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

export function parseTimeData(time: number): TimeData {
  const days = Math.floor(time / DAY);
  const hours = Math.floor((time % DAY) / HOUR);
  const minutes = Math.floor((time % HOUR) / MINUTE);
  const seconds = Math.floor((time % MINUTE) / SECOND);
  const milliseconds = Math.floor(time % SECOND);

  return {
    days,
    hours,
    minutes,
    seconds,
    milliseconds
  };
}

export function parseFormat(format: string, timeData: TimeData): string {
  const { days } = timeData;
  let { hours, minutes, seconds, milliseconds } = timeData;

  if (format.indexOf('DD') === -1) {
    hours += days * 24;
  } else {
    format = format.replace('DD', padZero(days));
  }

  if (format.indexOf('HH') === -1) {
    minutes += hours * 60;
  } else {
    format = format.replace('HH', padZero(hours));
  }

  if (format.indexOf('mm') === -1) {
    seconds += minutes * 60;
  } else {
    format = format.replace('mm', padZero(minutes));
  }

  if (format.indexOf('ss') === -1) {
    milliseconds += seconds * 1000;
  } else {
    format = format.replace('ss', padZero(seconds));
  }

  return format.replace('SSS', padZero(milliseconds, 3));
}

export function isSameSecond(time1: number, time2: number): boolean {
  return Math.floor(time1 / 1000) === Math.floor(time2 / 1000);
}
