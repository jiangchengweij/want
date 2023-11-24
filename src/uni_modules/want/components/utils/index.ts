import { isDef, isNumber, isObj, isPlainObject, isPromise } from './validator';
import {
  getSystemInfoSync,
} from './version';
export {
  getSystemInfoSync,
} from './version';

export function range(num: number, min: number, max: number) {
  return Math.min(Math.max(num, min), max);
}

export function addUnit(value?: string | number): string | undefined {
	if (!isDef(value)) {
		return undefined;
	}

	value = String(value);
	return isNumber(value) ? `${value}px` : value;
}

export function requestAnimationFrame(cb: () => void) {
  return setTimeout(() => {
    cb();
  }, 1000 / 30);
}

export function pickExclude(obj: unknown, keys: string[]) {
  if (!isPlainObject(obj)) {
    return {};
  }

  return Object.keys(obj).reduce<any>((prev, key) => {
    if (!keys.includes(key)) {
      prev[key] = obj[key];
    }

    return prev;
  }, {});
}

export function getRect(
	context: any,
	selector: string
) {
	return new Promise<UniApp.NodeInfo>(
		(resolve) => {
			uni.createSelectorQuery()
				.in(context)
				.select(selector)
				.boundingClientRect()
				.exec((rect = []) => resolve(rect[0]));
		}
	);
}

export function getAllRect(
  context: any,
  selector: string
) {
  return new Promise<UniApp.NodeInfo[]>(
    (resolve) => {
      uni.createSelectorQuery()
        .in(context)
        .selectAll(selector)
        .boundingClientRect()
        .exec((rect = []) => resolve(rect[0]));
    }
  );
}

export function toPromise(promiseLike: Promise<unknown> | unknown) {
  if (isPromise(promiseLike)) {
    return promiseLike;
  }

  return Promise.resolve(promiseLike);
}

// 浮点数精度处理
export function addNumber(num1: number, num2: number) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}

//转换任何位数字
export function toNumber(str: any) {
	const num = Number(str)
	return isNaN(num) ? 0 : num
}

// 限制value在[min, max]之间
export const clamp = (num: number, min: number, max: number) => Math.min(Math.max(num, min), max);

export function getCurrentPage<T>() {
  const pages = getCurrentPages();
  return pages[pages.length - 1] as T;
}

export const isPC = ['mac', 'windows'].includes(getSystemInfoSync().platform);

const hexList: string[] = []
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16)
}

/**
 * 生成全球唯一标识
 * @returns uuid
 */
export function uuid(): string {
  let uuid = ''
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-'
    } else if (i === 15) {
      uuid += 4
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8]
    } else {
      uuid += hexList[(Math.random() * 16) | 0]
    }
  }
  return uuid
}

export function deepClone<T extends Record<string, any>>(obj: T): T {
  if (!isDef(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  if (isObj(obj)) {
    const to = {} as Record<string, any>;
    Object.keys(obj).forEach((key: string) => {
      // @ts-ignore
      to[key] = deepClone(obj[key]);
    });

    return to as T;
  }

  return obj;
}
