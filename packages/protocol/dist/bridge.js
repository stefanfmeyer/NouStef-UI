"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HermesBridgeMetaSchema = exports.HermesBridgeStreamEventSchema = exports.HermesBridgeStateSchema = exports.HermesAssistantMessageSchema = exports.HermesBridgeRequestEnvelopeSchema = exports.HermesBridgeRequestInputSchema = exports.HermesBridgeChatMessageInputSchema = exports.HermesTranscriptWindowSchema = exports.HermesTranscriptWindowMessageSchema = exports.HermesAppStateSummarySchema = exports.HermesBridgeWorkspaceContextSchema = exports.HermesAppSnapshotSchema = exports.PageStateSchema = exports.WorkspacePageStateSchema = exports.WorkspaceViewStateSchema = exports.SettingsPageStateSchema = exports.SettingsSectionSchema = exports.JobsPageStateSchema = exports.ChatPageStateSchema = exports.ProfilesPageStateSchema = exports.SessionMessagesSchema = exports.InspectorModeSchema = exports.WorkspaceRecordSchema = exports.WorkspaceResultSchema = exports.PendingToolApprovalSchema = exports.ToolExecutionHistoryEntrySchema = exports.ToolExecutionResultSchema = exports.ToolExecutionRequestSchema = exports.ProfileRuntimeStateMapSchema = exports.ProfileRuntimeStateSchema = exports.JobsCacheStateSchema = exports.PendingUserInputSchema = exports.PendingConfirmationSchema = exports.SessionSummarySchema = exports.ArtifactRecordSchema = exports.AuditEntrySchema = exports.ToolSettingsSchema = exports.ReminderRecordSchema = exports.JobRecordSchema = exports.SessionSchema = exports.ProfileSchema = exports.ThemeModeSchema = exports.BridgeProviderSchema = exports.HermesContextActiveTabSchema = exports.AppShellTabSchema = void 0;
exports.parseHermesAppSnapshot = parseHermesAppSnapshot;
exports.parseHermesBridgeRequestEnvelope = parseHermesBridgeRequestEnvelope;
exports.parseHermesBridgeResponseEnvelope = parseHermesBridgeResponseEnvelope;
exports.parseHermesBridgeStreamEvent = parseHermesBridgeStreamEvent;
exports.parseToolExecutionResult = parseToolExecutionResult;
const zod_1 = require("zod");
const schemas_1 = require("./schemas");
exports.AppShellTabSchema = zod_1.z.enum(['chat', 'workspace', 'jobs', 'settings', 'profiles']);
exports.HermesContextActiveTabSchema = zod_1.z.enum(['chat', 'workspace', 'jobs', 'settings', 'profiles']);
exports.BridgeProviderSchema = zod_1.z.enum(['hermes', 'openclaw']);
exports.ThemeModeSchema = zod_1.z.enum(['dark', 'light']);
exports.ProfileSchema = zod_1.z
    .object({
    id: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    description: zod_1.z.string().min(1),
    provider: exports.BridgeProviderSchema.default('hermes')
})
    .strict();
exports.SessionSchema = zod_1.z
    .object({
    id: zod_1.z.string().min(1),
    title: zod_1.z.string().min(1),
    summary: zod_1.z.string().min(1),
    provider: exports.BridgeProviderSchema.default('hermes'),
    runtimeSessionId: zod_1.z.string().min(1).optional(),
    lastUpdatedAt: zod_1.z.string().datetime().optional(),
    messageCount: zod_1.z.number().int().nonnegative().optional(),
    lastUsedProfileId: zod_1.z.string().min(1).optional()
})
    .strict();
const LegacySessionSchema = zod_1.z
    .object({
    id: zod_1.z.string().min(1),
    profileId: zod_1.z.string().min(1),
    title: zod_1.z.string().min(1),
    summary: zod_1.z.string().min(1),
    provider: exports.BridgeProviderSchema.default('hermes'),
    runtimeSessionId: zod_1.z.string().min(1).optional(),
    lastUpdatedAt: zod_1.z.string().datetime().optional(),
    messageCount: zod_1.z.number().int().nonnegative().optional(),
    lastUsedProfileId: zod_1.z.string().min(1).optional()
})
    .strict();
