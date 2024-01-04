import { type ExtractPropTypes } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const props: {
    color: StringConstructor;
    vertical: BooleanConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
    size: StringConstructor;
    textSize: StringConstructor;
    customClass: StringConstructor;
};
type Props = ExtractPropTypes<typeof props>;
export declare const setup: (props: Props) => {
    bem: typeof bem;
    addUnit: typeof addUnit;
    style: typeof style;
    array12: unknown[];
    spinnerStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
};
export {};
