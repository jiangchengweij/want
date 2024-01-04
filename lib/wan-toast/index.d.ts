import { ComponentInternalInstance, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    show: BooleanConstructor;
    mask: BooleanConstructor;
    message: StringConstructor;
    forbidClick: BooleanConstructor;
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    loadingType: {
        type: StringConstructor;
        default: string;
    };
    position: {
        type: StringConstructor;
        default: string;
    };
    top: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance, props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    noop: () => void;
    options: {
        show?: boolean | undefined;
        type?: string | undefined;
        mask?: boolean | undefined;
        zIndex?: number | undefined;
        position?: string | undefined;
        duration?: number | undefined;
        selector?: string | undefined;
        forbidClick?: boolean | undefined;
        loadingType?: string | undefined;
        message?: string | number | undefined;
        onClose?: (() => void) | undefined;
    };
};
