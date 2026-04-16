import { z } from 'zod';
import { WorkspaceTemplateBoardCardSchema, SpaceTemplateIdSchema, WorkspaceTemplateCardItemSchema, WorkspaceTemplateChipSchema, WorkspaceTemplateFieldSchema, WorkspaceTemplateListItemSchema, WorkspaceTemplateStatSchema, WorkspaceTemplateTableColumnSchema, WorkspaceTemplateTableRowSchema, WorkspaceTemplateTimelineItemSchema, WorkspaceTemplateToneSchema } from './workspace-template-schemas';
const OptionalTextSchema = z.preprocess((value) => (value === null ? undefined : value), z.string().min(1).optional());
export const WorkspaceTemplateSelectionHintsSchema = z
    .object({
    primaryEntity: OptionalTextSchema,
    currentTemplateId: SpaceTemplateIdSchema.optional(),
    suggestedTransitionFrom: SpaceTemplateIdSchema.optional()
})
    .strict();
export const WorkspaceTemplateSelectionModeSchema = z.enum(['fill', 'update', 'switch']);
export const WorkspaceTemplateSelectionSchema = z
    .object({
    kind: z.literal('workspace_template_selection'),
    schemaVersion: z.literal('space_workspace_template_selection/v2'),
    templateId: SpaceTemplateIdSchema,
    mode: WorkspaceTemplateSelectionModeSchema.default('fill'),
    reason: z.string().min(1),
    confidence: z.number().min(0).max(1),
    hints: WorkspaceTemplateSelectionHintsSchema.optional()
})
    .strict();
export const WorkspaceTemplateAuthoringLinkSchema = z
    .object({
    label: z.string().min(1),
    href: z.string().min(1)
})
    .strict();
export const WorkspaceTemplateAuthoringListItemSchema = WorkspaceTemplateListItemSchema.omit({
    actions: true
})
    .extend({
    bullets: z.array(z.string().min(1)).default([]),
    links: z.array(WorkspaceTemplateAuthoringLinkSchema).default([])
})
    .strict();
export const WorkspaceTemplateAuthoringGroupSchema = z
    .object({
    id: z.string().min(1),
    label: z.string().min(1),
    tone: WorkspaceTemplateToneSchema.optional(),
    items: z.array(WorkspaceTemplateAuthoringListItemSchema).default([])
})
    .strict();
export const WorkspaceTemplateAuthoringCardItemSchema = WorkspaceTemplateCardItemSchema.omit({
    actions: true
})
    .extend({
    links: z.array(WorkspaceTemplateAuthoringLinkSchema).default([])
})
    .strict();
export const WorkspaceTemplateAuthoringTimelineItemSchema = WorkspaceTemplateTimelineItemSchema.omit({
    actions: true
})
    .extend({
    links: z.array(WorkspaceTemplateAuthoringLinkSchema).default([])
})
    .strict();
export const WorkspaceTemplateAuthoringBoardCardSchema = WorkspaceTemplateBoardCardSchema.omit({
    actions: true
})
    .extend({
    links: z.array(WorkspaceTemplateAuthoringLinkSchema).default([])
})
    .strict();
export const WorkspaceTemplateAuthoringBoardColumnSchema = z
    .object({
    id: z.string().min(1),
    label: z.string().min(1),
    tone: WorkspaceTemplateToneSchema.optional(),
    cards: z.array(WorkspaceTemplateAuthoringBoardCardSchema).default([])
})
    .strict();
export const WorkspaceTemplateAuthoringTableRowSchema = WorkspaceTemplateTableRowSchema.omit({
    actions: true
})
    .extend({
    links: z.array(WorkspaceTemplateAuthoringLinkSchema).default([])
})
    .strict();
export const WorkspaceTemplateAuthoringDetailSchema = z
    .object({
    id: OptionalTextSchema,
    title: z.string().min(1),
    eyebrow: OptionalTextSchema,
    summary: OptionalTextSchema,
    chips: z.array(WorkspaceTemplateChipSchema).default([]),
    fields: z.array(WorkspaceTemplateFieldSchema).default([]),
    note: OptionalTextSchema,
    noteTitle: OptionalTextSchema
})
    .strict();
export const WorkspaceTemplateAuthoringChecklistItemSchema = z
    .object({
    id: z.string().min(1),
    title: z.string().min(1),
    subtitle: OptionalTextSchema,
    meta: OptionalTextSchema,
    checked: z.boolean().default(false),
    tone: WorkspaceTemplateToneSchema.optional()
})
    .strict();