const SessionInputSchema = zod_1.z.union([exports.SessionSchema, LegacySessionSchema]);
function normalizeSessionInput(session) {
    if ('profileId' in session) {
        const { profileId, ...rest } = session;
        return exports.SessionSchema.parse({
            ...rest,
            lastUsedProfileId: rest.lastUsedProfileId ?? profileId
        });
    }
    return session;
}
exports.JobRecordSchema = zod_1.z
    .object({
    id: zod_1.z.string().min(1),
    label: zod_1.z.string().min(1),
    schedule: zod_1.z.string().min(1),
    status: zod_1.z.enum(['healthy', 'paused', 'attention']),
    description: zod_1.z.string().min(1),
    lastRun: zod_1.z.string().min(1),
    nextRun: zod_1.z.string().min(1)
})
    .strict();
exports.ReminderRecordSchema = zod_1.z
    .object({
    id: zod_1.z.string().min(1),
    label: zod_1.z.string().min(1),
    dueAt: zod_1.z.string().datetime(),
    status: zod_1.z.enum(['scheduled', 'due', 'completed']),
    description: zod_1.z.string().min(1)
})
    .strict();
exports.ToolSettingsSchema = zod_1.z
    .object({
    transportMode: zod_1.z.literal('bridge'),
    allowFilesystemRead: zod_1.z.boolean(),
    allowShellExecution: zod_1.z.boolean(),
    allowDesktopNotifications: zod_1.z.boolean(),
    confirmDestructiveActions: zod_1.z.boolean()
})
    .strict();
exports.AuditEntrySchema = zod_1.z
    .object({
    id: zod_1.z.string().min(1),
    timestamp: zod_1.z.string().datetime(),
    source: zod_1.z.enum(['system', 'chat', 'command', 'event']),
    label: zod_1.z.string().min(1),
    details: zod_1.z.string().min(1),
    profileId: zod_1.z.string().min(1).optional(),
    sessionId: zod_1.z.string().min(1).optional()
})
    .strict();
exports.ArtifactRecordSchema = zod_1.z
    .object({
    id: zod_1.z.string().min(1),
    kind: zod_1.z.enum(['saved_search', 'checklist', 'session_note']),
    title: zod_1.z.string().min(1),
    summary: zod_1.z.string().min(1),
    createdAt: zod_1.z.string().datetime(),
    workspaceId: zod_1.z.string().min(1).optional()
})
    .strict();
exports.SessionSummarySchema = zod_1.z
    .object({
    profileId: zod_1.z.string().min(1),
    profileName: zod_1.z.string().min(1),
    sessionId: zod_1.z.string().min(1),
    sessionTitle: zod_1.z.string().min(1),
    activeTab: exports.AppShellTabSchema,
    focusedWorkspaceId: zod_1.z.string().min(1).nullable(),
    messageCount: zod_1.z.number().int().nonnegative(),
    workspaceCount: zod_1.z.number().int().nonnegative(),
    jobCount: zod_1.z.number().int().nonnegative(),
    reminderCount: zod_1.z.number().int().nonnegative(),
    artifactCount: zod_1.z.number().int().nonnegative(),
    lastInteractionAt: zod_1.z.string().datetime()
})
    .strict();
exports.PendingConfirmationSchema = zod_1.z
    .object({
    command: schemas_1.UICommandSchema,
    request: schemas_1.ConfirmationSchema
})
    .strict();
exports.PendingUserInputSchema = zod_1.z
    .object({
    workspaceId: zod_1.z.string().min(1).optional(),
    prompt: zod_1.z.string().min(1),
    inputKind: zod_1.z.enum(['text', 'confirm']),
    placeholder: zod_1.z.string().optional(),
    confirmLabel: zod_1.z.string().min(1)
})
    .strict();
exports.JobsCacheStateSchema = zod_1.z
    .object({
    version: zod_1.z.literal(1).default(1),
    status: zod_1.z.enum(['idle', 'refreshing', 'connected', 'disconnected', 'error']).default('idle'),
    source: zod_1.z.enum(['local_cache', 'hermes_cli']).default('local_cache'),
    lastRequestedAt: zod_1.z.string().datetime().optional(),
    lastSuccessfulAt: zod_1.z.string().datetime().optional(),
    lastError: zod_1.z.string().min(1).optional()
})
    .strict();
exports.ProfileRuntimeStateSchema = zod_1.z
    .object({
    version: zod_1.z.literal(1).default(1),
    jobs: zod_1.z.array(exports.JobRecordSchema).default([]),
    jobsCacheState: exports.JobsCacheStateSchema.default({
        version: 1,
        status: 'idle',
        source: 'local_cache'
    }),
    reminders: zod_1.z.array(exports.ReminderRecordSchema).default([])
})
    .strict();
