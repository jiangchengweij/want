import { ComponentInternalInstance, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
type SliderValue = number | [number, number];
export declare const emits: readonly ["update:modelValue", "change", "drag", "drag-end", "drag-start"];
export declare const props: {
    range: BooleanConstructor;
    disabled: BooleanConstructor;
    useButtonSlot: BooleanConstructor;
    activeColor: StringConstructor;
    inactiveColor: StringConstructor;
    max: {
        type: NumberConstructor;
        default: number;
    };
    min: {
        type: NumberConstructor;
        default: number;
    };
    step: {
        type: NumberConstructor;
        default: number;
    };
    modelValue: {
        type: null;
        default: number;
    };
    vertical: BooleanConstructor;
    barHeight: null;
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance, props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        innerValue: SliderValue;
        wrapperStyle: AnyObject;
        barStyle: string;
    };
    onTouchStart: (event: TouchEvent, index?: number) => void;
    onTouchMove: (event: TouchEvent) => void;
    onTouchEnd: () => void;
    onClick: (event: TouchEvent) => void;
};
export {};