export const WorkspaceTemplateFillBaseSchema = z
    .object({
    kind: z.literal('workspace_template_fill'),
    schemaVersion: z.literal('space_workspace_template_fill/v2'),
    title: z.string().min(1),
    subtitle: OptionalTextSchema,
    summary: z.string().min(1),
    metadata: z.record(z.string().min(1), z.unknown()).default({})
})
    .strict();
const PriceComparisonGridDataSchema = z
    .object({
    eyebrow: OptionalTextSchema,
    heroChips: z.array(WorkspaceTemplateChipSchema).default([]),
    scopeTags: z.array(WorkspaceTemplateChipSchema).default([]),
    columns: z.array(WorkspaceTemplateTableColumnSchema).min(1),
    rows: z.array(WorkspaceTemplateAuthoringTableRowSchema).default([]),
    noteLines: z.array(z.string().min(1)).default([])
})
    .strict();
const ShoppingShortlistDataSchema = z
    .object({
    eyebrow: OptionalTextSchema,
    heroChips: z.array(WorkspaceTemplateChipSchema).default([]),
    cards: z.array(WorkspaceTemplateAuthoringCardItemSchema).default([]),
    noteLines: z.array(z.string().min(1)).default([])
})
    .strict();
const InboxTriageBoardDataSchema = z
    .object({
    eyebrow: OptionalTextSchema,
    heroChips: z.array(WorkspaceTemplateChipSchema).default([]),
    stats: z.array(WorkspaceTemplateStatSchema).default([]),
    groups: z.array(WorkspaceTemplateAuthoringGroupSchema).default([]),
    detail: WorkspaceTemplateAuthoringDetailSchema,
    bulkActionTitle: OptionalTextSchema
})
    .strict();
const ListDetailResultsDataSchema = z
    .object({
    eyebrow: OptionalTextSchema,
    heroChips: z.array(WorkspaceTemplateChipSchema).default([]),
    filters: z.array(WorkspaceTemplateChipSchema).default([]),
    sortLabel: OptionalTextSchema,
    groups: z.array(WorkspaceTemplateAuthoringGroupSchema).default([]),
    detail: WorkspaceTemplateAuthoringDetailSchema,
    noteLines: z.array(z.string().min(1)).default([])
})
    .strict();
const HotelShortlistDataSchema = z
    .object({
    eyebrow: OptionalTextSchema,
    heroChips: z.array(WorkspaceTemplateChipSchema).default([]),
    stats: z.array(WorkspaceTemplateStatSchema).default([]),
    cards: z.array(WorkspaceTemplateAuthoringCardItemSchema).default([]),
    noteLines: z.array(z.string().min(1)).default([])
})
    .strict();
const FlightComparisonLegSchema = z
    .object({
    id: z.string().min(1),
    label: z.string().min(1),
    badge: OptionalTextSchema,
    columns: z.array(WorkspaceTemplateTableColumnSchema).min(1),
    rows: z.array(WorkspaceTemplateAuthoringTableRowSchema).default([]),
    footnote: OptionalTextSchema
})
    .strict();
const FlightComparisonDataSchema = z
    .object({
    eyebrow: OptionalTextSchema,
    heroChips: z.array(WorkspaceTemplateChipSchema).default([]),
    activeTabId: OptionalTextSchema,
    legs: z.array(FlightComparisonLegSchema).min(1)
})
    .strict();
const TravelItineraryPlannerDataSchema = z
    .object({
    eyebrow: OptionalTextSchema,
    heroChips: z.array(WorkspaceTemplateChipSchema).default([]),
    activeTabId: OptionalTextSchema,
    itineraryItems: z.array(WorkspaceTemplateAuthoringTimelineItemSchema).default([]),
    bookingCards: z.array(WorkspaceTemplateAuthoringCardItemSchema).default([]),
    packingItems: z.array(WorkspaceTemplateAuthoringChecklistItemSchema).default([]),
    noteLines: z.array(z.string().min(1)).default([]),
    links: z.array(WorkspaceTemplateAuthoringLinkSchema).default([])
})
    .strict();
