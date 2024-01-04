import { ComponentInternalInstance, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["update:modelValue", "change"];
export declare const props: {
    name: null;
    modelValue: null;
    disabled: BooleanConstructor;
    useIconSlot: BooleanConstructor;
    checkedColor: StringConstructor;
    labelPosition: {
        type: StringConstructor;
        default: string;
    };
    labelDisabled: BooleanConstructor;
    shape: {
        type: StringConstructor;
        default: string;
    };
    iconSize: {
        type: null;
        default: number;
    };
    customClass: null;
    iconClass: null;
    labelClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance, props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        direction: string;
        parentDisabled: boolean;
        innerValue: any;
    };
    iconStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    iconCustomStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    updateFromParent: () => void;
    onChange: () => void;
    onClickLabel: () => void;
};
