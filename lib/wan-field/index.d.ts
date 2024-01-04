import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["update:modelValue", "input", "change", "linechange", "keyboardheightchange", "focus", "blur", "click-icon", "click-input", "clear", "confirm", "click"];
export declare const props: {
    size: StringConstructor;
    icon: StringConstructor;
    label: StringConstructor;
    error: BooleanConstructor;
    center: BooleanConstructor;
    isLink: BooleanConstructor;
    leftIcon: StringConstructor;
    rightIcon: StringConstructor;
    autosize: null;
    required: BooleanConstructor;
    iconClass: StringConstructor;
    clickable: BooleanConstructor;
    inputAlign: StringConstructor;
    customStyle: StringConstructor;
    errorMessage: StringConstructor;
    arrowDirection: StringConstructor;
    showWordLimit: BooleanConstructor;
    errorMessageAlign: StringConstructor;
    readonly: {
        type: BooleanConstructor;
    };
    clearable: {
        type: BooleanConstructor;
    };
    clearTrigger: {
        type: StringConstructor;
        default: string;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    titleWidth: {
        type: StringConstructor;
        default: string;
    };
    clearIcon: {
        type: StringConstructor;
        default: string;
    };
    extraEventParams: {
        type: BooleanConstructor;
        default: boolean;
    };
    customClass: StringConstructor;
    inputClass: StringConstructor;
    rightIconClass: StringConstructor;
    labelClass: StringConstructor;
    autoHeight: BooleanConstructor;
    fixed: BooleanConstructor;
    showConfirmBar: {
        type: BooleanConstructor;
        default: boolean;
    };
    disableDefaultPadding: {
        type: BooleanConstructor;
        default: boolean;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    password: BooleanConstructor;
    confirmType: StringConstructor;
    confirmHold: BooleanConstructor;
    alwaysEmbed: BooleanConstructor;
    modelValue: {
        type: StringConstructor;
        default: string;
    };
    name: StringConstructor;
    placeholder: StringConstructor;
    placeholderStyle: StringConstructor;
    placeholderClass: StringConstructor;
    disabled: BooleanConstructor;
    maxlength: {
        type: NumberConstructor;
        default: number;
    };
    cursorSpacing: {
        type: NumberConstructor;
        default: number;
    };
    autoFocus: BooleanConstructor;
    focus: BooleanConstructor;
    cursor: {
        type: NumberConstructor;
        default: number;
    };
    selectionStart: {
        type: NumberConstructor;
        default: number;
    };
    selectionEnd: {
        type: NumberConstructor;
        default: number;
    };
    adjustPosition: {
        type: BooleanConstructor;
        default: boolean;
    };
    holdKeyboard: BooleanConstructor;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export interface InputDetails {
    /** 输入框内容 */
    value: string;
    /** 光标位置 */
    cursor?: number;
    /** keyCode 为键值 (目前工具还不支持返回keyCode参数) `2.1.0` 起支持 */
    keyCode?: number;
}
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        focused: boolean;
        innerValue: string;
        showClear: boolean;
    };
    inputStyle: import("@vue/reactivity").ComputedRef<Record<string, string> | "">;
    onInput: (event: any) => void;
    onFocus: (event: any) => void;
    onBlur: (event: any) => void;
    onClickIcon: () => void;
    onClickInput: (event: any) => void;
    onClick: (event: any) => void;
    onClear: () => void;
    onConfirm: (event: any) => void;
    onLineChange: (event: any) => void;
    onKeyboardHeightChange: (event: any) => void;
};
