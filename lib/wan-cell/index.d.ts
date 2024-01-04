import { type ExtractPropTypes, type SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    title: StringConstructor;
    value: (ObjectConstructor | StringConstructor | NumberConstructor)[];
    icon: StringConstructor;
    size: StringConstructor;
    label: StringConstructor;
    center: BooleanConstructor;
    isLink: BooleanConstructor;
    required: BooleanConstructor;
    clickable: BooleanConstructor;
    titleWidth: StringConstructor;
    customStyle: StringConstructor;
    arrowDirection: StringConstructor;
    useLabelSlot: BooleanConstructor;
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    titleStyle: StringConstructor;
    titleClass: (ArrayConstructor | StringConstructor)[];
    labelClass: (ArrayConstructor | StringConstructor)[];
    valueClass: (ArrayConstructor | StringConstructor)[];
    rightIconClass: (ArrayConstructor | StringConstructor)[];
    hoverClass: (ArrayConstructor | StringConstructor)[];
    customClass: null;
    url: StringConstructor;
    linkType: {
        type: StringConstructor;
        default: string;
    };
};
type Props = ExtractPropTypes<typeof props>;
type Context = SetupContext<CanWrite<typeof emits>>;
export declare const setup: (props: Props, context: Context) => {
    getTitleStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    onClick: (event: TouchEvent) => void;
    jumpLink: (url?: any) => void;
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
};
export {};
