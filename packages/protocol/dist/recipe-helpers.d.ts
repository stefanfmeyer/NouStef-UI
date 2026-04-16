import type { Recipe, RecipeContentEntry, RecipeCardData, RecipeContentTab, RecipeContentFormat, RecipeContentModel, RecipeExtensionTab, RecipeMarkdownData, RecipeTableData, RecipeTab, RecipeUiState } from './schemas';
type RecipeNormalizedTabs = [RecipeContentTab, ...RecipeExtensionTab[]];
export declare function getRecipeContentIntegrityFingerprint(content: Pick<RecipeContentModel, 'entries' | 'markdownRepresentation' | 'tableRepresentation' | 'cardRepresentation'> | RecipeContentModel): string;
export declare function synchronizeRecipeContentModel(options?: {
    currentContent?: RecipeContentModel | null;
    activeView?: RecipeContentFormat;
    sourceView?: RecipeContentFormat;
    contentData?: unknown;
    content?: unknown;
}): RecipeContentModel;
export declare function isRecipeContentSynchronized(content: RecipeContentModel): boolean;
export declare function isRecipeContentMeaningful(content: RecipeContentModel): boolean;
export declare function createDefaultRecipeContentModel(format?: RecipeContentFormat): {
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
export declare function createDefaultRecipeTabs(format?: RecipeContentFormat): RecipeNormalizedTabs;
export declare function getRecipeContentTab(input: Pick<Recipe, 'tabs'> | RecipeTab[]): RecipeContentTab;
export declare function getRecipeContentActiveView(input: Pick<Recipe, 'tabs'> | RecipeTab[]): "table" | "card" | "markdown";
export declare function getRecipeContentFormat(input: Pick<Recipe, 'tabs'> | RecipeTab[]): "table" | "card" | "markdown";
export declare function getRecipeContentEntries(input: Pick<Recipe, 'tabs'> | RecipeTab[] | RecipeContentTab): {
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
export declare function replaceRecipeContentEntries(input: Pick<Recipe, 'tabs'> | RecipeTab[], entries: RecipeContentEntry[]): [{
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
export declare function removeRecipeContentEntries(input: Pick<Recipe, 'tabs'> | RecipeTab[], entryIds: string[]): ({
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
export declare function getRecipeContentViewData<TFormat extends RecipeContentFormat | undefined>(input: Pick<Recipe, 'tabs'> | RecipeTab[] | RecipeContentTab, format?: TFormat): TFormat extends "table" ? RecipeTableData : TFormat extends "card" ? RecipeCardData : TFormat extends "markdown" ? RecipeMarkdownData : RecipeTableData | RecipeCardData | RecipeMarkdownData;
export declare function normalizeRecipeUiState(uiState: Partial<RecipeUiState> | null | undefined): {
    activeTab: string;
};
export declare function normalizeRecipeTabs(options: {
    tabs?: unknown;
    contentFormat?: RecipeContentFormat;
    contentData?: Record<string, unknown>;
    currentRecipe?: Pick<Recipe, 'tabs'> | null;
}): RecipeNormalizedTabs;
export declare function normalizeLegacyRecipeTabs(legacyViewType: string | null | undefined, legacyData: Record<string, unknown> | null | undefined): RecipeNormalizedTabs;
export {};
