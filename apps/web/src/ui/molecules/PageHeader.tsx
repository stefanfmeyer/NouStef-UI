import { Box } from '@chakra-ui/react';
import { BrandLockup } from '../atoms/BrandLockup';

export function PageHeader({
  profileName: _profileName,
  pageName: _pageName,
  detail: _detail
}: {
  profileName: string | null;
  pageName: string;
  detail?: string;
}) {
  return (
    <Box flex="1" minW={0} data-testid="page-header">
      <BrandLockup compact />
    </Box>
  );
}
