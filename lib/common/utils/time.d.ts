export declare const currentYear: number;
export declare function isValidDate(date: number): boolean;
export declare function range(num: number, min: number, max: number): number;
export declare function padZero(num: number | string, targetLength?: number): string;
export declare function times(n: number, iteratee: (index: number) => string): string[];
export declare function getTrueValue(formattedValue: string): number;
export declare function getMonthEndDay(year: number, month: number): number;
export declare const defaultFormatter: (type: 'year' | 'month' | 'day' | 'hour' | 'minute', value: string) => string;
export declare function setNext(fn: () => void): Promise<unknown>;
export declare const ROW_HEIGHT = 64;
export declare function formatMonthTitle(date: Date): string;
export declare function compareMonth(date1: Date | number, date2: Date | number): 0 | 1 | -1;
export declare function compareDay(day1: Date | number, day2: Date | number): 0 | 1 | -1;
export declare function getDayByOffset(date: Date, offset: number): Date;
export declare function getPrevDay(date: Date): Date;
export declare function getNextDay(date: Date): Date;
export declare function getToday(): Date;
export declare function calcDateNum(date: [Date, Date]): number;
export declare function copyDates(dates: Date | Date[] | number[] | number): any[] | Date;
export declare function getMonths(minDate: number, maxDate: number): number[];
export declare const initialMinDate: number;
export declare const initialMaxDate: number;
export declare const getTime: (date: Date | number) => number;
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
export declare function parseTimeData(time: number): TimeData;
export declare function parseFormat(format: string, timeData: TimeData): string;
export declare function isSameSecond(time1: number, time2: number): boolean;
