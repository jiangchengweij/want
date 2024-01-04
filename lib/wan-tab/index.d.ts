import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    dot: {
        type: BooleanConstructor;
    };
    info: {
        type: (StringConstructor | NumberConstructor)[];
    };
    title: {
        type: StringConstructor;
    };
    disabled: {
        type: BooleanConstructor;
    };
    titleStyle: {
        type: StringConstructor;
    };
    name: {
        type: StringConstructor;
        default: string;
    };
    index: {
        type: NumberConstructor;
    };
    customClass: StringConstructor;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    getComputedName: () => string | number;
    updateRender: (active: boolean) => void;
    state: {
        active: boolean;
        shouldRender: boolean;
        shouldShow: boolean;
    };
};
