import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    description: StringConstructor;
    image: {
        type: StringConstructor;
        default: string;
    };
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    imageUrl: import("@vue/reactivity").ComputedRef<string>;
};
