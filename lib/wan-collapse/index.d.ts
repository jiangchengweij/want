import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["update:modelValue", "open", "close", "change"];
export declare const props: {
    modelValue: {
        type: null;
        required: boolean;
    };
    accordion: {
        type: BooleanConstructor;
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
};
