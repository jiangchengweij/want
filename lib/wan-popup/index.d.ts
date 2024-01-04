import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly [...string[], "click-overlay", "close"];
export declare const props: {
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    round: BooleanConstructor;
    closeable: BooleanConstructor;
    customStyle: (ObjectConstructor | StringConstructor)[];
    overlayStyle: StringConstructor;
    transition: {
        type: StringConstructor;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    overlay: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeIcon: {
        type: StringConstructor;
        default: string;
    };
    closeIconPosition: {
        type: StringConstructor;
        default: string;
    };
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: boolean;
    };
    position: {
        type: StringConstructor;
        default: string;
    };
    safeAreaInsetBottom: {
        type: BooleanConstructor;
        default: boolean;
    };
    safeAreaInsetTop: {
        type: BooleanConstructor;
        default: boolean;
    };
    safeAreaTabBar: {
        type: BooleanConstructor;
        default: boolean;
    };
    lockScroll: {
        type: BooleanConstructor;
        default: boolean;
    };
    customClass: (ArrayConstructor | StringConstructor)[];
    closeIconClass: StringConstructor;
    duration: {
        type: (ObjectConstructor | StringConstructor | NumberConstructor)[];
        default: number;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    enterClass: StringConstructor;
    enterActiveClass: StringConstructor;
    enterToClass: StringConstructor;
    leaveClass: StringConstructor;
    leaveActiveClass: StringConstructor;
    leaveToClass: StringConstructor;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare const setup: (props: Props, context: Context) => {
    popupStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    onClickCloseIcon: () => void;
    onClickOverlay: () => void;
    state: {
        type: string;
        inited: boolean;
        display: boolean;
        status: string;
        classes: string;
        currentDuration: number;
        transitionEnded: boolean;
        name: string;
        duration: string | number | Record<string, any>;
    };
    onTransitionEnd: () => void;
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
};
