import { memo, useEffect, useState } from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';
import type { ChatActivity } from '@noustef-ui/protocol';

function kindIcon(kind: ChatActivity['kind']): string {
  switch (kind) {
    case 'tool': return '📞';
    case 'skill': return '📚';
    case 'command': return '💻';
    case 'approval': return '⚠️';
    case 'warning': return '⚠️';
    case 'thinking': return '💭';
    case 'website': return '🌐';
    default: return '⚙️';
  }
}

function kindColor(kind: ChatActivity['kind']): string {
  switch (kind) {
    case 'tool': return 'var(--ticker-tool, #6366f1)';
    case 'skill': return 'var(--ticker-skill, #0d9488)';
    case 'command': return 'var(--ticker-command, #d97706)';
    case 'approval': return 'var(--ticker-approval, #7c3aed)';
    case 'warning': return 'var(--ticker-warning, #dc2626)';
    case 'thinking': return 'var(--ticker-thinking, #64748b)';
    case 'website': return 'var(--ticker-website, #0284c7)';
    default: return 'var(--text-secondary)';
  }
}

function formatElapsed(secs: number): string {
  if (secs < 60) return `${secs}s`;
  return `${Math.floor(secs / 60)}m ${secs % 60}s`;
}

// Each character fades in at a staggered 18 ms interval capped at 300 ms total.
function AnimatedText({ text, color }: { text: string; color: string }) {
  const [displayKey, setDisplayKey] = useState(0);

  useEffect(() => {
    setDisplayKey((k) => k + 1);
  }, [text]);

  const chars = Array.from(text);
  const perChar = Math.min(18, chars.length > 0 ? 280 / chars.length : 18);

  return (
    <Box as="span" display="inline" key={displayKey} aria-label={text} data-status-text={text}>
      {chars.map((ch, i) => (
        <Box
          as="span"
          key={`${displayKey}-${i}`}
          display="inline"
          color={color}
          style={{
            opacity: 0,
            animation: `statusTickerFadeIn 80ms ease forwards`,
            animationDelay: `${i * perChar}ms`
          }}
        >
          {ch}
        </Box>
      ))}
    </Box>
  );
}

// Shows how long the current status text has been displayed, ticking every second
// after a 5-second grace period. Resets whenever text changes.
function ElapsedTimer({ color }: { color: string }) {
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    setSecs(0);
    const id = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  if (secs < 5) return null;

  return (
    <Box
      as="span"
      display="inline"
      color={color}
      style={{ opacity: 0.55, fontSize: '0.9em' }}
    >
      {' '}({formatElapsed(secs)})
    </Box>
  );
}

export const StatusTicker = memo(function StatusTicker({
  text,
  kind = 'status'
}: {
  text: string;
  kind?: ChatActivity['kind'];
}) {
  const icon = kindIcon(kind);
  const color = kindColor(kind);

  return (
    <HStack gap="1.5" align="center" minW={0} overflow="hidden">
      <Text as="span" flexShrink={0} fontSize="sm" lineHeight={1}>
        {icon}
      </Text>
      <Text as="span" fontSize="xs" color="var(--text-secondary)" lineClamp={1} display="block" minW={0}>
        <AnimatedText text={text} color={color} />
        <ElapsedTimer key={text} color={color} />
      </Text>
    </HStack>
  );
});
