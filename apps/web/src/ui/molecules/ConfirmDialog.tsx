import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { Button, Dialog, Portal, Text } from '@chakra-ui/react';

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel,
  confirmColorPalette = 'red',
  loading = false,
  children,
  onConfirm
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  confirmLabel: string;
  confirmColorPalette?: 'red' | 'orange' | 'green' | 'teal' | 'blue' | 'gray';
  loading?: boolean;
  children?: ReactNode;
  onConfirm: () => Promise<void> | void;
}) {
  const finalFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    finalFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  }, [open]);

  return (
    <Dialog.Root
      role="alertdialog"
      lazyMount
      unmountOnExit
      open={open}
      size={{ base: 'full', md: 'md' }}
      finalFocusEl={() => (finalFocusRef.current && finalFocusRef.current.isConnected ? finalFocusRef.current : document.body)}
      onOpenChange={(event) => onOpenChange(event.open)}
    >
      <Portal>
        <Dialog.Backdrop backdropFilter="auto" backdropBlur="sm" bg="blackAlpha.500" />
        <Dialog.Positioner>
          <Dialog.Content bg="var(--surface-1)" border="1px solid var(--border-subtle)">
            <Dialog.Header>
              <Dialog.Title color="var(--text-primary)">{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <Text color="var(--text-secondary)">{description}</Text>
              {children}
            </Dialog.Body>
            <Dialog.Footer>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button colorPalette={confirmColorPalette} loading={loading} onClick={() => void onConfirm()}>
                {confirmLabel}
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
