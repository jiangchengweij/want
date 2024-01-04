export declare const commonProps: {
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
export declare const inputProps: {
    type: {
        type: StringConstructor;
        default: string;
    };
    password: BooleanConstructor;
    confirmType: StringConstructor;
    confirmHold: BooleanConstructor;
    alwaysEmbed: BooleanConstructor;
};
export declare const textareaProps: {
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
};
