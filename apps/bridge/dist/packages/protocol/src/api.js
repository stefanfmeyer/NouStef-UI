import { z } from 'zod';
import { AuditEventSchema, AccessAuditSummarySchema, AppSettingsSchema, ChatActivitySchema, ChatMessageSchema, ConnectionStateSchema, JobsFreshnessSchema, JobSchema, ProfileSchema, RuntimeActivityHistoryEntrySchema, RuntimeModelConfigSchema, RuntimeReadinessSchema, RuntimeRequestSchema, RuntimeProviderOptionSchema, SessionDeletionModeSchema, SessionFilterSummarySchema, SessionSchema, SpaceContentFormatSchema, SpaceBuildSchema, SpaceEventSchema, SpaceMetadataSchema, SpaceSchema, SpaceStatusSchema, SpaceTabSchema, SpaceUiStateSchema, SkillSchema, TelemetryEventSchema, ThemeModeSchema, ToolExecutionSchema, ToolSchema, ToolsTabSchema, UiStateSchema } from './schemas';
export const ApiErrorSchema = z.object({
    code: z.string().min(1),
    message: z.string().min(1)
});
export const SettingsResponseSchema = z.object({
    settings: AppSettingsSchema,
    accessAudit: AccessAuditSummarySchema
});
export const BootstrapResponseSchema = z.object({
    connection: ConnectionStateSchema,
    profiles: z.array(ProfileSchema),
    activeProfileId: z.string().min(1).nullable(),
    activeSessionId: z.string().min(1).nullable(),
    recentSessions: z.array(SessionSchema),
    sessionSummary: SessionFilterSummarySchema.nullable().default(null),
    settings: AppSettingsSchema,
    uiState: UiStateSchema
});
export const SessionsResponseSchema = z.object({
    profileId: z.string().min(1),
    items: z.array(SessionSchema),
    page: z.number().int().positive(),
    pageSize: z.number().int().positive(),
    total: z.number().int().nonnegative(),
    hiddenSyntheticCount: z.number().int().nonnegative().default(0),
    search: z.string()
});
export const SessionMessagesResponseSchema = z.object({
    profileId: z.string().min(1),
    session: SessionSchema,
    messages: z.array(ChatMessageSchema),
    runtimeRequests: z.array(RuntimeRequestSchema).default([]),
    attachedSpace: SpaceSchema.nullable().default(null),
    spaceEvents: z.array(SpaceEventSchema).default([])
});
export const JobsResponseSchema = z.object({
    connection: ConnectionStateSchema,
    freshness: JobsFreshnessSchema,
    items: z.array(JobSchema)
});
export const ToolsResponseSchema = z.object({
    connection: ConnectionStateSchema,
    items: z.array(ToolSchema)
});
export const ToolHistoryResponseSchema = z.object({
    items: z.array(ToolExecutionSchema),
    runtimeItems: z.array(RuntimeActivityHistoryEntrySchema).default([]),
    page: z.number().int().positive(),
    pageSize: z.number().int().positive(),
    total: z.number().int().nonnegative(),
    runtimeTotal: z.number().int().nonnegative().default(0)
});
export const SkillsResponseSchema = z.object({
    connection: ConnectionStateSchema,
    profileId: z.string().min(1),
    items: z.array(SkillSchema)
});
export const ModelProviderResponseSchema = z.object({
    connection: ConnectionStateSchema,
    config: RuntimeModelConfigSchema,
    providers: z.array(RuntimeProviderOptionSchema),
    runtimeReadiness: RuntimeReadinessSchema,
    inspectedProviderId: z.string().min(1).nullable().default(null),
    discoveredAt: z.string().datetime().nullable().default(null)
});
export const SpacesResponseSchema = z.object({
    profileId: z.string().min(1),
    items: z.array(SpaceSchema),
    events: z.array(SpaceEventSchema).default([])
});
export const SpaceResponseSchema = z.object({
    profileId: z.string().min(1),
    space: SpaceSchema,
    events: z.array(SpaceEventSchema).default([])
});
export const CreateSessionRequestSchema = z.object({
    profileId: z.string().min(1)
});
export const CreateSpaceRequestSchema = z.object({
    profileId: z.string().min(1),
    sessionId: z.string().min(1),
    title: z.string().min(1).max(120),
    description: z.string().max(500).optional(),
    contentFormat: SpaceContentFormatSchema.default('markdown'),
    contentData: z.record(z.string().min(1), z.unknown()).optional(),
    tabs: z.array(SpaceTabSchema).optional(),
    uiState: SpaceUiStateSchema.partial().optional(),
    status: SpaceStatusSchema.optional(),
    metadata: SpaceMetadataSchema.partial().optional()
}).strict();
export const SelectProfileRequestSchema = z.object({
    profileId: z.string().min(1)
});
export const SelectSessionRequestSchema = z.object({
    profileId: z.string().min(1),
    sessionId: z.string().min(1)
});
export const RenameSessionRequestSchema = z.object({
    profileId: z.string().min(1),
    title: z.string().min(1).max(120)
});
export const DeleteSessionRequestSchema = z.object({
    profileId: z.string().min(1)
});
export const SessionDeletionResponseSchema = z.object({
    sessionId: z.string().min(1),
    mode: SessionDeletionModeSchema,
    deletedAt: z.string().datetime()
});
export const DeleteSkillRequestSchema = z.object({
    profileId: z.string().min(1)
});
export const UpdateSpaceRequestSchema = z
    .object({
    profileId: z.string().min(1),
    title: z.string().min(1).max(120).optional(),
    description: z.string().max(500).optional(),
    contentFormat: SpaceContentFormatSchema.optional(),
    status: SpaceStatusSchema.optional(),
    contentData: z.record(z.string().min(1), z.unknown()).optional(),
    tabs: z.array(SpaceTabSchema).optional(),
    uiState: SpaceUiStateSchema.partial().optional(),
    lastUpdatedBy: z.string().min(1).optional(),
    metadata: SpaceMetadataSchema.partial().optional()
})
    .strict()
    .refine((value) => value.title !== undefined ||
    value.description !== undefined ||
    value.contentFormat !== undefined ||
    value.status !== undefined ||
    value.contentData !== undefined ||
    value.tabs !== undefined ||
    value.uiState !== undefined ||
    value.lastUpdatedBy !== undefined ||
    value.metadata !== undefined, 'At least one space field must be provided.');
