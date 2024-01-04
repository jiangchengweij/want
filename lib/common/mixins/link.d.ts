import type { ExtractPropTypes } from 'vue';
export declare const linkProps: {
    url: StringConstructor;
    linkType: {
        type: StringConstructor;
        default: string;
    };
};
export type LinkProps = ExtractPropTypes<typeof linkProps>;
export declare function linkSetup({ props }: {
    props: LinkProps;
}): {
    jumpLink: (url?: any) => void;
};