const ResearchNotebookDataSchema = z
    .object({
    eyebrow: OptionalTextSchema,
    heroChips: z.array(WorkspaceTemplateChipSchema).default([]),
    activeTabId: OptionalTextSchema,
    sources: z.array(WorkspaceTemplateAuthoringGroupSchema).default([]),
    noteLines: z.array(z.string().min(1)).default([]),
    extractedPoints: z.array(WorkspaceTemplateAuthoringGroupSchema).default([]),
    followUps: z.array(WorkspaceTemplateAuthoringGroupSchema).default([])
})
    .strict();
const SecurityReviewBoardDataSchema = z
    .object({
    eyebrow: OptionalTextSchema,
    heroChips: z.array(WorkspaceTemplateChipSchema).default([]),
    stats: z.array(WorkspaceTemplateStatSchema).default([]),
    groups: z.array(WorkspaceTemplateAuthoringGroupSchema).default([]),
    detail: WorkspaceTemplateAuthoringDetailSchema,
    remediationTitle: OptionalTextSchema,
    remediationMarkdown: OptionalTextSchema
})
    .strict();
const VendorEvaluationMatrixDataSchema = z
    .object({
    eyebrow: OptionalTextSchema,
    heroChips: z.array(WorkspaceTemplateChipSchema).default([]),
    stats: z.array(WorkspaceTemplateStatSchema).default([]),
    columns: z.array(WorkspaceTemplateTableColumnSchema).min(1),
    rows: z.array(WorkspaceTemplateAuthoringTableRowSchema).default([]),
    footerChips: z.array(WorkspaceTemplateChipSchema).default([]),
    footnote: OptionalTextSchema,
    noteLines: z.array(z.string().min(1)).default([])
})
    .strict();
const EventPlannerDataSchema = z
    .object({
    eyebrow: OptionalTextSchema,
    heroChips: z.array(WorkspaceTemplateChipSchema).default([]),
    activeTabId: OptionalTextSchema,
    venueCards: z.array(WorkspaceTemplateAuthoringCardItemSchema).default([]),
    guestGroups: z.array(WorkspaceTemplateAuthoringGroupSchema).default([]),
    checklistItems: z.array(WorkspaceTemplateAuthoringChecklistItemSchema).default([]),
    itineraryItems: z.array(WorkspaceTemplateAuthoringTimelineItemSchema).default([]),
    noteLines: z.array(z.string().min(1)).default([])
})
    .strict();
const JobSearchPipelineDataSchema = z
    .object({
    eyebrow: OptionalTextSchema,
    heroChips: z.array(WorkspaceTemplateChipSchema).default([]),
    stats: z.array(WorkspaceTemplateStatSchema).default([]),
    columns: z.array(WorkspaceTemplateAuthoringBoardColumnSchema).default([]),
    detail: WorkspaceTemplateAuthoringDetailSchema
})
    .strict();
const ContentCampaignPlannerDataSchema = z
    .object({
    eyebrow: OptionalTextSchema,
    heroChips: z.array(WorkspaceTemplateChipSchema).default([]),
    activeTabId: OptionalTextSchema,
    ideaCards: z.array(WorkspaceTemplateAuthoringCardItemSchema).default([]),
    draftLines: z.array(z.string().min(1)).default([]),
    scheduleItems: z.array(WorkspaceTemplateAuthoringTimelineItemSchema).default([]),
    noteLines: z.array(z.string().min(1)).default([])
})
    .strict();
const StepByStepInstructionsDataSchema = z
    .object({
    eyebrow: OptionalTextSchema,
    heroChips: z.array(WorkspaceTemplateChipSchema).default([]),
    prerequisites: z.array(z.string().min(1)).default([]),
    steps: z
        .array(z
        .object({
        id: z.string().min(1),
        label: z.string().min(1),
        detail: OptionalTextSchema
    })
        .strict())
        .default([]),
    noteLines: z.array(z.string().min(1)).default([])
})
    .strict();
const StepByStepInstructionsActionsDataSchema = z
    .object({
    steps: z
        .array(z
        .object({
        id: z.string().min(1),
        links: z.array(z.object({ label: z.string().min(1), href: z.string().min(1) })).default([])
    })
        .strict())
        .default([])
})
    .strict();
