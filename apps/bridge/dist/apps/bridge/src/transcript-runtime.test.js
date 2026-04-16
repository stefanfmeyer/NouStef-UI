import { describe, expect, it } from 'vitest';
import { normalizePersistedSessionMessages } from './transcript-runtime';
describe('transcript runtime normalization', () => {
    it('strips bridge prompt additives from historical user messages and reclassifies leaked runtime rows', () => {
        const normalized = normalizePersistedSessionMessages([
            {
                id: 'message-user-1',
                sessionId: 'session-1',
                role: 'user',
                content: 'How many unread emails do I have?\n\nBridge execution note: The active Hermes profile is 8tn. Use only this active profile auth state.\nReturn only the final assistant answer.',
                createdAt: '2026-04-08T20:00:00.000Z',
                status: 'completed',
                requestId: null,
                visibility: 'transcript',
                kind: 'conversation'
            },
            {
                id: 'message-tool-1',
                sessionId: 'session-1',
                role: 'tool',
                content: '{"count":2,"labels":["Inbox"]}',
                createdAt: '2026-04-08T20:00:00.100Z',
                status: 'completed',
                requestId: null,
                visibility: 'transcript',
                kind: 'conversation'
            },
            {
                id: 'message-assistant-1',
                sessionId: 'session-1',
                role: 'assistant',
                content: 'You have 2 unread emails right now.',
                createdAt: '2026-04-08T20:00:01.000Z',
                status: 'completed',
                requestId: null,
                visibility: 'transcript',
                kind: 'conversation'
            }
        ]);
        const [userMessage, toolMessage, assistantMessage] = normalized.messages;
        expect(userMessage?.content).toBe('How many unread emails do I have?');
        expect(userMessage?.visibility).toBe('transcript');
        expect(userMessage?.requestId).toBe('message-user-1');
        expect(toolMessage?.visibility).toBe('runtime');
        expect(toolMessage?.kind).toBe('technical');
        expect(toolMessage?.requestId).toBe('message-user-1');
        expect(assistantMessage?.visibility).toBe('transcript');
        expect(assistantMessage?.requestId).toBe('message-user-1');
    });
    it('keeps raw technical assistant and user-only bridge notes out of the visible transcript', () => {
        const normalized = normalizePersistedSessionMessages([
            {
                id: 'message-user-runtime-only',
                sessionId: 'session-2',
                role: 'user',
                content: 'Bridge execution note: The active Hermes profile is jbarton. Use only this active profile auth state.',
                createdAt: '2026-04-08T21:00:00.000Z',
                status: 'completed',
                requestId: null,
                visibility: 'transcript',
                kind: 'conversation'
            },
            {
                id: 'message-assistant-runtime-only',
                sessionId: 'session-2',
                role: 'assistant',
                content: 'pyenv: version `3.11` is not installed.\n\nCommand execution failed: python scripts/check_mail.py --json',
                createdAt: '2026-04-08T21:00:01.000Z',
                status: 'completed',
                requestId: null,
                visibility: 'transcript',
                kind: 'conversation'
            }
        ]);
        const [userMessage, assistantMessage] = normalized.messages;
        expect(userMessage?.visibility).toBe('runtime');
        expect(userMessage?.kind).toBe('technical');
        expect(assistantMessage?.visibility).toBe('runtime');
        expect(assistantMessage?.kind).toBe('technical');
        expect(assistantMessage?.content).toContain('Command execution failed: python scripts/check_mail.py --json');
    });
    it('strips observed bridge notes, raw system scaffolding, json blobs, script dumps, and file errors from assistant transcript content', () => {
        const normalized = normalizePersistedSessionMessages([
            {
                id: 'message-user-3',
                sessionId: 'session-3',
                role: 'user',
                content: 'Check unread email.',
                createdAt: '2026-04-09T10:00:00.000Z',
                status: 'completed',
                requestId: null,
                visibility: 'transcript',
                kind: 'conversation'
            },
            {
                id: 'message-assistant-3',
                sessionId: 'session-3',
                role: 'assistant',
                content: `You have 2 unread emails right now.

Bridge execution note: The active Hermes profile is 8tn.
Raw system message: initializing bridge runtime
{"tool":"google-workspace","unread":2}
\`\`\`python
python scripts/check_mail.py --json
print(open("/Users/example/.hermes/profiles/8tn/scripts/check_mail.py").read())
\`\`\`
Traceback (most recent call last):
  File "/Users/example/.hermes/profiles/8tn/scripts/check_mail.py", line 7, in <module>
FileNotFoundError: [Errno 2] No such file or directory: '/Users/example/.hermes/profiles/8tn/scripts/check_mail.py'`,
                createdAt: '2026-04-09T10:00:01.000Z',
                status: 'completed',
                requestId: null,
                visibility: 'transcript',
                kind: 'conversation'
            }
        ]);
        expect(normalized.messages[1]?.visibility).toBe('transcript');
        expect(normalized.messages[1]?.kind).toBe('conversation');
        expect(normalized.messages[1]?.content).toBe('You have 2 unread emails right now.');
    });
    it('strips mixed prose Hermes UI Recipes blocks before assistant transcript persistence', () => {
        const normalized = normalizePersistedSessionMessages([
            {
                id: 'message-user-4',
                sessionId: 'session-4',
                role: 'user',
                content: 'Create a recipe with a table of random numbers.',
                createdAt: '2026-04-09T11:00:00.000Z',
                status: 'completed',
                requestId: null,
                visibility: 'transcript',
                kind: 'conversation'
            },
            {
                id: 'message-assistant-4',
                sessionId: 'session-4',
                role: 'assistant',
                content: `Created a random numbers recipe for this request.

\`\`\`hermes-ui-recipes
Created a recipe and included the structured payload below.
\`\`\`json
{"operations":[{"type":"create_space","title":"Random numbers","viewType":"table","data":{"columns":[{"id":"value","header":"Value"}],"rows":[{"value":4}]}}]}
\`\`\`
\`\`\`

Open the recipe whenever you are ready.`,
                createdAt: '2026-04-09T11:00:01.000Z',
                status: 'completed',
                requestId: null,
                visibility: 'transcript',
                kind: 'conversation'
            }
        ]);
        expect(normalized.messages[1]?.visibility).toBe('transcript');
        expect(normalized.messages[1]?.content).toBe('Created a random numbers recipe for this request.\n\nOpen the recipe whenever you are ready.');
        expect(normalized.messages[1]?.content).not.toContain('hermes-ui-recipes');
        expect(normalized.messages[1]?.content).not.toContain('"operations"');
    });
    it('preserves valid markdown structure while stripping bridge/runtime leakage from assistant replies', () => {
        const normalized = normalizePersistedSessionMessages([
            {
                id: 'message-user-5',
                sessionId: 'session-5',
                role: 'user',
                content: 'Summarize these options.',
                createdAt: '2026-04-09T12:00:00.000Z',
                status: 'completed',
                requestId: null,
                visibility: 'transcript',
                kind: 'conversation'
            },
            {
                id: 'message-assistant-5',
                sessionId: 'session-5',
                role: 'assistant',
                content: `## Top options

- Keep the shortlist compact
- Preserve the best-value pick

| Option | Price |
| --- | --- |
| Ardent | $210 |
| AC Hotel | $189 |

\`\`\`md
Remember to verify cancellation policies.
\`\`\`

Bridge execution note: The active Hermes profile is jbarton.
Raw system message: runtime scaffolding`,
                createdAt: '2026-04-09T12:00:01.000Z',
                status: 'completed',
                requestId: null,
                visibility: 'transcript',
                kind: 'conversation'
            }
        ]);
        expect(normalized.messages[1]?.visibility).toBe('transcript');
        expect(normalized.messages[1]?.content).toBe(`## Top options

- Keep the shortlist compact
- Preserve the best-value pick

| Option | Price |
| --- | --- |
| Ardent | $210 |
| AC Hotel | $189 |

\`\`\`md
Remember to verify cancellation policies.
\`\`\``);
    });
    it('keeps normal markdown code fences that do not leak runtime diagnostics or local script paths', () => {
        const normalized = normalizePersistedSessionMessages([
            {
                id: 'message-user-6',
                sessionId: 'session-6',
                role: 'user',
                content: 'How do I run the tests?',
                createdAt: '2026-04-09T12:05:00.000Z',
                status: 'completed',
                requestId: null,
                visibility: 'transcript',
                kind: 'conversation'
            },
            {
                id: 'message-assistant-6',
                sessionId: 'session-6',
                role: 'assistant',
                content: `Run the test suite with:

\`\`\`bash
pnpm test
pnpm test:integration
\`\`\``,
                createdAt: '2026-04-09T12:05:01.000Z',
                status: 'completed',
                requestId: null,
                visibility: 'transcript',
                kind: 'conversation'
            }
        ]);
        expect(normalized.messages[1]?.content).toBe(`Run the test suite with:

\`\`\`bash
pnpm test
pnpm test:integration
\`\`\``);
    });
});
