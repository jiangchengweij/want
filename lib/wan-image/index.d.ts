import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["load", "error", "click"];
export declare const props: {
    src: {
        type: StringConstructor;
    };
    round: BooleanConstructor;
    width: (StringConstructor | NumberConstructor)[];
    height: (StringConstructor | NumberConstructor)[];
    radius: (StringConstructor | NumberConstructor)[];
    lazyLoad: BooleanConstructor;
    useErrorSlot: BooleanConstructor;
    useLoadingSlot: BooleanConstructor;
    showMenuByLongpress: BooleanConstructor;
    fit: {
        type: StringConstructor;
        default: string;
    };
    webp: {
        type: BooleanConstructor;
        default: boolean;
    };
    showError: {
        type: BooleanConstructor;
        default: boolean;
    };
    showLoading: {
        type: BooleanConstructor;
        default: boolean;
    };
    customClass: StringConstructor;
    loadingClass: StringConstructor;
    errorClass: StringConstructor;
    imageClass: StringConstructor;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        error: boolean;
        loading: boolean;
        viewStyle: string;
    };
    onLoad: () => void;
    onError: (event: any) => void;
    onClick: (event: any) => void;
    rootStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    mode: import("@vue/reactivity").ComputedRef<any>;
};
