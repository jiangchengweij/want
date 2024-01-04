import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["update:modelValue", "change"];
export declare const props: {
    modelValue: {
        type: null;
    };
    direction: StringConstructor;
    disabled: {
        type: BooleanConstructor;
    };
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
};
