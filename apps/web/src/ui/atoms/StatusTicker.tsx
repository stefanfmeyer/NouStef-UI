import { memo, useEffect, useRef, useState } from 'react';
import { Box, HStack, Text } from '@chakra-ui/react';
import type { ChatActivity } from '@hermes-recipes/protocol';

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

export const StatusTicker = memo(function StatusTicker({
  text,
  kind = 'status'
}: {
  text: string;
  kind?: ChatActivity['kind'];
}) {
  const icon = kindIcon(kind);
  const color = kindColor(kind);
  const prevRef = useRef(text);
  prevRef.current = text;

  return (
    <HStack gap="1.5" align="center" minW={0} overflow="hidden">
      <Text as="span" flexShrink={0} fontSize="sm" lineHeight={1}>
        {icon}
      </Text>
      <Text as="span" fontSize="xs" color="var(--text-secondary)" lineClamp={1} display="block" minW={0}>
        <AnimatedText text={text} color={color} />
      </Text>
    </HStack>
  );
});
