import { z } from 'zod';
const OptionalTextSchema = z.preprocess((value) => (value === null ? undefined : value), z.string().min(1).optional());
export const SPACE_TEMPLATE_IDS = [
    'price-comparison-grid',
    'shopping-shortlist',
    'inbox-triage-board',
    'restaurant-finder',
    'hotel-shortlist',
    'flight-comparison',
    'travel-itinerary-planner',
    'research-notebook',
    'security-review-board',
    'vendor-evaluation-matrix',
    'event-planner',
    'job-search-pipeline',
    'content-campaign-planner',
    'local-discovery-comparison',
    'step-by-step-instructions'
];
export const SpaceTemplateIdSchema = z.enum(SPACE_TEMPLATE_IDS);
export const WorkspaceTemplateToneSchema = z.enum(['neutral', 'accent', 'success', 'warning', 'danger']);
export const WorkspaceTemplateChipSchema = z
    .object({
    label: z.string().min(1),
    tone: WorkspaceTemplateToneSchema.default('neutral')
})
    .strict();
export const WorkspaceTemplateActionReferenceSchema = z.discriminatedUnion('kind', [
    z
        .object({
        kind: z.literal('existing_action'),
        actionId: z.string().min(1),
        selectedItemIds: z.array(z.string().min(1)).default([])
    })
        .strict(),
    z
        .object({
        kind: z.literal('link'),
        label: z.string().min(1),
        href: z.string().min(1),
        openInNewTab: z.boolean().default(true)
    })
        .strict()
]);
export const WorkspaceTemplateStatSchema = z
    .object({
    label: z.string().min(1),
    value: z.string().min(1),
    helper: OptionalTextSchema,
    tone: WorkspaceTemplateToneSchema.optional()
})
    .strict();
export const WorkspaceTemplateFieldLinkSchema = z
    .object({
    label: z.string().min(1),
    href: z.string().min(1)
})
    .strict();
export const WorkspaceTemplateFieldSchema = z
    .object({
    label: z.string().min(1),
    value: OptionalTextSchema,
    chips: z.array(WorkspaceTemplateChipSchema).default([]),
    bullets: z.array(z.string().min(1)).default([]),
    links: z.array(WorkspaceTemplateFieldLinkSchema).default([]),
    fullWidth: z.boolean().default(false)
})
    .strict();
export const WorkspaceTemplateListItemSchema = z
    .object({
    id: OptionalTextSchema,
    title: z.string().min(1),
    subtitle: OptionalTextSchema,
    meta: OptionalTextSchema,
    chips: z.array(WorkspaceTemplateChipSchema).default([]),
    actions: z.array(WorkspaceTemplateActionReferenceSchema).default([])
})
    .strict();
export const WorkspaceTemplateCardItemSchema = z
    .object({
    id: OptionalTextSchema,
    title: z.string().min(1),
    subtitle: OptionalTextSchema,
    meta: OptionalTextSchema,
    imageLabel: OptionalTextSchema,
    price: OptionalTextSchema,
    chips: z.array(WorkspaceTemplateChipSchema).default([]),
    bullets: z.array(z.string().min(1)).default([]),
    footer: OptionalTextSchema,
    actions: z.array(WorkspaceTemplateActionReferenceSchema).default([])
})
    .strict();
export const WorkspaceTemplateTimelineItemSchema = z
    .object({
    id: OptionalTextSchema,
    title: z.string().min(1),
    time: z.string().min(1),
    summary: OptionalTextSchema,
    chips: z.array(WorkspaceTemplateChipSchema).default([]),
    actions: z.array(WorkspaceTemplateActionReferenceSchema).default([])
})
    .strict();
export const WorkspaceTemplateActivityItemSchema = z
    .object({
    id: OptionalTextSchema,
    label: z.string().min(1),
    detail: z.string().min(1),
    timestamp: OptionalTextSchema,
    tone: WorkspaceTemplateToneSchema.optional()
})
    .strict();
