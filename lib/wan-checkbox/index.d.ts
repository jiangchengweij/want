import { ComponentInternalInstance, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["update:modelValue", "change"];
export declare const props: {
    modelValue: BooleanConstructor;
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
    name: {
        type: StringConstructor;
        default: string;
    };
    index: NumberConstructor;
    iconClass: (ArrayConstructor | StringConstructor)[];
    labelClass: (ArrayConstructor | StringConstructor)[];
    customClass: (ArrayConstructor | StringConstructor)[];
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance, props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        parentDisabled: boolean;
        direction: string;
        innerValue: boolean;
    };
    iconStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    onClickLabel: () => void;
    toggle: () => void;
};
