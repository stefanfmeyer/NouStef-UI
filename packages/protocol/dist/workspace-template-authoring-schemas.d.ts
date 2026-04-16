import { z } from 'zod';
export declare const WorkspaceTemplateSelectionHintsSchema: z.ZodObject<{
    primaryEntity: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    currentTemplateId: z.ZodOptional<z.ZodEnum<["price-comparison-grid", "shopping-shortlist", "inbox-triage-board", "restaurant-finder", "hotel-shortlist", "flight-comparison", "travel-itinerary-planner", "research-notebook", "security-review-board", "vendor-evaluation-matrix", "event-planner", "job-search-pipeline", "content-campaign-planner", "local-discovery-comparison", "step-by-step-instructions"]>>;
    suggestedTransitionFrom: z.ZodOptional<z.ZodEnum<["price-comparison-grid", "shopping-shortlist", "inbox-triage-board", "restaurant-finder", "hotel-shortlist", "flight-comparison", "travel-itinerary-planner", "research-notebook", "security-review-board", "vendor-evaluation-matrix", "event-planner", "job-search-pipeline", "content-campaign-planner", "local-discovery-comparison", "step-by-step-instructions"]>>;
}, "strict", z.ZodTypeAny, {
    primaryEntity?: string | undefined;
    currentTemplateId?: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions" | undefined;
    suggestedTransitionFrom?: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions" | undefined;
}, {
    primaryEntity?: unknown;
    currentTemplateId?: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions" | undefined;
    suggestedTransitionFrom?: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions" | undefined;
}>;
export type WorkspaceTemplateSelectionHints = z.infer<typeof WorkspaceTemplateSelectionHintsSchema>;
export declare const WorkspaceTemplateSelectionModeSchema: z.ZodEnum<["fill", "update", "switch"]>;
export type WorkspaceTemplateSelectionMode = z.infer<typeof WorkspaceTemplateSelectionModeSchema>;
export declare const WorkspaceTemplateSelectionSchema: z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_selection">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_selection/v2">;
    templateId: z.ZodEnum<["price-comparison-grid", "shopping-shortlist", "inbox-triage-board", "restaurant-finder", "hotel-shortlist", "flight-comparison", "travel-itinerary-planner", "research-notebook", "security-review-board", "vendor-evaluation-matrix", "event-planner", "job-search-pipeline", "content-campaign-planner", "local-discovery-comparison", "step-by-step-instructions"]>;
    mode: z.ZodDefault<z.ZodEnum<["fill", "update", "switch"]>>;
    reason: z.ZodString;
    confidence: z.ZodNumber;
    hints: z.ZodOptional<z.ZodObject<{
        primaryEntity: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        currentTemplateId: z.ZodOptional<z.ZodEnum<["price-comparison-grid", "shopping-shortlist", "inbox-triage-board", "restaurant-finder", "hotel-shortlist", "flight-comparison", "travel-itinerary-planner", "research-notebook", "security-review-board", "vendor-evaluation-matrix", "event-planner", "job-search-pipeline", "content-campaign-planner", "local-discovery-comparison", "step-by-step-instructions"]>>;
        suggestedTransitionFrom: z.ZodOptional<z.ZodEnum<["price-comparison-grid", "shopping-shortlist", "inbox-triage-board", "restaurant-finder", "hotel-shortlist", "flight-comparison", "travel-itinerary-planner", "research-notebook", "security-review-board", "vendor-evaluation-matrix", "event-planner", "job-search-pipeline", "content-campaign-planner", "local-discovery-comparison", "step-by-step-instructions"]>>;
    }, "strict", z.ZodTypeAny, {
        primaryEntity?: string | undefined;
        currentTemplateId?: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions" | undefined;
        suggestedTransitionFrom?: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions" | undefined;
    }, {
        primaryEntity?: unknown;
        currentTemplateId?: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions" | undefined;
        suggestedTransitionFrom?: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions" | undefined;
    }>>;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_selection";
    reason: string;
    schemaVersion: "recipe_workspace_template_selection/v2";
    templateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
    mode: "fill" | "update" | "switch";
    confidence: number;
    hints?: {
        primaryEntity?: string | undefined;
        currentTemplateId?: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions" | undefined;
        suggestedTransitionFrom?: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions" | undefined;
    } | undefined;
}, {
    kind: "workspace_template_selection";
    reason: string;
    schemaVersion: "recipe_workspace_template_selection/v2";
    templateId: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions";
    confidence: number;
    mode?: "fill" | "update" | "switch" | undefined;
    hints?: {
        primaryEntity?: unknown;
        currentTemplateId?: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions" | undefined;
        suggestedTransitionFrom?: "price-comparison-grid" | "shopping-shortlist" | "inbox-triage-board" | "restaurant-finder" | "hotel-shortlist" | "flight-comparison" | "travel-itinerary-planner" | "research-notebook" | "security-review-board" | "vendor-evaluation-matrix" | "event-planner" | "job-search-pipeline" | "content-campaign-planner" | "local-discovery-comparison" | "step-by-step-instructions" | undefined;
    } | undefined;
}>;
export type WorkspaceTemplateSelection = z.infer<typeof WorkspaceTemplateSelectionSchema>;
export declare const WorkspaceTemplateAuthoringLinkSchema: z.ZodObject<{
    label: z.ZodString;
    href: z.ZodString;
}, "strict", z.ZodTypeAny, {
    label: string;
    href: string;
}, {
    label: string;
    href: string;
}>;
export type WorkspaceTemplateAuthoringLink = z.infer<typeof WorkspaceTemplateAuthoringLinkSchema>;
export declare const WorkspaceTemplateAuthoringListItemSchema: z.ZodObject<Omit<{
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
}, "actions"> & {
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
}, "strict", z.ZodTypeAny, {
    chips: {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }[];
    bullets: string[];
    links: {
        label: string;
        href: string;
    }[];
    title: string;
    id?: string | undefined;
    subtitle?: string | undefined;
    meta?: string | undefined;
}, {
    title: string;
    chips?: {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }[] | undefined;
    bullets?: string[] | undefined;
    links?: {
        label: string;
        href: string;
    }[] | undefined;
    id?: unknown;
    subtitle?: unknown;
    meta?: unknown;
}>;
export type WorkspaceTemplateAuthoringListItem = z.infer<typeof WorkspaceTemplateAuthoringListItemSchema>;
export declare const WorkspaceTemplateAuthoringGroupSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
    items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
    }, "actions"> & {
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        bullets: string[];
        links: {
            label: string;
            href: string;
        }[];
        title: string;
        id?: string | undefined;
        subtitle?: string | undefined;
        meta?: string | undefined;
    }, {
        title: string;
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        bullets?: string[] | undefined;
        links?: {
            label: string;
            href: string;
        }[] | undefined;
        id?: unknown;
        subtitle?: unknown;
        meta?: unknown;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    label: string;
    id: string;
    items: {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        bullets: string[];
        links: {
            label: string;
            href: string;
        }[];
        title: string;
        id?: string | undefined;
        subtitle?: string | undefined;
        meta?: string | undefined;
    }[];
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
}, {
    label: string;
    id: string;
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    items?: {
        title: string;
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        bullets?: string[] | undefined;
        links?: {
            label: string;
            href: string;
        }[] | undefined;
        id?: unknown;
        subtitle?: unknown;
        meta?: unknown;
    }[] | undefined;
}>;
export type WorkspaceTemplateAuthoringGroup = z.infer<typeof WorkspaceTemplateAuthoringGroupSchema>;
export declare const WorkspaceTemplateAuthoringCardItemSchema: z.ZodObject<Omit<{
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
}, "actions"> & {
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
}, "strict", z.ZodTypeAny, {
    chips: {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }[];
    bullets: string[];
    links: {
        label: string;
        href: string;
    }[];
    title: string;
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
    links?: {
        label: string;
        href: string;
    }[] | undefined;
    id?: unknown;
    subtitle?: unknown;
    meta?: unknown;
    imageLabel?: unknown;
    price?: unknown;
    footer?: unknown;
}>;
export type WorkspaceTemplateAuthoringCardItem = z.infer<typeof WorkspaceTemplateAuthoringCardItemSchema>;
export declare const WorkspaceTemplateAuthoringTimelineItemSchema: z.ZodObject<Omit<{
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
}, "actions"> & {
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
}, "strict", z.ZodTypeAny, {
    chips: {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }[];
    links: {
        label: string;
        href: string;
    }[];
    title: string;
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
    links?: {
        label: string;
        href: string;
    }[] | undefined;
    id?: unknown;
    summary?: unknown;
}>;
export type WorkspaceTemplateAuthoringTimelineItem = z.infer<typeof WorkspaceTemplateAuthoringTimelineItemSchema>;
export declare const WorkspaceTemplateAuthoringBoardCardSchema: z.ZodObject<Omit<{
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
}, "actions"> & {
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
}, "strict", z.ZodTypeAny, {
    chips: {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }[];
    links: {
        label: string;
        href: string;
    }[];
    title: string;
    id?: string | undefined;
    subtitle?: string | undefined;
    footer?: string | undefined;
}, {
    title: string;
    chips?: {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }[] | undefined;
    links?: {
        label: string;
        href: string;
    }[] | undefined;
    id?: unknown;
    subtitle?: unknown;
    footer?: unknown;
}>;
export type WorkspaceTemplateAuthoringBoardCard = z.infer<typeof WorkspaceTemplateAuthoringBoardCardSchema>;
export declare const WorkspaceTemplateAuthoringBoardColumnSchema: z.ZodObject<{
    id: z.ZodString;
    label: z.ZodString;
    tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
    cards: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
    }, "actions"> & {
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        links: {
            label: string;
            href: string;
        }[];
        title: string;
        id?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
    }, {
        title: string;
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        links?: {
            label: string;
            href: string;
        }[] | undefined;
        id?: unknown;
        subtitle?: unknown;
        footer?: unknown;
    }>, "many">>;
}, "strict", z.ZodTypeAny, {
    label: string;
    id: string;
    cards: {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        links: {
            label: string;
            href: string;
        }[];
        title: string;
        id?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
    }[];
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
}, {
    label: string;
    id: string;
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    cards?: {
        title: string;
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        links?: {
            label: string;
            href: string;
        }[] | undefined;
        id?: unknown;
        subtitle?: unknown;
        footer?: unknown;
    }[] | undefined;
}>;
export type WorkspaceTemplateAuthoringBoardColumn = z.infer<typeof WorkspaceTemplateAuthoringBoardColumnSchema>;
export declare const WorkspaceTemplateAuthoringTableRowSchema: z.ZodObject<Omit<{
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
}, "actions"> & {
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
}, "strict", z.ZodTypeAny, {
    label: string;
    links: {
        label: string;
        href: string;
    }[];
    id: string;
    cells: {
        value: string;
        emphasis: boolean;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        subvalue?: string | undefined;
    }[];
}, {
    label: string;
    id: string;
    links?: {
        label: string;
        href: string;
    }[] | undefined;
    cells?: {
        value: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        subvalue?: unknown;
        emphasis?: boolean | undefined;
    }[] | undefined;
}>;
export type WorkspaceTemplateAuthoringTableRow = z.infer<typeof WorkspaceTemplateAuthoringTableRowSchema>;
export declare const WorkspaceTemplateAuthoringDetailSchema: z.ZodObject<{
    id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    title: z.ZodString;
    eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
    fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
    note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
}, "strict", z.ZodTypeAny, {
    chips: {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }[];
    title: string;
    fields: {
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
    }[];
    id?: string | undefined;
    summary?: string | undefined;
    eyebrow?: string | undefined;
    note?: string | undefined;
    noteTitle?: string | undefined;
}, {
    title: string;
    chips?: {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }[] | undefined;
    id?: unknown;
    summary?: unknown;
    eyebrow?: unknown;
    fields?: {
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
    }[] | undefined;
    note?: unknown;
    noteTitle?: unknown;
}>;
export type WorkspaceTemplateAuthoringDetail = z.infer<typeof WorkspaceTemplateAuthoringDetailSchema>;
export declare const WorkspaceTemplateAuthoringChecklistItemSchema: z.ZodObject<{
    id: z.ZodString;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    meta: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    checked: z.ZodDefault<z.ZodBoolean>;
    tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
}, "strict", z.ZodTypeAny, {
    id: string;
    title: string;
    checked: boolean;
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    subtitle?: string | undefined;
    meta?: string | undefined;
}, {
    id: string;
    title: string;
    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    subtitle?: unknown;
    meta?: unknown;
    checked?: boolean | undefined;
}>;
export type WorkspaceTemplateAuthoringChecklistItem = z.infer<typeof WorkspaceTemplateAuthoringChecklistItemSchema>;
export declare const WorkspaceTemplateFillBaseSchema: z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
}>;
export declare const WorkspaceTemplateFillSchema: z.ZodDiscriminatedUnion<"templateId", [z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"price-comparison-grid">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "price-comparison-grid";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "price-comparison-grid";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"shopping-shortlist">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "shopping-shortlist";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "shopping-shortlist";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"inbox-triage-board">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "inbox-triage-board";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "inbox-triage-board";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"restaurant-finder">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "restaurant-finder";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "restaurant-finder";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"hotel-shortlist">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "hotel-shortlist";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "hotel-shortlist";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"flight-comparison">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "flight-comparison";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "flight-comparison";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"travel-itinerary-planner">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "travel-itinerary-planner";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "travel-itinerary-planner";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"research-notebook">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "research-notebook";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "research-notebook";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"security-review-board">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "security-review-board";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "security-review-board";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"vendor-evaluation-matrix">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "vendor-evaluation-matrix";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "vendor-evaluation-matrix";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"event-planner">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "event-planner";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "event-planner";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"job-search-pipeline">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "job-search-pipeline";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "job-search-pipeline";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"content-campaign-planner">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "content-campaign-planner";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "content-campaign-planner";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"local-discovery-comparison">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "local-discovery-comparison";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "local-discovery-comparison";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_fill">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_fill/v2">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"step-by-step-instructions">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "step-by-step-instructions";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_fill";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_fill/v2";
    templateId: "step-by-step-instructions";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>]>;
