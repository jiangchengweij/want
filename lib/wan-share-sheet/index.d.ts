import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click-overlay", "cancel", "select", "close"];
export declare const props: {
    show: BooleanConstructor;
    overlayStyle: StringConstructor;
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    title: StringConstructor;
    cancelText: {
        type: StringConstructor;
        default: string;
    };
    description: StringConstructor;
    options: {
        type: ArrayConstructor;
        default: never[];
    };
    overlay: {
        type: BooleanConstructor;
        default: boolean;
    };
    safeAreaInsetBottom: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: boolean;
    };
    duration: {
        type: null;
        default: number;
    };
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    isMulti: import("@vue/reactivity").ComputedRef<boolean>;
    onClickOverlay: () => void;
    onCancel: () => void;
    onSelect: (event: any) => void;
    onClose: () => void;
};
