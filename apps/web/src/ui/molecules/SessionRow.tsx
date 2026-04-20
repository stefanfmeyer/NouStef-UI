import { Box, Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
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
  const hasAttachedSpace = Boolean(session.attachedRecipeId) || session.recipeType === 'home';

  return (
    <Box
      data-testid="recent-session-row"
      data-session-id={session.id}
      width="100%"
      maxW="100%"
      minW={0}
      rounded="8px"
      border="1px solid transparent"
      bg={active ? 'var(--surface-selected)' : 'transparent'}
      overflow="hidden"
      transition="background-color 140ms ease, border-color 140ms ease, box-shadow 140ms ease"
      boxShadow={active ? 'inset 0 0 0 1px var(--accent)' : 'none'}
      _hover={{ bg: active ? 'var(--surface-selected)' : 'var(--surface-hover)' }}
    >
      <Flex align="start" gap="1" px="2" py="2" minW={0} maxW="100%" overflow="hidden">
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
          <VStack align="start" gap="1" width="100%" minW={0} overflow="hidden">
              <Text
                data-testid="recent-session-title"
                width="100%"
                minW={0}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                fontSize="sm"
                fontWeight="650"
                color="var(--text-primary)"
              >
                {session.title}
              </Text>
            <HStack gap="1.5" width="100%" minW={0}>
              {hasAttachedSpace ? (
                <Box
                  data-testid="recent-session-space-indicator"
                  flexShrink={0}
                  rounded="6px"
                  bg="var(--accent-soft)"
                  color="var(--accent)"
                  px="1.5"
                  py="0.5"
                  fontSize="10px"
                  fontWeight="700"
                  lineHeight="1"
                >
                  Space
                </Box>
              ) : null}
              <Text
                data-testid="recent-session-meta"
                width="100%"
                minW={0}
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
                fontSize="xs"
                lineHeight="shorter"
                color="var(--text-muted)"
              >
                {formatSessionMeta(session)}
              </Text>
            </HStack>
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
              rounded="8px"
              aria-label={`Rename ${session.title}`}
              color="var(--text-secondary)"
              _hover={{ bg: 'var(--surface-2)', color: 'var(--text-primary)' }}
              onClick={onRename}
            >
              Rename
            </Button>
            <SessionActionMenu label={`Actions for ${session.title}`} onRename={onRename} onDelete={onDelete} size="xs" showRename={false} />
          </Flex>
        ) : null}
      </Flex>
    </Box>
  );
}
