import { ComponentInternalInstance, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    title: StringConstructor;
    fixed: {
        type: BooleanConstructor;
    };
    placeholder: {
        type: BooleanConstructor;
    };
    leftText: StringConstructor;
    rightText: StringConstructor;
    leftArrow: BooleanConstructor;
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    safeAreaInsetTop: {
        type: BooleanConstructor;
        default: boolean;
    };
    customStyle: null;
    customClass: null;
    titleClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance, props: Props): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        height: number;
    };
    barStyle: import("@vue/reactivity").ComputedRef<any>;
};
