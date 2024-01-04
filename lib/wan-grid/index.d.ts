import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    square: {
        type: BooleanConstructor;
    };
    gutter: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    clickable: {
        type: BooleanConstructor;
    };
    columnNum: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    center: {
        type: BooleanConstructor;
        default: boolean;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    direction: {
        type: StringConstructor;
    };
    iconSize: {
        type: StringConstructor;
    };
    reverse: {
        type: BooleanConstructor;
        default: boolean;
    };
    customClass: {
        type: StringConstructor;
    };
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    rootStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
};
