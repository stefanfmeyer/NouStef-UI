import { Text } from '@chakra-ui/react';

export function PageHeader({
  pageName,
  profileName: _profileName,
  detail: _detail
}: {
  pageName: string;
  profileName?: string | null;
  detail?: string;
}) {
  return (
    <Text
      fontSize="15px"
      fontWeight="600"
      letterSpacing="-0.01em"
      color="var(--text-primary)"
      lineHeight="1.2"
      truncate
      flex="1"
      minW={0}
      data-testid="page-header"
    >
      {pageName}
    </Text>
  );
}
