import { Alert } from '@chakra-ui/react';

export function ErrorBanner({
  title,
  detail
}: {
  title: string;
  detail: string;
}) {
  return (
    <Alert.Root
      status="error"
      rounded="8px"
      border="1px solid var(--border-danger)"
      bg="var(--surface-danger)"
      boxShadow="var(--shadow-xs)"
    >
      <Alert.Content>
        <Alert.Title color="var(--text-primary)">{title}</Alert.Title>
        <Alert.Description color="var(--text-secondary)">{detail}</Alert.Description>
      </Alert.Content>
    </Alert.Root>
  );
}
