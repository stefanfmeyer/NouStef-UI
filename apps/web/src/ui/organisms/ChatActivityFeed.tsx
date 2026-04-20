import { Box, Flex, HStack, ScrollArea, Spinner, Text, VStack } from '@chakra-ui/react';
import type { ChatActivity, RuntimeRequest } from '@hermes-recipes/protocol';
import { InfoTag } from '../atoms/InfoTag';
import { ActivityCard } from '../molecules/ActivityCard';

function requestStatusPalette(status: RuntimeRequest['status'] | null) {
  switch (status) {
    case 'running':
      return 'gray';
    case 'completed':
      return 'green';
    case 'failed':
    case 'denied':
      return 'red';
    case 'cancelled':
    default:
      return 'gray';
  }
}

export function ChatActivityFeed({
  activities,
  sending,
  progress,
  requestPreview,
  requestStatus
}: {
  activities: ChatActivity[];
  sending: boolean;
  progress: string | null;
  requestPreview: string | null;
  requestStatus: RuntimeRequest['status'] | null;
}) {
  return (
    <Flex
      direction="column"
      h="100%"
      minH={{ base: '240px', xl: 0 }}
      rounded="8px"
      border="1px solid var(--border-subtle)"
      bg="var(--surface-elevated)"
      boxShadow="var(--shadow-sm)"
      px="3"
      py="3"
      data-testid="chat-activity-pane"
    >
      <VStack align="stretch" gap="3" minH={0} h="100%">
        <Box>
          <Text fontSize="sm" fontWeight="750" color="var(--text-primary)">
            Runtime activity
          </Text>
          <Text fontSize="xs" color="var(--text-secondary)">
            {requestPreview
              ? 'Bridge, tool, skill, and CLI events for the focused request.'
              : sending
                ? 'The bridge is waiting for structured runtime events from Hermes.'
                : 'Click a chat message to focus its runtime trail, or send a new request to start a fresh stream.'}
          </Text>
        </Box>

        <Box rounded="8px" border="1px solid var(--border-subtle)" bg="var(--surface-2)" px="3" py="2.5">
          <VStack align="stretch" gap="2">
            <HStack justify="space-between" gap="2" align="start">
              <Box minW={0}>
                <Text fontSize="xs" fontWeight="700" color="var(--text-muted)" letterSpacing="0">
                  Focused request
                </Text>
                <Text mt="0.5" fontSize="sm" fontWeight="650" color="var(--text-primary)" lineClamp={2}>
                  {requestPreview ?? (sending ? 'New Hermes request in progress' : 'No request selected')}
                </Text>
              </Box>
              <InfoTag label={requestStatus ?? 'idle'} colorPalette={requestStatusPalette(requestStatus)} />
            </HStack>

            <HStack gap="2" align="center">
              {sending ? <Spinner size="xs" color="var(--accent)" borderWidth="2px" /> : null}
              <Text fontSize="xs" color="var(--text-secondary)">
                {progress ?? (sending ? 'Waiting for runtime updates…' : 'Idle')}
              </Text>
            </HStack>
          </VStack>
        </Box>

        <ScrollArea.Root flex="1" minH={0} variant="hover">
          <ScrollArea.Viewport data-testid="chat-activity-scroll">
            <VStack align="stretch" gap="1.5" pr="1">
              {activities.length === 0 ? (
                <Box rounded="8px" bg="var(--surface-2)" px="3" py="3" border="1px solid var(--border-subtle)">
                  <Text fontSize="xs" color="var(--text-secondary)">
                    {sending
                      ? 'No structured runtime events have arrived yet. Hermes may still be thinking or using a quieter execution path.'
                      : 'No runtime activity has been recorded for the focused request yet.'}
                  </Text>
                </Box>
              ) : (
                activities.map((activity) => (
                  <ActivityCard key={`${activity.timestamp}-${activity.kind}-${activity.label}-${activity.state}`} activity={activity} />
                ))
              )}
            </VStack>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar />
        </ScrollArea.Root>
      </VStack>
    </Flex>
  );
}
