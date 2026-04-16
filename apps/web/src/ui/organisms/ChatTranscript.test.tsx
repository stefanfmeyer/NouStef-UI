import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { cleanup, render, screen } from '@testing-library/react';
import type { ChatMessage } from '@hermes-recipes/protocol';
import { afterEach, describe, expect, it, vi } from 'vitest';

const markdownRenderCounts = new Map<string, number>();

vi.mock('react-markdown', () => ({
  default({ children }: { children?: string }) {
    const content = String(children ?? '');
    markdownRenderCounts.set(content, (markdownRenderCounts.get(content) ?? 0) + 1);
    return <div data-testid={`markdown:${content}`}>{children}</div>;
  }
}));

import { ChatTranscript } from './ChatTranscript';

afterEach(() => {
  cleanup();
  markdownRenderCounts.clear();
});

function createMessage(overrides: Partial<ChatMessage> = {}): ChatMessage {
  return {
    id: overrides.id ?? 'message-1',
    sessionId: overrides.sessionId ?? 'session-1',
    role: overrides.role ?? 'assistant',
    content: overrides.content ?? 'Existing transcript content.',
    createdAt: overrides.createdAt ?? '2026-04-09T12:00:00.000Z',
    status: overrides.status ?? 'completed',
    requestId: overrides.requestId ?? 'request-1',
    visibility: overrides.visibility ?? 'transcript',
    kind: overrides.kind ?? 'conversation'
  };
}

function renderTranscript({
  messages = [createMessage()],
  assistantDraft = '',
  showTypingIndicator = true,
  typingStatusLabel = null
}: {
  messages?: ChatMessage[];
  assistantDraft?: string;
  showTypingIndicator?: boolean;
  typingStatusLabel?: string | null;
} = {}) {
  return render(
    <ChakraProvider value={defaultSystem}>
      <ChatTranscript
        messages={messages}
        assistantDraft={assistantDraft}
        loading={false}
        emptyTitle="Empty"
        emptyDetail="No messages yet."
        showTypingIndicator={showTypingIndicator}
        typingStatusLabel={typingStatusLabel}
        selectedRequestId={null}
      />
    </ChakraProvider>
  );
}

describe('ChatTranscript', () => {
  it('renders granular runtime preview labels instead of a vague composing message', () => {
    const view = renderTranscript({
      typingStatusLabel: 'Hermes is using the terminal…'
    });

    expect(screen.getByText('Hermes is using the terminal…')).toBeInTheDocument();
    expect(screen.queryByText('Hermes is composing a reply…')).not.toBeInTheDocument();

    view.rerender(
      <ChakraProvider value={defaultSystem}>
        <ChatTranscript
          messages={[createMessage()]}
          assistantDraft=""
          loading={false}
          emptyTitle="Empty"
          emptyDetail="No messages yet."
          showTypingIndicator
          typingStatusLabel="Hermes is using the local-search skill…"
          selectedRequestId={null}
        />
      </ChakraProvider>
    );

    expect(screen.getByText('Hermes is using the local-search skill…')).toBeInTheDocument();
    expect(screen.queryByText('Hermes is using the terminal…')).not.toBeInTheDocument();

    view.rerender(
      <ChakraProvider value={defaultSystem}>
        <ChatTranscript
          messages={[createMessage()]}
          assistantDraft=""
          loading={false}
          emptyTitle="Empty"
          emptyDetail="No messages yet."
          showTypingIndicator
          typingStatusLabel="Hermes is searching…"
          selectedRequestId={null}
        />
      </ChakraProvider>
    );

    expect(screen.getByText('Hermes is searching…')).toBeInTheDocument();
    expect(screen.queryByText('Hermes is using the local-search skill…')).not.toBeInTheDocument();

    view.rerender(
      <ChakraProvider value={defaultSystem}>
        <ChatTranscript
          messages={[createMessage()]}
          assistantDraft=""
          loading={false}
          emptyTitle="Empty"
          emptyDetail="No messages yet."
          showTypingIndicator
          typingStatusLabel="Hermes is updating the workspace…"
          selectedRequestId={null}
        />
      </ChakraProvider>
    );

    expect(screen.getByText('Hermes is updating the workspace…')).toBeInTheDocument();
    expect(screen.queryByText('Hermes is searching…')).not.toBeInTheDocument();
  });

  it('does not rerender historical markdown when typing status updates', () => {
    const message = createMessage({
      id: 'message-history',
      content: 'Historical transcript content.'
    });

    const view = renderTranscript({
      messages: [message],
      typingStatusLabel: 'Hermes is using the terminal…'
    });

    expect(markdownRenderCounts.get('Historical transcript content.')).toBe(1);

    view.rerender(
      <ChakraProvider value={defaultSystem}>
        <ChatTranscript
          messages={[message]}
          assistantDraft=""
          loading={false}
          emptyTitle="Empty"
          emptyDetail="No messages yet."
          showTypingIndicator
          typingStatusLabel="Hermes is searching…"
          selectedRequestId={null}
        />
      </ChakraProvider>
    );

    expect(markdownRenderCounts.get('Historical transcript content.')).toBe(1);

    view.rerender(
      <ChakraProvider value={defaultSystem}>
        <ChatTranscript
          messages={[message]}
          assistantDraft="Working on it…"
          loading={false}
          emptyTitle="Empty"
          emptyDetail="No messages yet."
          showTypingIndicator
          typingStatusLabel="Hermes is updating the workspace…"
          selectedRequestId={null}
        />
      </ChakraProvider>
    );

    expect(markdownRenderCounts.get('Historical transcript content.')).toBe(1);
    expect(markdownRenderCounts.get('Working on it…')).toBe(1);
  });
});
