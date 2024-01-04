import { SetupContext } from 'vue';
import type { ComponentInternalInstance, ExtractPropTypes } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["scroll"];
export declare const props: {
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    offsetTop: {
        type: NumberConstructor;
        default: number;
    };
    webOffsetTop: {
        type: NumberConstructor;
        default: number;
    };
    disabled: {
        type: BooleanConstructor;
        default: boolean;
    };
    target: {
        type: StringConstructor;
        default: string;
    };
    customClass: null;
    container: {
        type: FunctionConstructor;
    };
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance, props: Props, context: Context): {
    wrapStyle: import("@vue/reactivity").ComputedRef<AnyObject>;
    containerStyle: import("@vue/reactivity").ComputedRef<AnyObject>;
    height: import("@vue/reactivity").Ref<number>;
    fixed: import("@vue/reactivity").Ref<boolean>;
    width: import("@vue/reactivity").Ref<number>;
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
};
