import { Box, Button, Flex, Text, VStack } from '@chakra-ui/react';
import type { Session } from '@hermes-recipes/protocol';
import { SessionActionMenu } from './SessionActionMenu';

function formatSessionMeta(session: Session) {
  const messageLabel = `${session.messageCount} ${session.messageCount === 1 ? 'message' : 'messages'}`;
  const updatedLabel = new Date(session.lastUpdatedAt).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  });
  return `${messageLabel} · ${updatedLabel}`;
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
      data-testid="recent-session-row"
      data-session-id={session.id}
      width="100%"
      maxW="100%"
      minW={0}
      rounded="8px"
      border={active ? '1px solid var(--accent)' : '1px solid transparent'}
      bg={active ? 'var(--surface-accent)' : 'transparent'}
      overflow="hidden"
    >
      <Flex align="start" gap="1" px="1.5" py="1.25" minW={0} maxW="100%" overflow="hidden">
        <Button
          justifyContent="start"
          alignItems="start"
          textAlign="left"
          variant="ghost"
          flex="1 1 0"
          maxW="100%"
          minW={0}
          minH="0"
          rounded="8px"
          px="0"
          py="0"
          height="auto"
          bg="transparent"
          overflow="hidden"
          _hover={{
            bg: 'transparent'
          }}
          onClick={onClick}
        >
          <VStack align="start" gap="0.5" width="100%" minW={0} overflow="hidden">
              <Text
                data-testid="recent-session-title"
                width="100%"
                minW={0}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                fontSize="12px"
                fontWeight="500"
                color="var(--text-primary)"
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
              fontSize="10px"
              lineHeight="shorter"
              color="var(--text-secondary)"
            >
              {formatSessionMeta(session)}
            </Text>
          </VStack>
        </Button>
        {onRename && onDelete ? (
          <Flex align="center" gap="0.5" flexShrink={0}>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              minW={0}
              px="2"
              rounded="full"
              aria-label={`Rename ${session.title}`}
              color="var(--text-secondary)"
              _hover={{ bg: 'var(--surface-2)', color: 'var(--text-primary)' }}
              onClick={onRename}
            >
              ✎
            </Button>
            <SessionActionMenu label={`Actions for ${session.title}`} onRename={onRename} onDelete={onDelete} size="xs" showRename={false} />
          </Flex>
        ) : null}
      </Flex>
    </Box>
  );
}
