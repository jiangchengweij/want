import { ExtractPropTypes, PropType, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click-item", "click-nav"];
export declare const props: {
    items: {
        type: PropType<AnyObject[]>;
        default: () => never[];
    };
    activeId: null;
    mainActiveIndex: {
        type: NumberConstructor;
        default: number;
    };
    height: {
        type: null;
        default: number;
    };
    max: {
        type: NumberConstructor;
        default: number;
    };
    selectedIcon: {
        type: StringConstructor;
        default: string;
    };
    mainItemClass: null;
    contentItemClass: null;
    mainActiveClass: null;
    contentActiveClass: null;
    mainDisabledClass: null;
    contentDisabledClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        subItems: AnyObject[];
    };
    isActive: import("@vue/reactivity").ComputedRef<(itemId: any) => boolean>;
    onSelectItem: (item: any) => void;
    onClickNav: (event: CustomEvent) => void;
};