export const DeleteSpaceRequestSchema = z.object({
    profileId: z.string().min(1)
});
export const ApplySpaceEntryActionRequestSchema = z
    .object({
    profileId: z.string().min(1),
    action: z.enum(['remove', 'delete_source']),
    entryIds: z.array(z.string().min(1)).min(1)
})
    .strict();
export const ExecuteSpaceActionRequestSchema = z
    .object({
    profileId: z.string().min(1),
    sessionId: z.string().min(1),
    actionId: z.string().min(1),
    selectedItemIds: z.array(z.string().min(1)).default([]),
    formValues: z.record(z.string().min(1), z.union([z.string(), z.number(), z.boolean(), z.null()])).default({}),
    pageState: z.record(z.string().min(1), z.number().int().positive()).default({}),
    filterState: z.record(z.string().min(1), z.string()).default({})
})
    .strict();
export const SpaceDeletionResponseSchema = z.object({
    profileId: z.string().min(1),
    spaceId: z.string().min(1),
    deletedAt: z.string().datetime()
});
export const SpaceEntryActionResponseSchema = z.object({
    profileId: z.string().min(1),
    action: ApplySpaceEntryActionRequestSchema.shape.action,
    removedEntryIds: z.array(z.string().min(1)).default([]),
    deletedSourceEntryIds: z.array(z.string().min(1)).default([]),
    space: SpaceSchema,
    events: z.array(SpaceEventSchema).default([])
});
export const OpenSpaceChatRequestSchema = z.object({
    profileId: z.string().min(1)
});
export const OpenSpaceChatResponseSchema = z.object({
    profileId: z.string().min(1),
    space: SpaceSchema,
    session: SessionSchema
});
export const SkillDeletionResponseSchema = z.object({
    profileId: z.string().min(1),
    skillId: z.string().min(1),
    skillName: z.string().min(1),
    deletedAt: z.string().datetime()
});
export const UpdateSettingsRequestSchema = AppSettingsSchema.partial().refine((value) => Object.keys(value).length > 0, 'At least one setting must be provided.');
export const UpdateUiStateRequestSchema = UiStateSchema.partial()
    .extend({
    currentPage: UiStateSchema.shape.currentPage.optional(),
    toolsTab: ToolsTabSchema.optional(),
    sidebarCollapsed: UiStateSchema.shape.sidebarCollapsed.optional()
})
    .refine((value) => Object.keys(value).length > 0, 'At least one UI state field must be provided.');
