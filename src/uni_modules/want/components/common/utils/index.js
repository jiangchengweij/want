import { isDef, isNumber, isObj, isPlainObject, isPromise } from './validator';
export * from './validator';
export * from './bem';
export * from './style';
let systemInfo;
export function getSystemInfoSync() {
    if (systemInfo == null) {
        systemInfo = uni.getSystemInfoSync();
    }
    return systemInfo;
}
export function range(num, min, max) {
    return Math.min(Math.max(num, min), max);
}
export function addUnit(value) {
    if (!isDef(value)) {
        return undefined;
    }
    value = String(value);
    return isNumber(value) ? `${value}px` : value;
}
export function requestAnimationFrame(cb) {
    return setTimeout(() => {
        cb();
    }, 1000 / 30);
}
export function pickExclude(obj, keys) {
    if (!isPlainObject(obj)) {
        return {};
    }
    return Object.keys(obj).reduce((prev, key) => {
        if (!keys.includes(key)) {
            prev[key] = obj[key];
        }
        return prev;
    }, {});
}
export function getRect(context, selector) {
    return new Promise((resolve) => {
        uni
            .createSelectorQuery()
            .in(context)
            .select(selector)
            .boundingClientRect()
            .exec((rect = []) => resolve(rect[0]));
    });
}
export function getAllRect(context, selector) {
    return new Promise((resolve) => {
        uni
            .createSelectorQuery()
            .in(context)
            .selectAll(selector)
            .boundingClientRect()
            .exec((rect = []) => resolve(rect[0]));
    });
}
export function toPromise(promiseLike) {
    if (isPromise(promiseLike)) {
        return promiseLike;
    }
    return Promise.resolve(promiseLike);
}
// 浮点数精度处理
export function addNumber(num1, num2) {
    const cardinal = Math.pow(10, 10);
    return Math.round((num1 + num2) * cardinal) / cardinal;
}
//转换任何位数字
export function toNumber(str) {
    const num = Number(str);
    return isNaN(num) ? 0 : num;
}
// 限制value在[min, max]之间
export const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
export function getCurrentPage() {
    const pages = getCurrentPages();
    return pages[pages.length - 1];
}
export const isPC = ['mac', 'windows'].includes(getSystemInfoSync().platform);
const hexList = [];
for (let i = 0; i <= 15; i++) {
    hexList[i] = i.toString(16);
}
/**
 * 生成全球唯一标识
 * @returns uuid
 */
export function uuid() {
    let uuid = '';
    for (let i = 1; i <= 36; i++) {
        if (i === 9 || i === 14 || i === 19 || i === 24) {
            uuid += '-';
        }
        else if (i === 15) {
            uuid += 4;
        }
        else if (i === 20) {
            uuid += hexList[(Math.random() * 4) | 8];
        }
        else {
            uuid += hexList[(Math.random() * 16) | 0];
        }
    }
    return uuid;
}
export function deepClone(obj) {
    if (!isDef(obj)) {
        return obj;
    }
    if (Array.isArray(obj)) {
        return obj.map((item) => deepClone(item));
    }
    if (isObj(obj)) {
        const to = {};
        Object.keys(obj).forEach((key) => {
            to[key] = deepClone(obj[key]);
        });
        return to;
    }
    return obj;
}
