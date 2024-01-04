import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["click", "getuserinfo", "contact", "getphonenumber", "getrealtimephonenumber", "error", "launchapp", "opensetting", "agreeprivacyauthorization", "chooseavatar"];
export declare const props: {
    text: StringConstructor;
    dot: BooleanConstructor;
    info: StringConstructor;
    icon: StringConstructor;
    size: {
        type: StringConstructor;
    };
    color: StringConstructor;
    classPrefix: {
        type: StringConstructor;
        default: string;
    };
    disabled: BooleanConstructor;
    loading: BooleanConstructor;
    customClass: null;
    iconClass: null;
    infoClass: null;
    textClass: null;
    wrapClass: null;
    url: StringConstructor;
    linkType: {
        type: StringConstructor;
        default: string;
    };
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
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
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
