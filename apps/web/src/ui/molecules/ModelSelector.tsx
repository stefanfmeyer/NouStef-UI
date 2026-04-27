import { Button, HStack, Text, chakra } from '@chakra-ui/react';
import type { ModelProviderResponse } from '@hermes-recipes/protocol';

function ChevronDown() {
  const Svg = chakra('svg');
  return (
    <Svg viewBox="0 0 16 16" boxSize="3" fill="none" aria-hidden="true" color="currentColor" flexShrink={0} opacity={0.5}>
      <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

export function ModelSelector({
  modelProviderResponse,
  activeModelId
}: {
  modelProviderResponse: ModelProviderResponse | null;
  activeModelId: string | null;
}) {
  if (!modelProviderResponse || !activeModelId) return null;

  const model = activeModelId.split('/').pop() ?? activeModelId;

  return (
    <Button
      variant="ghost"
      h="7"
      px="2.5"
      rounded="var(--radius-control)"
      bg="var(--surface-2)"
      _hover={{ bg: 'var(--surface-3)' }}
      display="flex"
      alignItems="center"
      gap="1.5"
      flexShrink={0}
      title={activeModelId}
      aria-label={`Current model: ${activeModelId}`}
    >
      <HStack gap="1.5" align="center">
        <Text fontSize="12px" fontWeight="500" color="var(--text-secondary)" lineHeight="1">
          {model}
        </Text>
        <ChevronDown />
      </HStack>
    </Button>
  );
}
