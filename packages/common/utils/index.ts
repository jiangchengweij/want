import { isDef, isNumber, isObj, isPlainObject, isPromise } from './validator';

export * from './validator';
export * from './bem';
export * from './style';

let systemInfo: UniApp.GetSystemInfoResult;

export function getSystemInfoSync() {
  if (systemInfo == null) {
    systemInfo = uni.getSystemInfoSync();
  }
  return systemInfo;
}

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

  return Object.keys(obj).reduce<Record<string, unknown>>((prev, key) => {
    if (!keys.includes(key)) {
      prev[key] = obj[key];
    }
    return prev;
  }, {});
}

export function getRect(context: unknown, selector: string) {
  return new Promise<UniApp.NodeInfo>((resolve) => {
    uni
      .createSelectorQuery()
      .in(context)
      .select(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]));
  });
}

export function getAllRect(context: unknown, selector: string) {
  return new Promise<UniApp.NodeInfo[]>((resolve) => {
    uni
      .createSelectorQuery()
      .in(context)
      .selectAll(selector)
      .boundingClientRect()
      .exec((rect = []) => resolve(rect[0]));
  });
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
export function toNumber(str: unknown) {
  const num = Number(str);
  return isNaN(num) ? 0 : num;
}

// 限制value在[min, max]之间
export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max);

export function getCurrentPage<T>() {
  const pages = getCurrentPages();
  return pages[pages.length - 1] as T;
}

export const isPC = ['mac', 'windows'].includes(getSystemInfoSync().platform);

const hexList: string[] = [];
for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16);
}

/**
 * 生成全球唯一标识
 * @returns uuid
 */
export function uuid(): string {
  let uuid = '';
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-';
    } else if (i === 15) {
      uuid += 4;
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8];
    } else {
      uuid += hexList[(Math.random() * 16) | 0];
    }
  }
  return uuid;
}

export function deepClone<T>(obj: T): T {
  if (!isDef(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item)) as unknown as T;
  }

  if (isObj(obj)) {
    const to = {} as Record<string, unknown>;
    Object.keys(obj).forEach((key: string) => {
      to[key] = deepClone(obj[key]);
    });

    return to as T;
  }

  return obj;
}

export function throttle(func, wait: number, options: AnyObject) {
  let context: AnyObject | null;
  let args;
  let result;
  let timeout: number | null = null;
  // 上次执行时间点
  let previous = 0;
  if (!options) options = {};
  // 延迟执行函数
  const later = function () {
    // 若设定了开始边界不执行选项，上次执行时间始终为0
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null;
  };
  return function (this: AnyObject, ...argsment) {
    const now = Date.now();
    // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
    if (!previous && options.leading === false) previous = now;
    // 延迟执行时间间隔
    const remaining = wait - (now - previous);
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    context = this;
    args = argsment;
    // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
    // remaining大于时间窗口wait，表示客户端系统时间被调整过
    if (remaining <= 0 || remaining > wait) {
      clearTimeout(timeout!);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
      // 如果延迟执行不存在，且没有设定结尾边界不执行选项
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
}