export const ChatRequestModeSchema = z.enum(['chat', 'space_refresh', 'space_action']);
export const SPACE_REFRESH_USER_MESSAGE = 'Refresh this attached space with updated results.';
export const ChatStreamRequestSchema = z.object({
    profileId: z.string().min(1),
    sessionId: z.string().min(1),
    spaceId: z.string().min(1).optional(),
    content: z.string().min(1).max(20_000),
    mode: ChatRequestModeSchema.default('chat')
});
export const ToolExecutionPrepareRequestSchema = z.object({
    toolId: z.string().min(1),
    profileId: z.string().min(1).nullable().default(null),
    sessionId: z.string().min(1).nullable().default(null),
    summary: z.string().min(1),
    command: z.string().min(1),
    args: z.array(z.string()).max(24).default([]),
    cwd: z.string().min(1).nullable().default(null)
});
export const ToolExecutionResolveRequestSchema = z.object({
    decision: z.enum(['approve', 'reject'])
});
export const SpaceBuildProgressEventSchema = z
    .object({
    spaceId: z.string().min(1),
    build: SpaceBuildSchema,
    space: SpaceSchema.nullable().default(null)
})
    .strict();
export const UpdateRuntimeModelConfigRequestSchema = z
    .object({
    profileId: z.string().min(1),
    defaultModel: z.string().min(1).optional(),
    provider: z.string().min(1).optional(),
    baseUrl: z.string().min(1).optional(),
    apiMode: z.string().min(1).optional(),
    maxTurns: z.number().int().positive().max(500).optional(),
    reasoningEffort: z.string().min(1).optional()
})
    .refine((value) => value.defaultModel !== undefined ||
    value.provider !== undefined ||
    value.baseUrl !== undefined ||
    value.apiMode !== undefined ||
    value.maxTurns !== undefined ||
    value.reasoningEffort !== undefined, 'At least one runtime model field must be provided.');
export const ConnectProviderRequestSchema = z.object({
    profileId: z.string().min(1),
    provider: z.string().min(1),
    apiKey: z.string().min(1),
    label: z.string().min(1).optional(),
    baseUrl: z.string().min(1).optional(),
    apiMode: z.string().min(1).optional()
});
export const BeginProviderAuthRequestSchema = z
    .object({
    profileId: z.string().min(1),
    provider: z.string().min(1)
})
    .strict();
export const PollProviderAuthRequestSchema = z
    .object({
    profileId: z.string().min(1),
    provider: z.string().min(1),
    authSessionId: z.string().min(1).optional()
})
    .strict();
const ChatStreamProgressEventSchema = z.object({
    type: z.literal('progress'),
    requestId: z.string().min(1).nullable().default(null),
    message: z.string().min(1)
});
const ChatStreamActivityEventSchema = z.object({
    type: z.literal('activity'),
    activity: ChatActivitySchema
});
const ChatStreamAssistantSnapshotEventSchema = z.object({
    type: z.literal('assistant_snapshot'),
    requestId: z.string().min(1).nullable().default(null),
    markdown: z.string()
});
const ChatStreamSessionEventSchema = z.object({
    type: z.literal('session'),
    session: SessionSchema
});
const ChatStreamMessageEventSchema = z.object({
    type: z.literal('message'),
    message: ChatMessageSchema
});
const ChatStreamCompleteEventSchema = z.object({
    type: z.literal('complete'),
    session: SessionSchema,
    assistantMessage: ChatMessageSchema
});
const ChatStreamSpaceEventSchema = z.object({
    type: z.literal('space_event'),
    event: SpaceEventSchema,
    space: SpaceSchema.nullable().default(null)
});
const ChatStreamSpaceBuildProgressEventSchema = z.object({
    type: z.literal('space_build_progress'),
    spaceId: z.string().min(1),
    build: SpaceBuildSchema,
    space: SpaceSchema.nullable().default(null)
});
const ChatStreamErrorEventSchema = z.object({
    type: z.literal('error'),
    requestId: z.string().min(1).nullable().default(null),
    error: ApiErrorSchema
});
export const ChatStreamEventSchema = z.discriminatedUnion('type', [
    ChatStreamProgressEventSchema,
    ChatStreamActivityEventSchema,
    ChatStreamAssistantSnapshotEventSchema,
    ChatStreamSessionEventSchema,
    ChatStreamMessageEventSchema,
    ChatStreamCompleteEventSchema,
    ChatStreamSpaceEventSchema,
    ChatStreamSpaceBuildProgressEventSchema,
    ChatStreamErrorEventSchema
]);
export const HealthResponseSchema = z.object({
    status: z.literal('ok'),
    checkedAt: z.string().datetime()
});
export const ThemeModePayloadSchema = z.object({
    themeMode: ThemeModeSchema
});
export const TelemetryResponseSchema = z.object({
    items: z.array(TelemetryEventSchema),
    page: z.number().int().positive(),
    pageSize: z.number().int().positive(),
    total: z.number().int().nonnegative()
});
export const AuditEventsResponseSchema = z.object({
    items: z.array(AuditEventSchema),
    page: z.number().int().positive(),
    pageSize: z.number().int().positive(),
    total: z.number().int().nonnegative()
});
