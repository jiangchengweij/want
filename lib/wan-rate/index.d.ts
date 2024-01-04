import { ComponentInternalInstance, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["update:modelValue", "change"];
export declare const props: {
    modelValue: {
        type: NumberConstructor;
    };
    readonly: BooleanConstructor;
    disabled: BooleanConstructor;
    allowHalf: BooleanConstructor;
    size: null;
    icon: {
        type: StringConstructor;
        default: string;
    };
    voidIcon: {
        type: StringConstructor;
        default: string;
    };
    color: StringConstructor;
    voidColor: StringConstructor;
    disabledColor: StringConstructor;
    count: {
        type: NumberConstructor;
        default: number;
    };
    gutter: null;
    touchable: {
        type: BooleanConstructor;
        default: boolean;
    };
    iconClass: null;
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance, props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        innerValue: number;
        innerCountArray: unknown[];
    };
    onSelect: (event: any) => void;
    onTouchMove: (event: TouchEvent) => void;
};
