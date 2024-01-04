import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click-subtitle"];
export declare const props: {
    title: {
        type: StringConstructor;
        default: string;
    };
    subtitle: StringConstructor;
    showTitle: BooleanConstructor;
    showSubtitle: BooleanConstructor;
    firstDayOfWeek: {
        type: NumberConstructor;
    };
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        weekdays: string[];
    };
    onClickSubtitle: (event: any) => void;
};
