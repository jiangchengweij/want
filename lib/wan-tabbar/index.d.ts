import { ComponentInternalInstance, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["change"];
export declare const props: {
    active: {
        type: null;
    };
    activeColor: {
        type: StringConstructor;
    };
    inactiveColor: {
        type: StringConstructor;
    };
    fixed: {
        type: BooleanConstructor;
        default: boolean;
    };
    placeholder: {
        type: BooleanConstructor;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    safeAreaInsetBottom: {
        type: BooleanConstructor;
        default: boolean;
    };
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance, props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        height: number;
    };
};