const createTemplateFillSchema = (templateId, dataSchema) => WorkspaceTemplateFillBaseSchema.extend({
    templateId: z.literal(templateId),
    data: dataSchema
}).strict();
export const WorkspaceTemplateFillSchema = z.discriminatedUnion('templateId', [
    createTemplateFillSchema('price-comparison-grid', PriceComparisonGridDataSchema),
    createTemplateFillSchema('shopping-shortlist', ShoppingShortlistDataSchema),
    createTemplateFillSchema('inbox-triage-board', InboxTriageBoardDataSchema),
    createTemplateFillSchema('restaurant-finder', ListDetailResultsDataSchema),
    createTemplateFillSchema('hotel-shortlist', HotelShortlistDataSchema),
    createTemplateFillSchema('flight-comparison', FlightComparisonDataSchema),
    createTemplateFillSchema('travel-itinerary-planner', TravelItineraryPlannerDataSchema),
    createTemplateFillSchema('research-notebook', ResearchNotebookDataSchema),
    createTemplateFillSchema('security-review-board', SecurityReviewBoardDataSchema),
    createTemplateFillSchema('vendor-evaluation-matrix', VendorEvaluationMatrixDataSchema),
    createTemplateFillSchema('event-planner', EventPlannerDataSchema),
    createTemplateFillSchema('job-search-pipeline', JobSearchPipelineDataSchema),
    createTemplateFillSchema('content-campaign-planner', ContentCampaignPlannerDataSchema),
    createTemplateFillSchema('local-discovery-comparison', ListDetailResultsDataSchema),
    createTemplateFillSchema('step-by-step-instructions', StepByStepInstructionsDataSchema)
]);
const WorkspaceTemplateHydrationBaseSchema = z
    .object({
    kind: z.literal('workspace_template_hydration'),
    schemaVersion: z.literal('space_workspace_template_hydration/v1'),
    title: z.string().min(1),
    subtitle: OptionalTextSchema,
    summary: z.string().min(1),
    metadata: z.record(z.string().min(1), z.unknown()).default({})
})
    .strict();
const createTemplateHydrationSchema = (templateId, dataSchema) => WorkspaceTemplateHydrationBaseSchema.extend({
    templateId: z.literal(templateId),
    data: dataSchema
}).strict();
export const WorkspaceTemplateHydrationSchema = z.discriminatedUnion('templateId', [
    createTemplateHydrationSchema('price-comparison-grid', PriceComparisonGridDataSchema),
    createTemplateHydrationSchema('shopping-shortlist', ShoppingShortlistDataSchema),
    createTemplateHydrationSchema('inbox-triage-board', InboxTriageBoardDataSchema),
    createTemplateHydrationSchema('restaurant-finder', ListDetailResultsDataSchema),
    createTemplateHydrationSchema('hotel-shortlist', HotelShortlistDataSchema),
    createTemplateHydrationSchema('flight-comparison', FlightComparisonDataSchema),
    createTemplateHydrationSchema('travel-itinerary-planner', TravelItineraryPlannerDataSchema),
    createTemplateHydrationSchema('research-notebook', ResearchNotebookDataSchema),
    createTemplateHydrationSchema('security-review-board', SecurityReviewBoardDataSchema),
    createTemplateHydrationSchema('vendor-evaluation-matrix', VendorEvaluationMatrixDataSchema),
    createTemplateHydrationSchema('event-planner', EventPlannerDataSchema),
    createTemplateHydrationSchema('job-search-pipeline', JobSearchPipelineDataSchema),
    createTemplateHydrationSchema('content-campaign-planner', ContentCampaignPlannerDataSchema),
    createTemplateHydrationSchema('local-discovery-comparison', ListDetailResultsDataSchema),
    createTemplateHydrationSchema('step-by-step-instructions', StepByStepInstructionsDataSchema)
]);
const WorkspaceTemplateTextBaseSchema = z
    .object({
    kind: z.literal('workspace_template_text'),
    schemaVersion: z.literal('space_workspace_template_text/v1'),
    title: z.string().min(1),
    subtitle: OptionalTextSchema,
    summary: z.string().min(1),
    metadata: z.record(z.string().min(1), z.unknown()).default({})
})
    .strict();
