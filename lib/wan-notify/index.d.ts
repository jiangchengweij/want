import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    message: StringConstructor;
    background: StringConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    duration: {
        type: NumberConstructor;
        default: number;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    safeAreaInsetTop: {
        type: BooleanConstructor;
        default: boolean;
    };
    top: (StringConstructor | NumberConstructor)[];
    webOffsetTop: {
        type: null;
        default: number;
    };
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    options: {
        show: boolean;
        type: string;
        message: string | undefined;
        background: string | undefined;
        color: string;
        duration: number;
        zIndex: number;
        safeAreaInsetTop: boolean;
        top: string | number | undefined;
        onOpened: () => void;
        onClose: () => void;
        onClick: (detail: Record<string, null>) => void;
    };
    rootStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    notifyStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    onTap: (event: any) => void;
    statusBarHeight: number | undefined;
};
