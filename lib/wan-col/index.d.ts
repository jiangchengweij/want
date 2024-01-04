import { type ExtractPropTypes, type SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    span: (StringConstructor | NumberConstructor)[];
    offset: (StringConstructor | NumberConstructor)[];
    customClass: StringConstructor;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare const setup: (props: Props, context: Context) => {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    onClick: (event: any) => void;
    rootStyle: import("@vue/reactivity").ComputedRef<"" | {
        paddingRight: string | undefined;
        paddingLeft: string | undefined;
    }>;
};