const createTemplateTextSchema = (templateId, dataSchema) => WorkspaceTemplateTextBaseSchema.extend({
    templateId: z.literal(templateId),
    data: dataSchema
}).strict();
export const WorkspaceTemplateTextSchema = z.discriminatedUnion('templateId', [
    createTemplateTextSchema('price-comparison-grid', PriceComparisonGridDataSchema),
    createTemplateTextSchema('shopping-shortlist', ShoppingShortlistDataSchema),
    createTemplateTextSchema('inbox-triage-board', InboxTriageBoardDataSchema),
    createTemplateTextSchema('restaurant-finder', ListDetailResultsDataSchema),
    createTemplateTextSchema('hotel-shortlist', HotelShortlistDataSchema),
    createTemplateTextSchema('flight-comparison', FlightComparisonDataSchema),
    createTemplateTextSchema('travel-itinerary-planner', TravelItineraryPlannerDataSchema),
    createTemplateTextSchema('research-notebook', ResearchNotebookDataSchema),
    createTemplateTextSchema('security-review-board', SecurityReviewBoardDataSchema),
    createTemplateTextSchema('vendor-evaluation-matrix', VendorEvaluationMatrixDataSchema),
    createTemplateTextSchema('event-planner', EventPlannerDataSchema),
    createTemplateTextSchema('job-search-pipeline', JobSearchPipelineDataSchema),
    createTemplateTextSchema('content-campaign-planner', ContentCampaignPlannerDataSchema),
    createTemplateTextSchema('local-discovery-comparison', ListDetailResultsDataSchema),
    createTemplateTextSchema('step-by-step-instructions', StepByStepInstructionsDataSchema)
]);
const WorkspaceTemplateTableRowLinksOverlaySchema = z
    .object({
    id: z.string().min(1),
    links: z.array(WorkspaceTemplateAuthoringLinkSchema).default([])
})
    .strict();
const WorkspaceTemplateCardLinksOverlaySchema = z
    .object({
    id: z.string().min(1),
    links: z.array(WorkspaceTemplateAuthoringLinkSchema).default([])
})
    .strict();
const WorkspaceTemplateListItemLinksOverlaySchema = z
    .object({
    id: z.string().min(1),
    links: z.array(WorkspaceTemplateAuthoringLinkSchema).default([])
})
    .strict();
const WorkspaceTemplateGroupLinksOverlaySchema = z
    .object({
    id: z.string().min(1),
    items: z.array(WorkspaceTemplateListItemLinksOverlaySchema).default([])
})
    .strict();
const WorkspaceTemplateTimelineLinksOverlaySchema = z
    .object({
    id: z.string().min(1),
    links: z.array(WorkspaceTemplateAuthoringLinkSchema).default([])
})
    .strict();
const WorkspaceTemplateBoardCardLinksOverlaySchema = z
    .object({
    id: z.string().min(1),
    links: z.array(WorkspaceTemplateAuthoringLinkSchema).default([])
})
    .strict();
const WorkspaceTemplateBoardColumnLinksOverlaySchema = z
    .object({
    id: z.string().min(1),
    cards: z.array(WorkspaceTemplateBoardCardLinksOverlaySchema).default([])
})
    .strict();
const WorkspaceTemplateDetailFieldLinksOverlaySchema = z
    .object({
    label: z.string().min(1),
    links: z.array(WorkspaceTemplateAuthoringLinkSchema).default([])
})
    .strict();
const WorkspaceTemplateDetailLinksOverlaySchema = z
    .object({
    id: OptionalTextSchema,
    fields: z.array(WorkspaceTemplateDetailFieldLinksOverlaySchema).default([])
})
    .strict();
const FlightComparisonActionsLegSchema = z
    .object({
    id: z.string().min(1),
    rows: z.array(WorkspaceTemplateTableRowLinksOverlaySchema).default([])
})
    .strict();
const PriceComparisonGridActionsDataSchema = z
    .object({
    rows: z.array(WorkspaceTemplateTableRowLinksOverlaySchema).default([])
})
    .strict();
const ShoppingShortlistActionsDataSchema = z
    .object({
    cards: z.array(WorkspaceTemplateCardLinksOverlaySchema).default([])
})
    .strict();
const InboxTriageBoardActionsDataSchema = z
    .object({
    groups: z.array(WorkspaceTemplateGroupLinksOverlaySchema).default([]),
    detail: WorkspaceTemplateDetailLinksOverlaySchema.optional()
})
    .strict();
const ListDetailActionsDataSchema = z
    .object({
    groups: z.array(WorkspaceTemplateGroupLinksOverlaySchema).default([]),
    detail: WorkspaceTemplateDetailLinksOverlaySchema.optional()
})
    .strict();
const HotelShortlistActionsDataSchema = z
    .object({
    cards: z.array(WorkspaceTemplateCardLinksOverlaySchema).default([])
})
    .strict();
