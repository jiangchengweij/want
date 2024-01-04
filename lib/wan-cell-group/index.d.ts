import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly [];
export declare const props: {
    title: StringConstructor;
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    inset: BooleanConstructor;
    customClass: StringConstructor;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare const setup: () => {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
};