exports.ProfileRuntimeStateMapSchema = zod_1.z.record(zod_1.z.string(), exports.ProfileRuntimeStateSchema).default({});
exports.ToolExecutionRequestSchema = zod_1.z
    .object({
    id: zod_1.z.string().min(1),
    type: zod_1.z.literal('shell_command'),
    summary: zod_1.z.string().min(1),
    command: zod_1.z.string().min(1),
    args: zod_1.z.array(zod_1.z.string()).max(24).default([]),
    cwd: zod_1.z.string().min(1).optional(),
    requiresConfirmation: zod_1.z.boolean().default(true)
})
    .strict();
exports.ToolExecutionResultSchema = zod_1.z
    .object({
    requestId: zod_1.z.string().min(1),
    status: zod_1.z.enum(['completed', 'failed', 'rejected']),
    summary: zod_1.z.string().min(1),
    stdout: zod_1.z.string(),
    stderr: zod_1.z.string(),
    exitCode: zod_1.z.number().int(),
    completedAt: zod_1.z.string().datetime()
})
    .strict();
exports.ToolExecutionHistoryEntrySchema = zod_1.z
    .object({
    request: exports.ToolExecutionRequestSchema,
    profileId: zod_1.z.string().min(1),
    profileName: zod_1.z.string().min(1),
    sessionId: zod_1.z.string().min(1),
    sessionTitle: zod_1.z.string().min(1),
    requestedAt: zod_1.z.string().datetime(),
    status: zod_1.z.enum(['pending', 'dismissed', 'completed', 'failed', 'rejected']),
    resolvedAt: zod_1.z.string().datetime().optional(),
    result: exports.ToolExecutionResultSchema.optional()
})
    .strict();
exports.PendingToolApprovalSchema = zod_1.z
    .object({
    request: exports.ToolExecutionRequestSchema,
    profileId: zod_1.z.string().min(1).optional(),
    profileName: zod_1.z.string().min(1).optional(),
    sessionId: zod_1.z.string().min(1).optional(),
    sessionTitle: zod_1.z.string().min(1).optional(),
    requestedAt: zod_1.z.string().datetime()
})
    .strict();
exports.WorkspaceResultSchema = zod_1.z.record(zod_1.z.string(), zod_1.z.unknown());
exports.WorkspaceRecordSchema = zod_1.z
    .object({
    definition: schemas_1.WorkspaceDefinitionSchema,
    state: schemas_1.WorkspaceStateSchema,
    results: zod_1.z.array(exports.WorkspaceResultSchema).default([]),
    pinned: zod_1.z.boolean(),
    archived: zod_1.z.boolean()
})
    .strict();
