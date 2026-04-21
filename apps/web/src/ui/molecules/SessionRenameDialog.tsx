import { useEffect, useRef, useState } from 'react';
import { Button, Dialog, Field, Input, Portal, Text, VStack } from '@chakra-ui/react';

export function SessionRenameDialog({
  open,
  loading,
  sessionTitle,
  dialogTitle = 'Rename session',
  description = 'Update the session title used throughout the app. The current session summary and message history stay unchanged.',
  fieldLabel = 'Session title',
  placeholder = 'Give this session a clear title',
  saveLabel = 'Save title',
  onOpenChange,
  onSave
}: {
  open: boolean;
  loading: boolean;
  sessionTitle: string;
  dialogTitle?: string;
  description?: string;
  fieldLabel?: string;
  placeholder?: string;
  saveLabel?: string;
  onOpenChange: (open: boolean) => void;
  onSave: (title: string) => Promise<void> | void;
}) {
  const [title, setTitle] = useState(sessionTitle);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const finalFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    finalFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setTitle(sessionTitle);
  }, [open, sessionTitle]);

  const trimmedTitle = title.trim();

  return (
    <Dialog.Root
      lazyMount
      unmountOnExit
      open={open}
      size={{ base: 'full', md: 'md' }}
      initialFocusEl={() => inputRef.current}
      finalFocusEl={() => (finalFocusRef.current && finalFocusRef.current.isConnected ? finalFocusRef.current : document.body)}
      onOpenChange={(event) => onOpenChange(event.open)}
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="auto" backdropBlur="sm" bg="blackAlpha.500" />
        <Dialog.Positioner>
          <Dialog.Content bg="var(--surface-elevated)" border="1px solid var(--border-subtle)" rounded="8px" boxShadow="var(--shadow-md)">
            <Dialog.Header>
              <Dialog.Title color="var(--text-primary)">{dialogTitle}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <VStack
                as="form"
                align="stretch"
                gap="4"
                onSubmit={(event) => {
                  event.preventDefault();
                  if (trimmedTitle.length > 0) {
                    void onSave(trimmedTitle);
                  }
                }}
              >
                <Text color="var(--text-secondary)">{description}</Text>
                <Field.Root required>
                  <Field.Label color="var(--text-secondary)">{fieldLabel}</Field.Label>
                  <Input
                    ref={inputRef}
                    value={title}
                    maxLength={120}
                    onChange={(event) => setTitle(event.currentTarget.value)}
                    bg="var(--surface-2)"
                    borderColor="var(--border-subtle)"
                    placeholder={placeholder}
                  />
                </Field.Root>
              </VStack>
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" rounded="8px" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                bg="var(--accent)"
                color="var(--accent-contrast)"
                rounded="8px"
                _hover={{ bg: 'var(--accent-strong)' }}
                loading={loading}
                disabled={trimmedTitle.length === 0 || trimmedTitle === sessionTitle.trim()}
                onClick={() => void onSave(trimmedTitle)}
              >
                {saveLabel}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
