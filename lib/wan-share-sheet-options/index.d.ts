import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["select"];
export declare const props: {
    options: {
        type: ArrayConstructor;
        default: () => never[];
    };
    showBorder: BooleanConstructor;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    getIconURL: (icon: string) => string;
    onSelect: (index: number) => void;
};
