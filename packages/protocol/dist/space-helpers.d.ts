import type { Space, SpaceContentEntry, SpaceCardData, SpaceContentTab, SpaceContentFormat, SpaceContentModel, SpaceExtensionTab, SpaceMarkdownData, SpaceTableData, SpaceTab, SpaceUiState } from './schemas';
type SpaceNormalizedTabs = [SpaceContentTab, ...SpaceExtensionTab[]];
export declare function getSpaceContentIntegrityFingerprint(content: Pick<SpaceContentModel, 'entries' | 'markdownRepresentation' | 'tableRepresentation' | 'cardRepresentation'> | SpaceContentModel): string;
export declare function synchronizeSpaceContentModel(options?: {
    currentContent?: SpaceContentModel | null;
    activeView?: SpaceContentFormat;
    sourceView?: SpaceContentFormat;
    contentData?: unknown;
    content?: unknown;
}): SpaceContentModel;
export declare function isSpaceContentSynchronized(content: SpaceContentModel): boolean;
export declare function isSpaceContentMeaningful(content: SpaceContentModel): boolean;
export declare function createDefaultSpaceContentModel(format?: SpaceContentFormat): {
    entries: {
        id: string;
        metadata: Record<string, unknown>;
        card: {
            links: {
                label: string;
                kind: "map" | "website" | "place" | "booking" | "menu" | "email" | "other";
                url: string;
            }[];
            id: string;
            title: string;
            metadata: {
                value: string;
                label: string;
                link?: {
                    label: string;
                    kind: "map" | "website" | "place" | "booking" | "menu" | "email" | "other";
                    url: string;
                } | undefined;
            }[];
            badges: string[];
            eyebrow?: string | undefined;
            description?: string | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
            } | undefined;
        };
        md: string;
        row: Record<string, string | number | boolean | {
            kind: "link" | "text" | "email";
            href?: string | undefined;
            text?: string | undefined;
            imageUrl?: string | undefined;
            imageAlt?: string | undefined;
        } | null>;
        source?: {
            kind: string;
            metadata: Record<string, unknown>;
            integration: string;
            resourceId: string;
            label?: string | undefined;
        } | undefined;
    }[];
    activeView: "table" | "card" | "markdown";
    markdownRepresentation: {
        markdown: string;
    };
    tableRepresentation: {
        columns: {
            label: string;
            id: string;
            emphasis: "status" | "none" | "primary";
            presentation: "link" | "text" | "email" | "image";
        }[];
        rows: Record<string, string | number | boolean | {
            kind: "link" | "text" | "email";
            href?: string | undefined;
            text?: string | undefined;
            imageUrl?: string | undefined;
            imageAlt?: string | undefined;
        } | null>[];
        emptyMessage?: string | undefined;
    };
    cardRepresentation: {
        cards: {
            links: {
                label: string;
                kind: "map" | "website" | "place" | "booking" | "menu" | "email" | "other";
                url: string;
            }[];
            id: string;
            title: string;
            metadata: {
                value: string;
                label: string;
                link?: {
                    label: string;
                    kind: "map" | "website" | "place" | "booking" | "menu" | "email" | "other";
                    url: string;
                } | undefined;
            }[];
            badges: string[];
            eyebrow?: string | undefined;
            description?: string | undefined;
            image?: {
                url: string;
                alt?: string | undefined;
            } | undefined;
        }[];
        emptyMessage?: string | undefined;
    };
    sync: {
        syncVersion: number;
        sourceView: "table" | "card" | "markdown";
        fingerprint: string;
        entryCount: number;
    };
};
export declare function createDefaultSpaceTabs(format?: SpaceContentFormat): SpaceNormalizedTabs;
export declare function getSpaceContentTab(input: Pick<Space, 'tabs'> | SpaceTab[]): SpaceContentTab;
export declare function getSpaceContentActiveView(input: Pick<Space, 'tabs'> | SpaceTab[]): "table" | "card" | "markdown";
export declare function getSpaceContentFormat(input: Pick<Space, 'tabs'> | SpaceTab[]): "table" | "card" | "markdown";
export declare function getSpaceContentEntries(input: Pick<Space, 'tabs'> | SpaceTab[] | SpaceContentTab): {
    id: string;
    metadata: Record<string, unknown>;
    card: {
        links: {
            label: string;
            kind: "map" | "website" | "place" | "booking" | "menu" | "email" | "other";
            url: string;
        }[];
        id: string;
        title: string;
        metadata: {
            value: string;
            label: string;
            link?: {
                label: string;
                kind: "map" | "website" | "place" | "booking" | "menu" | "email" | "other";
                url: string;
            } | undefined;
        }[];
        badges: string[];
        eyebrow?: string | undefined;
        description?: string | undefined;
        image?: {
            url: string;
            alt?: string | undefined;
        } | undefined;
    };
    md: string;
    row: Record<string, string | number | boolean | {
        kind: "link" | "text" | "email";
        href?: string | undefined;
        text?: string | undefined;
        imageUrl?: string | undefined;
        imageAlt?: string | undefined;
    } | null>;
    source?: {
        kind: string;
        metadata: Record<string, unknown>;
        integration: string;
        resourceId: string;
        label?: string | undefined;
    } | undefined;
}[];
export declare function replaceSpaceContentEntries(input: Pick<Space, 'tabs'> | SpaceTab[], entries: SpaceContentEntry[]): [{
    content: {
        entries: {
            id: string;
            metadata: Record<string, unknown>;
            card: {
                links: {
                    label: string;
                    kind: "map" | "website" | "place" | "booking" | "menu" | "email" | "other";
                    url: string;
                }[];
                id: string;
                title: string;
                metadata: {
                    value: string;
                    label: string;
                    link?: {
                        label: string;
                        kind: "map" | "website" | "place" | "booking" | "menu" | "email" | "other";
                        url: string;
                    } | undefined;
                }[];
                badges: string[];
                eyebrow?: string | undefined;
                description?: string | undefined;
                image?: {
                    url: string;
                    alt?: string | undefined;
                } | undefined;
            };
            md: string;
            row: Record<string, string | number | boolean | {
                kind: "link" | "text" | "email";
                href?: string | undefined;
                text?: string | undefined;
                imageUrl?: string | undefined;
                imageAlt?: string | undefined;
            } | null>;
            source?: {
                kind: string;
                metadata: Record<string, unknown>;
                integration: string;
                resourceId: string;
                label?: string | undefined;
            } | undefined;
        }[];
        activeView: "table" | "card" | "markdown";
        markdownRepresentation: {
            markdown: string;
        };
        tableRepresentation: {
            columns: {
                label: string;
                id: string;
                emphasis: "status" | "none" | "primary";
                presentation: "link" | "text" | "email" | "image";
            }[];
            rows: Record<string, string | number | boolean | {
                kind: "link" | "text" | "email";
                href?: string | undefined;
                text?: string | undefined;
                imageUrl?: string | undefined;
                imageAlt?: string | undefined;
            } | null>[];
            emptyMessage?: string | undefined;
        };
        cardRepresentation: {
            cards: {
                links: {
                    label: string;
                    kind: "map" | "website" | "place" | "booking" | "menu" | "email" | "other";
                    url: string;
                }[];
                id: string;
                title: string;
                metadata: {
                    value: string;
                    label: string;
                    link?: {
                        label: string;
                        kind: "map" | "website" | "place" | "booking" | "menu" | "email" | "other";
                        url: string;
                    } | undefined;
                }[];
                badges: string[];
                eyebrow?: string | undefined;
                description?: string | undefined;
                image?: {
                    url: string;
                    alt?: string | undefined;
                } | undefined;
            }[];
            emptyMessage?: string | undefined;
        };
        sync: {
            syncVersion: number;
            sourceView: "table" | "card" | "markdown";
            fingerprint: string;
            entryCount: number;
        };
    };
    label: string;
    kind: "content";
    id: "content";
    metadata: Record<string, unknown>;
}, ...{
    label: string;
    kind: string;
    id: string;
    metadata: Record<string, unknown>;
    data: Record<string, unknown>;
}[]];
export declare function removeSpaceContentEntries(input: Pick<Space, 'tabs'> | SpaceTab[], entryIds: string[]): ({
    label: string;
    kind: "content";
    id: "content";
    metadata: Record<string, unknown>;
    content: {
        entries: {
            id: string;
            metadata: Record<string, unknown>;
            card: {
                links: {
                    label: string;
                    kind: "map" | "website" | "place" | "booking" | "menu" | "email" | "other";
                    url: string;
                }[];
                id: string;
                title: string;
                metadata: {
                    value: string;
                    label: string;
                    link?: {
                        label: string;
                        kind: "map" | "website" | "place" | "booking" | "menu" | "email" | "other";
                        url: string;
                    } | undefined;
                }[];
                badges: string[];
                eyebrow?: string | undefined;
                description?: string | undefined;
                image?: {
                    url: string;
                    alt?: string | undefined;
                } | undefined;
            };
            md: string;
            row: Record<string, string | number | boolean | {
                kind: "link" | "text" | "email";
                href?: string | undefined;
                text?: string | undefined;
                imageUrl?: string | undefined;
                imageAlt?: string | undefined;
            } | null>;
            source?: {
                kind: string;
                metadata: Record<string, unknown>;
                integration: string;
                resourceId: string;
                label?: string | undefined;
            } | undefined;
        }[];
        activeView: "table" | "card" | "markdown";
        markdownRepresentation: {
            markdown: string;
        };
        tableRepresentation: {
            columns: {
                label: string;
                id: string;
                emphasis: "status" | "none" | "primary";
                presentation: "link" | "text" | "email" | "image";
            }[];
            rows: Record<string, string | number | boolean | {
                kind: "link" | "text" | "email";
                href?: string | undefined;
                text?: string | undefined;
                imageUrl?: string | undefined;
                imageAlt?: string | undefined;
            } | null>[];
            emptyMessage?: string | undefined;
        };
        cardRepresentation: {
            cards: {
                links: {
                    label: string;
                    kind: "map" | "website" | "place" | "booking" | "menu" | "email" | "other";
                    url: string;
                }[];
                id: string;
                title: string;
                metadata: {
                    value: string;
                    label: string;
                    link?: {
                        label: string;
                        kind: "map" | "website" | "place" | "booking" | "menu" | "email" | "other";
                        url: string;
                    } | undefined;
                }[];
                badges: string[];
                eyebrow?: string | undefined;
                description?: string | undefined;
                image?: {
                    url: string;
                    alt?: string | undefined;
                } | undefined;
            }[];
            emptyMessage?: string | undefined;
        };
        sync: {
            syncVersion: number;
            sourceView: "table" | "card" | "markdown";
            fingerprint: string;
            entryCount: number;
        };
    };
} | {
    label: string;
    kind: string;
    id: string;
    metadata: Record<string, unknown>;
    data: Record<string, unknown>;
})[];
export declare function getSpaceContentViewData<TFormat extends SpaceContentFormat | undefined>(input: Pick<Space, 'tabs'> | SpaceTab[] | SpaceContentTab, format?: TFormat): TFormat extends "table" ? SpaceTableData : TFormat extends "card" ? SpaceCardData : TFormat extends "markdown" ? SpaceMarkdownData : SpaceTableData | SpaceCardData | SpaceMarkdownData;
export declare function normalizeSpaceUiState(uiState: Partial<SpaceUiState> | null | undefined): {
    activeTab: string;
};
export declare function normalizeSpaceTabs(options: {
    tabs?: unknown;
    contentFormat?: SpaceContentFormat;
    contentData?: Record<string, unknown>;
    currentSpace?: Pick<Space, 'tabs'> | null;
}): SpaceNormalizedTabs;
export declare function normalizeLegacySpaceTabs(legacyViewType: string | null | undefined, legacyData: Record<string, unknown> | null | undefined): SpaceNormalizedTabs;
export {};
