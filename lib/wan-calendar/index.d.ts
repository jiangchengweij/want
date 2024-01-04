import { ComponentInternalInstance, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["open", "opened", "close", "closed", "unselect", "select", "confirm", "click-subtitle", "over-range"];
export declare const props: {
    title: {
        type: StringConstructor;
        default: string;
    };
    color: StringConstructor;
    show: {
        default: BooleanConstructor;
    };
    formatter: null;
    confirmText: {
        type: StringConstructor;
        default: string;
    };
    confirmDisabledText: {
        type: StringConstructor;
        default: string;
    };
    rangePrompt: StringConstructor;
    showRangePrompt: {
        type: BooleanConstructor;
        default: boolean;
    };
    defaultDate: {
        type: null;
        default: () => number;
    };
    allowSameDay: BooleanConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
    minDate: {
        type: NumberConstructor;
        default: number;
    };
    maxDate: {
        type: NumberConstructor;
        default: number;
    };
    position: {
        type: StringConstructor;
        default: string;
    };
    rowHeight: {
        type: null;
        default: number;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    poppable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showMark: {
        type: BooleanConstructor;
        default: boolean;
    };
    showTitle: {
        type: BooleanConstructor;
        default: boolean;
    };
    showConfirm: {
        type: BooleanConstructor;
        default: boolean;
    };
    showSubtitle: {
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
    maxRange: {
        type: null;
        default: null;
    };
    minRange: {
        type: NumberConstructor;
        default: number;
    };
    firstDayOfWeek: {
        type: NumberConstructor;
        default: number;
    };
    readonly: BooleanConstructor;
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance, props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        subtitle: string;
        currentDate: number | number[];
        scrollIntoView: string;
    };
    toastRef: import("@vue/reactivity").Ref<AnyObject | null>;
    months: import("@vue/reactivity").ComputedRef<number[]>;
    getButtonDisabled: import("@vue/reactivity").ComputedRef<boolean>;
    onClickDay: (event: any) => void;
    onOpen: () => void;
    onOpened: () => void;
    onClose: () => void;
    onClosed: () => void;
    onConfirm: () => void;
    onClickSubtitle: (event: TouchEvent) => void;
};
