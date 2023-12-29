import { nextTick } from 'vue';
import { isDef } from '../utils/validator';
export const currentYear = new Date().getFullYear();
export function isValidDate(date) {
  return isDef(date) && !isNaN(new Date(date).getTime());
}
export function range(num, min, max) {
  return Math.min(Math.max(num, min), max);
}
export function padZero(val) {
  return `00${val}`.slice(-2);
}
export function times(n, iteratee) {
  let index = -1;
  const result = Array(n < 0 ? 0 : n);
  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}
export function getTrueValue(formattedValue) {
  if (formattedValue === undefined) {
    formattedValue = '1';
  }
  while (isNaN(parseInt(formattedValue, 10))) {
    formattedValue = formattedValue.slice(1);
  }
  return parseInt(formattedValue, 10);
}
export function getMonthEndDay(year, month) {
  return 32 - new Date(year, month - 1, 32).getDate();
}
export const defaultFormatter = (type, value) => value;
export function setNext(fn) {
  fn();
  return new Promise((resolve) => nextTick(() => resolve(null)));
}
export const ROW_HEIGHT = 64;
export function formatMonthTitle(date) {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return `${date.getFullYear()}年${date.getMonth() + 1}月`;
}
export function compareMonth(date1, date2) {
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
export function compareDay(day1, day2) {
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
export function getDayByOffset(date, offset) {
  date = new Date(date);
  date.setDate(date.getDate() + offset);
  return date;
}
export function getPrevDay(date) {
  return getDayByOffset(date, -1);
}
export function getNextDay(date) {
  return getDayByOffset(date, 1);
}
export function getToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}
export function calcDateNum(date) {
  const day1 = new Date(date[0]).getTime();
  const day2 = new Date(date[1]).getTime();
  return (day2 - day1) / (1000 * 60 * 60 * 24) + 1;
}
export function copyDates(dates) {
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
export function getMonths(minDate, maxDate) {
  const months = [];
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
export const getTime = (date) => (date instanceof Date ? date.getTime() : date);
