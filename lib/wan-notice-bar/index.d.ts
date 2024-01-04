import { ComponentInternalInstance, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["close", "click"];
export declare const props: {
    text: {
        type: StringConstructor;
        default: string;
    };
    mode: {
        type: StringConstructor;
        default: string;
    };
    url: {
        type: StringConstructor;
        default: string;
    };
    openType: {
        type: StringConstructor;
        default: string;
    };
    delay: {
        type: NumberConstructor;
        default: number;
    };
    speed: {
        type: NumberConstructor;
        default: number;
    };
    scrollable: null;
    leftIcon: {
        type: StringConstructor;
        default: string;
    };
    color: StringConstructor;
    backgroundColor: StringConstructor;
    background: StringConstructor;
    wrapable: BooleanConstructor;
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance, props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        show: boolean;
        animationData: null;
    };
    rootStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    onClickIcon: (event: any) => void;
    onClick: (event: TouchEvent) => void;
};