export type WorkspaceTemplateFill = z.infer<typeof WorkspaceTemplateFillSchema>;
export declare const WorkspaceTemplateHydrationSchema: z.ZodDiscriminatedUnion<"templateId", [z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"price-comparison-grid">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "price-comparison-grid";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "price-comparison-grid";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"shopping-shortlist">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "shopping-shortlist";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "shopping-shortlist";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"inbox-triage-board">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "inbox-triage-board";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "inbox-triage-board";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"restaurant-finder">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "restaurant-finder";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "restaurant-finder";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"hotel-shortlist">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "hotel-shortlist";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "hotel-shortlist";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"flight-comparison">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "flight-comparison";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "flight-comparison";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"travel-itinerary-planner">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "travel-itinerary-planner";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "travel-itinerary-planner";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"research-notebook">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "research-notebook";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "research-notebook";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"security-review-board">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "security-review-board";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "security-review-board";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"vendor-evaluation-matrix">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "vendor-evaluation-matrix";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "vendor-evaluation-matrix";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"event-planner">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "event-planner";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "event-planner";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"job-search-pipeline">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "job-search-pipeline";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "job-search-pipeline";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"content-campaign-planner">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "content-campaign-planner";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "content-campaign-planner";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"local-discovery-comparison">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "local-discovery-comparison";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "local-discovery-comparison";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_hydration">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_hydration/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"step-by-step-instructions">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "step-by-step-instructions";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_hydration";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_hydration/v1";
    templateId: "step-by-step-instructions";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>]>;
