/// <reference types="@dcloudio/types" />
import { ExtractPropTypes, PropType, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare enum FieldName {
    TEXT = "text",
    VALUE = "value",
    CHILDREN = "children"
}
type Option = Record<string, string | AnyObject>;
export declare const emits: readonly ["change", "finish", "click-tab", "close"];
export declare const props: {
    title: StringConstructor;
    value: {
        type: StringConstructor;
    };
    placeholder: {
        type: StringConstructor;
        default: string;
    };
    activeColor: {
        type: StringConstructor;
        default: string;
    };
    options: {
        type: PropType<Option[]>;
        default: () => never[];
    };
    swipeable: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showHeader: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeIcon: {
        type: StringConstructor;
        default: string;
    };
    fieldNames: {
        type: ObjectConstructor;
        default: {
            text: FieldName;
            value: FieldName;
            children: FieldName;
        };
    };
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        tabs: {
            options: Option[];
            selected: Option | null;
        }[];
        activeTab: number;
        textKey: FieldName;
        valueKey: FieldName;
        childrenKey: FieldName;
        innerValue: string;
    };
    isSelected: (tab: any, valueKey: any, option: any) => any;
    optionClass: (tab: any, valueKey: any, option: any) => string;
    optionStyle: (data: any) => Record<string, string>;
    onClose: () => void;
    onClickTab: (e: any) => void;
    onSelect: (e: any) => void;
};
export {};
