import { useRef } from 'react';
import { Button } from '@chakra-ui/react';
import { useHermesTheme } from '@hermes-recipes/ui';

export function ThemeToggle({
  onPersist
}: {
  onPersist: (themeMode: 'dark' | 'light') => Promise<void> | void;
}) {
  const { themeMode, setThemeMode } = useHermesTheme();
  const togglingRef = useRef(false);

  return (
    <Button
      variant="outline"
      borderColor="var(--border-subtle)"
      bg="var(--surface-1)"
      color="var(--text-primary)"
      size="sm"
      onClick={async () => {
        if (togglingRef.current) return;
        togglingRef.current = true;

        const previousTheme = themeMode;
        const nextTheme = themeMode === 'dark' ? 'light' : 'dark';
        setThemeMode(nextTheme);

        try {
          await onPersist(nextTheme);
        } catch {
          setThemeMode(previousTheme);
        } finally {
          setTimeout(() => { togglingRef.current = false; }, 300);
        }
      }}
    >
      {themeMode === 'dark' ? 'Light mode' : 'Dark mode'}
    </Button>
  );
}
