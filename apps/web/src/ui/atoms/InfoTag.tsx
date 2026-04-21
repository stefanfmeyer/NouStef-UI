import { Tag } from '@chakra-ui/react';

export function InfoTag({
  label,
  colorPalette = 'gray',
  variant = 'subtle'
}: {
  label: string;
  colorPalette?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink';
  variant?: 'subtle' | 'solid' | 'outline' | 'surface';
}) {
  return (
    <Tag.Root size="sm" colorPalette={colorPalette} variant={variant} rounded="8px">
      <Tag.Label>{label}</Tag.Label>
    </Tag.Root>
  );
}
