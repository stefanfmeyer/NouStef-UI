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
      rounded="8px"
      border="1px solid var(--border-subtle)"
      bg="var(--surface-elevated)"
      px={{ base: '4', md: '5' }}
      py={{ base: '4', md: '5' }}
      boxShadow="var(--shadow-sm)"
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
        minH="118px"
        maxH="240px"
        disabled={disabled}
        borderRadius="8px"
        bg="var(--surface-2)"
        border="1px solid transparent"
        color="var(--text-primary)"
        lineHeight="1.6"
        fontSize="md"
        _placeholder={{ color: 'var(--text-muted)' }}
        _focus={{ borderColor: 'var(--accent)', boxShadow: 'var(--focus-ring)', bg: 'var(--surface-1)' }}
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
      <HStack justify="space-between" align="center" gap="3" wrap="wrap">
        <Text fontSize="sm" color="var(--text-muted)">
          Press Enter to send. Press Shift+Enter for a newline.
        </Text>
        <Button
          type="submit"
          rounded="8px"
          bg="var(--accent)"
          color="var(--accent-contrast)"
          px="5"
          fontWeight="750"
          boxShadow="var(--shadow-xs)"
          _hover={{ bg: 'var(--accent-strong)', transform: 'translateY(-1px)' }}
          loading={sending}
          disabled={!canSubmit}
        >
          Send
        </Button>
      </HStack>
    </VStack>
  );
}
