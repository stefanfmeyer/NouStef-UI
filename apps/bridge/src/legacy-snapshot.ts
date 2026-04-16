import fs from 'node:fs';
import { randomUUID } from 'node:crypto';
import type { AppSettings, ChatMessage, Job, JobsFreshness, Profile, Session, ToolExecution, UiState } from '@hermes-recipes/protocol';
import { bridgeReviewedShellToolId } from './reviewed-tools';
import type { BridgeDatabase } from './database';

interface LegacySnapshotCandidate {
  filePath: string;
  mtimeMs: number;
  payload: Record<string, unknown>;
  score: number;
}

interface LegacySnapshotMigrationResult {
  sourcePath: string;
  importedProfiles: number;
  importedSessions: number;
  importedMessages: number;
  importedJobs: number;
  importedToolExecutions: number;
}

interface ImportableSessionRecord {
  session: Session;
  createdAt: string;
  updatedAt: string;
  lastMessageSyncAt: string | null;
  messages: ChatMessage[];
}

function readString(value: unknown) {
  return typeof value === 'string' ? value.trim() : '';
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function asRecord(value: unknown) {
  return isRecord(value) ? value : {};
}

function asArray<T = unknown>(value: unknown) {
  return Array.isArray(value) ? (value as T[]) : [];
}

function toIsoTimestamp(value: unknown, fallback: string) {
  if (typeof value === 'string' && value.trim().length > 0) {
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) {
      return new Date(parsed).toISOString();
    }
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    const milliseconds = value > 1_000_000_000_000 ? value : value * 1000;
    return new Date(milliseconds).toISOString();
  }

  return fallback;
}

