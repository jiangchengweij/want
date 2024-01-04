import { ComponentInternalInstance, ExtractPropTypes, PropType, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
interface Column {
    values: number[];
    defaultIndex: number;
}
export declare const emits: readonly ["change", "cancel", "confirm"];
export declare const props: {
    valueKey: {
        type: StringConstructor;
        default: string;
    };
    toolbarPosition: {
        type: StringConstructor;
        default: string;
    };
    defaultIndex: {
        type: NumberConstructor;
        default: number;
    };
    columns: {
        type: PropType<Column[]>;
        default: () => never[];
    };
    activeClass: null;
    toolbarClass: null;
    columnClass: null;
    title: StringConstructor;
    loading: BooleanConstructor;
    showToolbar: BooleanConstructor;
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
export declare function setup(this: ComponentInternalInstance, props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        pickerValues: number[];
        columns: {
            values: number[];
            defaultIndex: number;
        }[];
    };
    onChange: (event: any) => void;
    optionText: import("@vue/reactivity").ComputedRef<(option: AnyObject) => unknown>;
    columnsStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    frameStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    emitEvent: (type: any) => void;
};
export {};
