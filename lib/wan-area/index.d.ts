import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["cancel", "confirm", "change"];
export declare const props: {
    showToolbar: {
        type: BooleanConstructor;
        default: boolean;
    };
    value: {
        type: StringConstructor;
    };
    areaList: {
        type: ObjectConstructor;
        default: () => void;
    };
    columnsNum: {
        type: null;
        default: number;
    };
    columnsPlaceholder: {
        type: ArrayConstructor;
        default: () => never[];
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
        columns: {
            values: never[];
        }[];
        typeToColumnsPlaceholder: {};
    };
    displayColumns: import("@vue/reactivity").ComputedRef<{
        values: never[];
    }[]>;
    pickerRef: import("@vue/reactivity").Ref<AnyObject | null>;
    onCancel: (event: any) => void;
    onConfirm: (event: any) => void;
    onChange: (event: any) => void;
};