const FlightComparisonActionsDataSchema = z
    .object({
    legs: z.array(FlightComparisonActionsLegSchema).default([])
})
    .strict();
const TravelItineraryPlannerActionsDataSchema = z
    .object({
    itineraryItems: z.array(WorkspaceTemplateTimelineLinksOverlaySchema).default([]),
    bookingCards: z.array(WorkspaceTemplateCardLinksOverlaySchema).default([]),
    links: z.array(WorkspaceTemplateAuthoringLinkSchema).default([])
})
    .strict();
const ResearchNotebookActionsDataSchema = z
    .object({
    sources: z.array(WorkspaceTemplateGroupLinksOverlaySchema).default([]),
    extractedPoints: z.array(WorkspaceTemplateGroupLinksOverlaySchema).default([]),
    followUps: z.array(WorkspaceTemplateGroupLinksOverlaySchema).default([])
})
    .strict();
const SecurityReviewBoardActionsDataSchema = z
    .object({
    groups: z.array(WorkspaceTemplateGroupLinksOverlaySchema).default([]),
    detail: WorkspaceTemplateDetailLinksOverlaySchema.optional()
})
    .strict();
const VendorEvaluationMatrixActionsDataSchema = z
    .object({
    rows: z.array(WorkspaceTemplateTableRowLinksOverlaySchema).default([])
})
    .strict();
const EventPlannerActionsDataSchema = z
    .object({
    venueCards: z.array(WorkspaceTemplateCardLinksOverlaySchema).default([]),
    guestGroups: z.array(WorkspaceTemplateGroupLinksOverlaySchema).default([]),
    itineraryItems: z.array(WorkspaceTemplateTimelineLinksOverlaySchema).default([])
})
    .strict();
const JobSearchPipelineActionsDataSchema = z
    .object({
    columns: z.array(WorkspaceTemplateBoardColumnLinksOverlaySchema).default([]),
    detail: WorkspaceTemplateDetailLinksOverlaySchema.optional()
})
    .strict();
const ContentCampaignPlannerActionsDataSchema = z
    .object({
    ideaCards: z.array(WorkspaceTemplateCardLinksOverlaySchema).default([]),
    scheduleItems: z.array(WorkspaceTemplateTimelineLinksOverlaySchema).default([])
})
    .strict();
const WorkspaceTemplateActionsBaseSchema = z
    .object({
    kind: z.literal('workspace_template_actions'),
    schemaVersion: z.literal('space_workspace_template_actions/v1'),
    metadata: z.record(z.string().min(1), z.unknown()).default({})
})
    .strict();
