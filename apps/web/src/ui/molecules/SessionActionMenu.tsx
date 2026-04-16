import { Button, Menu, Portal } from '@chakra-ui/react';

export function SessionActionMenu({
  onRename,
  onDelete,
  size = 'sm',
  label = 'Session actions',
  showRename = true
}: {
  onRename: () => void;
  onDelete: () => void;
  size?: 'xs' | 'sm' | 'md';
  label?: string;
  showRename?: boolean;
}) {
  return (
    <Menu.Root positioning={{ placement: 'bottom-end' }}>
      <Menu.Trigger asChild>
        <Button
          type="button"
          variant="ghost"
          size={size}
          minW={0}
          px="2.5"
          rounded="full"
          aria-label={label}
          color="var(--text-secondary)"
          _hover={{ bg: 'var(--surface-2)', color: 'var(--text-primary)' }}
        >
          ⋮
        </Button>
      </Menu.Trigger>
      <Portal>
        <Menu.Positioner>
          <Menu.Content minW="11rem">
            {showRename ? (
              <Menu.Item value="rename" onClick={onRename}>
                Rename
              </Menu.Item>
            ) : null}
            <Menu.Item value="delete" color="fg.error" _hover={{ bg: 'bg.error', color: 'fg.error' }} onClick={onDelete}>
              Delete
            </Menu.Item>
          </Menu.Content>
        </Menu.Positioner>
      </Portal>
    </Menu.Root>
  );
}
