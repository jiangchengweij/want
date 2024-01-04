import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["update:modelValue", "change", "confirm", "cancel"];
export declare const props: {
    modelValue: {
        type: null;
    };
    filter: null;
    type: {
        type: StringConstructor;
        default: string;
    };
    showToolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    formatter: {
        type: null;
        default: (type: "year" | "month" | "day" | "hour" | "minute", value: string) => string;
    };
    minDate: {
        type: NumberConstructor;
        default: number;
    };
    maxDate: {
        type: NumberConstructor;
        default: number;
    };
    minHour: {
        type: NumberConstructor;
        default: number;
    };
    maxHour: {
        type: NumberConstructor;
        default: number;
    };
    minMinute: {
        type: NumberConstructor;
        default: number;
    };
    maxMinute: {
        type: NumberConstructor;
        default: number;
    };
    customClass: null;
    activeClass: null;
    toolbarClass: null;
    columnClass: null;
    title: StringConstructor;
    loading: BooleanConstructor;
    cancelButtonText: {
        type: StringConstructor;
        default: string;
    };
    confirmButtonText: {
        type: StringConstructor;
        default: string;
    };
    visibleItemCount: {
        type: NumberConstructor;
        default: number;
    };
    itemHeight: {
        type: NumberConstructor;
        default: number;
    };
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        innerValue: number;
        columns: AnyObject[];
    };
    pickerRef: import("@vue/reactivity").Ref<AnyObject | null>;
    onCancel: () => void;
    onConfirm: () => void;
    onChange: () => void;
};
