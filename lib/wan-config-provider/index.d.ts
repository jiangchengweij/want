import { type ExtractPropTypes, type SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    themeVars: {
        type: ObjectConstructor;
        default: () => void;
    };
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare const setup: (props: Props) => {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    mapThemeVarsToCSSVars: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    kebabCase: (word: string) => string;
};
