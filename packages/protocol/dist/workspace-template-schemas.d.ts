import { z } from 'zod';
export declare const SPACE_TEMPLATE_IDS: readonly ["price-comparison-grid", "shopping-shortlist", "inbox-triage-board", "restaurant-finder", "hotel-shortlist", "flight-comparison", "travel-itinerary-planner", "research-notebook", "security-review-board", "vendor-evaluation-matrix", "event-planner", "job-search-pipeline", "content-campaign-planner", "local-discovery-comparison", "step-by-step-instructions"];
export declare const SpaceTemplateIdSchema: z.ZodEnum<["price-comparison-grid", "shopping-shortlist", "inbox-triage-board", "restaurant-finder", "hotel-shortlist", "flight-comparison", "travel-itinerary-planner", "research-notebook", "security-review-board", "vendor-evaluation-matrix", "event-planner", "job-search-pipeline", "content-campaign-planner", "local-discovery-comparison", "step-by-step-instructions"]>;
export type SpaceTemplateId = z.infer<typeof SpaceTemplateIdSchema>;
export declare const WorkspaceTemplateToneSchema: z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>;
export type WorkspaceTemplateTone = z.infer<typeof WorkspaceTemplateToneSchema>;
export declare const WorkspaceTemplateChipSchema: z.ZodObject<{
    label: z.ZodString;
    tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
}, "strict", z.ZodTypeAny, {
    label: string;
    tone: "neutral" | "accent" | "success" | "warning" | "danger";
}, {
    label: string;
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
}>;
export type WorkspaceTemplateChip = z.infer<typeof WorkspaceTemplateChipSchema>;
export declare const WorkspaceTemplateActionReferenceSchema: z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
    kind: z.ZodLiteral<"existing_action">;
    actionId: z.ZodString;
    selectedItemIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strict", z.ZodTypeAny, {
    kind: "existing_action";
    actionId: string;
    selectedItemIds: string[];
}, {
    kind: "existing_action";
    actionId: string;
    selectedItemIds?: string[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"link">;
    label: z.ZodString;
    href: z.ZodString;
    openInNewTab: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    label: string;
    kind: "link";
    href: string;
    openInNewTab: boolean;
}, {
    label: string;
    kind: "link";
    href: string;
    openInNewTab?: boolean | undefined;
}>]>;
export type WorkspaceTemplateActionReference = z.infer<typeof WorkspaceTemplateActionReferenceSchema>;
export declare const WorkspaceTemplateStatSchema: z.ZodObject<{
    label: z.ZodString;
    value: z.ZodString;
    helper: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
}, "strict", z.ZodTypeAny, {
    value: string;
    label: string;
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    helper?: string | undefined;
}, {
    value: string;
    label: string;
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    helper?: unknown;
}>;
export type WorkspaceTemplateStat = z.infer<typeof WorkspaceTemplateStatSchema>;
export declare const WorkspaceTemplateFieldLinkSchema: z.ZodObject<{
    label: z.ZodString;
    href: z.ZodString;
}, "strict", z.ZodTypeAny, {
    label: string;
    href: string;
}, {
    label: string;
    href: string;
}>;
export type WorkspaceTemplateFieldLink = z.infer<typeof WorkspaceTemplateFieldLinkSchema>;
export declare const WorkspaceTemplateFieldSchema: z.ZodObject<{
    label: z.ZodString;
    value: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    chips: z.ZodDefault<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
    }, "strict", z.ZodTypeAny, {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }, {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }>, "many">>;
    bullets: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    links: z.ZodDefault<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        href: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        label: string;
        href: string;
    }, {
        label: string;
        href: string;
    }>, "many">>;
    fullWidth: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    label: string;
    chips: {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }[];
    bullets: string[];
    links: {
        label: string;
        href: string;
    }[];
    fullWidth: boolean;
    value?: string | undefined;
}, {
    label: string;
    value?: unknown;
    chips?: {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }[] | undefined;
    bullets?: string[] | undefined;
    links?: {
        label: string;
        href: string;
    }[] | undefined;
    fullWidth?: boolean | undefined;
}>;
export type WorkspaceTemplateField = z.infer<typeof WorkspaceTemplateFieldSchema>;
export declare const WorkspaceTemplateListItemSchema: z.ZodObject<{
    id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    meta: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    chips: z.ZodDefault<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
    }, "strict", z.ZodTypeAny, {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }, {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }>, "many">>;
    actions: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
        kind: z.ZodLiteral<"existing_action">;
        actionId: z.ZodString;
        selectedItemIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strict", z.ZodTypeAny, {
        kind: "existing_action";
        actionId: string;
        selectedItemIds: string[];
    }, {
        kind: "existing_action";
        actionId: string;
        selectedItemIds?: string[] | undefined;
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"link">;
        label: z.ZodString;
        href: z.ZodString;
        openInNewTab: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        label: string;
        kind: "link";
        href: string;
        openInNewTab: boolean;
    }, {
        label: string;
        kind: "link";
        href: string;
        openInNewTab?: boolean | undefined;
    }>]>, "many">>;
}, "strict", z.ZodTypeAny, {
    chips: {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }[];
    title: string;
    actions: ({
        kind: "existing_action";
        actionId: string;
        selectedItemIds: string[];
    } | {
        label: string;
        kind: "link";
        href: string;
        openInNewTab: boolean;
    })[];
    id?: string | undefined;
    subtitle?: string | undefined;
    meta?: string | undefined;
}, {
    title: string;
    chips?: {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }[] | undefined;
    id?: unknown;
    subtitle?: unknown;
    meta?: unknown;
    actions?: ({
        kind: "existing_action";
        actionId: string;
        selectedItemIds?: string[] | undefined;
    } | {
        label: string;
        kind: "link";
        href: string;
        openInNewTab?: boolean | undefined;
    })[] | undefined;
}>;
export type WorkspaceTemplateListItem = z.infer<typeof WorkspaceTemplateListItemSchema>;
export declare const WorkspaceTemplateCardItemSchema: z.ZodObject<{
    id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    meta: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    imageLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    price: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    chips: z.ZodDefault<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
    }, "strict", z.ZodTypeAny, {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }, {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }>, "many">>;
    bullets: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    footer: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    actions: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
        kind: z.ZodLiteral<"existing_action">;
        actionId: z.ZodString;
        selectedItemIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strict", z.ZodTypeAny, {
        kind: "existing_action";
        actionId: string;
        selectedItemIds: string[];
    }, {
        kind: "existing_action";
        actionId: string;
        selectedItemIds?: string[] | undefined;
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"link">;
        label: z.ZodString;
        href: z.ZodString;
        openInNewTab: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        label: string;
        kind: "link";
        href: string;
        openInNewTab: boolean;
    }, {
        label: string;
        kind: "link";
        href: string;
        openInNewTab?: boolean | undefined;
    }>]>, "many">>;
}, "strict", z.ZodTypeAny, {
    chips: {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }[];
    bullets: string[];
    title: string;
    actions: ({
        kind: "existing_action";
        actionId: string;
        selectedItemIds: string[];
    } | {
        label: string;
        kind: "link";
        href: string;
        openInNewTab: boolean;
    })[];
    id?: string | undefined;
    subtitle?: string | undefined;
    meta?: string | undefined;
    imageLabel?: string | undefined;
    price?: string | undefined;
    footer?: string | undefined;
}, {
    title: string;
    chips?: {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }[] | undefined;
    bullets?: string[] | undefined;
    id?: unknown;
    subtitle?: unknown;
    meta?: unknown;
    actions?: ({
        kind: "existing_action";
        actionId: string;
        selectedItemIds?: string[] | undefined;
    } | {
        label: string;
        kind: "link";
        href: string;
        openInNewTab?: boolean | undefined;
    })[] | undefined;
    imageLabel?: unknown;
    price?: unknown;
    footer?: unknown;
}>;
export type WorkspaceTemplateCardItem = z.infer<typeof WorkspaceTemplateCardItemSchema>;
export declare const WorkspaceTemplateTimelineItemSchema: z.ZodObject<{
    id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    title: z.ZodString;
    time: z.ZodString;
    summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    chips: z.ZodDefault<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
    }, "strict", z.ZodTypeAny, {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }, {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }>, "many">>;
    actions: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
        kind: z.ZodLiteral<"existing_action">;
        actionId: z.ZodString;
        selectedItemIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strict", z.ZodTypeAny, {
        kind: "existing_action";
        actionId: string;
        selectedItemIds: string[];
    }, {
        kind: "existing_action";
        actionId: string;
        selectedItemIds?: string[] | undefined;
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"link">;
        label: z.ZodString;
        href: z.ZodString;
        openInNewTab: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        label: string;
        kind: "link";
        href: string;
        openInNewTab: boolean;
    }, {
        label: string;
        kind: "link";
        href: string;
        openInNewTab?: boolean | undefined;
    }>]>, "many">>;
}, "strict", z.ZodTypeAny, {
    chips: {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }[];
    title: string;
    actions: ({
        kind: "existing_action";
        actionId: string;
        selectedItemIds: string[];
    } | {
        label: string;
        kind: "link";
        href: string;
        openInNewTab: boolean;
    })[];
    time: string;
    id?: string | undefined;
    summary?: string | undefined;
}, {
    title: string;
    time: string;
    chips?: {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }[] | undefined;
    id?: unknown;
    actions?: ({
        kind: "existing_action";
        actionId: string;
        selectedItemIds?: string[] | undefined;
    } | {
        label: string;
        kind: "link";
        href: string;
        openInNewTab?: boolean | undefined;
    })[] | undefined;
    summary?: unknown;
}>;
export type WorkspaceTemplateTimelineItem = z.infer<typeof WorkspaceTemplateTimelineItemSchema>;
export declare const WorkspaceTemplateActivityItemSchema: z.ZodObject<{
    id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    label: z.ZodString;
    detail: z.ZodString;
    timestamp: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
}, "strict", z.ZodTypeAny, {
    label: string;
    detail: string;
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    id?: string | undefined;
    timestamp?: string | undefined;
}, {
    label: string;
    detail: string;
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    id?: unknown;
    timestamp?: unknown;
}>;
export type WorkspaceTemplateActivityItem = z.infer<typeof WorkspaceTemplateActivityItemSchema>;
export declare const WorkspaceTemplateBoardCardSchema: z.ZodObject<{
    id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    chips: z.ZodDefault<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
    }, "strict", z.ZodTypeAny, {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }, {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }>, "many">>;
    footer: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    actions: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
        kind: z.ZodLiteral<"existing_action">;
        actionId: z.ZodString;
        selectedItemIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strict", z.ZodTypeAny, {
        kind: "existing_action";
        actionId: string;
        selectedItemIds: string[];
    }, {
        kind: "existing_action";
        actionId: string;
        selectedItemIds?: string[] | undefined;
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"link">;
        label: z.ZodString;
        href: z.ZodString;
        openInNewTab: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        label: string;
        kind: "link";
        href: string;
        openInNewTab: boolean;
    }, {
        label: string;
        kind: "link";
        href: string;
        openInNewTab?: boolean | undefined;
    }>]>, "many">>;
}, "strict", z.ZodTypeAny, {
    chips: {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }[];
    title: string;
    actions: ({
        kind: "existing_action";
        actionId: string;
        selectedItemIds: string[];
    } | {
        label: string;
        kind: "link";
        href: string;
        openInNewTab: boolean;
    })[];
    id?: string | undefined;
    subtitle?: string | undefined;
    footer?: string | undefined;
}, {
    title: string;
    chips?: {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }[] | undefined;
    id?: unknown;
    subtitle?: unknown;
    actions?: ({
        kind: "existing_action";
        actionId: string;
        selectedItemIds?: string[] | undefined;
    } | {
        label: string;
        kind: "link";
        href: string;
        openInNewTab?: boolean | undefined;
    })[] | undefined;
    footer?: unknown;
}>;
export type WorkspaceTemplateBoardCard = z.infer<typeof WorkspaceTemplateBoardCardSchema>;
export declare const WorkspaceTemplateBoardColumnSchema: z.ZodObject<{
    id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    label: z.ZodString;
    tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
    cards: z.ZodDefault<z.ZodArray<z.ZodObject<{
        id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        title: z.ZodString;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        chips: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        footer: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        actions: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
            kind: z.ZodLiteral<"existing_action">;
            actionId: z.ZodString;
            selectedItemIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        }, "strict", z.ZodTypeAny, {
            kind: "existing_action";
            actionId: string;
            selectedItemIds: string[];
        }, {
            kind: "existing_action";
            actionId: string;
            selectedItemIds?: string[] | undefined;
        }>, z.ZodObject<{
            kind: z.ZodLiteral<"link">;
            label: z.ZodString;
            href: z.ZodString;
            openInNewTab: z.ZodDefault<z.ZodBoolean>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            kind: "link";
            href: string;
            openInNewTab: boolean;
        }, {
            label: string;
            kind: "link";
            href: string;
            openInNewTab?: boolean | undefined;
        }>]>, "many">>;
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        title: string;
        actions: ({
            kind: "existing_action";
            actionId: string;
            selectedItemIds: string[];
        } | {
            label: string;
            kind: "link";
            href: string;
            openInNewTab: boolean;
        })[];
        id?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
    }, {
        title: string;
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        id?: unknown;
        subtitle?: unknown;
        actions?: ({
            kind: "existing_action";
            actionId: string;
            selectedItemIds?: string[] | undefined;
        } | {
            label: string;
            kind: "link";
            href: string;
            openInNewTab?: boolean | undefined;
        })[] | undefined;
        footer?: unknown;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    label: string;
    cards: {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        title: string;
        actions: ({
            kind: "existing_action";
            actionId: string;
            selectedItemIds: string[];
        } | {
            label: string;
            kind: "link";
            href: string;
            openInNewTab: boolean;
        })[];
        id?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
    }[];
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    id?: string | undefined;
}, {
    label: string;
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    id?: unknown;
    cards?: {
        title: string;
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        id?: unknown;
        subtitle?: unknown;
        actions?: ({
            kind: "existing_action";
            actionId: string;
            selectedItemIds?: string[] | undefined;
        } | {
            label: string;
            kind: "link";
            href: string;
            openInNewTab?: boolean | undefined;
        })[] | undefined;
        footer?: unknown;
    }[] | undefined;
}>;
export type WorkspaceTemplateBoardColumn = z.infer<typeof WorkspaceTemplateBoardColumnSchema>;
export declare const WorkspaceTemplateTableColumnSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    align: z.ZodDefault<z.ZodEnum<["start", "end", "center"]>>;
}, "strict", z.ZodTypeAny, {
    label: string;
    id: string;
    align: "start" | "end" | "center";
}, {
    label: string;
    id: string;
    align?: "start" | "end" | "center" | undefined;
}>;
export type WorkspaceTemplateTableColumn = z.infer<typeof WorkspaceTemplateTableColumnSchema>;
export declare const WorkspaceTemplateTableCellSchema: z.ZodObject<{
    value: z.ZodString;
    subvalue: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
    emphasis: z.ZodDefault<z.ZodBoolean>;
}, "strict", z.ZodTypeAny, {
    value: string;
    emphasis: boolean;
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    subvalue?: string | undefined;
}, {
    value: string;
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    subvalue?: unknown;
    emphasis?: boolean | undefined;
}>;
export type WorkspaceTemplateTableCell = z.infer<typeof WorkspaceTemplateTableCellSchema>;
export declare const WorkspaceTemplateTableRowSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    cells: z.ZodDefault<z.ZodArray<z.ZodObject<{
        value: z.ZodString;
        subvalue: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        emphasis: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        value: string;
        emphasis: boolean;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        subvalue?: string | undefined;
    }, {
        value: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        subvalue?: unknown;
        emphasis?: boolean | undefined;
    }>, "many">>;
    actions: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"kind", [z.ZodObject<{
        kind: z.ZodLiteral<"existing_action">;
        actionId: z.ZodString;
        selectedItemIds: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strict", z.ZodTypeAny, {
        kind: "existing_action";
        actionId: string;
        selectedItemIds: string[];
    }, {
        kind: "existing_action";
        actionId: string;
        selectedItemIds?: string[] | undefined;
    }>, z.ZodObject<{
        kind: z.ZodLiteral<"link">;
        label: z.ZodString;
        href: z.ZodString;
        openInNewTab: z.ZodDefault<z.ZodBoolean>;
    }, "strict", z.ZodTypeAny, {
        label: string;
        kind: "link";
        href: string;
        openInNewTab: boolean;
    }, {
        label: string;
        kind: "link";
        href: string;
        openInNewTab?: boolean | undefined;
    }>]>, "many">>;
}, "strict", z.ZodTypeAny, {
    label: string;
    id: string;
    actions: ({
        kind: "existing_action";
        actionId: string;
        selectedItemIds: string[];
    } | {
        label: string;
        kind: "link";
        href: string;
        openInNewTab: boolean;
    })[];
    cells: {
        value: string;
        emphasis: boolean;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        subvalue?: string | undefined;
    }[];
}, {
    label: string;
    id: string;
    actions?: ({
        kind: "existing_action";
        actionId: string;
        selectedItemIds?: string[] | undefined;
    } | {
        label: string;
        kind: "link";
        href: string;
        openInNewTab?: boolean | undefined;
    })[] | undefined;
    cells?: {
        value: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        subvalue?: unknown;
        emphasis?: boolean | undefined;
    }[] | undefined;
}>;
export type WorkspaceTemplateTableRow = z.infer<typeof WorkspaceTemplateTableRowSchema>;
export declare const WorkspaceTemplateSectionHydrationStateSchema: z.ZodEnum<["pending", "hydrating", "ready", "failed"]>;
export type WorkspaceTemplateSectionHydrationState = z.infer<typeof WorkspaceTemplateSectionHydrationStateSchema>;
export declare const WorkspaceTemplateSectionRepairStateSchema: z.ZodEnum<["idle", "repairing", "recovered", "failed"]>;
export type WorkspaceTemplateSectionRepairState = z.infer<typeof WorkspaceTemplateSectionRepairStateSchema>;
export declare const WorkspaceTemplateSectionContentStateSchema: z.ZodEnum<["ghost", "partial", "hydrated", "fallback"]>;
export type WorkspaceTemplateSectionContentState = z.infer<typeof WorkspaceTemplateSectionContentStateSchema>;
export declare const WorkspaceTemplateSectionProgressSchema: z.ZodObject<{
    hydrationState: z.ZodDefault<z.ZodEnum<["pending", "hydrating", "ready", "failed"]>>;
    repairState: z.ZodDefault<z.ZodEnum<["idle", "repairing", "recovered", "failed"]>>;
    contentState: z.ZodDefault<z.ZodEnum<["ghost", "partial", "hydrated", "fallback"]>>;
    lastUpdatedAt: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    errorMessage: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
}, "strict", z.ZodTypeAny, {
    hydrationState: "pending" | "hydrating" | "ready" | "failed";
    repairState: "failed" | "idle" | "repairing" | "recovered";
    contentState: "ghost" | "partial" | "hydrated" | "fallback";
    lastUpdatedAt?: string | undefined;
    errorMessage?: string | undefined;
}, {
    hydrationState?: "pending" | "hydrating" | "ready" | "failed" | undefined;
    repairState?: "failed" | "idle" | "repairing" | "recovered" | undefined;
    contentState?: "ghost" | "partial" | "hydrated" | "fallback" | undefined;
    lastUpdatedAt?: unknown;
    errorMessage?: unknown;
}>;
export type WorkspaceTemplateSectionProgress = z.infer<typeof WorkspaceTemplateSectionProgressSchema>;
export declare const WorkspaceTemplateViewPhaseSchema: z.ZodEnum<["selected", "text", "hydrating", "actions", "repairing", "ready", "failed"]>;
export type WorkspaceTemplateViewPhase = z.infer<typeof WorkspaceTemplateViewPhaseSchema>;
export declare const WorkspaceTemplateStateStatusSchema: z.ZodObject<{
    phase: z.ZodDefault<z.ZodEnum<["selected", "text", "hydrating", "actions", "repairing", "ready", "failed"]>>;
    lastUpdatedAt: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    failureCategory: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    errorMessage: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
}, "strict", z.ZodTypeAny, {
    phase: "actions" | "hydrating" | "ready" | "failed" | "repairing" | "selected" | "text";
    lastUpdatedAt?: string | undefined;
    errorMessage?: string | undefined;
    failureCategory?: string | undefined;
}, {
    lastUpdatedAt?: unknown;
    errorMessage?: unknown;
    phase?: "actions" | "hydrating" | "ready" | "failed" | "repairing" | "selected" | "text" | undefined;
    failureCategory?: unknown;
}>;
export type WorkspaceTemplateStateStatus = z.infer<typeof WorkspaceTemplateStateStatusSchema>;
export declare const WorkspaceTemplateSectionSchema: z.ZodType<({
    slotId: string;
    kind: 'hero';
    eyebrow?: string;
    title: string;
    summary: string;
    chips: WorkspaceTemplateChip[];
    actions: WorkspaceTemplateActionReference[];
}) | ({
    slotId: string;
    kind: 'filter-strip';
    title?: string;
    filters: WorkspaceTemplateChip[];
    sortLabel?: string;
}) | ({
    slotId: string;
    kind: 'action-bar';
    title?: string;
    actions: WorkspaceTemplateActionReference[];
}) | ({
    slotId: string;
    kind: 'stats';
    title?: string;
    items: WorkspaceTemplateStat[];
}) | ({
    slotId: string;
    kind: 'comparison-table';
    title: string;
    columns: WorkspaceTemplateTableColumn[];
    rows: WorkspaceTemplateTableRow[];
    footerChips: WorkspaceTemplateChip[];
    footnote?: string;
}) | ({
    slotId: string;
    kind: 'grouped-list';
    title: string;
    groups: Array<{
        id: string;
        label: string;
        tone?: WorkspaceTemplateTone;
        items: WorkspaceTemplateListItem[];
    }>;
}) | ({
    slotId: string;
    kind: 'card-grid';
    title: string;
    columns?: 1 | 2 | 3;
    cards: WorkspaceTemplateCardItem[];
}) | ({
    slotId: string;
    kind: 'detail-panel';
    title: string;
    eyebrow?: string;
    summary?: string;
    chips: WorkspaceTemplateChip[];
    fields: WorkspaceTemplateField[];
    actions: WorkspaceTemplateActionReference[];
    note?: string;
    noteTitle?: string;
}) | ({
    slotId: string;
    kind: 'timeline';
    title: string;
    items: WorkspaceTemplateTimelineItem[];
}) | ({
    slotId: string;
    kind: 'notes';
    title: string;
    lines: string[];
    actions: WorkspaceTemplateActionReference[];
}) | ({
    slotId: string;
    kind: 'activity-log';
    title: string;
    entries: WorkspaceTemplateActivityItem[];
}) | ({
    slotId: string;
    kind: 'kanban';
    title: string;
    columns: WorkspaceTemplateBoardColumn[];
}) | ({
    slotId: string;
    kind: 'confirmation';
    title: string;
    message: string;
    confirmAction: WorkspaceTemplateActionReference;
    secondaryAction?: WorkspaceTemplateActionReference;
    tone?: WorkspaceTemplateTone;
}) | ({
    slotId: string;
    kind: 'split';
    title?: string;
    ratio?: 'balanced' | 'list-detail' | 'detail-list';
    left: WorkspaceTemplateSection[];
    right: WorkspaceTemplateSection[];
}) | ({
    slotId: string;
    kind: 'tabs';
    title?: string;
    tabs: Array<{
        id: string;
        label: string;
        badge?: string;
    }>;
    activeTabId: string;
    panes: Record<string, WorkspaceTemplateSection[]>;
}) | ({
    slotId: string;
    kind: 'checklist';
    title: string;
    prerequisites: string[];
    steps: Array<{
        id: string;
        label: string;
        detail?: string;
        checked?: boolean;
    }>;
    actions: WorkspaceTemplateActionReference[];
}), z.ZodTypeDef, unknown>;
export type WorkspaceTemplateSection = z.infer<typeof WorkspaceTemplateSectionSchema>;
export declare const WorkspaceTemplateTransitionRecordSchema: z.ZodObject<{
    fromTemplateId: z.ZodEnum<["price-comparison-grid", "shopping-shortlist", "inbox-triage-board", "restaurant-finder", "hotel-shortlist", "flight-comparison", "travel-itinerary-planner", "research-notebook", "security-review-board", "vendor-evaluation-matrix", "event-planner", "job-search-pipeline", "content-campaign-planner", "local-discovery-comparison", "step-by-step-instructions"]>;
    toTemplateId: z.ZodEnum<["price-comparison-grid", "shopping-shortlist", "inbox-triage-board", "restaurant-finder", "hotel-shortlist", "flight-comparison", "travel-itinerary-planner", "research-notebook", "security-review-board", "vendor-evaluation-matrix", "event-planner", "job-search-pipeline", "content-campaign-planner", "local-discovery-comparison", "step-by-step-instructions"]>;
    switchedAt: z.ZodString;
    reason: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
}, "strict", z.ZodTypeAny, {
    fromTemplateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
    toTemplateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
    switchedAt: string;
    reason?: string | undefined;
}, {
    fromTemplateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
    toTemplateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
    switchedAt: string;
    reason?: unknown;
}>;
export type WorkspaceTemplateTransitionRecord = z.infer<typeof WorkspaceTemplateTransitionRecordSchema>;
export declare const WorkspaceTemplateStateSchema: z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_state">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_state/v1">;
    templateId: z.ZodEnum<["price-comparison-grid", "shopping-shortlist", "inbox-triage-board", "restaurant-finder", "hotel-shortlist", "flight-comparison", "travel-itinerary-planner", "research-notebook", "security-review-board", "vendor-evaluation-matrix", "event-planner", "job-search-pipeline", "content-campaign-planner", "local-discovery-comparison", "step-by-step-instructions"]>;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    status: z.ZodOptional<z.ZodObject<{
        phase: z.ZodDefault<z.ZodEnum<["selected", "text", "hydrating", "actions", "repairing", "ready", "failed"]>>;
        lastUpdatedAt: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        failureCategory: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        errorMessage: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        phase: "actions" | "hydrating" | "ready" | "failed" | "repairing" | "selected" | "text";
        lastUpdatedAt?: string | undefined;
        errorMessage?: string | undefined;
        failureCategory?: string | undefined;
    }, {
        lastUpdatedAt?: unknown;
        errorMessage?: unknown;
        phase?: "actions" | "hydrating" | "ready" | "failed" | "repairing" | "selected" | "text" | undefined;
        failureCategory?: unknown;
    }>>;
    sections: z.ZodDefault<z.ZodArray<z.ZodType<{
        slotId: string;
        kind: "hero";
        eyebrow?: string;
        title: string;
        summary: string;
        chips: WorkspaceTemplateChip[];
        actions: WorkspaceTemplateActionReference[];
    } | {
        slotId: string;
        kind: "filter-strip";
        title?: string;
        filters: WorkspaceTemplateChip[];
        sortLabel?: string;
    } | {
        slotId: string;
        kind: "action-bar";
        title?: string;
        actions: WorkspaceTemplateActionReference[];
    } | {
        slotId: string;
        kind: "stats";
        title?: string;
        items: WorkspaceTemplateStat[];
    } | {
        slotId: string;
        kind: "comparison-table";
        title: string;
        columns: WorkspaceTemplateTableColumn[];
        rows: WorkspaceTemplateTableRow[];
        footerChips: WorkspaceTemplateChip[];
        footnote?: string;
    } | {
        slotId: string;
        kind: "grouped-list";
        title: string;
        groups: Array<{
            id: string;
            label: string;
            tone?: WorkspaceTemplateTone;
            items: WorkspaceTemplateListItem[];
        }>;
    } | {
        slotId: string;
        kind: "card-grid";
        title: string;
        columns?: 1 | 2 | 3;
        cards: WorkspaceTemplateCardItem[];
    } | {
        slotId: string;
        kind: "detail-panel";
        title: string;
        eyebrow?: string;
        summary?: string;
        chips: WorkspaceTemplateChip[];
        fields: WorkspaceTemplateField[];
        actions: WorkspaceTemplateActionReference[];
        note?: string;
        noteTitle?: string;
    } | {
        slotId: string;
        kind: "timeline";
        title: string;
        items: WorkspaceTemplateTimelineItem[];
    } | {
        slotId: string;
        kind: "notes";
        title: string;
        lines: string[];
        actions: WorkspaceTemplateActionReference[];
    } | {
        slotId: string;
        kind: "activity-log";
        title: string;
        entries: WorkspaceTemplateActivityItem[];
    } | {
        slotId: string;
        kind: "kanban";
        title: string;
        columns: WorkspaceTemplateBoardColumn[];
    } | {
        slotId: string;
        kind: "confirmation";
        title: string;
        message: string;
        confirmAction: WorkspaceTemplateActionReference;
        secondaryAction?: WorkspaceTemplateActionReference;
        tone?: WorkspaceTemplateTone;
    } | {
        slotId: string;
        kind: "split";
        title?: string;
        ratio?: "balanced" | "list-detail" | "detail-list";
        left: WorkspaceTemplateSection[];
        right: WorkspaceTemplateSection[];
    } | {
        slotId: string;
        kind: "tabs";
        title?: string;
        tabs: Array<{
            id: string;
            label: string;
            badge?: string;
        }>;
        activeTabId: string;
        panes: Record<string, WorkspaceTemplateSection[]>;
    } | {
        slotId: string;
        kind: "checklist";
        title: string;
        prerequisites: string[];
        steps: Array<{
            id: string;
            label: string;
            detail?: string;
            checked?: boolean;
        }>;
        actions: WorkspaceTemplateActionReference[];
    }, z.ZodTypeDef, unknown>, "many">>;
    transitionTargets: z.ZodDefault<z.ZodArray<z.ZodEnum<["price-comparison-grid", "shopping-shortlist", "inbox-triage-board", "restaurant-finder", "hotel-shortlist", "flight-comparison", "travel-itinerary-planner", "research-notebook", "security-review-board", "vendor-evaluation-matrix", "event-planner", "job-search-pipeline", "content-campaign-planner", "local-discovery-comparison", "step-by-step-instructions"]>, "many">>;
    transitionHistory: z.ZodDefault<z.ZodArray<z.ZodObject<{
        fromTemplateId: z.ZodEnum<["price-comparison-grid", "shopping-shortlist", "inbox-triage-board", "restaurant-finder", "hotel-shortlist", "flight-comparison", "travel-itinerary-planner", "research-notebook", "security-review-board", "vendor-evaluation-matrix", "event-planner", "job-search-pipeline", "content-campaign-planner", "local-discovery-comparison", "step-by-step-instructions"]>;
        toTemplateId: z.ZodEnum<["price-comparison-grid", "shopping-shortlist", "inbox-triage-board", "restaurant-finder", "hotel-shortlist", "flight-comparison", "travel-itinerary-planner", "research-notebook", "security-review-board", "vendor-evaluation-matrix", "event-planner", "job-search-pipeline", "content-campaign-planner", "local-discovery-comparison", "step-by-step-instructions"]>;
        switchedAt: z.ZodString;
        reason: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        fromTemplateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
        toTemplateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
        switchedAt: string;
        reason?: string | undefined;
    }, {
        fromTemplateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
        toTemplateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
        switchedAt: string;
        reason?: unknown;
    }>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_state";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_state/v1";
    templateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
    sections: ({
        slotId: string;
        kind: "hero";
        eyebrow?: string;
        title: string;
        summary: string;
        chips: WorkspaceTemplateChip[];
        actions: WorkspaceTemplateActionReference[];
    } | {
        slotId: string;
        kind: "filter-strip";
        title?: string;
        filters: WorkspaceTemplateChip[];
        sortLabel?: string;
    } | {
        slotId: string;
        kind: "action-bar";
        title?: string;
        actions: WorkspaceTemplateActionReference[];
    } | {
        slotId: string;
        kind: "stats";
        title?: string;
        items: WorkspaceTemplateStat[];
    } | {
        slotId: string;
        kind: "comparison-table";
        title: string;
        columns: WorkspaceTemplateTableColumn[];
        rows: WorkspaceTemplateTableRow[];
        footerChips: WorkspaceTemplateChip[];
        footnote?: string;
    } | {
        slotId: string;
        kind: "grouped-list";
        title: string;
        groups: Array<{
            id: string;
            label: string;
            tone?: WorkspaceTemplateTone;
            items: WorkspaceTemplateListItem[];
        }>;
    } | {
        slotId: string;
        kind: "card-grid";
        title: string;
        columns?: 1 | 2 | 3;
        cards: WorkspaceTemplateCardItem[];
    } | {
        slotId: string;
        kind: "detail-panel";
        title: string;
        eyebrow?: string;
        summary?: string;
        chips: WorkspaceTemplateChip[];
        fields: WorkspaceTemplateField[];
        actions: WorkspaceTemplateActionReference[];
        note?: string;
        noteTitle?: string;
    } | {
        slotId: string;
        kind: "timeline";
        title: string;
        items: WorkspaceTemplateTimelineItem[];
    } | {
        slotId: string;
        kind: "notes";
        title: string;
        lines: string[];
        actions: WorkspaceTemplateActionReference[];
    } | {
        slotId: string;
        kind: "activity-log";
        title: string;
        entries: WorkspaceTemplateActivityItem[];
    } | {
        slotId: string;
        kind: "kanban";
        title: string;
        columns: WorkspaceTemplateBoardColumn[];
    } | {
        slotId: string;
        kind: "confirmation";
        title: string;
        message: string;
        confirmAction: WorkspaceTemplateActionReference;
        secondaryAction?: WorkspaceTemplateActionReference;
        tone?: WorkspaceTemplateTone;
    } | {
        slotId: string;
        kind: "split";
        title?: string;
        ratio?: "balanced" | "list-detail" | "detail-list";
        left: WorkspaceTemplateSection[];
        right: WorkspaceTemplateSection[];
    } | {
        slotId: string;
        kind: "tabs";
        title?: string;
        tabs: Array<{
            id: string;
            label: string;
            badge?: string;
        }>;
        activeTabId: string;
        panes: Record<string, WorkspaceTemplateSection[]>;
    } | {
        slotId: string;
        kind: "checklist";
        title: string;
        prerequisites: string[];
        steps: Array<{
            id: string;
            label: string;
            detail?: string;
            checked?: boolean;
        }>;
        actions: WorkspaceTemplateActionReference[];
    })[];
    transitionTargets: ("price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions")[];
    transitionHistory: {
        fromTemplateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
        toTemplateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
        switchedAt: string;
        reason?: string | undefined;
    }[];
    metadata: Record<string, unknown>;
    status?: {
        phase: "actions" | "hydrating" | "ready" | "failed" | "repairing" | "selected" | "text";
        lastUpdatedAt?: string | undefined;
        errorMessage?: string | undefined;
        failureCategory?: string | undefined;
    } | undefined;
    subtitle?: string | undefined;
}, {
    kind: "workspace_template_state";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_state/v1";
    templateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
    status?: {
        lastUpdatedAt?: unknown;
        errorMessage?: unknown;
        phase?: "actions" | "hydrating" | "ready" | "failed" | "repairing" | "selected" | "text" | undefined;
        failureCategory?: unknown;
    } | undefined;
    subtitle?: unknown;
    sections?: unknown[] | undefined;
    transitionTargets?: ("price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions")[] | undefined;
    transitionHistory?: {
        fromTemplateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
        toTemplateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
        switchedAt: string;
        reason?: unknown;
    }[] | undefined;
    metadata?: Record<string, unknown> | undefined;
}>;
export type WorkspaceTemplateState = z.infer<typeof WorkspaceTemplateStateSchema>;
