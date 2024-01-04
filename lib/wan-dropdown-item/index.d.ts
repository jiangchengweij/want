import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["update:modelValue", "open", "opened", "close", "closed", "change", "before-toggle"];
export declare const props: {
    modelValue: {
        type: null;
    };
    title: {
        type: StringConstructor;
    };
    disabled: BooleanConstructor;
    titleClass: {
        type: StringConstructor;
    };
    options: {
        type: ArrayConstructor;
        default: () => never[];
    };
    popupStyle: StringConstructor;
    useBeforeToggle: {
        type: BooleanConstructor;
        default: boolean;
    };
    index: NumberConstructor;
    customClass: null;
    itemTitleClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    curIndex: import("@vue/reactivity").ComputedRef<number>;
    state: {
        transition: boolean;
        showPopup: boolean;
        showWrapper: boolean;
        displayTitle: string;
        direction: null;
        duration: number;
        overlay: null;
        activeColor: null;
        closeOnClickOverlay: null;
        safeAreaTabBar: boolean;
        wrapperStyle: {};
    };
    toggle: (show?: boolean, options?: {
        immediate?: boolean;
    }) => void;
    onOpen: () => void;
    onOpened: () => void;
    onClose: () => void;
    onClosed: () => void;
    onOptionTap: (option: any) => void;
};
