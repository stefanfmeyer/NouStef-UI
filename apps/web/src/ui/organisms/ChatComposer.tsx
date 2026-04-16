import { useCallback, useState } from 'react';
import { Button, HStack, Text, Textarea, VStack } from '@chakra-ui/react';

export function ChatComposer({
  onSend,
  sending,
  disabled
}: {
  onSend: (content: string) => boolean | Promise<boolean>;
  sending: boolean;
  disabled: boolean;
}) {
  const [draft, setDraft] = useState('');
  const canSubmit = !disabled && !sending && draft.trim().length > 0;

  const handleSubmit = useCallback(async () => {
    const content = draft.trim();
    if (!content || disabled || sending) {
      return;
    }

    const accepted = await Promise.resolve(onSend(content)).catch(() => false);
    if (accepted) {
      setDraft('');
    }
  }, [disabled, draft, onSend, sending]);

  return (
    <VStack
      as="form"
      align="stretch"
      gap="3"
      rounded="10px"
      border="1px solid var(--border-subtle)"
      bg="var(--surface-1)"
      px="4"
      py="4"
      data-testid="chat-composer"
      onSubmit={(event) => {
        event.preventDefault();
        if (canSubmit) {
          void handleSubmit();
        }
      }}
    >
      <Textarea
        value={draft}
        onChange={(event) => setDraft(event.currentTarget.value)}
        placeholder="Ask Hermes something real."
        autoresize
        resize="none"
        variant="subtle"
        minH="112px"
        maxH="240px"
        disabled={disabled}
        borderRadius="8px"
        bg="var(--surface-2)"
        borderColor="transparent"
        lineHeight="1.55"
        onKeyDown={(event) => {
          if (event.key !== 'Enter' || event.shiftKey || event.nativeEvent.isComposing) {
            return;
          }

          event.preventDefault();
          if (canSubmit) {
            void handleSubmit();
          }
        }}
      />
      <HStack justify="recipe-between" align="center" gap="3" wrap="wrap">
        <Text fontSize="sm" color="var(--text-secondary)">
          Press Enter to send. Press Shift+Enter for a newline.
        </Text>
        <Button
          type="submit"
          rounded="6px"
          bg="var(--accent)"
          color="white"
          _hover={{ bg: 'var(--accent-strong)' }}
          loading={sending}
          disabled={!canSubmit}
        >
          Send
        </Button>
      </HStack>
    </VStack>
  );
}
