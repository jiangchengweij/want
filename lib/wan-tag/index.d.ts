import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["close", "click"];
export declare const props: {
    size: StringConstructor;
    mark: BooleanConstructor;
    color: StringConstructor;
    plain: BooleanConstructor;
    round: BooleanConstructor;
    textColor: StringConstructor;
    type: {
        type: StringConstructor;
        default: string;
    };
    closeable: BooleanConstructor;
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    rootStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    onClose: () => void;
    onClick: () => void;
};
