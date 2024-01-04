import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    row: {
        type: NumberConstructor;
        default: number;
    };
    title: BooleanConstructor;
    avatar: BooleanConstructor;
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    animate: {
        type: BooleanConstructor;
        default: boolean;
    };
    avatarSize: {
        type: StringConstructor;
        default: string;
    };
    avatarShape: {
        type: StringConstructor;
        default: string;
    };
    titleWidth: {
        type: StringConstructor;
        default: string;
    };
    rowWidth: {
        type: null;
        default: string;
    };
    avatarClass: null;
    titleClass: null;
    rowClass: null;
    customClass: null;
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        isArray: boolean;
        rowArray: never[];
    };
};
