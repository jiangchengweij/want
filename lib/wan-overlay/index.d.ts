import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    show: BooleanConstructor;
    customStyle: StringConstructor;
    customClass: null;
    duration: {
        type: (StringConstructor | NumberConstructor)[];
        default: number;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare const setup: (props: Props, context: Context) => {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    onClick: () => void;
    noop: () => void;
};