export const WorkspaceTemplateBoardCardSchema = z
    .object({
    id: OptionalTextSchema,
    title: z.string().min(1),
    subtitle: OptionalTextSchema,
    chips: z.array(WorkspaceTemplateChipSchema).default([]),
    footer: OptionalTextSchema,
    actions: z.array(WorkspaceTemplateActionReferenceSchema).default([])
})
    .strict();
export const WorkspaceTemplateBoardColumnSchema = z
    .object({
    id: OptionalTextSchema,
    label: z.string().min(1),
    tone: WorkspaceTemplateToneSchema.optional(),
    cards: z.array(WorkspaceTemplateBoardCardSchema).default([])
})
    .strict();
export const WorkspaceTemplateTableColumnSchema = z
    .object({
    id: z.string().min(1),
    label: z.string().min(1),
    align: z.enum(['start', 'end', 'center']).default('start')
})
    .strict();
export const WorkspaceTemplateTableCellSchema = z
    .object({
    value: z.string().min(1),
    subvalue: OptionalTextSchema,
    tone: WorkspaceTemplateToneSchema.optional(),
    emphasis: z.boolean().default(false)
})
    .strict();
export const WorkspaceTemplateTableRowSchema = z
    .object({
    id: z.string().min(1),
    label: z.string().min(1),
    cells: z.array(WorkspaceTemplateTableCellSchema).default([]),
    actions: z.array(WorkspaceTemplateActionReferenceSchema).default([])
})
    .strict();
export const WorkspaceTemplateSectionHydrationStateSchema = z.enum(['pending', 'hydrating', 'ready', 'failed']);
export const WorkspaceTemplateSectionRepairStateSchema = z.enum(['idle', 'repairing', 'recovered', 'failed']);
export const WorkspaceTemplateSectionContentStateSchema = z.enum(['ghost', 'partial', 'hydrated', 'fallback']);
export const WorkspaceTemplateSectionProgressSchema = z
    .object({
    hydrationState: WorkspaceTemplateSectionHydrationStateSchema.default('ready'),
    repairState: WorkspaceTemplateSectionRepairStateSchema.default('idle'),
    contentState: WorkspaceTemplateSectionContentStateSchema.default('hydrated'),
    lastUpdatedAt: OptionalTextSchema,
    errorMessage: OptionalTextSchema
})
    .strict();
export const WorkspaceTemplateViewPhaseSchema = z.enum(['selected', 'text', 'hydrating', 'actions', 'repairing', 'ready', 'failed']);
export const WorkspaceTemplateStateStatusSchema = z
    .object({
    phase: WorkspaceTemplateViewPhaseSchema.default('ready'),
    lastUpdatedAt: OptionalTextSchema,
    failureCategory: OptionalTextSchema,
    errorMessage: OptionalTextSchema
})
    .strict();
const WorkspaceTemplateSectionBaseSchema = z
    .object({
    slotId: z.string().min(1),
    progress: WorkspaceTemplateSectionProgressSchema.optional()
})
    .strict();