exports.InspectorModeSchema = zod_1.z.enum(['audit', 'state', 'artifacts']);
exports.SessionMessagesSchema = zod_1.z.record(zod_1.z.string(), zod_1.z.array(schemas_1.ChatMessageSchema)).default({});
const RECENT_SESSION_TRACK_LIMIT = 200;
function compareChatMessageOrder(left, right) {
    const timestampOrder = Date.parse(left.timestamp) - Date.parse(right.timestamp);
    if (timestampOrder !== 0) {
        return timestampOrder;
    }
    return left.id.localeCompare(right.id);
}
function compareSessionRecency(left, right) {
    const leftTimestamp = left.lastUpdatedAt ? Date.parse(left.lastUpdatedAt) : 0;
    const rightTimestamp = right.lastUpdatedAt ? Date.parse(right.lastUpdatedAt) : 0;
    if (leftTimestamp !== rightTimestamp) {
        return rightTimestamp - leftTimestamp;
    }
    return left.title.localeCompare(right.title) || left.id.localeCompare(right.id);
}
function mergeChatMessages(preferred, secondary) {
    const merged = [...preferred];
    const seen = new Set(preferred.map((message) => message.id));
    for (const message of secondary) {
        if (seen.has(message.id)) {
            continue;
        }
        seen.add(message.id);
        merged.push(message);
    }
    return merged.sort(compareChatMessageOrder);
}
function normalizeLegacySessionMessages(sessionMessages, activeSessionId, legacyChatMessages) {
    const normalized = {};
    Object.entries(sessionMessages).forEach(([sessionId, messages]) => {
        if (messages.length > 0) {
            normalized[sessionId] = [...messages].sort(compareChatMessageOrder);
        }
    });
    if (!legacyChatMessages || legacyChatMessages.length === 0) {
        return normalized;
    }
    const activeSessionMessages = normalized[activeSessionId] ?? [];
    normalized[activeSessionId] = mergeChatMessages(activeSessionMessages, legacyChatMessages);
    return normalized;
}
function createDefaultJobsCacheState() {
    return {
        version: 1,
        status: 'idle',
        source: 'local_cache'
    };
}
function createDefaultProfileRuntimeState() {
    return {
        version: 1,
        jobs: [],
        jobsCacheState: createDefaultJobsCacheState(),
        reminders: []
    };
}
function normalizeProfileRuntimeStateMap(input, profiles, activeProfileId, legacyRuntimeState) {
    const normalized = {};
    for (const profile of profiles) {
        const profileState = input[profile.id];
        normalized[profile.id] = exports.ProfileRuntimeStateSchema.parse(profile.id === activeProfileId
            ? {
                version: 1,
                jobs: legacyRuntimeState.jobs,
                jobsCacheState: legacyRuntimeState.jobsCacheState,
                reminders: legacyRuntimeState.reminders
            }
            : profileState ?? createDefaultProfileRuntimeState());
    }
    return normalized;
}
const LegacyProfilesPageStateSchema = zod_1.z
    .object({
    version: zod_1.z.literal(1).default(1),
    lastViewedAt: zod_1.z.string().datetime().optional(),
    lastSelectedSessionByProfile: zod_1.z.record(zod_1.z.string(), zod_1.z.string()).default({}),
    recentSessionIdsByProfile: zod_1.z.record(zod_1.z.string(), zod_1.z.array(zod_1.z.string().min(1)).max(50)).default({}),
    sessionBrowserPageByProfile: zod_1.z.record(zod_1.z.string(), zod_1.z.number().int().positive()).default({})
})
    .strict();
exports.ProfilesPageStateSchema = zod_1.z
    .object({
    version: zod_1.z.literal(2).default(2),
    lastViewedAt: zod_1.z.string().datetime().optional(),
    lastSelectedSessionId: zod_1.z.string().min(1).optional(),
    recentSessionIds: zod_1.z.array(zod_1.z.string().min(1)).max(RECENT_SESSION_TRACK_LIMIT).default([]),
    sessionBrowserPage: zod_1.z.number().int().positive().default(1)
})
    .strict();
function isLegacyProfilesPageState(pageState) {
    return pageState.version === 1;
}
function normalizeProfilesPageState(pageState, sessions, activeProfileId, activeSessionId) {
    const validSessionIds = new Set(sessions.map((session) => session.id));
    const orderedSessionIds = [...sessions].sort(compareSessionRecency).map((session) => session.id);
    const legacyRecentSessionIds = isLegacyProfilesPageState(pageState)
        ? [
            ...(pageState.recentSessionIdsByProfile[activeProfileId] ?? []),
            ...Object.entries(pageState.recentSessionIdsByProfile)
                .filter(([profileId]) => profileId !== activeProfileId)
                .flatMap(([, sessionIds]) => sessionIds)
        ]
        : pageState.recentSessionIds;
    const recentSessionIds = [];
    for (const sessionId of [activeSessionId, ...legacyRecentSessionIds, ...orderedSessionIds]) {
        if (!validSessionIds.has(sessionId) || recentSessionIds.includes(sessionId)) {
            continue;
        }
        recentSessionIds.push(sessionId);
    }
    const legacyLastSelectedSessionId = isLegacyProfilesPageState(pageState)
        ? pageState.lastSelectedSessionByProfile[activeProfileId] ??
            Object.values(pageState.lastSelectedSessionByProfile).find((sessionId) => typeof sessionId === 'string' && validSessionIds.has(sessionId))
        : pageState.lastSelectedSessionId;
    const sessionBrowserPage = isLegacyProfilesPageState(pageState)
        ? pageState.sessionBrowserPageByProfile[activeProfileId] ??
            Object.values(pageState.sessionBrowserPageByProfile).find((page) => Number.isInteger(page) && page > 0) ??
            1
        : pageState.sessionBrowserPage;
    return {
        version: 2,
        lastViewedAt: pageState.lastViewedAt,
        lastSelectedSessionId: legacyLastSelectedSessionId && validSessionIds.has(legacyLastSelectedSessionId)
            ? legacyLastSelectedSessionId
            : activeSessionId,
        recentSessionIds: recentSessionIds.slice(0, RECENT_SESSION_TRACK_LIMIT),
        sessionBrowserPage: Number.isInteger(sessionBrowserPage) && sessionBrowserPage > 0 ? sessionBrowserPage : 1
    };
}
function normalizeSettingsPageState(pageState) {
    return {
        version: 1,
        lastViewedAt: pageState.lastViewedAt,
        highlightedToolRequestId: pageState.highlightedToolRequestId,
        activeSection: pageState.activeSection,
        toolHistoryPageByProfile: Object.fromEntries(Object.entries(pageState.toolHistoryPageByProfile).filter(([, page]) => Number.isInteger(page) && page > 0)),
        recentActivityPageByProfile: Object.fromEntries(Object.entries(pageState.recentActivityPageByProfile).filter(([, page]) => Number.isInteger(page) && page > 0))
    };
}
exports.ChatPageStateSchema = zod_1.z
    .object({
    version: zod_1.z.literal(1).default(1),
    lastVisitedSessionId: zod_1.z.string().min(1).optional()
})
    .strict();
