/// <reference types="@dcloudio/types" />
/// <reference types="@dcloudio/types" />
/// <reference types="@dcloudio/types" />
export * from './validator';
export * from './bem';
export * from './style';
export declare function getSystemInfoSync(): UniApp.GetSystemInfoResult;
export declare function range(num: number, min: number, max: number): number;
export declare function addUnit(value?: string | number): string | undefined;
export declare function requestAnimationFrame(cb: () => void): number;
export declare function pickExclude(obj: unknown, keys: string[]): Record<string, unknown>;
export declare function getRect(context: unknown, selector: string): Promise<UniApp.NodeInfo>;
export declare function getAllRect(context: unknown, selector: string): Promise<UniApp.NodeInfo[]>;
export declare function toPromise(promiseLike: Promise<unknown> | unknown): Promise<unknown>;
export declare function addNumber(num1: number, num2: number): number;
export declare function toNumber(str: unknown): number;
export declare const clamp: (num: number, min: number, max: number) => number;
export declare function getCurrentPage<T>(): T;
export declare const isPC: boolean;
/**
 * 生成全球唯一标识
 * @returns uuid
 */
export declare function uuid(): string;
export declare function deepClone<T>(obj: T): T;
export declare function throttle(func: any, wait: number, options: AnyObject): (this: AnyObject, ...argsment: any[]) => any;
