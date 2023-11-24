import { nextTick } from "vue";
import { isDef } from "../utils/validator";

export const currentYear = new Date().getFullYear();

export function isValidDate(date: number) {
  return isDef(date) && !isNaN(new Date(date).getTime());
}

export function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function padZero(val: string | number) {
  return `00${val}`.slice(-2);
}

export function times(n: number, iteratee: (index: number) => string): string[] {
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

export function setNext(fn: Function) {
	fn();
	return new Promise((resolve) => nextTick(() => resolve(null)))
}

