import { type ExtractPropTypes, type SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    dot: BooleanConstructor;
    info: StringConstructor;
    size: (StringConstructor | NumberConstructor)[];
    color: StringConstructor;
    customStyle: null;
    classPrefix: {
        type: StringConstructor;
        default: string;
    };
    name: StringConstructor;
    customClass: null;
    infoClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare const setup: (props: Props, context: Context) => {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    rootClass: import("@vue/reactivity").ComputedRef<string>;
    rootStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    isImage: (name?: string) => boolean | "" | undefined;
    onClick: () => void;
};
