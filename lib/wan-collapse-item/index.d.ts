import { ComponentInternalInstance, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    size: StringConstructor;
    name: null;
    title: null;
    value: null;
    icon: StringConstructor;
    label: StringConstructor;
    disabled: BooleanConstructor;
    clickable: BooleanConstructor;
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    isLink: {
        type: BooleanConstructor;
        default: boolean;
    };
    index: {
        type: NumberConstructor;
    };
    customClass: null;
    titleClass: StringConstructor;
    contentClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance, props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        expanded: boolean;
    };
    curIndex: import("@vue/reactivity").ComputedRef<number>;
    onClick: () => void;
    animationStyle: {
        height: string;
    };
    animationData: import("@vue/reactivity").Ref<{}>;
};
