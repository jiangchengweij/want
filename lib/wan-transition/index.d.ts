import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click", ...string[]];
export declare const props: {
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    customClass: null;
    customStyle: (ObjectConstructor | StringConstructor)[];
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
    onClick: (event: any) => void;
    rootStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
};
