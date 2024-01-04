/// <reference types="@dcloudio/types" />
import { ComponentInternalInstance, ExtractPropTypes, PropType, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["select"];
export declare const props: {
    sticky: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    highlightColor: {
        type: StringConstructor;
        default: string;
    };
    stickyOffsetTop: {
        type: NumberConstructor;
        default: number;
    };
    indexList: {
        type: PropType<AnyObject>;
        default: string[];
    };
    webOffsetTop: {
        type: null;
        default: number;
    };
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(this: ComponentInternalInstance & AnyObject, props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        activeAnchorIndex: null;
        showSidebar: boolean;
    };
    onClick: (index: number) => void;
    onTouchMove: (event: any) => void;
    onTouchStop: () => void;
};
