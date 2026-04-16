import { HStack, Text } from '@chakra-ui/react';
import type { ModelProviderResponse } from '@hermes-recipes/protocol';

export function ModelSelector({
  modelProviderResponse,
  activeModelId
}: {
  modelProviderResponse: ModelProviderResponse | null;
  activeModelId: string | null;
}) {
  if (!modelProviderResponse || !activeModelId) {
    return null;
  }

  return (
    <HStack gap="1.5" align="center" flexShrink={0}>
      <Text fontSize="xs" color="var(--text-muted)">
        {activeModelId}
      </Text>
    </HStack>
  );
}
