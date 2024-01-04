import { ComponentInternalInstance, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    inactive: BooleanConstructor;
    percentage: {
        type: NumberConstructor;
        default: number;
    };
    pivotText: StringConstructor;
    pivotColor: StringConstructor;
    trackColor: StringConstructor;
    showPivot: {
        type: BooleanConstructor;
        default: boolean;
    };
    color: {
        type: StringConstructor;
        default: string;
    };
    textColor: {
        type: StringConstructor;
        default: string;
    };
    strokeWidth: {
        type: null;
        default: number;
    };
    customClass: (ArrayConstructor | StringConstructor)[];
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance, props: Props): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        right: number;
    };
    getPivotText: import("@vue/reactivity").ComputedRef<string>;
    rootStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    portionStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    pivotStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
};
