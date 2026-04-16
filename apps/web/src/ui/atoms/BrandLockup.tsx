import { Box, HStack, Text, VStack } from '@chakra-ui/react';

export function BrandLockup({
  compact = false
}: {
  compact?: boolean;
}) {
  return (
    <HStack align="center" gap={compact ? '2.5' : '3'} minW={0} data-testid="hermes-home-brand">
      <Box fontSize={compact ? '24px' : '28px'} lineHeight="1" flexShrink={0} role="img" aria-label="The Kitchen logo">
        🧑‍🍳
      </Box>
      <VStack align="start" gap="0" minW={0}>
        <Text fontSize={compact ? 'sm' : 'md'} fontWeight="700" letterSpacing="-0.03em" color="var(--text-primary)" lineHeight="1.05">
          The Kitchen
        </Text>
        {!compact ? (
          <Text fontSize="xs" color="var(--text-muted)" lineHeight="1.2">
            Let him cook
          </Text>
        ) : null}
      </VStack>
    </HStack>
  );
}
