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
      rounded="8px"
      border="1px solid var(--border-subtle)"
      bg="var(--surface-elevated)"
      px={{ base: '5', md: '7' }}
      py={{ base: '6', md: '8' }}
      boxShadow="var(--shadow-xs)"
    >
      <VStack align="start" gap="2">
        <Text fontSize="lg" fontWeight="750" color="var(--text-primary)" lineHeight="1.2">
          {title}
        </Text>
        <Text color="var(--text-secondary)" lineHeight="1.65">{detail}</Text>
      </VStack>
    </Box>
  );
}
