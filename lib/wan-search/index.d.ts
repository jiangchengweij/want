import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["update:modelValue", "change", "cancel", "search", "focus", "blur", "clear", "click-input"];
export declare const props: {
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    label: StringConstructor;
    focus: BooleanConstructor;
    error: BooleanConstructor;
    disabled: BooleanConstructor;
    readonly: BooleanConstructor;
    inputAlign: StringConstructor;
    showAction: BooleanConstructor;
    useActionSlot: BooleanConstructor;
    useLeftIconSlot: BooleanConstructor;
    useRightIconSlot: BooleanConstructor;
    leftIcon: {
        type: StringConstructor;
        default: string;
    };
    rightIcon: StringConstructor;
    placeholder: StringConstructor;
    placeholderStyle: StringConstructor;
    actionText: {
        type: StringConstructor;
        default: string;
    };
    background: {
        type: StringConstructor;
        default: string;
    };
    maxlength: {
        type: NumberConstructor;
        default: number;
    };
    shape: {
        type: StringConstructor;
        default: string;
    };
    clearable: {
        type: BooleanConstructor;
        default: boolean;
    };
    clearTrigger: {
        type: StringConstructor;
        default: string;
    };
    clearIcon: {
        type: StringConstructor;
        default: string;
    };
    cursorSpacing: {
        type: NumberConstructor;
        default: number;
    };
    customClass: null;
    fieldClass: null;
    inputClass: null;
    cancelClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    onChange: (event: string) => void;
    onCancel: () => void;
    onUpdateModelValue: (event: any) => void;
    onSearch: (event: any) => void;
    onFocus: (event: any) => void;
    onBlur: (event: any) => void;
    onClear: (event: any) => void;
    onClickInput: (event: any) => void;
};