exports.JobsPageStateSchema = zod_1.z
    .object({
    version: zod_1.z.literal(1).default(1),
    lastViewedAt: zod_1.z.string().datetime().optional(),
    lastManualRefreshAt: zod_1.z.string().datetime().optional()
})
    .strict();
exports.SettingsSectionSchema = zod_1.z.enum(['general', 'allowlist', 'tool_history', 'recent_activity']);
exports.SettingsPageStateSchema = zod_1.z
    .object({
    version: zod_1.z.literal(1).default(1),
    lastViewedAt: zod_1.z.string().datetime().optional(),
    highlightedToolRequestId: zod_1.z.string().min(1).optional(),
    activeSection: exports.SettingsSectionSchema.default('general'),
    toolHistoryPageByProfile: zod_1.z.record(zod_1.z.string(), zod_1.z.number().int().positive()).default({}),
    recentActivityPageByProfile: zod_1.z.record(zod_1.z.string(), zod_1.z.number().int().positive()).default({})
})
    .strict();
exports.WorkspaceViewStateSchema = zod_1.z
    .object({
    version: zod_1.z.literal(1).default(1),
    lastViewedAt: zod_1.z.string().datetime().optional(),
    selectedResultId: zod_1.z.string().min(1).optional()
})
    .strict();
exports.WorkspacePageStateSchema = zod_1.z
    .object({
    version: zod_1.z.literal(1).default(1),
    views: zod_1.z.record(zod_1.z.string(), exports.WorkspaceViewStateSchema).default({})
})
    .strict();
exports.PageStateSchema = zod_1.z
    .object({
    version: zod_1.z.literal(1).default(1),
    chat: exports.ChatPageStateSchema.default({
        version: 1
    }),
    profiles: exports.ProfilesPageStateSchema.default({
        version: 2,
        recentSessionIds: [],
        sessionBrowserPage: 1
    }),
    jobs: exports.JobsPageStateSchema.default({
        version: 1
    }),
    settings: exports.SettingsPageStateSchema.default({
        version: 1,
        activeSection: 'general',
        toolHistoryPageByProfile: {},
        recentActivityPageByProfile: {}
    }),
    workspaces: exports.WorkspacePageStateSchema.default({
        version: 1,
        views: {}
    })
})
    .strict();
const PageStateInputSchema = zod_1.z
    .object({
    version: zod_1.z.literal(1).default(1),
    chat: exports.ChatPageStateSchema.default({
        version: 1
    }),
    profiles: zod_1.z
        .union([exports.ProfilesPageStateSchema, LegacyProfilesPageStateSchema])
        .default({
        version: 2,
        recentSessionIds: [],
        sessionBrowserPage: 1
    }),
    jobs: exports.JobsPageStateSchema.default({
        version: 1
    }),
    settings: exports.SettingsPageStateSchema.default({
        version: 1,
        activeSection: 'general',
        toolHistoryPageByProfile: {},
        recentActivityPageByProfile: {}
    }),
    workspaces: exports.WorkspacePageStateSchema.default({
        version: 1,
        views: {}
    })
})
    .strict();
