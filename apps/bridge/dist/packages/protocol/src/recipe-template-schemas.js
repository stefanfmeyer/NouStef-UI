import { z } from 'zod';
const OptionalTextSchema = z.preprocess((value) => (value === null ? undefined : value), z.string().min(1).optional());
export const RECIPE_TEMPLATE_IDS = [
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
export const RecipeTemplateIdSchema = z.enum(RECIPE_TEMPLATE_IDS);
export const RecipeTemplateToneSchema = z.enum(['neutral', 'accent', 'success', 'warning', 'danger']);
export const RecipeTemplateChipSchema = z
    .object({
    label: z.string().min(1),
    tone: RecipeTemplateToneSchema.default('neutral')
})
    .strict();
export const RecipeTemplateActionReferenceSchema = z.discriminatedUnion('kind', [
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
export const RecipeTemplateStatSchema = z
    .object({
    label: z.string().min(1),
    value: z.string().min(1),
    helper: OptionalTextSchema,
    tone: RecipeTemplateToneSchema.optional()
})
    .strict();
export const RecipeTemplateFieldLinkSchema = z
    .object({
    label: z.string().min(1),
    href: z.string().min(1)
})
    .strict();
export const RecipeTemplateFieldSchema = z
    .object({
    label: z.string().min(1),
    value: OptionalTextSchema,
    chips: z.array(RecipeTemplateChipSchema).default([]),
    bullets: z.array(z.string().min(1)).default([]),
    links: z.array(RecipeTemplateFieldLinkSchema).default([]),
    fullWidth: z.boolean().default(false)
})
    .strict();
export const RecipeTemplateListItemSchema = z
    .object({
    id: OptionalTextSchema,
    title: z.string().min(1),
    subtitle: OptionalTextSchema,
    meta: OptionalTextSchema,
    chips: z.array(RecipeTemplateChipSchema).default([]),
    actions: z.array(RecipeTemplateActionReferenceSchema).default([])
})
    .strict();
export const RecipeTemplateCardItemSchema = z
    .object({
    id: OptionalTextSchema,
    title: z.string().min(1),
    subtitle: OptionalTextSchema,
    meta: OptionalTextSchema,
    imageLabel: OptionalTextSchema,
    price: OptionalTextSchema,
    chips: z.array(RecipeTemplateChipSchema).default([]),
    bullets: z.array(z.string().min(1)).default([]),
    footer: OptionalTextSchema,
    actions: z.array(RecipeTemplateActionReferenceSchema).default([])
})
    .strict();
export const RecipeTemplateTimelineItemSchema = z
    .object({
    id: OptionalTextSchema,
    title: z.string().min(1),
    time: z.string().min(1),
    summary: OptionalTextSchema,
    chips: z.array(RecipeTemplateChipSchema).default([]),
    actions: z.array(RecipeTemplateActionReferenceSchema).default([])
})
    .strict();
export const RecipeTemplateActivityItemSchema = z
    .object({
    id: OptionalTextSchema,
    label: z.string().min(1),
    detail: z.string().min(1),
    timestamp: OptionalTextSchema,
    tone: RecipeTemplateToneSchema.optional()
})
    .strict();
export const RecipeTemplateBoardCardSchema = z
    .object({
    id: OptionalTextSchema,
    title: z.string().min(1),
    subtitle: OptionalTextSchema,
    chips: z.array(RecipeTemplateChipSchema).default([]),
    footer: OptionalTextSchema,
    actions: z.array(RecipeTemplateActionReferenceSchema).default([])
})
    .strict();
export const RecipeTemplateBoardColumnSchema = z
    .object({
    id: OptionalTextSchema,
    label: z.string().min(1),
    tone: RecipeTemplateToneSchema.optional(),
    cards: z.array(RecipeTemplateBoardCardSchema).default([])
})
    .strict();
export const RecipeTemplateTableColumnSchema = z
    .object({
    id: z.string().min(1),
    label: z.string().min(1),
    align: z.enum(['start', 'end', 'center']).default('start')
})
    .strict();
export const RecipeTemplateTableCellSchema = z
    .object({
    value: z.string().min(1),
    subvalue: OptionalTextSchema,
    tone: RecipeTemplateToneSchema.optional(),
    emphasis: z.boolean().default(false)
})
    .strict();
export const RecipeTemplateTableRowSchema = z
    .object({
    id: z.string().min(1),
    label: z.string().min(1),
    cells: z.array(RecipeTemplateTableCellSchema).default([]),
    actions: z.array(RecipeTemplateActionReferenceSchema).default([])
})
    .strict();
export const RecipeTemplateSectionHydrationStateSchema = z.enum(['pending', 'hydrating', 'ready', 'failed']);
export const RecipeTemplateSectionRepairStateSchema = z.enum(['idle', 'repairing', 'recovered', 'failed']);
export const RecipeTemplateSectionContentStateSchema = z.enum(['ghost', 'partial', 'hydrated', 'fallback']);
export const RecipeTemplateSectionProgressSchema = z
    .object({
    hydrationState: RecipeTemplateSectionHydrationStateSchema.default('ready'),
    repairState: RecipeTemplateSectionRepairStateSchema.default('idle'),
    contentState: RecipeTemplateSectionContentStateSchema.default('hydrated'),
    lastUpdatedAt: OptionalTextSchema,
    errorMessage: OptionalTextSchema
})
    .strict();
export const RecipeTemplateViewPhaseSchema = z.enum(['selected', 'text', 'hydrating', 'actions', 'repairing', 'ready', 'failed']);
export const RecipeTemplateStateStatusSchema = z
    .object({
    phase: RecipeTemplateViewPhaseSchema.default('ready'),
    lastUpdatedAt: OptionalTextSchema,
    failureCategory: OptionalTextSchema,
    errorMessage: OptionalTextSchema
})
    .strict();
const RecipeTemplateSectionBaseSchema = z
    .object({
    slotId: z.string().min(1),
    progress: RecipeTemplateSectionProgressSchema.optional()
})
    .strict();
export const RecipeTemplateSectionSchema = z.lazy(() => z.discriminatedUnion('kind', [
    RecipeTemplateSectionBaseSchema.extend({
        kind: z.literal('hero'),
        eyebrow: OptionalTextSchema,
        title: z.string().min(1),
        summary: z.string().min(1),
        chips: z.array(RecipeTemplateChipSchema).default([]),
        actions: z.array(RecipeTemplateActionReferenceSchema).default([])
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
        kind: z.literal('filter-strip'),
        title: OptionalTextSchema,
        filters: z.array(RecipeTemplateChipSchema).default([]),
        sortLabel: OptionalTextSchema
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
        kind: z.literal('action-bar'),
        title: OptionalTextSchema,
        actions: z.array(RecipeTemplateActionReferenceSchema).default([])
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
        kind: z.literal('stats'),
        title: OptionalTextSchema,
        items: z.array(RecipeTemplateStatSchema).default([])
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
        kind: z.literal('comparison-table'),
        title: z.string().min(1),
        columns: z.array(RecipeTemplateTableColumnSchema).default([]),
        rows: z.array(RecipeTemplateTableRowSchema).default([]),
        footerChips: z.array(RecipeTemplateChipSchema).default([]),
        footnote: OptionalTextSchema
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
        kind: z.literal('grouped-list'),
        title: z.string().min(1),
        groups: z
            .array(z
            .object({
            id: z.string().min(1),
            label: z.string().min(1),
            tone: RecipeTemplateToneSchema.optional(),
            items: z.array(RecipeTemplateListItemSchema).default([])
        })
            .strict())
            .default([])
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
        kind: z.literal('card-grid'),
        title: z.string().min(1),
        columns: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
        cards: z.array(RecipeTemplateCardItemSchema).default([])
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
        kind: z.literal('detail-panel'),
        title: z.string().min(1),
        eyebrow: OptionalTextSchema,
        summary: OptionalTextSchema,
        chips: z.array(RecipeTemplateChipSchema).default([]),
        fields: z.array(RecipeTemplateFieldSchema).default([]),
        actions: z.array(RecipeTemplateActionReferenceSchema).default([]),
        note: OptionalTextSchema,
        noteTitle: OptionalTextSchema
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
        kind: z.literal('timeline'),
        title: z.string().min(1),
        items: z.array(RecipeTemplateTimelineItemSchema).default([])
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
        kind: z.literal('notes'),
        title: z.string().min(1),
        lines: z.array(z.string().min(1)).default([]),
        actions: z.array(RecipeTemplateActionReferenceSchema).default([])
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
        kind: z.literal('activity-log'),
        title: z.string().min(1),
        entries: z.array(RecipeTemplateActivityItemSchema).default([])
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
        kind: z.literal('kanban'),
        title: z.string().min(1),
        columns: z.array(RecipeTemplateBoardColumnSchema).default([])
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
        kind: z.literal('confirmation'),
        title: z.string().min(1),
        message: z.string().min(1),
        confirmAction: RecipeTemplateActionReferenceSchema,
        secondaryAction: RecipeTemplateActionReferenceSchema.optional(),
        tone: RecipeTemplateToneSchema.optional()
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
        kind: z.literal('split'),
        title: OptionalTextSchema,
        ratio: z.enum(['balanced', 'list-detail', 'detail-list']).default('balanced'),
        left: z.array(RecipeTemplateSectionSchema).default([]),
        right: z.array(RecipeTemplateSectionSchema).default([])
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
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
        panes: z.record(z.string().min(1), z.array(RecipeTemplateSectionSchema))
    }).strict(),
    RecipeTemplateSectionBaseSchema.extend({
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
        actions: z.array(RecipeTemplateActionReferenceSchema).default([])
    }).strict()
]));
export const RecipeTemplateTransitionRecordSchema = z
    .object({
    fromTemplateId: RecipeTemplateIdSchema,
    toTemplateId: RecipeTemplateIdSchema,
    switchedAt: z.string().datetime(),
    reason: OptionalTextSchema
})
    .strict();
export const RecipeTemplateStateSchema = z
    .object({
    kind: z.literal('recipe_template_state'),
    schemaVersion: z.literal('recipe_template_state/v1'),
    templateId: RecipeTemplateIdSchema,
    title: z.string().min(1),
    subtitle: OptionalTextSchema,
    summary: z.string().min(1),
    status: RecipeTemplateStateStatusSchema.optional(),
    sections: z.array(RecipeTemplateSectionSchema).default([]),
    transitionTargets: z.array(RecipeTemplateIdSchema).default([]),
    transitionHistory: z.array(RecipeTemplateTransitionRecordSchema).default([]),
    metadata: z.record(z.string().min(1), z.unknown()).default({})
})
    .strict();
