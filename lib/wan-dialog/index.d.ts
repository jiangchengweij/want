import { ComponentInternalInstance, ExtractPropTypes, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
export declare const emits: readonly ["getuserinfo", "contact", "getphonenumber", "getrealtimephonenumber", "error", "launchapp", "opensetting", "agreeprivacyauthorization", "chooseavatar", "click", "close", "confirm", "cancel"];
export declare const props: {
    show: {
        type: BooleanConstructor;
    };
    title: StringConstructor;
    message: StringConstructor;
    theme: {
        type: StringConstructor;
        default: string;
    };
    className: StringConstructor;
    customStyle: (ObjectConstructor | StringConstructor)[];
    asyncClose: BooleanConstructor;
    messageAlign: StringConstructor;
    beforeClose: null;
    overlayStyle: StringConstructor;
    useSlot: BooleanConstructor;
    useTitleSlot: BooleanConstructor;
    useConfirmButtonSlot: BooleanConstructor;
    useCancelButtonSlot: BooleanConstructor;
    showCancelButton: BooleanConstructor;
    closeOnClickOverlay: BooleanConstructor;
    confirmButtonOpenType: StringConstructor;
    width: null;
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    confirmButtonText: {
        type: StringConstructor;
        default: string;
    };
    cancelButtonText: {
        type: StringConstructor;
        default: string;
    };
    confirmButtonColor: {
        type: StringConstructor;
        default: string;
    };
    cancelButtonColor: {
        type: StringConstructor;
        default: string;
    };
    showConfirmButton: {
        type: BooleanConstructor;
        default: boolean;
    };
    overlay: {
        type: BooleanConstructor;
        default: boolean;
    };
    transition: {
        type: StringConstructor;
        default: string;
    };
    customClass: null;
    cancelButtonClass: null;
    confirmButtonClass: null;
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
export type Action = 'confirm' | 'cancel' | 'overlay';
export declare function setup(this: ComponentInternalInstance, props: Props, context: Context): {
    options: {
        show: boolean;
        title: string | undefined;
        width: any;
        theme: string;
        message: string | undefined;
        zIndex: number;
        overlay: boolean;
        className: string | undefined;
        asyncClose: boolean;
        beforeClose: any;
        transition: string;
        customStyle: string | Record<string, any> | undefined;
        messageAlign: string | undefined;
        overlayStyle: string | undefined;
        confirmButtonText: string;
        cancelButtonText: string;
        showConfirmButton: boolean;
        showCancelButton: boolean;
        closeOnClickOverlay: boolean;
        confirmButtonOpenType: string | undefined;
        loading: {
            confirm: boolean;
            cancel: boolean;
        };
        callback: (action: string, ref: any) => void;
    };
    onConfirm: () => void;
    onCancel: () => void;
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