const HermesAppSnapshotShape = {
    version: zod_1.z.literal(3),
    activeTab: exports.AppShellTabSchema,
    themeMode: exports.ThemeModeSchema.default('dark'),
    profiles: zod_1.z.array(exports.ProfileSchema).min(1),
    activeProfileId: zod_1.z.string().min(1),
    sessions: zod_1.z.array(exports.SessionSchema).min(1),
    activeSessionId: zod_1.z.string().min(1),
    sessionMessages: exports.SessionMessagesSchema,
    focusedWorkspaceId: zod_1.z.string().min(1).optional(),
    workspaces: zod_1.z.record(zod_1.z.string(), exports.WorkspaceRecordSchema),
    workspaceOrder: zod_1.z.array(zod_1.z.string().min(1)),
    jobs: zod_1.z.array(exports.JobRecordSchema),
    jobsCacheState: exports.JobsCacheStateSchema.default({
        version: 1,
        status: 'idle',
        source: 'local_cache'
    }),
    reminders: zod_1.z.array(exports.ReminderRecordSchema),
    profileState: exports.ProfileRuntimeStateMapSchema.default({}),
    toolSettings: exports.ToolSettingsSchema,
    toolExecutionHistory: zod_1.z.array(exports.ToolExecutionHistoryEntrySchema).default([]),
    auditLog: zod_1.z.array(exports.AuditEntrySchema),
    pendingConfirmation: exports.PendingConfirmationSchema.optional(),
    pendingUserInput: exports.PendingUserInputSchema.optional(),
    pendingToolApproval: exports.PendingToolApprovalSchema.optional(),
    inspectorMode: exports.InspectorModeSchema,
    sessionSummary: exports.SessionSummarySchema,
    artifacts: zod_1.z.array(exports.ArtifactRecordSchema),
    pageState: exports.PageStateSchema.default({
        version: 1,
        chat: {
            version: 1
        },
        profiles: {
            version: 2,
            recentSessionIds: [],
            sessionBrowserPage: 1
        },
        jobs: {
            version: 1
        },
        settings: {
            version: 1,
            activeSection: 'general',
            toolHistoryPageByProfile: {},
            recentActivityPageByProfile: {}
        },
        workspaces: {
            version: 1,
            views: {}
        }
    })
};
const HermesAppSnapshotBaseSchema = zod_1.z.object(HermesAppSnapshotShape).strict();
const HermesAppSnapshotInputSchema = zod_1.z
    .object({
    ...HermesAppSnapshotShape,
    version: zod_1.z.union([zod_1.z.literal(2), zod_1.z.literal(3)]),
    sessions: zod_1.z.array(SessionInputSchema).min(1),
    pageState: PageStateInputSchema.default({
        version: 1,
        chat: {
            version: 1
        },
        profiles: {
            version: 2,
            recentSessionIds: [],
            sessionBrowserPage: 1
        },
        jobs: {
            version: 1
        },
        settings: {
            version: 1,
            activeSection: 'general',
            toolHistoryPageByProfile: {},
            recentActivityPageByProfile: {}
        },
        workspaces: {
            version: 1,
            views: {}
        }
    }),
    chatMessages: zod_1.z.array(schemas_1.ChatMessageSchema).optional()
})
    .strict();
