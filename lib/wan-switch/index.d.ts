import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["update:modelValue", "change"];
export declare const props: {
    modelValue: null;
    loading: BooleanConstructor;
    disabled: BooleanConstructor;
    activeColor: StringConstructor;
    inactiveColor: StringConstructor;
    size: {
        type: StringConstructor;
        default: string;
    };
    activeValue: {
        type: null;
        default: boolean;
    };
    inactiveValue: {
        type: null;
        default: boolean;
    };
    customClass: null;
    nodeClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    rootStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    loadingColor: import("@vue/reactivity").ComputedRef<string>;
    onClick: () => void;
};
