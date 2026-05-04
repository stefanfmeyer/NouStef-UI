import type { ChatActivity, ChatMessage } from '@noustef-ui/protocol';

const recipeFenceOpenPattern = /```hermes-ui-recipes[^\n]*\n?/giu;

const injectedUserPromptMarkers = [
  'Bridge execution note:',
  'The active local Recipe for this request is:',
  'If the user asks you to create, update, mark changed, or delete local Recipes,',
  'If you need to create, update, mark changed, or delete local Recipes,',
  'Supported operations:',
  'Keep the fenced block technical and concise.',
  'Do not describe the JSON outside the fenced block.',
  'Use the preloaded google-workspace skill or Gmail capability for email tasks in this active profile.',
  'If Google Recipe is unavailable or missing scopes in this active profile,',
  'Do not fall back to himalaya unless the user explicitly asks for it.',
  'Return only the final assistant answer.'
];

function collapseRepeatedParagraphSequences(content: string) {
  const paragraphs = content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (paragraphs.length < 2) {
    return content.trim();
  }

  let changed = true;
  while (changed) {
    changed = false;

    for (let size = Math.floor(paragraphs.length / 2); size >= 1 && !changed; size -= 1) {
      for (let start = 0; start + size * 2 <= paragraphs.length; start += 1) {
        const first = paragraphs.slice(start, start + size);
        const second = paragraphs.slice(start + size, start + size * 2);
        if (first.every((paragraph, index) => paragraph === second[index])) {
          paragraphs.splice(start + size, size);
          changed = true;
          break;
        }
      }
    }
  }

  return paragraphs.join('\n\n');
}

function splitAssistantMarkdownBlocks(content: string) {
  const normalized = content.replace(/\r/g, '').trim();
  if (!normalized) {
    return [] as string[];
  }

  const blocks: string[] = [];
  const lines = normalized.split('\n');
  let current: string[] = [];
  let inFence = false;

  const flush = () => {
    if (current.length === 0) {
      return;
    }

    const block = (inFence ? current.join('\n').trimEnd() : current.join('\n').trim()).trim();
    if (block) {
      blocks.push(block);
    }
    current = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r/g, '');
    const trimmed = line.trim();
    const isFenceLine = trimmed.startsWith('```');

    if (inFence) {
      current.push(line);
      if (isFenceLine) {
        inFence = false;
        flush();
      }
      continue;
    }

    if (isFenceLine) {
      flush();
      current.push(line);
      inFence = true;
      continue;
    }

    if (!trimmed) {
      flush();
      continue;
    }

    current.push(line.trimEnd());
  }

  flush();
  return blocks;
}

function isLikelyRuntimeBlobParagraph(paragraph: string) {
  const trimmed = paragraph.trim();
  if (!trimmed) {
    return false;
  }

  const fencedMatch = trimmed.match(/^```(?:json|txt|text)?\s*\n([\s\S]+)\n```$/u);
  const normalized = fencedMatch?.[1]?.trim() ?? trimmed;

  return /^(?:\{[\s\S]*\}|\[[\s\S]*\])$/u.test(normalized);
}

function isLikelyRuntimeErrorLine(line: string) {
  const trimmed = line.trim();
  if (!trimmed) {
    return false;
  }

  return (
    /^(?:FileNotFoundError|ModuleNotFoundError|PermissionError|IsADirectoryError|NotADirectoryError|SyntaxError|TypeError|ValueError):/u.test(
      trimmed
    ) ||
    /^Error:\s+(?:ENOENT|EACCES|EPERM|ENOTDIR|EISDIR|Cannot find module)/u.test(trimmed) ||
    /^(?:ENOENT|EACCES|EPERM|ENOTDIR|EISDIR):/u.test(trimmed) ||
    /^No such file or directory[:\s]/iu.test(trimmed) ||
    /^File "[^"]+", line \d+/u.test(trimmed) ||
    /^Cannot find module\b/u.test(trimmed) ||
    /^[A-Z]:\\[^:]+$/iu.test(trimmed) ||
    /^zsh:\s+/u.test(trimmed)
  );
}

