/// <reference types="@dcloudio/types" />
export declare function useChildren(key: string, event?: {
    onLink?: (_: AnyObject) => void;
    onUnLink?: <T = AnyObject>(_: T) => void;
}): {
    children: AnyObject[];
};
export declare function useParent(key: string, index?: number): {
    parent: AnyObject | null;
    index: number;
    children: AnyObject[];
};
