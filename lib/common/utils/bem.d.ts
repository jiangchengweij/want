type Conf = Record<string, unknown> | (Record<string, unknown> | string)[] | string | number;
export declare function bem(name: string, conf?: Conf): string;
export {};