function isLikelyScriptFence(language: string, body: string) {
  const normalizedLanguage = language.trim().toLowerCase();
  if (!normalizedLanguage) {
    return false;
  }

  if (!['python', 'bash', 'sh', 'zsh', 'shell', 'json', 'txt', 'text'].includes(normalizedLanguage)) {
    return false;
  }

  return (
    /(?:^|[\s(])(?:python|bash|node|ruby)\s+(?:\.\/)?scripts\//iu.test(body) ||
    /(?:^|[\s(])(?:cat|sed|awk|rg|grep|fd)\s+\/Users\//u.test(body) ||
    /(?:^|[\s(])(?:cat|sed|awk|rg|grep|fd)\s+\.\/scripts\//u.test(body) ||
    /(?:^|[\s(])\/Users\/[^\s]+/u.test(body) ||
    /(?:^|[\s(])[A-Z]:\\[^\s]+/iu.test(body)
  );
}

function isTechnicalRuntimeLine(line: string) {
  const trimmed = line.trim();
  if (!trimmed) {
    return false;
  }

  return (
    /^(?:raw\s+)?(?:system|developer)(?:\s+(?:message|prompt))?:/iu.test(trimmed) ||
    isLikelyRuntimeBlobParagraph(trimmed) ||
    isTechnicalRuntimeContent(trimmed) ||
    isLikelyRuntimeErrorLine(trimmed) ||
    /(?:^|[\s(])python\s+scripts\/[^\s]+/iu.test(trimmed) ||
    /(?:^|[\s(])node\s+scripts\/[^\s]+/iu.test(trimmed) ||
    /(?:^|[\s(])ruby\s+scripts\/[^\s]+/iu.test(trimmed) ||
    /(?:^|[\s(])bash\s+scripts\/[^\s]+/iu.test(trimmed) ||
    /^Bridge note:/iu.test(trimmed) ||
    /(?:^|[\s(])\/Users\/[^\s]+/u.test(trimmed) ||
    /(?:^|[\s(])\/tmp\/[^\s]+/u.test(trimmed) ||
    /(?:^|[\s(])[A-Z]:\\[^\s]+/iu.test(trimmed) ||
    /(?:^|[\s(])\.\/scripts\/[^\s]+/u.test(trimmed)
  );
}

function extractPromptMarkerIndex(content: string) {
  const indexes = injectedUserPromptMarkers
    .flatMap((marker) => {
      const directIndex = content.indexOf(marker);
      const paragraphIndex = content.indexOf(`\n\n${marker}`);
      return [directIndex, paragraphIndex].filter((index) => index >= 0);
    })
    .sort((left, right) => left - right);

  return indexes[0] ?? -1;
}

function normalizeActivityDetail(value: unknown) {
  return typeof value === 'string' ? value.trim() || undefined : undefined;
}

function extractBalancedJsonValue(text: string) {
  const startIndex = text.search(/[[{]/u);
  if (startIndex < 0) {
    return null;
  }

  const stack: string[] = [];
  let inString = false;
  let escaped = false;

  for (let index = startIndex; index < text.length; index += 1) {
    const character = text[index];
    if (!character) {
      continue;
    }

    if (escaped) {
      escaped = false;
      continue;
    }

    if (character === '\\') {
      escaped = true;
      continue;
    }

    if (character === '"') {
      inString = !inString;
      continue;
    }

    if (inString) {
      continue;
    }

    if (character === '{' || character === '[') {
      stack.push(character);
      continue;
    }

    if (character === '}' || character === ']') {
      const expected = character === '}' ? '{' : '[';
      if (stack.at(-1) !== expected) {
        return null;
      }

      stack.pop();
      if (stack.length === 0) {
        return {
          startIndex,
          endIndex: index + 1
        };
      }
    }
  }

  return null;
}

function stripTextRanges(content: string, ranges: Array<{ start: number; end: number }>) {
  if (ranges.length === 0) {
    return content.trim();
  }

  const orderedRanges = [...ranges]
    .filter((range) => range.end > range.start)
    .sort((left, right) => left.start - right.start);
  const pieces: string[] = [];
  let cursor = 0;

  for (const range of orderedRanges) {
    if (range.start > cursor) {
      pieces.push(content.slice(cursor, range.start));
    }
    cursor = Math.max(cursor, range.end);
  }

  if (cursor < content.length) {
    pieces.push(content.slice(cursor));
  }

  return pieces.join('').replace(/\n{3,}/gu, '\n\n').trim();
}

function findRecipeFenceEnd(content: string, searchStart: number, maxEnd: number) {
  const boundedSearchStart = Math.min(Math.max(searchStart, 0), maxEnd);
  const firstFenceIndex = content.indexOf('```', boundedSearchStart);
  if (firstFenceIndex < 0 || firstFenceIndex >= maxEnd) {
    return boundedSearchStart;
  }

  let blockEnd = firstFenceIndex + 3;
  let cursor = blockEnd;

  while (cursor < maxEnd) {
    const whitespaceMatch = content.slice(cursor, maxEnd).match(/^\s*/u);
    cursor += whitespaceMatch?.[0].length ?? 0;
    if (!content.startsWith('```', cursor)) {
      break;
    }

    blockEnd = cursor + 3;
    cursor = blockEnd;
  }

  return Math.min(blockEnd, maxEnd);
}

function parseRuntimePayload(message: ChatMessage) {
  const trimmed = message.content.trim();
  if (!trimmed.startsWith('{') && !trimmed.startsWith('[')) {
    return null;
  }

  try {
    return JSON.parse(trimmed) as Record<string, unknown>;
  } catch {
    return null;
  }
}

export function stripRecipeOperationsFence(content: string) {
  const openingMatches = Array.from(content.matchAll(recipeFenceOpenPattern));
  if (openingMatches.length === 0) {
    return content.trim();
  }

  const rangesToStrip: Array<{ start: number; end: number }> = [];

  for (let index = 0; index < openingMatches.length; index += 1) {
    const match = openingMatches[index];
    if (match.index === undefined) {
      continue;
    }

    const blockStart = match.index;
    const payloadStart = blockStart + match[0].length;
    const nextBlockStart = openingMatches[index + 1]?.index ?? content.length;
    const payloadText = content.slice(payloadStart, nextBlockStart);
    const extractedJson = extractBalancedJsonValue(payloadText);
    const fallbackFenceEnd = content.indexOf('```', payloadStart);
    const parsedFenceEnd =
      extractedJson && extractedJson.endIndex > extractedJson.startIndex
        ? findRecipeFenceEnd(content, payloadStart + extractedJson.endIndex, nextBlockStart)
        : -1;
    const blockEnd =
      parsedFenceEnd > payloadStart
        ? parsedFenceEnd
        : fallbackFenceEnd >= payloadStart && fallbackFenceEnd < nextBlockStart
          ? fallbackFenceEnd + 3
          : nextBlockStart;

    rangesToStrip.push({
      start: blockStart,
      end: Math.max(blockEnd, payloadStart)
    });
  }

  return stripTextRanges(content, rangesToStrip);
}

export function stripBridgeInjectedUserPrompt(content: string) {
  const markerIndex = extractPromptMarkerIndex(content);
  return (markerIndex >= 0 ? content.slice(0, markerIndex) : content).trim();
}

export function isTechnicalRuntimeContent(content: string) {
  const trimmed = content.trim();
  if (!trimmed) {
    return false;
  }

  if (isLikelyRuntimeBlobParagraph(trimmed)) {
    return true;
  }

  return (
    /^(?:AUTH_[A-Z_]+:|NOT_AUTHENTICATED:|REFRESH_FAILED:|AUTHENTICATED:|PROFILE_EXISTS\b|PYTHON_OK\b|SETUP_OK\b|session_id:|Session:|Query:|Duration:|Messages:|Bridge execution note:|Bridge note:|The active local Recipe for this request is:|Recipe ID:|View type:|Status:|Description:|Metadata:|Data snapshot:)/u.test(
      trimmed
    ) ||
    /^(?:raw\s+)?(?:system|developer)(?:\s+(?:message|prompt))?:/iu.test(trimmed) ||
    /^⚠️\s+/u.test(trimmed) ||
    /^Initializing agent/u.test(trimmed) ||
    /^Built-in toolsets/u.test(trimmed) ||
    /^MCP tools/u.test(trimmed) ||
    /^Installed Skills/u.test(trimmed) ||
    /^Do not inspect or use other Hermes profiles/u.test(trimmed) ||
    /^If you need to create, update, mark changed, or delete local Recipes,/u.test(trimmed) ||
    /^Supported operations:/u.test(trimmed) ||
    /^Keep the fenced block technical and concise/u.test(trimmed) ||
    /^Do not describe the JSON outside the fenced block/u.test(trimmed) ||
    /^Use the preloaded google-workspace skill/u.test(trimmed) ||
    /^If Google Recipe is unavailable or missing scopes in this active profile,/u.test(trimmed) ||
    /^Do not fall back to himalaya unless the user explicitly asks for it\./u.test(trimmed) ||
    /^Return only the final assistant answer\./u.test(trimmed) ||
    /^Do not include (?:raw tool output|CLI startup banners|CLI diagnostics|tool inventories|JSON blobs|scripts|approvals|turn-limit traces)/u.test(
      trimmed
    ) ||
    /^(?:📞|✅|❌)\s+Tool\s+/u.test(trimmed) ||
    /^┊\s+(?:📚|💻|📞|📖|🐍)\s+/u.test(trimmed) ||
    /^Choice \[[^\]]+\]:/u.test(trimmed) ||
    /^Traceback \(most recent call last\):/u.test(trimmed) ||
    /^\[Subdirectory context discovered:/u.test(trimmed) ||
    /^# Hermes Agent - Development Guide/u.test(trimmed) ||
    /^pyenv:/u.test(trimmed) ||
    /^Command execution failed:/u.test(trimmed) ||
    isLikelyRuntimeErrorLine(trimmed)
  );
}

function sanitizeAssistantBlock(block: string, options: { keepRecipeFence?: boolean } = {}) {
  const trimmed = block.trim();
  if (!trimmed) {
    return '';
  }

  const fencedMatch = trimmed.match(/^```(?:[a-z0-9_-]+)?\s*\n([\s\S]+)\n```$/iu);
  if (fencedMatch?.[1]) {
    const fenceLanguage = trimmed.match(/^```([a-z0-9_-]+)?/iu)?.[1]?.toLowerCase() ?? '';
    if (options.keepRecipeFence && fenceLanguage === 'hermes-ui-recipes') {
      return trimmed;
    }

    const fencedBody = fencedMatch[1].trim();
    const fencedLines = fencedBody
      .split('\n')
      .map((line) => line.trimEnd())
      .filter((line) => line.trim().length > 0);

    if (
      isLikelyScriptFence(fenceLanguage, fencedBody) ||
      isLikelyRuntimeBlobParagraph(fencedBody) ||
      fencedLines.some((line) => isTechnicalRuntimeLine(line))
    ) {
      return '';
    }

    return trimmed;
  }

  if (isTechnicalRuntimeContent(trimmed)) {
    return '';
  }

  const sanitizedLines = trimmed
    .split('\n')
    .map((line) => line.trimEnd())
    .filter((line) => !isTechnicalRuntimeLine(line));

  return sanitizedLines.join('\n').trim();
}

export function sanitizeAssistantBody(content: string, options: { keepRecipeFence?: boolean } = {}) {
  const blocks = splitAssistantMarkdownBlocks(collapseRepeatedParagraphSequences(content))
    .map((block) => sanitizeAssistantBlock(block, options))
    .filter(Boolean);

  return blocks.join('\n\n').replace(/\n{3,}/gu, '\n\n').trim();
}

export function sanitizeImportedMessageContent(role: ChatMessage['role'], content: string) {
  if (role === 'user') {
    return stripBridgeInjectedUserPrompt(content);
  }

  if (role === 'assistant') {
    return sanitizeAssistantBody(stripRecipeOperationsFence(content));
  }

  return content.trim();
}

export function classifyImportedMessageVisibility(role: ChatMessage['role'], content: string): ChatMessage['visibility'] {
  if (role === 'tool') {
    return 'runtime';
  }

  if ((role === 'assistant' || role === 'system' || role === 'user') && isTechnicalRuntimeContent(content)) {
    return 'runtime';
  }

  return 'transcript';
}

export function classifyImportedMessageKind(
  role: ChatMessage['role'],
  content: string,
  visibility: ChatMessage['visibility']
): ChatMessage['kind'] {
  if (visibility === 'runtime') {
    return 'technical';
  }

  if (role === 'system') {
    return 'notice';
  }

  if (role === 'assistant' && isTechnicalRuntimeContent(content)) {
    return 'technical';
  }

  return 'conversation';
}

export function normalizeMessageForPersistence(message: ChatMessage, previousRequestId: string | null = null) {
  let requestId = message.requestId;
  let nextCurrentRequestId = previousRequestId;

  if (message.role === 'user') {
    requestId = requestId ?? message.id;
    nextCurrentRequestId = requestId;
  } else if (!requestId) {
    requestId = previousRequestId;
  } else {
    nextCurrentRequestId = requestId;
  }

  const trimmedContent = message.content.trim();
  const sanitizedContent =
    message.role === 'user'
      ? stripBridgeInjectedUserPrompt(message.content)
      : message.role === 'assistant'
        ? sanitizeAssistantBody(stripRecipeOperationsFence(message.content))
        : trimmedContent;
  const userWasTechnical = message.role === 'user' && trimmedContent.length > 0 && sanitizedContent.length === 0;
  const assistantWasTechnical = message.role === 'assistant' && trimmedContent.length > 0 && sanitizedContent.length === 0;
  const nextContent =
    message.role === 'user' && userWasTechnical
      ? trimmedContent
      : message.role === 'assistant' &&
          sanitizedContent.length === 0 &&
          (assistantWasTechnical || message.visibility === 'runtime' || message.kind === 'technical')
        ? stripRecipeOperationsFence(trimmedContent) || trimmedContent
        : sanitizedContent.length > 0
          ? sanitizedContent
          : trimmedContent;

  let visibility = message.visibility;
  let kind = message.kind;

  if (message.role === 'tool') {
    visibility = 'runtime';
    kind = 'technical';
  } else if (message.role === 'system') {
    if (message.kind === 'technical' || visibility === 'runtime' || isTechnicalRuntimeContent(nextContent)) {
      visibility = 'runtime';
      kind = 'technical';
    } else {
      visibility = 'transcript';
      kind = 'notice';
    }
  } else if (message.role === 'assistant') {
    if (
      nextContent.length === 0 ||
      assistantWasTechnical ||
      isTechnicalRuntimeContent(nextContent) ||
      (message.kind === 'technical' && isTechnicalRuntimeContent(message.content))
    ) {
      visibility = 'runtime';
      kind = 'technical';
    } else {
      visibility = 'transcript';
      kind = 'conversation';
    }
  } else {
    if (userWasTechnical || isTechnicalRuntimeContent(nextContent)) {
      visibility = 'runtime';
      kind = 'technical';
    } else {
      visibility = 'transcript';
      kind = 'conversation';
    }
  }

  const nextMessage = {
    ...message,
    requestId,
    content: nextContent,
    visibility,
    kind
  } satisfies ChatMessage;

  return {
    message: nextMessage,
    nextCurrentRequestId,
    changed:
      requestId !== message.requestId ||
      nextContent !== message.content ||
      visibility !== message.visibility ||
      kind !== message.kind
  };
}

export function normalizePersistedSessionMessages(messages: ChatMessage[]) {
  let currentRequestId: string | null = null;
  let changed = false;

  const normalizedMessages = [...messages]
    .sort((left, right) => left.createdAt.localeCompare(right.createdAt))
    .map((message) => {
      const normalized = normalizeMessageForPersistence(message, currentRequestId);
      currentRequestId = normalized.nextCurrentRequestId;
      if (normalized.changed) {
        changed = true;
      }

      return normalized.message;
    });

  return {
    messages: normalizedMessages,
    changed
  };
}

export function buildRuntimeActivityFromMessage(message: ChatMessage): ChatActivity | null {
  if (message.visibility !== 'runtime' && message.kind !== 'technical') {
    return null;
  }

  const payload = parseRuntimePayload(message);
  if (message.role === 'tool') {
    const exitCode = typeof payload?.exit_code === 'number' ? payload.exit_code : null;
    const payloadError = normalizeActivityDetail(payload?.error);
    const payloadOutput = normalizeActivityDetail(payload?.output);
    const label =
      normalizeActivityDetail(payload?.tool) ??
      normalizeActivityDetail(payload?.name) ??
      normalizeActivityDetail(payload?.file) ??
      'Runtime tool output';

    return {
      kind: payloadError || message.status === 'error' || (exitCode !== null && exitCode !== 0) ? 'warning' : 'tool',
      state: payloadError || message.status === 'error' || (exitCode !== null && exitCode !== 0) ? 'failed' : 'completed',
      label,
      detail: payloadError ?? payloadOutput ?? message.content,
      requestId: message.requestId ?? null,
      timestamp: message.createdAt
    };
  }

  const trimmed = message.content.trim();
  if (trimmed.startsWith('Bridge execution note:') || trimmed.startsWith('Bridge note:')) {
    return {
      kind: 'status',
      state: message.status === 'error' ? 'failed' : 'completed',
      label: 'Bridge note',
      detail: trimmed,
      requestId: message.requestId ?? null,
      timestamp: message.createdAt
    };
  }

  if (trimmed.includes('```hermes-ui-recipes')) {
    return {
      kind: 'status',
      state: message.status === 'error' ? 'failed' : 'completed',
      label: 'Hermes UI Recipes block',
      detail: trimmed,
      requestId: message.requestId ?? null,
      timestamp: message.createdAt
    };
  }

  return {
    kind: message.status === 'error' || isTechnicalRuntimeContent(trimmed) ? 'warning' : 'status',
    state: message.status === 'error' ? 'failed' : 'completed',
    label:
      message.status === 'error'
        ? 'Runtime diagnostic'
        : trimmed.startsWith('AUTH_') || trimmed.startsWith('NOT_AUTHENTICATED:')
          ? 'Active profile auth issue'
          : 'Runtime note',
    detail: trimmed,
    requestId: message.requestId ?? null,
    timestamp: message.createdAt
  };
}
