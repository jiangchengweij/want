import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    icon: StringConstructor;
    iconColor: StringConstructor;
    iconPrefix: {
        type: StringConstructor;
        default: string;
    };
    dot: BooleanConstructor;
    info: StringConstructor;
    badge: StringConstructor;
    text: StringConstructor;
    index: {
        type: NumberConstructor;
    };
    useSlot: BooleanConstructor;
    customClass: null;
    contentClass: null;
    iconClass: null;
    textClass: null;
    url: StringConstructor;
    linkType: {
        type: StringConstructor;
        default: string;
    };
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    square: import("@vue/reactivity").ComputedRef<any>;
    gutter: import("@vue/reactivity").ComputedRef<any>;
    direction: import("@vue/reactivity").ComputedRef<any>;
    center: import("@vue/reactivity").ComputedRef<any>;
    reverse: import("@vue/reactivity").ComputedRef<any>;
    border: import("@vue/reactivity").ComputedRef<any>;
    clickable: import("@vue/reactivity").ComputedRef<any>;
    iconSize: import("@vue/reactivity").ComputedRef<any>;
    wrapperStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    contentStyle: import("@vue/reactivity").ComputedRef<Record<string, string> | "">;
    onClick: () => void;
};
