import { ExtractPropTypes, SetupContext } from 'vue';
import { bem, style, addUnit } from '../common/utils';
export declare const emits: readonly ["click", "getuserinfo", "contact", "getphonenumber", "getrealtimephonenumber", "error", "launchapp", "opensetting", "agreeprivacyauthorization", "chooseavatar"];
export declare const props: {
    formType: StringConstructor;
    icon: StringConstructor;
    classPrefix: {
        type: StringConstructor;
        default: string;
    };
    plain: BooleanConstructor;
    block: BooleanConstructor;
    round: BooleanConstructor;
    square: BooleanConstructor;
    loading: BooleanConstructor;
    hairline: BooleanConstructor;
    disabled: BooleanConstructor;
    loadingText: StringConstructor;
    loadingType: {
        type: StringConstructor;
        default: string;
    };
    type: {
        type: StringConstructor;
        default: string;
    };
    dataset: null;
    size: {
        type: StringConstructor;
        default: string;
    };
    loadingSize: {
        type: StringConstructor;
        default: string;
    };
    color: StringConstructor;
    customStyle: (ObjectConstructor | StringConstructor)[];
    loadingClass: StringConstructor;
    customClass: StringConstructor;
    hoverClass: StringConstructor;
    id: StringConstructor;
    lang: StringConstructor;
    businessId: NumberConstructor;
    sessionFrom: StringConstructor;
    sendMessageTitle: StringConstructor;
    sendMessagePath: StringConstructor;
    sendMessageImg: StringConstructor;
    showMessageCard: BooleanConstructor;
    appParameter: StringConstructor;
    ariaLabel: StringConstructor;
    openType: StringConstructor;
    getUserProfileDesc: StringConstructor;
};
type Props = ExtractPropTypes<typeof props>;
type Context = SetupContext<CanWrite<typeof emits>>;
export declare const setup: (props: Props, context: Context) => {
    rootStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    loadingColor: import("@vue/reactivity").ComputedRef<string>;
    onClick: (event: any) => void;
    onGetUserInfo(event: any): void;
    onContact(event: any): void;
    onGetPhoneNumber(event: any): void;
    onGetRealTimePhoneNumber(event: any): void;
    onError(event: any): void;
    onLaunchApp(event: any): void;
    onOpenSetting(event: any): void;
    onAgreePrivacyAuthorization(event: any): void;
    onChooseAvatar(event: any): void;
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
};
export {};
