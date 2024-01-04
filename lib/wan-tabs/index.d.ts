import type { ComponentInternalInstance, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["change", "disabled", "before-change", "click", "scroll"];
export declare const props: {
    sticky: BooleanConstructor;
    border: BooleanConstructor;
    swipeable: BooleanConstructor;
    titleActiveColor: StringConstructor;
    titleInactiveColor: StringConstructor;
    color: StringConstructor;
    animated: {
        type: BooleanConstructor;
    };
    lineWidth: {
        type: NumberConstructor;
        default: number;
        observer: string;
    };
    lineHeight: {
        type: NumberConstructor;
        default: number;
    };
    active: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    ellipsis: {
        type: BooleanConstructor;
        default: boolean;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    swipeThreshold: {
        type: NumberConstructor;
        default: number;
    };
    offsetTop: {
        type: NumberConstructor;
        default: number;
    };
    webOffsetTop: {
        type: NumberConstructor;
        default: number;
    };
    lazyRender: {
        type: BooleanConstructor;
        default: boolean;
    };
    useBeforeChange: {
        type: BooleanConstructor;
        default: boolean;
    };
    navClass: StringConstructor;
    tabClass: StringConstructor;
    tabActiveClass: StringConstructor;
    lineClass: StringConstructor;
    wrapClass: StringConstructor;
    customClass: StringConstructor;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance, props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    container: () => UniApp.NodesRef;
    state: {
        tabs: Record<string, AnyObject>[];
        scrollLeft: number;
        scrollable: boolean;
        currentIndex: number;
        skipTransition: boolean;
        scrollWithAnimation: boolean;
        lineOffsetLeft: number;
        inited: boolean;
    };
    onTap: (index: number) => void;
    onTouchScroll: (event: any) => void;
    onTouchStart: (event: any) => void;
    onTouchMove: (event: any) => void;
    onTouchEnd: () => void;
    tabClass: import("@vue/reactivity").ComputedRef<({ active }: {
        active: any;
    }) => string>;
    tabStyle: import("@vue/reactivity").ComputedRef<({ disabled, active }: {
        disabled: any;
        active: any;
    }) => Record<string, string>>;
    navStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    trackStyle: import("@vue/reactivity").ComputedRef<Record<string, string> | "">;
    lineStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
};
