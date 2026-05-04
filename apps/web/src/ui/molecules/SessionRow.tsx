import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import type { Session } from '@noustef-ui/protocol';
import { SessionActionMenu } from './SessionActionMenu';

function formatRelativeTime(dateString: string): string {
  const diffMs = Date.now() - new Date(dateString).getTime();
  const mins = Math.floor(diffMs / 60000);
  const hours = Math.floor(diffMs / 3600000);
  const days = Math.floor(diffMs / 86400000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(dateString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function sessionMeta(session: Session): string {
  if (session.messageCount === 0) return 'Draft';
  const count = session.messageCount === 1 ? '1 message' : `${session.messageCount} messages`;
  const time = formatRelativeTime(session.lastUpdatedAt);
  return `${count} · ${time}`;
}

export function SessionRow({
  session,
  active,
  onClick,
  onRename,
  onDelete
}: {
  session: Session;
  active: boolean;
  onClick: () => void;
  onRename?: () => void;
  onDelete?: () => void;
}) {
  return (
    <Box
      className="session-row"
      data-testid="recent-session-row"
      data-session-id={session.id}
      width="100%"
      maxW="100%"
      minW={0}
      rounded="var(--radius-control)"
      bg={active ? 'var(--surface-selected)' : 'transparent'}
      overflow="hidden"
      transition="background-color var(--transition-fast)"
      _hover={{ bg: active ? 'var(--surface-selected)' : 'var(--surface-hover)' }}
    >
      <Flex align="center" gap="1" px="2" py="1.5" minW={0} maxW="100%" overflow="hidden">
        <Button
          justifyContent="start"
          alignItems="start"
          textAlign="left"
          variant="ghost"
          flex="1 1 0"
          maxW="100%"
          minW={0}
          minH="0"
          rounded="6px"
          px="1"
          py="0"
          height="auto"
          bg="transparent"
          overflow="hidden"
          _hover={{ bg: 'transparent' }}
          onClick={onClick}
        >
          <VStack align="start" gap="0" width="100%" minW={0} overflow="hidden">
            <Text
              data-testid="recent-session-title"
              width="100%"
              minW={0}
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontSize="13px"
              fontWeight="500"
              color={active ? 'var(--text-primary)' : 'var(--text-secondary)'}
              lineHeight="1.35"
            >
              {session.title}
            </Text>
            <Text
              data-testid="recent-session-meta"
              width="100%"
              minW={0}
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontSize="11px"
              color="var(--text-muted)"
              lineHeight="1.3"
            >
              {sessionMeta(session)}
            </Text>
          </VStack>
        </Button>

        {onRename && onDelete ? (
          <Box className="session-row__actions" flexShrink={0}>
            <SessionActionMenu
              label={`Actions for ${session.title}`}
              onRename={onRename}
              onDelete={onDelete}
              size="xs"
            />
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
}