const createTemplateActionsSchema = (templateId, dataSchema) => WorkspaceTemplateActionsBaseSchema.extend({
    templateId: z.literal(templateId),
    data: dataSchema
}).strict();
export const WorkspaceTemplateActionsSchema = z.discriminatedUnion('templateId', [
    createTemplateActionsSchema('price-comparison-grid', PriceComparisonGridActionsDataSchema),
    createTemplateActionsSchema('shopping-shortlist', ShoppingShortlistActionsDataSchema),
    createTemplateActionsSchema('inbox-triage-board', InboxTriageBoardActionsDataSchema),
    createTemplateActionsSchema('restaurant-finder', ListDetailActionsDataSchema),
    createTemplateActionsSchema('hotel-shortlist', HotelShortlistActionsDataSchema),
    createTemplateActionsSchema('flight-comparison', FlightComparisonActionsDataSchema),
    createTemplateActionsSchema('travel-itinerary-planner', TravelItineraryPlannerActionsDataSchema),
    createTemplateActionsSchema('research-notebook', ResearchNotebookActionsDataSchema),
    createTemplateActionsSchema('security-review-board', SecurityReviewBoardActionsDataSchema),
    createTemplateActionsSchema('vendor-evaluation-matrix', VendorEvaluationMatrixActionsDataSchema),
    createTemplateActionsSchema('event-planner', EventPlannerActionsDataSchema),
    createTemplateActionsSchema('job-search-pipeline', JobSearchPipelineActionsDataSchema),
    createTemplateActionsSchema('content-campaign-planner', ContentCampaignPlannerActionsDataSchema),
    createTemplateActionsSchema('local-discovery-comparison', ListDetailActionsDataSchema),
    createTemplateActionsSchema('step-by-step-instructions', StepByStepInstructionsActionsDataSchema)
]);
export const WorkspaceTemplateUpdateOperationSchema = z.discriminatedUnion('op', [
    z
        .object({
        op: z.literal('set_header'),
        title: OptionalTextSchema,
        subtitle: OptionalTextSchema,
        summary: OptionalTextSchema
    })
        .strict(),
    z
        .object({
        op: z.literal('set_active_tab'),
        slotId: z.string().min(1),
        tabId: z.string().min(1)
    })
        .strict(),
    z
        .object({
        op: z.literal('append_note_lines'),
        slotId: z.string().min(1),
        lines: z.array(z.string().min(1)).min(1)
    })
        .strict(),
    z
        .object({
        op: z.literal('set_filter_chips'),
        slotId: z.string().min(1),
        filters: z.array(WorkspaceTemplateChipSchema).default([]),
        sortLabel: OptionalTextSchema
    })
        .strict(),
    z
        .object({
        op: z.literal('set_scope_tags'),
        slotId: z.string().min(1),
        chips: z.array(WorkspaceTemplateChipSchema).default([])
    })
        .strict(),
    z
        .object({
        op: z.literal('upsert_table_rows'),
        slotId: z.string().min(1),
        rows: z.array(WorkspaceTemplateAuthoringTableRowSchema).min(1)
    })
        .strict(),
    z
        .object({
        op: z.literal('upsert_cards'),
        slotId: z.string().min(1),
        cards: z.array(WorkspaceTemplateAuthoringCardItemSchema).min(1)
    })
        .strict(),
    z
        .object({
        op: z.literal('upsert_groups'),
        slotId: z.string().min(1),
        groups: z.array(WorkspaceTemplateAuthoringGroupSchema).min(1)
    })
        .strict(),
    z
        .object({
        op: z.literal('upsert_timeline_items'),
        slotId: z.string().min(1),
        items: z.array(WorkspaceTemplateAuthoringTimelineItemSchema).min(1)
    })
        .strict(),
    z
        .object({
        op: z.literal('set_detail'),
        slotId: z.string().min(1),
        detail: WorkspaceTemplateAuthoringDetailSchema
    })
        .strict(),
    z
        .object({
        op: z.literal('upsert_board_cards'),
        slotId: z.string().min(1),
        columnId: z.string().min(1),
        cards: z.array(WorkspaceTemplateAuthoringBoardCardSchema).min(1)
    })
        .strict(),
    z
        .object({
        op: z.literal('move_board_card'),
        slotId: z.string().min(1),
        cardId: z.string().min(1),
        targetColumnId: z.string().min(1),
        position: z.number().int().nonnegative().optional()
    })
        .strict(),
    z
        .object({
        op: z.literal('remove_items'),
        slotId: z.string().min(1),
        itemIds: z.array(z.string().min(1)).min(1)
    })
        .strict(),
    z
        .object({
        op: z.literal('set_status'),
        statusLabel: z.string().min(1)
    })
        .strict()
]);
const WorkspaceTemplateUpdateBaseSchema = z
    .object({
    kind: z.literal('workspace_template_update'),
    schemaVersion: z.literal('space_workspace_template_update/v2'),
    operations: z.array(WorkspaceTemplateUpdateOperationSchema).default([]),
    metadata: z.record(z.string().min(1), z.unknown()).default({})
})
    .strict();
const createTemplateUpdateSchema = (templateId) => WorkspaceTemplateUpdateBaseSchema.extend({
    templateId: z.literal(templateId)
}).strict();
export const WorkspaceTemplateUpdateSchema = z.discriminatedUnion('templateId', [
    createTemplateUpdateSchema('price-comparison-grid'),
    createTemplateUpdateSchema('shopping-shortlist'),
    createTemplateUpdateSchema('inbox-triage-board'),
    createTemplateUpdateSchema('restaurant-finder'),
    createTemplateUpdateSchema('hotel-shortlist'),
    createTemplateUpdateSchema('flight-comparison'),
    createTemplateUpdateSchema('travel-itinerary-planner'),
    createTemplateUpdateSchema('research-notebook'),
    createTemplateUpdateSchema('security-review-board'),
    createTemplateUpdateSchema('vendor-evaluation-matrix'),
    createTemplateUpdateSchema('event-planner'),
    createTemplateUpdateSchema('job-search-pipeline'),
    createTemplateUpdateSchema('content-campaign-planner'),
    createTemplateUpdateSchema('local-discovery-comparison'),
    createTemplateUpdateSchema('step-by-step-instructions')
]);
