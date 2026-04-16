import { Box, Text, VStack } from '@chakra-ui/react';

export function EmptyStateCard({
  title,
  detail
}: {
  title: string;
  detail: string;
}) {
  return (
    <Box
      rounded="10px"
      border="1px solid var(--border-subtle)"
      bg="var(--surface-1)"
      px="6"
      py="7"
    >
      <VStack align="start" gap="2">
        <Text fontSize="lg" fontWeight="700" color="var(--text-primary)">
          {title}
        </Text>
        <Text color="var(--text-secondary)">{detail}</Text>
      </VStack>
    </Box>
  );
}
