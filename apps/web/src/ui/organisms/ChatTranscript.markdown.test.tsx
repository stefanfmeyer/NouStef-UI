import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { render, screen, within } from '@testing-library/react';
import type { ChatMessage } from '@noustef-ui/protocol';
import { describe, expect, it } from 'vitest';
import { ChatTranscript } from './ChatTranscript';

function createAssistantMessage(content: string): ChatMessage {
  return {
    id: 'message-1',
    sessionId: 'session-1',
    role: 'assistant',
    content,
    createdAt: '2026-04-13T12:00:00.000Z',
    status: 'completed',
    requestId: 'request-1',
    visibility: 'transcript',
    kind: 'conversation'
  };
}

describe('ChatTranscript markdown rendering', () => {
  it('renders assistant replies as markdown-first content with headings, lists, tables, code, and links', () => {
    render(
      <ChakraProvider value={defaultSystem}>
        <ChatTranscript
          messages={[
            createAssistantMessage(`## Trip summary

1. Confirm the hotel
2. Compare restaurant backups

| Option | Price |
| --- | --- |
| Hotel Ardent | $210 |
| AC Hotel | $189 |

\`\`\`bash
pnpm test
\`\`\`

[Open docs](https://example.com/docs)`)
          ]}
          assistantDraft=""
          loading={false}
          emptyTitle="Empty"
          emptyDetail="No messages yet."
          showTypingIndicator={false}
          typingStatusLabel={null}
          selectedRequestId={null}
        />
      </ChakraProvider>
    );

    expect(screen.getByRole('heading', { name: 'Trip summary', level: 2 })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Open docs' })).toHaveAttribute('href', 'https://example.com/docs');
    expect(screen.getByText('pnpm test')).toBeInTheDocument();

    const list = screen.getByRole('list');
    expect(within(list).getByText('Confirm the hotel')).toBeInTheDocument();
    expect(within(list).getByText('Compare restaurant backups')).toBeInTheDocument();
  });
});