export const WorkspaceTemplateSectionSchema = z.lazy(() => z.discriminatedUnion('kind', [
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('hero'),
        eyebrow: OptionalTextSchema,
        title: z.string().min(1),
        summary: z.string().min(1),
        chips: z.array(WorkspaceTemplateChipSchema).default([]),
        actions: z.array(WorkspaceTemplateActionReferenceSchema).default([])
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('filter-strip'),
        title: OptionalTextSchema,
        filters: z.array(WorkspaceTemplateChipSchema).default([]),
        sortLabel: OptionalTextSchema
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('action-bar'),
        title: OptionalTextSchema,
        actions: z.array(WorkspaceTemplateActionReferenceSchema).default([])
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('stats'),
        title: OptionalTextSchema,
        items: z.array(WorkspaceTemplateStatSchema).default([])
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('comparison-table'),
        title: z.string().min(1),
        columns: z.array(WorkspaceTemplateTableColumnSchema).default([]),
        rows: z.array(WorkspaceTemplateTableRowSchema).default([]),
        footerChips: z.array(WorkspaceTemplateChipSchema).default([]),
        footnote: OptionalTextSchema
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('grouped-list'),
        title: z.string().min(1),
        groups: z
            .array(z
            .object({
            id: z.string().min(1),
            label: z.string().min(1),
            tone: WorkspaceTemplateToneSchema.optional(),
            items: z.array(WorkspaceTemplateListItemSchema).default([])
        })
            .strict())
            .default([])
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('card-grid'),
        title: z.string().min(1),
        columns: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
        cards: z.array(WorkspaceTemplateCardItemSchema).default([])
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('detail-panel'),
        title: z.string().min(1),
        eyebrow: OptionalTextSchema,
        summary: OptionalTextSchema,
        chips: z.array(WorkspaceTemplateChipSchema).default([]),
        fields: z.array(WorkspaceTemplateFieldSchema).default([]),
        actions: z.array(WorkspaceTemplateActionReferenceSchema).default([]),
        note: OptionalTextSchema,
        noteTitle: OptionalTextSchema
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('timeline'),
        title: z.string().min(1),
        items: z.array(WorkspaceTemplateTimelineItemSchema).default([])
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('notes'),
        title: z.string().min(1),
        lines: z.array(z.string().min(1)).default([]),
        actions: z.array(WorkspaceTemplateActionReferenceSchema).default([])
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('activity-log'),
        title: z.string().min(1),
        entries: z.array(WorkspaceTemplateActivityItemSchema).default([])
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('kanban'),
        title: z.string().min(1),
        columns: z.array(WorkspaceTemplateBoardColumnSchema).default([])
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('confirmation'),
        title: z.string().min(1),
        message: z.string().min(1),
        confirmAction: WorkspaceTemplateActionReferenceSchema,
        secondaryAction: WorkspaceTemplateActionReferenceSchema.optional(),
        tone: WorkspaceTemplateToneSchema.optional()
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('split'),
        title: OptionalTextSchema,
        ratio: z.enum(['balanced', 'list-detail', 'detail-list']).default('balanced'),
        left: z.array(WorkspaceTemplateSectionSchema).default([]),
        right: z.array(WorkspaceTemplateSectionSchema).default([])
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('tabs'),
        title: OptionalTextSchema,
        tabs: z
            .array(z
            .object({
            id: z.string().min(1),
            label: z.string().min(1),
            badge: OptionalTextSchema
        })
            .strict())
            .default([]),
        activeTabId: z.string().min(1),
        panes: z.record(z.string().min(1), z.array(WorkspaceTemplateSectionSchema))
    }).strict(),
    WorkspaceTemplateSectionBaseSchema.extend({
        kind: z.literal('checklist'),
        title: z.string().min(1),
        prerequisites: z.array(z.string().min(1)).default([]),
        steps: z
            .array(z
            .object({
            id: z.string().min(1),
            label: z.string().min(1),
            detail: OptionalTextSchema,
            checked: z.boolean().default(false)
        })
            .strict())
            .default([]),
        actions: z.array(WorkspaceTemplateActionReferenceSchema).default([])
    }).strict()
]));
export const WorkspaceTemplateTransitionRecordSchema = z
    .object({
    fromTemplateId: SpaceTemplateIdSchema,
    toTemplateId: SpaceTemplateIdSchema,
    switchedAt: z.string().datetime(),
    reason: OptionalTextSchema
})
    .strict();
export const WorkspaceTemplateStateSchema = z
    .object({
    kind: z.literal('workspace_template_state'),
    schemaVersion: z.literal('space_workspace_template_state/v1'),
    templateId: SpaceTemplateIdSchema,
    title: z.string().min(1),
    subtitle: OptionalTextSchema,
    summary: z.string().min(1),
    status: WorkspaceTemplateStateStatusSchema.optional(),
    sections: z.array(WorkspaceTemplateSectionSchema).default([]),
    transitionTargets: z.array(SpaceTemplateIdSchema).default([]),
    transitionHistory: z.array(WorkspaceTemplateTransitionRecordSchema).default([]),
    metadata: z.record(z.string().min(1), z.unknown()).default({})
})
    .strict();
