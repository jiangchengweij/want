import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["change", "finish"];
export declare const props: {
    useSlot: BooleanConstructor;
    millisecond: BooleanConstructor;
    time: {
        type: NumberConstructor;
        default: number;
    };
    format: {
        type: StringConstructor;
        default: string;
    };
    autoStart: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        timeData: {
            days: number;
            hours: number;
            minutes: number;
            seconds: number;
            milliseconds: number;
        };
        formattedTime: string;
    };
};
