import { ComponentInternalInstance, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["open", "close", "click"];
export declare const props: {
    disabled: BooleanConstructor;
    leftWidth: {
        type: NumberConstructor;
        default: number;
    };
    rightWidth: {
        type: NumberConstructor;
        default: number;
    };
    asyncClose: BooleanConstructor;
    name: {
        type: null;
        default: string;
    };
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance, props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        catchMove: boolean;
        wrapperStyle: string;
    };
    startDrag: (event: TouchEvent) => void;
    onDrag: (event: TouchEvent) => void;
    endDrag: () => void;
    onClick: (position?: string) => void;
};
