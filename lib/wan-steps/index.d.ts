import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click-step"];
export declare const props: {
    icon: StringConstructor;
    steps: {
        type: ArrayConstructor;
        default: () => never[];
    };
    active: {
        type: NumberConstructor;
        default: number;
    };
    direction: {
        type: StringConstructor;
        default: string;
    };
    activeColor: {
        type: StringConstructor;
        default: string;
    };
    inactiveColor: {
        type: StringConstructor;
        default: string;
    };
    activeIcon: {
        type: StringConstructor;
        default: string;
    };
    inactiveIcon: StringConstructor;
    descClass: null;
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    onClick: (index: number) => void;
    get: (index: number, active: number) => "finish" | "process" | "inactive";
};
