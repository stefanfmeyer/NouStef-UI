import { Badge } from '@chakra-ui/react';

const toneByStatus: Record<string, string> = {
  connected: 'green',
  degraded: 'orange',
  disconnected: 'red',
  error: 'red',
  enabled: 'green',
  disabled: 'gray',
  unavailable: 'red',
  healthy: 'green',
  paused: 'orange',
  attention: 'orange',
  pending: 'orange',
  approved: 'blue',
  rejected: 'red',
  completed: 'green',
  failed: 'red',
  started: 'gray',
  updated: 'blue',
  cancelled: 'gray',
  denied: 'red'
};

export function StatusPill({ label }: { label: string }) {
  return (
    <Badge
      colorPalette={toneByStatus[label] ?? 'gray'}
      variant="subtle"
      rounded="full"
      px="2.5"
      py="1"
      textTransform="none"
      fontWeight="600"
    >
      {label}
    </Badge>
  );
}
