import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["change", "blur", "focus", "overlimit", "update:modelValue", "plus", "minus"];
export declare const props: {
    modelValue: {
        type: null;
    };
    integer: {
        type: BooleanConstructor;
    };
    disabled: BooleanConstructor;
    inputWidth: StringConstructor;
    buttonSize: StringConstructor;
    asyncChange: BooleanConstructor;
    disableInput: BooleanConstructor;
    decimalLength: {
        type: NumberConstructor;
        default: number;
    };
    min: {
        type: null;
        default: number;
    };
    max: {
        type: null;
        default: number;
    };
    step: {
        type: null;
        default: number;
    };
    showPlus: {
        type: BooleanConstructor;
        default: boolean;
    };
    showMinus: {
        type: BooleanConstructor;
        default: boolean;
    };
    disablePlus: BooleanConstructor;
    disableMinus: BooleanConstructor;
    longPress: {
        type: BooleanConstructor;
        default: boolean;
    };
    focus: BooleanConstructor;
    theme: StringConstructor;
    alwaysEmbed: BooleanConstructor;
    inputClass: null;
    plusClass: null;
    minusClass: null;
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
type EmitType = (typeof emits)[number];
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        innterValue: string;
    };
    buttonStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    inputStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    onFocus: (event: any) => void;
    onBlur: (event: any) => void;
    onInput: (event: any) => void;
    onTap: (type: EmitType) => void;
    onTouchStart: (type: EmitType) => void;
    onTouchEnd: () => void;
};
export {};
