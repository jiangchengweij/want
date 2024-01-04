import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    date: {
        type: null;
    };
    type: {
        type: StringConstructor;
    };
    color: StringConstructor;
    minDate: {
        type: null;
    };
    maxDate: {
        type: null;
    };
    showMark: BooleanConstructor;
    rowHeight: null;
    formatter: {
        type: null;
    };
    currentDate: {
        type: null;
    };
    firstDayOfWeek: {
        type: NumberConstructor;
        required: boolean;
        default: number;
    };
    allowSameDay: BooleanConstructor;
    showSubtitle: BooleanConstructor;
    showMonthTitle: BooleanConstructor;
    id: StringConstructor;
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        visible: boolean;
        days: {
            date: {
                toString: () => string;
                toDateString: () => string;
                toTimeString: () => string;
                toLocaleString: {
                    (): string;
                    (locales?: string | string[] | undefined, options?: Intl.DateTimeFormatOptions | undefined): string;
                    (locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions | undefined): string;
                };
                toLocaleDateString: {
                    (): string;
                    (locales?: string | string[] | undefined, options?: Intl.DateTimeFormatOptions | undefined): string;
                    (locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions | undefined): string;
                };
                toLocaleTimeString: {
                    (): string;
                    (locales?: string | string[] | undefined, options?: Intl.DateTimeFormatOptions | undefined): string;
                    (locales?: Intl.LocalesArgument, options?: Intl.DateTimeFormatOptions | undefined): string;
                };
                valueOf: () => number;
                getTime: () => number;
                getFullYear: () => number;
                getUTCFullYear: () => number;
                getMonth: () => number;
                getUTCMonth: () => number;
                getDate: () => number;
                getUTCDate: () => number;
                getDay: () => number;
                getUTCDay: () => number;
                getHours: () => number;
                getUTCHours: () => number;
                getMinutes: () => number;
                getUTCMinutes: () => number;
                getSeconds: () => number;
                getUTCSeconds: () => number;
                getMilliseconds: () => number;
                getUTCMilliseconds: () => number;
                getTimezoneOffset: () => number;
                setTime: (time: number) => number;
                setMilliseconds: (ms: number) => number;
                setUTCMilliseconds: (ms: number) => number;
                setSeconds: (sec: number, ms?: number | undefined) => number;
                setUTCSeconds: (sec: number, ms?: number | undefined) => number;
                setMinutes: (min: number, sec?: number | undefined, ms?: number | undefined) => number;
                setUTCMinutes: (min: number, sec?: number | undefined, ms?: number | undefined) => number;
                setHours: (hours: number, min?: number | undefined, sec?: number | undefined, ms?: number | undefined) => number;
                setUTCHours: (hours: number, min?: number | undefined, sec?: number | undefined, ms?: number | undefined) => number;
                setDate: (date: number) => number;
                setUTCDate: (date: number) => number;
                setMonth: (month: number, date?: number | undefined) => number;
                setUTCMonth: (month: number, date?: number | undefined) => number;
                setFullYear: (year: number, month?: number | undefined, date?: number | undefined) => number;
                setUTCFullYear: (year: number, month?: number | undefined, date?: number | undefined) => number;
                toUTCString: () => string;
                toISOString: () => string;
                toJSON: (key?: any) => string;
                [Symbol.toPrimitive]: {
                    (hint: "default"): string;
                    (hint: "string"): string;
                    (hint: "number"): number;
                    (hint: string): string | number;
                };
            };
            type: string;
            text: number;
            bottomInfo?: string | undefined;
            className?: string | undefined;
            topInfo?: string | undefined;
        }[];
    };
    getMark: import("@vue/reactivity").ComputedRef<number>;
    getMonthStyle: import("@vue/reactivity").ComputedRef<string>;
    getDayStyle: import("@vue/reactivity").ComputedRef<(type: any, index: any) => string>;
    getFormatMonthTitle: import("@vue/reactivity").ComputedRef<string>;
    onClick: (index: number) => void;
};
