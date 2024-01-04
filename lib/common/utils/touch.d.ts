export declare function useTouch(): {
    resetTouchStatus: () => void;
    touchStart: (event: any) => void;
    touchMove: (event: any) => void;
    touchVar: {
        direction: string;
        startX: number;
        startY: number;
        deltaX: number;
        deltaY: number;
        offsetX: number;
        offsetY: number;
    };
};
