import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click", "change"];
export declare const props: {
    dot: BooleanConstructor;
    badge: null;
    info: null;
    title: StringConstructor;
    disabled: BooleanConstructor;
    index: NumberConstructor;
    customClass: null;
    activeClass: null;
    disabledClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        selected: boolean;
    };
    onClick: () => void;
};
