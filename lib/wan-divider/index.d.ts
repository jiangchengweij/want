import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    dashed: BooleanConstructor;
    hairline: BooleanConstructor;
    contentPosition: StringConstructor;
    fontSize: StringConstructor;
    borderColor: StringConstructor;
    textColor: StringConstructor;
    customStyle: null;
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    rootStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
};
