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
      className="session-row"
      data-testid="recent-session-row"
      data-session-id={session.id}
      width="100%"
      maxW="100%"
      minW={0}
      rounded="8px"
      bg={active ? 'var(--surface-selected)' : 'transparent'}
      overflow="hidden"
      transition="background-color 140ms ease"
      position="relative"
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
          <VStack align="start" gap="0.5" width="100%" minW={0} overflow="hidden">
            <Text
              data-testid="recent-session-title"
              width="100%"
              minW={0}
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
              fontSize="sm"
              fontWeight="600"
              color={active ? 'var(--text-primary)' : 'var(--text-secondary)'}
              lineHeight="1.3"
            >
              {session.title}
            </Text>
            <HStack gap="1.5" width="100%" minW={0}>
              {hasAttachedSpace ? (
                <Box
                  data-testid="recent-session-space-indicator"
                  flexShrink={0}
                  rounded="4px"
                  bg="var(--surface-2)"
                  color="var(--text-muted)"
                  border="1px solid var(--border-subtle)"
                  px="1.5"
                  py="0"
                  fontSize="10px"
                  fontWeight="600"
                  lineHeight="1.6"
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
                color="var(--text-muted)"
                lineHeight="1"
              >
                {formatSessionMeta(session)}
              </Text>
            </HStack>
          </VStack>
        </Button>

        {onRename && onDelete ? (
          <Box className="session-row__actions" flexShrink={0}>
            <Button
              type="button"
              variant="ghost"
              size="xs"
              minW={0}
              px="2"
              h="6"
              rounded="6px"
              aria-label={`Rename ${session.title}`}
              color="var(--text-secondary)"
              fontSize="xs"
              _hover={{ bg: 'var(--surface-2)', color: 'var(--text-primary)' }}
              onClick={onRename}
            >
              Rename
            </Button>
            <SessionActionMenu
              label={`Actions for ${session.title}`}
              onRename={onRename}
              onDelete={onDelete}
              size="xs"
              showRename={false}
            />
          </Box>
        ) : null}
      </Flex>
    </Box>
  );
}