export type WorkspaceTemplateHydration = z.infer<typeof WorkspaceTemplateHydrationSchema>;
export declare const WorkspaceTemplateTextSchema: z.ZodDiscriminatedUnion<"templateId", [z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"price-comparison-grid">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "price-comparison-grid";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "price-comparison-grid";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"shopping-shortlist">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "shopping-shortlist";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "shopping-shortlist";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"inbox-triage-board">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "inbox-triage-board";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "inbox-triage-board";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"restaurant-finder">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "restaurant-finder";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "restaurant-finder";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"hotel-shortlist">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "hotel-shortlist";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "hotel-shortlist";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"flight-comparison">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "flight-comparison";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "flight-comparison";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"travel-itinerary-planner">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "travel-itinerary-planner";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "travel-itinerary-planner";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"research-notebook">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "research-notebook";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "research-notebook";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"security-review-board">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "security-review-board";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "security-review-board";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"vendor-evaluation-matrix">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "vendor-evaluation-matrix";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "vendor-evaluation-matrix";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"event-planner">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "event-planner";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "event-planner";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"job-search-pipeline">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "job-search-pipeline";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "job-search-pipeline";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"content-campaign-planner">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "content-campaign-planner";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "content-campaign-planner";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"local-discovery-comparison">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "local-discovery-comparison";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "local-discovery-comparison";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_text">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_text/v1">;
    title: z.ZodString;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodString;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"step-by-step-instructions">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "step-by-step-instructions";
    metadata: Record<string, unknown>;
    subtitle?: string | undefined;
    data?: any;
}, {
    kind: "workspace_template_text";
    title: string;
    summary: string;
    schemaVersion: "recipe_workspace_template_text/v1";
    templateId: "step-by-step-instructions";
    subtitle?: unknown;
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>]>;
export type WorkspaceTemplateText = z.infer<typeof WorkspaceTemplateTextSchema>;
export declare const WorkspaceTemplateActionsSchema: z.ZodDiscriminatedUnion<"templateId", [z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"price-comparison-grid">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "price-comparison-grid";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "price-comparison-grid";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"shopping-shortlist">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "shopping-shortlist";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "shopping-shortlist";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"inbox-triage-board">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "inbox-triage-board";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "inbox-triage-board";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"restaurant-finder">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "restaurant-finder";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "restaurant-finder";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"hotel-shortlist">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "hotel-shortlist";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "hotel-shortlist";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"flight-comparison">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "flight-comparison";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "flight-comparison";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"travel-itinerary-planner">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "travel-itinerary-planner";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "travel-itinerary-planner";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"research-notebook">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "research-notebook";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "research-notebook";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"security-review-board">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "security-review-board";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "security-review-board";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"vendor-evaluation-matrix">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "vendor-evaluation-matrix";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "vendor-evaluation-matrix";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"event-planner">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "event-planner";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "event-planner";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"job-search-pipeline">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "job-search-pipeline";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "job-search-pipeline";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"content-campaign-planner">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "content-campaign-planner";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "content-campaign-planner";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"local-discovery-comparison">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "local-discovery-comparison";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "local-discovery-comparison";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_actions">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_actions/v1">;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"step-by-step-instructions">;
    data: z.ZodTypeAny;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "step-by-step-instructions";
    metadata: Record<string, unknown>;
    data?: any;
}, {
    kind: "workspace_template_actions";
    schemaVersion: "recipe_workspace_template_actions/v1";
    templateId: "step-by-step-instructions";
    metadata?: Record<string, unknown> | undefined;
    data?: any;
}>]>;
export type WorkspaceTemplateActions = z.infer<typeof WorkspaceTemplateActionsSchema>;
export declare const WorkspaceTemplateUpdateOperationSchema: z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
    op: z.ZodLiteral<"set_header">;
    title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
}, "strict", z.ZodTypeAny, {
    op: "set_header";
    title?: string | undefined;
    subtitle?: string | undefined;
    summary?: string | undefined;
}, {
    op: "set_header";
    title?: unknown;
    subtitle?: unknown;
    summary?: unknown;
}>, z.ZodObject<{
    op: z.ZodLiteral<"set_active_tab">;
    slotId: z.ZodString;
    tabId: z.ZodString;
}, "strict", z.ZodTypeAny, {
    slotId: string;
    op: "set_active_tab";
    tabId: string;
}, {
    slotId: string;
    op: "set_active_tab";
    tabId: string;
}>, z.ZodObject<{
    op: z.ZodLiteral<"append_note_lines">;
    slotId: z.ZodString;
    lines: z.ZodArray<z.ZodString, "many">;
}, "strict", z.ZodTypeAny, {
    slotId: string;
    lines: string[];
    op: "append_note_lines";
}, {
    slotId: string;
    lines: string[];
    op: "append_note_lines";
}>, z.ZodObject<{
    op: z.ZodLiteral<"set_filter_chips">;
    slotId: z.ZodString;
    filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
        label: z.ZodString;
        tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
    }, "strict", z.ZodTypeAny, {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }, {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }>, "many">>;
    sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
}, "strict", z.ZodTypeAny, {
    slotId: string;
    filters: {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }[];
    op: "set_filter_chips";
    sortLabel?: string | undefined;
}, {
    slotId: string;
    op: "set_filter_chips";
    filters?: {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }[] | undefined;
    sortLabel?: unknown;
}>, z.ZodObject<{
    op: z.ZodLiteral<"set_scope_tags">;
    slotId: z.ZodString;
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
}, "strict", z.ZodTypeAny, {
    chips: {
        label: string;
        tone: "neutral" | "accent" | "success" | "warning" | "danger";
    }[];
    slotId: string;
    op: "set_scope_tags";
}, {
    slotId: string;
    op: "set_scope_tags";
    chips?: {
        label: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }[] | undefined;
}>, z.ZodObject<{
    op: z.ZodLiteral<"upsert_table_rows">;
    slotId: z.ZodString;
    rows: z.ZodArray<z.ZodObject<Omit<{
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
    }, "actions"> & {
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
    }, "strict", z.ZodTypeAny, {
        label: string;
        links: {
            label: string;
            href: string;
        }[];
        id: string;
        cells: {
            value: string;
            emphasis: boolean;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            subvalue?: string | undefined;
        }[];
    }, {
        label: string;
        id: string;
        links?: {
            label: string;
            href: string;
        }[] | undefined;
        cells?: {
            value: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            subvalue?: unknown;
            emphasis?: boolean | undefined;
        }[] | undefined;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    slotId: string;
    rows: {
        label: string;
        links: {
            label: string;
            href: string;
        }[];
        id: string;
        cells: {
            value: string;
            emphasis: boolean;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            subvalue?: string | undefined;
        }[];
    }[];
    op: "upsert_table_rows";
}, {
    slotId: string;
    rows: {
        label: string;
        id: string;
        links?: {
            label: string;
            href: string;
        }[] | undefined;
        cells?: {
            value: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            subvalue?: unknown;
            emphasis?: boolean | undefined;
        }[] | undefined;
    }[];
    op: "upsert_table_rows";
}>, z.ZodObject<{
    op: z.ZodLiteral<"upsert_cards">;
    slotId: z.ZodString;
    cards: z.ZodArray<z.ZodObject<Omit<{
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
    }, "actions"> & {
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        bullets: string[];
        links: {
            label: string;
            href: string;
        }[];
        title: string;
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
        links?: {
            label: string;
            href: string;
        }[] | undefined;
        id?: unknown;
        subtitle?: unknown;
        meta?: unknown;
        imageLabel?: unknown;
        price?: unknown;
        footer?: unknown;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    cards: {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        bullets: string[];
        links: {
            label: string;
            href: string;
        }[];
        title: string;
        id?: string | undefined;
        subtitle?: string | undefined;
        meta?: string | undefined;
        imageLabel?: string | undefined;
        price?: string | undefined;
        footer?: string | undefined;
    }[];
    slotId: string;
    op: "upsert_cards";
}, {
    cards: {
        title: string;
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        bullets?: string[] | undefined;
        links?: {
            label: string;
            href: string;
        }[] | undefined;
        id?: unknown;
        subtitle?: unknown;
        meta?: unknown;
        imageLabel?: unknown;
        price?: unknown;
        footer?: unknown;
    }[];
    slotId: string;
    op: "upsert_cards";
}>, z.ZodObject<{
    op: z.ZodLiteral<"upsert_groups">;
    slotId: z.ZodString;
    groups: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        label: z.ZodString;
        tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
        }>, "many">>;
    }, "strict", z.ZodTypeAny, {
        label: string;
        id: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
        }[];
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }, {
        label: string;
        id: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        items?: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
        }[] | undefined;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    slotId: string;
    groups: {
        label: string;
        id: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
        }[];
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
    }[];
    op: "upsert_groups";
}, {
    slotId: string;
    groups: {
        label: string;
        id: string;
        tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        items?: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
        }[] | undefined;
    }[];
    op: "upsert_groups";
}>, z.ZodObject<{
    op: z.ZodLiteral<"upsert_timeline_items">;
    slotId: z.ZodString;
    items: z.ZodArray<z.ZodObject<Omit<{
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
    }, "actions"> & {
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        links: {
            label: string;
            href: string;
        }[];
        title: string;
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
        links?: {
            label: string;
            href: string;
        }[] | undefined;
        id?: unknown;
        summary?: unknown;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    slotId: string;
    items: {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        links: {
            label: string;
            href: string;
        }[];
        title: string;
        time: string;
        id?: string | undefined;
        summary?: string | undefined;
    }[];
    op: "upsert_timeline_items";
}, {
    slotId: string;
    items: {
        title: string;
        time: string;
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        links?: {
            label: string;
            href: string;
        }[] | undefined;
        id?: unknown;
        summary?: unknown;
    }[];
    op: "upsert_timeline_items";
}>, z.ZodObject<{
    op: z.ZodLiteral<"set_detail">;
    slotId: z.ZodString;
    detail: z.ZodObject<{
        id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        title: z.ZodString;
        eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
        fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
        }>, "many">>;
        note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        title: string;
        fields: {
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
        }[];
        id?: string | undefined;
        summary?: string | undefined;
        eyebrow?: string | undefined;
        note?: string | undefined;
        noteTitle?: string | undefined;
    }, {
        title: string;
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        id?: unknown;
        summary?: unknown;
        eyebrow?: unknown;
        fields?: {
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
        }[] | undefined;
        note?: unknown;
        noteTitle?: unknown;
    }>;
}, "strict", z.ZodTypeAny, {
    detail: {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        title: string;
        fields: {
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
        }[];
        id?: string | undefined;
        summary?: string | undefined;
        eyebrow?: string | undefined;
        note?: string | undefined;
        noteTitle?: string | undefined;
    };
    slotId: string;
    op: "set_detail";
}, {
    detail: {
        title: string;
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        id?: unknown;
        summary?: unknown;
        eyebrow?: unknown;
        fields?: {
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
        }[] | undefined;
        note?: unknown;
        noteTitle?: unknown;
    };
    slotId: string;
    op: "set_detail";
}>, z.ZodObject<{
    op: z.ZodLiteral<"upsert_board_cards">;
    slotId: z.ZodString;
    columnId: z.ZodString;
    cards: z.ZodArray<z.ZodObject<Omit<{
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
    }, "actions"> & {
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        links: {
            label: string;
            href: string;
        }[];
        title: string;
        id?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
    }, {
        title: string;
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        links?: {
            label: string;
            href: string;
        }[] | undefined;
        id?: unknown;
        subtitle?: unknown;
        footer?: unknown;
    }>, "many">;
}, "strict", z.ZodTypeAny, {
    cards: {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        links: {
            label: string;
            href: string;
        }[];
        title: string;
        id?: string | undefined;
        subtitle?: string | undefined;
        footer?: string | undefined;
    }[];
    slotId: string;
    op: "upsert_board_cards";
    columnId: string;
}, {
    cards: {
        title: string;
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        links?: {
            label: string;
            href: string;
        }[] | undefined;
        id?: unknown;
        subtitle?: unknown;
        footer?: unknown;
    }[];
    slotId: string;
    op: "upsert_board_cards";
    columnId: string;
}>, z.ZodObject<{
    op: z.ZodLiteral<"move_board_card">;
    slotId: z.ZodString;
    cardId: z.ZodString;
    targetColumnId: z.ZodString;
    position: z.ZodOptional<z.ZodNumber>;
}, "strict", z.ZodTypeAny, {
    slotId: string;
    op: "move_board_card";
    cardId: string;
    targetColumnId: string;
    position?: number | undefined;
}, {
    slotId: string;
    op: "move_board_card";
    cardId: string;
    targetColumnId: string;
    position?: number | undefined;
}>, z.ZodObject<{
    op: z.ZodLiteral<"remove_items">;
    slotId: z.ZodString;
    itemIds: z.ZodArray<z.ZodString, "many">;
}, "strict", z.ZodTypeAny, {
    slotId: string;
    op: "remove_items";
    itemIds: string[];
}, {
    slotId: string;
    op: "remove_items";
    itemIds: string[];
}>, z.ZodObject<{
    op: z.ZodLiteral<"set_status">;
    statusLabel: z.ZodString;
}, "strict", z.ZodTypeAny, {
    op: "set_status";
    statusLabel: string;
}, {
    op: "set_status";
    statusLabel: string;
}>]>;
export type WorkspaceTemplateUpdateOperation = z.infer<typeof WorkspaceTemplateUpdateOperationSchema>;
export declare const WorkspaceTemplateUpdateSchema: z.ZodDiscriminatedUnion<"templateId", [z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"price-comparison-grid">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "price-comparison-grid";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "price-comparison-grid";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"shopping-shortlist">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "shopping-shortlist";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "shopping-shortlist";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"inbox-triage-board">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "inbox-triage-board";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "inbox-triage-board";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"restaurant-finder">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "restaurant-finder";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "restaurant-finder";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"hotel-shortlist">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "hotel-shortlist";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "hotel-shortlist";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"flight-comparison">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "flight-comparison";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "flight-comparison";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"travel-itinerary-planner">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "travel-itinerary-planner";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "travel-itinerary-planner";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"research-notebook">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "research-notebook";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "research-notebook";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"security-review-board">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "security-review-board";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "security-review-board";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"vendor-evaluation-matrix">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "vendor-evaluation-matrix";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "vendor-evaluation-matrix";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"event-planner">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "event-planner";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "event-planner";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"job-search-pipeline">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "job-search-pipeline";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "job-search-pipeline";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"content-campaign-planner">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "content-campaign-planner";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "content-campaign-planner";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"local-discovery-comparison">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "local-discovery-comparison";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "local-discovery-comparison";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>, z.ZodObject<{
    kind: z.ZodLiteral<"workspace_template_update">;
    schemaVersion: z.ZodLiteral<"recipe_workspace_template_update/v2">;
    operations: z.ZodDefault<z.ZodArray<z.ZodDiscriminatedUnion<"op", [z.ZodObject<{
        op: z.ZodLiteral<"set_header">;
        title: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        subtitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        summary: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    }, {
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_active_tab">;
        slotId: z.ZodString;
        tabId: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }, {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"append_note_lines">;
        slotId: z.ZodString;
        lines: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }, {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_filter_chips">;
        slotId: z.ZodString;
        filters: z.ZodDefault<z.ZodArray<z.ZodObject<{
            label: z.ZodString;
            tone: z.ZodDefault<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }, {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }>, "many">>;
        sortLabel: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    }, {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_scope_tags">;
        slotId: z.ZodString;
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
    }, "strict", z.ZodTypeAny, {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    }, {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_table_rows">;
        slotId: z.ZodString;
        rows: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }, {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    }, {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_cards">;
        slotId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_groups">;
        slotId: z.ZodString;
        groups: z.ZodArray<z.ZodObject<{
            id: z.ZodString;
            label: z.ZodString;
            tone: z.ZodOptional<z.ZodEnum<["neutral", "accent", "success", "warning", "danger"]>>;
            items: z.ZodDefault<z.ZodArray<z.ZodObject<Omit<{
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
            }, "actions"> & {
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
            }, "strict", z.ZodTypeAny, {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }, {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }>, "many">>;
        }, "strict", z.ZodTypeAny, {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }, {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    }, {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_timeline_items">;
        slotId: z.ZodString;
        items: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
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
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    }, {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_detail">;
        slotId: z.ZodString;
        detail: z.ZodObject<{
            id: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            title: z.ZodString;
            eyebrow: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
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
            fields: z.ZodDefault<z.ZodArray<z.ZodObject<{
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
            }>, "many">>;
            note: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
            noteTitle: z.ZodEffects<z.ZodOptional<z.ZodString>, string | undefined, unknown>;
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        }>;
    }, "strict", z.ZodTypeAny, {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    }, {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    }>, z.ZodObject<{
        op: z.ZodLiteral<"upsert_board_cards">;
        slotId: z.ZodString;
        columnId: z.ZodString;
        cards: z.ZodArray<z.ZodObject<Omit<{
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
        }, "actions"> & {
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
        }, "strict", z.ZodTypeAny, {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }, {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }>, "many">;
    }, "strict", z.ZodTypeAny, {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }, {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"move_board_card">;
        slotId: z.ZodString;
        cardId: z.ZodString;
        targetColumnId: z.ZodString;
        position: z.ZodOptional<z.ZodNumber>;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }, {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    }>, z.ZodObject<{
        op: z.ZodLiteral<"remove_items">;
        slotId: z.ZodString;
        itemIds: z.ZodArray<z.ZodString, "many">;
    }, "strict", z.ZodTypeAny, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }, {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    }>, z.ZodObject<{
        op: z.ZodLiteral<"set_status">;
        statusLabel: z.ZodString;
    }, "strict", z.ZodTypeAny, {
        op: "set_status";
        statusLabel: string;
    }, {
        op: "set_status";
        statusLabel: string;
    }>]>, "many">>;
    metadata: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
} & {
    templateId: z.ZodLiteral<"step-by-step-instructions">;
}, "strict", z.ZodTypeAny, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "step-by-step-instructions";
    metadata: Record<string, unknown>;
    operations: ({
        op: "set_header";
        title?: string | undefined;
        subtitle?: string | undefined;
        summary?: string | undefined;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        filters: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        op: "set_filter_chips";
        sortLabel?: string | undefined;
    } | {
        chips: {
            label: string;
            tone: "neutral" | "accent" | "success" | "warning" | "danger";
        }[];
        slotId: string;
        op: "set_scope_tags";
    } | {
        slotId: string;
        rows: {
            label: string;
            links: {
                label: string;
                href: string;
            }[];
            id: string;
            cells: {
                value: string;
                emphasis: boolean;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: string | undefined;
            }[];
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            bullets: string[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            meta?: string | undefined;
            imageLabel?: string | undefined;
            price?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            items: {
                chips: {
                    label: string;
                    tone: "neutral" | "accent" | "success" | "warning" | "danger";
                }[];
                bullets: string[];
                links: {
                    label: string;
                    href: string;
                }[];
                title: string;
                id?: string | undefined;
                subtitle?: string | undefined;
                meta?: string | undefined;
            }[];
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            time: string;
            id?: string | undefined;
            summary?: string | undefined;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            title: string;
            fields: {
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
            }[];
            id?: string | undefined;
            summary?: string | undefined;
            eyebrow?: string | undefined;
            note?: string | undefined;
            noteTitle?: string | undefined;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            chips: {
                label: string;
                tone: "neutral" | "accent" | "success" | "warning" | "danger";
            }[];
            links: {
                label: string;
                href: string;
            }[];
            title: string;
            id?: string | undefined;
            subtitle?: string | undefined;
            footer?: string | undefined;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[];
}, {
    kind: "workspace_template_update";
    schemaVersion: "recipe_workspace_template_update/v2";
    templateId: "step-by-step-instructions";
    metadata?: Record<string, unknown> | undefined;
    operations?: ({
        op: "set_header";
        title?: unknown;
        subtitle?: unknown;
        summary?: unknown;
    } | {
        slotId: string;
        op: "set_active_tab";
        tabId: string;
    } | {
        slotId: string;
        lines: string[];
        op: "append_note_lines";
    } | {
        slotId: string;
        op: "set_filter_chips";
        filters?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
        sortLabel?: unknown;
    } | {
        slotId: string;
        op: "set_scope_tags";
        chips?: {
            label: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
        }[] | undefined;
    } | {
        slotId: string;
        rows: {
            label: string;
            id: string;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            cells?: {
                value: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                subvalue?: unknown;
                emphasis?: boolean | undefined;
            }[] | undefined;
        }[];
        op: "upsert_table_rows";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            bullets?: string[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            meta?: unknown;
            imageLabel?: unknown;
            price?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_cards";
    } | {
        slotId: string;
        groups: {
            label: string;
            id: string;
            tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            items?: {
                title: string;
                chips?: {
                    label: string;
                    tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
                }[] | undefined;
                bullets?: string[] | undefined;
                links?: {
                    label: string;
                    href: string;
                }[] | undefined;
                id?: unknown;
                subtitle?: unknown;
                meta?: unknown;
            }[] | undefined;
        }[];
        op: "upsert_groups";
    } | {
        slotId: string;
        items: {
            title: string;
            time: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
        }[];
        op: "upsert_timeline_items";
    } | {
        detail: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            id?: unknown;
            summary?: unknown;
            eyebrow?: unknown;
            fields?: {
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
            }[] | undefined;
            note?: unknown;
            noteTitle?: unknown;
        };
        slotId: string;
        op: "set_detail";
    } | {
        cards: {
            title: string;
            chips?: {
                label: string;
                tone?: "neutral" | "accent" | "success" | "warning" | "danger" | undefined;
            }[] | undefined;
            links?: {
                label: string;
                href: string;
            }[] | undefined;
            id?: unknown;
            subtitle?: unknown;
            footer?: unknown;
        }[];
        slotId: string;
        op: "upsert_board_cards";
        columnId: string;
    } | {
        slotId: string;
        op: "move_board_card";
        cardId: string;
        targetColumnId: string;
        position?: number | undefined;
    } | {
        slotId: string;
        op: "remove_items";
        itemIds: string[];
    } | {
        op: "set_status";
        statusLabel: string;
    })[] | undefined;
}>]>;
export type WorkspaceTemplateUpdate = z.infer<typeof WorkspaceTemplateUpdateSchema>;
