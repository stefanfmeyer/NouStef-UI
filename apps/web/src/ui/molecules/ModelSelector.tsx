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
    <HStack
      gap="1.5"
      align="center"
      flexShrink={0}
      rounded="8px"
      border="1px solid var(--border-subtle)"
      bg="var(--surface-2)"
      px="2.5"
      py="1.5"
    >
      <Text fontSize="xs" fontWeight="600" color="var(--text-secondary)">
        {activeModelId}
      </Text>
    </HStack>
  );
}
