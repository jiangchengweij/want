import type { ExtractPropTypes, SetupContext } from 'vue';
export declare const emits: string[];
export declare const props: {
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
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
type Props = ExtractPropTypes<typeof props>;
type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup<P, C>(props: P & Props, context: C & Context): {
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
};
export {};
