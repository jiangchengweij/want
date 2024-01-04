import { type ExtractPropTypes, type SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    gutter: (StringConstructor | NumberConstructor)[];
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare const setup: (props: Props, context: Context) => {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    rootStyle: import("@vue/reactivity").ComputedRef<{
        marginRight: string | undefined;
        marginLeft: string | undefined;
    }>;
    onClick: (event: any) => void;
};