function truncate(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, Math.max(0, maxLength - 1)).trimEnd()}…`;
}

function normalizeRole(value: unknown): ChatMessage['role'] | null {
  const normalized = readString(value).toLowerCase();
  if (normalized === 'assistant' || normalized === 'user' || normalized === 'system' || normalized === 'tool') {
    return normalized;
  }

  if (normalized === 'bot') {
    return 'assistant';
  }

  return null;
}

function roleOrder(role: ChatMessage['role']) {
  switch (role) {
    case 'user':
      return 0;
    case 'assistant':
      return 1;
    case 'tool':
      return 2;
    default:
      return 3;
  }
}

function extractMarkdownBlocks(message: Record<string, unknown>) {
  return asArray<Record<string, unknown>>(message.blocks)
    .filter((block) => readString(block.type) === 'markdown')
    .map((block) => readString(block.markdown))
    .filter(Boolean)
    .join('\n\n')
    .trim();
}

function extractMessageContent(message: Record<string, unknown>) {
  const directContent = readString(message.content);
  if (directContent) {
    return directContent;
  }

  return extractMarkdownBlocks(message);
}

function summarizeMessages(messages: ChatMessage[], fallback: string) {
  const candidate = [...messages]
    .reverse()
    .find((message) => (message.role === 'assistant' || message.role === 'user') && message.content.trim().length > 0);

  return truncate(candidate?.content.trim() || fallback, 96);
}

function titleFromMessages(messages: ChatMessage[], fallback: string) {
  const candidate = messages.find((message) => message.role === 'user' && message.content.trim().length > 0);
  return truncate(candidate?.content.trim() || fallback, 64);
}

function normalizeLegacyMessage(sessionId: string, rawMessage: unknown, fallbackTimestamp: string, index: number): ChatMessage | null {
  const message = asRecord(rawMessage);
  const role = normalizeRole(message.role);
  const content = extractMessageContent(message);
  if (!role || !content) {
    return null;
  }

  return {
    id: readString(message.id) || `legacy-message-${sessionId}-${index}-${randomUUID()}`,
    sessionId,
    role,
    content,
    createdAt: toIsoTimestamp(message.timestamp ?? message.createdAt, fallbackTimestamp),
    status: readString(message.status) === 'error' ? 'error' : 'completed',
    requestId: null,
    visibility: 'transcript',
    kind: role === 'system' ? 'notice' : 'conversation'
  } satisfies ChatMessage;
}

function parseLegacyProfile(rawProfile: unknown, activeProfileId: string | null): Profile | null {
  const profile = asRecord(rawProfile);
  const id = readString(profile.id);
  if (!id) {
    return null;
  }

  const descriptionParts = [
    readString(profile.description),
    readString(profile.model),
    readString(profile.gateway) ? `gateway ${readString(profile.gateway)}` : '',
    readString(profile.alias) && readString(profile.alias) !== id ? `alias ${readString(profile.alias)}` : ''
  ].filter(Boolean);

  return {
    id,
    name: readString(profile.name) || id,
    description: descriptionParts[0] ? descriptionParts.join(' · ') : 'Imported Hermes profile',
    path: readString(profile.path) || undefined,
    alias: readString(profile.alias) || undefined,
    model: readString(profile.model) || undefined,
    gateway: readString(profile.gateway) || undefined,
    isActive: id === activeProfileId
  };
}

function inferRecentSessionIds(snapshot: Record<string, unknown>, fallbackSessionIds: string[]) {
  const pageState = asRecord(snapshot.pageState);
  const profilesState = asRecord(pageState.profiles);
  const recentByProfile = asRecord(profilesState.recentSessionIdsByProfile);
  const orderedIds: string[] = [];

  const activeProfileId = readString(snapshot.activeProfileId);
  if (activeProfileId) {
    for (const sessionId of asArray<string>(recentByProfile[activeProfileId])) {
      if (readString(sessionId)) {
        orderedIds.push(sessionId);
      }
    }
  }

  for (const value of Object.values(recentByProfile)) {
    for (const sessionId of asArray<string>(value)) {
      if (readString(sessionId)) {
        orderedIds.push(sessionId);
      }
    }
  }

  for (const sessionId of fallbackSessionIds) {
    if (readString(sessionId)) {
      orderedIds.push(sessionId);
    }
  }

  const deduped: string[] = [];
  for (const sessionId of orderedIds) {
    if (!deduped.includes(sessionId)) {
      deduped.push(sessionId);
    }
  }

  return deduped.slice(0, 10);
}

function inferSessionProfileId(snapshot: Record<string, unknown>, sessionId: string) {
  const pageState = asRecord(snapshot.pageState);
  const profilesState = asRecord(pageState.profiles);
  const recentByProfile = asRecord(profilesState.recentSessionIdsByProfile);

  for (const [profileId, value] of Object.entries(recentByProfile)) {
    if (asArray<string>(value).includes(sessionId)) {
      return profileId;
    }
  }

  return null;
}

function inferSessionAssociationProfileIds(snapshot: Record<string, unknown>, sessionId: string, fallbackProfileId: string | null) {
  const pageState = asRecord(snapshot.pageState);
  const profilesState = asRecord(pageState.profiles);
  const recentByProfile = asRecord(profilesState.recentSessionIdsByProfile);
  const associatedProfileIds: string[] = [];

  for (const [profileId, value] of Object.entries(recentByProfile)) {
    if (asArray<string>(value).includes(sessionId) && !associatedProfileIds.includes(profileId)) {
      associatedProfileIds.push(profileId);
    }
  }

  if (fallbackProfileId && !associatedProfileIds.includes(fallbackProfileId)) {
    associatedProfileIds.push(fallbackProfileId);
  }

  return associatedProfileIds;
}

function parseLegacySession(rawSession: unknown, snapshot: Record<string, unknown>, fallbackTimestamp: string): ImportableSessionRecord | null {
  const session = asRecord(rawSession);
  const id = readString(session.id);
  if (!id) {
    return null;
  }

  const runtimeSessionId = readString(session.runtimeSessionId) || undefined;
  const lastUsedProfileId = readString(session.profileId) || inferSessionProfileId(snapshot, id);
  const summary = readString(session.summary) || 'Imported session';
  const title = readString(session.title) || 'Imported session';
  const sessionTimestamp = toIsoTimestamp(session.lastUpdatedAt ?? session.updatedAt ?? session.timestamp, fallbackTimestamp);

  return {
    session: {
      id,
      runtimeSessionId,
      title,
      summary,
      source: runtimeSessionId || readString(session.provider) === 'hermes' ? 'hermes_cli' : 'local',
      lastUpdatedAt: sessionTimestamp,
      lastUsedProfileId: lastUsedProfileId || null,
      associatedProfileIds: inferSessionAssociationProfileIds(snapshot, id, lastUsedProfileId || null),
      messageCount: 0,
      attachedRecipeId: null,
      recipeType: 'tui'
    },
    createdAt: sessionTimestamp,
    updatedAt: fallbackTimestamp,
    lastMessageSyncAt: runtimeSessionId ? sessionTimestamp : null,
    messages: []
  };
}

function createOrphanSession(sessionId: string, snapshot: Record<string, unknown>, fallbackTimestamp: string, messages: ChatMessage[]): ImportableSessionRecord {
  const lastMessageAt = messages.at(-1)?.createdAt ?? fallbackTimestamp;
  const lastUsedProfileId = inferSessionProfileId(snapshot, sessionId);
  return {
    session: {
      id: sessionId,
      title: titleFromMessages(messages, 'Imported local session'),
      summary: summarizeMessages(messages, 'Imported local session'),
      source: 'local',
      lastUpdatedAt: lastMessageAt,
      lastUsedProfileId,
      associatedProfileIds: inferSessionAssociationProfileIds(snapshot, sessionId, lastUsedProfileId),
      messageCount: messages.length,
      attachedRecipeId: null,
      recipeType: 'tui'
    },
    createdAt: messages[0]?.createdAt ?? fallbackTimestamp,
    updatedAt: fallbackTimestamp,
    lastMessageSyncAt: null,
    messages
  };
}

function normalizeLegacyMessages(sessionId: string, rawMessages: unknown, fallbackTimestamp: string) {
  const messages = asArray(rawMessages)
    .map((message, index) => normalizeLegacyMessage(sessionId, message, fallbackTimestamp, index))
    .filter((message): message is ChatMessage => Boolean(message))
    .sort((left, right) => {
      const timeComparison = left.createdAt.localeCompare(right.createdAt);
      if (timeComparison !== 0) {
        return timeComparison;
      }

      return roleOrder(left.role) - roleOrder(right.role);
    });

  return messages;
}

function normalizeLegacyJobs(snapshot: Record<string, unknown>, profileId: string, importedAt: string) {
  return asArray(snapshot.jobs)
    .map((rawJob) => {
      const job = asRecord(rawJob);
      const id = readString(job.id);
      const label = readString(job.label);
      const schedule = readString(job.schedule);
      const nextRun = readString(job.nextRun);
      if (!id || !label || !schedule || !nextRun) {
        return null;
      }

      const status = readString(job.status);
      return {
        id,
        profileId,
        label,
        schedule,
        status: status === 'paused' ? 'paused' : status === 'attention' ? 'attention' : 'healthy',
        description: readString(job.description) || 'Imported Hermes job.',
        lastRun: readString(job.lastRun) || 'Not reported',
        nextRun,
        lastSyncedAt: importedAt
      } satisfies Job;
    })
    .filter((job): job is Job => Boolean(job));
}

function normalizeLegacyJobsFreshness(snapshot: Record<string, unknown>, profileId: string, importedAt: string): JobsFreshness {
  const freshness = asRecord(snapshot.jobsCacheState);
  const status = readString(freshness.status);
  const source = readString(freshness.source);

  return {
    profileId,
    status:
      status === 'connected' || status === 'disconnected' || status === 'error' || status === 'refreshing'
        ? status
        : 'disconnected',
    source: source === 'hermes_cli' ? 'hermes_cli' : 'local_cache',
    lastRequestedAt: toIsoTimestamp(freshness.lastRequestedAt, importedAt),
    lastSuccessfulAt: freshness.lastSuccessfulAt ? toIsoTimestamp(freshness.lastSuccessfulAt, importedAt) : undefined,
    lastError: readString(freshness.lastError) || undefined
  };
}

function normalizeLegacyToolExecutions(
  snapshot: Record<string, unknown>,
  importedAt: string,
  fallbackProfileId: string | null
) {
  const executions: ToolExecution[] = [];

  for (const [index, rawExecution] of asArray(snapshot.toolExecutionHistory).entries()) {
    const execution = asRecord(rawExecution);
    const command = readString(execution.command);
    const args = Array.isArray(execution.args)
      ? execution.args.map((value) => readString(value)).filter(Boolean)
      : readString(execution.args)
        ? readString(execution.args).split(/\s+/).filter(Boolean)
        : [];
    const requestedAt = toIsoTimestamp(execution.requestedAt ?? execution.timestamp, importedAt);
    const status = readString(execution.status);

    if (!command && !readString(execution.toolId)) {
      continue;
    }

    executions.push({
      id: readString(execution.id) || `legacy-tool-execution-${index}-${randomUUID()}`,
      toolId: readString(execution.toolId) || bridgeReviewedShellToolId,
      profileId: readString(execution.profileId) || fallbackProfileId,
      sessionId: readString(execution.sessionId) || null,
      summary: readString(execution.summary) || `Imported ${command || 'tool execution'}`,
      command: command || 'pwd',
      args,
      cwd: readString(execution.cwd) || null,
      status:
        status === 'pending' || status === 'approved' || status === 'rejected' || status === 'completed' || status === 'failed'
          ? status
          : 'completed',
      requestedAt,
      resolvedAt: execution.resolvedAt ? toIsoTimestamp(execution.resolvedAt, requestedAt) : undefined,
      stdout: readString(execution.stdout) || undefined,
      stderr: readString(execution.stderr) || undefined,
      exitCode: typeof execution.exitCode === 'number' ? execution.exitCode : undefined
    });
  }

  return executions;
}

function inferUiState(snapshot: Record<string, unknown>, profileIds: string[], sessionIds: string[]): UiState {
  const pageState = asRecord(snapshot.pageState);
  const chatState = asRecord(pageState.chat);
  const settingsState = asRecord(pageState.settings);
  const activeTab = readString(snapshot.activeTab).toLowerCase();
  const activeSection = readString(settingsState.activeSection).toLowerCase();
  const currentPage: UiState['currentPage'] =
    activeTab === 'jobs'
      ? 'jobs'
      : activeTab === 'tools'
        ? 'tools'
        : activeTab === 'settings' && activeSection === 'tool-history'
          ? 'tools'
          : activeTab === 'settings'
            ? 'settings'
            : activeTab === 'profiles'
              ? 'sessions'
              : 'chat';

  const requestedActiveSessionId = readString(chatState.lastVisitedSessionId) || readString(snapshot.activeSessionId);
  const activeSessionId = sessionIds.includes(requestedActiveSessionId) ? requestedActiveSessionId : sessionIds[0] ?? null;
  const requestedActiveProfileId = readString(snapshot.activeProfileId);
  const activeProfileId = profileIds.includes(requestedActiveProfileId) ? requestedActiveProfileId : profileIds[0] ?? null;
  const activeSessionIdByProfile = activeProfileId && activeSessionId ? { [activeProfileId]: activeSessionId } : {};
  const recentSessionIdsByProfile =
    activeProfileId && sessionIds.length > 0
      ? {
          [activeProfileId]: inferRecentSessionIds(snapshot, sessionIds)
        }
      : {};

  return {
    activeProfileId,
    currentPage,
    activeSessionIdByProfile,
    recentSessionIdsByProfile,
    toolsTab: activeTab === 'settings' && activeSection === 'tool-history' ? 'history' : 'all',
    sidebarCollapsed: false
  };
}

function scoreSnapshot(snapshot: Record<string, unknown>) {
  const profilesCount = asArray(snapshot.profiles).length;
  const sessionsCount = asArray(snapshot.sessions).length;
  const toolHistoryCount = asArray(snapshot.toolExecutionHistory).length;
  const jobsCount = asArray(snapshot.jobs).length;
  const messagesCount = Object.values(asRecord(snapshot.sessionMessages)).reduce<number>(
    (total, value) => total + asArray(value).length,
    0
  );

  return messagesCount * 1000 + sessionsCount * 100 + toolHistoryCount * 10 + jobsCount * 5 + profilesCount;
}

function loadBestLegacySnapshot(snapshotPaths: string[]) {
  const candidates: LegacySnapshotCandidate[] = [];

  for (const filePath of snapshotPaths) {
    if (!filePath || !fs.existsSync(filePath)) {
      continue;
    }

    try {
      const payload = JSON.parse(fs.readFileSync(filePath, 'utf8')) as Record<string, unknown>;
      const stat = fs.statSync(filePath);
      candidates.push({
        filePath,
        mtimeMs: stat.mtimeMs,
        payload,
        score: scoreSnapshot(payload)
      });
    } catch {
      continue;
    }
  }

  return candidates.sort((left, right) => right.score - left.score || right.mtimeMs - left.mtimeMs)[0] ?? null;
}

export function migrateLegacySnapshotIfNeeded(
  database: BridgeDatabase,
  options: {
    snapshotPaths: string[];
    now?: () => string;
  }
): LegacySnapshotMigrationResult | null {
  if (database.hasUserData() || options.snapshotPaths.length === 0) {
    return null;
  }

  const candidate = loadBestLegacySnapshot(options.snapshotPaths);
  if (!candidate) {
    return null;
  }

  const importedAt = options.now?.() ?? new Date().toISOString();
  const snapshot = candidate.payload;
  const rawActiveProfileId = readString(snapshot.activeProfileId) || null;
  const profiles = asArray(snapshot.profiles)
    .map((profile) => parseLegacyProfile(profile, rawActiveProfileId))
    .filter((profile): profile is Profile => Boolean(profile));

  if (profiles.length > 0) {
    database.syncProfiles(profiles, importedAt);
  }

  const sessionRecords = new Map<string, ImportableSessionRecord>();
  for (const rawSession of asArray(snapshot.sessions)) {
    const parsedSession = parseLegacySession(rawSession, snapshot, importedAt);
    if (parsedSession) {
      sessionRecords.set(parsedSession.session.id, parsedSession);
    }
  }

  for (const [sessionId, rawMessages] of Object.entries(asRecord(snapshot.sessionMessages))) {
    const messages = normalizeLegacyMessages(sessionId, rawMessages, importedAt);
    const existing = sessionRecords.get(sessionId);
    if (!existing) {
      sessionRecords.set(sessionId, createOrphanSession(sessionId, snapshot, importedAt, messages));
      continue;
    }

    const lastMessageAt = messages.at(-1)?.createdAt ?? existing.session.lastUpdatedAt;
    sessionRecords.set(sessionId, {
      ...existing,
      session: {
        ...existing.session,
        title: titleFromMessages(messages, existing.session.title),
        summary: summarizeMessages(messages, existing.session.summary),
        lastUpdatedAt: lastMessageAt,
        messageCount: messages.length,
        lastUsedProfileId: existing.session.lastUsedProfileId ?? inferSessionProfileId(snapshot, sessionId)
      },
      createdAt: messages[0]?.createdAt ?? existing.createdAt,
      updatedAt: importedAt,
      lastMessageSyncAt: existing.session.runtimeSessionId ? lastMessageAt : null,
      messages
    });
  }

  const orderedSessions = [...sessionRecords.values()].sort((left, right) =>
    right.session.lastUpdatedAt.localeCompare(left.session.lastUpdatedAt)
  );
  const importedMessageIds = new Set<string>();

  let importedMessages = 0;
  for (const record of orderedSessions) {
    const dedupedMessages = record.messages.map((message, index) => {
      let nextMessageId = message.id;
      if (importedMessageIds.has(nextMessageId)) {
        nextMessageId = `legacy-message-${record.session.id}-${index}-${nextMessageId}`;
      }

      while (importedMessageIds.has(nextMessageId)) {
        nextMessageId = `legacy-message-${record.session.id}-${index}-${randomUUID()}`;
      }

      importedMessageIds.add(nextMessageId);
      return nextMessageId === message.id
        ? message
        : {
            ...message,
            id: nextMessageId
          };
    });

    database.importSession(record.session, {
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      lastMessageSyncAt: record.lastMessageSyncAt
    });

    if (dedupedMessages.length > 0) {
      database.replaceSessionMessages(
        record.session.id,
        dedupedMessages,
        record.lastMessageSyncAt ?? record.updatedAt
      );
      importedMessages += dedupedMessages.length;
    }
  }

  const importedProfileIds = profiles.map((profile) => profile.id);
  const importedSessionIds = orderedSessions.map((record) => record.session.id);

  const themeMode = readString(snapshot.themeMode) === 'light' ? 'light' : 'dark';
  database.updateSettings({
    themeMode
  } satisfies Partial<AppSettings>);

  const uiState = inferUiState(snapshot, importedProfileIds, importedSessionIds);
  database.updateUiState(uiState);

  const jobsProfileId = readString(asRecord(snapshot.sessionSummary).profileId) || uiState.activeProfileId;
  const importedJobs = jobsProfileId ? normalizeLegacyJobs(snapshot, jobsProfileId, importedAt) : [];
  if (jobsProfileId) {
    database.upsertJobs(jobsProfileId, importedJobs, normalizeLegacyJobsFreshness(snapshot, jobsProfileId, importedAt));
  }

  const toolExecutions = normalizeLegacyToolExecutions(snapshot, importedAt, uiState.activeProfileId);
  for (const execution of toolExecutions) {
    database.importToolExecution(execution);
  }

  database.setMetadata('legacy_snapshot_source_path', candidate.filePath);
  database.setMetadata('legacy_snapshot_imported_at', importedAt);

  return {
    sourcePath: candidate.filePath,
    importedProfiles: profiles.length,
    importedSessions: orderedSessions.length,
    importedMessages,
    importedJobs: importedJobs.length,
    importedToolExecutions: toolExecutions.length
  };
}
