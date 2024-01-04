import { ExtractPropTypes, PropType, SetupContext } from 'vue';
import { bem, addUnit, style } from '../common/utils';
import { File } from '../common/utils/file';
export declare const emits: readonly ["error", "before-read", "oversize", "after-read", "delete", "click-preview"];
export declare const props: {
    disabled: BooleanConstructor;
    multiple: BooleanConstructor;
    uploadText: StringConstructor;
    useBeforeRead: BooleanConstructor;
    afterRead: null;
    beforeRead: null;
    previewSize: {
        type: null;
        default: number;
    };
    name: {
        type: null;
        default: string;
    };
    accept: {
        type: StringConstructor;
        default: string;
    };
    fileList: {
        type: PropType<File[]>;
        default: () => never[];
    };
    maxSize: {
        type: NumberConstructor;
        default: number;
    };
    maxCount: {
        type: NumberConstructor;
        default: number;
    };
    deletable: {
        type: BooleanConstructor;
        default: boolean;
    };
    showUpload: {
        type: BooleanConstructor;
        default: boolean;
    };
    previewImage: {
        type: BooleanConstructor;
        default: boolean;
    };
    previewFullImage: {
        type: BooleanConstructor;
        default: boolean;
    };
    videoFit: {
        type: StringConstructor;
        default: string;
    };
    imageFit: {
        type: StringConstructor;
        default: string;
    };
    uploadIcon: {
        type: StringConstructor;
        default: string;
    };
    customClass: null;
    extension: {
        type: null;
        default: string;
    };
    capture: {
        type: ArrayConstructor;
        default: string[];
    };
    mediaType: {
        type: ArrayConstructor;
        default: string[];
    };
    maxDuration: {
        type: NumberConstructor;
        default: number;
    };
    camera: {
        type: StringConstructor;
        default: string;
    };
    compressed: {
        type: BooleanConstructor;
        default: boolean;
    };
    sizeType: {
        type: ArrayConstructor;
        default: string[];
    };
    showmenu: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export type Props = ExtractPropTypes<typeof props>;
export type Context = SetupContext<CanWrite<typeof emits>>;
export declare function setup(props: Props, context: Context): {
    bem: typeof bem;
    style: typeof style;
    addUnit: typeof addUnit;
    state: {
        lists: {
            url: string;
            size?: number | undefined;
            name?: string | undefined;
            type: string;
            duration?: number | undefined;
            time?: number | undefined;
            isImage?: boolean | undefined;
            isVideo?: boolean | undefined;
            deletable?: boolean | undefined;
        }[];
        isInCount: boolean;
    };
    sizeStyle: import("@vue/reactivity").ComputedRef<Record<string, string>>;
    startUpload: () => void;
    deleteItem: (index: number) => void;
    onPreviewImage: (index: number) => void;
    onPreviewVideo: (index: number) => void;
    onPreviewFile: (index: number) => void;
    onClickPreview: (index: number) => void;
};