exports.HermesAppSnapshotSchema = HermesAppSnapshotInputSchema.transform(({ chatMessages, sessionMessages, ...snapshot }) => {
    const parsedSnapshot = HermesAppSnapshotBaseSchema.parse({
        ...snapshot,
        version: 3,
        sessions: snapshot.sessions.map(normalizeSessionInput),
        sessionMessages: normalizeLegacySessionMessages(sessionMessages, snapshot.activeSessionId, chatMessages)
    });
    const activeProfileId = parsedSnapshot.profiles.find((profile) => profile.id === parsedSnapshot.activeProfileId)?.id ??
        parsedSnapshot.profiles[0]?.id ??
        parsedSnapshot.activeProfileId;
    const activeSessionId = parsedSnapshot.sessions.find((session) => session.id === parsedSnapshot.activeSessionId)?.id ??
        parsedSnapshot.sessions[0]?.id ??
        parsedSnapshot.activeSessionId;
    const profileState = normalizeProfileRuntimeStateMap(parsedSnapshot.profileState, parsedSnapshot.profiles, activeProfileId, {
        jobs: parsedSnapshot.jobs,
        jobsCacheState: parsedSnapshot.jobsCacheState,
        reminders: parsedSnapshot.reminders
    });
    const activeProfileState = profileState[activeProfileId] ??
        profileState[parsedSnapshot.profiles[0]?.id ?? ''] ??
        createDefaultProfileRuntimeState();
    return HermesAppSnapshotBaseSchema.parse({
        ...parsedSnapshot,
        version: 3,
        activeProfileId,
        activeSessionId,
        jobs: activeProfileState.jobs,
        jobsCacheState: activeProfileState.jobsCacheState,
        reminders: activeProfileState.reminders,
        profileState,
        pageState: {
            version: 1,
            chat: {
                version: 1,
                lastVisitedSessionId: parsedSnapshot.pageState.chat.lastVisitedSessionId ?? activeSessionId
            },
            profiles: normalizeProfilesPageState(parsedSnapshot.pageState.profiles, parsedSnapshot.sessions, activeProfileId, activeSessionId),
            jobs: {
                version: 1,
                lastViewedAt: parsedSnapshot.pageState.jobs.lastViewedAt,
                lastManualRefreshAt: parsedSnapshot.pageState.jobs.lastManualRefreshAt
            },
            settings: normalizeSettingsPageState(parsedSnapshot.pageState.settings),
            workspaces: parsedSnapshot.pageState.workspaces
        }
    });
});
exports.HermesBridgeWorkspaceContextSchema = zod_1.z
    .object({
    id: zod_1.z.string().min(1),
    title: zod_1.z.string().min(1),
    state: schemas_1.WorkspaceStateSchema,
    selectedItemId: zod_1.z.string().min(1).nullable()
})
    .strict();
exports.HermesAppStateSummarySchema = zod_1.z
    .object({
    jobsCount: zod_1.z.number().int().nonnegative(),
    workspacesCount: zod_1.z.number().int().nonnegative(),
    lastAuditEntries: zod_1.z.array(zod_1.z.string().min(1)).max(8)
})
    .strict();
exports.HermesTranscriptWindowMessageSchema = zod_1.z
    .object({
    id: zod_1.z.string().min(1),
    role: schemas_1.RoleSchema,
    content: zod_1.z.string().min(1),
    timestamp: zod_1.z.string().datetime()
})
    .strict();
exports.HermesTranscriptWindowSchema = zod_1.z
    .object({
    sessionId: zod_1.z.string().min(1),
    messageWindowLimit: zod_1.z.number().int().positive().max(64),
    characterWindowLimit: zod_1.z.number().int().positive().max(20_000),
    totalMessages: zod_1.z.number().int().nonnegative(),
    omittedMessages: zod_1.z.number().int().nonnegative(),
    includedCharacters: zod_1.z.number().int().nonnegative(),
    truncated: zod_1.z.boolean(),
    messages: zod_1.z.array(exports.HermesTranscriptWindowMessageSchema).max(64)
})
    .strict();
exports.HermesBridgeChatMessageInputSchema = zod_1.z
    .object({
    id: zod_1.z.string().min(1),
    role: zod_1.z.literal('user'),
    markdown: zod_1.z.string().min(1)
})
    .strict();
exports.HermesBridgeRequestInputSchema = zod_1.z.discriminatedUnion('kind', [
    zod_1.z
        .object({
        kind: zod_1.z.literal('chat_message'),
        chatMessage: exports.HermesBridgeChatMessageInputSchema
    })
        .strict(),
    zod_1.z
        .object({
        kind: zod_1.z.literal('ui_event'),
        event: schemas_1.UIEventSchema
    })
        .strict(),
    zod_1.z
        .object({
        kind: zod_1.z.literal('system_refresh')
    })
        .strict()
]);
exports.HermesBridgeRequestEnvelopeSchema = zod_1.z
    .object({
    version: zod_1.z.literal(1),
    profileId: zod_1.z.string().min(1),
    sessionId: zod_1.z.string().min(1),
    requestId: zod_1.z.string().min(1),
    timestamp: zod_1.z.string().datetime(),
    context: zod_1.z
        .object({
        activeTab: exports.HermesContextActiveTabSchema,
        focusedWorkspaceId: zod_1.z.string().min(1).nullable(),
        workspace: exports.HermesBridgeWorkspaceContextSchema.nullable(),
        transcriptWindow: exports.HermesTranscriptWindowSchema.nullable().default(null),
        appStateSummary: exports.HermesAppStateSummarySchema
    })
        .strict(),
    input: exports.HermesBridgeRequestInputSchema
})
    .strict();
