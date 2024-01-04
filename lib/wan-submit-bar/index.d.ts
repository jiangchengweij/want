import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["submit"];
export declare const props: {
    tip: {
        type: null;
    };
    tipIcon: StringConstructor;
    type: NumberConstructor;
    price: {
        type: null;
    };
    label: StringConstructor;
    loading: BooleanConstructor;
    disabled: BooleanConstructor;
    buttonText: StringConstructor;
    currency: {
        type: StringConstructor;
        default: string;
    };
    buttonType: {
        type: StringConstructor;
        default: string;
    };
    decimalLength: {
        type: NumberConstructor;
        default: number;
    };
    suffixLabel: StringConstructor;
    safeAreaInsetBottom: {
        type: BooleanConstructor;
        default: boolean;
    };
    barClass: null;
    priceClass: null;
    buttonClass: null;
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        hasTip: boolean;
        hasPrice: boolean;
        integerStr: boolean | string;
        decimalStr: boolean | string;
    };
    onSubmit: (event: any) => void;
};
