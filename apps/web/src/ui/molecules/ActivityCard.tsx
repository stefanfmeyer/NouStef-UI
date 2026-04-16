import { Badge, Box, Code, Flex, HStack, Spinner, Text, VStack } from '@chakra-ui/react';
import type { ChatActivity } from '@hermes-recipes/protocol';
import { InfoTag } from '../atoms/InfoTag';

function formatTimestamp(value: string) {
  const parsed = Date.parse(value);
  if (Number.isNaN(parsed)) {
    return value;
  }

  return new Date(parsed).toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
  });
}

function detailForActivity(activity: ChatActivity) {
  if (activity.kind === 'command' && activity.command) {
    return activity.command;
  }

  return activity.detail ?? null;
}

function kindPalette(kind: ChatActivity['kind']) {
  switch (kind) {
    case 'tool':
      return 'blue';
    case 'skill':
      return 'teal';
    case 'command':
      return 'orange';
    case 'approval':
      return 'yellow';
    case 'warning':
      return 'red';
    default:
      return 'gray';
  }
}

function kindLabel(kind: ChatActivity['kind']) {
  switch (kind) {
    case 'tool':
      return 'Tool call';
    case 'skill':
      return 'Skill';
    case 'command':
      return 'CLI';
    case 'approval':
      return 'Approval';
    case 'warning':
      return 'Warning';
    default:
      return 'Status';
  }
}

function surfaceTone(activity: ChatActivity) {
  if (activity.state === 'failed' || activity.state === 'denied' || activity.kind === 'warning') {
    return {
      bg: 'rgba(132, 22, 53, 0.12)',
      border: 'rgba(132, 22, 53, 0.24)'
    };
  }

  switch (activity.kind) {
    case 'tool':
      return {
        bg: 'rgba(53, 110, 164, 0.12)',
        border: 'rgba(53, 110, 164, 0.24)'
      };
    case 'skill':
      return {
        bg: 'rgba(18, 115, 91, 0.12)',
        border: 'rgba(18, 115, 91, 0.24)'
      };
    case 'command':
      return {
        bg: 'rgba(177, 86, 47, 0.1)',
        border: 'rgba(177, 86, 47, 0.2)'
      };
    case 'approval':
      return {
        bg: 'rgba(177, 141, 47, 0.12)',
        border: 'rgba(177, 141, 47, 0.24)'
      };
    default:
      return {
        bg: 'var(--surface-2)',
        border: 'var(--border-subtle)'
      };
  }
}

function statusBadgeTone(state: ChatActivity['state']) {
  switch (state) {
    case 'completed':
      return 'green';
    case 'failed':
    case 'denied':
      return 'red';
    case 'started':
    case 'updated':
    default:
      return 'gray';
  }
}

function ActivityStatusIcon({ activity }: { activity: ChatActivity }) {
  if (activity.state === 'completed') {
    return (
      <Flex
        align="center"
        justify="center"
        w="5"
        h="5"
        rounded="full"
        bg="rgba(18, 115, 91, 0.16)"
        color="green.500"
        fontSize="xs"
        fontWeight="700"
      >
        ✓
      </Flex>
    );
  }

  if (activity.state === 'failed' || activity.state === 'denied') {
    return (
      <Flex
        align="center"
        justify="center"
        w="5"
        h="5"
        rounded="full"
        bg="rgba(132, 22, 53, 0.18)"
        color="red.500"
        fontSize="xs"
        fontWeight="700"
      >
        !
      </Flex>
    );
  }

  if (activity.state === 'cancelled') {
    return (
      <Flex
        align="center"
        justify="center"
        w="5"
        h="5"
        rounded="full"
        bg="var(--surface-1)"
        color="var(--text-muted)"
        fontSize="xs"
        fontWeight="700"
      >
        -
      </Flex>
    );
  }

  return (
    <Flex align="center" justify="center" w="5" h="5" rounded="full" bg="var(--surface-1)">
      <Spinner size="xs" color="var(--accent)" borderWidth="2px" />
    </Flex>
  );
}

export function ActivityCard({ activity }: { activity: ChatActivity }) {
  const tone = surfaceTone(activity);
  const detail = detailForActivity(activity);

  return (
    <Box data-testid="activity-card" data-activity-kind={activity.kind} rounded="14px" border={`1px solid ${tone.border}`} bg={tone.bg} px="2" py="1.5">
      <VStack align="stretch" gap="1.25">
        <HStack align="start" justify="recipe-between" gap="2">
          <HStack align="start" gap="2" minW={0}>
            <ActivityStatusIcon activity={activity} />
            <VStack align="stretch" gap="0.75" minW={0}>
              <Text fontSize="xs" fontWeight="500" color="var(--text-primary)" lineClamp={2}>
                {activity.label}
              </Text>
              <HStack gap="1" wrap="wrap">
                <InfoTag label={kindLabel(activity.kind)} colorPalette={kindPalette(activity.kind)} />
                <Badge
                  rounded="full"
                  colorPalette={statusBadgeTone(activity.state)}
                  variant="subtle"
                  textTransform="none"
                  fontSize="2xs"
                  px="1.5"
                >
                  {activity.state}
                </Badge>
              </HStack>
            </VStack>
          </HStack>
          <Text flexShrink={0} fontSize="xs" color="var(--text-muted)">
            {formatTimestamp(activity.timestamp)}
          </Text>
        </HStack>

        {detail ? (
          activity.kind === 'command' && activity.command ? (
            <Code whiteSpace="pre-wrap" rounded="10px" px="2" py="1.25" bg="var(--surface-1)" color="var(--text-primary)" fontSize="xs">
              {detail}
            </Code>
          ) : (
            <Text fontSize="xs" color="var(--text-secondary)" lineClamp={4}>
              {detail}
            </Text>
          )
        ) : null}
      </VStack>
    </Box>
  );
}
