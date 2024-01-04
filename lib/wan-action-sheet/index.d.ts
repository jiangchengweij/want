import type { ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["getuserinfo", "contact", "getphonenumber", "getrealtimephonenumber", "error", "launchapp", "opensetting", "agreeprivacyauthorization", "chooseavatar", "getuserinfo", "cancel", "close", "click-overlay", "select"];
export declare const props: {
    show: BooleanConstructor;
    title: StringConstructor;
    cancelText: StringConstructor;
    description: StringConstructor;
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    actions: {
        type: ArrayConstructor;
        default: never[];
    };
    overlay: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnClickOverlay: {
        type: BooleanConstructor;
        default: boolean;
    };
    closeOnClickAction: {
        type: BooleanConstructor;
        default: boolean;
    };
    safeAreaInsetBottom: {
        type: BooleanConstructor;
        default: boolean;
    };
    customClass: StringConstructor;
    listClass: (ArrayConstructor | StringConstructor)[];
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
    onSelect: (item: any) => void;
    onCancel: () => void;
    onClose: () => void;
    onClickOverlay: () => void;
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