exports.HermesAssistantMessageSchema = zod_1.z
    .object({
    id: zod_1.z.string().min(1),
    role: zod_1.z.literal('assistant'),
    markdown: zod_1.z.string()
})
    .strict();
exports.HermesBridgeStateSchema = zod_1.z
    .object({
    jobs: zod_1.z.array(exports.JobRecordSchema),
    jobsCacheState: exports.JobsCacheStateSchema.default({
        version: 1,
        status: 'idle',
        source: 'local_cache'
    }),
    reminders: zod_1.z.array(exports.ReminderRecordSchema),
    sessionSummary: exports.SessionSummarySchema,
    artifacts: zod_1.z.array(exports.ArtifactRecordSchema)
})
    .strict();
exports.HermesBridgeStreamEventSchema = zod_1.z.discriminatedUnion('type', [
    zod_1.z
        .object({
        type: zod_1.z.literal('progress'),
        requestId: zod_1.z.string().min(1),
        stage: zod_1.z.enum(['launching', 'working', 'streaming', 'complete', 'error']),
        message: zod_1.z.string().min(1)
    })
        .strict(),
    zod_1.z
        .object({
        type: zod_1.z.literal('assistant_chunk'),
        requestId: zod_1.z.string().min(1),
        markdown: zod_1.z.string()
    })
        .strict()
]);
exports.HermesBridgeMetaSchema = zod_1.z
    .object({
    requiresConfirmation: zod_1.z.boolean(),
    errors: zod_1.z.array(zod_1.z.string())
})
    .strict();
const HermesBridgeResponseEnvelopeBaseSchema = zod_1.z
    .object({
    version: zod_1.z.literal(1),
    requestId: zod_1.z.string().min(1),
    assistantMessage: exports.HermesAssistantMessageSchema,
    commands: zod_1.z.array(zod_1.z.unknown()),
    toolRequests: zod_1.z.array(zod_1.z.unknown()).default([]),
    state: exports.HermesBridgeStateSchema,
    meta: exports.HermesBridgeMetaSchema
})
    .strict();
function normalizeHermesCommands(commands) {
    const validatedCommands = [];
    const errors = [];
    commands.forEach((candidate, index) => {
        const parsed = schemas_1.UICommandSchema.safeParse(candidate);
        if (parsed.success) {
            validatedCommands.push(parsed.data);
            return;
        }
        const candidateType = typeof candidate === 'object' && candidate !== null && 'type' in candidate && typeof candidate.type === 'string'
            ? candidate.type
            : 'unknown';
        errors.push(`Ignored invalid Hermes command "${candidateType}" at index ${index}.`);
    });
    return {
        commands: validatedCommands,
        errors
    };
}
function normalizeToolRequests(toolRequests) {
    const validatedRequests = [];
    const errors = [];
    toolRequests.forEach((candidate, index) => {
        const parsed = exports.ToolExecutionRequestSchema.safeParse(candidate);
        if (parsed.success) {
            validatedRequests.push(parsed.data);
            return;
        }
        const candidateType = typeof candidate === 'object' && candidate !== null && 'type' in candidate && typeof candidate.type === 'string'
            ? candidate.type
            : 'unknown';
        errors.push(`Ignored invalid Hermes tool request "${candidateType}" at index ${index}.`);
    });
    return {
        toolRequests: validatedRequests,
        errors
    };
}
function parseHermesAppSnapshot(input) {
    return exports.HermesAppSnapshotSchema.parse(input);
}
function parseHermesBridgeRequestEnvelope(input) {
    return exports.HermesBridgeRequestEnvelopeSchema.parse(input);
}
function parseHermesBridgeResponseEnvelope(input) {
    const parsed = HermesBridgeResponseEnvelopeBaseSchema.parse(input);
    const normalized = normalizeHermesCommands(parsed.commands);
    const normalizedToolRequests = normalizeToolRequests(parsed.toolRequests);
    return {
        ...parsed,
        commands: normalized.commands,
        toolRequests: normalizedToolRequests.toolRequests,
        meta: {
            ...parsed.meta,
            errors: [...parsed.meta.errors, ...normalized.errors, ...normalizedToolRequests.errors]
        }
    };
}
function parseHermesBridgeStreamEvent(input) {
    return exports.HermesBridgeStreamEventSchema.parse(input);
}
function parseToolExecutionResult(input) {
    return exports.ToolExecutionResultSchema.parse(input);
}
