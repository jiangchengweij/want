import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click"];
export declare const props: {
    tag: StringConstructor;
    num: StringConstructor;
    desc: StringConstructor;
    thumb: StringConstructor;
    title: StringConstructor;
    price: {
        type: StringConstructor;
        default: string;
    };
    centered: BooleanConstructor;
    lazyLoad: BooleanConstructor;
    thumbLink: StringConstructor;
    originPrice: StringConstructor;
    thumbMode: {
        type: StringConstructor;
        default: string;
    };
    currency: {
        type: StringConstructor;
        default: string;
    };
    customClass: null;
    numClass: null;
    descClass: null;
    thumbClass: null;
    titleClass: null;
    priceClass: null;
    originPriceClass: null;
    url: StringConstructor;
    linkType: {
        type: StringConstructor;
        default: string;
    };
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        integerStr: string;
        decimalStr: string;
    };
    onClickThumb: () => void;
};
