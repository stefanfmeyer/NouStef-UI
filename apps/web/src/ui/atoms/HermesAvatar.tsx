import { Box, Flex } from '@chakra-ui/react';

const sizeMap = { xs: '20px', sm: '28px', md: '36px', lg: '48px' } as const;
const fontSizeMap = { xs: '12px', sm: '16px', md: '22px', lg: '30px' } as const;

export function HermesAvatar({ size = 'sm' }: { size?: 'xs' | 'sm' | 'md' | 'lg' }) {
  return (
    <Flex
      align="center"
      justify="center"
      w={sizeMap[size]}
      h={sizeMap[size]}
      rounded="full"
      bg="var(--surface-2)"
      border="1px solid var(--border-subtle)"
      flexShrink={0}
    >
      <Box fontSize={fontSizeMap[size]} lineHeight="1" aria-label="Hermes" role="img">
        🧑‍🍳
      </Box>
    </Flex>
  );
}
