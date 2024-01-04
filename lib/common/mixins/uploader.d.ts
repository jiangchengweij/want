export declare const imageProps: {
    sizeType: {
        type: ArrayConstructor;
        default: string[];
    };
    capture: {
        type: ArrayConstructor;
        default: string[];
    };
    showmenu: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export declare const videoProps: {
    capture: {
        type: ArrayConstructor;
        default: string[];
    };
    compressed: {
        type: BooleanConstructor;
        default: boolean;
    };
    maxDuration: {
        type: NumberConstructor;
        default: number;
    };
    camera: {
        type: StringConstructor;
        default: string;
    };
};
export declare const mediaProps: {
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
};
export declare const messageFileProps: {
    extension: {
        type: null;
        default: string;
    };
};
