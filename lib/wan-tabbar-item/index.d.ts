import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click", "change"];
export declare const props: {
    info: null;
    name: null;
    icon: StringConstructor;
    dot: BooleanConstructor;
    url: {
        type: StringConstructor;
        default: string;
    };
    linkType: {
        type: StringConstructor;
        default: string;
    };
    iconPrefix: {
        type: StringConstructor;
        default: string;
    };
    index: NumberConstructor;
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        active: boolean;
        activeColor: string;
        inactiveColor: string;
    };
    onClick: () => any;
    updateFromParent: () => void;
};
