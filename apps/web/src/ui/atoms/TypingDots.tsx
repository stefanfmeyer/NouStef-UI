import { HStack, Span } from '@chakra-ui/react';

export function TypingDots() {
  return (
    <HStack gap="1.5" aria-label="Hermes is typing" data-testid="hermes-typing-indicator">
      {[0, 1, 2].map((index) => (
        <Span
          key={index}
          display="inline-block"
          w="7px"
          h="7px"
          rounded="full"
          bg="var(--accent)"
          opacity="0.45"
          animation="typing-bounce 1s ease-in-out infinite"
          style={{
            animationDelay: `${index * 140}ms`
          }}
        />
      ))}
    </HStack>
  );
}
